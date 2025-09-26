import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Referencia, ReferenciasService } from '../../core/services/referencias.service';

@Component({
  selector: 'app-buscador-referencias',
  imports: [FormsModule, CommonModule],
  templateUrl: './buscador-referencias.component.html',
  styleUrl: './buscador-referencias.component.css',
  providers: [ReferenciasService]
})
export class BuscadorReferenciasComponent implements OnInit {
  searchTerm: string = '';
  allReferences: Referencia[] = [];
  filteredReferences: Referencia[] = [];
  hasSearched: boolean = false;

  constructor(private router: Router, private referenciasService: ReferenciasService) {}

  ngOnInit(): void {
    this.referenciasService.getReferencias().subscribe(data => {
      this.allReferences = data;
      this.filteredReferences = [];
    });
  }

  onSearch(): void {
    this.hasSearched = true;
    if (!this.searchTerm.trim()) {
      this.filteredReferences = [...this.allReferences];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredReferences = this.allReferences.filter(reference =>
      reference.referencia.toLowerCase().includes(searchLower) ||
      reference.fecha_creacion.toLowerCase().includes(searchLower) ||
      reference.creador_nombre.toLowerCase().includes(searchLower) ||
      reference.estatus_nombre.toLowerCase().includes(searchLower)
    );
  }

  viewReference(reference: Referencia): void {
    console.log('Viewing reference:', reference);
    // Navegar al componente ver-referencia con la referencia
    this.router.navigate(['/ver-referencia', reference.referencia]);
  }
}
