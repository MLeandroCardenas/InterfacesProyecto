import { forkJoin } from 'rxjs';
import { UsuariosService } from './../../_services/usuarios.service';
import { DialogoEdicionClaveComponent } from './dialogo-edicion-clave/dialogo-edicion-clave.component';
import { MatDialog } from '@angular/material/dialog';
import { PerfilUsuario } from './../../_model/PerfilUsuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private servicioUsuario: UsuariosService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private mensaje: MatSnackBar) { }

  protected usuario = new PerfilUsuario();
  myImg: string;

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.route.data.subscribe((datos: { datosUsuario: PerfilUsuario }) => {
      this.usuario = datos.datosUsuario;
      if(this.usuario.foto === null)
        this.myImg = './assets/img/img_defecto.gif'; 
      else{
        this.servicioUsuario.obtenerFotoUsuario(this.usuario.foto).subscribe(data => {
          this.myImg = data;
        });
      }
    });
  }

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }

  capturarFoto(event: any) {
    let img = event.target;
    if(img.files.length > 0){
      let form = new FormData();
      form.append('foto',img.files[0]);
      let subirFoto = this.servicioUsuario.subirFoto(form);
      let fotoActual = this.servicioUsuario.obtenerFotoActualizada();
      forkJoin([subirFoto, fotoActual]).subscribe(data => {
        this.mostrarMensaje(data[0] as string, 'Mensaje');
        this.myImg = data[1];
      });
    }
  }

  dialogoRecuperacion(): void {
    const dialogRef = this.dialog.open(DialogoEdicionClaveComponent, {
      width: '400px',
    });
  }
}
