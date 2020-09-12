import { AutenticacionService } from './../_services/autenticacion.service';
import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[ValidacionCorreoAsincrona]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ValidacionCorreoAsincronaDirective, multi: true }]
})

@Injectable({
  providedIn: 'root'
})
export class ValidacionCorreoAsincronaDirective implements AsyncValidator {

  constructor(private servicio: AutenticacionService) { }

  validate(control: AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    const correo = control.value as string;
    return this.servicio.obtenerCorreoRegistrado(correo).pipe(map(data => {
      if (data === null) {
        return null;
      }
      return { ValidacionCorreoAsincrona: true };
    }));
  }
}
