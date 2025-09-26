import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Referencia {
  consideracion_pago_en: string;
  creador_id: number;
  creador_nombre: string;
  ejecutiva_id: number;
  ejecutiva_nombre: string;
  estatus_id: number;
  estatus_nombre: string;
  fecha_creacion: string;
  fecha_finalizacion: string;
  id: number;
  referencia: string;
  remesa_cantidad: number;
  remesa_moneda: string;
  solicitud_pago_id: number;
  tiene_remesa: boolean;
}

export interface ReferenciaDetalle extends Referencia {
  documents: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ReferenciasService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getReferencias(): Observable<Referencia[]> {
    return this.http.get<Referencia[]>(`${this.apiUrl}/referencias`, { headers: this.getHeaders() });
  }

  getReferencia(id: string): Observable<ReferenciaDetalle> {
    return this.http.get<ReferenciaDetalle>(`${this.apiUrl}/referencias/${id}`, { headers: this.getHeaders() });
  }

  downloadDocumento(nombre: string, referencia: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'accept': 'application/octet-stream',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const params = new HttpParams().set('nombre', nombre).set('referencia', referencia);
    return this.http.get(`${this.apiUrl}/documentos/download`, {
      headers,
      params,
      responseType: 'blob'
    });
  }

  downloadTodosDocumentos(referencia: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'accept': 'application/octet-stream',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const params = new HttpParams().set('all', 'true').set('referencia', referencia);
    return this.http.get(`${this.apiUrl}/documentos/download`, {
      headers,
      params,
      responseType: 'blob'
    });
  }
}