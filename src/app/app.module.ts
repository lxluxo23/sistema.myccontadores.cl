import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './shared/home/home.component';
import { InterceptorService } from './interceptors/interceptor.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { AdminModule } from './admin/admin.module';
import { PrimeNgModule } from './PrimeNg.module';
import { UsuarioModule } from './admin/usuario/usuario.module';
import { AlertHelper } from 'src/helpers/alert.helpers';
import { ConfirmationService, MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    PrimeNgModule,
    UsuarioModule
  ],
  providers: [
    AuthService,
    AlertHelper,
    MessageService,
    ConfirmationService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
