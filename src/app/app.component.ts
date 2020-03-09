import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { version } from '../environments/version';
import { STORAGE_THEME, STORAGE_TUTORIAL } from '../environments/storage.key';

import { LanguageService } from './providers/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  dark = false;

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private menu: MenuController,
    public languageService: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get(STORAGE_THEME).then(res => {
        if (res) { this.dark = res; }
      });
    });

    document.title = `AnD2 (${version})`;
    this.languageService.initialize();
  }

  changeLanguage(event: any) {
    const lang = event.detail.value.toString();
    this.languageService.changeLanguage(lang);
  }

  showTutorial() {
    this.menu.enable(false);
    this.storage.set(STORAGE_TUTORIAL, false);
    this.router.navigateByUrl('/tutorial');
  }

  showAbout() {
    this.router.navigateByUrl('/about');
  }

  toggleTheme() {
    this.storage.set(STORAGE_THEME, this.dark);
  }
}
