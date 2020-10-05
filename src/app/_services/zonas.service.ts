import { Lectores } from './../_model/Lectores';
import { Zonas } from './../_model/Zonas';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  url: string = `${environment.HOST}v1`;
  eventoLector = new EventEmitter<void>();
  eventoZona = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  obtenerZonas() {
    return this.http.get<Zonas[]>(`${this.url}/zonas`);
  }

  obtenerLectores() {
    return this.http.get<Lectores[]>(`${this.url}/lectores`);
  }

  obtenerZona(idZona: number) {
    return this.http.get<Zonas>(`${this.url}/zonas/${idZona}`);
  }

  obtenerLector(idLector: number) {
    return this.http.get<Lectores>(`${this.url}/lectores/${idLector}`);
  }

  lectoresDisponibles() {
    return this.http.get<Lectores[]>(`${this.url}/lectoresdisponibles`);
  }

  zonasDisponibles() {
    return this.http.get<Zonas[]>(`${this.url}/habilitadas`);
  }

  guardarZona(zona: Zonas) {
    return this.http.post(`${this.url}/zonas`, zona);
  }

  guardarLector(lector: Lectores) {
    return this.http.post(`${this.url}/lectores`, lector);
  }

  deshabilitarLector(idLector: number) {
    return this.http.patch(`${this.url}/lectores/${idLector}`, idLector);
  }

  deshabilitarZona(idZona: number) {
    return this.http.patch(`${this.url}/zonas/${idZona}`, idZona);
  }

  habilitarLector(idLector: number) {
    return this.http.patch(`${this.url}/habilitarlector/${idLector}`, idLector);
  }

  habilitarZona(idZona: number) {
    return this.http.patch(`${this.url}/habilitarzona/${idZona}`, idZona);
  }

  editarZona(zona: Zonas) {
    return this.http.put(`${this.url}/zonas`, zona);
  }

  editarLector(lector: Lectores) {
    return this.http.put(`${this.url}/lectores`, lector);
  }
}
