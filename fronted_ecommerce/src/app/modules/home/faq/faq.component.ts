import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-faq',
    template: `
    <!-- breadcrumbs -->
    <div class="container py-4 flex items-center gap-3">
        <a routerLink="/" class="text-primary text-base">
            <i class="las la-home"></i>
        </a>
        <span class="text-sm text-gray-400">
            <i class="las la-angle-right"></i>
        </span>
        <p class="text-gray-600 font-medium">Preguntas Frecuentes</p>
    </div>
    <!-- ./breadcrumbs -->

    <div class="container section_padding pb-5">
        <h2 class="mb-5 text-center" style="color: var(--primary);">Preguntas Frecuentes</h2>
        
        <div class="row justify-content-center">
            <div class="col-lg-10">
                
                <div class="faq-section mb-4">
                    <h4 class="mb-3 ps-2 border-start border-4 border-primary" style="color: var(--primary);">Envíos y Entregas</h4>
                    
                    <div class="faq-item mb-3 p-3 border rounded bg-white shadow-sm">
                        <details>
                            <summary class="font-medium cursor-pointer" style="color: var(--primary);">¿Cuánto tiempo tarda en llegar mi pedido?</summary>
                            <p class="mt-2 text-gray-600 text-sm pl-3">
                                El tiempo de entrega y los costos de envío dependen de las empresas que publican los productos. Te recomendamos revisar la información específica en cada publicación.
                            </p>
                        </details>
                    </div>
                    
                    <div class="faq-item mb-3 p-3 border rounded bg-white shadow-sm">
                        <details>
                            <summary class="font-medium cursor-pointer" style="color: var(--primary);">¿Cuál es el costo de envío?</summary>
                            <p class="mt-2 text-gray-600 text-sm pl-3">
                                El costo de envío varía según el peso del producto y el destino. Puedes calcular el costo exacto en el carrito de compras antes de finalizar tu pedido. ¡Ofrecemos envío gratis en compras superiores a S/ 200 en productos seleccionados!
                            </p>
                        </details>
                    </div>
                </div>

                <div class="faq-section mb-4">
                    <h4 class="mb-3 ps-2 border-start border-4 border-primary" style="color: var(--primary);">Pagos</h4>
                    
                    <div class="faq-item mb-3 p-3 border rounded bg-white shadow-sm">
                        <details>
                            <summary class="font-medium cursor-pointer" style="color: var(--primary);">¿Qué métodos de pago aceptan?</summary>
                            <p class="mt-2 text-gray-600 text-sm pl-3">
                                Existen diversos medios de pago que varían según la empresa que publica el producto. Podrás ver las opciones disponibles al momento de realizar tu compra.
                            </p>
                        </details>
                    </div>
                    
                    <div class="faq-item mb-3 p-3 border rounded bg-white shadow-sm">
                        <details>
                            <summary class="font-medium cursor-pointer" style="color: var(--primary);">¿Es seguro comprar en Megarys?</summary>
                            <p class="mt-2 text-gray-600 text-sm pl-3">
                                Absolutamente. Utilizamos pasarelas de pago certificadas y encriptación SSL para asegurar que todos tus datos personales y financieros estén protegidos en todo momento.
                            </p>
                        </details>
                    </div>
                </div>

                <div class="faq-section mb-4">
                    <h4 class="mb-3 ps-2 border-start border-4 border-primary" style="color: var(--primary);">Devoluciones</h4>
                    
                    <div class="faq-item mb-3 p-3 border rounded bg-white shadow-sm">
                        <details>
                            <summary class="font-medium cursor-pointer" style="color: var(--primary);">¿Puedo devolver un producto?</summary>
                            <p class="mt-2 text-gray-600 text-sm pl-3">
                                Sí, aceptamos devoluciones dentro de los primeros 7 días calendario tras la recepción del producto, siempre que este se encuentre en su empaque original y sin señales de uso.
                            </p>
                        </details>
                    </div>
                </div>

            </div>
        </div>
    </div>
  `,
    styles: [`
    .text-primary { color: var(--primary) !important; }
    .border-primary { border-color: var(--primary) !important; }
    .cursor-pointer { cursor: pointer; }
    .text-gray-600 { color: #4B5563; }
    .text-sm { font-size: 0.9rem; }
    .bg-white { background-color: #ffffff; }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
    .rounded { border-radius: 0.5rem; }
    details > summary { list-style: none; outline: none; font-weight: 500; }
    details > summary::-webkit-details-marker { display: none; }
    details[open] > summary { margin-bottom: 0.5rem; font-weight: 600; }
  `]
})
export class FaqComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }
}
