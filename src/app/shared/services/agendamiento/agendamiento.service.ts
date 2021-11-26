import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic-service/generic.service';
import { Agendamiento } from '../../models/agendamiento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamientoService extends GenericService<Agendamiento>{

  constructor(private readonly httpClient:HttpClient) {
    super("agendamientos", httpClient);
   }
}
