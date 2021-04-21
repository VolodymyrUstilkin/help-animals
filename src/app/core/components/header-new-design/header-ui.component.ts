import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { initialLogoAnimation, initialMenuAnimation } from '../../animations/header-animation';
import { NavigationUiComponent } from '../navigation-new-design/navigation-ui.component';

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.css'],
  animations: [
    initialLogoAnimation,
    initialMenuAnimation
  ]
})
export class HeaderUiComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  isExpanded = false;
  state = 'initial';

  @ContentChild(NavigationUiComponent) child!: NavigationUiComponent;
  @ViewChild('burger') burger!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;

  private subscription: Subscription = new Subscription();

  constructor(private cdRef: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.subscription.add(fromEvent<Event>(this.burger.nativeElement, 'click').subscribe((event) => {
      const element = (event.target as  HTMLElement);
      const forbidenScroll = (event.target as HTMLMenuElement).closest('body');
      element.classList.toggle('_active');
      forbidenScroll?.classList.toggle('_lock');

      this.child.active = element.classList.contains('_active');
    }));

    this.subscription.add(fromEvent<Event>(this.logo.nativeElement, 'click').subscribe((_) => {
      this.child.hideMenu();
    }));
  }

  ngAfterViewChecked(): void {
    this.state = 'expanded';
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
