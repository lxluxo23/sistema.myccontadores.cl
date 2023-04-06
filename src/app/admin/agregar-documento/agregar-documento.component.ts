import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown } from 'primeng/dropdown';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
interface Categoria {
  id: number;
  descripcion: string;
}

interface Usuario {
  id: number;
  nombre: string;
  rut: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  Roles: Rol[];
}
interface Rol {
  id: number;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
  UsuarioRol: UsuarioRol;
}
interface UsuarioRol {
  RoleId: number;
  UsuarioId: number;
}
@Component({
  selector: 'app-agregar-documento',
  templateUrl: './agregar-documento.component.html',
  styleUrls: ['./agregar-documento.component.scss']
})
export class AgregarDocumentoComponent implements OnInit {
  @ViewChild('categoria') categoriaDropdown: Dropdown;
  @ViewChild('usuario') usuarioDropdown: Dropdown;
  usuarios: Usuario[]
  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.TraerUsuarios()
    // console.log(this.usuarios)
  }

  categorias: Categoria[] = [
    { id: 1, descripcion: 'Ivas' },
    { id: 2, descripcion: 'Renta' },
    { id: 3, descripcion: 'Balances' },
    { id: 4, descripcion: 'Carpeta tributaria' },
    { id: 5, descripcion: 'Otros' }
  ];

  // usuarios: Usuario[] = [
  //   { id: 1, nombre: 'Usuario 1' },
  //   { id: 2, nombre: 'Usuario 2' },
  //   { id: 3, nombre: 'Usuario 3' }
  // ];
  selectedCategoria: Categoria;
  selectedUsuario: Usuario;
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
    formData.append('categoria', this.selectedCategoria.id.toString());
    formData.append('usuario', this.selectedUsuario.id.toString());

    // console.log(formData)
    const token=localStorage.getItem('token') || null;
    if (token){
      axios.post(environment.API+'documentos', formData,{
        headers:{
          Authorization:'Bearer ' + token
        }
      }
      )
      .then(response => {
        // console.log(response);
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
        // console.log(error);
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

  async TraerUsuarios(){
    const token=localStorage.getItem('token') || null;

    if (token){
      await axios.get(environment.API+'usuario',{
        headers:{
          Authorization:'Bearer ' + token
        }
      }).then(res =>{
        this.usuarios= res.data.datos;
        // console.log(this.usuarios);
      }).catch(err =>{
        console.error(err);
      })
    }

  }

}
