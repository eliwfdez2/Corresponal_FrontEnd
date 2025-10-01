import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConceptosService } from '../../core/services/conceptos.service';
import { ExtensionesArchivosService } from '../../core/services/extensiones-archivos.service';

@Component({
  selector: 'app-subir-archivos',
  imports: [CommonModule, FormsModule],
  templateUrl: './subir-archivos.component.html',
  styleUrl: './subir-archivos.component.css'
})
export class SubirArchivosComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() upload = new EventEmitter<{file: File, selectedConcept: string, selectedExtension: string}[]>();

  uploadedFiles: {file: File, selectedConcept: string, selectedExtension: string}[] = [];
  showConfirmation: boolean = false;
  confirmationStep: number = 0; // 0: none, 1: first confirm, 2: second confirm
  conceptos: string[] = [];
  extensiones: string[] = [];

  constructor(
    private conceptosService: ConceptosService,
    private extensionesService: ExtensionesArchivosService
  ) {}

  ngOnInit() {
    this.conceptosService.getConceptos().subscribe(data => {
      this.conceptos = data.filter(c => c.activo == 1).map(c => c.clave);
    });
    this.extensionesService.getExtensionesArchivos().subscribe(data => {
      this.extensiones = data.filter(e => e.activo == 1).map(e => e.extension_archivo);
    });
  }

  closeModal() {
    this.close.emit();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files).map(file => ({ file, selectedConcept: '', selectedExtension: '' }));
      this.uploadedFiles.push(...files);
    }
  }

  selectFiles(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files).map(file => ({ file, selectedConcept: '', selectedExtension: '' }));
      this.uploadedFiles.push(...files);
      input.value = '';
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  formatFileSize(size: number): string {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  uploadFiles() {
    this.showConfirmation = true;
    this.confirmationStep = 1;
  }

  confirmUpload() {
    if (this.confirmationStep === 1) {
      this.confirmationStep = 2;
    } else if (this.confirmationStep === 2) {
      this.upload.emit(this.uploadedFiles);
      this.close.emit();
    }
  }

  cancelConfirmation() {
    this.showConfirmation = false;
    this.confirmationStep = 0;
  }
}
