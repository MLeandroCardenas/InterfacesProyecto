import { Usuario } from './../_model/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url: string = `${environment.HOST}v1`;
  urlAutenticacion: string = environment.AUTH;

  constructor(private http: HttpClient) { }

  registroUsuarios(usuarios: Usuario) {
    return this.http.post(`${this.url}/registro`, usuarios);
  }

  solicitarRecuperacion(correo: string) {
    return this.http.patch(`${this.url}/solicitud`, correo);
  }

  obtenerCorreoRegistrado(correo: string): Observable<string> {
    return this.http.get<string>(`${this.url}/consultacorreo/${correo}`);
  }

  loginToken(usuarioLogeado: Usuario): Observable<any> {
    let datos = {
      'username': usuarioLogeado.username,
      'password': usuarioLogeado.password,
      'grant_type': 'password',
      'client_id': 2,
      'client_secret': 'VT3KzMIQFxt4DBPX5HbKxAnvfT4BQStBY64XsKRh'
    };
    return this.http.post<any>(this.urlAutenticacion, datos);
  }

  refreshToken(nuevoToken: string): Observable<any> {
    let datos = {
      'client_id': 2,
      'client_secret': 'VT3KzMIQFxt4DBPX5HbKxAnvfT4BQStBY64XsKRh',
      'grant_type': 'refresh_token',
      'refresh_token': nuevoToken
    };
    return this.http.post<any>(this.urlAutenticacion, datos);
  }

  rolUsuarioAutenticado() {
    return this.http.get(`${this.url}/autenticado`);
  }
}
