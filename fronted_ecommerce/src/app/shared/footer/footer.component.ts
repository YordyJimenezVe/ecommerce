import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentLang: string = 'es';

  constructor(public languageService: LanguageService) {
    this.languageService.currentLang$.subscribe((lang: string) => {
      this.currentLang = lang;
    });
  }

  ngOnInit(): void {
  }

}
