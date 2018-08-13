import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DatafetchfeedbackService {

  constructor(private http:HttpClient) { }

  domainName:string="https://easyfeedback.herokuapp.com";
  fetchfeedbackdata="/api/v1/data/feedback";

  fetchData(user,sprint){

    let urlfetchDta=this.domainName+this.fetchfeedbackdata;
    var jsonBodyData={
      "category":user.category,
      "mentor":user.emp_id,
      "sprint_cyc":sprint
    }
    return this.http.post<any>(urlfetchDta,jsonBodyData).map(response_data=>{
        return response_data;
    });
  }


}
