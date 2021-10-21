import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService{

  constructor(private httpClient: HttpClient) {}

  url = "http://localhost:3000/";

  async getMany(local:string){
    return await this.httpClient.get(this.url+local).toPromise();
  }

  async get(local:string, id:number){
    return await this.httpClient.get(this.url+local+"/"+id).toPromise();
  }

  async post(local:string, obj:any){
    return await this.httpClient.post(this.url+local, obj).toPromise();
   }

  async put(local:string, obj:any){
    return await this.httpClient.put(this.url+local+"/"+obj.id, obj).toPromise();
  }

  async delete(local:string, id:number){
    return await this.httpClient.delete(this.url+local+"/"+id).toPromise();
  }

}
