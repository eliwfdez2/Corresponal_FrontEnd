import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from './auth.service';
import { urlApiViviendo } from '../api-url';

// Custom validator for combined form: exactly one of usuario_id or corresponsal_id must be selected
export function exactlyOneSelected(control: AbstractControl): ValidationErrors | null {
  const usuarioId = control.get('usuario_id')?.value;
  const corresponsalId = control.get('corresponsal_id')?.value;
  if ((usuarioId && corresponsalId) || (!usuarioId && !corresponsalId)) {
    return { exactlyOneRequired: true };
  }
  return null;
}

export interface Referencia {
  id: number;
  referencia: string;
  creador_id: number;
  creador_nombre: string;
  estatus_id: number;
  estatus_nombre: string;
  fecha_creacion: string;
}

export interface ReferenciaDetalle extends Referencia {
  documents: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ReferenciasService {

  private apiUrl = urlApiViviendo;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getReferencias(): Observable<Referencia[]> {
    return this.http.get<Referencia[]>(`${this.apiUrl}/referencias/asignadas`, { headers: this.getHeaders() });
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

  viewDocumento(codigo: string, nombre: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/documento/${codigo}/${nombre}`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }

  uploadDocumentos(codigo: string, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('codigo', codigo);
    files.forEach(file => formData.append('files', file, file.name));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/documentos`, formData, { headers });
  }

  updateDocumentoStatus(referenciaId: string, documentoId: number, status: string, nombreDocumento: string, observaciones: string): Observable<any> {
    const estadoMap: { [key: string]: string } = {
      'valido': 'Valido',
      'no-valido': 'No valido',
      'pendiente': 'Pendiente por revisar'
    };
    const payload = {
      autorizado: true,
      estado: estadoMap[status] || status,
      nombre_documento: nombreDocumento,
      observaciones: observaciones
    };
    return this.http.post(`${this.apiUrl}/documentos/validar`, payload, { headers: this.getHeaders() });
  }

  createReferencia(referencia: { referencia: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/referencias`, referencia, { headers: this.getHeaders() });
  }

  assignReferencia(referencia: string, usuario_id: number): Observable<any> {
    const payload = { referencia, usuario_id };
    return this.http.post(`${this.apiUrl}/referencias/asignar`, payload, { headers: this.getHeaders() });
  }

  unassignReferencia(referencia: string, usuario_id: number): Observable<any> {
    const payload = { referencia, usuario_id };
    return this.http.post(`${this.apiUrl}/referencias/desasignar`, payload, { headers: this.getHeaders() });
  }

  getUsuariosAsignados(referencia: string): Observable<any[]> {
    const params = new HttpParams().set('referencia', referencia);
    return this.http.get<any[]>(`${this.apiUrl}/referencias/usuarios`, { headers: this.getHeaders(), params });
  }

  getCorresponsalesAsignados(referencia: string): Observable<any[]> {
    const params = new HttpParams().set('referencia', referencia);
    return this.http.get<any[]>(`${this.apiUrl}/referencias/corresponsales`, { headers: this.getHeaders(), params });
  }

  assignCorresponsal(corresponsalNumero: number, referencia: string): Observable<any> {
    const payload = { corresponsal_numero: corresponsalNumero, referencia };
    return this.http.post(`${this.apiUrl}/referencias/asignar-corresponsal`, payload, { headers: this.getHeaders() });
  }

  unassignCorresponsal(corresponsalNumero: number, referencia: string): Observable<any> {
    const payload = { corresponsal_numero: corresponsalNumero, referencia };
    return this.http.post(`${this.apiUrl}/referencias/desasignar-corresponsal`, payload, { headers: this.getHeaders() });
  }
}
