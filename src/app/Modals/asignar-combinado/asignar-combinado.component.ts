import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Referencia, ReferenciasService, exactlyOneSelected } from '../../core/services/referencias.service';
import { Corresponsal, CorresponsalService } from '../../core/services/corresponsal.service';
import { User, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-asignar-combinado',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignar-combinado.component.html',
  styleUrl: './asignar-combinado.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-50px)', opacity: 0 }))
      ])
    ])
  ]
})
export class AsignarCombinadoComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() selectedReferencia: Referencia | null = null;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() assignmentDone = new EventEmitter<void>();

  users: User[] = [];
  corresponsales: Corresponsal[] = [];
  assignCombinedForm: FormGroup;

  constructor(
    private referenciasService: ReferenciasService,
    private userService: UserService,
    private corresponsalService: CorresponsalService,
    private fb: FormBuilder
  ) {
    this.assignCombinedForm = this.fb.group({
      usuario_id: [''],
      corresponsal_id: ['']
    }, { validators: exactlyOneSelected });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCorresponsales();
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

  closeModal(): void {
    this.isOpen = false;
    this.modalClosed.emit();
    this.assignCombinedForm.reset();
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
            this.closeModal();
            alert('Usuario asignado exitosamente.');
            this.assignmentDone.emit();
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
            this.closeModal();
            alert('Corresponsal asignado exitosamente.');
            this.assignmentDone.emit();
          },
          error: (err) => {
            console.error('Error assigning corresponsal', err);
            alert('Error al asignar corresponsal: ' + (err.error?.message || 'Error desconocido'));
          }
        });
      }
    }
  }
}