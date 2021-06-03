/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var userName;
var servicesData;
//USER-GRID PERMISSONs FUNCTION                 
function fnExternalCTNS(obj) {
    currentGird = "gridServices";
    $('#gridServices').show();
    $('#gridAccounts').hide();
    $('#gridCostCenter').hide();
    $('#saveAccount').hide();
    $('#saveCostCenter').hide();

    $('#saveServices').show();

    $('.alert').hide();
    var row = $(obj).closest("tr");
    var gridObj = $("#permissions_grid").data("kendoGrid");
    var item = gridObj.dataItem(row);
    var reqData = {};
    reqData.EMAIL_ID = item.EMAIL_ID;
    reqData.AccInfo = false;
    userName = item.LOGIN_ID;
    service_grid.dataSource.data([]);
    displayLoading("#gridServices>div.k-grid-content");

//    procesRequest("externalUsersFetchAction.action", reqData, fnExternalUsersSucc, fnExternalUsersFail);
    var reqData = {};
//        reqData.PID = result[0].PID;
    reqData.U_ID = userName;
    debugger;
    procesRequest("externalUsersServicesAction.action", reqData, fnExternalUsersServicesSucc, fnExternalUsersAccountFail);

}
//externalUsersFetchAction fail function
function fnExternalUsersFail() {
    showMessage("Error", "User  fetching  failed.", 2);
}

//externalUsersFetchAction:::fetching target user pid and pidname success function 
function fnExternalUsersSucc(response) {
    var status = JSON.parse(response).objCRSResponse.data[0].status;
    if (status == 'success') {
        $("#accName").val("");
        $("#accNo").val("");
        $('#customerName').html("");
        $('#divPermissions').hide();
        $('#divPermissions1').on('shown.bs.modal', function() {
            $(document).off('focusin.modal');
        })
//        var result = JSON.parse(response).objCRSResponse.data[0].USER_DETAILS;
        //        for(var i=0;i<result.length;i++){
        //            $("#customerName").append( $("<option>").val(result[i].PID).html(result[i].PID_NAME));
        //        }
//        $("#customerName").append($("<option>").val(result[0].PID).html(result[0].PID_NAME));
        var reqData = {};
//        reqData.PID = result[0].PID;
        reqData.U_ID = userName;
        debugger;
        procesRequest("externalUsersServicesAction.action", reqData, fnExternalUsersServicesSucc, fnExternalUsersAccountFail);
    } else {
        showMessage("Error", "User  fetching  failed.", 2);
    }
}

var service_grid = "";
$(document).ready(function() {
    //displaying records in grid
    service_grid = $("#gridServices").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        dataBound: permit_gridDataBound_services,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [
            {
                width: 50,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheck(this)' id='checkAllServices'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
                template: $("#checkbox_template2").html()

            }, {
                field: "SERVICE NO",
                title: "Service no",
                template: '<span style="cursor:default" title="#=CTN#">#=CTN#</span>',
                encoded: false,
                width: 300,
                attribute: {
                    style: "text-align:center"
                }
            }, {
                field: "NAME",
                title: "Account name",
                template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
                encoded: false,
                width: 300,
                attribute: {
                    style: "text-align:center"
                }
            }, {
                field: "ACCOUNT_NO",
                title: "Account number",
                template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
                width: 250
            }
        ]
    }).data('kendoGrid');
    service_grid.table.on("click", ".checkbox2", selectRowServices);
});

//testing checkboxes and changing checkAll checkbox
function test_pagechange_services(e) {
    console.log("test_pagechange_services")
    var count = 0;
    var view = e;
    for (var k = 0; k < view.length; k++) {
        if (view[k].COUNT == 1) {
            count++
        }
    }
    if (count == view.length) {
        $("#checkAllServices").prop('checked', true);
    } else {
        $("#checkAllServices").prop('checked', false);
    }
    if (view.length == 0) {
        $("#checkAllServices").prop('checked', false);
    }
}

//selectAll checkbox on click event
function OnCheckAllCheck(obj) {
    alert("oncheck all");
    var isChecked = $(obj).is(':checked');
    var strGridData = JSON.stringify(service_grid._data);
    var objGridData = JSON.parse(strGridData);
    console.log(objGridData);
    alert(isChecked);
    if (isChecked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = service_grid.dataSource.view()[idx];
//            var index = checkedIds_service.indexOf(dataItem);
            var index = isValueInArray(checkedIds_service, dataItem);
            if (index == -1) {
                checkedIds_service.push(dataItem);
                if (dataItem.COUNT == 0) {
                    dataItem.set("COUNT", 1);
                }
            }
            $("#" + objGridData[idx].CTN).prop('checked', true);
        }

    }
    else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = service_grid.dataSource.view()[idx];
//            var index1 = checkedIds_service.indexOf(dataItem1);
            var index1 = isValueInArray(checkedIds_service, dataItem1);
            if (index1 != -1) {
                checkedIds_service.splice(index1, 1);
                if (dataItem1.COUNT != 0) {
                    dataItem1.set("COUNT", 0);
                }
            }
            $("#" + objGridData[idx].CTN).prop('checked', false);
        }
    }
}

var flag = false;
//fnExternalUsersAccountFail success fn ::fetching target pid user accounts and displaying grid
function fnExternalUsersServicesSucc(res) {
    debugger;
    var status = JSON.parse(res).objCRSResponse.data[0].status;
    if (status == 'success') {
        checkedIds_service = [];
        flag = false;
        var data = JSON.parse(res).objCRSResponse.data[0].USER_DETAILS;
        servicesData = data;
        console.log(data)
        $.each(data, function(i, items) {
            if (items.COUNT > 0) {
                var index = isValueInArray(checkedIds_service, items);
//                var index = checkedIds_service.indexOf(items);
                if (index == -1) {
                    checkedIds_service.push(items);
                }
                flag = true;
            }
        });
        console.log(checkedIds_service)
        $("#divPermissions").on('shown.bs.modal', function() {
            service_grid.setDataSource(new kendo.data.DataSource({
                data: servicesData,
                pageSize: 10
            }));
            service_grid.refresh();
        });
        loadModal('divPermissions');
        //	var width=( jQuery('body').width());
        //         $("#divPermissions").modal({
        //            backdrop: 'static'
        //        });
        //	$('.modal-open').css('width',width);
    } else {
        showMessage("Error", "User accounts fetching failed.", 2);
    }
}

//fnExternalUsersAccountFail fail function
function fnExternalUsersAccountFail() {
    showMessage("Error", "User accounts fetching failed.", 2);
}

//on databound checking for available records
function permit_gridDataBound_services(arg) {
    console.log("dataBound")
    kendo.ui.progress($("#gridServices>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#gridServices").find('.k-grid-header colgroup > col').length;
        $("#gridServices").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange_services(arg.sender._data);
}

//Search criteria function  for accounts
function serachServices() {
    var reqData = {};
    var name = $('#accName').val();
    var accno = $('#accNo').val();
    var cname = $('#customerName').val();
    reqData.ACCOUNT_NO = accno;
    reqData.NAME = name;
    reqData.PID = cname;
    reqData.U_ID = userName;
    procesRequest("externalUsersServicesFetchtAction.action", reqData, fnCallbackfnExternalUsersServicesFetchSucc, fnCallbackfnExternalUsersAccFetchFail);
    displayLoading("#gridServices>div.k-grid-content");
}


//search fn success
function fnCallbackfnExternalUsersServicesFetchSucc(res) {
    var status = JSON.parse(res).objCRSResponse.data[0].status;
    if (status == 'success') {
        var result = JSON.parse(res).objCRSResponse.data[0].result;
        service_grid.dataSource.data("");
        $.each(result, function(i, items) {
            for (var j = 0; j < checkedIds_service.length; j++) {
                if (items.CTN == checkedIds_service[j].CTN) {
                    if (result[i].COUNT == '0') {
                        result[i].COUNT = '1';
                    }
                }
            }
            if (items.COUNT > 0) {
                var index = isValueInArray(checkedIds_service, items);
//                var index = checkedIds_service.indexOf(items);
                if (index == -1) {
                    checkedIds_service.push(items);
                }
            }
        });
        service_grid.setDataSource(new kendo.data.DataSource({
            data: result,
            pageSize: 10
        }));
    } else {
        showMessage("Error", "Unable to fetch user details.", 2, 'accAlrt');
    }
}
//search function failure
function fnCallbackfnExternalUsersAccFetchFail() {
    showMessage("Error", "Unable to fetch user details.", 2);
}

//save permitted users accounts   
var checkedIds_service = [];
function saveServices() {
    var reqData = {};
    var accArr = [];
    if (flag) {
        if (checkedIds_service.length == 0) {
            var obj = {};
            obj.U_ID = userName;
            obj.IS_ACC_LEVEL = 0;
            obj.CTN = "";
            accArr.push(obj);
        } else {
            for (var i = 0; i < checkedIds_service.length; i++) {
                var objj = {};
                objj.U_ID = userName;
                objj.IS_ACC_LEVEL = 0;
                objj.CTN = checkedIds_service[i].CTN;
                objj.ACCOUNT_NO = checkedIds_service[i].ACCOUNT_NO;
                accArr.push(objj);
            }
        }
    } else {
        if (checkedIds_service.length == 0) {
            $("#divPermissions").modal('hide');
            return;
        }
        for (var j = 0; j < checkedIds_service.length; j++) {
            var obj1 = {};
            obj1.U_ID = userName;
            obj1.IS_ACC_LEVEL = 0;
            obj1.CTN = checkedIds_service[j].CTN;
            obj1.ACCOUNT_NO = checkedIds_service[j].ACCOUNT_NO;
            accArr.push(obj1);
        }
    }
    reqData.USER_ACCESS_ACCOUNTS = accArr;
    procesRequest("saveServicesAction.action", reqData, fnsaveAccsSucc, fnsaveAccsFail);
    loadKMask();

}
//save success function
function fnsaveAccsSucc(response) {
    checkedIds_service = [];
    closeModal();
    var result = JSON.parse(response).objCRSResponse.data[0].response;
    if (result == 'success') {
        showMessage("Success", "Account permissions are successfully given to the user.", 1);
    } else if (result == 'deletesuccess') {
        showMessage("Success", "Account permissions are successfully removed for the user.", 1);
    } else {
        showMessage("Error", "Giving account permission to user are failed.", 2);
    }

}
//save failure function
function fnsaveAccsFail() {
    checkedIds_service = [];
    closeModal();
    showMessage("Error", "Giving account permission to user are failed.", 2);
}

//on click of the checkbox:
function selectRowServices() {
    alert("in select row");
    console.log(checkedIds_service);
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = service_grid.dataItem(row);
    if (checked) {
        var index = isValueInArray(checkedIds_service, dataItem);
//        var index = checkedIds_service.indexOf(dataItem);
        if (index == -1) {
            checkedIds_service.push(dataItem);
            if (dataItem.COUNT == 0) {
                dataItem.set("COUNT", "1");
            }
        }

    } else {
        alert("in else");
        console.log(isValueInArray(checkedIds_service, dataItem));
//        var index1 = checkedIds_service.indexOf(dataItem);
        var index1 = isValueInArray(checkedIds_service, dataItem);
        if (index1 != -1) {
            // flag=false;
            checkedIds_service.splice(index1, 1);
            if (dataItem.COUNT != 0) {
                dataItem.set("COUNT", "0");
            }
        }
    }
    console.log(checkedIds_service);
}

function isValueInArray(arr, val) {
    var inArray = -1;
    for (var z = 0; z < arr.length; z++) {
        if (val.CTN == arr[z].CTN) {
            inArray = z;
            break;
        }
    }
    return inArray;
}


//clear button click
function clearAccounts() {
    $("#accName").val("");
    $("#accNo").val("");
    displayLoading("#gridServices>div.k-grid-content");
    for (var i = 0; i < servicesData.length; i++) {
        if (servicesData[i].COUNT == '1') {
            servicesData[i].COUNT = '0';
        }
//        for(var j=0;j<checkedIds_service.length;j++){
//            if(servicesData[i].ACCOUNT_NO == checkedIds_service[j]){
//                if(servicesData[i].COUNT == '0'){
//                    servicesData[i].COUNT='1';
//                }
//            }
//        }
    }
    checkedIds_service = [];
    service_grid.setDataSource(new kendo.data.DataSource({
        data: servicesData,
        pageSize: 10
    }));
}
//closing modal
function closeModal() {
    $("#divPermissions").modal('hide');
    loadKUnMask();
}

