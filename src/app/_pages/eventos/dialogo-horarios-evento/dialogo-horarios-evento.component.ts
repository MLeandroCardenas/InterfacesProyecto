import { FechaEvento } from '../../../_model/FechaEvento';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-horarios-evento',
  templateUrl: './dialogo-horarios-evento.component.html',
  styleUrls: ['./dialogo-horarios-evento.component.css']
})
export class DialogoHorariosEventoComponent implements OnInit {

  listaHorario: FechaEvento[] = [];

  constructor(public dialogRef: MatDialogRef<DialogoHorariosEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    debugger;
    let objHorario: FechaEvento;
    objHorario = JSON.parse(this.data);
    let fecha = objHorario.fecha;
    let hora = objHorario.hora;
    console.log(objHorario);
  }

}
