import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();

  displayRegistro:boolean = false;

  constructor(private authServ:AuthService,private messageService: MessageService,private router:Router) {
    
  }

  ngOnInit(): void {
    this.isLogged();
    document.getElementById('inputUsername')?.focus();
  }


  login(){
    this.authServ.login(this.user)
    .catch(error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Usuario o Contraseña incorrectos'});
    })
  }

getValue(event:any){
  return event.target.value;
}

focusPassword(){
  document.getElementById('inputPassword')?.focus();
}

focusBtnEnter(){
  document.getElementById('btnEnter')?.focus();
}

isLogged(){
  if(this.authServ.userLogged()){
    this.router.navigate(['/']);
  }
}


}
