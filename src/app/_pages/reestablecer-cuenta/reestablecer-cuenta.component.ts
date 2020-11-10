import { AutenticacionService } from 'src/app/_services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ValidacionesClaves } from 'src/app/_validaciones/validaciones-claves';
import { MatSnackBar } from '@angular/material';
import { RecuperacionCuenta } from 'src/app/_model/RecuperacionCuenta';

@Component({
  selector: 'app-reestablecer-cuenta',
  templateUrl: './reestablecer-cuenta.component.html',
  styleUrls: ['./reestablecer-cuenta.component.css']
})
export class ReestablecerCuentaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private servicio: AutenticacionService,
              private mensaje: MatSnackBar) { }

  private token: string;
  formRecuperacion: FormGroup;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
    this.servicio.validarTokenRecuperacionCuenta(this.token).subscribe(data => {
      this.mostrarMensaje(data as string, 'Mensaje');
    });
    this.iniciarFormualario();
  }

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }

  iniciarFormualario() {
    this.formRecuperacion = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(200)]),
      clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), ValidacionesClaves.validarClave])
    });
  }

  reestablecer() {
    let cuenta = new RecuperacionCuenta();
    cuenta.correo = this.formRecuperacion.get('email').value;
    cuenta.clave = this.formRecuperacion.get('clave').value;
    cuenta.token = this.token;
    this.servicio.recuperarCuentaUsuario(cuenta).subscribe(data => {
      this.mostrarMensaje(data as string, 'Mensaje');
    });
  }

  get email() {
    return this.formRecuperacion.get('email');
  }

  get clave() {
    return this.formRecuperacion.get('clave');
  }
}
