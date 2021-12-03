import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { MenubarModule} from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './shared/services/auth/auth.service';
import { AutosModule } from './modules/autos/autos.module';
import { AgendamientosModule } from './modules/agendamientos/agendamientos.module';
import { ServiciosModule } from './modules/servicios/servicios.module';
import { HomeModule } from './modules/home/home.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { MenuModule} from 'primeng/menu';
import { CambiarContrasenaComponent } from './configuraciones/components/cambiar-contrasena/cambiar-contrasena.component';
import { TiposServicioComponent } from './configuraciones/components/tipos-servicio/tipos-servicio.component';
import { InputTextModule} from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './shared/services/auth/token-interceptor/interceptor.service';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ReLoginComponent } from './core/components/re-login/re-login.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { PasswordModule} from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionesComponent,
    CambiarContrasenaComponent,
    TiposServicioComponent,
    ReLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    ButtonModule,
    LoginModule,
    AutosModule,
    ServiciosModule,
    HomeModule,
    UsuariosModule,
    DialogModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayPanelModule,
    AgendamientosModule,
    CardModule,
    SharedModule,
    ToastModule,
    PasswordModule,
    ConfirmDialogModule

  ],
  providers: [AuthService,
    {  provide: HTTP_INTERCEPTORS,
       useClass: InterceptorService,
       multi: true
    },
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
