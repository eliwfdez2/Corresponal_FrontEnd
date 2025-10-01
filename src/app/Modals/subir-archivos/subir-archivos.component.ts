import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subir-archivos',
  imports: [CommonModule],
  templateUrl: './subir-archivos.component.html',
  styleUrl: './subir-archivos.component.css'
})
export class SubirArchivosComponent {
  @Output() close = new EventEmitter<void>();
  @Output() upload = new EventEmitter<File[]>();

  uploadedFiles: File[] = [];
  showConfirmation: boolean = false;
  confirmationStep: number = 0; // 0: none, 1: first confirm, 2: second confirm

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
      this.uploadedFiles.push(...Array.from(event.dataTransfer.files));
    }
  }

  selectFiles(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadedFiles.push(...Array.from(input.files));
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
