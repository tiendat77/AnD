import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_LANGUAGE } from '../../environments/storage.key';
import { LANGUAGES } from '../interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage = new BehaviorSubject('');

  constructor(
    private storage: Storage,
    private translate: TranslateService,
  ) { }

  initialize() {
    this.translate.setDefaultLang('vi');

    this.storage.get(STORAGE_LANGUAGE).then(lang => {
      if (lang) {
        const languageName = LANGUAGES.filter(d => d.value === lang)[0].display;
        this.translate.use(lang);
        this.currentLanguage.next(languageName);
      } else {
        this.changeLanguage('vi', 'Vietnamese');
      }
    });
  }

  public changeLanguage(lang: string, name: string) {
    this.translate.use(lang);
    this.storage.set(STORAGE_LANGUAGE, lang);
    this.currentLanguage.next(name);
  }
}
