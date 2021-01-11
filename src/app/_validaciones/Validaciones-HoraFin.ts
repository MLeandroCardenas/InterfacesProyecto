import { FormControl, ValidationErrors } from '@angular/forms';

export class ValidacionesHoraFin {

    static validarMinimoHoraFin(control: FormControl): ValidationErrors {
        let horaFin: string = control.value;
        if (horaFin == null)
            return null;
        else {
            let inicioHoras: number = parseInt(horaFin.substr(0, 2));
            if(inicioHoras < 8)
                return { 'validarMinimoHoraFin': { 'message': 'Mínimo permitido 8 am' } };
            else
                return null;
        }
    }

    static validarMaximoHoraFin(control: FormControl): ValidationErrors {
        let horaFin: string = control.value;
        if (horaFin == null)
            return null;
        else {
            let inicioMinutos: number = parseInt(horaFin.substr(3, 2));
            let inicioHoras: number = parseInt(horaFin.substr(0, 2));
            if (inicioHoras >= 22 && inicioMinutos > 0 || inicioHoras > 22 && inicioMinutos >=0)
                return { 'validarMaximoHoraFin': { 'message': 'Maximo permitido 10 pm' } };
            return null;
        }
    }
}