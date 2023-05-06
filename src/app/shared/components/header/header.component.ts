import { Component, OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[MessageService]
})
export class HeaderComponent implements OnInit,OnDestroy {
  items: MenuItem[];
  isAdmin:boolean=false;
  nombreUsuario:string="";
  isLogged:boolean=false;
  displayModal = false;
  private subscripcion: Subscription = new Subscription

  constructor(
    private authService: AuthService,
    private router :Router,
    private messageService: MessageService
    ) {
      this.items = [
        {
            label: 'Crear',
            icon: 'pi pi-user-plus',
            command: () => this.showModal()

        },
        {
            label: 'Listar',
            icon: 'pi pi-list',
            routerLink:'/usuario'
        },
        {
          label: 'Subir documentos',
          icon: 'pi pi-upload',
          routerLink:'/admin'
      },
        // { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];
     }


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

    this.subscripcion.add(
      this.authService.isAdmin.subscribe(res => {
        this.isAdmin = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }


  onLogout():void{
    this.authService.logout();
  }

  showModal() {
    this.displayModal = true;
  }

  Recargar(){
    this.displayModal=false;
    this.router.navigate(['/usuario'])
  }
}
