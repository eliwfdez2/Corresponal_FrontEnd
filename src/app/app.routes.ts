import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { VerReferenciaComponent } from './Components/ver-referencia/ver-referencia.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';
import { AjustesComponent } from './pages/Administrar-sistema/Administrar-sistema.component';
import { ConceptosComponent } from './pages/Administrar-sistema/conceptos/conceptos.component';
import { CrearConceptoComponent } from './pages/Administrar-sistema/conceptos/crear-concepto/crear-concepto.component';
import { EditarConceptoComponent } from './pages/Administrar-sistema/conceptos/editar-concepto/editar-concepto.component';
import { DocumentosComponent } from './pages/Administrar-sistema/documentos/documentos.component';
import { EstatusComponent } from './pages/Administrar-sistema/estatus/estatus.component';
import { ExtensionesArchivosComponent } from './pages/Administrar-sistema/extensiones-archivos/extensiones-archivos.component';
import { ReferenciasComponent } from './pages/Administrar-sistema/referencias/referencias.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MonitorearUsuariosComponent } from './Components/monitorear-usuarios/monitorear-usuarios.component';
import { GestionarRolesComponent } from './Components/gestionar-roles/gestionar-roles.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'historial', component: HistorialComponent },
      { path: 'ver-referencia/:id', component: VerReferenciaComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'administrar-usuarios', component: AdministrarUsuariosComponent },
      { path: 'monitoreo-usuarios', component: MonitorearUsuariosComponent },
      {path: 'gestionar-roles', component: GestionarRolesComponent},
      { path: 'administrar-sistema', component: AjustesComponent },
      { path: 'administrar-sistema/conceptos', component: ConceptosComponent },
      { path: 'administrar-sistema/documentos', component: DocumentosComponent },
      { path: 'administrar-sistema/estatus', component: EstatusComponent },
      { path: 'administrar-sistema/extensiones-archivos', component: ExtensionesArchivosComponent },
      { path: 'administrar-sistema/referencias', component: ReferenciasComponent }
    ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
