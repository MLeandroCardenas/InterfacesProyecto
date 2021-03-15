import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Eventos } from 'src/app/_model/Eventos';
import { EventosService } from 'src/app/_services/eventos.service';
import { DialogoDescripcionEventoComponent } from '../../eventos/dialogo-descripcion-evento/dialogo-descripcion-evento.component';
import { DialogoHorariosEventoComponent } from '../../eventos/dialogo-horarios-evento/dialogo-horarios-evento.component';

@Component({
  selector: 'app-eventos-registrados',
  templateUrl: './eventos-registrados.component.html',
  styleUrls: ['./eventos-registrados.component.css']
})
export class EventosRegistradosComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'rol','evento', 'lugar', 'visibilidad', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Eventos>();
  @ViewChild(MatSort, { static : true }) sort: MatSort;
  cantidad: number = 5;
  
  constructor(private servicio: EventosService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargarInfo(this.cantidad);
  }

  cargarInfo(total: number) {
    this.servicio.obtenerTodos(total).subscribe(data => {
        this.cantidad = data.total;
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
    });
  }

  descripcionEvento(descripcion: string){
    const dialogRef = this.dialog.open(DialogoDescripcionEventoComponent, {
      width: '400px',
      data: descripcion
    });
  }

  horarioEvento(horario: string){
    const dialogRef = this.dialog.open(DialogoHorariosEventoComponent, {
      width: '400px',
      data: horario
    });
  }

  aprobarEvento(idEvento: number){
    let confirmacion = confirm('¿Esta seguro que desea aprobar el evento?');
    if(confirmacion){
      this.servicio.aprobarEvento(idEvento).subscribe(data => {
        this.mostrarMensaje(data as string, 'Mensaje');
        this.cargarInfo(this.cantidad);
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

  cambioPagina(e: any) {
    this.cargarInfo(e.pageSize);
  }

}
