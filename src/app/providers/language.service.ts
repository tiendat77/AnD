import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage = new BehaviorSubject('vi');

  constructor(
    private storage: Storage,
    private translate: TranslateService,
  ) { }

  initialize() {
    this.translate.setDefaultLang('vi');

    this.storage.get('LANGUAGE').then(lang => {
      if (lang) {
        this.translate.use(lang);
        this.currentLanguage.next(lang);
      } else {
        this.changeLanguage('vi');
      }
    });
  }

  public changeLanguage(event: any) {
    const lang = event.detail.value.toString();
    this.translate.use(lang);
    this.storage.set('LANGUAGE', lang);
    this.currentLanguage.next(lang);
  }
}
