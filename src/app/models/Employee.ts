export class Employee{
  private employeeId:string;
  private name:string;
  private category:string;
  private message:string;
  private status:boolean;

  constructor(private employee:string,
  private username:string,
  private m_category:string,
  private m_message:string,
  private m_status:boolean){
    this.category=m_category;
    this.employeeId=employee;
    this.status=m_status;
    this.name=username;
    this.message=m_message;
  }

}
