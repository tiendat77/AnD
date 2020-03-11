import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_LANGUAGE } from '../../environments/storage.key';
import { LANGUAGES, Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage: BehaviorSubject<Language> = new BehaviorSubject({ value: 'vi', display: 'Vietnamese' });

  constructor(
    private storage: Storage,
    private translate: TranslateService,
  ) { }

  initialize() {
    this.translate.setDefaultLang('vi');

    this.storage.get(STORAGE_LANGUAGE).then(lang => {
      if (lang) {
        const selectedLanguage = LANGUAGES.filter(d => d.value === lang)[0];
        this.currentLanguage.next(selectedLanguage);
        this.translate.use(lang);
      } else {
        this.changeLanguage({ value: 'vi', display: 'Vietnamese' });
      }
    });
  }

  public changeLanguage(lang: Language) {
    this.translate.use(lang.value);
    this.storage.set(STORAGE_LANGUAGE, lang.value);
    this.currentLanguage.next(lang);
  }
}
