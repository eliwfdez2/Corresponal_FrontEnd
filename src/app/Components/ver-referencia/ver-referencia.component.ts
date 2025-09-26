import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubirArchivosComponent } from '../../Modals/subir-archivos/subir-archivos.component';
import { ReferenciaDetalle, ReferenciasService } from '../../core/services/referencias.service';

interface Documento {
  id: number;
  nombre: string;
  estado: 'valido' | 'no-valido' | 'pendiente';
  cliente: string;
  fecha: string;
}

@Component({
  selector: 'app-ver-referencia',
  imports: [CommonModule, FormsModule, SubirArchivosComponent],
  templateUrl: './ver-referencia.component.html',
  styleUrl: './ver-referencia.component.css',
  providers: [ReferenciasService]
})
export class VerReferenciaComponent implements OnInit {
  documentos: Documento[] = [];
  documentosFiltrados: Documento[] = [];
  terminoBusqueda: string = '';
  referenciaId: string = '';
  referenciaData: ReferenciaDetalle | null = null;
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private referenciasService: ReferenciasService
  ) {}

  ngOnInit() {
    // Obtener la referencia desde la URL
    this.route.params.subscribe(params => {
      this.referenciaId = params['id'];
      this.referenciasService.getReferencia(this.referenciaId).subscribe(data => {
        this.referenciaData = data;
        this.documentos = data.documents.map((doc: any) => ({
          id: doc.id,
          nombre: doc.nombre_documento,
          estado: doc.estado,
          cliente: doc.cliente,
          fecha: doc.fecha
        }));
        this.documentosFiltrados = [...this.documentos];
      });
    });
  }

  buscarDocumentos() {
    if (!this.terminoBusqueda.trim()) {
      this.documentosFiltrados = [...this.documentos];
    } else {
      this.documentosFiltrados = this.documentos.filter(doc =>
        doc.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        doc.cliente.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }
  }

  subirArchivos() {
    // Lógica para subir archivos
    console.log('Subir archivos');
    this.showModal = true;
  }

  verDocumento(documento: Documento) {
    console.log('Ver documento:', documento);
    // Lógica para ver el documento
  }

  descargarDocumento(documento: Documento) {
    this.referenciasService.downloadDocumento(documento.nombre, this.referenciaId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = documento.nombre;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  descargarTodosDocumentos() {
    this.referenciasService.downloadTodosDocumentos(this.referenciaId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.referenciaId}_documentos.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  editarDocumento(documento: Documento) {
    console.log('Editar documento:', documento);
    // Lógica para editar el documento
  }

  volver() {
    // Navegar de vuelta al dashboard
    this.router.navigate(['/dashboard']);
  }

  closeModal() {
    this.showModal = false;
  }
}
