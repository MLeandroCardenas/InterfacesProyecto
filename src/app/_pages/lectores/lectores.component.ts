import { Zonas } from './../../_model/Zonas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZonasService } from './../../_services/zonas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Lectores } from './../../_model/Lectores';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lectores',
  templateUrl: './lectores.component.html',
  styleUrls: ['./lectores.component.css']
})
export class LectoresComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Codigo', 'Estado', 'Zona', 'Acciones'];
  dataSource = new MatTableDataSource<Lectores>();

  @ViewChild(MatSort, { static : true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  formLectores: FormGroup;
  isVisible: boolean = false;
  isSaving: boolean;
  campoZona: boolean = false;
  public arrayZonas: Zonas[];

  constructor(private servicio: ZonasService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit() {
    this.listarLectores();
    this.iniciarFormuario();
    this.servicio.eventoZona.subscribe(() => {
      this.listarLectores();
    });
  }

  iniciarFormuario() {
    this.campoZona = false;
    this.formLectores = this.formBuilder.group({

      id: [0, Validators.required],

      nombreModulo: ['',
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],

      codigoLector: ['',
      [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)
      ]],

      actual: [{value: '', disabled: true}],

      zona: [this.zonasDisponibles()],
    });
  }

  mostrarMensaje(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  listarLectores() {
    this.servicio.obtenerLectores().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  operar() {
    let lector = new Lectores();
    lector.nombre_modulo = this.formLectores.get('nombreModulo').value;
    lector.codigo_lector = this.formLectores.get('codigoLector').value;
    lector.estado = 1;
    lector.idZona = this.formLectores.get('zona').value;

    if (this.isSaving) {
      this.servicio.guardarLector(lector).subscribe(data => {
        this.mostrarMensaje(data as string, 'Guardar');
        this.servicio.eventoLector.emit();
        this.listarLectores();
      });
    } else {
      lector.id = this.formLectores.get('id').value;
      this.servicio.editarLector(lector).subscribe(data => {
        this.mostrarMensaje(data as string, 'Editar');
        this.servicio.eventoLector.emit();
        this.listarLectores();
      });
    }
     this.hideForm();
  }

  deshabilitarLector(id: number) {
    this.servicio.deshabilitarLector(id).subscribe( data => {
      this.mostrarMensaje(data as string, 'Deshabilitar');
      this.servicio.eventoLector.emit();
      this.listarLectores();
    });
  }

  habilitarLector(id: number) {
    this.servicio.habilitarLector(id).subscribe( data => {
      this.mostrarMensaje(data as string, 'Habilitar');
      this.servicio.eventoLector.emit();
      this.listarLectores();
    });
  }

  recargarFormulario(data: Lectores) {
    this.formLectores.patchValue({
      id: data.id,
      nombreModulo: data.nombre_modulo,
      codigoLector: data.codigo_lector,
      actual: data.nombre_zona,
      zona: this.zonasDisponibles()
    });
  }

  obtenerLector(id: number) {
    this.isVisible = true;
    this.isSaving  = false;
    this.campoZona = true;
    this.servicio.obtenerLector(id).subscribe( data => {
      this.recargarFormulario(data);
    });
  }

  zonasDisponibles() {
    this.servicio.zonasDisponibles().subscribe( data => {
      this.arrayZonas = data;
    });
  }
  showForm() {
    this.iniciarFormuario();
    this.isSaving = true;
    this.isVisible = true;
  }

  hideForm() {
    this.isVisible = false;
  }

   applyFilter(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  get nombreModulo() {
    return this.formLectores.get('nombreModulo');
  }

  get codigoLector() {
    return this.formLectores.get('codigoLector');
  }
}
