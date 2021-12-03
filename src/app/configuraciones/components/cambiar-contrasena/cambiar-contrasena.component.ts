import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import { ValidatorService } from 'src/app/shared/services/validatorForm/validator.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  formCambiar: FormGroup;
  formError:{[key:string]:string}={
    password:'',
    new_password:''
  }

  constructor(private userService:UsuariosService, private validatoForm:ValidatorService, private auth:AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) { 
    this.formCambiar = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
  }


  private buildForm() {
    this.formCambiar = new FormGroup({
      password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required])
    });
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.formCambiar.valid){
        this.confirmSend(this.formCambiar.value);
     }else{
       this.getFormErrors();
       this.focusValidation();
     }
  }


  confirmSend(item:any) {
    this.confirmationService.confirm({
      message: 'Estas seguro que deseas cambiar la contraseña de '+this.auth.getLogin()+'?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
        accept: () => {
          Object.assign(item,{login:this.auth.getLogin()});
          this.userService.changePassword(item).then(result => this.buildForm()).catch(error => {this.messageService.add({severity:'error', summary:'Error', detail:'Esta contraseña no pertenese a este usuario'});this.buildForm();});
        }
    });
  }


  getFormErrors(){
    let result = this.validatoForm.getErrors(this.formCambiar);
    for(let v of result){
      this.formError[v.key]=v.msj;
    }
  }
  

  focusValidation(){
    for(let t in this.formError){
      if(this.formError[t] != ''){
        document.getElementById(t)?.focus();
        break;
      }
    }
  }

  vaciar(){
    this.buildForm();
  }
  
}
