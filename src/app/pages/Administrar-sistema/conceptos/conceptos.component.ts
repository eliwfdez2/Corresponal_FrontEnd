import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptosService } from '../../../core/services/conceptos.service';

@Component({
  selector: 'app-conceptos',
  imports: [CommonModule],
  templateUrl: './conceptos.component.html',
  styleUrl: './conceptos.component.css'
})
export class ConceptosComponent implements OnInit {
  conceptos: any[] = [];

  constructor(private conceptosService: ConceptosService) {}

  ngOnInit(): void {
    this.loadConceptos();
  }

  loadConceptos(): void {
    this.conceptosService.getConceptos().subscribe({
      next: (data) => {
        this.conceptos = data;
      },
      error: (err) => {
        console.error('Error loading conceptos', err);
      }
    });
  }
}
