import { AutenticacionService } from './../../_services/autenticacion.service';
import { ValidacionesCorreo } from './../../_validaciones/validaciones-correo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogoSolicitudRecuperacionComponent } from '../dialogo-solicitud-recuperacion/dialogo-solicitud-recuperacion.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  /**
   * se inyecta el servicio en el constructor y ahora se pueden llamar los metodos
   */
  constructor(private servicio: AutenticacionService,
              private mensaje: MatSnackBar,
              private dialog: MatDialog) { }

  formLogin: FormGroup;

  iniciarFormulario() {
    this.formLogin = new FormGroup({
      correo: new FormControl('',
        [
          Validators.email,
          Validators.required,
          Validators.minLength(5),
          //ValidacionesCorreo.validarServidorCorreo,
          Validators.maxLength(200)
        ]),

      clave: new FormControl('',
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

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(DialogoSolicitudRecuperacionComponent, {
      width: '400px',
    });
  }

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }

  login() {
    let email = this.formLogin.get('correo').value;
    let password = this.formLogin.get('clave').value;
    this.servicio.loginToken(email, password).subscribe(data => {
      this.servicio.guardarAuth(data);
    });
  }

  get correo() {
    return this.formLogin.get('correo');
  }

  get clave() {
    return this.formLogin.get('clave');
  }
}
