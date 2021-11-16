import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  @Input() condiciones!:Array<{[key:string]:any}>;
  @Input() serv:any;
  @Input() modo!:string;
  @Output() resultado = new EventEmitter<Object>();
  @Output() itemTar = new EventEmitter<Object>();
  
    filter:{[key:string]:any}={};
    colorState:{[key:string]:any}={};
    enumV=new Array();
    items = [];
    campos = new Array();
    inputBusq:string="";
    skip:number=0;
    take:number=10;
    show:boolean=false;
    itemTarget:any;
    showItemTarget:boolean=false;

    constructor() {
  
     }
  
    ngOnInit(): void {
      this.createStruct();
    }
  
    createStruct(){
      for(let i of this.condiciones){
        let key = Object.keys(i)[0];
        if(key == "strings"){
          let v:{[key:string]:any}=i[key]; 
          this.filter[key]=v;
        }
        if(key == "enum"){
          this.enumV = i[key];
        }
        if(key == "campos"){
          this.campos = i[key];
        }
        if(i[key] == "number"){
          this.filter[key] = {min:null, max:null};
        }
        if(i[key] == "date"){
          this.filter[key] = {from:null, to:null};
        }
        if(i[key] == "select"){
          this.filter[key] = {value:null};
        }
      }
      this.filter["write"] = {writed:""};
    }
  
  ////////////////Funciones Spawn//////////////////
    spawnMinMax(item:Object){
      let value = Object.values(item).toString();
      if(value == "number"){ return true; }
      return false;
    }
  
    spawnFromTo(item:Object){
      let value = Object.values(item).toString();
      if(value == "date"){ return true; }
      return false;
    }
  
    spawnSelect(item:Object){
      let value = Object.values(item).toString();
      if(value == "select"){ return true; }
      return false;
    }
  
    spawnTitle(item:Object){
      return Object.keys(item).toString();
    }
  /////////////////////Funciones de captura/////////////////////////
    keyUpBusqueda(event:any){
      this.filter["write"].writed=event.target.value;
      this.inputBusq=event.target.value;
      this.show = this.inputBusq !== ""? true:false;
      this.buscar();
    }
  
    capMin(event:any,item:Object){
      this.filter[this.spawnTitle(item)].min = event.target.value == ''? null:event.target.value;
      this.colorState["min"] = event.target.value? true:false;
    }
  
    capMax(event:any,item:Object){
      this.filter[this.spawnTitle(item)].max = event.target.value == ''? null:event.target.value;
      this.colorState["max"] = event.target.value? true:false;
    }
  
    capSelect(event:any,item:Object){
      this.filter[this.spawnTitle(item)].value = event.target.value;
      this.colorState["select"] = event.target.value? true:false;
    }
  
    capFrom(event:any,item:Object){
      this.filter[this.spawnTitle(item)].from = event.target.value;
      this.colorState["from"] = event.target.value? true:false;
    }
  
    capTo(event:any,item:Object){
      this.filter[this.spawnTitle(item)].to = event.target.value;
      this.colorState["to"] = event.target.value? true:false;
    }
  //////////////////////////////////////////////////////////////////
    filterColor(){
      let sw:boolean=false;
      for(let i in this.colorState){
        this.colorState[i] == true? sw=true:false;
      }
      return sw == true?{color:"Orange"}:{color:"Black"};
    }

    limpiarColorFilter(){
      for(let i in this.colorState){
        this.colorState[i]=false;
      }
    }

    limpiarInput(){
      this.inputBusq="";
      this.filter["write"].writed=this.inputBusq;
      this.show = this.inputBusq !== ""? true:false;
      this.showItemTarget=false;
      this.resultado.emit(this.filter);
    }

    limpiarFilter(){
      for(let i in this.filter){
        i == "strings" ? false : i == "write" ? false: this.filter[i].value ? this.filter[i].value = null:
        this.filter[i].min ? this.filter[i].min = null:this.filter[i].max ? this.filter[i].max = null:
        this.filter[i].from ? this.filter[i].from = null:this.filter[i].to ? this.filter[i].to = null:false;
      }
      this.limpiarColorFilter();
      this.resultado.emit(this.filter);
    }
////////////////////////////////////////////////////////////////////////////
   
    getClickTable(item:any){
      this.itemTarget = item;
      this.showItemTarget=true;
      this.itemTarget.emit(this.itemTarget);
    }

    getEnterTable(){
      if(this.items.length == 1){
        this.itemTarget= this.items[0];
        this.showItemTarget=true;
        this.itemTar.emit(this.itemTarget);
      }
    }

    buscar(){
      this.modo=="list"?this.serv.getPerFilter({skip:this.skip, take:this.take, obj:JSON.stringify(this.filter)}).then((result:any) => {this.items = result}):
      this.resultado.emit(this.filter);
    }
  
}
