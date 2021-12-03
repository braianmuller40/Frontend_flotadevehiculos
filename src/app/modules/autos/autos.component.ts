import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { InfoComponent } from 'src/app/shared/components/info/info.component';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { Auto } from 'src/app/shared/models/auto.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AutosService } from 'src/app/shared/services/autos/autos.service';
import { NuevoAutoComponent } from './components/nuevo-auto/nuevo-auto.component';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  @ViewChild(NuevoAutoComponent) auto!:NuevoAutoComponent;
  @ViewChild('aut') aut!:InfoComponent;

  listaAutos!:Auto[];
  Auto!:Auto;
  titleModal!:string;
  totalRecords!:number;
  skip:number=0;
  take:number = 5;
  filter:any = {};
  displayInfo:boolean=false;
  displayNuevoAuto:boolean=false;
  condicionesBusqueda=[
    {disponibilidad:"select", enum:Object.values(DisponibilidadAuto)},
    {kilometraje:"number"},
    {ano_modelo:"number"},
    {ano_fabricacion:"number"},
    {fecha_creacion:"date"},
    {fecha_alteracion:"date"},
    {writes:["descripcion","fabricante","chapa","modelo"]},
    {campos:["id","chapa","modelo","disponibilidad"]}
  ];

  constructor(private autosServ:AutosService,private confirmationService: ConfirmationService, private authServ:AuthService) { }

  ngOnInit(): void {
    this.getAutos(this.skip,this.take,this.filter);
  }

  confirmElim(item:Auto) {
    this.confirmationService.confirm({
      message: 'Quieres proceder a eliminar '+item.chapa+'?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.autosServ.delete(item.id).then(result =>{this.reloadPage()});
        }
    });
  }

  adminPermision(){
    return this.authServ.admin;
  }

  getAutos(skip:number,take:number,event:any){
      this.autosServ.getPerFilter({skip:skip, take:take, obj:JSON.stringify(event)}).then(result => {this.listaAutos = result});
      this.countRep(event);
  }

  countRep(event:any){
     this.autosServ.countRepository({obj:JSON.stringify(event)}).then(result=> {this.totalRecords=result});
  }

  onPageChange(event:any){
    this.skip = event.first;
    this.getAutos(this.skip,this.take,this.filter);
  }

  displayState(state:string, item:any){
    state == 'nuevo' ? this.auto.defineState('nuevo', item):this.auto.defineState('editar', item);
    this.titleModal = state == 'nuevo'? 'Nuevo Auto':'Editar Auto';
    this.displayNuevoAuto=true;
  }

  reloadPage(){
    this.getAutos(this.skip,this.take,this.filter);
  }

  eliminarItem(item:Auto){
    this.autosServ.delete(item.id).then(result =>{this.reloadPage()});
  }

  resultadoBusqueda(event:any){
    this.filter=event;
    this.getAutos(this.skip,this.take,this.filter);
  }

  displayInf(item:any){
    this.aut.setValues(item);
    this.displayInfo=true;
  }

  itemTarget(event:any){
    console.log(event);
  }
}
