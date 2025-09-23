import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { VerReferenciaComponent } from './Components/ver-referencia/ver-referencia.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';
import { AjustesComponent } from './pages/ajustes/ajustes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'ver-referencia/:id', component: VerReferenciaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'administrar-usuarios', component: AdministrarUsuariosComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
