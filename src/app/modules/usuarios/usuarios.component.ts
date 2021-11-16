import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUsuario } from 'src/app/shared/enums/tipos-usuario.enum';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(NuevoUsuarioComponent) user!:NuevoUsuarioComponent;

  listaUsuarios!:Usuario[];
  usuario!:Usuario;
  titleModal!:string;
  totalRecords!:number;
  skip:number=0;
  take:number = 5;
  filter:any = {};
  displayInfo:boolean=false;
  displayNuevoUsuario:boolean=false;
  condicionesBusqueda=[
      {tipo_usuario:"select"},
      {fecha_creacion:"date"},
      {fecha_alteracion:"date"},
      {strings:{nombre:"string",login:"string",descripcion:"string"}},
      {enum:Object.values(TipoUsuario)}
  ];

  constructor(private usuariosServ:UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios(this.skip,this.take,this.filter);
  }


  getUsuarios(skip:number,take:number,event:any){
      this.usuariosServ.getPerFilter({skip:skip, take:take, obj:JSON.stringify(event)}).then(result => {this.listaUsuarios = result,this.countRep()});
  }

  countRep(){
    this.usuariosServ.countRepository().then(result=> {this.totalRecords=result});
  }

  onPageChange(event:any){
    this.skip = event.first;
    this.getUsuarios(this.skip,this.take,this.filter);
  }

  displayState(state:string, item:any){
    state == 'nuevo' ? this.user.defineState('nuevo', item):this.user.defineState('editar', item);
    this.titleModal = state == 'nuevo'? 'Nuevo Usuario':'Editar Usuario';
    this.displayNuevoUsuario=true;
  }

  reloadPage(){
    this.getUsuarios(this.skip,this.take,this.filter);
  }

  eliminarItem(item:Usuario){
    this.usuariosServ.delete(item.id).then(result =>{this.reloadPage()});
  }

  resultadoBusqueda(event:any){
    this.filter=event;
    this.getUsuarios(this.skip,this.take,this.filter);
  }

}
