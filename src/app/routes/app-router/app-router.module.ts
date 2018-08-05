import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from '../../component/login/login.component';
import { RegisterComponent } from '../../component/register/register.component';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { AuthguardService } from '../../services/authguard.service';
const routes:Routes=[
  {
    "path":'',"component":LoginComponent
  },
  // {
  //   "path":'register',"component":RegisterComponent
  // }

  {
    "path":"dashboard/v1","component":DashboardComponent,canActivate:[AuthguardService]
  }
];
@NgModule({
  exports:[RouterModule],
  imports: [
  RouterModule.forRoot(routes)
],
  declarations: []
})
export class AppRouterModule { }
