import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';
import { AuthService } from './auth.service';

export interface Corresponsal {
  id: number;
  numero: string;
  nombre: string;
}

export interface AsignarEmpresaRequest {
  numero: number;
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

  asignarEmpresa(usuarioId: number, numero: number) {
  const url = `${this.apiUrl}/corresponsales/${usuarioId}/empresa`;
  const body = { numero: numero };  // ← N mayúscula
  return this.http.put(url, body, { 
    headers: this.getHeaders().set('Content-Type', 'application/json') 
  });
}

}
