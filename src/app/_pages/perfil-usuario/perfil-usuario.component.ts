import { UsuariosService } from './../../_services/usuarios.service';
import { DialogoEdicionClaveComponent } from './../dialogo-edicion-clave/dialogo-edicion-clave.component';
import { MatDialog } from '@angular/material/dialog';
import { PerfilUsuario } from './../../_model/PerfilUsuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
    });
  }

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }

  capturarFoto(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formFoto.get('fotoPerfil').setValue(file);
    }
  }

  subir() {
    if (this.formFoto.invalid)
      alert('Seleccione un archivo');
    else {
      const formData = new FormData();
      formData.append('foto', this.formFoto.get('fotoPerfil').value);
      this.servicioUsuario.cambiarFotoPerfil(formData).subscribe(data => {
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
