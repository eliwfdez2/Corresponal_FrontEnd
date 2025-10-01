import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConceptosService } from '../../core/services/conceptos.service';

@Component({
  selector: 'app-nuevo-concepto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-concepto.component.html',
  styleUrl: './nuevo-concepto.component.css',
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
export class NuevoConceptoComponent {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() conceptoCreated = new EventEmitter<any>();

  concepto = {
    clave: '',
    activo: 1
  };

  successMessage: string = '';

  constructor(private conceptosService: ConceptosService) {}

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.saveConcepto();
    }
  }

  saveConcepto() {
    if (this.isFormValid()) {
      this.conceptosService.createConcepto(this.concepto).subscribe({
        next: (response) => {
          this.successMessage = '¡Concepto creado correctamente!';
          this.conceptoCreated.emit(response);
          setTimeout(() => {
            this.successMessage = '';
            this.closeModal();
          }, 2000); // Oculta el mensaje después de 2 segundos
        },
        error: (error) => {
          console.error('Error creating concepto:', error);
          // Handle error appropriately, e.g., show error message to user
        }
      });
    }
  }

  private isFormValid(): boolean {
    return this.concepto.clave.trim() !== '';
  }

  private resetForm() {
    this.concepto = {
      clave: '',
      activo: 1
    };
  }
}