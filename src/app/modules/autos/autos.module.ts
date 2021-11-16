import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosComponent } from './autos.component';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule} from 'primeng/paginator';
import { DialogModule} from 'primeng/dialog';
import { NuevoAutoComponent } from './components/nuevo-auto/nuevo-auto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { OverlayPanelModule} from 'primeng/overlaypanel';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AutosComponent, NuevoAutoComponent],
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
    SharedModule
    
  ]
})
export class AutosModule { }
