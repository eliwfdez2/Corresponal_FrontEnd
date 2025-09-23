import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

interface LoginData {
  username: string;
  password: string;
  rememberUser: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  nombre_usuario: string = '';
  password_hash: string = '';
  error: string = '';
  loading: boolean = false;
  rememberUser: boolean = false;   // 👈 ahora existe



  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('nombre_usuario');
    if (savedUser) {
      this.nombre_usuario = savedUser;
      this.rememberUser = true;
    }
  }

  login(): void {
    this.loading = true;
    this.error = '';

    this.authService.login(this.nombre_usuario, this.password_hash, this.rememberUser).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
        this.loading = false;
      }
    });
  }
}
