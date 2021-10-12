import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers:[MessageService]
})
export class LoginModule { }
