import { formatDate } from "@angular/common";
import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BusquedaComponent } from "src/app/shared/components/busqueda/busqueda.component";
import { TipoAgendamiento } from "src/app/shared/enums/tipo-agendamiento.enum";
import { TipoPeriodo } from "src/app/shared/enums/tipo-periodo.enum";
import { Agendamiento } from "src/app/shared/models/agendamiento.model";
import { AgendamientoService } from "src/app/shared/services/agendamiento/agendamiento.service";
import { AutosService } from "src/app/shared/services/autos/autos.service";
import { TiposServiciosService } from "src/app/shared/services/tipos-servicios/tipos-servicios.service";
import { UsuariosService } from "src/app/shared/services/usuarios/usuarios.service";
import { ValidatorService } from "src/app/shared/services/validatorForm/validator.service";
import { Utils } from "src/app/shared/utils/utils";


@Component({
  selector: 'app-nuevo-agendamiento',
  templateUrl: './nuevo-agendamiento.component.html',
  styleUrls: ['./nuevo-agendamiento.component.css']
})
export class NuevoAgendamientoComponent implements OnInit {
  @ViewChild('usuari') usuari!:BusquedaComponent;
  @ViewChild('aut') aut!:BusquedaComponent;
  @Output() reloadPage = new EventEmitter<any>();

  form: FormGroup;
  stateOptions: any[] = [];
  agendamientoNuevo:Agendamiento = new Agendamiento();
  state!:string;
  listaTiposServicio = new Array();
  formError:{[key:string]:string}={
    period:'',
    fechaObj:'',
    tipo_servicio:'',
    descripcion:'',
  }
  condicionesBusquedaUsuarios=[
    {writes:["nombre","login"]},
    {campos:["id","nombre","login"]},
  ];
  condicionesBusquedaAutos=[
    {writes:["chapa","modelo","fabricante"]},
    {campos:["id","chapa","modelo","fabricante"]},
  ];


  constructor(private validatorForm:ValidatorService, private agendamientoServ: AgendamientoService,readonly usuariosServ:UsuariosService,readonly autosServ:AutosService,private tipoServ:TiposServiciosService) {
    this.form = new FormGroup({});
   }

  ngOnInit(): void {
    this.getTiposServicio();
    this.buildForm();
  }

  defineState(state:string, item:Agendamiento){
    this.state = state;
    if(state == 'editar'){
      this.agendamientoNuevo = item;
      this.usuari.setEditTarget(this.agendamientoNuevo.usuario);
      this.aut.setEditTarget(this.agendamientoNuevo.auto);
    }else{
      this.agendamientoNuevo=new Agendamiento();
      this.usuari.limpiarInput();
      this.aut.limpiarInput();
    }
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      descripcion: new FormControl(this.agendamientoNuevo.descripcion, [Validators.required]),
      tipo_agendamiento: new FormControl(this.agendamientoNuevo.tipo_agendamiento? this.agendamientoNuevo.tipo_agendamiento:this.getTipoAgendamiento()[0].value,[]),
      fecha_objetivo: new FormControl( this.agendamientoNuevo.fecha_objetivo?formatDate(this.agendamientoNuevo.fecha_objetivo,'yyyy-MM-dd','en'):'', []),
      tipo_periodo: new FormControl(this.agendamientoNuevo.tipo_periodo? this.agendamientoNuevo.tipo_periodo:this.getTipoPeriodo()[0].value,[]),
      periodo: new FormControl(this.agendamientoNuevo.periodo, []),
      auto: new FormControl(this.agendamientoNuevo.auto, [Validators.required]),
      usuario: new FormControl(this.agendamientoNuevo.usuario, [Validators.required]),
      tipo_servicio: new FormControl(this.agendamientoNuevo.tipo_servicio?this.agendamientoNuevo.tipo_servicio.id:"", [Validators.required]),
    });
    this.formErrorClean();
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.form.valid && this.validarPeriodo() && this.validarUsuarioAuto()){
        let value = this.form.value;
        this.form.value.fecha_objetivo?Object.assign(value,{fecha_objetivo:new Date(this.form.value.fecha_objetivo).toLocaleString('en-ES', { timeZone: 'UTC' })}):false;
        Object.assign(value,{tipo_servicio:this.setTipoServicio(value.tipo_servicio)});
        if(this.state == 'nuevo'){
          console.log(value);
          this.agendamientoServ.post(value).then(result =>{this.reloadPage.emit();this.vaciar()});
        }else{
          console.log(value);
          this.agendamientoServ.put(value,this.agendamientoNuevo.id).then(result =>{this.reloadPage.emit()});
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
      v.key == 'usuario'?this.usuari.showMsgError(v.msj,'usuari'):false;
      v.key == 'auto'?this.aut.showMsgError(v.msj,'aut'):false;
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
  
  validarPeriodo(){
    let result:boolean=false;
    if(this.form.value.tipo_agendamiento === 'FIJO'){
      if(this.form.value.fecha_objetivo){result = true;}else{this.formError.fechaObj = "Es Requerido";document.getElementById('inputFechaObjetivo')?.focus();}
      this.form.controls['periodo'].patchValue(null);
      this.form.controls['tipo_periodo'].patchValue(null);
    }else{
      if(this.form.value.periodo){result=true;}
      else{this.formError.period = "Es requerido";document.getElementById('periodo')?.focus();}
      this.form.controls['fecha_objetivo'].patchValue(null);
    }
    return result;
  }

  validarUsuarioAuto(){
    let sw:boolean=true;
    Utils.isEmpty(this.form.value.usuario)? sw = false:
    Utils.isEmpty(this.form.value.auto)? sw = false:false;
    return sw;
  }

  getTipoAgendamiento(){
    let tipoAgendamiento = Object.keys(TipoAgendamiento);
    let dispOptions = new Array();
    for(let T of tipoAgendamiento){
        dispOptions.push({name: T, value: T});
      }
    return dispOptions;
  }

  getTipoPeriodo(){
    let tipoPeriodo = Object.keys(TipoPeriodo);
    let dispOptions = new Array();
    for(let T of tipoPeriodo){
        dispOptions.push({name: T, value: T});
      }
    return dispOptions;
  }

  getTiposServicio(){
    this.tipoServ.getMany().then(result => {
      this.listaTiposServicio=[];
      for(let i of result){
        this.listaTiposServicio.push(i);
      }});
  }

  setTipoServicio(itemId:number){
    for(let i of this.listaTiposServicio){
      if(i.id == itemId){return i;}
    }
    return itemId;
  }
 
  vaciar(){
    this.agendamientoNuevo=new Agendamiento();
    this.usuari.limpiarInput();
    this.aut.limpiarInput();
    this.buildForm();
  }

  itemTargetUsuario(event:any){
    this.form.controls['usuario'].patchValue(event);
  }

  itemTargetAuto(event:any){
    this.form.controls['auto'].patchValue(event);
  }
  

}
