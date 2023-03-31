import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDocumentosComponent } from './main-documentos/main-documentos.component';
import { AgregarDocumentoComponent } from './agregar-documento/agregar-documento.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainDocumentosComponent,
    AgregarDocumentoComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxFileDropModule,
    NgxSpinnerModule,
  ],
  exports :[
    MainDocumentosComponent,
    AgregarDocumentoComponent
  ]
})
export class AdminModule { }
