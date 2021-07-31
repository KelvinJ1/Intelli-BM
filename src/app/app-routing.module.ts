import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PocketsComponent } from './pockets/pockets.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const routes: Routes = [
{ path: "",
redirectTo: "/login",
pathMatch:"full"
},

{
path: "login", 
component:LoginComponent
},

{
  path: "monitoring", 
  component:SideMenuComponent
  }
,
{
  path: "pockets", 
  component:PocketsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
