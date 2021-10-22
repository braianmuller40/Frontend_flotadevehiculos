import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import {MenubarModule} from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './shared/services/auth/auth.service';
import { AutosModule } from './modules/autos/autos.module';
import { AgendamientosModule } from './modules/agendamientos/agendamientos.module';
import { ServiciosModule } from './modules/servicios/servicios.module';
import { HomeModule } from './modules/home/home.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';


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
    LoginModule,
    AutosModule,
    AgendamientosModule,
    ServiciosModule,
    HomeModule,
    UsuariosModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
