import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-re-login',
  templateUrl: './re-login.component.html',
  styleUrls: ['./re-login.component.css']
})
export class ReLoginComponent implements OnInit {

  user:User = new User();

  constructor(private authServ:AuthService,private router:Router, private messageService: MessageService) { }

  ngOnInit(): void {
    document.getElementById('inputUsername')?.focus();
  }


  login(){
    this.authServ.login(this.user)
    .then(result => this.user = new User())
    .catch(error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Usuario o Contraseña incorrectos'});
      this.user = new User();
    })
  }


  logout(){
    this.authServ.logout();
  }


  getValue(event:any){
    return event.target.value;
  }


  focusPassword(){
    document.getElementById('inputPassword')?.focus();
  }


  focusBtnEnter(){
    document.getElementById('btnEnter')?.focus();
    setTimeout(()=>this.login(),1);
  }
}
