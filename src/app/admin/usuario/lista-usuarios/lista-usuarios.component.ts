import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import Swal from 'sweetalert2';
import { AlertHelper } from 'src/helpers/alert.helpers';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
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
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  providers: [DialogService]
})
export class ListaUsuariosComponent implements OnInit {
  form: FormGroup;
  usuarios: Usuario[]
  usuarioid: number = null;
  mostrarmodal: boolean = false;
  @Output() usuarioSeleccionado = new EventEmitter<number>();
  constructor(
    private alert: AlertHelper,
    public dialogService: DialogService,
    private mensajes: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.TraerUsuarios()

  }
  async TraerUsuarios() {
    const token = localStorage.getItem('token') || null;
    this.alert.loadingAlert()
    if (token) {
      await axios.get(environment.API + 'usuario', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        this.usuarios = res.data.datos;
        Swal.close()
        // console.log(this.usuarios);
      }).catch(err => {
        console.error(err);
        Swal.close()
      })
    }

  }
  clear(table: Table) {
    table.clear();
  }
  editarUsuario(id: number) {
    const ref = this.dialogService.open(EditarUsuarioComponent, {
      data: {
        userId: id
      },
      header: 'Editar Usuario',
      width: '70%'
    });
    ref.onClose.subscribe(res=>{
      this.TraerUsuarios()
    })
    // console.log(ref)
  }
  async EliminarUsuario(id:any){

    Swal.fire({
      title: 'Eliminar?',
      text: "Se eliminara el cliente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#6c736e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.alert.loadingAlert()
        try {
          const token = localStorage.getItem('token') || null;
          await axios.delete(environment.API+'usuario/'+id,{
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then(res=>{
            this.mensajes.add({severity:'success', summary:res.data.msg});
            Swal.close();
            this.TraerUsuarios()
          }).catch(err=>{
            this.mensajes.add({severity:'error', summary:err});
            console.error(err);
            Swal.close()

          })
        } catch (error) {
          console.error(error);
          Swal.close();
        }
      }
    })
  }
  async VerDocumentos(id:any){
    console.log('ver los documentos del usuario: '+id)
    this.router.navigate(['/usuario/documentos', id]);

  }
}
