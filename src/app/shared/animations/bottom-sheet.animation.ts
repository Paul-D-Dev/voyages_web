import { animate, state, style, transition, trigger } from "@angular/animations";

export const bottomSheetAnimation = trigger('bottomSheetAnimation', [
  // close state
  state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
  // open state
  state('*', style({ transform: 'translateY(0)', opacity: 1 })),
  transition('void <=> *', animate('300ms ease-in-out'))
]);
