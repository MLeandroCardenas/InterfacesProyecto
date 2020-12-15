import { Rol } from './../_model/Rol';
import { PerfilUsuario } from './../_model/PerfilUsuario';
import { Router } from '@angular/router';
import { Autenticacion } from './../_model/Autenticacion';
import { Usuario } from './../_model/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecuperacionCuenta } from '../_model/RecuperacionCuenta';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url: string = `${environment.HOST}v1`;
  urlAutenticacion: string = environment.AUTH;
  private readonly claveToken = 'autenticado';
  private readonly claveNuevoToken = 'nuevo';

  constructor(private http: HttpClient, private route: Router) { }

  guardarAuth(data: any) {
    sessionStorage.setItem(this.claveToken, data.access_token);
   // sessionStorage.setItem(this.claveNuevoToken, data.refresh_token);
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
    auth.email = username;
    auth.password = password;
   /* auth.grant_type = 'password';
    auth.client_id = 2;
    auth.client_secret = 'VT3KzMIQFxt4DBPX5HbKxAnvfT4BQStBY64XsKRh';*/
    return this.http.post<any>(this.urlAutenticacion, auth);
  }

  refreshToken(nuevoToken: string): Observable<any> {
    let auth = new Autenticacion();
   /* auth.client_id = 2;
    auth.client_secret = 'VT3KzMIQFxt4DBPX5HbKxAnvfT4BQStBY64XsKRh';
    auth.grant_type = 'refresh_token';
    auth.refresh_token = nuevoToken; */
    return this.http.post<any>(this.urlAutenticacion, auth);
  }

  usuarioAutenticado() {
    return this.http.get<PerfilUsuario>(`${this.url}/autenticado`);
  }

  deshabilitarToken() {
    return this.http.get<any>(`${this.url}/logout`);
  }

  cerrarSesion() {
    sessionStorage.removeItem(this.claveToken);
    sessionStorage.removeItem(this.claveNuevoToken);
    this.deshabilitarToken();
    this.route.navigate(['auth/login']);
  }

  registroUsuarios(usuarios: Usuario) {
    return this.http.post(`${this.url}/registro`, usuarios);
  }

  solicitarRecuperacion(correo: string): Observable<string> {
    return this.http.post<string>(`${this.url}/solicitar/${correo}`, correo);
  }

  obtenerCorreoRegistrado(correo: string): Observable<string> {
    return this.http.get<string>(`${this.url}/consultacorreo/${correo}`);
  }

  obtenerIdentificacionRegistrada(identificacion: string) {
    let oculta = btoa(identificacion);
    return this.http.get<string>(`${this.url}/consultaIdentificacion/${oculta}`);
  }

  recuperarCuentaUsuario(cuenta: RecuperacionCuenta) {
    return this.http.post(`${this.url}/actualizar`, cuenta);
  }

  validarTokenRecuperacionCuenta(token: string) {
    return this.http.get(`${this.url}/buscar/${token}`);
  }

  obtenerRoles() {
    return this.http.get<Rol[]>(`${this.url}/obtenerRoles`);
  }
}
