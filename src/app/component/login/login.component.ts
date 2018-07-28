import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private username: string;
  loading: boolean = false;
  returnUrl: string;
  private notValidUser : boolean=false;

user: any = {};

  constructor() { }

  ngOnInit() {
  }


  login() {
    //  console.log("login");
      this.loading = true;
      this.notValidUser=false;
    // this.authservice.login(this.user.username, this.user.password).subscribe(data => {
    //   this.loading = false;
    //     if (data && data.status) {
    //       this.router.navigate([this.returnUrl],{replaceUrl:true});
    //     }
    //     else{
    //
    //       this.notValidUser=true;
    //     }
    // }, error => {
    // //  console.log("error"+error);
    //     this.loading = false;
    // });
  }

}
