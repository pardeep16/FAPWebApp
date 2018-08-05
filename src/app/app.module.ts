import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FapdashboardModule } from './modules/fapdashboard/fapdashboard.module';
import { AppRouterModule } from './routes/app-router/app-router.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    FapdashboardModule,
    AppRouterModule,
    NgxSpinnerModule
  ],
  providers: [LoginService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
