import {AfterContentInit, Component, ElementRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeChangeAnimation } from './core/animations/change-route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeChangeAnimation
  ]
})
export class AppComponent implements AfterContentInit {
  asideNeedShow = false;

  constructor(private elRef: ElementRef) {
  }

  ngAfterContentInit(): void {
    this.updateMode();
  }

  updateMode(): void { // todo remove if dont use
    this.asideNeedShow = this.elRef.nativeElement.firstElementChild.offsetWidth > 900;
  }

  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
