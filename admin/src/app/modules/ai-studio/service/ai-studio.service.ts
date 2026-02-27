import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class AiStudioService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getKnowledges() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/ai-studio/knowledges";
    return this.http.get(URL, { headers: headers });
  }

  storeKnowledge(data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/ai-studio/knowledge";
    return this.http.post(URL, data, { headers: headers });
  }

  updateKnowledge(id: any, data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/ai-studio/knowledge/" + id;
    return this.http.put(URL, data, { headers: headers });
  }

  deleteKnowledge(id: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/ai-studio/knowledge/" + id;
    return this.http.delete(URL, { headers: headers });
  }

  getLogs() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/ai-studio/logs";
    return this.http.get(URL, { headers: headers });
  }

  askAI(query: string) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/ai-studio/ask";
    return this.http.post(URL, { query: query }, { headers: headers });
  }
}
