import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';
import { MaterialModule } from 'src/app/material.module';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DocumentosUsuarioComponent } from './documentos-usuario/documentos-usuario.component';

@NgModule({
  declarations: [
    MainUsuarioComponent,
    ListaUsuariosComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    DocumentosUsuarioComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MaterialModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ],
  exports:[
    MainUsuarioComponent,
    ListaUsuariosComponent,
    AgregarUsuarioComponent
  ]
})
export class UsuarioModule { }
