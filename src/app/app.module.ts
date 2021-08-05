import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {  HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from './auth/auth.interceptor';
import { InformeComponent } from './informe/informe.component';
import { EditPocketsComponent } from './edit-pockets/edit-pockets.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { NominaComponent } from './nomina/nomina.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideMenuComponent,

    InformeComponent,
    EditPocketsComponent,
    MonitoringComponent,
    NominaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, HttpClientModule, NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
