import { GenericAtributes } from "../generic/models/generic-atributes.model";

export class Auto extends GenericAtributes{
    id!:number;
    chapa!:string;
    chassis!:string;
    fabricante!:string;
    modelo!:string;
    kilometraje!:number;
    ano_modelo!:number;
    ano_fabricacion!:number;
    disponibilidad!:string;
}