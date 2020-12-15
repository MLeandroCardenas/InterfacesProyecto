import { ZonasService } from './../../_services/zonas.service';
import { Zonas } from './../../_model/Zonas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public formEvento: FormGroup;
  public arrayZonas: Zonas[];
  public seleccion: number;

  constructor(private formBuilder: FormBuilder, private servicio: ZonasService) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.formEvento = this.formBuilder.group({
      evento:['', Validators.required],
      descripcion:['',Validators.required],
      lugar:[this.zonasDisponibles(), Validators.required],
      nombreZona: ['', Validators.required]
    });
  }

  zonasDisponibles(){
    this.servicio.zonasDisponibles().subscribe(data => {
      this.arrayZonas = data;
    });
  }

  capturarSeleccion(evento: number){
    this.seleccion = evento;
  }

  registrarEvento(){}

}
