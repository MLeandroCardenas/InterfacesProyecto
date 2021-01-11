import { FormControl, ValidationErrors, AsyncValidator, AbstractControl } from '@angular/forms';

export class ValidacionesCorreo {

    constructor() {
    }

    static validarServidorCorreo(control: FormControl): ValidationErrors {
        const servidorValido = 'ucundinamarca.edu.co';
        // tslint:disable-next-line: prefer-const
        let correo = control.value as string;
        if (correo.endsWith(servidorValido) === true) {
            return null;
        } else {
            return {validarServidorCorreo: true};
        }
    }
}
