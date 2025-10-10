import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CorresponsalService } from '../../core/services/corresponsal.service';
import { RolesService } from '../../core/services/roles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-crear-ejecutivas',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-ejecutivas.component.html',
  styleUrl: './crear-ejecutivas.component.css',
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
export class CrearEjecutivasComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() corresponsalCreated = new EventEmitter<any>();

  EjecutivaData = {
    nombre_completo: '',
    nombre_usuario: '',
    password: '',
    correo_electronico: '',
    rol_nombre: ''
  };

  successMessage: string = '';
  rolNombre: string = '';

  constructor(private corresponsalService: CorresponsalService, private rolesService: RolesService) {}

  ngOnInit(): void {
    this.loadRolNombre();
  }

  private loadRolNombre(): void {
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        const ejecutivaRole = roles.find(role => role.nombre === 'Ejecutiva de Cuenta');
        if (ejecutivaRole) {
          this.rolNombre = ejecutivaRole.nombre;
        } else {
          console.error('Rol "Ejecutiva de Cuenta" no encontrado');
        }
      },
      error: (err) => {
        console.error('Error loading roles', err);
      }
    });
  }

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
        nombre_completo: this.EjecutivaData.nombre_completo,
        nombre_usuario: this.EjecutivaData.nombre_usuario,
        password: this.EjecutivaData.password,
        correo_electronico: this.EjecutivaData.correo_electronico,
        rol_nombre: this.rolNombre
      };

      this.corresponsalService.crearUsuarios(payload).subscribe({
        next: (response: any) => {
          this.successMessage = '¡Ejecutiva creada correctamente!';
          this.corresponsalCreated.emit(response);
          setTimeout(() => {
            this.successMessage = '';
            this.closeModal();
          }, 2000); // Oculta el mensaje después de 2 segundos
        },
        error: (err: any) => {
          console.error('Error creando ejecutiva:', err);
        }
      });
    }
  }

  private isFormValid(): boolean {
    return this.EjecutivaData.nombre_completo.trim() !== '' &&
           this.EjecutivaData.nombre_usuario.trim() !== '' &&
           this.EjecutivaData.password.trim() !== '' &&
           this.EjecutivaData.correo_electronico.trim() !== '';
  }

  private resetForm() {
    this.EjecutivaData = {
      nombre_completo: '',
      nombre_usuario: '',
      password: '',
      correo_electronico: '',
      rol_nombre: this.rolNombre
    };
  }
}
