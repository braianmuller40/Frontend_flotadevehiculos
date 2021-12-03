import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BusquedaComponent } from "src/app/shared/components/busqueda/busqueda.component";
import { Estado } from "src/app/shared/enums/estado.enum";
import { Servicio } from "src/app/shared/models/servicio.model";
import { AutosService } from "src/app/shared/services/autos/autos.service";
import { ServiciosService } from "src/app/shared/services/servicios/servicios.service";
import { TiposServiciosService } from "src/app/shared/services/tipos-servicios/tipos-servicios.service";
import { UsuariosService } from "src/app/shared/services/usuarios/usuarios.service";
import { ValidatorService } from "src/app/shared/services/validatorForm/validator.service";
import { Utils } from "src/app/shared/utils/utils";


@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {
  @ViewChild('usuari') usuari!:BusquedaComponent;
  @ViewChild('aut') aut!:BusquedaComponent;
  @Output() reloadPage = new EventEmitter<any>();

  form: FormGroup;
  stateOptions: any[] = [];
  servicioNuevo:Servicio = new Servicio();
  state!:string;
  listaTiposServicio = new Array();
  formError:{[key:string]:string}={
     fecha_inicio:'',
     fecha_fin:'',
     km_inicial:'',
     km_final:'',
     descripcion:'',
     valor:'',
     tipo_servicio:'',
  };
  condicionesBusquedaUsuarios=[
    {writes:["nombre","login"]},
    {campos:["id","nombre","login"]},
  ];
  condicionesBusquedaAutos=[
    {writes:["chapa","modelo","fabricante"]},
    {campos:["id","chapa","modelo","fabricante"]},
  ];


  constructor(private validatorForm:ValidatorService, private serviciosServ: ServiciosService, readonly usuariosServ:UsuariosService,readonly autosServ:AutosService,private tipoServ:TiposServiciosService) {
    this.form = new FormGroup({});
   }

  ngOnInit(): void {
    this.getTiposServicio();
    this.buildForm();
  }

  defineState(state:string, item:Servicio){
    this.state = state;
    if(state == 'editar'){
      this.servicioNuevo = item;
      this.usuari.setEditTarget(this.servicioNuevo.usuario);
      this.aut.setEditTarget(this.servicioNuevo.auto);
    }else{
      this.servicioNuevo=new Servicio();
      this.usuari.limpiarInput();
      this.aut.limpiarInput();
    }
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      fecha_inicio: new FormControl(this.servicioNuevo.fecha_inicio, [Validators.required]),
      fecha_fin: new FormControl(this.servicioNuevo.fecha_fin, this.state=='editar'?[Validators.required]:[]),
      km_inicial: new FormControl(this.servicioNuevo.km_inicial, [Validators.required]),
      km_final: new FormControl(this.servicioNuevo.km_final,this.state=='editar'?[Validators.required]:[]),
      valor_servicio: new FormControl(this.servicioNuevo.valor_servicio,[Validators.required]),
      estado: new FormControl(this.servicioNuevo.estado? this.servicioNuevo.estado:this.getEstado()[0].value,[]),
      usuario: new FormControl(this.servicioNuevo.usuario, [Validators.required]),
      auto: new FormControl(this.servicioNuevo.usuario, [Validators.required]),
      tipo_servicio: new FormControl(this.servicioNuevo.tipo_servicio?this.servicioNuevo.tipo_servicio.id:"", [Validators.required]),
      descripcion: new FormControl(this.servicioNuevo.usuario, [Validators.required])
    });
    this.formErrorClean();
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.form.valid && this.validarUsuarioAuto()){
        let value = this.form.value;
        Object.assign(value,{tipo_servicio:this.setTipoServicio(value.tipo_servicio)});
        if(this.state == 'nuevo'){
          console.log(value);
          //this.serviciosServ.post(value).then(result =>{this.reloadPage.emit();this.vaciar()});
        }else{
          console.log(value);
          //this.serviciosServ.put(value,this.servicioNuevo.id).then(result =>{this.reloadPage.emit()});
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
  
  validarUsuarioAuto(){
    if(Utils.isEmpty(this.form.value.usuario) || Utils.isEmpty(this.form.value.auto)){
      return false;
    }else{return true;}
  }

  getEstado(){
    let estado = Object.keys(Estado);
    let dispOptions = new Array();
    for(let T of estado){
      (this.state !== 'nuevo') && (T !== 'FINALIZADO')?dispOptions.push({name: Utils.replaceData(T), value: T}):false;
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
    this.servicioNuevo = new Servicio();
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
