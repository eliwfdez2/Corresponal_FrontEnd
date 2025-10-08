import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolBarComponent } from "../../Components/tool-bar/tool-bar.component";

interface UsuarioMetricas {
  totalUsuarios: number;
  conectados: number;
  administradores: number;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ToolBarComponent],
  templateUrl: './administrar-usuarios.component.html',
  styleUrl: './administrar-usuarios.component.css'
})
export class AdministrarUsuariosComponent implements OnInit {

  // Métricas de usuarios
  metricas: UsuarioMetricas = {
    totalUsuarios: 12,
    conectados: 3,
    administradores: 12
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarMetricas();
  }

  /**
   * Carga las métricas desde el servicio (simulado)
   */
  private cargarMetricas(): void {
    // Aquí normalmente harías una llamada a un servicio
    // this.usuarioService.getMetricas().subscribe(data => this.metricas = data);

    // Simulación de carga de datos
    console.log('Cargando métricas de usuarios...');
  }

  irMonitorearUsuarios(): void {
    console.log('Navegando a monitorear usuarios');
    this.router.navigate(['/monitoreo-usuarios']); 
  }

  irGestionarRoles(): void {
    console.log('Navegando a gestionar roles');
    this.router.navigate(['/gestionar-roles']); 
  }

  /**
   * Actualiza las métricas en tiempo real
   */
  actualizarMetricas(): void {
    this.cargarMetricas();
    console.log('Métricas actualizadas');
  }

 // Navigation methods for toolbar integration
  onNavigationChange(route: string) {
    console.log('Navigation changed to:', route);
    // Navigation is now handled by the toolbar component itself
  }

  onLogout() {
    console.log('Logout requested');
    // Handle logout logic here
    this.router.navigate(['/login']);
  }

}