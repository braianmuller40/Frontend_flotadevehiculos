import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic-service/generic.service';
import { ChangeUser } from '../../models/changeUser.model';
import { Usuario } from '../../models/usuario.model';
import { Utils } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends GenericService<Usuario>{

  constructor(private readonly httpClient:HttpClient) {
    super("usuarios",httpClient);
  }

   url= Utils.ip();

  async changePassword(user:ChangeUser){
    return await this.httpClient.post(this.url+"/usuarios/changePassword", user).toPromise();
  }

  async getUserByLogin(login:string){
    return await this.httpClient.post(this.url+"/usuarios/verifyUser",{login:login}).toPromise();
  }
}
