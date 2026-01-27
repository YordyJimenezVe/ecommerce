import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS, URL_BACKEND } from 'src/app/config/config';
import { AuthService } from '../../auth';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {

    constructor(
        public http: HttpClient,
        public auth: AuthService,
    ) { }

    listCompanies() {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies";
        return this.http.get(URL, { headers: headers }).pipe(
            map((resp: any) => {
                resp.companies = resp.companies.map((company: any) => {
                    if (company.logo) {
                        console.log('DEBUG: Accessing logo with backend:', URL_BACKEND);
                        company.logo = URL_BACKEND + 'storage/' + company.logo;
                    }
                    return company;
                });
                return resp;
            })
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
        return this.http.put(URL, data, { headers: headers });
    }

    deleteCompany(company_id: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies/" + company_id;
        return this.http.delete(URL, { headers: headers });
    }

    toggleStatus(company_id: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/companies/toggle-status/" + company_id;
        return this.http.post(URL, {}, { headers: headers });
    }
}
