import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChartsComponent } from './charts/charts.component';
import { InformeComponent } from './informe/informe.component';
import { LoginComponent } from './login/login.component';
import { PocketsComponent } from './pockets/pockets.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const routes: Routes = [
{ path: "",redirectTo: "/login",pathMatch:"full"},

{path:"login", component:LoginComponent} ,

{path:"monitoring", component:SideMenuComponent, canActivate: [AuthGuard]}
,
{path:"managment", component:SideMenuComponent, canActivate: [AuthGuard]},

{path:"informe", component:InformeComponent,},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] //trae el guard para limitar vistas
})
export class AppRoutingModule { }
