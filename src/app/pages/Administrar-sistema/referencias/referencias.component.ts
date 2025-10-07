import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReferenciasService, Referencia } from '../../../core/services/referencias.service';
import { UserService, User } from '../../../core/services/user.service';

@Component({
  selector: 'app-referencias',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referencias.component.html',
  styleUrl: './referencias.component.css'
})
export class ReferenciasComponent implements OnInit {
  referencias: Referencia[] = [];
  paginatedReferencias: Referencia[] = [];
  users: User[] = [];
  assignedUsers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  isCreateModalOpen: boolean = false;
  isAssignModalOpen: boolean = false;
  isUnassignModalOpen: boolean = false;
  isViewUsersModalOpen: boolean = false;
  selectedReferencia: Referencia | null = null;

  createForm: FormGroup;
  assignForm: FormGroup;
  unassignForm: FormGroup;

  constructor(
    private referenciasService: ReferenciasService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      referencia: ['', Validators.required]
    });
    this.assignForm = this.fb.group({
      usuario_id: ['', Validators.required]
    });
    this.unassignForm = this.fb.group({
      usuario_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReferencias();
    this.loadUsers();
  }

  loadReferencias(): void {
    this.referenciasService.getReferencias().subscribe({
      next: (data) => {
        this.referencias = data;
        this.totalPages = Math.ceil(this.referencias.length / this.itemsPerPage);
        this.updatePaginatedReferencias();
      },
      error: (err) => {
        console.error('Error loading referencias', err);
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    });
  }

  updatePaginatedReferencias(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReferencias = this.referencias.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedReferencias();
    }
  }

  openCreateModal(): void {
    this.createForm.reset();
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  onCreateSubmit(): void {
    if (this.createForm.valid) {
      this.referenciasService.createReferencia(this.createForm.value).subscribe({
        next: () => {
          this.loadReferencias();
          this.closeCreateModal();
        },
        error: (err) => {
          console.error('Error creating referencia', err);
        }
      });
    }
  }

  openAssignModal(referencia: Referencia): void {
    this.selectedReferencia = referencia;
    this.assignForm.reset();
    this.isAssignModalOpen = true;
  }

  closeAssignModal(): void {
    this.isAssignModalOpen = false;
    this.selectedReferencia = null;
  }

  onAssignSubmit(): void {
    if (this.assignForm.valid && this.selectedReferencia) {
      this.referenciasService.assignReferencia(this.selectedReferencia.referencia, this.assignForm.value.usuario_id).subscribe({
        next: () => {
          this.closeAssignModal();
        },
        error: (err) => {
          console.error('Error assigning referencia', err);
        }
      });
    }
  }

  openUnassignModal(referencia: Referencia): void {
    this.selectedReferencia = referencia;
    this.unassignForm.reset();
    this.isUnassignModalOpen = true;
  }

  closeUnassignModal(): void {
    this.isUnassignModalOpen = false;
    this.selectedReferencia = null;
  }

  onUnassignSubmit(): void {
    if (this.unassignForm.valid && this.selectedReferencia) {
      this.referenciasService.unassignReferencia(this.selectedReferencia.referencia, this.unassignForm.value.usuario_id).subscribe({
        next: () => {
          this.closeUnassignModal();
        },
        error: (err) => {
          console.error('Error unassigning referencia', err);
        }
      });
    }
  }

  openViewUsersModal(referencia: Referencia): void {
    this.selectedReferencia = referencia;
    this.referenciasService.getUsuariosAsignados(referencia.referencia).subscribe({
      next: (data) => {
        this.assignedUsers = data;
        this.isViewUsersModalOpen = true;
      },
      error: (err) => {
        console.error('Error loading assigned users', err);
      }
    });
  }

  closeViewUsersModal(): void {
    this.isViewUsersModalOpen = false;
    this.selectedReferencia = null;
    this.assignedUsers = [];
  }

  volver(): void {
    this.router.navigate(['/administrar-sistema']);
  }
}
