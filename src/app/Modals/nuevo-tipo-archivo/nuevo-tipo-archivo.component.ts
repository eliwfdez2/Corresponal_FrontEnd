import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ExtensionesArchivosService } from '../../core/services/extensiones-archivos.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nuevo-tipo-archivo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-tipo-archivo.component.html',
  styleUrl: './nuevo-tipo-archivo.component.css',
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
export class NuevoTipoArchivoComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() tipoArchivoCreated = new EventEmitter<any>();

  tipoArchivo = {
    extension_archivo: '',
    activo: 1,
    creado_por: 0
  };

  successMessage: string = '';

  constructor(private extensionesArchivosService: ExtensionesArchivosService, private authService: AuthService) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.tipoArchivo.creado_por = userId;
    }
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.saveTipoArchivo();
    }
  }

  saveTipoArchivo() {
    if (this.isFormValid()) {
      this.extensionesArchivosService.createExtensionArchivo(this.tipoArchivo).subscribe({
        next: (response) => {
          this.successMessage = '¡Tipo de archivo creado correctamente!';
          this.tipoArchivoCreated.emit(response);
          setTimeout(() => {
            this.successMessage = '';
            this.closeModal();
          }, 2000); // Oculta el mensaje después de 2 segundos
        },
        error: (error) => {
          console.error('Error creating tipo archivo:', error);
          // Handle error appropriately, e.g., show error message to user
        }
      });
    }
  }

  private isFormValid(): boolean {
    return this.tipoArchivo.extension_archivo.trim() !== '';
  }

  private resetForm() {
    const userId = this.authService.getUserId();
    this.tipoArchivo = {
      extension_archivo: '',
      activo: 1,
      creado_por: userId || 0
    };
  }
}