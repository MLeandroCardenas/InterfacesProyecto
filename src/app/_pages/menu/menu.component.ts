import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from 'src/app/_services/autenticacion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private servicio: AutenticacionService) { }

  ngOnInit(): void {
    this.servicio.obtenerRol().subscribe(data=>{
      this.servicio.rolAutenticado = data;
    });
  } 

  cerrarSesion() {
    this.servicio.cerrarSesion();
  }

  get usuarioLogueado(){
    return this.servicio.rolAutenticado;
  }

}
