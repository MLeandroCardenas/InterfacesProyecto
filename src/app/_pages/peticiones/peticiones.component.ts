import { Notificaciones } from './../../_model/Notificaciones';
import { PeticionesService } from './../../_services/peticiones.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TipoPeticion } from 'src/app/_model/TipoPeticion';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {

  formularioPeticion = new FormGroup({
    tipoPeticion: new FormControl(this.obtenerTipoPeticiones(), Validators.required),
    comentario: new FormControl('', [Validators.min(5), Validators.max(200), Validators.required]),
    archivos: new FormControl(null)
  });

  tiposPeticiones: TipoPeticion[];

  constructor(private servicio: PeticionesService, private mensaje: MatSnackBar) { }

  ngOnInit() {
  }

  registrarPeticion(){
    let peticion = new Notificaciones();
    peticion.tipoNotificacion = this.formularioPeticion.get('tipoPeticion').value;
    peticion.comentario = this.formularioPeticion.get('comentario').value;
    this.servicio.registrarPeticion(peticion).subscribe(data=>{
      this.mostrarMensaje(data as string, 'Mensaje');
    });
  }

  obtenerTipoPeticiones(){
    this.servicio.obtenerTiposPeticiones().subscribe(data=>{
      this.tiposPeticiones = data;
    });
  }

  mostrarMensaje(men: string, action: string) {
    this.mensaje.open(men, action, {
      duration: 3000,
    });
  }
}
