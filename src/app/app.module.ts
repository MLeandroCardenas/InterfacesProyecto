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
import { VistaDialogoRecuperacionComponent } from './_pages/vista-dialogo-recuperacion/vista-dialogo-recuperacion.component';
import { SolicitudRecuperacionComponent } from './_pages/solicitud-recuperacion/solicitud-recuperacion.component';
import { MenuPrincipalComponent } from './_pages/menu-principal/menu-principal.component';
import { MenuFuncionalidadesComponent } from './_pages/menu-funcionalidades/menu-funcionalidades.component';
import { ValidacionCorreoAsincronaDirective } from './_validaciones/validacion-correo-asincrona.directive';
import { Not404Component } from './_pages/not404/not404.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EventosPublicosComponent,
    VistaDialogoRecuperacionComponent,
    SolicitudRecuperacionComponent,
    MenuPrincipalComponent,
    MenuFuncionalidadesComponent,
    ValidacionCorreoAsincronaDirective,
    Not404Component,
  ],
  entryComponents: [
    VistaDialogoRecuperacionComponent
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
