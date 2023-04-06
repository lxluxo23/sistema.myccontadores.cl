import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAdmin.pipe(
      map(isAdmin => {
        // console.log(isAdmin)
        if (isAdmin) {
          return true;
        } else {
          // Si el usuario no es administrador, redirigir a otra ruta o mostrar un mensaje de error
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}


