import {
  useAnimation,
  keyframes,
  animate,
  style,
  transition,
  animation,
  trigger,
  state
} from '@angular/animations';

export const fadeInAnimation = animation(
  [style({ opacity: 0 }), animate('{{ duration }} {{ easing }}')],
  {
    params: {
      duration: '2s',
      easing: 'ease-out'
    }
  }
);

export const fade = trigger('fade', [
  transition(':enter', [useAnimation(fadeInAnimation)]),

  transition(':leave', [animate(1000, style({ opacity: 0 }))])
]);

export const progressInAnimation = animation(
  [style({ width: '0%' }), animate('{{ duration }} {{ easing }}')],
  {
    params: {
      duration: '1s',
      easing: 'ease-out'
    }
  }
);

export const bounceOutLeftAnimation = animation(
  animate(
    '0.5s ease-out',
    keyframes([
      style({
        offset: 0.2,
        opacity: 1,
        transform: 'translateX(20px)'
      }),
      style({
        offset: 1,
        opacity: 0,
        transform: 'translateX(-100%)'
      })
    ])
  )
);

export const slide = trigger('slide', [
  transition(':enter', [
    style({
      transform: 'translateX(-10px)'
    }),
    animate(500)
  ]),

  transition(':leave', useAnimation(bounceOutLeftAnimation))
]);
