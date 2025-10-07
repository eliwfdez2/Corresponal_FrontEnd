import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  private apiUrl = urlApiViviendo + '/estatus';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createEstatus(estatus: any): Observable<any> {
    return this.http.post(this.apiUrl, estatus, { headers: this.getHeaders() });
  }

  getEstatus(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getEstatusById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateEstatus(id: number, estatus: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, estatus, { headers: this.getHeaders() });
  }

  deleteEstatus(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}