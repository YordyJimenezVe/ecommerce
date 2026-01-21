import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-us',
    template: `
    <div class="container section_padding">
      <h2 class="text-center mb-4">Sobre Nosotros</h2>
      <p class="text-center">Contenido de Sobre Nosotros...</p>
    </div>
  `
})
export class AboutUsComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }
}
