import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ServiciosComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ServiciosModule { }
