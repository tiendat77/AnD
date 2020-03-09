import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_LANGUAGE } from '../../environments/storage.key';

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

    this.storage.get(STORAGE_LANGUAGE).then(lang => {
      if (lang) {
        this.translate.use(lang);
        this.currentLanguage.next(lang);
      } else {
        this.changeLanguage('vi');
      }
    });
  }

  public changeLanguage(lang: string) {
    this.translate.use(lang);
    this.storage.set(STORAGE_LANGUAGE, lang);
    this.currentLanguage.next(lang);
  }
}
