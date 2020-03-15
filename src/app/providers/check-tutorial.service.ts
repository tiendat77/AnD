import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { STORAGE_TUTORIAL } from '../../environments/storage.key';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  canLoad() {
    return this.storage.get(STORAGE_TUTORIAL).then(res => {
      if (res) {
        this.router.navigate(['/tabs', 'lunar']);
        return false;
      } else {
        return true;
      }
    });
  }
}
