import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { CorresponsalService } from '../../core/services/corresponsal.service';

@Component({
  selector: 'app-crear-referencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-referencias.component.html',
  styleUrl: './crear-referencias.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-50px)', opacity: 0 }))
      ])
    ])
  ]
})
export class CrearReferenciasComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() referenceCreated = new EventEmitter<any>();

  // Form data
  referenceData = {
    name: ''
  };

  // Provider management
  selectedProviders: string[] = [];
  providerInput: string = '';
  showDropdown: boolean = false;

  // Available providers (this could come from a service)
  availableProviders: string[] = [];

  constructor(private corresponsalService: CorresponsalService) {}

  ngOnInit() {
    this.fetchProviders();
  }

  fetchProviders() {
    this.corresponsalService.getCorresponsalesActivos().subscribe({
      next: (data) => {
        console.log('Proveedores recibidos:', data); // <-- Verifica datos
        this.availableProviders = data
          .filter(u => u.activo)
          .map(u => u.nombre_usuario);
      },
      error: () => {
        this.availableProviders = [];
      }
    });
  }

  // Modal control methods
  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  // Provider management methods
  addProvider() {
    if (this.providerInput.trim() && !this.selectedProviders.includes(this.providerInput.trim())) {
      this.selectedProviders.push(this.providerInput.trim());
      this.providerInput = '';
      this.showDropdown = false;
    }
  }

  selectProvider(provider: string) {
    if (!this.selectedProviders.includes(provider)) {
      this.selectedProviders.push(provider);
    }
    this.providerInput = '';
    this.showDropdown = false;
  }

  removeProvider(index: number) {
    this.selectedProviders.splice(index, 1);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.saveReference();
    }
  }

  saveReference() {
    if (this.isFormValid()) {
      const referenceData = {
        name: this.referenceData.name,
        providers: this.selectedProviders,
        createdAt: new Date()
      };

      this.referenceCreated.emit(referenceData);
      this.closeModal();
    }
  }

  private isFormValid(): boolean {
    return this.referenceData.name.trim() !== '' && this.selectedProviders.length > 0;
  }

  private resetForm() {
    this.referenceData = { name: '' };
    this.selectedProviders = [];
    this.providerInput = '';
    this.showDropdown = false;
  }
}
