import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from "../../Components/tool-bar/tool-bar.component";
import { Router, RouterModule } from '@angular/router';
import { CambiarContrasenaComponent } from '../../Modals/cambiar-contrasena/cambiar-contrasena.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ToolBarComponent, RouterModule, CambiarContrasenaComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  showPasswordModal = false;

  // Datos del usuario
  userData = {
    name: '',
    role: '',
    email: 'Correo@ejemplo.com',
    phone: '123-456-7890',
    corresponsal: 'Corresponsal Ejemplo',
    registrationDate: 'Enero 2023',
    lastLogin: '23/02/2023'
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userData.name = this.authService.getUserName() || 'Usuario';
    this.userData.role = this.authService.getUserRole() || 'Rol';
  }

  // Actividades recientes
  activities = [
    { icon: 'fas fa-key', description: 'cambio contraseña' },
    { icon: 'fas fa-upload', description: 'Se subió archivo' },
    { icon: 'fas fa-file-alt', description: "Se 'No válido' archivo" },
    { icon: 'fas fa-upload', description: 'Se subió archivo' },
    { icon: 'fas fa-file-alt', description: "Se 'No válido' archivo" }
  ];


  // Método para actualizar información
  updateInfo(): void {
    console.log('Actualizar información clickeado');
    // Aquí implementarías la lógica para actualizar la información del usuario
  }

  openPasswordModal(): void {
    this.showPasswordModal = true;
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
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