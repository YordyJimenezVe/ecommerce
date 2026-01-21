import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  template: `
    <!-- breadcrumbs -->
    <div class="container py-4 flex items-center gap-3">
        <a routerLink="/" class="text-primary text-base">
            <i class="las la-home"></i>
        </a>
        <span class="text-sm text-gray-400">
            <i class="las la-angle-right"></i>
        </span>
        <p class="text-gray-600 font-medium">Política de Privacidad</p>
    </div>
    <!-- ./breadcrumbs -->

    <div class="container section_padding pb-5">
        <h2 class="mb-4 text-center" style="color: var(--primary);">Política de Privacidad</h2>
        
        <div class="privacy-content p-4">
            <p class="text-gray-600 mb-4">
                En Megarys, accesible desde megarys.com, una de nuestras principales prioridades es la privacidad de nuestros visitantes.
                Este documento de Política de Privacidad contiene tipos de información que es recopilada y registrada por Megarys y cómo la usamos.
            </p>

            <div class="row mt-5">
                <div class="col-md-6 mb-4">
                    <div class="d-flex mb-3">
                        <div class="me-3 text-primary" style="font-size: 2rem;">
                            <i class="las la-user-shield"></i>
                        </div>
                        <div>
                            <h5 style="color: var(--primary);">Información que recopilamos</h5>
                            <p class="text-gray-500 text-sm mt-2">
                                Recopilamos información personal que nos proporcionas voluntariamente al registrarte en el sitio, expresar interés en obtener información sobre nosotros o nuestros productos, o al contactarnos.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="d-flex mb-3">
                        <div class="me-3 text-primary" style="font-size: 2rem;">
                            <i class="las la-server"></i>
                        </div>
                        <div>
                            <h5 style="color: var(--primary);">Cómo usamos tu información</h5>
                            <p class="text-gray-500 text-sm mt-2">
                                Usamos la información que recopilamos para operar, mantener y mejorar nuestro sitio web, así como para comunicarnos contigo sobre promociones, novedades y tu cuenta.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="d-flex mb-3">
                        <div class="me-3 text-primary" style="font-size: 2rem;">
                            <i class="las la-cookie-bite"></i>
                        </div>
                        <div>
                            <h5 style="color: var(--primary);">Cookies y Web Beacons</h5>
                            <p class="text-gray-500 text-sm mt-2">
                                Como cualquier otro sitio web, Megarys utiliza 'cookies'. Estas cookies se utilizan para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web que el visitante accedió o visitó.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="d-flex mb-3">
                        <div class="me-3 text-primary" style="font-size: 2rem;">
                            <i class="las la-lock"></i>
                        </div>
                        <div>
                            <h5 style="color: var(--primary);">Seguridad de Datos</h5>
                            <p class="text-gray-500 text-sm mt-2">
                                Valoramos tu confianza al proporcionarnos tu información personal, por lo que nos esforzamos por utilizar medios comercialmente aceptables para protegerla.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 p-4 bg-light rounded">
                <p class="text-sm text-gray-600 mb-0">
                    Si tienes preguntas adicionales o requieres más información sobre nuestra Política de Privacidad, no dudes en contactarnos a través de correo electrónico en <strong>info@megarys.com</strong>.
                </p>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .text-primary { color: var(--primary) !important; }
    .text-gray-600 { color: #4B5563; }
    .text-gray-500 { color: #6B7280; }
    .text-sm { font-size: 0.875rem; }
    .bg-light { background-color: #F3F4F6 !important; }
    .rounded { border-radius: 0.5rem; }
  `]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
