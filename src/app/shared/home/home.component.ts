import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAdmin:boolean|string=false;
  isLogged:boolean=false;
  private subscripcion: Subscription = new Subscription;
  constructor(
    private authservice: AuthService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.subscripcion.add(
      this.authservice.isLogged.subscribe(res=>
        this.isLogged = res
      )
    )
    this.authservice.isAdmin.subscribe(res=>
      this.isAdmin = res
    )
    let user= this.authservice.ObtenerinfoToken();
    console.log(user)

    ///// verificacion si esta logueado o no
    if (!this.isLogged) {
      console.log('no esta logueado?')
      this.router.navigate(['/login']);
    }
  }

}
