import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Referencia, ReferenciasService, exactlyOneSelected } from '../../core/services/referencias.service';
import { Corresponsal, CorresponsalService } from '../../core/services/corresponsal.service';
import { User, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-referencias',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestionar-referencias.component.html',
  styleUrl: './gestionar-referencias.component.css'
})

export class ReferenciasComponent implements OnInit {
  referencias: Referencia[] = [];
  paginatedReferencias: Referencia[] = [];
  users: User[] = [];
  corresponsales: Corresponsal[] = [];
  assignedUsers: any[] = [];
  assignedCorresponsales: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  isCreateModalOpen: boolean = false;
  isUnassignModalOpen: boolean = false;
  isAssignCombinedModalOpen: boolean = false;
  selectedReferencia: Referencia | null = null;

  createForm: FormGroup;
  assignCombinedForm: FormGroup;

  constructor(
    private referenciasService: ReferenciasService,
    private userService: UserService,
    private corresponsalService: CorresponsalService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      referencia: ['', Validators.required]
    });
    this.assignCombinedForm = this.fb.group({
      usuario_id: [''],
      corresponsal_id: ['']
    }, { validators: exactlyOneSelected });
  }

  ngOnInit(): void {
    this.loadReferencias();
    this.loadUsers();
    this.loadCorresponsales();
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
        this.users = data || [];
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.users = [];
      }
    });
  }

  loadCorresponsales(): void {
    this.corresponsalService.getCorresponsales().subscribe({
      next: (data) => {
        this.corresponsales = data || [];
      },
      error: (err) => {
        console.error('Error loading corresponsales', err);
        this.corresponsales = [];
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


  openUnassignModal(referencia: Referencia): void {
    this.selectedReferencia = referencia;
    this.assignedUsers = [];
    this.assignedCorresponsales = [];
    // Fetch assigned users
    this.referenciasService.getUsuariosAsignados(referencia.referencia).subscribe({
      next: (users) => {
        this.assignedUsers = users || [];
      },
      error: (err) => {
        console.error('Error loading assigned users', err);
        this.assignedUsers = [];
      }
    });
    // Fetch assigned corresponsales
    this.referenciasService.getCorresponsalesAsignados(referencia.referencia).subscribe({
      next: (corresponsales) => {
        this.assignedCorresponsales = corresponsales || [];
        this.isUnassignModalOpen = true;
      },
      error: (err) => {
        console.error('Error loading assigned corresponsales', err);
        this.assignedCorresponsales = [];
        this.isUnassignModalOpen = true; // Open modal even if one fails
      }
    });
  }

  closeUnassignModal(): void {
    this.isUnassignModalOpen = false;
    this.selectedReferencia = null;
    this.assignedUsers = [];
    this.assignedCorresponsales = [];
  }

  unassignUser(userId: number): void {
    if (this.selectedReferencia) {
      this.referenciasService.unassignReferencia(this.selectedReferencia.referencia, userId).subscribe({
        next: () => {
          // Remove from list
          this.assignedUsers = this.assignedUsers.filter(u => u.id !== userId);
        },
        error: (err) => {
          console.error('Error unassigning user', err);
        }
      });
    }
  }

  unassignCorresponsal(corresponsalNumero: any): void {
    if (this.selectedReferencia) {
      console.log('Unassigning corresponsal numero:', +corresponsalNumero);
      console.log('Referencia:', this.selectedReferencia.referencia);
      this.referenciasService.unassignCorresponsal(+corresponsalNumero, this.selectedReferencia.referencia).subscribe({
        next: () => {
          // Remove from list
          this.assignedCorresponsales = this.assignedCorresponsales.filter(c => c.numero !== corresponsalNumero);
        },
        error: (err) => {
          console.error('Error unassigning corresponsal', err);
        }
      });
    }
  }



  openAssignCombinedModal(referencia: Referencia): void {
    this.selectedReferencia = referencia;
    this.assignCombinedForm.reset();
    this.isAssignCombinedModalOpen = true;
  }

  closeAssignCombinedModal(): void {
    this.isAssignCombinedModalOpen = false;
    this.selectedReferencia = null;
  }

  onUsuarioChange(): void {
    if (this.assignCombinedForm.get('usuario_id')?.value) {
      this.assignCombinedForm.get('corresponsal_id')?.setValue('');
    }
  }

  onCorresponsalChange(): void {
    if (this.assignCombinedForm.get('corresponsal_id')?.value) {
      this.assignCombinedForm.get('usuario_id')?.setValue('');
    }
  }

  onAssignCombinedSubmit(): void {
    if (this.assignCombinedForm.valid && this.selectedReferencia) {
      const formValue = this.assignCombinedForm.value;
      const referencia = this.selectedReferencia.referencia;

      // Assign user if selected
      if (formValue.usuario_id) {
        this.referenciasService.assignReferencia(referencia, +formValue.usuario_id).subscribe({
          next: () => {
            this.closeAssignCombinedModal();
            alert('Usuario asignado exitosamente.');
          },
          error: (err) => {
            console.error('Error assigning user', err);
            alert('Error al asignar usuario: ' + (err.error?.message || 'Error desconocido'));
          }
        });
      }

      // Assign corresponsal if selected
      if (formValue.corresponsal_id) {
        this.referenciasService.assignCorresponsal(+formValue.corresponsal_id, referencia).subscribe({
          next: () => {
            this.closeAssignCombinedModal();
            alert('Corresponsal asignado exitosamente.');
          },
          error: (err) => {
            console.error('Error assigning corresponsal', err);
            alert('Error al asignar corresponsal: ' + (err.error?.message || 'Error desconocido'));
          }
        });
      }
    }
  }

  volver(): void {
    this.router.navigate(['/administrar-sistema']);
  }
}
