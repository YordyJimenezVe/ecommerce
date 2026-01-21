import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-terms-conditions',
    template: `
    <!-- breadcrumbs -->
    <div class="container py-4 flex items-center gap-3">
        <a routerLink="/" class="text-primary text-base">
            <i class="las la-home"></i>
        </a>
        <span class="text-sm text-gray-400">
            <i class="las la-angle-right"></i>
        </span>
        <p class="text-gray-600 font-medium">Términos y Condiciones</p>
    </div>
    <!-- ./breadcrumbs -->

    <div class="container section_padding pb-5">
        <h2 class="mb-4 text-center" style="color: var(--primary);">Términos y Condiciones de Uso</h2>
        
        <div class="terms-content p-4 border rounded shadow-sm bg-white">
            <div class="mb-4">
                <h4 class="mb-2" style="color: var(--primary);">1. Introducción</h4>
                <p class="text-gray-600 text-justify">
                    Bienvenido a Megarys. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Megarys.
                    Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes usando el sitio web de Megarys si no aceptas todos los términos y condiciones establecidos en esta página.
                </p>
            </div>

            <div class="mb-4">
                <h4 class="mb-2" style="color: var(--primary);">2. Licencia</h4>
                <p class="text-gray-600 text-justify">
                    A menos que se indique lo contrario, Megarys y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Megarys.
                    Todos los derechos de propiedad intelectual están reservados. Puedes ver y/o imprimir páginas desde https://megarys.com para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
                </p>
            </div>

            <div class="mb-4">
                <h4 class="mb-2" style="color: var(--primary);">3. Restricciones</h4>
                <p class="text-gray-600 text-justify">
                    Está específicamente prohibido:
                </p>
                <ul class="list-disc pl-5 text-gray-600">
                    <li>Publicar material de nuestro sitio web en cualquier otro medio sin permiso.</li>
                    <li>Vender, sublicenciar y/o comercializar cualquier material del sitio web.</li>
                    <li>Usar este sitio web de cualquier manera que sea, o pueda ser, dañina para este sitio web.</li>
                    <li>Usar este sitio web contrario a las leyes y regulaciones aplicables.</li>
                </ul>
            </div>


            <div class="mb-4">
                <h4 class="mb-2" style="color: var(--primary);">4. Envíos y Devoluciones</h4>
                <p class="text-gray-600 text-justify">
                    Megarys se compromete a realizar los envíos en los plazos establecidos en nuestra política de envíos. Las devoluciones están sujetas a los términos y condiciones de la empresa que publica el producto; dichas políticas deben estar detalladas en la descripción de cada producto.
                </p>
            </div>
        </div>
    </div>
  `,
    styles: [`
    .text-primary { color: var(--primary) !important; }
    .text-gray-600 { color: #4B5563; }
    .bg-white { background-color: #ffffff; }
    .border { border: 1px solid #E5E7EB; }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
    .rounded { border-radius: 0.5rem; }
    .text-justify { text-align: justify; }
  `]
})
export class TermsConditionsComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }
}
