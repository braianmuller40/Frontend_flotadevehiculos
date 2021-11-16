import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic-service/generic.service';
import { Auto } from '../../models/auto.model';

@Injectable({
  providedIn: 'root'
})
export class AutosService extends GenericService<Auto>{

  constructor(private readonly httpClient:HttpClient) {
    super("autos", httpClient);
   }
}
