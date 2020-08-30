import { MenuAdminComponent } from './_pages/menu-admin/menu-admin.component';
import { SolicitudRecuperacionComponent } from './_pages/solicitud-recuperacion/solicitud-recuperacion.component';
import { EventosPublicosComponent } from './_pages/eventos-publicos/eventos-publicos.component';
import { RegistroComponent } from './_pages/registro/registro.component';
import { LoginComponent } from './_pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'publicos', component: EventosPublicosComponent},
  {path: 'reestablecer', component: SolicitudRecuperacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
