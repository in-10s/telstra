/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function initusermanager() {

    loadUserManagerData();
}
var users_grid = "";
//GRID CREATION+

function loadUserManagerData() {
    // $("#service_combobox_of_upload_payment").change();

    loadKUnMask();
    users_grid = $("#users_grid").kendoGrid({
        height: 440,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
//        dataBound: permissiongridDataBound,
        pageable: {
            pageSize: 10
        },
        columns: [{
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
    }).data("kendoGrid");
    var reqData = {};
    reqData.LOGIN_ID = 'sysadmin';
    procesRequest("FetchUsers.action", reqData, fnfetchuserssucc, fnfetchUsersFail, true);

}

var updtuid = "";
function edituser(rowdata) {

    document.getElementById("unexists1").style.display = "none";
    var row = $(rowdata).closest("tr");
    var dataItem = users_grid.dataItem(row);
    loadEditLandingPage(dataItem.ROLE_ID);
    updtuid = dataItem.U_ID;
    document.getElementById("login_name1").value = dataItem.LOGIN_ID;
    document.getElementById("first_name1").value = dataItem.FIRST_NAME;
    document.getElementById("middle_name1").value = dataItem.MIDDLE_NAME;
    document.getElementById("last_name1").value = dataItem.LAST_NAME;
    document.getElementById("email_id1").value = dataItem.EMAIL_ID;
    document.getElementById("mobile_no1").value = dataItem.MOBILE_NO;
    if (dataItem.USER_TYPE == "1") {
        $("[name=user_type_edit]").val(["1"]);
    } else {
        $("[name=user_type_edit]").val(["2"]);
    }
    $('#rolelist1').val(dataItem.ROLE_ID);
    removecss1();
    if ($.trim(dataItem.STATUS) == "1") {
        $('#activeid2').attr('class', 'buttonhdbtov');

    } else {
        $('#inactiveid2').attr('class', 'buttonhdbtov');
    }
     $('#landingEditPage').val(dataItem.LANDING_PAGE)
    $("#divEdit").modal('show');
}
function updateuserdetails() {
    if (document.getElementById("first_name1").value == "") {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "First Name is Mandatory";

    } else if (!(/^[A-Za-z]+$/.test(document.getElementById("first_name1").value))) {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "First Name Should Contain alphabets";

    }
//    else if (document.getElementById("middle_name1").value == "") {
//        document.getElementById("unexists1").style.display = "inline";
//        document.getElementById("unexists1").innerHTML = "Middle Name is Mandatory";
//
//    }
//    else if (!(/^[A-Za-z ]+$/.test(document.getElementById("middle_name1").value))) {
//        document.getElementById("unexists1").style.display = "inline";
//        document.getElementById("unexists1").innerHTML = "Middle Name Should Contain alphabets";
//
//    }
    else if (document.getElementById("last_name1").value == "") {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "Last Name is Mandatory";
    } else if (!(/^[A-Za-z]+$/.test(document.getElementById("last_name1").value))) {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "Last Name Should Contain alphabets";

    } else if (document.getElementById("email_id1").value == "") {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "Email is Mandatory";

    } else if ((document.getElementById("email_id1").value.toString().indexOf("@")) == -1) {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "Invalid Email Id";

    } else if (document.getElementById("mobile_no1").value == "") {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "Phone Number is Mandatory";

    } else if ($('#rolelist1').val() == null) {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "please Select Role";
    } else if (!(/^\d{10}$/.test(document.getElementById("mobile_no1").value))) {
        document.getElementById("unexists1").style.display = "inline";
        document.getElementById("unexists1").innerHTML = "Phone number must be 10 numbers";
    } else {
        var ReqData = new Object();
        ReqData.u_id = updtuid;
        ReqData.login_name = document.getElementById("login_name1").value;
        ReqData.first_name = document.getElementById("first_name1").value;
        ReqData.middle_name = document.getElementById("middle_name1").value;
        ReqData.last_name = document.getElementById("last_name1").value;
        ReqData.mobile_no = document.getElementById("mobile_no1").value;
        ReqData.email_id = document.getElementById("email_id1").value;
        ReqData.role_id = $('#rolelist1').val();
        ReqData.user_type = $("input[name='user_type_edit']:checked").val();
        ReqData.LANDING_PAGE = $('#landingEditPage').val();
        ReqData.userstatus = $('#activeid2').attr('class') == "buttonhdbtov" ? "1" : "0";
        procesRequest("updateUserManagerDetails.action", ReqData, fnupdateuserSucc, fnupdateuserFail, false);
    }
}
function fnupdateuserSucc(response)
{

    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        document.getElementById("edituserfrm").reset();
        showMessage("Success", "User Updated successfully", 1);
        $("#divEdit").modal('hide');
        loadUserManagerData();
    } else {
        showMessage("Error", "Unable to update user details.", 2);
    }
}
function fnupdateuserFail()
{

    showMessage("Error", "Unable to update user details.", 2);
}

function fnfetchuserssucc(response)
{
    var res=JSON.parse(response);
    var status = res.objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var usersdata = result.objCRSResponse.data;
        users_grid.setDataSource(new kendo.data.DataSource({
            data: usersdata,
            pageSize: 10
        }));
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
function fnfetchUsersFail()
{
    showMessage("Error", "Unable to fetch user details.", 2);
}


