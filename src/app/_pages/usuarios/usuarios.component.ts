import { UsuariosService } from './../../_services/usuarios.service';
import { Usuario } from './../../_model/Usuario';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['Apellidos', 'Nombres', 'Identificacion', 'Rol', 'Estado', 'Acciones'];
  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatSort, { static : true }) sort: MatSort;

  public cantidad: number = 5;

  constructor(private servicio: UsuariosService) { }

  ngOnInit() {
    this.cargarInfo(this.cantidad);
  }

  applyFilter(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  cambioPagina(e: any) {
    this.cargarInfo(e.pageSize);
  }

  cargarInfo(total: number) {
    this.servicio.todos(total).subscribe(data => {
      this.cantidad = data.total;
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.sort = this.sort;
    });
  }

  habilitarUsuario(idUsuario: number) {
  }

  deshabilitarUsuario(idUsuario: number) {
  }
}
