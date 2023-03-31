import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
interface Categoria {
  id: number;
  descripcion: string;
}

interface Usuario {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-agregar-documento',
  templateUrl: './agregar-documento.component.html',
  styleUrls: ['./agregar-documento.component.scss']
})
export class AgregarDocumentoComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  categorias: Categoria[] = [
    { id: 1, descripcion: 'Ivas' },
    { id: 2, descripcion: 'Renta' },
    { id: 3, descripcion: 'Balances' },
    { id: 4, descripcion: 'Carpeta tributaria' },
    { id: 5, descripcion: 'Otros' }
  ];

  usuarios: Usuario[] = [
    { id: 1, nombre: 'Usuario 1' },
    { id: 2, nombre: 'Usuario 2' },
    { id: 3, nombre: 'Usuario 3' }
  ];
  selectedCategoria: number;
  selectedUsuario: number;
  selectedFile: File | null = null;
  private isDragging = false;
  private files: File[] = [];
  onFileSelected(event: any): void {
    const files: { [key: string]: File } = event.target.files;
    this.selectedFile = files[0];
    // if (files.length === 1) {
    //   const file = files[0];
    //   // procesar el archivo seleccionado
    // } else {
    //   // mostrar un mensaje de error indicando que solo se permite seleccionar un archivo
    // }
  }
  submit() {
    this.spinner.show();
    const formData = new FormData();
    formData.append('archivo', this.selectedFile);
    formData.append('categoria', this.selectedCategoria.toString());
    formData.append('usuario', this.selectedUsuario.toString());

    console.log(formData)
    const token=localStorage.getItem('token') || null;
    if (token){
      axios.post(environment.API+'documentos', formData,{
        headers:{
          Authorization:'Bearer ' + token
        }
      }
      )
      .then(response => {
        console.log(response);
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: '¡Archivo enviado con éxito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.resetForm();
        });
      })
      .catch(error => {
        this.spinner.hide();
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al enviar el archivo',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }
  resetForm() {
    this.selectedCategoria = null;
    this.selectedUsuario = null;
    this.selectedFile = null;
  }

}
