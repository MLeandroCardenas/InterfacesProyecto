import { EventosComponent } from './_pages/eventos/eventos.component';
import { LectoresComponent } from './_pages/lectores/lectores.component';
import { PerfilResolverGuard } from './_resolvers/perfil-resolver.guard';
import { PerfilUsuarioComponent } from './_pages/perfil-usuario/perfil-usuario.component';
import { Not404Component } from './_pages/not404/not404.component';
import { CanActivateGuard } from './_guardas/can-activate.guard';
import { MenuFuncionalidadesComponent } from './_pages/menu-funcionalidades/menu-funcionalidades.component';
import { EventosPublicosComponent } from './_pages/eventos-publicos/eventos-publicos.component';
import { RegistroComponent } from './_pages/registro/registro.component';
import { LoginComponent } from './_pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZonasResolverGuard } from './_resolvers/zonas-resolver.guard';
import { ConfirmacionRegistroComponent } from './_pages/registro/confirmacion-registro/confirmacion-registro.component';
import { ReestablecerCuentaComponent } from './_pages/reestablecer-cuenta/reestablecer-cuenta.component';
import { UsuariosComponent } from './_pages/usuarios/usuarios.component';
import { ZonasComponent } from './_pages/zonas/zonas.component';
import { NotificacionesComponent } from './_pages/notificaciones/notificaciones.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/registro', component: RegistroComponent},
  {path: 'auth/confirmacion/:usuario', component: ConfirmacionRegistroComponent},
  {path: 'publicos', component: EventosPublicosComponent},
  {path: 'auth/reestablecer/:token', component: ReestablecerCuentaComponent},
  {path: 'funcionalidad', component: MenuFuncionalidadesComponent, canActivate: [CanActivateGuard], canActivateChild: [CanActivateGuard],
  children: [
    {path: 'lectores', component: LectoresComponent, resolve: {datosLectores: ZonasResolverGuard}},
    {path: 'zonas', component: ZonasComponent},
    {path: 'miperfil', component: PerfilUsuarioComponent, resolve: {datosUsuario: PerfilResolverGuard}},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'eventos', component: EventosComponent},
    {path: 'notificaciones', component: NotificacionesComponent}

  ]},
  {path: 'not404', component: Not404Component},
  {path: '**', redirectTo: 'not404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
