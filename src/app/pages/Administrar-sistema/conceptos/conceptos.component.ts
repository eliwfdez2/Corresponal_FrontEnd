import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptosService } from '../../../core/services/conceptos.service';

@Component({
  selector: 'app-conceptos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './conceptos.component.html',
  styleUrl: './conceptos.component.css'
})
export class ConceptosComponent implements OnInit {
  conceptos: any[] = [];
  ultimaActualizacion: string = new Date().toLocaleString();
  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  selectedConcepto: any = null;
  conceptoForm: FormGroup;
  createForm: FormGroup;

  constructor(
    private conceptosService: ConceptosService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.conceptoForm = this.fb.group({
      clave: ['', Validators.required],
      activo: [1, Validators.required]
    });
    this.createForm = this.fb.group({
      clave: ['', Validators.required],
      activo: [1, Validators.required]
    });
  }

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

  openEditModal(concepto: any): void {
    this.selectedConcepto = concepto;
    this.conceptoForm.patchValue(concepto);
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedConcepto = null;
    this.conceptoForm.reset();
  }

  onEditSubmit(): void {
    if (this.conceptoForm.valid) {
      this.conceptosService.updateConcepto(this.selectedConcepto.id, this.conceptoForm.value).subscribe({
        next: () => {
          this.loadConceptos();
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Error updating concepto', err);
        }
      });
    }
  }

  openDeleteModal(concepto: any): void {
    this.selectedConcepto = concepto;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedConcepto = null;
  }

  confirmDelete(): void {
    this.conceptosService.deleteConcepto(this.selectedConcepto.id).subscribe({
      next: () => {
        this.loadConceptos();
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Error deleting concepto', err);
      }
    });
  }

  openCreateModal(): void {
    this.createForm.reset({ clave: '', activo: 1 });
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.createForm.reset();
  }

  onCreateSubmit(): void {
    if (this.createForm.valid) {
      this.conceptosService.createConcepto(this.createForm.value).subscribe({
        next: () => {
          this.loadConceptos();
          this.closeCreateModal();
        },
        error: (err) => {
          console.error('Error creating concepto', err);
        }
      });
    }
  }

}
