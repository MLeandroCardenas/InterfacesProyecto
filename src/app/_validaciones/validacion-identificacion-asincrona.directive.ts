import { Directive, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AutenticacionService } from '../_services/autenticacion.service';

@Directive({
  selector: '[ValidacionIdentificacionAsincrona]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ValidacionIdentificacionAsincronaDirective, multi: true }]
})

@Injectable({
  providedIn: 'root'
})
export class ValidacionIdentificacionAsincronaDirective implements AsyncValidator {

  constructor(private servicio: AutenticacionService) { }
  
  validate(control: AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    const identificacion = control.value as string;
    return this.servicio.obtenerIdentificacionRegistrada(identificacion).pipe(map(data => {
      if (data === null) {
        return null;
      }
      return { ValidacionIdentificacionAsincrona: true };
    }));
  }
}
