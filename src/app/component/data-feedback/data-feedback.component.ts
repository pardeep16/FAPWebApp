import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as crypto from 'crypto-js';
import { DatafetchfeedbackService } from '../../services/datafetchfeedback.service';

@Component({
  selector: 'app-data-feedback',
  templateUrl: './data-feedback.component.html',
  styleUrls: ['./data-feedback.component.css']
})
export class DataFeedbackComponent implements OnInit {
  private selectedSprint:number;
  private isShowtableheader:boolean=true;

  buildHeaderTable=[];

  fetchData_feedback=[];

  sprints = [{
  "id": 1,
  "val": "Sprint 1"
}, {
  "id": 2,
  "val": "Sprint 2"
}, {
  "id": 3,
  "val": "Sprint 3"
}, {
  "id": 4,
  "val": "Sprint 4"
}, {
  "id": 5,
  "val": "Sprint 5"
}, {
  "id": 6,
  "val": "Sprint 6"
}];

  constructor(private spinner:NgxSpinnerService,private datafetchfeedback:DatafetchfeedbackService) { }

  ngOnInit() {
  }


  changeSprint(sprint){
   //console.log(sprint);
   this.selectedSprint=sprint;
  }

  fetchfeedBackData(event){
    var encryptObj=localStorage.getItem("currentUser").toString();
    var decryptObj=crypto.AES.decrypt(encryptObj,"fapAppKey2018#");
    var user=JSON.parse(decryptObj.toString(crypto.enc.Utf8));

   if(this.selectedSprint>=1){
     this.spinner.show();
     this.datafetchfeedback.fetchData(user,this.selectedSprint).subscribe(data=>{
         if(data && data.status){
           this.spinner.hide();
          // console.log(data);
          this.buildCustomHeader(data);
         }
         else{
           this.spinner.hide();
           alert(data.msg);
         }
     },error=>{
       this.spinner.hide();
       alert(error);
     });
   }
   else{
     alert("Please select Sprint");
   }
  }

  buildCustomHeader(data){
    console.log("buildCustomHeader");
    let feedbackformKey=data.feedbackform;
    let totalMentee;
    let formidsObj=data.sprint_cyc;
    try{
    let formidFirst=""+formidsObj[0].form_id;
  //  console.log("formidsObj "+formidFirst);

    if(feedbackformKey && feedbackformKey.length>0){
      let firstObj=feedbackformKey[0];
    //  console.log(firstObj);
      totalMentee=firstObj[formidFirst].total_mentee;
    //  console.log("total mentee "+totalMentee);
    }

    let feedbackdetObj=data.fb_detail_data_group_formid;
    let detObj=feedbackdetObj[formidFirst];
    let menteeNames=new Array();

    for(var i=0;i<detObj.length;i++){
      let childObj=detObj[i];
      //console.log("mentee :"+childObj.mentee_name.toString().trim());

      if(menteeNames.indexOf(childObj.mentee_name.toString().trim())==-1){
      menteeNames.push(childObj.mentee_name.toString().trim());
    }

    }

    console.log(menteeNames);

    
  }
  catch(except){
    console.log(except);
  }
  }

}
