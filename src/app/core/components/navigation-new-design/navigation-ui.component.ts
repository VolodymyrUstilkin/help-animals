import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { UserAuthService } from 'src/app/modules/shared/services/user-auth-service/user-auth.service';
import {environment} from '../../../../environments';

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
  styleUrls: ['./navigation-ui.component.css']
})

export class NavigationUiComponent implements OnInit, OnDestroy, AfterViewInit{


  active = false;
  @ViewChildren('menu') menu!: QueryList<ElementRef>;

  publicMenuItems: INavMenuItem[] = [];
  adminMenuItems: INavMenuItem[] = [];

  subscription: Subscription;

  constructor(private userAuthService: UserAuthService) {
    this.subscription = userAuthService.userUpdatedEvent.subscribe(() => {
      this.createMenu();
    });
  }

  ngOnInit(): void {
    this.createMenu();
  }

  ngAfterViewInit(): void {
    this.subscription.add(this.menu.changes.subscribe((element)=>{
      element.toArray().forEach((element: ElementRef) => {
        fromEvent<Event>(element.nativeElement, "click")
        .subscribe((event)=> {
          const element = (event.target as HTMLElement).closest('li');
          element?.classList.toggle("_active");
        });
      });
    }))
  }

  private createMenu(): void {
    this.publicMenuItems = [];
    this.adminMenuItems = [];

    if(!this.isMobile()) {
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
    if(!this.userAuthService.isAuthorized()) this.publicMenuItems.push(new NavMenuItem('Вхід', BASE_URL + 'login'))
  }

  private additionalMenu(flag: string): void {
    const user = this.userAuthService.getUser();

    if (!user.isActive) return;

    switch (flag) {
      case 'desktop':
        if (user.permissionForCreateAndCloseAnimalRequests) this.adminMenuItems.push(new NavMenuItem('Повідомлення про знайдену тварину', BASE_URL + '/admin/animals/find-requests'));
        if (user.permissionForCreateAndCloseAnimalRequests) this.adminMenuItems.push(new NavMenuItem('Керування обліком тварин', BASE_URL + '/admin/animals/list'));
        this.adminMenuItems.push(new NavMenuItem('Керування користувачами', BASE_URL + '/admin/users'));
        this.adminMenuItems.push(new NavMenuItem('Вихiд', BASE_URL + 'login'));
        break;
      case 'mobile':
        if (user.permissionForCreateAndCloseAnimalRequests) this.publicMenuItems.push(new NavMenuItem('Повідомлення про знайдену тварину', BASE_URL + '/admin/animals/find-requests'));
        if (user.permissionForCreateAndCloseAnimalRequests) this.publicMenuItems.push(new NavMenuItem('Керування обліком тварин', BASE_URL + '/admin/animals/list'));
        this.publicMenuItems.push(new NavMenuItem('Керування користувачами', BASE_URL + '/admin/users'));
        this.publicMenuItems.push(new NavMenuItem('Вихiд', BASE_URL + 'login'));
        break;
      default:
        break;
    }
  }

  isAuth(): boolean{
    return this.userAuthService.isAuthorized()
  }

  isMobile(): boolean {
    const width = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    );

    return width <= 767;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
