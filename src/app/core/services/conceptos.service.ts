import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {
  private apiUrl = urlApiViviendo + '/conceptos';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createConcepto(concepto: any): Observable<any> {
    return this.http.post(this.apiUrl, concepto, { headers: this.getHeaders() });
  }

  getConceptos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateConcepto(id: number, concepto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, concepto, { headers: this.getHeaders() });
  }

  deleteConcepto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}