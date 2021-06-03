export class UserManagementRequest {
  public loginName: string;
  private password: string;
  private firstName: string;
  private middleName: string;
  private lastName: string;
  private emailId: string;
  private phoneNo: string;
  private role: string;
  private landingPage: string;
  private companyName: string;
  private userStatus: number;
  public constructor(loginName:string,password:string,firstName:string,middileName:string,lastName:string,emailId:string
    ,phoneNo:string,role:string,landingPage:string,companyName:string,userStatus: number){
      this.loginName= loginName;
      this.password= password;
      this.firstName= firstName;
      this.middleName= middileName;
      this.lastName= lastName;
      this.emailId= emailId;
      this.phoneNo= phoneNo;
      this.role= role;
      this.landingPage= landingPage;
      this.companyName= companyName;
      this.userStatus= userStatus
  }
  public setLoginName(loginName: string) {
    this.loginName = loginName
  }

  public setPassword(password: string) {
    this.password = password
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName
  }

  public setMiddleName(middleName: string) {
    this.middleName = middleName
  }

  public setEmailIdnName(emailId: string) {
    this.emailId = emailId
  }

  public setPhoneNo(phoneNo: string) {
    this.phoneNo = phoneNo
  }

  public setRole(role: string) {
    this.role = role
  }

  public setLandingPage(landingPage: string) {
    this.landingPage = landingPage
  }

  public setCompanyName(companyName: string) {
    this.companyName = companyName
  }
}
