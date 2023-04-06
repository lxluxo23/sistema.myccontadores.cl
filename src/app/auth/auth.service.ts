import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import axios from 'axios';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //variables observables para
  private loggedIn = new BehaviorSubject<boolean>(false);

  public NombreUsuario: string = ""
  constructor(
    private router: Router,
  ) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get ObtenerNombre(): string {
    return this.NombreUsuario;
  }


  async login(authdata:any) {
    try {
      const res = await axios.post(environment.API+'auth/login', authdata)
      if (res.status ==200){
        this.saveToken(res.data.token);
        this.loggedIn.next(true); // actualice loggedIn a true después del inicio de sesión
        return res.data;
      }
    }
    catch(error) {
      alert("Error al iniciar sesión " )
      console.error(error);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin'); // elimine la variable de administrador del almacenamiento local
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): boolean {
    let userToken = localStorage.getItem('token') || null;
    if (userToken) {
      const isExpired = helper.isTokenExpired(userToken);
      if (isExpired){
        this.logout();
        return false;
      } else {
        this.loggedIn.next(true);
        return true;
      }
    } else {
      console.log("no existe token");
      this.loggedIn.next(false);
      return false;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    const tokeninfo = helper.decodeToken(token);
    if (tokeninfo.usuario.roles[0].id==1){
      localStorage.setItem('isAdmin', 'true'); // agregue la variable isAdmin al almacenamiento local
    }
  }

  get isAdmin(): Observable<boolean> {
    return of(localStorage.getItem('isAdmin') === 'true'); // convierta el valor almacenado en string a booleano
  }

  public ObtenerinfoToken(){
    let userToken = localStorage.getItem('token') || null;
    if (userToken){
       const tokeninfo = helper.decodeToken(userToken);
       return tokeninfo.usuario;
    }
    else {
      this.logout();
    }
  }
}
