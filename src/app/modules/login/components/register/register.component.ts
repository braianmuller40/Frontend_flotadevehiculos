import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TipoUsuario } from 'src/app/shared/enums/tipos-usuario.enum';
import { GenericService } from 'src/app/shared/generic/services/generic-service/generic.service';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import { ValidatorService } from 'src/app/shared/services/validatorForm/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  stateOptions: any[] = [];
  formError:{[key:string]:string}={
    nombre:'',
    login:'',
    password:'',
    passwordRepetido:''
  }


  constructor(private userService:UsuariosService, private validatoForm:ValidatorService) {
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
       this.getFormErrors();
       this.validarPasswordRepetido()?this.formError.passwordRepetido = "Los passwords no son iguales":false;
       this.focusValidation();
     }
  }


  getFormErrors(){
    let result = this.validatoForm.getErrors(this.form);
    for(let v of result){
      this.formError[v.key]=v.msj;
    }
  }


  focusValidation(){
    for(let t in this.formError){
      if(this.formError[t] != '' && t != "password"){
        document.getElementById(t)?.focus();
        break;
      }
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


  validarPasswordRepetido(){
    if(this.form.get('password')?.value !== this.form.get('passwordRepetido')?.value){
      return true;
    }
    return false;
  }

  vaciar(){
    this.buildForm();
  }
  
}



