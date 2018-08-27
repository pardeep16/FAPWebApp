import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as crypto from 'crypto-js';

@Injectable()
export class LoginService {
  private domainUrl: string='https://fap.techpryde.site';

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
            //console.log(returdata);
            //alert("hello");
            var encryptData=crypto.AES.encrypt(JSON.stringify(returdata),'fapAppKey2018#');
            localStorage.setItem('currentUser',encryptData);
       }
      return returdata;
    });


  }

  logOut(){
    //console.log("logout");
    localStorage.removeItem('currentUser');
  }

  sendRequestToLoginApi(data,callback){
      this.http.post<any>(this.domainUrl+'/api/v1/signin',data).map(returdata=>{
        console.log(JSON.stringify(returdata));
          callback(JSON.stringify(returdata));
      });
  }

}
