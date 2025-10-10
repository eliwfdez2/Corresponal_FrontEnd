import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConceptosService } from '../../core/services/conceptos.service';
import { ExtensionesArchivosService } from '../../core/services/extensiones-archivos.service';
import { AuthService } from '../../core/services/auth.service';
import { urlApiViviendo } from '../../core/api-url';

@Component({
  selector: 'app-subir-archivos',
  imports: [CommonModule, FormsModule],
  templateUrl: './subir-archivos.component.html',
  styleUrl: './subir-archivos.component.css'
})
export class SubirArchivosComponent implements OnInit {
  @Input() referenciaId: string = '';
  @Output() close = new EventEmitter<void>();

  uploadedFiles: {file: File, selectedConcept: string, selectedExtension: string}[] = [];
  showConfirmation: boolean = false;
  confirmationStep: number = 0; // 0: none, 1: first confirm, 2: second confirm
  conceptos: string[] = [];
  extensiones: string[] = [];
  uploading: boolean = false;

  constructor(
    private http: HttpClient,
    private conceptosService: ConceptosService,
    private extensionesService: ExtensionesArchivosService,
    private authService: AuthService
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

  validateFiles(): string[] {
    const errors: string[] = [];
    this.uploadedFiles.forEach(fileObj => {
      if (!fileObj.selectedConcept) {
        errors.push(`Selecciona un tipo de documento para "${fileObj.file.name}"`);
      }
      if (!fileObj.selectedExtension) {
        errors.push(`Selecciona una extensión para "${fileObj.file.name}"`);
      }
      if (fileObj.file.size > 25 * 1024 * 1024) {
        errors.push(`Archivo demasiado grande: "${fileObj.file.name}" (máximo 25MB)`);
      }
    });
    return errors;
  }

  isValidToUpload(): boolean {
    return this.uploadedFiles.length > 0 && this.validateFiles().length === 0;
  }

  uploadFiles() {
    const errors = this.validateFiles();
    if (errors.length > 0) {
      alert('Errores de validación:\n' + errors.join('\n'));
      return;
    }
    this.showConfirmation = true;
    this.confirmationStep = 1;
  }

  confirmUpload() {
    if (this.confirmationStep === 1) {
      this.confirmationStep = 2;
    } else if (this.confirmationStep === 2 && !this.uploading) {
      this.uploading = true;
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const formData = new FormData();
      formData.append('codigo', this.referenciaId);
      this.uploadedFiles.forEach(fileObj => {
        const newFile = new File([fileObj.file], fileObj.selectedConcept + '.' + fileObj.selectedExtension, { type: fileObj.file.type });
        formData.append('files', newFile);
      });
      this.http.post(`${urlApiViviendo}/documentos`, formData, { headers }).subscribe({
        next: (response: any) => {
          console.log('Documentos subidos:', response);
          alert('Documentos subidos exitosamente');
          this.close.emit();
        },
        error: (error) => {
          console.error('Error al subir documentos:', error);
          alert('Error al subir documentos: ' + (error.error?.error || 'Error desconocido'));
          this.uploading = false;
        }
      });
    }
  }

  cancelConfirmation() {
    this.showConfirmation = false;
    this.confirmationStep = 0;
  }
}
