import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Reference {
  id: string;
  fecha: string;
  eta: string;
  cliente: string;
}

@Component({
  selector: 'app-buscador-referencias',
  imports: [FormsModule, CommonModule],
  templateUrl: './buscador-referencias.component.html',
  styleUrl: './buscador-referencias.component.css'
})
export class BuscadorReferenciasComponent implements OnInit {
  searchTerm: string = '';
  allReferences: Reference[] = [];
  filteredReferences: Reference[] = [];
  hasSearched: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockData();
    this.filteredReferences = []; // Start with empty array - no references shown initially
  }

  onSearch(): void {
    this.hasSearched = true;
    if (!this.searchTerm.trim()) {
      this.filteredReferences = [...this.allReferences];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredReferences = this.allReferences.filter(reference =>
      reference.id.toLowerCase().includes(searchLower) ||
      reference.fecha.toLowerCase().includes(searchLower) ||
      reference.eta.toLowerCase().includes(searchLower) ||
      reference.cliente.toLowerCase().includes(searchLower)
    );
  }

  viewReference(reference: Reference): void {
    console.log('Viewing reference:', reference);
    // Navegar al componente ver-referencia con el ID de la referencia
    this.router.navigate(['/ver-referencia', reference.id]);
  }

  private loadMockData(): void {
    this.allReferences = [
      {
        id: 'VER25-000001',
        fecha: '04/06/2025',
        eta: '15:30',
        cliente: 'Cliente A'
      },
      {
        id: 'VER25-000002',
        fecha: '04/06/2025',
        eta: '16:45',
        cliente: 'Cliente B'
      },
      {
        id: 'VER25-000003',
        fecha: '05/06/2025',
        eta: '09:15',
        cliente: 'Cliente C'
      },
      {
        id: 'VER25-000004',
        fecha: '05/06/2025',
        eta: '11:20',
        cliente: 'Cliente D'
      },
      {
        id: 'VER25-000005',
        fecha: '06/06/2025',
        eta: '14:00',
        cliente: 'Cliente E'
      },
      {
        id: 'VER25-000006',
        fecha: '06/06/2025',
        eta: '17:30',
        cliente: 'Cliente F'
      },
      {
        id: 'VER25-000007',
        fecha: '07/06/2025',
        eta: '08:45',
        cliente: 'Cliente G'
      },
      {
        id: 'VER25-000008',
        fecha: '07/06/2025',
        eta: '13:15',
        cliente: 'Cliente H'
      }
    ];
  }
}
