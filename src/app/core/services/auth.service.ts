import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(nombre_usuario: string, password_hash: string, rememberUser: boolean): Observable<LoginResponse> {
    const body = { nombre_usuario, password_hash };

    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      tap(response => {
        // Guardar token y rol en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);

        // Recordar usuario opcional
        if (rememberUser) {
          localStorage.setItem('nombre_usuario', nombre_usuario);
        } else {
          localStorage.removeItem('nombre_usuario');
        }
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
