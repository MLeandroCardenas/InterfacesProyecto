import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitud-recuperacion',
  templateUrl: './solicitud-recuperacion.component.html',
  styleUrls: ['./solicitud-recuperacion.component.css']
})
export class SolicitudRecuperacionComponent implements OnInit {

  constructor() { }

  formRecuperacion = new FormGroup({
    clave : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    repetirClave : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  });

  ngOnInit() {
  }

}
