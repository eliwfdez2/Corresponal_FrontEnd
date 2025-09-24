import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Aquí implementar la lógica para cargar los datos de usuarios y actividades
    // desde el servicio correspondiente
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
