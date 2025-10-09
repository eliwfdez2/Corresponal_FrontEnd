import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolBarComponent } from "../../Components/tool-bar/tool-bar.component";
import { UserService } from '../../core/services/user.service';

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
    totalUsuarios: 0,
    conectados: 0,
    administradores: 0
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.cargarMetricas();
  }

  /**
   * Carga las métricas desde el servicio
   */
  private cargarMetricas(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.metricas.totalUsuarios = users.length;
      this.metricas.conectados = users.filter(u => u.activo).length;
      this.metricas.administradores = users.filter(u => u.rol_nombre === 'Administrador').length;
    });

    console.log('Cargando métricas de usuarios...');
  }

  irMonitorearUsuarios(): void {
    console.log('Navegando a Gestionar usuarios');
    this.router.navigate(['/monitoreo-usuarios']); 
  }

  irGestionarRoles(): void {
    console.log('Navegando a gestionar roles');
    this.router.navigate(['/gestionar-roles']); 
  }

  irGestionarReferencias(): void {
    console.log('Navegando a gestionar referencias');
    this.router.navigate(['/gestionar-referencias']);
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