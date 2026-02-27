import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { URL_SERVICIOS, URL_BACKEND } from 'src/app/config/config';
import { AuthService } from '../../auth';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(
        public http: HttpClient,
        public auth: AuthService,
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    listCompanies() {
        this.isLoadingSubject.next(true);
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies";
        return this.http.get(URL, { headers: headers }).pipe(
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    getCompany(company_id: any) {
        this.isLoadingSubject.next(true);
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies/" + company_id;
        return this.http.get(URL, { headers: headers }).pipe(
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    createCompany(data: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies";
        return this.http.post(URL, data, { headers: headers });
    }

    updateCompany(company_id: any, data: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies/" + company_id;
        return this.http.post(URL, data, { headers: headers });
    }

    deleteCompany(company_id: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies/" + company_id;
        return this.http.delete(URL, { headers: headers });
    }

    toggleStatus(company_id: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies/" + company_id + "/status";
        return this.http.post(URL, {}, { headers: headers });
    }

    toggleFreeShipping(company_id: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies/" + company_id + "/free-shipping";
        return this.http.post(URL, {}, { headers: headers });
    }
}
