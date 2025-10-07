import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConceptosService } from '../../../core/services/conceptos.service';

@Component({
  selector: 'app-conceptos',
  imports: [CommonModule],
  templateUrl: './conceptos.component.html',
  styleUrl: './conceptos.component.css'
})
export class ConceptosComponent implements OnInit {
  conceptos: any[] = [];
  ultimaActualizacion: string = new Date().toLocaleString();

  constructor(
    private conceptosService: ConceptosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadConceptos();
  }

  loadConceptos(): void {
    this.conceptosService.getConceptos().subscribe({
      next: (data) => {
        this.conceptos = data;
        this.ultimaActualizacion = new Date().toLocaleString();
      },
      error: (err) => {
        console.error('Error loading conceptos', err);
      }
    });
  }


  volver(): void {
    this.router.navigate(['/administrar-sistema']);
  }

  deleteConcepto(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este concepto?')) {
      this.conceptosService.deleteConcepto(id).subscribe({
        next: () => {
          this.loadConceptos(); // Reload the list
        },
        error: (err) => {
          console.error('Error deleting concepto', err);
        }
      });
    }
  }

  goToCreate(): void {
    this.router.navigate(['/administrar-sistema/conceptos/crear-concepto']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/administrar-sistema/conceptos/editar-concepto', id]);
  }

}
