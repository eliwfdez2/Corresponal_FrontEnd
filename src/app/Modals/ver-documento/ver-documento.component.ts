import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  documentUrl: SafeResourceUrl | null = null;
  private originalUrl: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documentBlob'] && this.documentBlob) {
      const type = this.getMimeType(this.documentName);
      const blobWithType = new Blob([this.documentBlob], { type });
      this.originalUrl = URL.createObjectURL(blobWithType);
      this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.originalUrl);
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
    if (this.originalUrl) {
      URL.revokeObjectURL(this.originalUrl);
      this.originalUrl = '';
      this.documentUrl = null;
    }
    this.modalClosed.emit();
  }
}