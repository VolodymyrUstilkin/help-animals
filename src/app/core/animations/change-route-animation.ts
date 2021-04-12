import { animate, group, query, style, transition, trigger } from '@angular/animations';

const slideTo = (direction: string) => {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
        paddingTop: '100px'
      }),
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({[direction]: '100%'}))
      ]),
      query(':enter', [
        animate('600ms ease', style({[direction]: '0%'}))
      ])
    ]),
  ];
  };


const fader = () => {
    return [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ]),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ])
      ];
  };

export const routeChangeAnimation =
      trigger('routeChangeAnimation', [
        transition('home => about', slideTo('right')),
        transition('home => donate', slideTo('right')),
        transition('home <=> animals', fader()),
        transition('animals => about', slideTo('right')),
        transition('animals => donate', slideTo('right')),
        transition('about <=> home', fader()),
        transition('about => animals', slideTo('left')),
        transition('about => donate', slideTo('right')),
        transition('donate <=> home', fader()),
        transition('donate => about', slideTo('left')),
        transition('donate => animals', slideTo('left')),
      ]);


