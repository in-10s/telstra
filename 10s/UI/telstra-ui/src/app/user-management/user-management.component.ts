import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './user-management.service';
import { Constants } from 'src/constants.modal';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  userForm: FormGroup;
  userDetailList:any;
  roleDetails: any;
  moduleList: any;
  constructor(private userManagementService: UserManagementService) {
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

      'moduleName': new FormControl('', Validators.required),
      'department':  new FormControl('', Validators.required),
      'userStatus' : new FormControl('', Validators.required),
      'userType' : new FormControl('', Validators.required)
    });
  }
 columns= [{
    field: "U_ID",
    width: "190px"
  }, {
    field: "LOGIN_ID",
    title: "User Name",
    width: "190px"
  }, {
    field: "ROLE_ID",
    width: "190px"
  }, {
    field: "ROLE_NAME",
    title: "Role",
    width: "300px"
  },{
    field: "LANDING_PAGE",
    title: "LANDING_PAGE",
     width: "300px"
  },{
    field: 'Actions',
    title: "Actions",
    headerAttributes: {
        style: "padding-left:17px"
    },
    template: "<a href='javascript:void(0)'><i class='editicon' title='Edit' onclick='edituser(this)'></i></a> <a  href='javascript:void(0)'><i class='deleteicon' title='Delete' onclick='deleteuser(this);'></i></a>",
    menu: false,
    width: "300px"
  }
]

  ngOnInit(): void {
  this.getUserDetails();
  this.getRolesList();
  this.getModuleList();
  }

  saveUser(){
    let formArr = JSON.stringify(this.userForm.value);
      console.log("==>>"+ this.userForm.value.loginName);
//loginName:string,password:string,firstName:string,middileName:string,lastName:string,emailId:string
//,phoneNo:string,role:string,landingPage:string,companyName:string,userStatus: number
    //  this.userModel = new UserManagementRequest(this.userForm.value.loginName,this.userForm.value.password,this.userForm.value.firstName,this.userForm.value.middileName,
    //   this.userForm.value.lastName,this.userForm.value.emailId,this.userForm.value.phoneNo,this.userForm.value.role,this.userForm.value.landingPage,
    //   this.userForm.value.companyName,this.userForm.value.userStatus)

      this.userManagementService.saveUserDetails(Constants.convertAngularReactiveObjectToJson(this.userForm)).subscribe((data)=>{
        console.log("::data saved successfully::"+data)
     });
  }

  getUserDetails(){
      this.userManagementService.getUserDetails().subscribe((data)=>{
        console.log("::got user details data ::"+JSON.stringify(data))
        this.userDetailList=data;
     });
  }

  getRolesList(){
    this.userManagementService.getRolesList().subscribe((data)=>{
        this.roleDetails = data;
    });
  }

  getModuleList(){
    this.userManagementService.getModuleList().subscribe((data)=>{
        this.moduleList = data;
    });
  }

}
