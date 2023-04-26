import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { cleanRut } from 'rutlib/lib';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  @Output() guardarexitoso = new EventEmitter();
  password: string;
  form = this.Fb.group({
    nombre: ['', Validators.required],
    rut: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    pass1: ['', Validators.required],
    pass2: ['', Validators.required],
  }, {
    validator: this.matchPasswords.bind(this)
  }
  );
  constructor(
    private Fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  async Guardar() {
    if (this.form.valid) {
      const rut = this.form.get('rut').value;
      let rutlimpio = cleanRut(rut);
      if (rutlimpio.charAt(0) === '0') {
        rutlimpio = rutlimpio.substring(1);
      }
      this.form.get('rut').setValue(rutlimpio.toLocaleUpperCase());
      const data = {
        nombre: this.form.controls['nombre'].value,
        rut: this.form.controls['rut'].value,
        email: this.form.controls['email'].value,
        password: this.password || this.form.controls['pass1'].value
      };
      const token = localStorage.getItem('token') || null;
      if (token) {
        await axios.post(environment.API + 'usuario', data, {
          headers: {
            Authorization: 'Baerer ' + token
          }
        }).then(res => {
          this.form.reset()
          Swal.fire({
            icon: 'success',
            title: 'Cliente guardado',
            showConfirmButton: false,
            timer: 1500
          })
          this.guardarexitoso.emit();
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error al crear cliente',
            showConfirmButton: false,
            timer: 1500
          });
        })
      }


    }
  }
  matchPasswords(group: FormGroup) {
    const pass1 = group.controls['pass1'].value;
    const pass2 = group.controls['pass2'].value;

    if (pass1 === pass2) {
      this.password = pass1;
      group.controls['pass2'].setErrors(null);
    } else {
      this.password = null;
      group.controls['pass2'].setErrors({ mismatch: true });
    }
  }


}
