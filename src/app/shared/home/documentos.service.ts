import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor() { }

  async traerDocumentos(){
    const token=localStorage.getItem('token') || null;
    if (token){
      try{
        const res = await axios.get(environment.API+'documentos',{
          headers:{
            Authorization:'Bearer ' + token
          }
        })
        return res.data.datos;
      }
      catch(error){
        console.log(error);
        return null;
      }
    }
    else{
      return null;
    }

  }
}
