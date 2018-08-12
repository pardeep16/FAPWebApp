export class ApiUrls {
  domainName:string="https://easyfeedback.herokuapp.com";
  loginUrl:string="";
  loadDashboard="/courselist";

constructor(){

}

  getDomainUrl(){
    return this.domainName;
  }

  getLoginUrl(){
    return this.loginUrl;
  }

  getLoadDashboard(){
    return this.loadDashboard;
  }
}
