import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import {MenubarModule} from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './shared/services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    ButtonModule,
    LoginModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
