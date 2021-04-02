import { Hora } from './../../_model/Hora';
import { EventosService } from './../../_services/eventos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FechaEvento } from './../../_model/FechaEvento';
import { ZonasService } from './../../_services/zonas.service';
import { Zonas } from './../../_model/Zonas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Eventos } from 'src/app/_model/Eventos';
import { forkJoin } from 'rxjs';

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

  formEvento: FormGroup;
  protected arrayZonas: Zonas[];
  protected categoriaEvento: categorias[] = [
    { valor: 'PUBLICA', nombre: 'Pública' },
    { valor: 'PRIVADA', nombre: 'Privada' },
    { valor: 'INSTITUCIONAL', nombre: 'Institucional' }
  ];
  listaHoras: Hora[];
  listaFechas: FechaEvento[] = [];
  arrayHoras: string[] = [];
  seleccion: number;
  minDate = new Date();
  maxDate = new Date();
  isVisible: boolean = false;
  horaSeleccionada:string = null;
  archivo:File;

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
      categoriaEvento: [this.categoriaEvento, Validators.required],
      fecha: ['', Validators.required]
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
    this.listaFechas = [];
    this.arrayHoras = [];
  }

  eliminarFecha(indice: number) {
    this.listaFechas.splice(indice, 1);
  }

  eliminarHora(indice: number) {
    this.arrayHoras.splice(indice, 1);
  }

  capturarHoraSeleccionada(e: any){
    this.horaSeleccionada = e.value.hora;
  }

  guardarhoras() {
    let confirmacion = confirm('¿Desea guardar este horario?');
    if (confirmacion) {
      let fecha = new Date(this.fechaEvento.value).toLocaleDateString();
      if (this.listaFechas.find(i => i.fecha === fecha))
        this.mostrarMensaje('Debe eliminar la fecha y agregar nuevamente el horario', 'Advertencia');
      else {
        let evento = new FechaEvento();
        evento.fecha = fecha;
        evento.hora = this.arrayHoras.slice();
        this.listaFechas.push(evento);
        this.arrayHoras = [];
      }
    }
  }

  agregarFechas() {
    if (this.fechaEvento.value == null)
      this.mostrarMensaje('Fecha del evento obligatoria', 'Advertencia');
    else {
      if(this.arrayHoras.find(i=> i === this.horaSeleccionada))
        this.mostrarMensaje('Ya existe', 'Advertencia');
      else
        this.arrayHoras.push(this.horaSeleccionada);
    }
  }

  cargarArchivo(event: any){
    let img = event.target;
    if(img.files.length > 0)
      this.archivo = img.files[0];
  }
  
  setearValores(valor: string) {
    if (this.listaFechas.length == 0)
      this.mostrarMensaje('Debe agregar una fecha al evento', 'Advertencia');
    else {
      let confirmacion = confirm('¿Desea registrar el evento?');
      if(confirmacion){
        let evento = new Eventos();
        let horarios = JSON.stringify(this.listaFechas);
        evento.zona = valor;
        evento.nombre_evento = this.formEvento.get('evento').value;
        evento.descripcion = this.formEvento.get('descripcion').value;
        evento.visibilidad = this.formEvento.get('categoriaEvento').value;
        evento.horario = horarios;
        if(this.archivo !== undefined){
          let form = new FormData();
          form.append('certificado',this.archivo);
          this.servicioEventos.registrarEvento(evento).subscribe(data => {
            this.refrescar();
            this.servicioEventos.refrescarTabla.next(5);
            this.servicioEventos.subirCertificado(data,form).subscribe(()=>{
              this.mostrarMensaje('Evento registrado exitosamente', 'Mensaje');
            });
          });
        } else {
          this.servicioEventos.registrarEvento(evento).subscribe(() => {
            this.refrescar();
            this.servicioEventos.refrescarTabla.next(5);
            this.mostrarMensaje('Evento registrado exitosamente', 'Mensaje');
          });
        }
      } 
    }
  }
  
  registrarEvento() {
    if (this.formEvento.valid) {
        this.setearValores(this.formEvento.get('lugar').value);
    } else
      this.mostrarMensaje('Debe rellenar todos los campos', 'Advertencia');
  }
  
  get fechaEvento(){
    return this.formEvento.get('fecha');
  }
}



