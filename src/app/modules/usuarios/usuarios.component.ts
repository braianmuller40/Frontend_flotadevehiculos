import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoComponent } from 'src/app/shared/components/info/info.component';
import { TipoUsuario } from 'src/app/shared/enums/tipos-usuario.enum';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { ConfirmationService} from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(NuevoUsuarioComponent) user!:NuevoUsuarioComponent;
  @ViewChild('usuari') usuari!:InfoComponent;

  interval:any;
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
      {tipo_usuario:"select", enum:Object.values(TipoUsuario)},
      {fecha_creacion:"date"},
      {fecha_alteracion:"date"},
      {writes:["nombre","login","descripcion"]},
      
  ];

  constructor(private usuariosServ:UsuariosService,private confirmationService: ConfirmationService,private authServ:AuthService) { }

  ngOnInit(): void {
    this.getUsuarios(this.skip,this.take,this.filter);
  }

  confirmElim(item:Usuario) {
    this.confirmationService.confirm({
      message: 'Quieres proceder a eliminar '+item.nombre+'?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.usuariosServ.delete(item.id).then(result =>{this.reloadPage()});
        }
    });
  }


  getUsuarios(skip:number,take:number,event:any){
      this.usuariosServ.getPerFilter({skip:skip, take:take, obj:JSON.stringify(event)}).then(result => {this.listaUsuarios = result});
      this.countRep(event);
  }

  countRep(event:any){
    this.usuariosServ.countRepository({obj:JSON.stringify(event)}).then(result=> {this.totalRecords=result});
  }

  adminPermision(){
    return this.authServ.admin;
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

  displayInf(item:any){
    this.usuari.setValues(item);
    this.displayInfo=true;
  }

  resultadoBusqueda(event:any){
    this.filter=event;
    this.getUsuarios(0,this.take,this.filter);
  }

}
