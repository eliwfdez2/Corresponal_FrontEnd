import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenciasService, Referencia } from '../../../core/services/referencias.service';

@Component({
  selector: 'app-referencias',
  imports: [CommonModule],
  templateUrl: './referencias.component.html',
  styleUrl: './referencias.component.css'
})
export class ReferenciasComponent implements OnInit {
  referencias: Referencia[] = [];

  constructor(private referenciasService: ReferenciasService) {}

  ngOnInit(): void {
    this.loadReferencias();
  }

  loadReferencias(): void {
    this.referenciasService.getReferencias().subscribe({
      next: (data) => {
        this.referencias = data;
      },
      error: (err) => {
        console.error('Error loading referencias', err);
      }
    });
  }
}
