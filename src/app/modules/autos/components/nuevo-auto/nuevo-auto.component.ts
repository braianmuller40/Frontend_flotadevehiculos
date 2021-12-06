import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { Auto } from 'src/app/shared/models/auto.model';
import { AutosService } from 'src/app/shared/services/autos/autos.service';
import { ValidatorService } from 'src/app/shared/services/validatorForm/validator.service';

@Component({
  selector: 'app-nuevo-auto',
  templateUrl: './nuevo-auto.component.html',
  styleUrls: ['./nuevo-auto.component.css']
})
export class NuevoAutoComponent implements OnInit {
@Output() reloadPage = new EventEmitter<any>();

  form: FormGroup;
  stateOptions: any[] = [];
  autoNuevo:Auto = new Auto();
  state!:string;
  swValidations:boolean=false;
  formError:{[key:string]:string}={
    chapa:'',
    fabricante:'',
    modelo:'',
    kilometraje:'',
    chassis:'',
    ano_modelo:'',
    ano_fabricacion:'',
    descripcion:'',
  }


  constructor(private validatorForm:ValidatorService, private autoServ: AutosService) {
    this.form = new FormGroup({});
    this.stateOptions = this.getDisponibilidadAuto();
   }

  ngOnInit(): void {
    this.buildForm();
  }

  defineState(state:string, item:Auto){
    this.state = state;
    state == 'editar' ? this.autoNuevo = item : this.autoNuevo=new Auto();
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      descripcion: new FormControl(this.autoNuevo.descripcion, [Validators.required,Validators.maxLength(10)]),
      chapa: new FormControl(this.autoNuevo.chapa, [Validators.required,Validators.maxLength(10)]),
      fabricante: new FormControl(this.autoNuevo.fabricante, [Validators.required,Validators.maxLength(10)]),
      modelo: new FormControl(this.autoNuevo.modelo, [Validators.required,Validators.maxLength(10)]),
      kilometraje: new FormControl(this.autoNuevo.kilometraje, [Validators.required,Validators.maxLength(10)]),
      chassis: new FormControl(this.autoNuevo.chassis, [Validators.required,Validators.maxLength(10)]),
      ano_modelo: new FormControl(this.autoNuevo.ano_modelo, [Validators.required,Validators.maxLength(10)]),
      ano_fabricacion: new FormControl(this.autoNuevo.ano_fabricacion, [Validators.required,Validators.maxLength(10)]),
      disponibilidad: new FormControl(this.autoNuevo.disponibilidad? this.autoNuevo.disponibilidad:this.getDisponibilidadAuto()[0].value,[]),
    });
    this.formErrorClean();
    this.form.valueChanges
    .subscribe(value => {
    if(this.swValidations){
       this.getFormErrors();
       this.focusValidation();
    }
    });
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.form.valid){
        let value = this.form.value;   
        if(this.state == 'nuevo'){
          this.autoServ.post(value).then(result =>{this.reloadPage.emit()});
        }else{
          this.autoServ.put(value,this.autoNuevo.id).then(result =>{this.reloadPage.emit()});
        }
     }else{
       this.swValidations=true;
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
  

  getDisponibilidadAuto(){
    let Disponibilidad = Object.keys(DisponibilidadAuto);
    let dispOptions = new Array();
    for(let T of Disponibilidad){
        dispOptions.push({name: T, value: T});
      }
    return dispOptions;
  }


  vaciar(){
    this.autoNuevo=new Auto();
    this.buildForm();
  }


}
