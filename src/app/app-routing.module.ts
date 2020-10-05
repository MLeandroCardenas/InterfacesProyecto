import { LectoresComponent } from './_pages/lectores/lectores.component';
import { ZonasComponent } from './_pages/zonas/zonas.component';
import { Not404Component } from './_pages/not404/not404.component';
import { CanActivateGuard } from './_guardas/can-activate.guard';
import { MenuFuncionalidadesComponent } from './_pages/menu-funcionalidades/menu-funcionalidades.component';
import { SolicitudRecuperacionComponent } from './_pages/solicitud-recuperacion/solicitud-recuperacion.component';
import { EventosPublicosComponent } from './_pages/eventos-publicos/eventos-publicos.component';
import { RegistroComponent } from './_pages/registro/registro.component';
import { LoginComponent } from './_pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'publicos', component: EventosPublicosComponent},
  {path: 'reestablecer', component: SolicitudRecuperacionComponent},
  {path: 'funcionalidad', component: MenuFuncionalidadesComponent, canActivate: [CanActivateGuard], canActivateChild: [CanActivateGuard],
  children: [
    {path: 'zonas', component: ZonasComponent},
    {path: 'lectores', component: LectoresComponent}
  ]},
  {path: 'not404', component: Not404Component},
  {path: '**', redirectTo: 'not404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
