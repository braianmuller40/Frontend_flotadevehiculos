import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
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
  providers:[MessageService]
})
export class LoginModule { }
