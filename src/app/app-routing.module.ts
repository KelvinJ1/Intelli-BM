import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AuthGuard } from './auth/auth.guard';
import { EditPocketsComponent } from './edit-pockets/edit-pockets.component';
import { InformeComponent } from './informe/informe.component';
import { LoginComponent } from './login/login.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { NominaComponent } from './nomina/nomina.component';

const routes: Routes = [
{ path: "",redirectTo: "/login",pathMatch:"full"},

{path:"login", component:LoginComponent} ,

{path:"monitoring", component:MonitoringComponent, canActivate: [AuthGuard]}
,
{path:"managment", component:EditPocketsComponent, canActivate: [AuthGuard]},

{path:"payroll", component:NominaComponent,},

{path:"editpockets", component:EditPocketsComponent,},

{path:"add-edit", component:AddEditComponent,},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] //trae el guard para limitar vistas
})
export class AppRoutingModule { }
