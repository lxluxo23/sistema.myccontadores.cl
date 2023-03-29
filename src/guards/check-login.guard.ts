import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authservice: AuthService){

  }
  canActivate():Observable<boolean>{

    //este guaerd permite acceder a la ruta seleccionada si no esta logeado
    return this.authservice.isLogged.pipe(
      take(1),
      map((isLogged: boolean)=>!isLogged)
    );
  }

}
