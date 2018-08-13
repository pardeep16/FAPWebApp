import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class DashboardfetchService {

  domainName:string="https://easyfeedback.herokuapp.com";
  loadDashboard="/courselist";

  constructor(private http:HttpClient) { }

  loadInitData(data){
    let loadStr=this.loadDashboard+"?category="+data.category+"&mentor="+data.emp_id+"&sprint=1";
    let urlString=this.domainName+loadStr;
  //  console.log(urlString);
    return this.http.get<any>(urlString).map(datacb=>{
      if(datacb && datacb.status){
      //  localStorage.setItem('sprintdata',datacb);
      }
      return datacb;
    });
  }

  updateDashboard(data,sprint:number){
    let loadStr=this.loadDashboard+"?category="+data.category+"&mentor="+data.emp_id+"&sprint="+sprint;
    let urlString=this.domainName+loadStr;
    //console.log(urlString);
    return this.http.get<any>(urlString).map(datacb=>{
      if(datacb && datacb.status){
      //  localStorage.setItem('sprintdata',datacb);
      }
      return datacb;
    });
  }

}
