import { DialogoEdicionClaveComponent } from './../dialogo-edicion-clave/dialogo-edicion-clave.component';
import { MatDialog } from '@angular/material/dialog';
import { PerfilUsuario } from './../../_model/PerfilUsuario';
import { AutenticacionService } from './../../_services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private servicio: AutenticacionService, private route: ActivatedRoute, private dialog: MatDialog ) { }

  protected usuario = new PerfilUsuario();

  ngOnInit() {
    this.servicio.infoUsuario.subscribe(() => {
      this.cargarInformacion();
    });
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.route.data.subscribe((datos: { datosUsuario: PerfilUsuario }) => {
      this.usuario = datos.datosUsuario;
    });
  }

  dialogoRecuperacion(): void {
    const dialogRef = this.dialog.open(DialogoEdicionClaveComponent, {
      width: '400px',
    });
  }
}
