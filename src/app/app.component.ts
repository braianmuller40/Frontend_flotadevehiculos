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

  displayMenu:boolean = false;
  displayConfiguraciones:boolean = false

  constructor(private authServ:AuthService,private router:Router) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'fas fa-home',
        routerLink:['/']
      },
      {
          label: 'Autos',
          icon: 'fas fa-car',
          routerLink:['/autos']
      },
      {
          label: 'Servicios',
          icon: 'fas fa-car-crash',
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
    this.displayMenu=false;
    this.authServ.logout();
  }

}
