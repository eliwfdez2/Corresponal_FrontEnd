import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToolBarComponent } from '../../Components/tool-bar/tool-bar.component';
import { CrearReferenciasComponent } from '../../Modals/crear-referencias/crear-referencias.component';
import { CrearCorresponsalComponent } from '../../Modals/crear-corresponsal/crear-corresponsal.component';
import { BuscadorReferenciasComponent } from "../../Components/buscador-referencias/buscador-referencias.component";
import { ReferenciasService } from '../../core/services/referencias.service';
import { CorresponsalService } from '../../core/services/corresponsal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ToolBarComponent, CrearReferenciasComponent, CrearCorresponsalComponent, BuscadorReferenciasComponent],
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

  constructor(private router: Router, private referenciasService: ReferenciasService, private corresponsalService: CorresponsalService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.referenciasService.getReferencias().subscribe(references => {
      this.dashboardStats.totalReferences = references.length;
    });

    this.corresponsalService.getCorresponsalesActivos().subscribe(corresponsales => {
      this.dashboardStats.totalProviders = corresponsales.length;
    });
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
    console.log('Create Reference clicked');
    this.isCreateReferenceModalOpen = true;
  }

  onOtherPlanned() {
    console.log('Other planned action clicked');
    // Handle other planned functionality
  }

  onNewProvider() {
    console.log('New Provider clicked');
    this.isCreateCorresponsalModalOpen = true;
  }

  onValidateDocuments() {
    console.log('Validate Documents clicked');
    // Navigate to document validation page
    // this.router.navigate(['/validate-documents']);
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
}