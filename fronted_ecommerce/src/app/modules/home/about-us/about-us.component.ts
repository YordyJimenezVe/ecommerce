import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  template: `
    <!-- breadcrumbs -->
    <div class="container py-4 flex items-center gap-3">
        <a routerLink="/" class="text-primary text-base">
            <i class="las la-home"></i>
        </a>
        <span class="text-sm text-gray-400">
            <i class="las la-angle-right"></i>
        </span>
        <p class="text-gray-600 font-medium">Sobre Nosotros</p>
    </div>
    <!-- ./breadcrumbs -->

    <!-- about -->
    <div class="contain py-16">
        <div class="container section_padding">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <img loading="lazy" src="assets/images/about-us.png" alt="about" class="w-100 rounded shadow-sm" style="min-height: 300px; background-color: #f0f0f0; object-fit: cover;" onerror="this.src='https://via.placeholder.com/600x400?text=Megarys+Team'">
                </div>
                <div class="col-lg-6">
                    <h2 class="text-3xl font-medium mb-4 text-uppercase" style="color: var(--primary);">Nuestra Historia</h2>
                    <p class="text-gray-600 mb-4 leading-relaxed">
                        Fundada en 2024, Megarys nació con una visión simple: hacer que el comercio electrónico sea accesible, rápido y confiable para todos en Perú. Lo que comenzó como un pequeño emprendimiento familiar se ha convertido en uno de los destinos de compras en línea más prometedores del país.
                    </p>
                    <p class="text-gray-600 mb-4 leading-relaxed">
                        Nos dedicamos a ofrecer productos de alta calidad a precios competitivos, desde tecnología de punta hasta moda y artículos para el hogar. Nuestra pasión por la excelencia nos impulsa a mejorar continuamente nuestra plataforma y servicios.
                    </p>
                </div>
            </div>

            <div class="row mt-5 pt-4">
                <div class="col-lg-4 text-center mb-4">
                    <div class="p-4 shadow-sm rounded border">
                        <div class="text-5xl text-primary mb-3" style="color: var(--accent);">
                            <i class="las la-shipping-fast" style="font-size: 3rem;"></i>
                        </div>
                        <h4 class="text-xl font-medium mb-2">Envío Rápido</h4>
                        <p class="text-gray-500">
                            Entregas eficientes en Lima y provincias. Tu tiempo es valioso para nosotros.
                        </p>
                    </div>
                </div>
                <div class="col-lg-4 text-center mb-4">
                    <div class="p-4 shadow-sm rounded border">
                        <div class="text-5xl text-primary mb-3" style="color: var(--accent);">
                            <i class="las la-lock" style="font-size: 3rem;"></i>
                        </div>
                        <h4 class="text-xl font-medium mb-2">Pago Seguro</h4>
                        <p class="text-gray-500">
                            Utilizamos tecnología de encriptación avanzada para proteger tus transacciones.
                        </p>
                    </div>
                </div>
                <div class="col-lg-4 text-center mb-4">
                    <div class="p-4 shadow-sm rounded border">
                        <div class="text-5xl text-primary mb-3" style="color: var(--accent);">
                            <i class="las la-headset" style="font-size: 3rem;"></i>
                        </div>
                        <h4 class="text-xl font-medium mb-2">Soporte 24/7</h4>
                        <p class="text-gray-500">
                            Nuestro equipo de atención al cliente está siempre listo para ayudarte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ./about -->
  `,
  styles: [`
    .text-primary { color: var(--primary) !important; }
    .text-gray-600 { color: #4B5563; }
    .text-gray-500 { color: #6B7280; }
    .text-gray-400 { color: #9CA3AF; }
    .border { border: 1px solid #e5e7eb; }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
    .rounded { border-radius: 0.25rem; }
    .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .text-base { font-size: 1rem; line-height: 1.5rem; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  `]
})
export class AboutUsComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
