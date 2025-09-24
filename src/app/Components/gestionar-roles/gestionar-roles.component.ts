import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService, Role } from '../../core/services/roles.service';

@Component({
  selector: 'app-gestionar-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-roles.component.html',
  styleUrls: ['./gestionar-roles.component.css']
})
export class GestionarRolesComponent implements OnInit {
  roles: Role[] = [];
  newRole: Omit<Role, 'id'> = { nombre: '', descripcion: '' };

  constructor(private router: Router, private rolesService: RolesService) {}

  ngOnInit() {
    this.fetchRoles();
  }

  fetchRoles() {
    this.rolesService.getRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

  createRole() {
    if (this.newRole.nombre && this.newRole.descripcion) {
      this.rolesService.createRole(this.newRole).subscribe((createdRole: Role) => {
        this.roles.push(createdRole);
        this.newRole = { nombre: '', descripcion: '' }; // Reset form
      });
    }
  }

  volver() {
    this.router.navigate(['/administrar-usuarios']);
  }
}
