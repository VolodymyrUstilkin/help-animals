import {AfterViewInit, Component, ElementRef, Input, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import {IAnimalInfo} from '../animal-list/models/ianimal-info';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent  implements AfterViewInit, OnDestroy{

  active = true;
  private subscription: Subscription = new Subscription();
  @Input() animalInfo?: IAnimalInfo;
  @ViewChildren('forward') buttonsForward!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('back') buttonsBack!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit(): void {
    this.subscription.add(this.buttonsForward.forEach((element: ElementRef) => {
      fromEvent<Event>(element.nativeElement, 'click').subscribe((_) => {
        this.active = false;
      });
    }));

    this.subscription.add(this.buttonsForward.changes.subscribe((element) => {
      element.toArray().forEach((el: ElementRef) => {
        fromEvent<Event>(el.nativeElement, 'click').subscribe((_) => {
          this.active = false;
        });
      });
    }));

    this.subscription.add(this.buttonsBack.forEach((element: ElementRef) => {
      fromEvent<Event>(element.nativeElement, 'click').subscribe((_) => {
        this.active = true;
      });
    }));

    this.subscription.add(this.buttonsBack.changes.subscribe((element) => {
      element.toArray().forEach((el: ElementRef) => {
        fromEvent<Event>(el.nativeElement, 'click').subscribe((_) => {
          this.active = true;
        });
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
