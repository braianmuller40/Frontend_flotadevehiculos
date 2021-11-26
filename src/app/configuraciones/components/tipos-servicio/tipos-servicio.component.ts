import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoServicio } from 'src/app/shared/models/tipo-servicio.model';
import { TiposServiciosService } from 'src/app/shared/services/tipos-servicios/tipos-servicios.service';
import { ValidatorService } from 'src/app/shared/services/validatorForm/validator.service';

@Component({
  selector: 'app-tipos-servicio',
  templateUrl: './tipos-servicio.component.html',
  styleUrls: ['./tipos-servicio.component.css']
})
export class TiposServicioComponent implements OnInit {

  form: FormGroup;
  itemSelected!:TipoServicio;
  vacio!:TipoServicio;
  itemModificar!:string;
  listaTiposServicio = new Array();
  displayModElim:boolean=true;
  displayGuardCancel:boolean=false;

  formError:{[key:string]:string}={
    descripcion:'',
  }

  constructor(private validatoForm:ValidatorService, private tiposServ: TiposServiciosService) { 
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.getTipos();
  }

  private buildForm() {
    this.form = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.form.valid){
        let value = this.form.value;
        Object.assign(value,{fecha_creacion:new Date()});
        this.tiposServ.post(value).then(result =>{this.buildForm(),this.getTipos()})
     }else{
       this.getFormErrors();
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
      if(this.formError[t] != ''){
        document.getElementById(t)?.focus();
        break;
      }
    }
  }


  getTipos(){
    this.tiposServ.getMany().then(result => {
      this.listaTiposServicio=[];
      for(let i of result){
        this.listaTiposServicio.push(i);
      }});
  }

  capturarTipo(event:any){
    this.listaTiposServicio.map((item) =>{
      if(item.id == event.target.value){
        this.itemSelected = item;
      }
    });
  }

  modificarTipo(){
    if(this.itemSelected){
      this.itemModificar = this.itemSelected.descripcion
      this.displayModElim = false;
      this.displayGuardCancel = true;
    }else{
      console.log("item no seleccionado");
    }
  }


  capturarModificacion(event:any){
    this.itemModificar = event.target.value;
  }


  guardarModificacion(){
    this.itemSelected.descripcion=this.itemModificar;
    this.tiposServ.put(this.itemSelected,this.itemSelected.id).then(result =>{this.itemSelected = this.vacio, this.getTipos()})
    this.displayGuardCancel=false;
    this.displayModElim=true;
  }


  cancelarModificacion(){
    this.itemSelected = this.vacio;
    this.displayGuardCancel=false;
    this.displayModElim=true;
  }
  

  eliminarTipo(){
    this.itemSelected? this.tiposServ.delete(this.itemSelected.id)
    .then(result => {this.getTipos()})
    .catch(err => console.log("No se pudo eliminar 'puede que sea por que esta asignado'")) : false;
  }

}
