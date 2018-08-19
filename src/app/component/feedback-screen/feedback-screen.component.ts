import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as crypto from 'crypto-js';
import { FeedbackQuestionsService } from '../../services/feedback-questions.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(private activatedRoute:ActivatedRoute,private spinner:NgxSpinnerService,private feedbackQuestionsService:FeedbackQuestionsService,private snackBar:MatSnackBar) {
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
    this.loadData();
  }

  loadData(){
    var encryptObj = localStorage.getItem("currentUser").toString();
    var decryptObj = crypto.AES.decrypt(encryptObj, "fapAppKey2018#");
    var user = JSON.parse(decryptObj.toString(crypto.enc.Utf8));
    this.spinner.show();
    if(this.mentor_id.trim()==user.emp_id){
        this.spinner.hide();
        this.displayCustomMessage("true");
    }
    else{
      this.spinner.hide();
      this.displayCustomMessage("Invalid Request!Heaader Changed");
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

}
