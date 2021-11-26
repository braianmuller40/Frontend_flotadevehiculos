import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamientosComponent } from './agendamientos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { NuevoAgendamientoComponent } from './components/nuevo-agendamiento/nuevo-agendamiento.component';
import { InfoRelationComponent } from './components/info-relation/info-relation.component';
import {CalendarModule} from 'primeng/calendar';



@NgModule({
  declarations: [AgendamientosComponent, NuevoAgendamientoComponent, InfoRelationComponent],
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
    SharedModule,
    CalendarModule
  ]
})
export class AgendamientosModule { }
