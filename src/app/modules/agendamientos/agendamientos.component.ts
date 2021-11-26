import { Component, OnInit, ViewChild } from "@angular/core";
import { TipoPeriodo } from "src/app/shared/enums/tipo-periodo.enum";
import { Agendamiento } from "src/app/shared/models/agendamiento.model";
import { AgendamientoService } from "src/app/shared/services/agendamiento/agendamiento.service";
import { InfoRelationComponent } from "./components/info-relation/info-relation.component";
import { NuevoAgendamientoComponent } from "./components/nuevo-agendamiento/nuevo-agendamiento.component";


@Component({
  selector: 'app-agendamientos',
  templateUrl: './agendamientos.component.html',
  styleUrls: ['./agendamientos.component.css']
})
export class AgendamientosComponent implements OnInit {
  @ViewChild(NuevoAgendamientoComponent) agendamiento!:NuevoAgendamientoComponent;
  @ViewChild('usuari') usuari!:InfoRelationComponent;
  @ViewChild('aut') aut!:InfoRelationComponent;
  @ViewChild('inf') inf!:InfoRelationComponent;
  

  listaAgendamientos!:Agendamiento[];
  Agendamiento!:Agendamiento;
  titleModal!:string;
  totalRecords!:number;
  skip:number=0;
  take:number = 5;
  filter:any = {};
  displayAuto:boolean=false;
  displayUser:boolean=false;
  displayInfo:boolean=false;
  displayNuevoAgendamiento:boolean=false;
  condicionesBusqueda=[
    {tipo_periodo:"select",  enum:Object.values(TipoPeriodo)}
  ];

  constructor(public agendamientosServ:AgendamientoService) { }

  ngOnInit(): void {
    this.getAgendamientos(this.skip,this.take,this.filter);
  }


  getAgendamientos(skip:number,take:number,event:any){
      this.agendamientosServ.getPerFilter({skip:skip, take:take, obj:JSON.stringify(event), join:["usuario","auto","tipo_servicio"]}).then(result => {this.listaAgendamientos = result});
      this.countRep(event);
  }

  countRep(event:any){
     this.agendamientosServ.countRepository({obj:JSON.stringify(event), join:["usuario","auto","tipo_servicio"]}).then(result=> {this.totalRecords=result});
  }

  onPageChange(event:any){
    this.skip = event.first;
    this.getAgendamientos(this.skip,this.take,this.filter);
  }

  displayState(state:string, item:any){
    state == 'nuevo' ? this.agendamiento.defineState('nuevo', item):this.agendamiento.defineState('editar', item);
    this.titleModal = state == 'nuevo'? 'Nuevo Agendamiento':'Editar Agendamiento';
    this.displayNuevoAgendamiento=true;
  }

  reloadPage(){
    this.getAgendamientos(this.skip,this.take,this.filter);
  }

  eliminarItem(item:Agendamiento){
    this.agendamientosServ.delete(item.id).then(result =>{this.reloadPage()});
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

  resultadoBusqueda(event:any){
    this.filter=event;
    this.getAgendamientos(this.skip,this.take,this.filter);
  }


}
