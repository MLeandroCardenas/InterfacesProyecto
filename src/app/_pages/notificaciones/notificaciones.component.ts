import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { EventosService } from 'src/app/_services/eventos.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  constructor(private servicio: EventosService) { }

  ngOnInit() {
  }

  seleccion(tabChangeEvent: MatTabChangeEvent): void{
    if(tabChangeEvent.index === 0)
      this.servicio.refrescarTabla.next(5);
  }
}
