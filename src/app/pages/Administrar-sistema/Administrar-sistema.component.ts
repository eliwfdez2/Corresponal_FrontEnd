import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToolBarComponent } from "../../Components/tool-bar/tool-bar.component";

interface SistemaMetricas {
  totalConceptos: number;
  totalReferencias: number;
  totalDocumentos: number;
}

@Component({
  selector: 'app-ajustes',
  imports: [CommonModule, ToolBarComponent],
  templateUrl: './Administrar-sistema.component.html',
  styleUrl: './Administrar-sistema.component.css'
})
export class AjustesComponent implements OnInit {

  // métricas del sistema
  metricas: SistemaMetricas = {
    totalConceptos: 0,
    totalReferencias: 0,
    totalDocumentos: 0
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cargarMetricas();
  }

  /**
   * Carga las métricas desde los servicios
   */
  private cargarMetricas(): void {
    // Aquí normalmente harías llamadas a los servicios
    // this.conceptosService.getConceptos().subscribe(data => this.metricas.totalConceptos = data.length);
    // this.referenciasService.getReferencias().subscribe(data => this.metricas.totalReferencias = data.length);
    // this.documentosService.getDocumentos().subscribe(data => this.metricas.totalDocumentos = data.length);

    // Simulación de carga de datos
    console.log('Cargando métricas del sistema...');
  }

  irConceptos(): void {
    console.log('Navegando a conceptos');
    this.router.navigate(['/administrar-sistema/conceptos']);
  }

  irDocumentos(): void {
    console.log('Navegando a documentos');
    this.router.navigate(['/administrar-sistema/documentos']);
  }

  irEstatus(): void {
    console.log('Navegando a estatus');
    this.router.navigate(['/administrar-sistema/estatus']);
  }

  irExtensionesArchivos(): void {
    console.log('Navegando a extensiones-archivos');
    this.router.navigate(['/administrar-sistema/extensiones-archivos']);
  }

  irReferencias(): void {
    console.log('Navegando a referencias');
    this.router.navigate(['/administrar-sistema/referencias']);
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
