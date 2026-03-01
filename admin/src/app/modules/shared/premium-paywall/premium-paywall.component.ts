import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-premium-paywall',
  templateUrl: './premium-paywall.component.html',
  styleUrls: ['./premium-paywall.component.scss']
})
export class PremiumPaywallComponent implements OnInit {

  @Input() moduleName: string = 'Estudio de IA';
  @Input() moduleCode: string = 'ai_studio';

  paymentMode: 'selection' | 'manual' | 'processing' | 'success' = 'selection';

  fileToUpload: File | null = null;
  paymentAmount: number = 100;
  paymentMethod: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }

  payWith(method: string) {
    this.paymentMethod = method;
    if (method === 'transfer') {
      this.paymentMode = 'manual';
    } else {
      // Auto payment (paypal, credit_card)
      this.submitRequest();
    }
  }

  submitRequest() {
    if (this.paymentMethod === 'transfer' && !this.fileToUpload) {
      this.errorMessage = 'Debe adjuntar el comprobante de pago.';
      return;
    }

    this.paymentMode = 'processing';
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('module', this.moduleCode);
    formData.append('payment_method', this.paymentMethod);
    formData.append('amount', this.paymentAmount.toString());
    formData.append('currency', 'USD');
    if (this.fileToUpload) {
      formData.append('payment_proof', this.fileToUpload, this.fileToUpload.name);
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
    });

    this.http.post(`${URL_SERVICIOS}/premium/requests`, formData, { headers })
      .subscribe({
        next: (res: any) => {
          this.paymentMode = 'success';
          if (res.status === 'approved') {
            // Relogin to update permissions in localstorage
            this.authService.logout();
            alert(res.message + ' Por favor inicia sesión nuevamente para aplicar los cambios.');
          }
        },
        error: (err) => {
          this.paymentMode = 'selection';
          this.errorMessage = err.error?.message || 'Hubo un error al procesar su solicitud.';
        }
      });
  }

  cancelManual() {
    this.paymentMode = 'selection';
    this.fileToUpload = null;
    this.errorMessage = '';
  }
}
