import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AutenticacionService } from 'src/app/_services/autenticacion.service';

@Component({
  selector: 'app-dialogo-solicitud-recuperacion',
  templateUrl: './dialogo-solicitud-recuperacion.component.html',
  styleUrls: ['./dialogo-solicitud-recuperacion.component.css']
})
export class DialogoSolicitudRecuperacionComponent implements OnInit {

  constructor(private servicio: AutenticacionService,
              private mensaje: MatSnackBar,
              public dialogRef: MatDialogRef<DialogoSolicitudRecuperacionComponent>) { }

  formRecuperacion: FormGroup;

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formRecuperacion = new FormGroup({
      correo : new  FormControl('',
    [
      Validators.email,
      Validators.required,
      Validators.maxLength(200)
    ])
    });
  }

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviar() {
    if (!this.formRecuperacion.valid) {
      this.mostrarMensaje('Debe digitar el correo electrónico', 'Advertencia');
    } else {
      let correo = this.formRecuperacion.get('correo').value;
      this.servicio.solicitarRecuperacion(correo).subscribe(data => {
        this.mostrarMensaje(data as string, 'Mensaje');
      });
    }
  }

}
