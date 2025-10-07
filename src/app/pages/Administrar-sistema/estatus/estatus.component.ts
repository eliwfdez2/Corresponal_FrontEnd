import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstatusService } from '../../../core/services/estatus.service';

@Component({
  selector: 'app-estatus',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estatus.component.html',
  styleUrl: './estatus.component.css'
})
export class EstatusComponent implements OnInit {
  estatus: any[] = [];
  ultimaActualizacion: string = new Date().toLocaleString();
  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  selectedEstatus: any = null;
  estatusForm: FormGroup;
  createForm: FormGroup;

  constructor(
    private estatusService: EstatusService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.estatusForm = this.fb.group({
      nombre: ['', Validators.required],
      creado_por: [0, Validators.required]
    });
    this.createForm = this.fb.group({
      nombre: ['', Validators.required],
      creado_por: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEstatus();
  }

  loadEstatus(): void {
    this.estatusService.getEstatus().subscribe({
      next: (data) => {
        this.estatus = data;
        this.ultimaActualizacion = new Date().toLocaleString();
      },
      error: (err) => {
        console.error('Error loading estatus', err);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/administrar-sistema']);
  }

  openEditModal(estatus: any): void {
    this.selectedEstatus = estatus;
    this.estatusForm.patchValue(estatus);
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedEstatus = null;
    this.estatusForm.reset();
  }

  onEditSubmit(): void {
    if (this.estatusForm.valid) {
      this.estatusService.updateEstatus(this.selectedEstatus.id, this.estatusForm.value).subscribe({
        next: () => {
          this.loadEstatus();
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Error updating estatus', err);
        }
      });
    }
  }

  openDeleteModal(estatus: any): void {
    this.selectedEstatus = estatus;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedEstatus = null;
  }

  confirmDelete(): void {
    this.estatusService.deleteEstatus(this.selectedEstatus.id).subscribe({
      next: () => {
        this.loadEstatus();
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Error deleting estatus', err);
      }
    });
  }

  openCreateModal(): void {
    this.createForm.reset({ nombre: '', creado_por: 0 });
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.createForm.reset();
  }

  onCreateSubmit(): void {
    if (this.createForm.valid) {
      this.estatusService.createEstatus(this.createForm.value).subscribe({
        next: () => {
          this.loadEstatus();
          this.closeCreateModal();
        },
        error: (err) => {
          console.error('Error creating estatus', err);
        }
      });
    }
  }

}
