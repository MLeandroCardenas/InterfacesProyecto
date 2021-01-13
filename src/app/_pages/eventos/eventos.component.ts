import { Hora } from './../../_model/Hora';
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
  protected arrayZonas: Zonas[];
  protected categoriaEvento: categorias[] = [
    { valor: 'PUBLICA', nombre: 'Pública' },
    { valor: 'PRIVADA', nombre: 'Privada' },
    { valor: 'INSTITUCIONAL', nombre: 'Institucional' }
  ];
  public listaHoras: Hora[];
  public seleccion: number;
  public minDate = new Date();
  public maxDate = new Date();
  public listaFechas: Array<FechaEvento> = [];
  public isVisible: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private servicio: ZonasService,
    private servicioEventos: EventosService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.iniciarCalendario();
  }

  iniciarFormulario() {
    this.formEvento = this.formBuilder.group({
      evento: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.minLength(4), Validators.max(200)]],
      lugar: [this.zonasDisponibles(), Validators.required],
      nombreZona: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      categoriaEvento: [this.categoriaEvento, Validators.required],
      fecha: ['', Validators.required],
      horarios: [null]
    });
  }

  iniciarCalendario() {
    const DIAS: number = 31;
    this.minDate.getDate();
    this.maxDate.setDate(this.minDate.getDate() + DIAS);
    this.maxDate.getDate();
  }

  mostrarMensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  capturarFechaEvento() {
    let fechaActual = new Date();
    let fechaEscojida = new Date(this.fechaEvento.value);
    if (fechaActual.toLocaleDateString() === fechaEscojida.toLocaleDateString())
      this.cargarHoras(fechaActual.getHours());
    else
      this.cargarHoras();
  }

  cargarHoras(horaActual?: number) {
    this.servicioEventos.obtenerHoras(horaActual).subscribe(data => {
      if (data == null)
        this.mostrarMensaje('No hay horas disponibles', 'Advertencia');
      else {
        this.listaHoras = data;
        this.isVisible = true;
      }
    });
  }

  zonasDisponibles() {
    this.servicio.zonasDisponibles().subscribe(data => {
      this.arrayZonas = data;
    });
  }

  capturarSeleccion(evento: number) {
    this.seleccion = evento;
  }

  refrescar() {
    this.formEvento.patchValue({
      evento: '',
      descripcion: '',
      lugar: this.zonasDisponibles(),
      nombreZona: '',
      categoriaEvento: this.categoriaEvento,
      fecha: '',
      horaInicio: '',
      horaFin: ''
    });
  }

  eliminarFecha(indice: number) {
    this.listaFechas.splice(indice, 1);
  }

  agregarFechas() {
    if (this.fechaEvento.value == null)
      this.mostrarMensaje('Fecha del evento obligatoria', 'Advertencia');
    else {
      let horario = new FechaEvento();
      let fecha = new Date(this.fechaEvento.value);
      horario.fecha = fecha.toLocaleDateString();

      if(this.listaFechas.length == 0)
        this.listaFechas.push(horario);
    }
  }

  setearValores(valor: string) {
    let evento = new Eventos();
    evento.nombre_evento = this.formEvento.get('evento').value;
    evento.descripcion = this.formEvento.get('descripcion').value;
    evento.zona = valor;
    evento.visibilidad = this.formEvento.get('categoriaEvento').value;
    if (this.listaFechas.length == 0)
      this.mostrarMensaje('Debe agregar una fecha al evento', 'Advertencia');
    else {
      let horarios = JSON.stringify(this.listaFechas);
      evento.horario = horarios;
      this.servicioEventos.registrarEvento(evento).subscribe(data => {
        this.refrescar();
        this.mostrarMensaje(data as string, 'Mensaje');
        this.listaFechas = [];
      });
    }
  }
  
  registrarEvento() {
    if (this.formEvento.valid) {
      if (this.seleccion == 0)
        this.setearValores(this.formEvento.get('nombreZona').value);
      else
        this.setearValores(this.formEvento.get('lugar').value);
    } else
      this.mostrarMensaje('Debe rellenar todos los campos', 'Advertencia');
  }
  
  get fechaEvento(){
    return this.formEvento.get('fecha');
  }
}



