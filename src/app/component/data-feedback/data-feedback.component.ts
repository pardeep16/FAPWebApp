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
  private isHidetableheader:boolean=true;

  buildHeaderTable=[];

  fetchData_feedback=[];
  quesIdsGlobal=[];
  console=console;

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




//  formIdsDetails=[];

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
          this.buildTableBody(data);
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
    let menteeDetails=new Array();

    for(var i=0;i<detObj.length;i++){
      let childObj=detObj[i];
      //console.log("mentee :"+childObj.mentee_name.toString().trim());

      if(menteeNames.indexOf(childObj.mentee_name.toString().trim())==-1){
      menteeNames.push(childObj.mentee_name.toString().trim());
      // get all unique mentee and put in header part
        this.buildHeaderTable.push({
          "name":childObj.mentee_name.toString().trim(),
          "mentee_id":childObj.mentee_id.toString().trim()
        });
    }

    }

    //console.log(menteeNames);
    this.isHidetableheader=false;

    // for(var i=0;i<menteeNames.length;i++){
    //   this.buildHeaderTable.push({
    //     "name":menteeNames[i]
    //   });
    // }


  }
  catch(except){
    console.log(except);
  }
  }

  buildTableBody(data){
    try{
      let quesids=[];
      let quesIdData=[];
      let menteeDetails=[];
      let feedbackDateData=[];
        // step first get all form ids and there program names
        let sprintFeedbackIds=data.sprint_cyc;

        for(var i=0;i<sprintFeedbackIds.length;i++){
          let mform_id=""+sprintFeedbackIds[i].form_id;
          let mprg_id=""+sprintFeedbackIds[i].prg_id;
          let feedbackData=data.fb_detail_data_group_formid;
          //console.log("feedback data"+feedbackData);
          var formIdData=feedbackData[mform_id];
          //console.log("form "+mform_id);
          //console.log(mprg_id);
          //console.log("feedback data"+JSON.stringify(data));

          //console.log(formIdData);

          quesids=new Array();
          quesIdData=new Array();
          for(var j=0;j<formIdData.length;j++){
            if(quesids.indexOf(formIdData[j].ques_id)==-1){
              quesids.push(formIdData[j].ques_id);
          //    console.log("ques id :"+formIdData[j].ques_id);
              quesIdData.push({
                "ques_id":""+formIdData[j].ques_id,
                "question":formIdData[j].question
              });
            }
          }
        //  console.log("question Id Data :"+quesIdData[0].ques_id);
          // get mentee Details
          let feedback_detail_data=data.fb_detail_data_group_qid;
          //console.log("feedbackdetail data "+feedback_detail_data);
          menteeDetails=new Array();
          menteeDetails=feedback_detail_data[mform_id];

          let sharedateData=data.feedback_share_date_data;
          if(mform_id in sharedateData){
            feedbackDateData=new Array();
            feedbackDateData=sharedateData[mform_id];
          }
          else{
            feedbackDateData=null;
          }

          //get program name
          let prgData=data.prg_data;
          let prgDataObj=prgData[mprg_id];
        //  console.log("prg data"+prgDataObj[0].prg_name);






          this.fetchData_feedback.push({
            "form_id":mform_id,
            "prg_id":mprg_id,
            "prg_name":prgDataObj[0].prg_name.toString().trim(),
            "feedbacksharedate_data":feedbackDateData,
            "questions_data":quesIdData,
            "menteeData":menteeDetails
          })
        }
        console.log(this.fetchData_feedback);

        // for(var i=0;i<this.fetchData_feedback.length;i++){
        //
        // }

    }
    catch(exception){
      console.log(exception);
    }
  }

}
