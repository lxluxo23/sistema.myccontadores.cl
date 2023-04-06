import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { cleanRut, validateRut, getLastDigitOfRut } from 'rutlib';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscripcion: Subscription = new Subscription;
  loginForm = this.Fb.group({
    rut: new FormControl('', [Validators.required]),
    pass: ['', [Validators.required]],
  });
  constructor(
    private authService: AuthService,
    private Fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
  async onLogin(): Promise<void> {
    this.spinner.show();
    const rut = this.loginForm.get('rut').value;
    let rutlimpio = cleanRut(rut);
    if (rutlimpio.charAt(0) === '0') {
      rutlimpio = rutlimpio.substring(1);
    }
    this.loginForm.get('rut').setValue(rutlimpio.toLocaleUpperCase());
    const formValue = this.loginForm.value;
    // console.log(formValue)
    let respuesta = await this.authService.login(formValue)
    if (respuesta) {

      this.authService.isAdmin.subscribe(res => {
        // console.log(res)
        if (res == true) {
          this.router.navigate(['/admin'])
        }
        else {
          this.router.navigate(['']);
        }
      })
    }
    this.spinner.hide();
  }
}
