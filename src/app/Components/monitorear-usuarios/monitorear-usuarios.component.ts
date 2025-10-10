import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../core/services/user.service';
import { CorresponsalService } from '../../core/services/corresponsal.service';
import { CrearUsuarioComponent } from '../../Modals/crear-usuario/crear-usuario.component';
import { CrearCorresponsalComponent } from '../../Modals/crear-corresponsal/crear-corresponsal.component';
import { CrearEjecutivasComponent } from '../../Modals/crear-ejecutivas/crear-ejecutivas.component';
import { AsignarCorresponsalComponent } from '../../Modals/asignar-corresponsal/asignar-corresponsal.component';

@Component({
  selector: 'app-monitorear-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, CrearUsuarioComponent, CrearCorresponsalComponent, CrearEjecutivasComponent, AsignarCorresponsalComponent],
  templateUrl: './monitorear-usuarios.component.html',
  styleUrls: ['./monitorear-usuarios.component.css']
})
export class MonitorearUsuariosComponent implements OnInit {
  ultimaActualizacion: string = new Date().toLocaleString();
  usuarios: User[] = [];
  showCreateUserModal: boolean = false;
  showCreateCorresponsalModal: boolean = false;
  showCreateEjecutivasModal: boolean = false;
  showAssignCorresponsalModal: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Aquí implementar la lógica para cargar los datos de usuarios y actividades
    // desde el servicio correspondiente
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.usuarios = users;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }


  refrescarDatos() {
    this.cargarDatos();
    this.ultimaActualizacion = new Date().toLocaleString();
  }

  exportarCSV() {
    // Implementar la lógica para exportar los datos a CSV
  }

  openCreateUserModal() {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal() {
    this.showCreateUserModal = false;
  }

  onUserCreated() {
    this.closeCreateUserModal();
    this.refrescarDatos();
  }

  openCreateCorresponsalModal() {
    this.showCreateCorresponsalModal = true;
  }

  closeCreateCorresponsalModal() {
    this.showCreateCorresponsalModal = false;
  }

  onCorresponsalCreated() {
    this.closeCreateCorresponsalModal();
    this.refrescarDatos();
  }

  openCreateEjecutivasModal() {
    this.showCreateEjecutivasModal = true;
  }

  closeCreateEjecutivasModal() {
    this.showCreateEjecutivasModal = false;
  }

  onEjecutivasCreated() {
    this.closeCreateEjecutivasModal();
    this.refrescarDatos();
  }

  volver() {
    this.router.navigate(['/administrar-usuarios']);
  }

  openAssignCorresponsalModal() {
    this.showAssignCorresponsalModal = true;
  }

  closeAssignCorresponsalModal() {
    this.showAssignCorresponsalModal = false;
  }

  onCorresponsalAssigned(data: any) {
    console.log('Corresponsal assigned:', data);
    this.closeAssignCorresponsalModal();
    this.refrescarDatos();
  }
}
