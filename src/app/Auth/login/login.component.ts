import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
export class LoginComponent {
  loginData: LoginData = {
    username: '',
    password: '',
    rememberUser: false
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.loginData.username && this.loginData.password) {
      console.log('Intento de inicio de sesión', this.loginData);
      
      // Simulate successful login
      alert(`¡Bienvenido ${this.loginData.username}! Redirigiendo al dashboard...`);
      
      // Redirect to dashboard after successful login
      this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
