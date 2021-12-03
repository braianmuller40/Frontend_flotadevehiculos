import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Utils } from '../../utils/utils';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!:User;
  userLogg!:any;
  reLog:boolean=false;
  admin:boolean=false;

  constructor(private httpClient: HttpClient, private router: Router, private usuarioServ:UsuariosService) {}

  api = Utils.ip();

  async login(user:User){
    this.user = user;
   return await this.httpClient.post(this.api+"/auth/login" , user).toPromise().then(result => {this.storage(result)});
  }

  storage(result:any){
    this.setLogin(this.user);
    localStorage.setItem('access_token',result.access_token);
    this.getByToken().then(result => this.setAdmin(result));
  }

  setAdmin(result:any){
    localStorage.setItem('exp',result.exp);
    this.admin = result.role && result.role == 'ADMINISTRADOR'? true:false;
  }

  async getByToken(){
    return !!this.getToken()?await this.httpClient.post(this.api+"/auth/verifyToken" , {access_token:this.getToken() || ""}).toPromise():false;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getExp(){
    let sExp=localStorage.getItem('exp');
    let dExp = sExp?new Date(parseInt(sExp)*1000):null;
    return dExp;
  }

  setLogin(user:User){
    localStorage.setItem('login',user.login);
  }

  getLogin(){
    return localStorage.getItem('login');
  }

  userLogged(): Boolean{
    return !!localStorage.getItem('access_token');
  }

  displayReLog(){
    return this.reLog;
  }

  async logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
