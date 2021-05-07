import { Router } from '@angular/router';
import { AutenticacionService } from './../_services/autenticacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, filter, retry, switchMap, take, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private servicio: AutenticacionService, private route: Router) { }

  private agegarToken(request: HttpRequest<any>, token: string) {
    return  request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.servicio.ObtenerToken();
    if (token) {
      request = this.agegarToken(request, token);
    }

    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage) {
          throw new Error(event.body.errorMessage);
        }
      }
    })).pipe(catchError((err) => {
      if (err.status === 401) {
        let url = this.route.url;
        if (url === '/login') {
          this.snackBar.open('No esta autorizado para acceder a este recurso', 'Advertencia', { duration: 3000 });
        } else {
          this.servicio.cerrarSesion();
          this.snackBar.open('Su token ha expirado inicie sesion nuevamente', 'Advertencia', { duration: 3000 });
        }
      } else if (err.status === 400) {
        this.snackBar.open(err.error, 'Advertencia', { duration: 3000 });
      } else if (err.status === 404) {
        this.snackBar.open('Recurso no encontrado', 'Advertencia', { duration: 3000 });
      } else if (err.status === 500) {
        this.snackBar.open('Ha ocurrido un error inesperado estamos trabajando en ello :(', 'ERROR', { duration: 3000 });
      }
      return EMPTY;
    }));
  }
}

