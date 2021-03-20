import { UsuariosService } from './../../_services/usuarios.service';
import { DialogoEdicionClaveComponent } from './dialogo-edicion-clave/dialogo-edicion-clave.component';
import { MatDialog } from '@angular/material/dialog';
import { PerfilUsuario } from './../../_model/PerfilUsuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private servicioUsuario: UsuariosService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private mensaje: MatSnackBar,
              private formBuilder: FormBuilder) { }

  protected usuario = new PerfilUsuario();
  formFoto: FormGroup;
  trueImg: boolean = false;
  myImg: string;   

  iniciarFormulario() {
    this.formFoto = this.formBuilder.group({
      fotoPerfil: ['']
    });
  }

  ngOnInit() {
    this.cargarInformacion();
    this.iniciarFormulario();
  }

  cargarInformacion() {
    this.route.data.subscribe((datos: { datosUsuario: PerfilUsuario }) => {
      this.usuario = datos.datosUsuario;
      if(this.usuario.foto === null)
        this.trueImg = false;
      else {
        this.servicioUsuario.obtenerFotoUsuario(this.usuario.foto).subscribe(data => {
          this.myImg = data;
          console.log('Imagen ' + this.myImg);
          this.trueImg = true;
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
      this.servicioUsuario.subirFoto(form).subscribe( data => {
        this.cargarInformacion();
        this.mostrarMensaje(data as string, 'Mensaje');
      });
    }
  }

  dialogoRecuperacion(): void {
    const dialogRef = this.dialog.open(DialogoEdicionClaveComponent, {
      width: '400px',
    });
  }
}
