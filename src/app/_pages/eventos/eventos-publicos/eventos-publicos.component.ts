import { Eventos } from '../../../_model/Eventos';
import { EventosService } from '../../../_services/eventos.service';
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

  cambioPagina(evento: string){}

  constructor(private servicio: EventosService) { }

  ngOnInit() {
  }
}
