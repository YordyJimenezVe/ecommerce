import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-faq',
    template: `
    <div class="container section_padding">
      <h2 class="text-center mb-4">Preguntas Frecuentes</h2>
      <p class="text-center">Contenido de Preguntas Frecuentes...</p>
    </div>
  `
})
export class FaqComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }
}
