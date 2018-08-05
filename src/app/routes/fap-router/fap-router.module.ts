import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthguardService } from '../../services/authguard.service';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from '../../component/login/login.component';
import { RegisterComponent } from '../../component/register/register.component';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';

const routes:Routes=[
  {
"path":"dashboard/v1",component:DashboardComponent,canActivate:[AuthguardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class FapRouterModule { }
