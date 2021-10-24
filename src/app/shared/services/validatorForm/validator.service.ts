import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  mensajes=[
    {required:"Es requerido"},
    {maxlength:"Exediste la cantidad de caracteres"},
  ];

  constructor() { }

  getErrors(form:FormGroup){
    let result=[];
    for(let v in form.controls){
      let msj="";
      for(let i of this.mensajes){
          if(form.get(v)?.errors?.hasOwnProperty(Object.keys(i)[0])){
            msj=Object.values(i)[0];
          }
      } 
       result.push({position:v, msj:msj});
    }
    return result;
  }


}
