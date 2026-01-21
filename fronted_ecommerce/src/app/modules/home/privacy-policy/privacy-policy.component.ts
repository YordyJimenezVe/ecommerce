import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-privacy-policy',
    template: `
    <div class="container section_padding">
      <h2 class="text-center mb-4">Política de Privacidad</h2>
      <p class="text-center">Contenido de Política de Privacidad...</p>
    </div>
  `
})
export class PrivacyPolicyComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }
}
