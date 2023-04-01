import { Component, OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAdmin:boolean|string=false;
  nombreUsuario:string="";
  isLogged:boolean=false;

  private subscripcion: Subscription = new Subscription

  constructor(
    private authService: AuthService,
    private router :Router

    ) { }


  ngOnInit(): void {
    this.subscripcion.add(
      this.authService.isLogged.subscribe(res=>
        this.isLogged = res
      )
    )
    this.authService.isAdmin.subscribe(res=>
      this.isAdmin = res
    )
    let user = this.authService.ObtenerinfoToken();
    // console.log(user)
    this.nombreUsuario=user.nombre;

    ///// verificacion si esta logueado o no
    if (!this.isLogged) {
    this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }


  onLogout():void{
    this.authService.logout();
  }
}
