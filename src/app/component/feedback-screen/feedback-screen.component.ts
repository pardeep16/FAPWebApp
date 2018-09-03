import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as crypto from 'crypto-js';
import * as groupArray from 'group-array';
import { FeedbackQuestionsService } from '../../services/feedback-questions.service';
import { MatSnackBar } from '@angular/material';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-feedback-screen',
  templateUrl: './feedback-screen.component.html',
  styleUrls: ['./feedback-screen.component.css']
})
export class FeedbackScreenComponent implements OnInit {

  menteeData=null;
  mentor_id:string=null;
  prg_id:number=null;
  sprint_no:number=null;
  preQuestions=null;
  sharedDates=null;
  sharedDates_temp=null;
  feedback_mentee_Questions=null;
  isPreQuestionsDisplay:boolean=false;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private spinner:NgxSpinnerService,private feedbackQuestionsService:FeedbackQuestionsService,private snackBar:MatSnackBar,private datePipe:DatePipe) {
    this.activatedRoute.queryParams.subscribe(params=>{
      let data=JSON.stringify(params["response"]);
      //console.log("data is "+JSON.parse(data));
      this.menteeData=JSON.parse(data);
      this.mentor_id=params['mentor'];
      this.sprint_no=params['sprint'];
      this.prg_id=params['prg_id'];
    })
  }

  ngOnInit() {
    if(this.menteeData && this.mentor_id && this.prg_id){
      this.loadData();
    }
    else{
      this.router.navigate(['/'],{replaceUrl:true});
    }
  }

  loadData(){
    var encryptObj = localStorage.getItem("currentUser").toString();
    var decryptObj = crypto.AES.decrypt(encryptObj, "fapAppKey2018#");
    var user = JSON.parse(decryptObj.toString(crypto.enc.Utf8));
    this.spinner.show();
    if(this.mentor_id.trim()==user.emp_id){
      //  this.spinner.hide();
        //this.displayCustomMessage("true");
        this.sprintPhaseFirstReq(this.mentor_id,this.sprint_no,this.prg_id);

    }
    else{
      this.spinner.hide();
      this.displayCustomMessage("Invalid Request!Heaader Changed");
      this.router.navigate(['/'],{replaceUrl:true});
    }
  }

  displayCustomMessage(message){
    // this.snackBar.open(message, "", {
    //   duration: 2000,
    // });

    setTimeout(() => {
    this.snackBar.open(message, 'Cancel', {
      duration: 2500
    });
});
  }

  sprintPhaseFirstReq(m_id,sprint,prg){
      this.feedbackQuestionsService.checkSprintPhase(m_id,sprint,prg).subscribe(dataresp=>{
        console.log(dataresp);
        if(dataresp && dataresp.status){

          //this.displayCustomMessage("true");
          this.displaySprintForm(this.mentor_id,this.prg_id);
        }
        else{
          this.spinner.hide();
          this.displayCustomMessage("Some Problem occured!Try Again");
          this.router.navigate(['/dashboard/v1'],{replaceUrl:true});
        }
      });
  }

  displaySprintForm(m_id,prg_id){
    this.preQuestions=null;
    this.feedback_mentee_Questions=null;
    this.feedbackQuestionsService.loadFeedbackFormData(m_id,prg_id).subscribe(dataresp=>{
      if(dataresp && dataresp.status){
          this.preQuestions=new Array();
          this.feedback_mentee_Questions=new Array();

          // check date share questions
          let preQuestions=dataresp.prequestions;
          if(preQuestions.length>0){
            this.sharedDates=new Array();
            this.sharedDates_temp=new Array();
            this.isPreQuestionsDisplay=true;
            this.preQuestions=preQuestions;

            for (var i=0;i<preQuestions.length;i++){
              this.sharedDates.push({
                "id":preQuestions[i].id,
                "planned_date":"",
                "actual_date":"",
                "question":preQuestions[i].question
              });
              this.sharedDates_temp.push({
                "id":preQuestions[i].id,
                "planned_date":"",
                "actual_date":"",
                "question":preQuestions[i].question
              });

            }
          }
          else{
            this.isPreQuestionsDisplay=false;
          }
      }
      else{

      }

      //check other Questions
      let questionsArr=dataresp.questions;
      let optionsArr=groupArray(dataresp.options,"question_id");
      //console.log("options group"+JSON.stringify(optionsArr));
      for(var x=0;x<questionsArr.length;x++){
        let q_id=""+questionsArr[x].question_id;
        let optionsParse=optionsArr[q_id];
      //  console.log(optionsParse);
        this.feedback_mentee_Questions.push({
          "ques_id":questionsArr[x].question_id,
          "question":questionsArr[x].question,
          "total_options":questionsArr[x].totaloptions,
          "options":optionsParse[0].options
        });
      }
      //console.log(this.preQuestions);
      //console.log(this.feedback_mentee_Questions);
      this.spinner.hide();


    },error=>{
      this.spinner.hide();
      this.displayCustomMessage("Some Problem occured!Try Again");
      this.router.navigate(['/dashboard/v1'],{replaceUrl:true});
    });
  }

  maxDateShow(){
    let date=new Date();
    return date;

  }

  // changeDate(event,n){
  //   console.log(n);
  //   console.log(this.sharedDates[n].planned_date);
  // }

  plannedDateChanged(newdate,n){
    let dd=this.datePipe.transform(newdate,'dd-MM-yyyy');
    this.sharedDates[n].planned_date=dd;
    //console.log(dd);
    //console.log("index "+n+" planned_date :"+this.sharedDates[n].planned_date);
  }

  actualDateChanged(newdate,n){
    let dd=this.datePipe.transform(newdate,'dd-MM-yyyy');
    this.sharedDates[n].actual_date=dd;
    //console.log(dd);
    //console.log("index "+n+" planned_date :"+this.sharedDates[n].actual_date);
  }

}
