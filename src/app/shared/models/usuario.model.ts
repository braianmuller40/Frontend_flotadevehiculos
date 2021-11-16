import { TipoUsuario } from "../enums/tipos-usuario.enum";
import { GenericAtributes } from "../generic/models/generic-atributes.model";

export class Usuario extends GenericAtributes{
    id!: number;

    nombre!: string;

    login!: string;

    password!: string;

    tipo_usuario!: TipoUsuario;
}