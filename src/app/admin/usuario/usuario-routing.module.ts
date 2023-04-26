import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';
import { DocumentosUsuarioComponent } from './documentos-usuario/documentos-usuario.component';

const routes: Routes = [
  {
    path:'',component:MainUsuarioComponent

  },
  {
    path:'documentos/:id',component:DocumentosUsuarioComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
