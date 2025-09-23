import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Documento {
  id: number;
  nombre: string;
  estado: 'valido' | 'no-valido' | 'pendiente';
  cliente: string;
  fecha: string;
}

@Component({
  selector: 'app-ver-referencia',
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-referencia.component.html',
  styleUrl: './ver-referencia.component.css'
})
export class VerReferenciaComponent implements OnInit {
  documentos: Documento[] = [];
  documentosFiltrados: Documento[] = [];
  terminoBusqueda: string = '';
  referenciaId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID de la referencia desde la URL
    this.route.params.subscribe(params => {
      this.referenciaId = params['id'] || 'VER22-000000';
      this.cargarDocumentos();
    });
  }

  cargarDocumentos() {
    // Datos de ejemplo basados en la imagen
    this.documentos = [
      {
        id: 1,
        nombre: 'Factura de ejemplo',
        estado: 'valido',
        cliente: 'Cliente Ejemplo',
        fecha: '24/08/2020'
      },
      {
        id: 2,
        nombre: 'Documento importante',
        estado: 'no-valido',
        cliente: 'Cliente Ejemplo',
        fecha: '24/08/2020'
      },
      {
        id: 3,
        nombre: 'Factura movimiento',
        estado: 'pendiente',
        cliente: 'Cliente Ejemplo',
        fecha: '24/08/2020'
      },
      {
        id: 4,
        nombre: 'Comprobante de recibo',
        estado: 'valido',
        cliente: 'Cliente Ejemplo',
        fecha: '24/08/2020'
      },
      {
        id: 5,
        nombre: 'Comprobante 2',
        estado: 'no-valido',
        cliente: 'Cliente Ejemplo',
        fecha: '24/08/2020'
      }
    ];
    this.documentosFiltrados = [...this.documentos];
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
    // Aquí se implementaría la lógica para abrir el selector de archivos
  }

  verDocumento(documento: Documento) {
    console.log('Ver documento:', documento);
    // Lógica para ver el documento
  }

  descargarDocumento(documento: Documento) {
    console.log('Descargar documento:', documento);
    // Lógica para descargar el documento
  }

  editarDocumento(documento: Documento) {
    console.log('Editar documento:', documento);
    // Lógica para editar el documento
  }

  volver() {
    // Navegar de vuelta al dashboard
    this.router.navigate(['/dashboard']);
  }
}
