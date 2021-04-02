import { Hora } from './../_model/Hora';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Eventos } from '../_model/Eventos';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url: string = `${environment.HOST}v1`;
  refrescarTabla = new Subject<number>();

  constructor(private http: HttpClient) { }

  obtenerHoras(HoraSeleccionada?:number) {
    return this.http.get<Hora[]>(`${this.url}/horas/${HoraSeleccionada}`);
  }

  registrarEvento(evento: Eventos) {
    return this.http.post(`${this.url}/eventos`, evento);
  }

  subirCertificado(idEvento: any, archivo:any) {
    return this.http.post(`${this.url}/certificados/${idEvento}`, archivo);
  }

  visualizarCertificado(nombre:string){
    return this.http.get<any>(`${this.url}/certificado/${nombre}`);
  }

  obtenerEventosUsuario(cantidad: number) {
    return this.http.get<any>(`${this.url}/eventos/${cantidad}`);
  }

  obtenerTodos(cantidad: number) {
    return this.http.get<any>(`${this.url}/todos/${cantidad}`);
  }

  aprobarEvento(idEvento: number){
    return this.http.put(`${this.url}/eventos/${idEvento}`, idEvento);
  }

  desaprobarEvento(idEvento: number){
    return this.http.put(`${this.url}/desaprobar/${idEvento}`, idEvento);
  }
  
}
