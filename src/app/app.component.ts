import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(ConfiguracionesComponent) conf!:ConfiguracionesComponent;

  items: MenuItem[]=[];

  displayConfiguraciones:boolean = false;

  constructor(private authServ:AuthService,private router:Router) {
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
  }


  isLogged(){
    return this.authServ.userLogged();
  }

  
  displayConfig(){
    this.displayConfiguraciones=true;
    this.conf.displayFalse();
  }


  salir(){
    this.authServ.logout();
  }


}
