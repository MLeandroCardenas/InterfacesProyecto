import { AutenticacionService } from './../../_services/autenticacion.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vista-dialogo-recuperacion',
  templateUrl: './vista-dialogo-recuperacion.component.html',
  styleUrls: ['./vista-dialogo-recuperacion.component.css']
})
export class VistaDialogoRecuperacionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VistaDialogoRecuperacionComponent>,
    private servicio: AutenticacionService) { }

    formRecuperacion = new FormGroup({
      correo : new  FormControl('',
    [
      Validators.email,
      Validators.required,
      Validators.maxLength(200)
    ])
    });

    onNoClick(): void {
      this.dialogRef.close();
    }

    enviar() {
      this.servicio.solicitarRecuperacion(this.formRecuperacion.controls.correo.value).subscribe();
    }

  ngOnInit() {
  }

}
