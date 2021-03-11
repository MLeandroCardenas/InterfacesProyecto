import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-descripcion-evento',
  templateUrl: './dialogo-descripcion-evento.component.html',
  styleUrls: ['./dialogo-descripcion-evento.component.css']
})
export class DialogoDescripcionEventoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoDescripcionEventoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}
