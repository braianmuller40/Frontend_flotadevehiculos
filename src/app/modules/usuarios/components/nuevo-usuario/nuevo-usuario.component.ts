import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoUsuario } from 'src/app/shared/enums/tipos-usuario.enum';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import { ValidatorService } from 'src/app/shared/services/validatorForm/validator.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
@Output() reloadPage = new EventEmitter<any>();

  form: FormGroup;
  stateOptions: any[] = [];
  usuarioNuevo:Usuario = new Usuario();
  state!:string;
  formError:{[key:string]:string}={
    nombre:'',
    login:'',
    descripcion:'',
  }


  constructor(private validatorForm:ValidatorService, private usuarioServ: UsuariosService) {
    this.form = new FormGroup({});
    this.stateOptions = this.getTipoUsuario();
   }

  ngOnInit(): void {
    this.buildForm();
  }

  defineState(state:string, item:Usuario){
    this.state = state;
    state == 'editar' ? this.usuarioNuevo = item : this.usuarioNuevo=new Usuario();
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      nombre: new FormControl(this.usuarioNuevo.nombre, [Validators.required,Validators.maxLength(10)]),
      login: new FormControl(this.usuarioNuevo.login, [Validators.required,Validators.maxLength(10)]),
      descripcion: new FormControl(this.usuarioNuevo.descripcion, [Validators.required,Validators.maxLength(10)]),
      tipo_usuario: new FormControl(this.usuarioNuevo.tipo_usuario? this.usuarioNuevo.tipo_usuario:this.getTipoUsuario()[0].value,[]),
    });
    this.formErrorClean();
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.form.valid){
        let value = this.form.value;   
        if(this.state == 'nuevo'){
          Object.assign(value,{fecha_creacion:new Date()});
          Object.assign(value,{password:value.login});
          this.usuarioServ.post(value).then(result =>{this.vaciar(),this.reloadPage.emit()});
        }else{
          Object.assign(value,{fecha_alteracion:new Date()});
          this.usuarioServ.put(value,this.usuarioNuevo.id).then(result =>{this.reloadPage.emit()});
        }
     }else{
       this.getFormErrors();
       this.focusValidation();
     }
  }


  getFormErrors(){
    let result = this.validatorForm.getErrors(this.form);
    for(let v of result){
      this.formError[v.key]=v.msj;
    }
  }

  formErrorClean(){
    for(let key in this.formError){
      this.formError[key] = "";
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
  

  getTipoUsuario(){
    let Tipo = Object.keys(TipoUsuario);
    let dispOptions = new Array();
    for(let T of Tipo){
        dispOptions.push({name: T, value: T});
      }
    return dispOptions;
  }


  vaciar(){
    this.usuarioNuevo=new Usuario();
    this.buildForm();
  }


}
