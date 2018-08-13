import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { FeedbackDateComponent } from '../../component/feedback-date/feedback-date.component';
import { FeedbackScreenComponent } from '../../component/feedback-screen/feedback-screen.component';
import { DashboardfetchService } from '../../services/dashboardfetch.service';
import { FeedbackQuestionsService } from '../../services/feedback-questions.service';
import { FapRouterModule } from '../../routes/fap-router/fap-router.module';
import { AuthguardService } from '../../services/authguard.service';
import {MatGridListModule,MatSelectModule,MatOptionModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LogoutComponent } from '../../component/logout/logout.component';
import { DataFeedbackComponent } from '../../component/data-feedback/data-feedback.component';
import { DatafetchfeedbackService } from '../../services/datafetchfeedback.service';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    FapRouterModule,
    MatGridListModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatOptionModule,
    NgxSpinnerModule
  ],
  declarations: [DashboardComponent, FeedbackDateComponent, FeedbackScreenComponent, LogoutComponent, DataFeedbackComponent],
  providers: [DashboardfetchService, FeedbackQuestionsService, AuthguardService, DatafetchfeedbackService]
})
export class FapdashboardModule { }
