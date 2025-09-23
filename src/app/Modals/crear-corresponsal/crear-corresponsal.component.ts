import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-crear-corresponsal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-corresponsal.component.html',
  styleUrl: './crear-corresponsal.component.css',
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
export class CrearCorresponsalComponent {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() corresponsalCreated = new EventEmitter<any>();

  // Form data
  corresponsalData = {
    name: '',
    email: '',
    phone: ''
  };

  // Modal control methods
  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  // Form submission
  onSubmit() {
    if (this.isFormValid()) {
      this.saveCorresponsal();
    }
  }

  saveCorresponsal() {
    if (this.isFormValid()) {
      const corresponsalData = {
        name: this.corresponsalData.name,
        email: this.corresponsalData.email,
        phone: this.corresponsalData.phone,
        createdAt: new Date()
      };

      this.corresponsalCreated.emit(corresponsalData);
      this.closeModal();
    }
  }

  private isFormValid(): boolean {
    return this.corresponsalData.name.trim() !== '' && 
           this.corresponsalData.email.trim() !== '' && 
           this.corresponsalData.phone.trim() !== '';
  }

  private resetForm() {
    this.corresponsalData = {
      name: '',
      email: '',
      phone: ''
    };
  }
}
