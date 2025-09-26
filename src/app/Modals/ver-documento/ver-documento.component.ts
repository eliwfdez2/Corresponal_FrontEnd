import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-documento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-documento.component.html',
  styleUrl: './ver-documento.component.css'
})
export class VerDocumentoComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() documentBlob: Blob | null = null;
  @Input() documentName: string = '';
  @Output() modalClosed = new EventEmitter<void>();

  documentUrl: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documentBlob'] && this.documentBlob) {
      const type = this.getMimeType(this.documentName);
      const blobWithType = new Blob([this.documentBlob], { type });
      this.documentUrl = URL.createObjectURL(blobWithType);
    }
  }

  private getMimeType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'jpg':
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      case 'gif': return 'image/gif';
      case 'txt': return 'text/plain';
      case 'doc': return 'application/msword';
      case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default: return 'application/octet-stream';
    }
  }

  closeModal() {
    if (this.documentUrl) {
      URL.revokeObjectURL(this.documentUrl);
      this.documentUrl = '';
    }
    this.modalClosed.emit();
  }
}