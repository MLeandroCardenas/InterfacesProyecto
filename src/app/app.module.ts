import { MAT_DATE_FORMATS } from '@angular/material/core';
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
import { EventosPublicosComponent } from './_pages/eventos/eventos-publicos/eventos-publicos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidacionCorreoAsincronaDirective } from './_validaciones/validacion-correo-asincrona.directive';
import { Not404Component } from './_pages/not404/not404.component';
import { ZonasComponent } from './_pages/zonas/zonas.component';
import { LectoresComponent } from './_pages/lectores/lectores.component';
import { PerfilUsuarioComponent } from './_pages/perfil-usuario/perfil-usuario.component';
import { DialogoEdicionClaveComponent } from './_pages/perfil-usuario/dialogo-edicion-clave/dialogo-edicion-clave.component';
import { ConfirmacionRegistroComponent } from './_pages/registro/confirmacion-registro/confirmacion-registro.component';
import { ReestablecerCuentaComponent } from './_pages/reestablecer-cuenta/reestablecer-cuenta.component';
import { DialogoSolicitudRecuperacionComponent } from './_pages/reestablecer-cuenta/dialogo-solicitud-recuperacion/dialogo-solicitud-recuperacion.component';
import { UsuariosComponent } from './_pages/usuarios/usuarios.component';
import { ValidacionIdentificacionAsincronaDirective } from './_validaciones/validacion-identificacion-asincrona.directive';
import { EventosComponent } from './_pages/eventos/eventos.component';
import { MatDateFormats, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EventosUsuariosComponent } from './_pages/eventos/eventos-usuarios/eventos-usuarios.component';
import { DialogoDescripcionEventoComponent } from './_pages/eventos/dialogo-descripcion-evento/dialogo-descripcion-evento.component';
import { DialogoHorariosEventoComponent } from './_pages/eventos/dialogo-horarios-evento/dialogo-horarios-evento.component';
import { NotificacionesComponent } from './_pages/notificaciones/notificaciones.component';
import { EventosRegistradosComponent } from './_pages/eventos/eventos-registrados/eventos-registrados.component';
import { PeticionesComponent } from './_pages/peticiones/peticiones.component';
import { NotificacionesUsuariosComponent } from './_pages/notificaciones/notificaciones-usuarios/notificaciones-usuarios.component';
import { MenuComponent } from './_pages/menu/menu.component';

export const GRI_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EventosPublicosComponent,
    ReestablecerCuentaComponent,
    ValidacionCorreoAsincronaDirective,
    Not404Component,
    ZonasComponent,
    LectoresComponent,
    PerfilUsuarioComponent,
    DialogoEdicionClaveComponent,
    ConfirmacionRegistroComponent,
    ReestablecerCuentaComponent,
    DialogoSolicitudRecuperacionComponent,
    UsuariosComponent,
    ValidacionIdentificacionAsincronaDirective,
    EventosComponent,
    EventosUsuariosComponent,
    DialogoDescripcionEventoComponent,
    DialogoHorariosEventoComponent,
    NotificacionesComponent,
    EventosRegistradosComponent,
    PeticionesComponent,
    NotificacionesUsuariosComponent,
    MenuComponent
  ],
  entryComponents: [
    DialogoEdicionClaveComponent,
    DialogoSolicitudRecuperacionComponent,
    DialogoDescripcionEventoComponent,
    DialogoHorariosEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-CO'},
    {provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS},
    {provide: DatePipe}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
