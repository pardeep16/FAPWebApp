import { Component, OnInit } from '@angular/core';
import { DashboardfetchService } from '../../services/dashboardfetch.service';
import { Employee } from '../../models/Employee';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as crypto from 'crypto-js';
import { FeedbackQuestionsService } from '../../services/feedback-questions.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sprints_cyc = null;
  // sprints_cyc = [
  //   {text: '', color: '#30A9F4'},
  // ];

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

  sprint_over = null;

  selectedSprint: number = this.sprints[0].id;
  selectedGrid: string;

  constructor(private dashboardServices: DashboardfetchService, private spinner: NgxSpinnerService, private router: Router, private feedbackQuestionsService: FeedbackQuestionsService, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.initLoad();
  }

  selectedItem(item) {
    //console.log(item.text);
    if (item.status) {
      //alert("true"+item.text+" "+item.id);
      if (this.sprint_over.indexOf(item.id) == -1) {
        this.requesttoLoadMentee(this.selectedSprint,item.id);
      }
      else {
        //  alert("Input already record!Phase Disabled.")
        this.matSnackBar.open("Input already record!Phase Disabled.", "", {
          duration: 2000,
        });
      }
    }
    else {
      //alert("Phase Not Enabled.Please Request to enable it.");
      this.matSnackBar.open("Input already record!Phase Disabled.", "", {
        duration: 2000,
      });
    }
  }

  initLoad() {
    var encryptObj = localStorage.getItem("currentUser").toString();
    var decryptObj = crypto.AES.decrypt(encryptObj, "fapAppKey2018#");
    var user = JSON.parse(decryptObj.toString(crypto.enc.Utf8));
    this.spinner.show();
    this.dashboardServices.loadInitData(user).subscribe(data => {
      if (data && data.status) {
        //  console.log(data);
        //  alert("response");
        this.spinner.hide();
        this.displaySprints(data);
      }
      else {
        this.spinner.hide();
        this.sprints_cyc = null;
        //  console.log(data);
        alert("No data to display");
      }
    }, error => {
      this.spinner.hide();
      this.sprints_cyc = null;
      alert("No data to display");

    });
  }

  displaySprints(dataresp, sprint?: number) {
    // if(sprint && sprint>1){
    //   let valueSp=sprint-1;
    //   console.log("print "+this.sprints[valueSp].val);
    //   this.selectedSprint=this.sprints[valueSp].val;
    // }
    // else{
    //   console.log("print "+this.sprints[0].val);
    //   this.selectedSprint=this.sprints[0].val;
    // }

    //console.log(dataresp.data);
    var responseStr = dataresp.data;
    //console.log("respo"+responseStr);
    //console.log("length is"+this.sprints_cyc.length);
    this.sprints_cyc = new Array();
    this.sprint_over = new Array();
    for (let i = 0; i < responseStr.length; i++) {
      //console.log(responseStr[i].course_name);
      this.sprints_cyc.push({
        text: responseStr[i].course_name,
        color: '#30A9F4',
        id: responseStr[i].course_id,
        status: responseStr[i].status
      });
      //   this.sprints_cyc[i]={
      //   "text":responseStr[i].course_name,
      //   "color":'#30A9F4',
      //   "id":responseStr[i].course_id
      // }
    }

    this.sprint_over = dataresp.sprint_over;

    //console.log(this.sprints_cyc);
  }

  changeSprint(sprint) {
    //console.log(sprint);
    var encryptObj = localStorage.getItem("currentUser").toString();
    var decryptObj = crypto.AES.decrypt(encryptObj, "fapAppKey2018#");
    var user = JSON.parse(decryptObj.toString(crypto.enc.Utf8));
    this.spinner.show();

    this.dashboardServices.updateDashboard(user, sprint).subscribe(data => {
      if (data && data.status) {
        //  console.log(data);
        //  alert("response");
        this.spinner.hide();
        this.displaySprints(data, sprint.id);
      }
      else {
        this.spinner.hide();
        this.sprints_cyc = null;
        //  console.log(data);
        alert("No data to display");
      }
    }, error => {
      this.spinner.hide();
      this.sprints_cyc = null;
      alert("No data to display");

    });


  }

  requesttoLoadMentee(sprint,id) {
    var encryptObj = localStorage.getItem("currentUser").toString();
    var decryptObj = crypto.AES.decrypt(encryptObj, "fapAppKey2018#");
    var user = JSON.parse(decryptObj.toString(crypto.enc.Utf8));
    this.spinner.show();

    this.feedbackQuestionsService.fetchMenteesData(sprint, user).subscribe(responsedata => {
      if (responsedata && responsedata.status) {
        this.spinner.hide();
        let menteeData = {
          queryParams: {
            "response": JSON.stringify(responsedata),
            "sprint":sprint,
            "mentor":user.emp_id,
            "prg_id":id
          }
        }
        this.router.navigate(['/feedback/form/' + sprint], menteeData);
      }
      else {
        this.spinner.hide();
        this.matSnackBar.open(responsedata.msg, "", {
          duration: 2000
        });
      }
    }, error => {
      this.spinner.hide();
      this.displaySnackBar("Sonething Wrong!Try Again")
    });
  }

  displaySnackBar(message){
    this.matSnackBar.open(message, "", {
      duration: 2000
    });
  }
}
