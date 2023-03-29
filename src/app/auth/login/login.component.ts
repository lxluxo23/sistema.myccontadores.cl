import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
// import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
// import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

// const helper = new JwtHelperService();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscripcion: Subscription = new Subscription;



  loginForm = this.Fb.group({
    email: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });




  constructor(
    private authService: AuthService,
    private Fb: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }



  async onLogin(): Promise<void> {
     const formValue = this.loginForm.value;

     let respuesta = await this.authService.login(formValue)
     if(respuesta){
      this.router.navigate(['']);
     }
    // const ValidarEmail = this.authService.esEmailValido(formValue.email_usuario)

    // if (!ValidarEmail) {
    //   this.alert.error_mail("Formato Email Invalido");
    //   return;
    // }
    // this.alert.Login();
    // this.subscripcion.add(
    //   this.authService.login(formValue).subscribe((res) => {
    //     if (res) {
    //       const tokeninfo = helper.decodeToken(res.token)
    //       Swal.close();
    //       if (tokeninfo.user.rol = "ADMIN") {
    //         this.router.navigate(['']);
    //       }
    //       else if (tokeninfo.user.rol = "TRABAJADOR") {
    //         this.router.navigate(['']);
    //       }
    //     }
    //   })
    // );
  }
}
