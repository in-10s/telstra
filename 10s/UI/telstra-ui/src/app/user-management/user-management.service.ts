import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/constants.modal';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private httpClient: HttpClient) { }
  /* user-management api */
  public saveUserDetails(payload: any){
   console.log("inside service class ==>>"+ JSON.stringify(payload));
   let data=JSON.stringify(payload)
   const headers = new HttpHeaders({'Content-Type':'application/json;'});
   headers.append('Origin', 'http://localhost:4200');
   return this.httpClient.post(Constants.CONTEXT_PATH+Constants.USER_MANAGEMENT_MICROSERVICE+Constants.USER_MANAGEMENT_MICROSERVICE_SAVE,data, {headers} );
}

public getUserDetails(){
 return this.httpClient.get(Constants.CONTEXT_PATH+Constants.USER_MANAGEMENT_MICROSERVICE+Constants.USER_MANAGEMENT_MICROSERVICE_ALLUSERDETAILS);
}

public getRolesList(){
  return this.httpClient.get(Constants.CONTEXT_PATH+Constants.USER_MANAGEMENT_MICROSERVICE+Constants.USER_MANAGEMENT_MICROSERVICE_ROLES_DETAILS);
}

public getModuleList(){
    return this.httpClient.get(Constants.CONTEXT_PATH+Constants.USER_MANAGEMENT_MICROSERVICE+Constants.USER_MANAGEMENT_MICROSERVICE_MODULE_DETAILS);
}
}
