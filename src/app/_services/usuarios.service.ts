import { Archivo } from './../_model/Archivo';
import { Clave } from './../_model/Clave';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = `${environment.HOST}v1`;
  constructor(private http: HttpClient) { }

  editarClave(clave: Clave) {
    return this.http.patch(`${this.url}/nueva`, clave);
  }

  cambiarFotoPerfil(archivo: any) {
    return this.http.patch(`${this.url}/fotoperfil`, archivo);
  }
}
