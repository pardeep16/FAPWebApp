import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private domainUrl: string='https://easyfeedback.herokuapp.com';

  constructor(private http: HttpClient) { }


  login(username: string,password :string){
    var data={ emp_id: username, password: password };
    //   return this.sendRequestToLoginApi(data,(user)=> {
    //     if(user.isvalid && user.status){
    //         localStorage.setItem('currentUser',user);
    //     }
    //     return user;
    // });

    return this.http.post<any>(this.domainUrl+'/api/v1/signin',data).map(returdata=>{
      //console.log(returdata);
    //  console.log(JSON.stringify(returdata));
      if(returdata && returdata.status){
            //  console.log("set");
               localStorage.setItem('currentUser',returdata);
       }
      return returdata;
    });


  }

  logOut(){
    console.log("logout");
    localStorage.removeItem('currentUser');
  }

  sendRequestToLoginApi(data,callback){
      this.http.post<any>(this.domainUrl+'/api/v1/signin',data).map(returdata=>{
        console.log(JSON.stringify(returdata));
          callback(JSON.stringify(returdata));
      });
  }

}
