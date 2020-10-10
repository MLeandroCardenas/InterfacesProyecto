import { Lectores } from './../_model/Lectores';
import { ZonasService } from './../_services/zonas.service';
import { Zonas } from './../_model/Zonas';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonasResolverGuard implements Resolve<Lectores[]> {
  constructor(private servicio: ZonasService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Lectores[] | Observable<Lectores[]> | Promise<Lectores[]> {
    return this.servicio.obtenerLectores();
  }
}
