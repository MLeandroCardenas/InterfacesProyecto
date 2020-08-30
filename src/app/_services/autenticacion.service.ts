import { Usuario } from './../_model/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url: string = `${environment.HOST}v1`;

  constructor(private http: HttpClient) { }

  registroUsuarios(usuarios: Usuario) {
    return this.http.post(`${this.url}/registro`, usuarios);
  }
  

  solicitarRecuperacion(correo: string) {
    return this.http.patch(`${this.url}/solicitud`, correo);
  }
}
