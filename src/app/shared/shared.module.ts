import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule} from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InfoComponent } from './components/info/info.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [ BusquedaComponent, InfoComponent],
  imports: [
    CommonModule,
    OverlayPanelModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    CardModule,
    ToastModule,
    BrowserAnimationsModule,
    DialogModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    TooltipModule
  ],
  exports:[BusquedaComponent, InfoComponent],
})
export class SharedModule { }
