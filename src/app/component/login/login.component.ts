import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  private spinnerImp:NgxSpinnerService;

user: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,private spinner:NgxSpinnerService,private loginService:LoginService) {
        this.spinnerImp=spinner;
    }

  ngOnInit() {
    this.loginService.logOut();
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   this.returnUrl='/dashboard/v1';
  }


  login() {
    //  console.log("login");
      this.loading = true;
      this.notValidUser=false;
      this.spinnerImp.show();
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    // }, 1000);

    this.loginService.login(this.user.username, this.user.password).subscribe(data => {
      this.loading = false;
        if (data && data.status) {
          this.router.navigate([this.returnUrl],{replaceUrl:true});
          this.spinnerImp.hide();
        }
        else{

        //  this.notValidUser=true;
          this.spinnerImp.hide();
          this.notValidUser=true;
        }
    }, error => {
    //  console.log("error"+error);
        this.loading = false;
          this.spinnerImp.hide();
    });
  }

}
