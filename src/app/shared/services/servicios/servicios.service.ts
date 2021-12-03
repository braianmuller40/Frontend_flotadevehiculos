import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic-service/generic.service';
import { Servicio } from '../../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService extends GenericService<Servicio>{

  constructor(private readonly httpClient:HttpClient) {
    super("servicios", httpClient);
   }
   
}
