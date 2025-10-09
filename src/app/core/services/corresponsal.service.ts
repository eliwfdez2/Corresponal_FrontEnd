import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';
import { AuthService } from './auth.service';

export interface Corresponsal {
  numero: string;  // the name
  nombre: string;  // the numero
}

@Injectable({ providedIn: 'root' })
export class CorresponsalService {
  private apiUrl = urlApiViviendo;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCorresponsales(): Observable<Corresponsal[]> {
    return this.http.get<Corresponsal[]>(`${this.apiUrl}/corresponsales`, { headers: this.getHeaders() });
  }

  crearUsuarios(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(`${this.apiUrl}/usuarios`, data, { headers });
  }

}