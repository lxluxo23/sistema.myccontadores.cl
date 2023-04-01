import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class LoginModule { }
