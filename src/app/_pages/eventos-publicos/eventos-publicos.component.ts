import { Eventos } from './../../_model/Eventos';
import { EventosService } from './../../_services/eventos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-eventos-publicos',
  templateUrl: './eventos-publicos.component.html',
  styleUrls: ['./eventos-publicos.component.css']
})

export class EventosPublicosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'zona', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Eventos>();
  cantidad: number = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private servicio: EventosService) { }

  ngOnInit() {
    this.listarInfo(0, 10);
  }

  cambioPagina(e: any) {
    console.log('pagina' +  e);
    this.listarInfo(e.pageIndex, e.pageSize);
  }

  listarInfo(page: number, size: number) {
    this.servicio.listarPublicos(page, size).subscribe( data => {
      console.log(data);
      console.log(data.content);
      console.log(data.totalElements);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.cantidad = data.totalElements;
      //this.dataSource.paginator = this.paginator;
    });
  }
}
