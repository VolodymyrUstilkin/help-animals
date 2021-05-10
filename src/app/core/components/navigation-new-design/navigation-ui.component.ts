import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { UserAuthService } from 'src/app/core/services/user-auth-service/user-auth.service';
import { elementAppearanceAnimation, initialMenuAnimation } from '../../animations/header-animation';

const BASE_URL = '/';

export interface INavMenuItem {
  text: string;
  url: string;
}

class NavMenuItem implements INavMenuItem {
  constructor(public text: string, public url: string) {
  }
}

@Component({
  selector: 'app-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  styleUrls: ['./navigation-ui.component.css'],
  animations: [
    initialMenuAnimation,
    elementAppearanceAnimation
  ]
})

export class NavigationUiComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy{

  openCancelFavorite = false;
  state = 'initial';

  active = false;
  @ViewChildren('menu') menu!: QueryList<ElementRef>;
  @ViewChildren('links') links!: QueryList<ElementRef>;

  publicMenuItems: INavMenuItem[] = [];
  adminMenuItems: INavMenuItem[] = [];

  subscription: Subscription;

  constructor(private userAuthService: UserAuthService, private cdRef: ChangeDetectorRef, private elRef: ElementRef) {
    this.subscription = userAuthService.userUpdatedEvent.subscribe(() => {
      this.createMenu();
    });
  }

  ngOnInit(): void {
    this.createMenu();
  }

  ngAfterViewInit(): void {
    if (this.menu.first) {
      fromEvent<Event>(this.menu.first.nativeElement, 'click')
        .subscribe((event) => {
          const parent = (event.target as HTMLElement).closest('li');
          parent?.classList.toggle('_active');
        });
    }

    this.subscription.add(this.menu.changes.subscribe((element) => {
      element.toArray().forEach((elem: ElementRef) => {
        fromEvent<Event>(elem.nativeElement, 'click')
        .subscribe((event) => {
          const parent = (event.target as HTMLElement).closest('li');
          parent?.classList.toggle('_active');
        });
      });
    }));

    this.subscription.add(this.links.forEach((element) => {
      fromEvent<Event>(element.nativeElement, 'click')
          .subscribe(() => {
            this.hideMenu();
          });
        }));

    this.subscription.add(this.links.changes.subscribe((element) => {
      element.toArray().forEach((elem: ElementRef) => {
        fromEvent<Event>(elem.nativeElement, 'click')
        .subscribe(() => {
          this.hideMenu();
        });
      });
    }));

    this.subscription.add(fromEvent(window, 'resize').subscribe((_) => {
      this.createMenu();
    }));
  }

  ngAfterViewChecked(): void {
    this.state = 'expanded';
    this.cdRef.detectChanges();
  }

  private createMenu(): void {
    this.publicMenuItems = [];
    this.adminMenuItems = [];

    if (!this.isMobile()) {
      this.standartMenu();
      this.additionalMenu('desktop');
    } else {
      this.standartMenu();
      this.additionalMenu('mobile');
    }
  }

  private standartMenu(): void {
    this.publicMenuItems.push(new NavMenuItem('Переглянути тваринок', BASE_URL + 'animals'));
    this.publicMenuItems.push(new NavMenuItem('Про нас', BASE_URL + 'about'));
    this.publicMenuItems.push(new NavMenuItem('Допомогти котикам', BASE_URL + 'donate'));
    if (!this.isAuth()) {
      this.publicMenuItems.push(new NavMenuItem('Вхід', BASE_URL + 'login'));
    }
  }

  private additionalMenu(flag: string): void {
    const user = this.userAuthService.getUser();

    // if (!user.isActive){
    //   return;
    // }

    switch (flag) {
      case 'desktop':
        if (user.permissionForCreateAndCloseAnimalRequests) {
          this.adminMenuItems.push(new NavMenuItem('Повідомлення про знайдену тварину', BASE_URL + '/admin/animals/find-requests'));
        }
        if (user.permissionForAddEditAndRemoveAnimals) {
          this.adminMenuItems.push(new NavMenuItem('Керування обліком тварин', BASE_URL + '/admin/animals/list'));
        }
        // this.adminMenuItems.push(new NavMenuItem('Користувачi', BASE_URL + '/admin/users'));
        this.adminMenuItems.push(new NavMenuItem('Вихiд', BASE_URL + 'login'));
        break;
      case 'mobile':
        if (user.permissionForCreateAndCloseAnimalRequests){
          this.publicMenuItems.push(new NavMenuItem('Повідомлення про знайдену тварину', BASE_URL + '/admin/animals/find-requests'));
        }
        if (user.permissionForAddEditAndRemoveAnimals) {
          this.publicMenuItems.push(new NavMenuItem('Керування обліком тварин', BASE_URL + '/admin/animals/list'));
        }
        if (this.isAuth()) {
          // this.publicMenuItems.push(new NavMenuItem('Користувачi', BASE_URL + '/admin/users'));
          this.publicMenuItems.push(new NavMenuItem('Вихiд', BASE_URL + 'login'));
        }
        break;
      default:
        break;
    }
  }

  hideMenu(): void {
    if (!this.isMobile()) {
      this.menu.forEach((element) => {
        const menu = element.nativeElement.parentElement;
        if (!menu.classList.contains('_active')) {
          return;
        }
        menu.classList.remove('_active');
      });
    } else {
      this.active = false;
      const burger = this.elRef.nativeElement.parentNode.querySelector('.menu__icon');
      burger?.classList.remove('_active');
    }
  }

  isAuth(): boolean {
    return this.userAuthService.isAuthorized();
  }

  isMobile(): boolean {
    const width = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    );
    const scroll = this.widthScrollBar();

    return width + scroll <= 960;
  }

  private widthScrollBar(): number{
    const documentWidth = document.documentElement.clientWidth;
    const windowsWidth = window.innerWidth;
    const scrollbarWidth = windowsWidth - documentWidth;
    return scrollbarWidth;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
