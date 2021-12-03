import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NuevoServicioComponent } from './components/nuevo-servicio/nuevo-servicio.component';



@NgModule({
  declarations: [ServiciosComponent, NuevoServicioComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    DialogModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    InputTextareaModule,
    InputNumberModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    SharedModule
  ],
})
export class ServiciosModule { }
