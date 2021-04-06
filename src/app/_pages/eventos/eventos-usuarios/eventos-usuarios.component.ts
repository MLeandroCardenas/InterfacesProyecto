import { Eventos } from '../../../_model/Eventos';
import { EventosService } from '../../../_services/eventos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { DialogoDescripcionEventoComponent } from '../dialogo-descripcion-evento/dialogo-descripcion-evento.component';
import { DialogoHorariosEventoComponent } from '../dialogo-horarios-evento/dialogo-horarios-evento.component';

@Component({
  selector: 'app-eventos-usuarios',
  templateUrl: './eventos-usuarios.component.html',
  styleUrls: ['./eventos-usuarios.component.css']
})
export class EventosUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['Evento', 'Lugar', 'Visibilidad', 'Estado', 'Acciones'];
  dataSource = new MatTableDataSource<Eventos>();
  @ViewChild(MatSort, { static : true }) sort: MatSort;

  cantidad: number = 5;
  pathArchivo: any;
  
  constructor(private servicio: EventosService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargarInfo(this.cantidad);
    this.servicio.refrescarTabla.subscribe( data => {
      this.cargarInfo(data);
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

  cargarInfo(total: number) {
    this.servicio.obtenerEventosUsuario(total).subscribe(data => {
      if(data === null)
        this.mostrarMensaje('No hay eventos', 'Advertencia');
      else {
        this.cantidad = data.total;
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
      }
    });
  }

  obtenerCertificado(nombre: string){
   this.servicio.visualizarCertificado(nombre).subscribe(data=>{
     window.open(data, '_blank');
   });
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
