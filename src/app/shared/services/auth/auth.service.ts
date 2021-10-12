import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  api = "http://localhost:3000/login";

  async login(user:User){
   return await this.httpClient.post(this.api , user).toPromise().then(result => this.storage(result));
  }

  storage(result:any){
    localStorage.setItem('access_token',result.access_token);
    this.router.navigate(['/']);
  }

  userLogged(): Boolean{
    return !!localStorage.getItem('access_token');
  }

  logout(){
    localStorage.removeItem('access_token');
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
