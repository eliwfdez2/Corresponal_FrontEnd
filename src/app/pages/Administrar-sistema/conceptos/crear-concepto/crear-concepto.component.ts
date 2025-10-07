import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptosService } from '../../../../core/services/conceptos.service';
import { ToolBarComponent } from '../../../../Components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-crear-concepto',
  imports: [CommonModule, ReactiveFormsModule, ToolBarComponent],
  templateUrl: './crear-concepto.component.html',
  styleUrl: './crear-concepto.component.css'
})
export class CrearConceptoComponent {
  conceptoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private conceptosService: ConceptosService,
    private router: Router
  ) {
    this.conceptoForm = this.fb.group({
      clave: ['', Validators.required],
      activo: [1, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.conceptoForm.valid) {
      this.conceptosService.createConcepto(this.conceptoForm.value).subscribe({
        next: () => {
          this.router.navigate(['/administrar-sistema/conceptos']);
        },
        error: (err) => {
          console.error('Error creating concepto', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/administrar-sistema/conceptos']);
  }

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
