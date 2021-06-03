import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/constants.modal';
import { UserManagementRequest } from 'src/app/modals/UserManagementRequest.modal';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private httpClient: HttpClient) {
  }
   /* user-management api */
   public saveUserDetails(payload: any){
     console.log("inside service class ==>>"+ JSON.stringify(payload));
     let data=JSON.stringify(payload)
     const headerOptions = new HttpHeaders();
     headerOptions.append('Content-Type', 'application/json');
    return this.httpClient.post(Constants.CONTEXT_PATH+Constants.USER_MANAGEMENT_MICROSERVICE+Constants.USER_MANAGEMENT_MICROSERVICE_SAVE,data, {headers: headerOptions} );
  }

  public getUserDetails(){
   return this.httpClient.get(Constants.CONTEXT_PATH+Constants.USER_MANAGEMENT_MICROSERVICE+Constants.USER_MANAGEMENT_MICROSERVICE_ALLUSERDETAILS);
 }
}
