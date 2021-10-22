import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  items: MenuItem[]=[];

  displayMenu:boolean = false;

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
        label: 'Opciones',
        icon: 'fas fa-briefcase',
        style: {'margin-left': 'auto','margin-right':'4%'},
        items:[
                 {label: 'Perfil', icon: 'fas fa-user-circle'},
              ]
      },
  ];
  }

  isLogged(){
    return this.authServ.userLogged();
  }

  salir(){
    this.displayMenu=false;
    this.authServ.logout();
  }

}
