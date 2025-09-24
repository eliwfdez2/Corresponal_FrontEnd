import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {
  @Output() closeModal = new EventEmitter<void>();

  passwordForm: FormGroup;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.passwordForm = this.fb.group({
      password_actual: ['', [Validators.required]],
      password_nueva: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      this.message = '';

      const userId = this.authService.getUserId();
      if (!userId) {
        this.message = 'Error: No se pudo obtener el ID del usuario';
        this.messageType = 'error';
        this.isLoading = false;
        return;
      }

      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      const body = this.passwordForm.value;

      this.http.put(`http://localhost:8080/usuarios/${userId}/password`, body, { headers })
        .subscribe({
          next: (response) => {
            this.message = 'Contraseña cambiada exitosamente';
            this.messageType = 'success';
            this.passwordForm.reset();
            this.isLoading = false;
          },
          error: (error) => {
            this.message = 'Error al cambiar la contraseña: ' + (error.error?.message || 'Error desconocido');
            this.messageType = 'error';
            this.isLoading = false;
          }
        });
    } else {
      this.message = 'Por favor, complete todos los campos correctamente';
      this.messageType = 'error';
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
