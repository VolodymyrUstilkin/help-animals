import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { NavigationUiComponent } from '../navigation-new-design/navigation-ui.component';

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.css'],
  animations: [
    trigger('slideLeft', [
      transition('initial => expanded', animate('0.5s ease-in-out', keyframes([
        style({
          transform: 'translateX(-150px)',
          opacity: '0',
          offset: 0
        }),
        style({
          transform: 'translateX(50px)',
          opacity: '0.8',
          offset: 0.8
        }),
        style({
          transform: 'translateX(0)',
          opacity: '1',
          offset: 1
        })
      ])))
    ]),
    trigger('slideRight', [
      transition('initial => expanded', animate('0.5s ease-in-out', keyframes([
        style({
          transform: 'translateX(150px)',
          opacity: '0',
          offset: 0
        }),
        style({
          transform: 'translateX(-50px)',
          opacity: '0.8',
          offset: 0.8
        }),
        style({
          transform: 'translateX(0)',
          opacity: '1',
          offset: 1
        })
      ])))
    ]),
  ]
})
export class HeaderUiComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  isExpanded = false;
  state = 'initial';

  @ContentChild(NavigationUiComponent) child!: NavigationUiComponent;
  @ViewChild('burger') burger!: ElementRef;

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
  }

  ngAfterViewChecked(): void {
    this.state = 'expanded';
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
