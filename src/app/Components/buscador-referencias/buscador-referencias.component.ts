import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Referencia, ReferenciasService } from '../../core/services/referencias.service';

@Component({
  selector: 'app-buscador-referencias',
  imports: [FormsModule, CommonModule],
  templateUrl: './buscador-referencias.component.html',
  styleUrl: './buscador-referencias.component.css',
  providers: [ReferenciasService]
})
export class BuscadorReferenciasComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  allReferences: Referencia[] = [];
  filteredReferences: Referencia[] = [];
  hasSearched: boolean = false;
  private searchSubject$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private referenciasService: ReferenciasService) {}

  ngOnInit(): void {
    this.referenciasService.getReferencias().subscribe(data => {
      this.allReferences = data;
      this.filteredReferences = [];
    });

    this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => this.performSearch(term));
  }

  onSearch(): void {
    this.searchSubject$.next(this.searchTerm);
  }

  private performSearch(term: string): void {
    this.hasSearched = true;
    if (!term.trim()) {
      this.filteredReferences = [...this.allReferences];
      return;
    }

    const searchLower = term.toLowerCase();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
