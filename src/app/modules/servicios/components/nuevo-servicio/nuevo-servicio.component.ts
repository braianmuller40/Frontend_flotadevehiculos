import { formatDate } from "@angular/common";
import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { BusquedaComponent } from "src/app/shared/components/busqueda/busqueda.component";
import { DisponibilidadAuto } from "src/app/shared/enums/disponibilidad-auto.enum";
import { Estado } from "src/app/shared/enums/estado.enum";
import { Auto } from "src/app/shared/models/auto.model";
import { Servicio } from "src/app/shared/models/servicio.model";
import { Usuario } from "src/app/shared/models/usuario.model";
import { AuthService } from "src/app/shared/services/auth/auth.service";
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
  @Output() exitNuevo = new EventEmitter<boolean>();

  form: FormGroup;
  stateOptions: any[] = [];
  servicioNuevo:Servicio = new Servicio();
  state!:string;
  swValidations:boolean=false;
  listaTiposServicio = new Array();
  formError:{[key:string]:string}={
     fecha_inicio:'',
     fecha_fin:'',
     km_inicial:'',
     km_final:'',
     valor_servicio:'',
     auto:'',
     tipo_servicio:'',
  };
  condicionesBusquedaAutos=[
    {writes:["chapa","modelo","fabricante"]},
    {campos:["modelo","chapa","fabricante"]},
    {condCampos:{
      disponibilidad:"DISPONIBLE",
    }}
  ];


  constructor(private authServ:AuthService,private validatorForm:ValidatorService, private serviciosServ: ServiciosService, readonly usuariosServ:UsuariosService,readonly autosServ:AutosService,private tipoServ:TiposServiciosService) {
    this.form = new FormGroup({});
   }

  ngOnInit(): void {
    this.getTiposServicio();
    this.buildForm();
  }

  adminPermision(){
    return this.authServ.admin;
  }

  async defineState(state:string, item:Servicio){
    this.state = state;
    if(state == 'nuevo'){
        this.servicioNuevo=new Servicio();
        await this.usuariosServ.getUserByLogin(localStorage.getItem('login') || "").then(result => this.servicioNuevo.usuario=<Usuario>result);
        this.servicioNuevo.estado=Estado.EN_PROCESO;
        this.servicioNuevo.fecha_inicio=new Date();
        this.aut?this.aut.limpiarInput():false;
    }else if(state == 'cancelar'){
        this.servicioNuevo=Object.assign(this.servicioNuevo,item);
        this.servicioNuevo.estado=Estado.CANCELADO;
        this.servicioNuevo.fecha_fin=new Date();
    }else if(state == 'finalizar'){
        this.servicioNuevo=Object.assign(this.servicioNuevo,item);
        this.servicioNuevo.estado=Estado.FINALIZADO;
        this.servicioNuevo.fecha_fin=new Date();
    }

   this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      fecha_inicio: new FormControl(this.servicioNuevo.fecha_inicio?formatDate(this.servicioNuevo.fecha_inicio,'yyyy-MM-dd','en'):'', [Validators.required]),
      fecha_fin: new FormControl(this.servicioNuevo.fecha_fin?formatDate(this.servicioNuevo.fecha_fin,'yyyy-MM-dd','en'):null,[]),
      km_inicial: new FormControl(this.servicioNuevo.km_inicial, [Validators.required]),
      km_final: new FormControl(this.servicioNuevo.km_final,this.servicioNuevo.estado !== Estado.EN_PROCESO?[Validators.required]:[], this.servicioNuevo.estado !== Estado.EN_PROCESO?[this.validationKm.bind(this)]:[]),
      valor_servicio: new FormControl(this.servicioNuevo.valor_servicio,this.servicioNuevo.estado == Estado.FINALIZADO?[Validators.required]:[]),
      estado: new FormControl(this.servicioNuevo.estado,[]),
      usuario: new FormControl(this.servicioNuevo.usuario, [Validators.required]),
      auto: new FormControl(this.servicioNuevo.auto, [Validators.required]),
      tipo_servicio: new FormControl(this.servicioNuevo.tipo_servicio?this.servicioNuevo.tipo_servicio.id:"", [Validators.required]),
      descripcion: new FormControl(this.servicioNuevo.descripcion, [])
    });
    this.formErrorClean();

    this.form.valueChanges
    .subscribe(value => {
    if(this.swValidations == true){
       this.getFormErrors();
       this.focusValidation();
    }
    });
  }

  enviarRegistro(event:Event){
    event.preventDefault();
     if(this.form.valid && this.validarUsuarioAuto()){
        let value = this.form.value;
        Object.assign(value,{tipo_servicio:this.setTipoServicio(value.tipo_servicio)});
        if(this.state == 'nuevo'){
          console.log("nuevo",value);
          this.serviciosServ.post(value)
          .then(result =>{this.setAutoOcupado(this.form.value.auto)
            .then(result =>{this.reloadPage.emit();this.vaciar()})});
        }else{
          console.log("editar",value);
          this.serviciosServ.put(value,this.servicioNuevo.id)
          .then(result =>{this.setAutoDisponible(this.form.value.auto,this.form.value.km_final)
            .then(result => {this.reloadPage.emit();this.exitNuevo.emit(false);})});
        }
     }else{
       this.swValidations=true;
       this.getFormErrors();
       this.focusValidation();
     }
  }

  setAutoOcupado(auto:Auto){
      auto.disponibilidad = DisponibilidadAuto.OCUPADO;
    return this.autosServ.put(auto ,auto.id);
  }

  setAutoDisponible(auto:Auto,km:number){
      auto.disponibilidad = DisponibilidadAuto.DISPONIBLE;
      auto.kilometraje = km;
    return this.autosServ.put(auto ,auto.id);
  }

  getFormErrors(){
    let result = this.validatorForm.getErrors(this.form);
    for(let v of result){
      this.formError[v.key]=v.msj;
       v.key == 'auto' && this.state=='nuevo'?this.aut.showMsgError(v.msj,'aut'):false;
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
   this.defineState('nuevo',new Servicio());
   this.exitNuevo.emit(false);
  }

  itemTargetAuto(event:any){
    this.form.controls['auto'].patchValue(event);
    this.form.controls['km_inicial'].patchValue(event.kilometraje);
  }


  validationKm(control: AbstractControl) {
    return this.autosServ.get(this.form.value.auto.id).then((value) => {
      let auto:Auto = <Auto>value;
      if(control.value < auto.kilometraje){
        return {'km_final_menor':true};
      }else{
        return null;
      }
     });
  }



}
