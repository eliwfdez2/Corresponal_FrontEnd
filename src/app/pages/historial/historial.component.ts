import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolBarComponent } from '../../Components/tool-bar/tool-bar.component';

interface Document {
  id: number;
  fecha: string;
  proveedor: string;
  documento: string;
  referencia: string;
  estado: string;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule, ToolBarComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  searchTerm: string = '';
  showStatusDropdown: boolean = false;
  selectedStatus: string = '';
  
  statusOptions: string[] = [
    'Valido',
    'No Valido', 
    'En Revisión',
    'Duplicado'
  ];

  constructor(private router: Router) {}

  documents: Document[] = [
    {
      id: 1,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'Valido'
    },
    {
      id: 2,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'No Valido'
    },
    {
      id: 3,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'En Revisión'
    },
    {
      id: 4,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'Duplicado'
    },
    {
      id: 5,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'Valido'
    },
    {
      id: 6,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'No Valido'
    },
    {
      id: 7,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'En Revisión'
    },
    {
      id: 8,
      fecha: '02/05/2025',
      proveedor: 'Ejemplo Proveedor S.A.',
      documento: 'Factura.pdf',
      referencia: 'VER25-00205',
      estado: 'Duplicado'
    }
  ];

  filteredDocuments: Document[] = [];

  ngOnInit() {
    this.filteredDocuments = [...this.documents];
  }

  onSearchChange() {
    this.filterDocuments();
  }

  toggleStatusFilter() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.showStatusDropdown = false;
    this.filterDocuments();
  }

  performSearch() {
    this.filterDocuments();
  }

  private filterDocuments() {
    let filtered = [...this.documents];

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.proveedor.toLowerCase().includes(searchLower) ||
        doc.documento.toLowerCase().includes(searchLower) ||
        doc.referencia.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (this.selectedStatus) {
      filtered = filtered.filter(doc => doc.estado === this.selectedStatus);
    }

    this.filteredDocuments = filtered;
  }

  trackByDocument(index: number, document: Document): number {
    return document.id;
  }

  viewDocument(document: Document) {
    console.log('Ver documento:', document);
    // Implementar lógica para ver documento
  }

  downloadDocument(document: Document) {
    console.log('Descargar documento:', document);
    // Implementar lógica para descargar documento
  }

  editDocument(document: Document) {
    console.log('Editar documento:', document);
    // Implementar lógica para editar documento
  }

  // Navigation methods for toolbar integration
  onNavigationChange(route: string) {
    console.log('Navigation changed to:', route);
    // Navigation is now handled by the toolbar component itself
  }

  onLogout() {
    console.log('Logout requested');
    // Handle logout logic here
    this.router.navigate(['/login']);
  }
}
