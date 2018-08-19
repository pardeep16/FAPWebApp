import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackQuestionsService {

  domainName:string="https://easyfeedback.herokuapp.com";
  loadMenteesUrl="/api/v1/easyfeedback/getMentee/";

  constructor(private http:HttpClient) { }

  fetchMenteesData(sprint,user){
    let urlReq=this.domainName+this.loadMenteesUrl+user.emp_id;
    return this.http.get<any>(urlReq).map(dataresp=>{
      return dataresp;
    });
  }



}
