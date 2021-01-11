import { ValidacionesHoraFin } from './../../_validaciones/Validaciones-HoraFin';
import { ValidacionesHoraInicio } from './../../_validaciones/validaciones-horaInicio';
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

  iniciarFormulario(){
    this.formEvento = this.formBuilder.group({
      evento:['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      descripcion:['',[Validators.required, Validators.minLength(4), Validators.max(200)]],
      lugar:[this.zonasDisponibles(), Validators.required],
      nombreZona: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      categoriaEvento: [this.categoriaEvento, Validators.required],
      fecha: [ '', Validators.required],
      horaInicio: [{ value: null, disabled: true },
      [
        Validators.required,
        ValidacionesHoraInicio.validarMinimoHoraInicio,
        ValidacionesHoraInicio.validarMaximoHoraInicio,
      ]
      ],
      horaFin: [{ value: null, disabled: true },
      [
        Validators.required,
        ValidacionesHoraFin.validarMinimoHoraFin,
        ValidacionesHoraFin.validarMaximoHoraFin
      ]
      ]
    });
  }

  iniciarCalendario() {
    const DIAS: number = 31;
    this.minDate.getDate();
    this.maxDate.setDate(this.minDate.getDate() + DIAS);
    this.maxDate.getDate();
  }

  mostrarMensaje(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  minimoHoraInicioMismoDia(): boolean {
    let fechaActual = new Date();
    let fechaEscojida = new Date(this.fechaEvento.value);
    if(fechaActual.toLocaleDateString() === fechaEscojida.toLocaleDateString()) {
      let valorHora: number = parseInt(this.horaInicio.value.substr(0,2));
      let valorMinuto: number = parseInt(this.horaInicio.value.substr(3,2));
      if(valorHora <= fechaActual.getHours() + 2 && valorMinuto < fechaActual.getMinutes()) {
        this.mostrarMensaje('la hora de inicio debe ser minimo 2 horas despues a la hora actual', 'Advertencia');
        return false;
      }
    }
    return true;
  }

  minimoHoraFinMismoDia() {
    let fechaActual = new Date();
    let fechaEscojida = new Date(this.fechaEvento.value);
    if(fechaActual.toLocaleDateString() === fechaEscojida.toLocaleDateString()) {
      let valorHoraMinimo: number = parseInt(this.horaInicio.value.substr(0,2) + 1);
      let valorMinutosMinimos: number = parseInt(this.horaInicio.value.substr(3,2));
      if(valorHoraMinimo <= parseInt(this.horaInicio.value.substr(0,2)) && valorMinutosMinimos < parseInt(this.horaInicio.value.substr(3,2))) {
        this.mostrarMensaje('la hora de finalizacion debe ser minimo 1 hora despues a la hora de inicio', 'Advertencia');
        this.horaFin.setValue(null);
      } 
    }
  }


  zonasDisponibles(){
    this.servicio.zonasDisponibles().subscribe(data => {
      this.arrayZonas = data;
    });
  }

  capturarSeleccion(evento: number){
    this.seleccion = evento;
  }


  capturarFechaEvento(){
    this.horaInicio.enable();
  }

  habilitarHoraFin(){
    if(this.minimoHoraInicioMismoDia())
      this.horaFin.enable();
    else
      this.horaFin.disable();
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

  eliminarFecha(indice: number){
    this.listaFechas.splice(indice,1);
  }

  validarFecha(datos:FechaEvento): boolean {
    for (const key in this.listaFechas) {
      if (datos.fecha === this.listaFechas[key].fecha && datos.inicio === this.listaFechas[key].inicio && datos.fin === this.listaFechas[key].fin) {
        this.mostrarMensaje('Ya existe', 'Advertencia');
        return false;
      }
    }
    return true;
  }

  agregarFechas() {
    if (this.horaInicio.invalid || this.horaFin.invalid)
      this.mostrarMensaje('Debe llenar todos los campos correctamente', 'Advertencia')
    else {
      if (this.horaInicio.value == null)
        this.mostrarMensaje('Hora inicio es obligatoria', 'Advertencia');
      else if (this.horaFin.value == null)
        this.mostrarMensaje('Hora fin es obligatoria', 'Advertencia');
      else if (this.fechaEvento.value == null)
        this.mostrarMensaje('Fecha del evento obligatoria', 'Advertencia');
      else {
        let horario = new FechaEvento();
        let fecha = new Date(this.fechaEvento.value);
        horario.fecha = fecha.toLocaleDateString();
        horario.inicio = this.horaInicio.value;
        horario.fin = this.horaFin.value;

        if (this.listaFechas.length == 0)
          this.listaFechas.push(horario);
        else {
          if (this.validarFecha(horario))
            this.listaFechas.push(horario);
        }
      }
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
    } else {
      this.mostrarMensaje('Debe rellenar todos los campos', 'Advertencia');
    }
  }

  get horaInicio(){
    return this.formEvento.get('horaInicio');
  }

  get horaFin(){
    return this.formEvento.get('horaFin');
  }

  get fechaEvento(){
    return this.formEvento.get('fecha');
  }
}
