import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Utils } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private readonly _httpClient:HttpClient) { }

  url= Utils.ip();

  async getReporte(params?:Params){
    return await this._httpClient.get<Array<any>>(this.url+"/reporte/getReporte", {params: params}).toPromise();
  }

}
