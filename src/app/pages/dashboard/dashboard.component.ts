import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToolBarComponent } from '../../Components/tool-bar/tool-bar.component';
import { CrearCorresponsalComponent } from '../../Modals/crear-corresponsal/crear-corresponsal.component';
import { CrearEjecutivasComponent } from '../../Modals/crear-ejecutivas/crear-ejecutivas.component';
import { NuevoTipoArchivoComponent } from '../../Modals/nuevo-tipo-archivo/nuevo-tipo-archivo.component';
import { NuevoConceptoComponent } from '../../Modals/nuevo-concepto/nuevo-concepto.component';
import { BuscadorReferenciasComponent } from "../../Components/buscador-referencias/buscador-referencias.component";
import { ReferenciasService } from '../../core/services/referencias.service';
import { CorresponsalService } from '../../core/services/corresponsal.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ToolBarComponent, CrearCorresponsalComponent, CrearEjecutivasComponent, NuevoTipoArchivoComponent, NuevoConceptoComponent, BuscadorReferenciasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Dashboard statistics data
  dashboardStats = {
    totalReferences: 0,
    totalProviders: 0
  };

  // Search functionality
  searchQuery: string = '';

  // Modal state
  isCreateReferenceModalOpen: boolean = false;
  isCreateCorresponsalModalOpen: boolean = false;
  isCreateEjecutivaModalOpen: boolean = false;
  isNuevoTipoArchivoModalOpen: boolean = false;
  isNuevoConceptoModalOpen: boolean = false;

  // User role
  userRole: string | null = null;

  constructor(private router: Router, private referenciasService: ReferenciasService, private corresponsalService: CorresponsalService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    if (this.isAdmin()) {
      this.referenciasService.getReferencias().subscribe(references => {
        this.dashboardStats.totalReferences = references.length;
      });
      this.corresponsalService.getCorresponsales().subscribe(corresponsales => {
        this.dashboardStats.totalProviders = corresponsales.length;
      });
    }
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

  // Quick action methods
  onCreateReference() {
    if (!this.canCreateReference()) return;
    console.log('Create Reference clicked');
    this.isCreateReferenceModalOpen = true;
  }

  onNewEjecutiva() {
    if (!this.canCreateEjecutiva()) return;
    console.log('New Ejecutiva clicked');
    this.isCreateEjecutivaModalOpen = true;
  }

  onNewProvider() {
    if (!this.canCreateProvider()) return;
    console.log('New Provider clicked');
    this.isCreateCorresponsalModalOpen = true;
  }

  onNuevoTipoArchivo() {
    if (!this.canValidateDocuments()) return;
    console.log('Nuevo Tipo Archivo clicked');
    this.isNuevoTipoArchivoModalOpen = true;
  }

  onNuevoConcepto() {
    if (!this.canValidateDocuments()) return;
    console.log('Nuevo Concepto clicked');
    this.isNuevoConceptoModalOpen = true;
  }

  // Search functionality
  onSearch() {
    console.log('Searching for:', this.searchQuery);
    // Implement search logic here
  }

  onSearchInput(event: any) {
    this.searchQuery = event.target.value;
  }

  // Modal event handlers
  onModalClosed() {
    this.isCreateReferenceModalOpen = false;
  }

  onReferenceCreated(referenceData: any) {
    console.log('New reference created:', referenceData);
    // Here you can add logic to update the dashboard stats or refresh data
    // For example, increment the total references count
    this.dashboardStats.totalReferences++;

    // You could also add the new reference to a list or refresh data from a service
    this.isCreateReferenceModalOpen = false;
  }

  // Corresponsal modal event handlers
  onCorresponsalModalClosed() {
    this.isCreateCorresponsalModalOpen = false;
  }

  onCorresponsalCreated(corresponsalData: any) {
    console.log('New corresponsal created:', corresponsalData);
    // Here you can add logic to update the dashboard stats or refresh data
    // For example, increment the total providers count
    this.dashboardStats.totalProviders++;

    // You could also add the new corresponsal to a list or refresh data from a service
    this.isCreateCorresponsalModalOpen = false;
  }

  // Ejecutiva modal event handlers
  onEjecutivaModalClosed() {
    this.isCreateEjecutivaModalOpen = false;
  }
  
  onEjecutivaCreated(ejecutivaData: any) {
    console.log('New ejecutiva created:', ejecutivaData);
    // Here you can add logic to update the dashboard stats or refresh data
    // For example, increment the total providers count
    this.dashboardStats.totalProviders++;
    
    // You could also add the new ejecutiva to a list or refresh data from a service
    this.isCreateEjecutivaModalOpen = false;
  }
  
  // Nuevo Tipo Archivo modal event handlers
  onNuevoTipoArchivoModalClosed() {
    this.isNuevoTipoArchivoModalOpen = false;
  }
  
  onTipoArchivoCreated(tipoArchivoData: any) {
    console.log('New tipo archivo created:', tipoArchivoData);
    this.isNuevoTipoArchivoModalOpen = false;
  }
  
  // Nuevo Concepto modal event handlers
  onNuevoConceptoModalClosed() {
    this.isNuevoConceptoModalOpen = false;
  }
  
  onConceptoCreated(conceptoData: any) {
    console.log('New concepto created:', conceptoData);
    this.isNuevoConceptoModalOpen = false;
  }

  // Role-based access control methods
  isAdmin(): boolean {
    return this.userRole === 'Administrador';
  }

  isCorresponsal(): boolean {
    return this.userRole === 'Corresponsal';
  }

  canCreateReference(): boolean {
    return this.isAdmin();
  }

  canCreateEjecutiva(): boolean {
    return this.isAdmin();
  }

  canCreateProvider(): boolean {
    return this.isAdmin();
  }

  canValidateDocuments(): boolean {
    return this.isAdmin() || this.isCorresponsal();
  }
}