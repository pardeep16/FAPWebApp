import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackQuestionsService {

  domainName:string="https://fap.techpryde.site";
  loadMenteesUrl="/api/v1/easyfeedback/getMentee/";
  feedbackStatusUrl="/api/v1/feedbackstatus";


  constructor(private http:HttpClient) { }

  fetchMenteesData(sprint,user){
    let urlReq=this.domainName+this.loadMenteesUrl+user.emp_id;
    return this.http.get<any>(urlReq).map(dataresp=>{
      return dataresp;
    });
  }

  checkSprintPhase(m_id,sprint,prgid){
    let datajson={
      "mentor_id":m_id,
      "sprint":sprint,
      "prg_id":prgid
    }
    var urlCheck=this.domainName+this.feedbackStatusUrl;
    return this.http.post<any>(urlCheck,datajson).map(responsedata=>{
      return responsedata;
    })
  }

  loadFeedbackFormData(m_id,prg_id){
    let loadFeedbackQuesUrl=this.domainName+"/quizes/"+prg_id;
    return this.http.get<any>(loadFeedbackQuesUrl).map(dataresponse=>{
      return dataresponse;
    });
  }



}
