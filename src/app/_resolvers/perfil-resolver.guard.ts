import { AutenticacionService } from './../_services/autenticacion.service';
import { PerfilUsuario } from './../_model/PerfilUsuario';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilResolverGuard implements Resolve<PerfilUsuario> {

  constructor(private servicio: AutenticacionService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PerfilUsuario | Observable<PerfilUsuario> | Promise<PerfilUsuario> {
    return this.servicio.usuarioAutenticado();
  }
}
