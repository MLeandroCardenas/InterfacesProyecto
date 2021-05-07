import { AutenticacionService } from './../_services/autenticacion.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(private route: Router, private servicio: AutenticacionService) {
  }

  /* canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return this.canActivate(childRoute, state);
   } */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let urlActual = state.url;
    let rol: number = null;
    
    this.servicio.obtenerRol().subscribe(data => {
      rol = data;
    });

    if (this.servicio.ObtenerToken() === null) {
      this.route.navigate(['login']);
      return false;
    }
    
    switch (urlActual) {
      case 'admin/lectores':
        if (rol !== 1) {
          this.route.navigate(['login']);
          return false;
        }
        break;
      case 'admin/zonas':
        if (rol !== 1) {
          this.route.navigate(['login']);
          return false;
        }
        break;
      case 'admin/usuarios':
        if (rol !== 1) {
          this.route.navigate(['login']);
          return false;
        }
        break;
      default:
        return true;
    }
  }
}
