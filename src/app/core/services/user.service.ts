import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';

export interface User {
  id: number;
  nombre_usuario: string;
  nombre_completo: string;
  correo_electronico: string;
  rol_id: number;
  rol_nombre: string;
  activo: boolean;
  creado_en: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = urlApiViviendo + '/usuarios';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User[]>(this.apiUrl, { headers });
  }
}