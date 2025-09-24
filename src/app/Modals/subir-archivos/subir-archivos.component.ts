import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-subir-archivos',
  imports: [],
  templateUrl: './subir-archivos.component.html',
  styleUrl: './subir-archivos.component.css'
})
export class SubirArchivosComponent {
  @Output() close = new EventEmitter<void>();

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
    // Handle dropped files
  }

  selectFiles(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event) {
    // Handle selected files
  }
}
