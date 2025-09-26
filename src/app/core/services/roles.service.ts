import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { urlApiViviendo } from '../api-url';

export interface Role {
  id: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = urlApiViviendo + '/roles';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getRoles(): Observable<Role[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Role[]>(this.apiUrl, { headers });
  }

  createRole(role: Omit<Role, 'id'>): Observable<Role> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Role>(this.apiUrl, role, { headers });
  }
}