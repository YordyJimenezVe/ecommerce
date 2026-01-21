import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-terms-conditions',
    template: `
    <div class="container section_padding">
      <h2 class="text-center mb-4">Términos y Condiciones</h2>
      <p class="text-center">Contenido de Términos y Condiciones...</p>
    </div>
  `
})
export class TermsConditionsComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }
}
