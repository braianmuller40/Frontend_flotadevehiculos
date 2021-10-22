import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AgendamientosComponent } from './modules/agendamientos/agendamientos.component';
import { AutosComponent } from './modules/autos/autos.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ServiciosComponent } from './modules/servicios/servicios.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'autos', component: AutosComponent, canActivate:[AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  { path: 'servicios', component: ServiciosComponent, canActivate:[AuthGuard]},
  { path: 'agendamientos', component: AgendamientosComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
