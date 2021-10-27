import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic-service/generic.service';
import { TipoServicio } from '../../models/tipo-servicio.model';

@Injectable({
  providedIn: 'root'
})
export class TiposServiciosService extends GenericService<TipoServicio>{

  
  constructor(private readonly httpClient:HttpClient) {
    super("tipos-servicio",httpClient);
  }


}
