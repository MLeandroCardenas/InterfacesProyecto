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

  public rolUsuario: number;
  public titulo: string;

  constructor(private servicio: AutenticacionService, private route: Router) { }

  ngOnInit() {
    this.titulo = environment.NOMBREAPP;
    this.servicio.rolUsuarioAutenticado().subscribe( data => {
      this.rolUsuario = data as number;
    });
  }

  cerrarSesion() {
    this.servicio.cerrarSesion();
  }
}
