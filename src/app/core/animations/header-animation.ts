import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const elementAppearanceAnimation =
trigger('elementAppearanceAnimation', [
  transition('void => *', animate('.5s ease-in-out', keyframes([
    style({
      transform: 'scale(0)',
      opacity: '0',
      offset: 0
    }),
    style({
      transform: 'scale(0.4)',
      opacity: '0.4',
      offset: 0.4
    }),
    style({
      transform: 'scale(0.6)',
      opacity: '0.6',
      offset: 0.6
    }),
    style({
      transform: 'scale(0.8)',
      opacity: '0.8',
      offset: 0.8
    }),
    style({
      transform: 'scale(1)',
      opacity: '1',
      offset: 1
    })
  ])))
]);


export const initialMenuAnimation =
trigger('initialMenuAnimation', [
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
]);


export const initialLogoAnimation =
trigger('initialLogoAnimation', [
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
]);
