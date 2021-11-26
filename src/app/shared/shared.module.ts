import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule} from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [ BusquedaComponent],
  imports: [
    CommonModule,
    OverlayPanelModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
  ],
  exports:[BusquedaComponent],
})
export class SharedModule { }
