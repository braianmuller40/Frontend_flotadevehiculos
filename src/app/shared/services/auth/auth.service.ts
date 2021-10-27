import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Utils } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!:User;

  constructor(private httpClient: HttpClient, private router: Router) {}

  api = Utils.ip();

  async login(user:User){
    this.user = user;
   return await this.httpClient.post(this.api+"/login" , user).toPromise().then(result => this.storage(result));
  }

  storage(result:any){
    this.setLogin(this.user);
    localStorage.setItem('access_token',result.access_token);
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('access_token');
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

  async logout(){
    localStorage.removeItem('access_token');
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
