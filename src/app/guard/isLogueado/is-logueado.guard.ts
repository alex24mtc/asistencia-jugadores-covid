import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogueadoService } from '../../servicios/logueado/logueado.service';

@Injectable({
  providedIn: 'root'
})
export class IsLogueadoGuard implements CanActivate {

  constructor(private logueado:LogueadoService){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //esta logueado
      
      /* es lo mismo que lo de debajo
      
      if(this.logueado.getEstado() ){
        return true
      }else{
        return false
      }
    
      */

      //no te permite entrar al admin
      //return this.logueado.getEstado()
      
      
      //te permite entrar al admin
      return true

      
    
  }
  
}
