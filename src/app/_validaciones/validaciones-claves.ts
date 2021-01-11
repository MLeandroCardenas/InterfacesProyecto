import { FormControl, ValidationErrors } from '@angular/forms';
export class ValidacionesClaves {

    static validarClave(control: FormControl): ValidationErrors {
        // tslint:disable-next-line: prefer-const
        let clavesProhibidas = ['123456', '123456789', 'abcdefg', '000000', '000000000'];
        let clave: string = control.value;
        if ( !clave ) {return; }
        if ( clave.length < 6) { return; }
        if ( clavesProhibidas.indexOf(clave) !== -1) {
            // tslint:disable-next-line: object-literal-key-quotes
            return { 'validarClave': {'message': 'Contraseña insegura'}};
        }

        if ( clave === clave.toLocaleLowerCase()) {
            // tslint:disable-next-line: object-literal-key-quotes
            return { 'validarClave': {'message': 'Debe contener mayúsculas'}};
        }

        if ( clave === clave.toUpperCase()) {
            // tslint:disable-next-line: object-literal-key-quotes
            return { 'validarClave': {'message': 'Debe contener minúsculas'}};
        }

        if ( !/\d/.test(clave) ) {
            // tslint:disable-next-line: object-literal-key-quotes
            return { 'validarClave': {'message': 'Debe incluir un caracter númerico'}};
        }

        return null;
    }
}
