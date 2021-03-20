import { Clave } from './../_model/Clave';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  subirFoto(archivo: any) {
    return this.http.post(`${this.url}/fotoperfil`, archivo);
  }

  obtenerFotoUsuario(foto: string){
    return this.http.get<any>(`${this.url}/foto/${foto}`);
  }

  todos(cantidad: number) {
    return this.http.get<any>(`${this.url}/usuarios/${cantidad}`);
  }
}
