import * as HammerJs from 'hammerjs';
import { HammerGestureConfig } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: HammerJs.DIRECTION_ALL}
  };
}
