import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoUsuario } from 'src/app/shared/enums/tipos-usuario.enum';
import { GenericService } from 'src/app/shared/generic/services/generic-service/generic.service';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  stateOptions: any[] = [];
  msgNumber:number=0;
  Msg:Array<string> = [
    "",
    "Este campo es requerido",
    "Ultrapasaste la cantidad de caracteres",
    "Las contrasenas no coiciden",
    "Es nessesario completar ambos campos de passwords",
  ];

  constructor(private userService:UsuariosService) {
    this.form = new FormGroup({});
    this.stateOptions = this.getTiposUsuario();
   }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required,Validators.maxLength(10)]),
      login: new FormControl('', [Validators.required,Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required]),
      passwordRepetido: new FormControl('', [Validators.required]),
      tipo_usuario: new FormControl(this.getTiposUsuario()[0].value,[]),
    });
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.form.valid && !this.validarPasswordRepetido()){
        let value = this.form.value;
        delete value.passwordRepetido;
        Object.assign(value,{fecha_creacion:new Date()});
        this.userService.post(value).then(result => {console.log(result);this.buildForm();});
     }else{
       this.validarFormulario();
     }
  }

  getTiposUsuario(){
    let tipos = Object.values(TipoUsuario);
    let userOptions = new Array();
    for(let T of tipos){
        userOptions.push({name: T, value: T})
      }
    return userOptions;
  }


  displayMensaje(campo:string,msg:number){
    this.msgNumber=msg;
    document.getElementById(campo)?.focus();
  }

  validarPasswordRepetido(){
    if(this.form.get('password')?.value !== this.form.get('passwordRepetido')?.value){
      return true;
    }
    return false;
  }

  validarFormulario(){
    this.form.get('nombre')?.hasError('required')?this.displayMensaje('inputNombreR',1):
    this.form.get('nombre')?.hasError('maxlength')?this.displayMensaje('inputNombreR',2):
    this.form.get('login')?.hasError('required')?this.displayMensaje('inputUsernameR',1):
    this.form.get('login')?.hasError('maxlength')?this.displayMensaje('inputUsernameR',2):
    this.form.get('password')?.hasError('required')?this.displayMensaje('inputPasswordRepetidoR',4):
    this.validarPasswordRepetido()?this.displayMensaje('inputPasswordRepetidoR',3):false;
  }

}



