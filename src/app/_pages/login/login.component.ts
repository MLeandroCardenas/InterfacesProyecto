import { VistaDialogoRecuperacionComponent } from './../vista-dialogo-recuperacion/vista-dialogo-recuperacion.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  /**
   * se inyecta el servicio en el constructor y ahora se pueden llamar los metodos
   */
  constructor(private dialog: MatDialog) { }

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
        Validators.maxLength(200)
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

}
