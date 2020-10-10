import { PerfilUsuario } from './../_model/PerfilUsuario';
import { Router } from '@angular/router';
import { Autenticacion } from './../_model/Autenticacion';
import { Usuario } from './../_model/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url: string = `${environment.HOST}v1`;
  urlAutenticacion: string = environment.AUTH;
  private readonly claveToken = 'autenticado';
  private readonly claveNuevoToken = 'nuevo';
  infoUsuario = new Subject<void>();

  constructor(private http: HttpClient, private route: Router) { }

  guardarAuth(data: any) {
    sessionStorage.setItem(this.claveToken, data.access_token);
    sessionStorage.setItem(this.claveNuevoToken, data.refresh_token);
    this.route.navigate(['/funcionalidad/miperfil']);
  }

  actualizarCredenciales(data: any) {
    sessionStorage.setItem(this.claveToken, data.access_token);
    sessionStorage.setItem(this.claveNuevoToken, data.refresh_token);
  }

  guardarNuevoToken(data: any) {
    sessionStorage.setItem(this.claveToken, data.access_token);
    sessionStorage.setItem(this.claveNuevoToken, data.refresh_token);
    return data;
  }

  ObtenerToken() {
    return sessionStorage.getItem(this.claveToken);
  }

  ObtenerRefreshToken() {
     return sessionStorage.getItem(this.claveNuevoToken);
  }

  loginToken(username: string, password: string): Observable<any> {
    let auth = new Autenticacion();
    auth.username = username;
    auth.password = password;
    auth.grant_type = 'password';
    auth.client_id = 2;
    auth.client_secret = 'VT3KzMIQFxt4DBPX5HbKxAnvfT4BQStBY64XsKRh';
    return this.http.post<any>(this.urlAutenticacion, auth);
  }

  refreshToken(nuevoToken: string): Observable<any> {
    let auth = new Autenticacion();
    auth.client_id = 2;
    auth.client_secret = 'VT3KzMIQFxt4DBPX5HbKxAnvfT4BQStBY64XsKRh';
    auth.grant_type = 'refresh_token';
    auth.refresh_token = nuevoToken;
    return this.http.post<any>(this.urlAutenticacion, auth);
  }

  usuarioAutenticado() {
    return this.http.get<PerfilUsuario>(`${this.url}/autenticado`);
  }

  cerrarSesion() {
    sessionStorage.removeItem(this.claveToken);
    sessionStorage.removeItem(this.claveNuevoToken);
    this.route.navigate(['/login']);
  }

  registroUsuarios(usuarios: Usuario) {
    return this.http.post(`${this.url}/registro`, usuarios);
  }

  solicitarRecuperacion(correo: string) {
    return this.http.patch(`${this.url}/solicitud`, correo);
  }

  obtenerCorreoRegistrado(correo: string): Observable<string> {
    return this.http.get<string>(`${this.url}/consultacorreo/${correo}`);
  }
}
