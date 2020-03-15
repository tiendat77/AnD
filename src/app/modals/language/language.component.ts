import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from '../../providers/language.service';
import { Language, LANGUAGES } from '../../interfaces/language';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {

  languages: Language[];

  constructor(
    private popoverCtrl: PopoverController,
    public languageService: LanguageService
  ) { }

  ngOnInit() {
    this.languages = LANGUAGES;
  }

  changeLanguage(lang: Language) {
    this.languageService.changeLanguage(lang);
    this.popoverCtrl.dismiss();
  }

}
