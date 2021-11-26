import { Component, Input, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-info-auto',
  templateUrl: './info-auto.component.html',
  styleUrls: ['./info-auto.component.css']
})
export class InfoAutoComponent implements OnInit {
  @Input() objeto:any;
  @Input() campos:any;
  
    constructor() { }
  
    ngOnInit(): void {
    }

    setValues(item:any){
      this.objeto = item;
    }

    replaceData(item:any){
      return Utils.replaceData(item);
    }
  
    forKeys(item:any){
      return item?Object.keys(item):[];
    }
  
    forValues(item:any){
      return item?Object.values(item):[];
    }
  
    reformCampos(item:{[key:string]:string}){
      let result:{[key:string]:string} ={};
      if(item){
         for(let i in item){
          for(let c of this.campos){
            i==c ? result[i] = item[i]:false;
          }
       }
      }
      return result;
    }
  

}
