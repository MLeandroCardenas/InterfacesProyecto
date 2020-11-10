import { ValidacionCorreoAsincronaDirective } from './../../_validaciones/validacion-correo-asincrona.directive';
import { ValidacionesCorreo } from './../../_validaciones/validaciones-correo';
import { Usuario } from './../../_model/Usuario';
import { AutenticacionService } from './../../_services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacionesClaves } from 'src/app/_validaciones/validaciones-claves';

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
        private validarCorreoUnico: ValidacionCorreoAsincronaDirective,
        private mensaje: MatSnackBar
      ) {}

  formRegistro: FormGroup;
  formatoDocumento: any = '[0-9]*';
  soloLetras: any = '[A-Z ]*';
  rolesApp: Roles[];
  resultado: any;

  iniciarFormuario() {
    this.formRegistro = this.formBuilder.group({

      apellidos: ['',
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(this.soloLetras)]
      ],

      nombres: ['',
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(this.soloLetras)]
      ],

      correo: ['', {
          validators: [Validators.required,
            Validators.email,
            // ValidacionesCorreo.validarServidorCorreo,
            Validators.minLength(5),
            Validators.maxLength(200)],

          asyncValidators: [this.validarCorreoUnico.validate.bind(this.validarCorreoUnico)],
          updateOn: 'blur'
        }],

        identificacion: ['', {
          validators: [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
            Validators.pattern(this.formatoDocumento)]
        }],

      clave: ['', [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          ValidacionesClaves.validarClave]
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
      rol: ''
    });
  }

  mostrarMensaje(men: string, action: string) {
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
      usuario.id_rol = this.formRegistro.get('rol').value;
      usuario.estado = 1;
      if (this.formRegistro.valid) {
        this.servicio.registroUsuarios(usuario).subscribe(data => {
          this.refrescar();
          this.mostrarMensaje(data as string, 'Mensaje');
        });
      } else {
        this.mostrarMensaje('Debe rellenar todos los campos', 'Advertencia');
      }
  }

  get apellidos() {
    return this.formRegistro.get('apellidos');
  }

  get nombres() {
    return this.formRegistro.get('nombres');
  }

  get correo() {
    return this.formRegistro.get('correo');
  }

  get identificacion() {
    return this.formRegistro.get('identificacion');
  }

  get clave() {
    return this.formRegistro.get('clave');
  }

  get rol() {
    return this.formRegistro.get('rol');
  }
}
