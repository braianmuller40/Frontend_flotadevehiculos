import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { InfoComponent } from 'src/app/shared/components/info/info.component';
import { Estado } from 'src/app/shared/enums/estado.enum';
import { Servicio } from 'src/app/shared/models/servicio.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ServiciosService } from 'src/app/shared/services/servicios/servicios.service';
import { NuevoServicioComponent } from './components/nuevo-servicio/nuevo-servicio.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  @ViewChild(NuevoServicioComponent) servicio!:NuevoServicioComponent;
  @ViewChild('usuari') usuari!:InfoComponent;
  @ViewChild('aut') aut!:InfoComponent;
  @ViewChild('inf') inf!:InfoComponent;

  listaServicios!:Servicio[];
  Servicio!:Servicio;
  titleModal!:string;
  totalRecords!:number;
  skip:number=0;
  take:number = 5;
  filter:any = {};
  displayAuto:boolean=false;
  displayUser:boolean=false;
  displayInfo:boolean=false;
  displayNuevoServicio:boolean=false;
  condicionesBusqueda=[
    {estado:"select",  enum:Object.values(Estado)},
    {valor_servicio:"number"},
    {km_inicial:"number"},
    {km_final:"number"},
    {fecha_inicio:"date"},
    {fecha_fin:"date"},
    {writes:['descripcion']},
    {relations:[
      {usuario:['nombre','login','descripcion']},
      {auto:['chapa','modelo','descripcion']},
      {tipo_servicio:['descripcion']},
    ]},
  ];

  constructor(private serviciosServ:ServiciosService,private confirmationService: ConfirmationService, private authServ:AuthService) { }

  ngOnInit(): void {
    this.getServicios(this.skip,this.take,this.filter);
  }

  confirmElim(item:Servicio) {
    this.confirmationService.confirm({
      message: 'Quieres proceder a eliminar '+item.descripcion+'?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.serviciosServ.delete(item.id).then(result =>{this.reloadPage()});
        }
    });
  }

  adminPermision(){
    return this.authServ.admin;
  }

  getServicios(skip:number,take:number,event:any){
      this.serviciosServ.getPerFilter({skip:skip, take:take, obj:JSON.stringify(event)}).then(result => {this.listaServicios = result});
      this.countRep(event);
  }

  countRep(event:any){
     this.serviciosServ.countRepository({obj:JSON.stringify(event)}).then(result=> {this.totalRecords=result});
  }

  onPageChange(event:any){
    this.skip = event.first;
    this.getServicios(this.skip,this.take,this.filter);
  }

  displayState(state:string, item:any){
   // state == 'nuevo' ? this.servicio.defineState('nuevo', item):this.servicio.defineState('editar', item);
    this.titleModal = state == 'nuevo'? 'Nuevo Servicio':'Editar Servicio';
    this.displayNuevoServicio=true;
  }

  reloadPage(){
    this.getServicios(this.skip,this.take,this.filter);
  }

  eliminarItem(item:Servicio){
    this.serviciosServ.delete(item.id).then(result =>{this.reloadPage()});
  }

  resultadoBusqueda(event:any){
    this.filter=event;
    this.getServicios(this.skip,this.take,this.filter);
  }

  displayAut(item:any){
    this.aut.setValues(item);
    this.displayAuto=true;
  }

  displayUsuari(item:any){
    this.usuari.setValues(item);
    this.displayUser=true;
  }

  displayInf(item:any){
    this.inf.setValues(item);
    this.displayInfo=true;
  }

  itemTarget(event:any){
    console.log(event);
  }

}
