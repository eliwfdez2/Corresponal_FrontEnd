import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';

export interface Corresponsal {
  numero: string;  // the name
  nombre: string;  // the numero
}

@Injectable({ providedIn: 'root' })
export class CorresponsalService {
  private apiUrl = urlApiViviendo;

  constructor(private http: HttpClient) {}

  getCorresponsales(): Observable<Corresponsal[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Corresponsal[]>(`${this.apiUrl}/corresponsales`, { headers });
  }

  crearUsuarios(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/usuarios`, data, { headers });
  }

  getCorresponsalesActivos(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/corresponsales`, { headers });
  }
}