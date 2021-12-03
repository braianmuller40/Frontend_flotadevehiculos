import { Estado } from "../enums/estado.enum";
import { GenericAtributes } from "../generic/models/generic-atributes.model";
import { Auto } from "./auto.model";
import { TipoServicio } from "./tipo-servicio.model";
import { Usuario } from "./usuario.model";

export class Servicio extends GenericAtributes{

    fecha_inicio!:Date;
    fecha_fin!:Date;
    km_inicial!:number;
    km_final!:number;
    valor_servicio!:number;
    estado!:Estado;
    usuario!: Usuario;
    tipo_servicio!: TipoServicio;
    auto!: Auto;
    
}