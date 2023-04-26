import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from '../guards/check-login.guard';
import { AgregarDocumentoComponent } from './admin/agregar-documento/agregar-documento.component';
import { HomeComponent } from './shared/home/home.component';
import { AdminguardGuard } from 'src/guards/adminguard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule), canActivate: [CheckLoginGuard] },
  { path: 'usuario', loadChildren: () => import('./admin/usuario/usuario.module').then(m => m.UsuarioModule), canActivate: [AdminguardGuard]},
  {
    path: 'admin',
    component: AgregarDocumentoComponent,
    canActivate: [AdminguardGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
