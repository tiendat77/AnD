import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { Page } from './interfaces/page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  dark = false;
  pages: Page[] = [
    {
      title: 'Lunar',
      url: '/tabs/lunar',
      icon: 'home'
    },
    {
      title: 'Date Diff',
      url: '/tabs/date-diff',
      icon: 'calendar'
    },
    {
      title: 'Tool',
      url: '/tabs/tool',
      icon: 'hammer'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private menu: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('DARK_THEME').then(res => {
        if (res) { this.dark = res; }
      });
    });
  }

  showTutorial() {
    this.menu.enable(false);
    this.storage.set('DID_TUTORIAL', false);
    this.router.navigateByUrl('/tutorial');
  }

  showAbout() {
    this.router.navigateByUrl('/about');
  }

  toggleTheme() {
    this.storage.set('DARK_THEME', this.dark);
  }
}
