import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  items: MenuItem[]=[];
  displayCambiarContrasena:boolean=false;
  displayTiposServicio:boolean=false;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cuenta',
        items:[
          {
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
            label: 'Tipos de Servicio',
            icon: 'fas fa-wrench',
            command:() => this.displayPage("tipo-servicio")
          },
        ]
      },
  ];
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
