import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor() { }

  async traerDocumentos(){
    try{
      const res = axios.get('http://localhost:3000/documentos')
    }
    catch(error){

    }
  }
}
