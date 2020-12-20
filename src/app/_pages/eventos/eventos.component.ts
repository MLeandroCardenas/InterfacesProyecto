import { EventosService } from './../../_services/eventos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FechaEvento } from './../../_model/FechaEvento';
import { ZonasService } from './../../_services/zonas.service';
import { Zonas } from './../../_model/Zonas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Eventos } from 'src/app/_model/Eventos';

export interface categorias {
  valor: string;
  nombre: string;
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  

  public formEvento: FormGroup;
  public arrayZonas: Zonas[];
  public categoriaEvento: categorias[] = [
    {valor: 'PUBLICA', nombre: 'Pública'},
    {valor: 'PRIVADA', nombre: 'Privada'},
    {valor: 'INSTITUCIONAL', nombre: 'Institucional'}
  ];
  public seleccion: number;
  public minDate = new Date();
  public maxDate = new Date();
  public listaFechas: Array<FechaEvento> = [];

  constructor(private formBuilder: FormBuilder,
              private servicio: ZonasService,
              private servicioEventos: EventosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.iniciarCalendario();
  }

  iniciarCalendario() {
    const DIAS: number = 31;
    this.minDate.getDate();
    this.maxDate.setDate(this.minDate.getDate() + DIAS);
    this.maxDate.getDate();
  }

  iniciarFormulario(){
    this.formEvento = this.formBuilder.group({
      evento:['', Validators.required],
      descripcion:['',Validators.required],
      lugar:[this.zonasDisponibles(), Validators.required],
      nombreZona: [''],
      categoriaEvento: [this.categoriaEvento, Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    });
  }

  refrescar(){
    this.formEvento.patchValue({
      evento: '',
      descripcion: '',
      lugar: this.zonasDisponibles(),
      nombreZona: '',
      categoriaEvento: this.categoriaEvento,
      fecha: '',
      horaInicio:'',
      horaFin:''
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

  agregarFechas(){
    let fecha = new FechaEvento();
    fecha.fecha = this.formEvento.get('fecha').value;
    fecha.inicio = this.formEvento.get('horaInicio').value;
    fecha.fin = this.formEvento.get('horaFin').value;
    this.listaFechas.push(fecha);
    this.mostrarMensaje('Agregada correctamente', 'Mensaje');
    console.log(this.listaFechas);
  }

  mostrarMensaje(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setearValores(valor: string) {
    let evento = new Eventos();
    evento.nombre_evento = this.formEvento.get('evento').value;
    evento.descripcion = this.formEvento.get('descripcion').value;
    evento.zona = valor;
    evento.visibilidad = this.formEvento.get('categoriaEvento').value;
    let horarios = JSON.stringify(this.listaFechas);
    evento.horario = horarios;
    this.servicioEventos.registrarEvento(evento).subscribe( data => {
      this.refrescar();
      this.mostrarMensaje(data as string, 'Mensaje');
      this.listaFechas = [];
    });
  }

  registrarEvento() {
    if (this.formEvento.valid) {
      if (this.seleccion == 0)
        this.setearValores(this.formEvento.get('nombreZona').value);
      else
        this.setearValores(this.formEvento.get('lugar').value);
    } else {
      this.mostrarMensaje('Debe rellenar todos los campos', 'Advertencia');
    }
  }

}
