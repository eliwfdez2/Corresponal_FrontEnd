import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class NuevoConceptoComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() selectedConcepto: any = null;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() conceptoCreated = new EventEmitter<any>();
  @Output() conceptoUpdated = new EventEmitter<any>();

  concepto = {
    clave: '',
    activo: 1
  };

  successMessage: string = '';
  isEditing: boolean = false;

  constructor(private conceptosService: ConceptosService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedConcepto']) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.selectedConcepto) {
      this.isEditing = true;
      this.concepto = { ...this.selectedConcepto };
    } else {
      this.isEditing = false;
      this.resetForm();
    }
  }

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
      if (this.isEditing) {
        this.conceptosService.updateConcepto(this.selectedConcepto.id, this.concepto).subscribe({
          next: (response) => {
            this.successMessage = '¡Concepto actualizado correctamente!';
            this.conceptoUpdated.emit(response);
            setTimeout(() => {
              this.successMessage = '';
              this.closeModal();
            }, 2000);
          },
          error: (error) => {
            console.error('Error updating concepto:', error);
          }
        });
      } else {
        this.conceptosService.createConcepto(this.concepto).subscribe({
          next: (response) => {
            this.successMessage = '¡Concepto creado correctamente!';
            this.conceptoCreated.emit(response);
            setTimeout(() => {
              this.successMessage = '';
              this.closeModal();
            }, 2000);
          },
          error: (error) => {
            console.error('Error creating concepto:', error);
          }
        });
      }
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