import { AfterViewInit, Component, ContentChild, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { NavigationUiComponent } from '../navigation-new-design/navigation-ui.component';

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.css']
})
export class HeaderUiComponent implements AfterViewInit, OnDestroy {

  @ContentChild(NavigationUiComponent) child!: NavigationUiComponent
  @ViewChild('burger') burger!: ElementRef;

  private subscription: Subscription = new Subscription();

  ngAfterViewInit(): void {
    this.subscription.add(fromEvent<Event>(this.burger.nativeElement, 'click').subscribe((event) => {
      const element = (event.target as  HTMLElement);
      const forbidenScroll = (event.target as HTMLMenuElement).closest('body');
      element.classList.toggle("_active");
      forbidenScroll?.classList.toggle('_lock');

      this.child.active = element.classList.contains('_active');
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
