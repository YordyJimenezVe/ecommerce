import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    constructor(
        private http: HttpClient,
        public auth: AuthService,
    ) { }

    resetDatabase() {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        let URL = URL_SERVICIOS + "/admin/system/reset-data";
        return this.http.post(URL, {}, { headers: headers });
    }
}
