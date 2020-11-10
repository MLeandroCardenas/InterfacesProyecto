import { AuthInterceptorService } from './_compartido/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './_material/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './_pages/registro/registro.component';
import { LoginComponent } from './_pages/login/login.component';
import { EventosPublicosComponent } from './_pages/eventos-publicos/eventos-publicos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuPrincipalComponent } from './_pages/menu-principal/menu-principal.component';
import { MenuFuncionalidadesComponent } from './_pages/menu-funcionalidades/menu-funcionalidades.component';
import { ValidacionCorreoAsincronaDirective } from './_validaciones/validacion-correo-asincrona.directive';
import { Not404Component } from './_pages/not404/not404.component';
import { ZonasComponent } from './_pages/zonas/zonas.component';
import { LectoresComponent } from './_pages/lectores/lectores.component';
import { PerfilUsuarioComponent } from './_pages/perfil-usuario/perfil-usuario.component';
import { DialogoEdicionClaveComponent } from './_pages/dialogo-edicion-clave/dialogo-edicion-clave.component';
import { ConfirmacionRegistroComponent } from './_pages/confirmacion-registro/confirmacion-registro.component';
import { ReestablecerCuentaComponent } from './_pages/reestablecer-cuenta/reestablecer-cuenta.component';
import { DialogoSolicitudRecuperacionComponent } from './_pages/dialogo-solicitud-recuperacion/dialogo-solicitud-recuperacion.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EventosPublicosComponent,
    ReestablecerCuentaComponent,
    MenuPrincipalComponent,
    MenuFuncionalidadesComponent,
    ValidacionCorreoAsincronaDirective,
    Not404Component,
    ZonasComponent,
    LectoresComponent,
    PerfilUsuarioComponent,
    DialogoEdicionClaveComponent,
    ConfirmacionRegistroComponent,
    ReestablecerCuentaComponent,
    DialogoSolicitudRecuperacionComponent
  ],
  entryComponents: [
    DialogoEdicionClaveComponent,
    DialogoSolicitudRecuperacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
