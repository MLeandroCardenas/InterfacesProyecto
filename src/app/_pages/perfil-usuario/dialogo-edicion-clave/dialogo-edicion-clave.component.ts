import { Clave } from '../../../_model/Clave';
import { UsuariosService } from '../../../_services/usuarios.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ValidacionesClaves } from 'src/app/_validaciones/validaciones-claves';

@Component({
  selector: 'app-dialogo-edicion-clave',
  templateUrl: './dialogo-edicion-clave.component.html',
  styleUrls: ['./dialogo-edicion-clave.component.css']
})
export class DialogoEdicionClaveComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoEdicionClaveComponent>,
              private mensaje: MatSnackBar,
              private servicio: UsuariosService) { }

  ngOnInit() {
  }

  formEdicionClave = new FormGroup({
    actual: new FormControl('',
      [
        Validators.required
      ]),
    nueva: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        ValidacionesClaves.validarClave
      ])
  });

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 2000,
    });
  }

  enviar() {
    if (!this.formEdicionClave.valid) {
      this.mostrarMensaje('Debe rellenar todos los campos', 'Advertencia');
    } else {
      let clave = new Clave();
      clave.actual = this.formEdicionClave.get('actual').value;
      clave.nueva = this.formEdicionClave.get('nueva').value;
      this.servicio.editarClave(clave).subscribe( data => {
        this.mostrarMensaje(data as string, 'Mensaje');
        this.dialogRef.close();
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get actual() {
    return this.formEdicionClave.get('actual');
  }

  get nueva() {
    return this.formEdicionClave.get('nueva');
  }

}
