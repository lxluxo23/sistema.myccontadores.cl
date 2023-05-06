import { Injectable } from '@angular/core';
import axios from 'axios';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AlertHelper } from 'src/helpers/alert.helpers';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(
    private alert : AlertHelper,
    private mensajes: MessageService,
  ) { }

  async traerDocumentos(){
    const token=localStorage.getItem('token') || null;
    if (token){
      this.alert.loadingAlert()
      try{
        const res = await axios.get(environment.API+'documentos',{
          headers:{
            Authorization:'Bearer ' + token
          }
        })
        Swal.close()
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
  async traerDocumentosPorUsuario(id:number){
    const token=localStorage.getItem('token') || null;
    if (token){
      this.alert.loadingAlert()
      try{
        const res = await axios.get(environment.API+'documentos/'+id,{
          headers:{
            Authorization:'Bearer ' + token
          }
        })
        Swal.close()
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
  async traerDocumentosCategoria(idusuario:number ,idcategoria:number){
    const token=localStorage.getItem('token') || null;
    if (token){
      try{
        const res = await axios.get(environment.API+'documentos/categoria/'+idusuario+'/'+idcategoria,{
          headers:{
            Authorization:'Bearer ' + token
          }
        })
        return res.data.datos;
      }
      catch(error){
        console.log(error);
        this.mensajes.add({severity: 'error', summary: error});
        return null;
      }
    }
    else{
      return null;
    }

  }

  async EliminarDocumento(id :number){
    const token=localStorage.getItem('token') || null;
    if (token){
      try{
        const res = await axios.delete(environment.API+'documentos/'+id,{
          headers:{
            Authorization:'Bearer ' + token
          }
        })
        this.mensajes.add({severity:'success', summary:res.data.msg});
        return res.data;
      }
      catch(error){
        console.error(error)
        if (error.response.status === 500) {
          this.mensajes.add({severity:'error', summary: error.response.data.msg});
        } else {
          this.mensajes.add({severity: 'error', summary: error});
        }
        return null;
      }
    }
    else{
      return null;
    }
  }
}
