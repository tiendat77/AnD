import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  showSkip = true;

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('DID_TUTORIAL').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/tabs/lunar', { replaceUrl: true });
      }
    });
  }

  startApp() {
    this.menu.enable(true);

    this.router
      .navigateByUrl('tabs/lunar', { replaceUrl: true })
      .then(() => this.storage.set('DID_TUTORIAL', true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }
}