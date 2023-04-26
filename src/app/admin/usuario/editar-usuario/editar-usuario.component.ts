import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { cleanRut } from 'rutlib/lib';
import { AlertHelper } from 'src/helpers/alert.helpers';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  usuariotId: number;
  @Output() actualizarExitoso = new EventEmitter();
  form = this.Fb.group({
    nombre: ['', Validators.required],
    rut: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    cambiarPassword: [false],
  })
  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private Fb: FormBuilder,
    private alert: AlertHelper,
    public dialogService: DialogService,
    private mensajes: MessageService,
  ) { }

  ngOnInit(): void {
    this.usuariotId = this.config.data.userId;
    this.TraerUsuario(this.usuariotId);
  }

  async TraerUsuario(id: number) {
    const token = localStorage.getItem('token') || null;
    if (token) {
      await axios.get(environment.API + 'usuario/' + id, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        let rut = res.data.datos.rut;
        if (rut.length === 8) {
          rut = '0' + rut;
        }
        this.form.get("nombre").setValue(res.data.datos.nombre)
        this.form.get("rut").setValue(rut)
        this.form.get("email").setValue(res.data.datos.email)
      }).catch(err => {
        console.error(err);
      })
    }
  }
  async Actualziar() {

    if (this.form.valid) {
      const rut = this.form.get('rut').value;
      let rutlimpio = cleanRut(rut);
      if (rutlimpio.charAt(0) === '0') {
        rutlimpio = rutlimpio.substring(1);
      }
      this.form.get('rut').setValue(rutlimpio.toLocaleUpperCase());

      let data = {
        nombre: this.form.controls['nombre'].value,
        rut: this.form.controls['rut'].value,
        email: this.form.controls['email'].value,
        // password: this.form.controls['password'].value
      };
      if (this.form.controls['cambiarPassword'].value) {
        data['password'] = this.form.controls['password'].value;
      }
      this.alert.loadingAlert()

      const token = localStorage.getItem('token') || null;
      if (token) {
        await axios.put(environment.API + 'usuario/' + this.usuariotId, data, {
          headers: {
            Authorization: 'Baerer ' + token
          }
        }).then(res => {
          Swal.close()
          this.mensajes.add({ severity: 'success', summary: res.data.msg })
          this.actualizarExitoso.emit()
          this.ref.close()
        }).catch(err => {
          this.mensajes.add({ severity: 'error', summary: err });
          console.error(err);
          Swal.close()
        })
      }

    }
  }

}

