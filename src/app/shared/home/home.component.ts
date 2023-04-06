import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth/auth.service';
import { DocumentosService } from './documentos.service';
import { environment } from 'src/environments/environment';
interface Columna {
  field: string;
  header: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categoriaSeleccionada: number
  isAdmin: boolean | string = false;
  isLogged: boolean = false;
  datos: any
  displayedColumns: string[] = ['id', 'nombre', 'createdAt', 'categoria', 'acciones'];
  cols: Columna[] = [
    { field: 'id', header: 'Id' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'createdAt', header: 'Fecha de creación' },
    { field: 'CategoriaDocumento.descripcion', header: 'Categoría de documento' },
    { field: 'acciones', header: 'Acciones' }
  ];
  categorias: any[] = [
    { id: 1, descripcion: 'Ivas' },
    { id: 2, descripcion: 'Renta' },
    { id: 3, descripcion: 'Balances' },
    { id: 4, descripcion: 'Carpeta tributaria' },
    { id: 5, descripcion: 'Otros' }
  ];
  private subscripcion: Subscription = new Subscription;
  constructor(
    private authservice: AuthService,
    private documentoService: DocumentosService,
    private router: Router,
    private spinner: NgxSpinnerService
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
      // console.log('no esta logueado?')
      this.router.navigate(['/login']);
    }
    this.Traerdatos()
  }
  async Traerdatos(categoria?: number) {
    this.spinner.show()
    this.datos = await this.documentoService.traerDocumentos()
    this.spinner.hide()
    // console.log(this.datos)
    if (categoria) {
      let nuevoarr = this.datos = this.datos.filter((documento: any) => {
        return documento.CategoriaDocumentoId == categoria
      });
      this.datos = nuevoarr

    }
  }
  Descargar(nombre: any) {
    window.open(environment.API + `archivos/` + nombre);
  }

  filtrarPorCategoria(event: any) {
    this.Traerdatos(this.categoriaSeleccionada);
  }


}
