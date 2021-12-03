import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit{

  items: MenuItem[]=[];
  displayCambiarContrasena:boolean=false;
  displayTiposServicio:boolean=false;

  constructor(private authServ:AuthService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cuenta',
        items:[
          {
            visible:true,
            label: 'Cambiar contraseña',
            icon: 'fas fa-key',
            command:() => this.displayPage("cambiar-contrasena")
          },
        ] 
      },
      {
        label:'Servicio',
        items:[
          {
            visible:false,
            label: 'Tipos de Servicio',
            icon: 'fas fa-tools',
            command:() => this.displayPage("tipo-servicio")
          },
        ]
      },
  ];
  this.visible();
  }

  
  visible(){
    for(let i of this.items){
     i.items?i.items.forEach(element => {
      element.label == 'Tipos de Servicio'? element.visible = this.authServ.admin:true;
     }):false;
    }
  }

  displayPage(page:string){
    this.displayFalse();
    page=="cambiar-contrasena"? this.displayCambiarContrasena=true:
    page=="tipo-servicio"? this.displayTiposServicio=true:false;
  }


  displayFalse(){
    this.displayCambiarContrasena=false;
    this.displayTiposServicio=false;
  }
  
}
