import { Archivo } from './../../_model/Archivo';
import { UsuariosService } from './../../_services/usuarios.service';
import { DialogoEdicionClaveComponent } from './../dialogo-edicion-clave/dialogo-edicion-clave.component';
import { MatDialog } from '@angular/material/dialog';
import { PerfilUsuario } from './../../_model/PerfilUsuario';
import { AutenticacionService } from './../../_services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private servicio: AutenticacionService,
              private servicioUsuario: UsuariosService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private mensaje: MatSnackBar,
              private formBuilder: FormBuilder) { }

  protected usuario = new PerfilUsuario();
  private archivo = new Archivo();
  formFoto: FormGroup;
  fileToUpload: File = null;

  ngOnInit() {
    this.iniciarFormulario();
    this.servicio.infoUsuario.subscribe(() => {
      this.cargarInformacion();
    });
    this.cargarInformacion();
  }

  iniciarFormulario() {
    this.formFoto = this.formBuilder.group({
      archivo: ['']
    });
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

  capturarFoto(datos: any) {
    if (datos.length > 0) {
      this.handleFileInput(datos);
    } else {
      this.mostrarMensaje('Formato no valido', 'Advertencia');
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    debugger;
    this.archivo.nombre = this.fileToUpload.name;
    this.archivo.tamanio = this.fileToUpload.size;
    this.archivo.tipo = this.fileToUpload.type;
  }

  subir() {
    this.servicioUsuario.cambiarFotoPerfil(this.fileToUpload).subscribe(data => {
      this.mostrarMensaje(data as string, 'Mensaje');
    });
  }

  dialogoRecuperacion(): void {
    const dialogRef = this.dialog.open(DialogoEdicionClaveComponent, {
      width: '400px',
    });
  }
}
