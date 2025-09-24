import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-actualizar-informacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar-informacion.component.html',
  styleUrl: './actualizar-informacion.component.css'
})
export class ActualizarInformacionComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() infoUpdated = new EventEmitter<void>();

  userInfoForm: FormGroup;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.userInfoForm = this.fb.group({
      nombre_completo: ['', [Validators.required]],
      nombre_usuario: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Pre-fill with current values from token
    const currentName = this.authService.getUserName() || '';
    const currentRole = this.authService.getUserRole() || '';
    // Assuming nombre_completo might be stored elsewhere, for now use nombre_usuario
    this.userInfoForm.patchValue({
      nombre_completo: currentName,
      nombre_usuario: currentName
    });
  }

  onSubmit() {
    if (this.userInfoForm.valid) {
      this.isLoading = true;
      this.message = '';

      this.authService.updateUserInfo(this.userInfoForm.value).subscribe({
        next: (response) => {
          this.message = 'Información actualizada exitosamente';
          this.messageType = 'success';
          this.infoUpdated.emit();
          this.isLoading = false;
        },
        error: (error) => {
          this.message = 'Error al actualizar la información: ' + (error.error?.message || 'Error desconocido');
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
