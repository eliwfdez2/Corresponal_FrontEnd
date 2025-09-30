import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CorresponsalService } from '../../core/services/corresponsal.service';

@Component({
  selector: 'app-crear-corresponsal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-corresponsal.component.html',
  styleUrl: './crear-corresponsal.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-50px)', opacity: 0 }))
      ])
    ])
  ]
})
export class CrearCorresponsalComponent {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() corresponsalCreated = new EventEmitter<any>();

  corresponsalData = {
    nombre_completo: '',
    nombre_usuario: '',
    password: '',
    correo_electronico: '',
    rol_nombre: 'Corresponsal'
  };

  successMessage: string = '';

  constructor(private corresponsalService: CorresponsalService) {}

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.saveCorresponsal();
    }
  }

  saveCorresponsal() {
    if (this.isFormValid()) {
      const payload = {
        nombre_completo: this.corresponsalData.nombre_completo,
        nombre_usuario: this.corresponsalData.nombre_usuario,
        password: this.corresponsalData.password,
        correo_electronico: this.corresponsalData.correo_electronico,
        rol_nombre: 'Corresponsal'
      };

      this.corresponsalService.crearUsuarios(payload).subscribe({
        next: (response: any) => {
          this.successMessage = '¡Corresponsal creado correctamente!';
          this.corresponsalCreated.emit(response);
          setTimeout(() => {
            this.successMessage = '';
            this.closeModal();
          }, 2000); // Oculta el mensaje después de 2 segundos
        },
        error: (err: any) => {
          console.error('Error creando corresponsal:', err);
        }
      });
    }
  }

  private isFormValid(): boolean {
    return this.corresponsalData.nombre_completo.trim() !== '' &&
           this.corresponsalData.nombre_usuario.trim() !== '' &&
           this.corresponsalData.password.trim() !== '' &&
           this.corresponsalData.correo_electronico.trim() !== '';
  }

  private resetForm() {
    this.corresponsalData = {
      nombre_completo: '',
      nombre_usuario: '',
      password: '',
      correo_electronico: '',
      rol_nombre: 'Corresponsal'
    };
  }
}
