import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagementRequest } from 'src/app/modals/UserManagementRequest.modal';
import { UserManagerService } from './user-manager.service';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  userForm: FormGroup;
  userDetailList:any;
  constructor(private userManagementService: UserManagerService ) {
    this.userForm = new FormGroup({
      'loginName' : new FormControl('', Validators.required),
      'password':  new FormControl('', Validators.required),
      'firstName': new FormControl('', Validators.required),

      'secondName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'emailID': new FormControl('', Validators.required),

      'phoneNumber': new FormControl('', Validators.required),
      'role':  new FormControl('', Validators.required),
      'landingPage': new FormControl('', Validators.required),

      'companyName': new FormControl('', Validators.required),
      'department':  new FormControl('', Validators.required),
      'userType' : new FormControl('', Validators.required)
    });
  }
 columns= [{
    field: "U_ID",
    hidden: true,
    width: 190
}, {
    field: "LOGIN_ID",
    title: "User Name",
    width: 190
}, {
    field: "ROLE_ID",
    hidden: true,
    width: 190
}, {
    field: "ROLE_NAME",
    title: "Role",
    width: 190
},{
    field: "LANDING_PAGE",
    title: "LANDING_PAGE",
    hidden: true
},{
    title: 'Actions',
    headerAttributes: {
        style: "padding-left:17px"
    },
    template: "<a href='javascript:void(0)'><i class='editicon' title='Edit' onclick='edituser(this)'></i></a> <a  href='javascript:void(0)'><i class='deleteicon' title='Delete' onclick='deleteuser(this);'></i></a>",
    menu: false,
    width: 190
}
]

  ngOnInit(): void {
  this.getUserDetails();
  }

  saveUser(){
    let formArr = JSON.stringify(this.userForm.value);
      console.log("==>>"+ this.userForm.value.loginName);
//loginName:string,password:string,firstName:string,middileName:string,lastName:string,emailId:string
//,phoneNo:string,role:string,landingPage:string,companyName:string,userStatus: number
    // this.userModel = new UserManagementRequest(this.userForm.value.loginName,this.userForm.value.password,this.userForm.value.firstName,this.userForm.value.middileName,
     // this.userForm.value.lastName,this.userForm.value.emailId,this.userForm.value.phoneNo,this.userForm.value.role,this.userForm.value.landingPage,
      //this.userForm.value.companyName,this.userForm.value.userStatus)
      this.userManagementService.saveUserDetails(formArr).subscribe((data)=>{
        console.log("::data saved successfully::"+data)
     });
  }

  getUserDetails(){
      this.userManagementService.getUserDetails().subscribe((data)=>{
        console.log("::got user details data ::"+JSON.stringify(data))
        this.userDetailList=data;
     });
  }

}
