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
}