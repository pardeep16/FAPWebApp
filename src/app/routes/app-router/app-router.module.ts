import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from '../../component/login/login.component';
import { RegisterComponent } from '../../component/register/register.component';


const routes:Routes=[
  {
    "path":'',"component":LoginComponent
  }
  // {
  //   "path":'register',"component":RegisterComponent
  // }
];
@NgModule({
  exports:[RouterModule],
  imports: [
  RouterModule.forRoot(routes)
],
  declarations: []
})
export class AppRouterModule { }
