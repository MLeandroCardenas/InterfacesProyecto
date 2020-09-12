import { AutenticacionService } from './../../_services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-funcionalidades',
  templateUrl: './menu-funcionalidades.component.html',
  styleUrls: ['./menu-funcionalidades.component.css']
})
export class MenuFuncionalidadesComponent implements OnInit {

  public rolUsuario: number;

  constructor(private servicio: AutenticacionService,
              private route: Router) { }

  ngOnInit() {
    this.obtenerRolusuario();
  }

  obtenerRolusuario() {
    this.servicio.rolUsuarioAutenticado().subscribe( data => {
      this.rolUsuario = data as number;
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem(environment.LLAVE_TOKEN);
    sessionStorage.removeItem(environment.LLAVE_REFRESH_TOKEN);
    this.route.navigate(['/login']);
  }
}
