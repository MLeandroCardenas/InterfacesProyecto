import { Lectores } from './../../_model/Lectores';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZonasService } from './../../_services/zonas.service';
import { Zonas } from './../../_model/Zonas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Estado', 'acciones'];
  dataSource = new MatTableDataSource<Zonas>();

  @ViewChild(MatSort, { static : true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  formZonas: FormGroup;
  isVisible: boolean = false;
  isSaving: boolean;
  public arrayLectores: Lectores[];

  constructor(private servicio: ZonasService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listarZonas();
    this.iniciarFormulario();
    this.servicio.eventoLector.subscribe(() => {
      this.listarZonas();
    });
  }

  iniciarFormulario() {
    this.formZonas = this.formBuilder.group({
      id: ['', Validators.required],
      nombreZona: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      disponibles: [this.LectoresDisponibles()]
    });
  }

  habilitarZona(idZona: number) {
    this.servicio.habilitarZona(idZona).subscribe( data => {
      this.mostrarMensaje(data as string, 'Habilitar');
      this.listarZonas();
    });
  }

  deshabilitarZona(idZona: number) {
    this.servicio.deshabilitarZona(idZona).subscribe( data => {
      this.mostrarMensaje(data as string, 'Deshabilitar');
      this.listarZonas();
    });
  }

  LectoresDisponibles() {
    this.servicio.lectoresDisponibles().subscribe( data => {
      this.arrayLectores = data;
    });
  }

  listarZonas() {
    this.servicio.obtenerZonas().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  obtenerZona(idZona: number) {
    this.isSaving = false;
    this.servicio.obtenerZona(idZona).subscribe( data => {
      this.isVisible = true;
      this.formZonas.patchValue({
        id: data.id,
        nombreZona: data.nombre_zona,
        disponibles: this.LectoresDisponibles()
      });
    });
  }

  showForm() {
    this.iniciarFormulario();
    this.isSaving = true;
    this.isVisible = true;
  }

  hideForm() {
    this.isVisible = false;
  }

  operar() {
    let zona = new Zonas();
    zona.nombre_zona = this.formZonas.get('nombreZona').value;
    zona.estado = 1;
    zona.idLector = this.formZonas.get('disponibles').value;
    if (this.isSaving) {
      if (zona.idLector == null) {
        this.mostrarMensaje('lector es requerido', 'Advertencia');
      } else {
        this.servicio.guardarZona(zona).subscribe(data => {
          this.mostrarMensaje(data as string, 'Guardar');
          this.listarZonas();
          this.servicio.eventoZona.emit();
          this.hideForm();
        });
      }
    } else {
      zona.id = this.formZonas.get('id').value;
      this.servicio.editarZona(zona).subscribe(data => {
        this.mostrarMensaje(data as string, 'Editar');
        this.listarZonas();
        this.servicio.eventoZona.emit();
        this.hideForm();
      });
    }
  }

  mostrarMensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  applyFilter(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  get zona() {
    return this.formZonas.get('nombreZona');
  }

  get codigo() {
    return this.formZonas.get('numeroLector');
  }

  get lector() {
    return this.formZonas.get('disponibles');
  }

}
