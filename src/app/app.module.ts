import { HttpClientModule } from '@angular/common/http';
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
import { MenuAdminComponent } from './_pages/menu-admin/menu-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EventosPublicosComponent,
    VistaDialogoRecuperacionComponent,
    SolicitudRecuperacionComponent,
    MenuAdminComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
