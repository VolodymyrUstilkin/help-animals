import {AfterContentInit, Component, ElementRef, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeChangeAnimation } from './core/animations/change-route-animation';
import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeChangeAnimation
  ]
})
export class AppComponent implements OnInit, AfterContentInit {
  asideNeedShow = false;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    WebFont.load({
      google: {
        families: ['Montserrat:wght@400;500;600;700;800;900&display=swap']
      }
    });
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
