import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();

  constructor(private authServ:AuthService,private messageService: MessageService) { }

  ngOnInit(): void {
    document.getElementById('inputUsername')?.focus();
  }


  login(){
    console.log(this.user);
    this.authServ.login(this.user)
    .catch(error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Usuario o Contraseña incorrectos'});
    })
  }

getValue(event:any){
  return event.target.value;
}

focusUsername(){
  document.getElementById('inputPassword')?.focus();
}

focusPassword(){
  document.getElementById('btnEnter')?.focus();
}

}
