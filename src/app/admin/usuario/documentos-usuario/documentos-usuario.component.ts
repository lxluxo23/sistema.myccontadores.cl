import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { MessageService } from 'primeng/api';
import { DocumentosService } from 'src/app/shared/home/documentos.service';
import { environment } from 'src/environments/environment';
import { AlertHelper } from 'src/helpers/alert.helpers';
import Swal from 'sweetalert2';
interface Columna {
  field: string;
  header: string;
}
@Component({
  selector: 'app-documentos-usuario',
  templateUrl: './documentos-usuario.component.html',
  styleUrls: ['./documentos-usuario.component.scss']
})
export class DocumentosUsuarioComponent implements OnInit {
  id: number;
  datos: any
  categoriaSeleccionada: number

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
  constructor(
    private alert: AlertHelper,
    private documentoService: DocumentosService,
    private route: ActivatedRoute,
    private mensajes: MessageService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Traerdatos(this.id)
  }
  async Traerdatos(usuario: number) {
    this.datos = await this.documentoService.traerDocumentosPorUsuario(usuario)
  }
  Descargar(nombre: any) {
    window.open(environment.API + `archivos/` + nombre);
  }
  Eliminar(id: number) {
    console.log('eliminar el archivo con el id: ' + id);
    Swal.fire({
      title: 'Eliminar?',
      text: "Se eliminara el Archivo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#6c736e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.alert.loadingAlert()
          await this.documentoService.EliminarDocumento(id)
          Swal.close()
          this.Traerdatos(this.id)
        }
        catch (err) {
          console.error(err)
        }

      }
    })
  }

  async Mostrar(idCategoria:number){
    console.log("mostrar: "+idCategoria)
    this.datos = await this.documentoService.traerDocumentosCategoria(this.id,idCategoria)
  }
  filtrarPorCategoria(event: any) {
   this.Mostrar(event.value)
  }

}
