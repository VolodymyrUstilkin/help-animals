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
        transition('home => login', slideTo('left')),
        transition('animals => about', slideTo('right')),
        transition('animals => donate', slideTo('right')),
        transition('animals => login', slideTo('left')),
        transition('about <=> home', fader()),
        transition('about => animals', slideTo('left')),
        transition('about => donate', slideTo('right')),
        transition('about => login', slideTo('left')),
        transition('donate <=> home', fader()),
        transition('donate => about', slideTo('left')),
        transition('donate => animals', slideTo('left')),
        transition('donate => login', slideTo('left')),
        transition('login => home', fader()),
        transition('login => animals', fader()),
        transition('login => about', slideTo('right')),
        transition('login => donate', slideTo('right')),
        transition('login => passwordrecovery', slideTo('right')),
        transition('passwordrecovery => home', fader()),
        transition('passwordrecovery => animals', fader()),
        transition('passwordrecovery => about', slideTo('right')),
        transition('passwordrecovery => donate', slideTo('right')),
        transition('resetpassword => login', slideTo('left')),
        transition('resetpassword => home', fader()),
        transition('resetpassword => animals', fader()),
        transition('resetpassword => about', slideTo('right')),
        transition('resetpassword => donate', slideTo('right')),
      ]);


