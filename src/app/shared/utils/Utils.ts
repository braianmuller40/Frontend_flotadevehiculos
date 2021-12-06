import { formatDate } from "@angular/common";

export class Utils{
    static ip(){
        return "http://192.168.163.128:3000";
    }


    static isEmpty(item:any){
        let sw:boolean = true;
        for(let i in item){
          if(item[i]){sw = false;}
        }
        return sw;
    }


    static replaceData(item:any){
        return item.replace("fecha_alteracion","alteracion registro").replace("fecha_creacion","creacion registro").replace("ano","Año").replace("_"," ");
    }

    static formatDateItem(item:any){
        for(let i of Object.keys(item)){
            item[i] && (i == 'fecha_creacion' || i == 'fecha_alteracion' || i == 'fecha_objetivo' || i == 'fecha_inicio' || i == 'fecha_fin')?
             item[i]=formatDate(item[i],'yyyy-MM-dd','en'):false;
        }
        return item;
    }


    static getCurrentDate(){
        let newDate = new Date();
        return new Date(newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset()));
      }
}