import { Component, Input, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-info-relation',
  templateUrl: './info-relation.component.html',
  styleUrls: ['./info-relation.component.css']
})
export class InfoRelationComponent implements OnInit {
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
