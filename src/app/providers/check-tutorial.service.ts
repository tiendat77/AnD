import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  canLoad() {
    return this.storage.get('DID_TUTORIAL').then(res => {
      if (res) {
        this.router.navigate(['/tabs', 'lunar']);
        return false;
      } else {
        return true;
      }
    });
  }
}
