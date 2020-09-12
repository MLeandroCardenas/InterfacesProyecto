import { Usuario } from './../../_model/Usuario';
import { AutenticacionService } from './../../_services/autenticacion.service';
import { ValidacionesCorreo } from './../../_validaciones/validaciones-correo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VistaDialogoRecuperacionComponent } from './../vista-dialogo-recuperacion/vista-dialogo-recuperacion.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  /**
   * se inyecta el servicio en el constructor y ahora se pueden llamar los metodos
   */
  constructor(
    private dialog: MatDialog,
    private servicio: AutenticacionService,
    private mensaje: MatSnackBar,
    private router: Router) { }

  formLogin: FormGroup;

  dialogoRecuperacion(): void {
    const dialogRef = this.dialog.open(VistaDialogoRecuperacionComponent, {
      width: '400px',
    });
  }

  iniciarFormulario() {
    this.formLogin = new FormGroup({
      correo : new  FormControl('',
      [
        Validators.email,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200),
        ValidacionesCorreo.validarServidorCorreo
      ]),

      clave : new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }

  login() {
     let usuario = new Usuario();
     usuario.username = this.formLogin.get('correo').value;
     usuario.password = this.formLogin.get('clave').value;
      // tslint:disable-next-line: align
      this.servicio.loginToken(usuario).subscribe( data  => {
        sessionStorage.setItem(environment.LLAVE_TOKEN, data.access_token);
        sessionStorage.setItem(environment.LLAVE_REFRESH_TOKEN, data.refresh_token);
      });
  }

  get correo() {
    return this.formLogin.get('correo');
  }

  get clave() {
    return this.formLogin.get('clave');
  }
}
