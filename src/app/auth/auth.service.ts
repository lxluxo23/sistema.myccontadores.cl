import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
  private role = new BehaviorSubject<any>("NULL");
  constructor(
    private router: Router,
  ) {
    this.checkToken();
    this.ObtenerinfoToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get ObtenerNombre(): string {
    return this.NombreUsuario;
  }

  get isAdmin(): Observable<string> {
    return this.role.asObservable();
  }

  async login(authdata:any) {
    try {
      const res = await axios.post(environment.API+'auth/login', authdata)
      if (res.status ==200){
        this.saveToken(res.data.token)
        const tokeninfo = helper.decodeToken(res.data.token)
        this.NombreUsuario = tokeninfo.usuario.nombre
        this.role.next(tokeninfo.usuario.roles[0].nombre)
        this.loggedIn.next(true)
        return res.data
      }
    }
    catch(error) {
      alert("Error: " + error)
      console.error(error);
    }
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false)
    this.router.navigate(['/login'])
  }

  private checkToken(): boolean {

    let userToken = localStorage.getItem('token') || null;

    if (userToken) {

      const isExpired = helper.isTokenExpired(userToken);
      const tokeninfo = helper.decodeToken(userToken);
      console.log(tokeninfo)

      if (isExpired){
        this.logout()
        return false
      }
      else{
        localStorage.setItem('rol', tokeninfo.usuario.roles[0].nombre);
        this.loggedIn.next(true);
        return true
      }

      // localStorage.setItem('rol', tokeninfo.user.rol);
      // if (isExpired) {
      //   userToken = ''
      //   this.logout()
      //   return false;
      // } else {

      //   this.loggedIn.next(true);
      //   this.role.next(tokeninfo.user.rol)
      //   return true
      // }
    }
    else {
      console.log("no existe token")
      return false
    }
  }

  private saveToken(token: string): void {

    localStorage.setItem('token', token);

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

  private handlerError(err: any): Observable<never> {
    console.log(err)
    let errorMessage = "Ha ocurrido un error recibiendo la data";
    if (err) {
      // errorMessage = `Error: code ${err.error.msg}`;
      errorMessage = `Error: ${err.error.msg}`;
    }
    // this.alert.error_small('Error de conexion con la base de datos ');
    // this.alert.error_small(errorMessage);
    return throwError(err.message);
  }

  esEmailValido(email: string): boolean {
    let mailValido = false;
    'use strict';

    // var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(EMAIL_REGEX)) {
      mailValido = true;
    }
    return mailValido;
  }
}
