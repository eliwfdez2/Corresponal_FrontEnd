import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from "../../Components/tool-bar/tool-bar.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ToolBarComponent, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  
  // Datos del usuario (podrían venir de un servicio)
  userData = {
    name: 'Jhon Doe',
    role: 'Administrador',
    email: 'Correo@ejemplo.com',
    phone: '123-456-7890',
    corresponsal: 'Corresponsal Ejemplo',
    registrationDate: 'Enero 2023',
    lastLogin: '23/02/2023'
  };

  // Actividades recientes
  activities = [
    { icon: 'fas fa-key', description: 'cambio contraseña' },
    { icon: 'fas fa-upload', description: 'Se subió archivo' },
    { icon: 'fas fa-file-alt', description: "Se 'No válido' archivo" },
    { icon: 'fas fa-upload', description: 'Se subió archivo' },
    { icon: 'fas fa-file-alt', description: "Se 'No válido' archivo" }
  ];

  constructor(private router: Router) {}


  // Método para actualizar información
  updateInfo(): void {
    console.log('Actualizar información clickeado');
    // Aquí implementarías la lógica para actualizar la información del usuario
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