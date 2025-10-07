import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConceptosService } from '../../../../core/services/conceptos.service';
import { ToolBarComponent } from '../../../../Components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-editar-concepto',
  imports: [CommonModule, ReactiveFormsModule, ToolBarComponent],
  templateUrl: './editar-concepto.component.html',
  styleUrl: './editar-concepto.component.css'
})
export class EditarConceptoComponent implements OnInit {
  conceptoForm: FormGroup;
  conceptoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private conceptosService: ConceptosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.conceptoForm = this.fb.group({
      clave: ['', Validators.required],
      activo: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.conceptoId = +this.route.snapshot.paramMap.get('id')!;
    this.loadConcepto();
  }

  loadConcepto(): void {
    this.conceptosService.getConcepto(this.conceptoId).subscribe({
      next: (concepto) => {
        this.conceptoForm.patchValue(concepto);
      },
      error: (err) => {
        console.error('Error loading concepto', err);
      }
    });
  }

  onSubmit(): void {
    if (this.conceptoForm.valid) {
      this.conceptosService.updateConcepto(this.conceptoId, this.conceptoForm.value).subscribe({
        next: () => {
          this.router.navigate(['/administrar-sistema/conceptos']);
        },
        error: (err) => {
          console.error('Error updating concepto', err);
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
