import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-monitorear-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monitorear-usuarios.component.html',
  styleUrls: ['./monitorear-usuarios.component.css']
})
export class MonitorearUsuariosComponent implements OnInit {
  ultimaActualizacion: string = new Date().toLocaleString();
  usuariosActivos: any[] = [];
  registroActividades: any[] = [];
  usuarios: User[] = [];

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

  volver() {
    this.router.navigate(['/administrar-usuarios']);
  }
}
