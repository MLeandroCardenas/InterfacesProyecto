import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url: string = `${environment.HOST}v1`;

  constructor(private http: HttpClient) { }
  
}
