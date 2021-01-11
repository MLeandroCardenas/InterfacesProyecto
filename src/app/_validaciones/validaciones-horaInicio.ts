import { FormControl, ValidationErrors } from '@angular/forms';

export class ValidacionesHoraInicio {

    static validarMinimoHoraInicio(control: FormControl): ValidationErrors {
        let horaInicio: string = control.value;
        if(horaInicio == null)    
            return null;
        else {
            let inicioHoras: number = parseInt(horaInicio.substr(0,2));
            if(inicioHoras < 7)
                return { 'validarMinimoHoraInicio': { 'message': 'Mínimo hora inicio 7 am' } };
            else
                return null;
        }
    }
    static validarMaximoHoraInicio(control: FormControl): ValidationErrors {
        let horaInicio: string = control.value;
        if (horaInicio == null)
            return null;
        else {
            let inicioMinutos: number = parseInt(horaInicio.substr(3, 2));
            let inicioHoras: number = parseInt(horaInicio.substr(0, 2));
            if (inicioHoras >= 21 && inicioMinutos > 0 || inicioHoras > 21 && inicioMinutos>=0)
                return { 'validarMaximoHoraInicio': { 'message': 'Maximo permitido 9 pm' } };
            return null;
        }
    }
}