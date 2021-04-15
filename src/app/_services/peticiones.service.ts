import { Notificaciones } from './../_model/Notificaciones';
import { TipoPeticion } from './../_model/TipoPeticion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  url: string = `${environment.HOST}v1`;
  constructor(private http: HttpClient) { }

  obtenerTiposPeticiones(){
    return this.http.get<TipoPeticion[]>(`${this.url}/tipos`);
  }

  registrarPeticion(notificacion: Notificaciones){
    return this.http.post(`${this.url}/peticiones`, notificacion);
  }

}
