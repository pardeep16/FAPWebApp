import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { FeedbackDateComponent } from '../../component/feedback-date/feedback-date.component';
import { FeedbackScreenComponent } from '../../component/feedback-screen/feedback-screen.component';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import { DashboardfetchService } from '../../services/dashboardfetch.service';
import { FeedbackQuestionsService } from '../../services/feedback-questions.service';
import { FapRouterModule } from '../../routes/fap-router/fap-router.module';


@NgModule({
  imports: [
    CommonModule,
    FapRouterModule
  ],
  declarations: [DashboardComponent, FeedbackDateComponent, FeedbackScreenComponent],
  providers: [LoginService, RegisterService, DashboardfetchService, FeedbackQuestionsService]
})
export class FapdashboardModule { }
