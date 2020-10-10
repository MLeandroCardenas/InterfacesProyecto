import { MenuPrincipalComponent } from './../menu-principal/menu-principal.component';
import { AutenticacionService } from './../../_services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-funcionalidades',
  templateUrl: './menu-funcionalidades.component.html',
  styleUrls: ['./menu-funcionalidades.component.css']
})
export class MenuFuncionalidadesComponent implements OnInit {

  protected rolUsuario: string;
  protected titulo: string;

  constructor(private servicio: AutenticacionService) { }

  ngOnInit() {
    this.titulo = environment.NOMBREAPP;
    this.servicio.usuarioAutenticado().subscribe( data => {
      this.rolUsuario = data.rol;
      this.servicio.infoUsuario.next();
      environment.ROL = this.rolUsuario;
    });
  }

  cerrarSesion() {
    this.servicio.cerrarSesion();
  }
}
