import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { DocumentosService } from './documentos.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean | string = false;
  isLogged: boolean = false;
  datos: any
  displayedColumns: string[] = ['id', 'nombre', 'createdAt', 'categoria', 'acciones'];

  private subscripcion: Subscription = new Subscription;
  constructor(
    private authservice: AuthService,
    private documentoService: DocumentosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscripcion.add(
      this.authservice.isLogged.subscribe(res =>
        this.isLogged = res
      )
    )
    this.authservice.isAdmin.subscribe(res =>
      this.isAdmin = res
    )
    let user = this.authservice.ObtenerinfoToken();


    ///// verificacion si esta logueado o no
    if (!this.isLogged) {
      console.log('no esta logueado?')
      this.router.navigate(['/login']);
    }

    this.Traerdatos()
  }

  async Traerdatos() {
    this.datos = await this.documentoService.traerDocumentos()
    //this.datos = new MatTableDataSource<any>(this.datos);
    console.log(this.datos)
  }
  Descargar(nombre: any) {
    window.open(environment.API+`archivos/` + nombre);
  }

}
