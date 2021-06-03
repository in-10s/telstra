
function init(custID)
{
    var reqData = {};
    reqData.PID=custID;
    procesRequest("fetchUsersPermissionAction.action",reqData,fnCallbackFetchUsersSucc,fnCallbackFetchUsersFail);
}

//fetchUsersPermissionAction success::USER-GRID DATA LOADING FUNCTION
function fnCallbackFetchUsersSucc(response)
{
    var status=JSON.parse(response).objCRSResponse.data[0].status;
    if(status == 'success'){ 
        var result=JSON.parse(response);
        var sData = result.objCRSResponse.data[0].result;
        permit_grid.setDataSource(new kendo.data.DataSource({
            data: sData,
            pageSize:10
        }));
    }else{
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
//fetchUsersPermissionAction failure :::USER-GRID DATA LOADING FAILURE FUNCTION
function fnCallbackFetchUsersFail()
{
    showMessage("Error", "Unable to fetch user details.", 2);
}
var permit_grid="";
//GRID CREATION
function loadData(){
    loadKUnMask();
    permit_grid=$("#permissions_grid").kendoGrid({
        height: 440,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        dataBound:permissiongridDataBound,
        pageable: {
            pageSize:10
        },
        columns: [ {
            field: "NAME",
            title: "Name",
            template: '<span style="cursor:default" title="#=NAME#">#=NAME#</span>',
            width: 190
        },  {
            field: "LOGIN ID",
            title: "Login Id",
            template: '<span style="cursor:default" title="#=LOGIN_ID#">#=LOGIN_ID#</span>',
            width: 190
        },  {
            field: "EMAIL_ID",
            title: "Email id",
            template: '<span style="cursor:default" title="#=EMAIL_ID#">#=EMAIL_ID#</span>',
            width: 125
        },{
            title:'Actions',
            headerAttributes:{
                style: "padding-left:17px"
            },
            template:$("#permission_icon_template").html() ,
            menu:false,
            width: 190
        }
        ]
    }).data("kendoGrid");
    displayLoading("#permissions_grid>div.k-grid-content");
   // loadAccounts();
    
}

//on databound checking for available records
function permissiongridDataBound(arg){
    kendo.ui.progress( $("#permissions_grid>div.k-grid-content"), false);
    if(arg.sender._data.length == 0){
        var colCount = $("#permissions_grid").find('.k-grid-header colgroup > col').length;
        $("#permissions_grid").find('.k-grid-content tbody')
        .append('<tr class="kendo-data-row"><td colspan="' +
            colCount +
            '" style="text-align:center"><b>No records found</b></td></tr>');
    }
}


//USER-GRID VIEW FUNCTION
function fnUserView(obj){
    var row = $(obj).closest("tr");
    var item = permit_grid.dataItem(row);
    var reqData = {};
    reqData.EMAIL_ID=item.LOGIN_ID;
    procesRequest("viewUsersPermissionAction.action",reqData,fnCallbackfetchUsersSucc,fnCallbackfetchUsersFail);
}

//viewUsersPermissionAction success:::USER-GRID VIEW PROCEEREQUEST SUCCESS FUNCTION
function fnCallbackfetchUsersSucc(res)
{    
    //var width=( jQuery('body').width());
    
    var status=JSON.parse(res).objCRSResponse.data[0].status;
    if(status == 'success'){ 
        try{
            var userDetails_UM = JSON.parse(res).objCRSResponse.data[0].USER_DETAILS_UM;
            document.getElementById('FIRST_NAME').innerHTML=userDetails_UM[0].FIRST_NAME;
            document.getElementById('LAST_NAME').innerHTML=userDetails_UM[0].LAST_NAME;
            var roles = userDetails_UM[0].ROLES;
            document.getElementById('ext-gen1055').innerHTML=roles.substr(0,roles.length-2);
            document.getElementById('EMAIL_ID').innerHTML=userDetails_UM[0].EMAIL_ID;
           
    
        }catch(e){
            showMessage("Error", "Exception in proceesing user details.", 2);
        }finally{
            loadModal('divView');
//            $("#divView").modal({
//                backdrop: 'static'
//            });
//             $('.modal-open').css('width',width);
        }
    }else{
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
//USER-GRID VIEW PROCEEREQUEST FAILURE FUNCTION
function fnCallbackfetchUsersFail()
{
    showMessage("Error", "Unable to fetch user details.", 2);
}


//USER-PERMISSION GRID SEARCH
function searchUser(){
    var uid=$('#emailID').val();
    var name=$('#Name').val();
//    var isInternal=$('#IS_INTERNAL').val();
    var reqData={};
    reqData.FIRST_NAME=name;
    reqData.EMAIL_ID=uid;
//    if(isInternal == "External"){
        reqData.IS_INTERNAL='0';
//    }else if(isInternal == "Internal"){
//        reqData.IS_INTERNAL ='1';
//    }else{
//        reqData.IS_INTERNAL ='All';
//    }
    procesRequest("searchUsersAction.action",reqData,fnCallbackSearchUsersSucc,fnCallbackSearchUsersFail);
    displayLoading("#permissions_grid>div.k-grid-content");
}
//searchUsersAction success fn
function fnCallbackSearchUsersSucc(response){
    var status=JSON.parse(response).objCRSResponse.data[0].status;
    if(status == 'success'){ 
        var result=JSON.parse(response);
        var sData = result.objCRSResponse.data[0].result;
        permit_grid.setDataSource(new kendo.data.DataSource({
            data: sData,
            pageSize:10
        }));
        permit_grid.refresh();
    }else{
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
//searchUsersAction failure function 
function fnCallbackSearchUsersFail(){
    showMessage("Error", "Unable to fetch user details.", 2);
}