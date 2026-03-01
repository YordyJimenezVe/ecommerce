import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth';
import { URL_SERVICIOS, URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {

  requests: any = [];
  isLoading = false;
  statusFilter = 'pending';
  URL = URL_BACKEND;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  get headers() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
    });
  }

  loadRequests() {
    this.isLoading = true;
    let url = `${URL_SERVICIOS}/admin/premium/requests`;
    if (this.statusFilter !== 'all') {
      url += `?status=${this.statusFilter}`;
    }

    this.http.get(url, { headers: this.headers }).subscribe({
      next: (res: any) => {
        this.requests = res.data || Object.values(res.data) || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  approve(item: any) {
    const months = prompt(`Aprobar Solicitud para ${item.company?.name}\n\nIngrese la duración en MESES (ej. 1, 6, 12):`, '1');
    if (!months || isNaN(+months) || +months < 1) return;

    const notes = prompt(`Ingrese un motivo o descripción de la aprobación:\nej: "Transferencia verificada en BCP"`);
    if (!notes) return;

    const url = `${URL_SERVICIOS}/admin/premium/requests/${item.id}/approve`;
    this.isLoading = true;
    this.http.put(url, { duration_months: +months, admin_notes: notes }, { headers: this.headers })
      .subscribe({
        next: () => {
          alert('Solicitud Aprobada');
          this.loadRequests();
        },
        error: (err) => {
          alert('Error: ' + err.error?.message);
          this.isLoading = false;
        }
      });
  }

  reject(item: any) {
    const notes = prompt(`Rechazar Solicitud para ${item.company?.name}\n\nIngrese el motivo del rechazo:\nej: "Comprobante falso o ilegible"`);
    if (!notes) return;

    const url = `${URL_SERVICIOS}/admin/premium/requests/${item.id}/reject`;
    this.isLoading = true;
    this.http.put(url, { admin_notes: notes }, { headers: this.headers })
      .subscribe({
        next: () => {
          alert('Solicitud Rechazada');
          this.loadRequests();
        },
        error: (err) => {
          alert('Error: ' + err.error?.message);
          this.isLoading = false;
        }
      });
  }

  formatModule(mod: string) {
    if (mod === 'ai_studio') return 'Estudio IA';
    if (mod === 'support_analytics') return 'Soporte Analytics';
    if (mod === 'both') return 'Ambos';
    return mod;
  }
}
