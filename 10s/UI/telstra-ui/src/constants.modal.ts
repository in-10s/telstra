export class Constants{
  /* API GATEWAY'S API */
  public static CONTEXT_PATH:string="http://localhost:1111";

  /* COMMON API */
  public static COMMON_MICROSERVICE:string="/common";

  /* USER MANAGEMENT MICROSERVICE API */
  public static USER_MANAGEMENT_MICROSERVICE:string="/user-management";
  public static USER_MANAGEMENT_MICROSERVICE_SAVE: string="/save"
  public static USER_MANAGEMENT_MICROSERVICE_ALLUSERDETAILS: string ="/all-user-details";
  public static USER_MANAGEMENT_MICROSERVICE_ROLES_DETAILS: string ="/roles-list";
  public static USER_MANAGEMENT_MICROSERVICE_MODULE_DETAILS: string ="/module-list";

  /* conversion of obj into json */
  public static convertAngularReactiveObjectToJson(obj:any) : any{
     let json= {
                "loginName":obj.value.loginName,
                "password":obj.value.password,
                "firstName":obj.value.firstName,
                "secondName":obj.value.secondName,
                "lastName":obj.value.lastName,
                "emailID":obj.value.emailID,
                "phoneNumber":obj.value.phoneNumber,
                "role":obj.value.role,
                "landingPage":obj.value.landingPage,
                "moduleName":obj.value.moduleName,
                "department":obj.value.department,
                "userStatus":obj.value.userStatus,
                "userType":obj.value.userType
              }
      console.log(":: created json to save :: "+ json)
      return JSON.stringify(json);
  }
}
