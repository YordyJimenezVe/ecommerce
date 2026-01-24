import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    constructor(private http: HttpClient) { }

    resetDatabase() {
        let URL = URL_SERVICIOS + "/admin/system/reset-data";
        return this.http.post(URL, {});
    }
}
