import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CorresponsalService, AsignarEmpresaRequest } from '../../core/services/corresponsal.service';
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-asignar-corresponsal',
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-corresponsal.component.html',
  styleUrl: './asignar-corresponsal.component.css',
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
export class AsignarCorresponsalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() corresponsalAssigned = new EventEmitter<any>();

  corresponsales: any[] = [];
  usuarios: User[] = [];
  selectedUser: number | null = null;
  selectedCorresponsal: number | null = null;

  constructor(private corresponsalService: CorresponsalService, private userService: UserService) {}

  ngOnInit(): void {
    this.cargarCorresponsales();
    this.cargarUsuarios();
  }

  cargarCorresponsales() {
    this.corresponsalService.getCorresponsales().subscribe({
      next: (corresponsales) => {
        this.corresponsales = corresponsales.map((c, index) => ({ ...c, id: index + 1 })); // Asignar id temporal si no existe
      },
      error: (err) => {
        console.error('Error al cargar corresponsales:', err);
      }
    });
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  getCorresponsalUsers() {
    return this.usuarios.filter(u => u.rol_nombre === 'Corresponsal');
  }

assignCorresponsal() {
  if (!this.selectedUser || !this.selectedCorresponsal) {
    console.error('Selecciona usuario y corresponsal');
    return;
  }
  this.corresponsalService.asignarEmpresa(
    this.selectedUser,
    this.selectedCorresponsal
  ).subscribe({
    next: () => {
      console.log('Empresa asignada');
      this.corresponsalAssigned.emit({
        userId: this.selectedUser,
        corresponsalNumero: this.selectedCorresponsal
      });
      this.closeModal();
    },
    error: err => console.error('Error asignando empresa:', err)
  });
}

  private resetForm() {
    this.selectedUser = null;
    this.selectedCorresponsal = null;
  }
}