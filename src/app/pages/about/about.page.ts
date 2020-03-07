import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  async goBack() {
    return await this.nav.pop();
  }
}
