import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Documento {
  id: number;
  nombre: string;
  estado: 'valido' | 'no-valido' | 'pendiente';
  cliente: string;
  fecha: string;
}

@Component({
  selector: 'app-validar-archivos',
  imports: [CommonModule, FormsModule],
  templateUrl: './validar-archivos.component.html',
  styleUrl: './validar-archivos.component.css'
})
export class ValidarArchivosComponent implements OnChanges {
  @Input() documento: Documento | null = null;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() updateStatus = new EventEmitter<{documento: Documento, newStatus: string, observaciones: string}>();

  selectedStatus: string = '';
  observaciones: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documento'] && this.documento) {
      this.selectedStatus = this.documento.estado;
    }
  }

  closeModal() {
    this.close.emit();
  }

  saveStatus() {
    if (this.documento && this.selectedStatus) {
      this.updateStatus.emit({ documento: this.documento, newStatus: this.selectedStatus, observaciones: this.observaciones });
      this.closeModal();
    }
  }
}
