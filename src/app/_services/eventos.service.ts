import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Eventos } from '../_model/Eventos';


@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url: string = `${environment.HOST}v1`;

  constructor(private http: HttpClient) { }

  registrarEvento(evento: Eventos) {
    return this.http.post(`${this.url}/eventos`, evento);
  }
  
}
