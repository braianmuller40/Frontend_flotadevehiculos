import { TipoAgendamiento } from "../enums/tipo-agendamiento.enum";
import { TipoPeriodo } from "../enums/tipo-periodo.enum";
import { GenericAtributes } from "../generic/models/generic-atributes.model";
import { Auto } from "./auto.model";
import { TipoServicio } from "./tipo-servicio.model";
import { Usuario } from "./usuario.model";

export class Agendamiento extends GenericAtributes{

    id!:number;
    tipo_agendamiento!:TipoAgendamiento;
    fecha_objetivo!:Date;
    tipo_periodo!:TipoPeriodo;
    periodo!:number;
    auto!:Auto;
    usuario!:Usuario;
    tipo_servicio!:TipoServicio;

}