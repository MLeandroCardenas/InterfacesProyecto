import { AutenticacionService } from './../_services/autenticacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private servicio: AutenticacionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem(environment.LLAVE_TOKEN)}`
      }
    });

    return next.handle(req).pipe().
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error === true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }
        }
      })).pipe(catchError((err) => {
        if (err.status === 400) {
          this.snackBar.open(err.message, 'ERROR 400', { duration: 3000 });
        } else if (err.status === 401) {
          if (sessionStorage.getItem(environment.LLAVE_TOKEN) === null) {
            this.snackBar.open('CREDENCIALES INCORRECTAS', 'ADVERTENCIA', { duration: 3000 });
          } else if (sessionStorage.getItem(environment.LLAVE_TOKEN) !== null) {
            this.servicio.refreshToken(sessionStorage.getItem(environment.LLAVE_REFRESH_TOKEN))
              .subscribe(data => {
                req = req.clone({
                  setHeaders: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${data.access_token}`
                  }
                });
                sessionStorage.setItem(environment.LLAVE_TOKEN, data.access_token);
                sessionStorage.setItem(environment.LLAVE_REFRESH_TOKEN, data.refresh_token);
              });
            return next.handle(req);
          } else {
            this.router.navigate(['/login']);
          }
        } else if (err.status === 500) {
          this.snackBar.open('ERROR INESPERADO INTENTE MAS TARDE', 'ERROR', { duration: 3000 });
        } else {
          this.snackBar.open(err.error.mensaje, 'ERROR', { duration: 3000 });
        }
        return EMPTY;
      }));
  }
}
