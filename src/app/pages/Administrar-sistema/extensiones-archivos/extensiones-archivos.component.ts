import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExtensionesArchivosService } from '../../../core/services/extensiones-archivos.service';
import { NuevoTipoArchivoComponent } from '../../../Modals/nuevo-tipo-archivo/nuevo-tipo-archivo.component';

@Component({
  selector: 'app-extensiones-archivos',
  imports: [CommonModule, ReactiveFormsModule, NuevoTipoArchivoComponent],
  templateUrl: './extensiones-archivos.component.html',
  styleUrl: './extensiones-archivos.component.css'
})
export class ExtensionesArchivosComponent implements OnInit {
  extensiones: any[] = [];
  ultimaActualizacion: string = new Date().toLocaleString();
  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  selectedExtension: any = null;
  extensionForm: FormGroup;
  createForm: FormGroup;

  constructor(
    private extensionesService: ExtensionesArchivosService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.extensionForm = this.fb.group({
      extension_archivo: ['', Validators.required],
      creado_por: [0, Validators.required]
    });
    this.createForm = this.fb.group({
      extension_archivo: ['', Validators.required],
      creado_por: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadExtensiones();
  }

  loadExtensiones(): void {
    this.extensionesService.getExtensionesArchivos().subscribe({
      next: (data) => {
        this.extensiones = data || [];
        this.ultimaActualizacion = new Date().toLocaleString();
      },
      error: (err) => {
        console.error('Error loading extensiones', err);
        this.extensiones = [];
      }
    });
  }

  volver(): void {
    this.router.navigate(['/administrar-sistema']);
  }

  openEditModal(extension: any): void {
    this.selectedExtension = extension;
    this.extensionForm.patchValue(extension);
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedExtension = null;
    this.extensionForm.reset();
  }

  onEditSubmit(): void {
    if (this.extensionForm.valid) {
      this.extensionesService.updateExtensionArchivo(this.selectedExtension.id, this.extensionForm.value).subscribe({
        next: () => {
          this.loadExtensiones();
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Error updating extension', err);
        }
      });
    }
  }

  openDeleteModal(extension: any): void {
    this.selectedExtension = extension;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedExtension = null;
  }

  confirmDelete(): void {
    this.extensionesService.deleteExtensionArchivo(this.selectedExtension.id).subscribe({
      next: () => {
        this.loadExtensiones();
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Error deleting extension', err);
      }
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.createForm.reset();
  }

  onTipoArchivoCreated(): void {
    this.loadExtensiones();
    this.closeCreateModal();
  }
}
