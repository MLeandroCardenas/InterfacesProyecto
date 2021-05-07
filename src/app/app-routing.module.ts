import { EventosComponent } from './_pages/eventos/eventos.component';
import { LectoresComponent } from './_pages/lectores/lectores.component';
import { PerfilResolverGuard } from './_resolvers/perfil-resolver.guard';
import { PerfilUsuarioComponent } from './_pages/perfil-usuario/perfil-usuario.component';
import { Not404Component } from './_pages/not404/not404.component';
import { CanActivateGuard } from './_guardas/can-activate.guard';
import { EventosPublicosComponent } from './_pages/eventos/eventos-publicos/eventos-publicos.component';
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
import { PeticionesComponent } from './_pages/peticiones/peticiones.component';
import { MenuComponent } from './_pages/menu/menu.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'confirmacion/:usuario', component: ConfirmacionRegistroComponent},
  {path: 'publicos', component: EventosPublicosComponent},
  {path: 'reestablecer/:token', component: ReestablecerCuentaComponent},
  {path: 'admin/lectores', component: LectoresComponent, canActivate: [CanActivateGuard], resolve: {datosLectores: ZonasResolverGuard}},
  {path: 'admin/zonas', component: ZonasComponent, canActivate: [CanActivateGuard]},
  {path: 'miperfil', component: PerfilUsuarioComponent, canActivate: [CanActivateGuard], resolve: {datosUsuario: PerfilResolverGuard}},
  {path: 'admin/usuarios', component: UsuariosComponent, canActivate: [CanActivateGuard]},
  {path: 'eventos', component: EventosComponent, canActivate: [CanActivateGuard]},
  {path: 'notificaciones', component: NotificacionesComponent, canActivate: [CanActivateGuard]},
  {path: 'peticiones', component: PeticionesComponent, canActivate: [CanActivateGuard]},
  {path: 'not404', component: Not404Component},
  {path: '**', redirectTo: 'not404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
