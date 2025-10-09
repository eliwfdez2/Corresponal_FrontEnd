import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from "../../Components/tool-bar/tool-bar.component";
import { Router, RouterModule } from '@angular/router';
import { CambiarContrasenaComponent } from '../../Modals/cambiar-contrasena/cambiar-contrasena.component';
import { ActualizarInformacionComponent } from '../../Modals/actualizar-informacion/actualizar-informacion.component';
import { AuthService } from '../../core/services/auth.service';
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ToolBarComponent, RouterModule, CambiarContrasenaComponent, ActualizarInformacionComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  showPasswordModal = false;
  showInfoModal = false;

  // Datos del usuario
  userData: User | null = null;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.userData = user;
        },
        error: (err) => {
          console.error('Error loading user data:', err);
        }
      });
    }
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
    this.showInfoModal = true;
  }

  openPasswordModal(): void {
    this.showPasswordModal = true;
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
  }

  closeInfoModal(): void {
    this.showInfoModal = false;
  }

  onInfoUpdated(): void {
    this.loadUserData();
    this.closeInfoModal();
  }

  onLogout() {
    console.log('Logout requested');
    // Handle logout logic here
    this.router.navigate(['/login']);
  }
}