import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ReporteService } from 'src/app/shared/services/reporte/reporte.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  valorPerMonth:any;
  basicOptions:any;
  totalGastosServicios:any;

  formatN = new Intl.NumberFormat('es-ES');

  constructor(private reporteServ:ReporteService, private authServ:AuthService) {}

  ngOnInit(): void {
    this.getReporte();

    this.basicOptions = {
      plugins: {
          legend: {labels: {color: 'whitesmoke'}}
      },
      scales: {
          x: {
              ticks: {color: 'whitesmoke'},
              grid: {color: 'whitesmoke'}
          },
          y: {
              ticks: {color: 'whitesmoke'},
              grid: {color: 'whitesmoke'}
          }
      }
  };
  }

  async getReporte(){
      await this.reporteServ.getReporte({obj:JSON.stringify( {campo:'valor_servicio', fecha:'M/Y'})} ).then(result => {this.setValorMonths(result)});
      await this.reporteServ.getReporte({obj:JSON.stringify( {campo:'valor_servicio', fecha:'Y'})} ).then(result => {this.totalGastosServicios=result;});
  }


  reformGs(item:any){
    return item + ' Gs';
  }

  setValorMonths(result:any){
     let valorMonth=[];
    for(let i in result){
     for(let u=1;u<=12;u++){
       parseInt(i)==u? valorMonth.push(result[i]):valorMonth.push(0);
     }
    }
    console.log(valorMonth);
    this.setDataPerMonth(valorMonth);
  }

  setDataPerMonth(valorMonth:any){
    this.valorPerMonth = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
      datasets: [
          {
              label: 'Gasto Año / Meses',
              backgroundColor: 'rgba(241, 169, 35, 500)',
              data: valorMonth
          },
      ]
  };
  }

}
