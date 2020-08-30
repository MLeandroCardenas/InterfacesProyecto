import { Usuario } from './../../_model/Usuario';
import { AutenticacionService } from './../../_services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Roles {
  nombre: string;
  idRol: number;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
        private formBuilder: FormBuilder,
        private servicio: AutenticacionService,
        private mensaje: MatSnackBar
      ) { }
       
  formRegistro: FormGroup;
  formatoCorreo: any = '';
  formatoDocumento: any = '';
  rolesApp: Roles[];

  iniciarFormuario() {
    this.formRegistro = this.formBuilder.group({
      apellidos: ['',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)]
      ],
      nombres: ['',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)]
      ],
      correo: ['',
      [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern(this.formatoCorreo)]
      ],
      identificacion: ['',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern(this.formatoDocumento)]],
      clave: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)]
      ],
      repetirClave: ['',
      [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(12)]
      ],
      rol: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.iniciarFormuario();
    roles: this.rolesApp = [
      {idRol: 4, nombre: 'Estudiante'},
      {idRol: 3, nombre: 'Docente'},
      {idRol: 2, nombre: 'Administrativo'}
    ];
  }

  refrescar() {
    this.formRegistro.patchValue({
      apellidos: '',
      nombres: '',
      correo: '',
      identificacion: '',
      clave: '',
      repetirClave: '',
      rol: ''
    });
  }

  mostrarMensaje(men: string, action: string){
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }

  registro() {
    let usuario = new Usuario();
    usuario.apellidos = this.formRegistro.get('apellidos').value;
    usuario.nombres = this.formRegistro.get('nombres').value;
    usuario.email = this.formRegistro.get('correo').value;
    usuario.identificacion = this.formRegistro.get('identificacion').value;
    usuario.password = this.formRegistro.get('clave').value;
    usuario.confirm_password = this.formRegistro.get('repetirClave').value;
    usuario.id_rol = this.formRegistro.get('rol').value;
    usuario.estado = 1;
    this.servicio.registroUsuarios(usuario).subscribe(() => {
    });
    this.mostrarMensaje('Registrado correctamente', 'Registro');
    this.refrescar();
  }
}
