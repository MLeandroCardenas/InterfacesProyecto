import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = `${environment.HOST}v1`;
  constructor(private http: HttpClient) { }

  editarClave(actual: string, nueva: string) {
    return this.http.patch(`${this.url}/nueva/`, null);
  }
}
