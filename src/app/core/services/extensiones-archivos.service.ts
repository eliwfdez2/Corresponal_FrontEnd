import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class ExtensionesArchivosService {
  private apiUrl = urlApiViviendo + '/extensiones-archivos';

  constructor(private http: HttpClient) {}

  private getHeaders(includeContentType: boolean = true): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers: any = {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }
    return new HttpHeaders(headers);
  }

  createExtensionArchivo(extensionArchivo: any): Observable<any> {
    return this.http.post(this.apiUrl, extensionArchivo, { headers: this.getHeaders() });
  }

  getExtensionesArchivos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders(false) });
  }

  updateExtensionArchivo(id: number, extensionArchivo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, extensionArchivo, { headers: this.getHeaders() });
  }

  deleteExtensionArchivo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(false) });
  }
}