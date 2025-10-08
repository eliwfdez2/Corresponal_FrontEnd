import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { RolesService, Role } from '../../core/services/roles.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<void>();

  createUserForm: FormGroup;
  roles: Role[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService
  ) {
    this.createUserForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      nombre_usuario: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol_nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error loading roles', err);
      }
    });
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.isLoading = true;
      this.userService.createUser(this.createUserForm.value).subscribe({
        next: () => {
          this.userCreated.emit();
          this.close.emit();
        },
        error: (err) => {
          console.error('Error creating user', err);
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.createUserForm.controls).forEach(key => {
      const control = this.createUserForm.get(key);
      control?.markAsTouched();
    });
  }

  onClose(): void {
    this.close.emit();
  }
}