import { Component, OnChanges, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { AuthService } from './shared/services/auth/auth.service';
import { UsuariosService } from './shared/services/usuarios/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(ConfiguracionesComponent) conf!:ConfiguracionesComponent;

  items: MenuItem[]=[];

  displayConfiguraciones:boolean = false;

  constructor(private authServ:AuthService,private usuarioServ: UsuariosService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'fas fa-home',
        style: {'margin-left': '15px'},
        routerLink:['/']
      },
      {
          label: 'Autos',
          icon: 'fas fa-car',
          routerLink:['/autos']
      },
      {
          label: 'Servicios',
          icon: 'fas fa-tasks',
          routerLink:['/servicios']
      },
      {
          label: 'Usuarios',
          icon: 'fas fa-user',
          routerLink:['/usuarios']
      },
      {
          label: 'Agendamientos',
          icon: 'far fa-calendar-alt',
          routerLink:['/agendamientos']
      },
      {
        label: 'Configuraciones',
        icon: 'fas fa-cog',
        style: {'margin-left': 'auto','margin-right':'4%'},
        command:() =>this.displayConfig()
      },
      {
        label: 'Salir',
        icon: 'pi pi-power-off',
        command:() =>this.salir()
      },
  ];

   this.authServ.getByToken().then(result => this.setAdmin(result)).catch(result =>{});
  }

  setAdmin(result:any){
   if(result.role && result.role == 'ADMINISTRADOR'){
    this.authServ.admin=true;
   }
  }

  isLogged(){
    return this.authServ.userLogged();
  }

  displayReLog(){
    let exp = this.authServ.getExp()?.getTime() || 0;
    let now = new Date().getTime();
    return exp-now <= 5000?true:false;
  }

  displayConfig(){
    this.displayConfiguraciones=true;
  }

  salir(){
    this.authServ.logout();
  }


}
