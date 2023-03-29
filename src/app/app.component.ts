import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from 'express';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'sistema.myccontadores.cl';
  // isLogged:boolean=false;
  // private subscripcion: Subscription = new Subscription;

  constructor(
    // private authservice: AuthService,
  ){ }
  // ngOnDestroy(): void {
  //   this.subscripcion.unsubscribe();
  // }
  // ngOnInit(): void {
  //   this.subscripcion.add(
  //     this.authservice.isLogged.subscribe(res=>
  //       this.isLogged = res
  //     )
  //   )
  // }


}
