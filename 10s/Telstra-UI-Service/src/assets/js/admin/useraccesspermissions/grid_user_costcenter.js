/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var userName;
var ccData;
//USER-GRID PERMISSONs FUNCTION                 
function fnExternalCostCenter(obj) {
    currentGird="gridCostCenter";
    $('#gridCostCenter').show();
        $('#gridAccounts').hide();
        $('#gridServices').hide();
        
         $('#saveAccount').hide();
         
        $('#saveServices').hide();
         $('#saveAccount').hide();
    $('#saveCostCenter').show();
    $('.alert').hide();
    var row = $(obj).closest("tr");
    var gridObj = $("#permissions_grid").data("kendoGrid");
    var item = gridObj.dataItem(row);
    var reqData = {};
    reqData.EMAIL_ID = item.EMAIL_ID;
    reqData.AccInfo = false;
    userName = item.LOGIN_ID;
    costcenter_grid.dataSource.data([]);
    displayLoading("#gridCostCenter>div.k-grid-content");

//    procesRequest("externalUsersFetchAction.action", reqData, fnExternalUsersSucc, fnExternalUsersFail);
    var reqData = {};
//        reqData.PID = result[0].PID;
    reqData.U_ID = userName;
    procesRequest("externalUsersCostCenterAction.action", reqData, fnExternalUsersCCSucc, fnExternalUsersCCtFail);

}
//externalUsersFetchAction fail function
function fnExternalUsersFail() {
    showMessage("Error", "User  fetching  failed.", 2);
}



var costcenter_grid = "";
$( document ).ready(function() {
    //displaying records in grid
    costcenter_grid = $("#gridCostCenter").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        dataBound: permit_gridDataBound_cc,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [
            {
                width: 50,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheckCC(this)' id='checkAllServices'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
                template: $("#checkbox_template3").html()

            }, {
                field: "CC_NAME",
                title: "Costcenter name",
                template: '<span style="cursor:default" title="#=CC_NAME#">#=CC_NAME#</span>',
                encoded: false,
                width: 300,
                attribute: {
                    style: "text-align:center"
                }
//            }, {
//                field: "NAME",
//                title: "Account name",
//                template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
//                encoded: false,
//                width: 300,
//                attribute: {
//                    style: "text-align:center"
//                }
//            }, {
//                field: "ACCOUNT_NO",
//                title: "Account number",
//                template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
//                width: 250
            }
        ]
    }).data('kendoGrid');
    costcenter_grid.table.on("click", ".checkbox3", selectRowCC);
});

//testing checkboxes and changing checkAll checkbox
function test_pagechange_CC(e) {
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
function OnCheckAllCheckCC(obj) {
    var isChecked = $(obj).is(':checked');
    var strGridData = JSON.stringify(costcenter_grid._data);
    var objGridData = JSON.parse(strGridData);
    console.log(objGridData);
    alert(isChecked);
    if (isChecked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = costcenter_grid.dataSource.view()[idx];
//            var index = checkedIds_service.indexOf(dataItem);
            var index = isValueInArray(checkedIds_service,dataItem);
            if (index == -1) {
                checkedIds_service.push(dataItem);
                if (dataItem.COUNT == 0) {
                    dataItem.set("COUNT", 1);
                }
            }
            $("#" + objGridData[idx].CC_NAME).prop('checked', true);
        }

    }
    else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = costcenter_grid.dataSource.view()[idx];
//            var index1 = checkedIds_service.indexOf(dataItem1);
            var index1 =isValueInArray(checkedIds_service,dataItem1);
            if (index1 != -1) {
                checkedIds_service.splice(index1, 1);
                if (dataItem1.COUNT != 0) {
                    dataItem1.set("COUNT", 0);
                }
            }
            $("#" + objGridData[idx].CC_NAME).prop('checked', false);
        }
    }
}

var flag = false;
//fnExternalUsersCCtFail success fn ::fetching target pid user accounts and displaying grid
function fnExternalUsersCCSucc(res) {
    var status = JSON.parse(res).objCRSResponse.data[0].status;
    if (status == 'success') {
        checkedIds_service = [];
        flag = false;
        var data = JSON.parse(res).objCRSResponse.data[0].USER_DETAILS;
        ccData = data;
        console.log(data)
        $.each(data, function(i, items) {
            if (items.COUNT > 0) {
                var index = isValueInArray(checkedIds_service,items);
//                var index = checkedIds_service.indexOf(items);
                if (index == -1) {
                    checkedIds_service.push(items);
                }
                flag = true;
            }
        });
         console.log(checkedIds_service)
        $("#divPermissions").on('shown.bs.modal', function() {
            costcenter_grid.setDataSource(new kendo.data.DataSource({
                data: ccData,
                pageSize: 10
            }));
            costcenter_grid.refresh();
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

//fnExternalUsersCCtFail fail function
function fnExternalUsersCCtFail() {
    showMessage("Error", "User accounts fetching failed.", 2);
}

//on databound checking for available records
function permit_gridDataBound_cc(arg) {
    console.log("dataBound")
    kendo.ui.progress($("#gridCostCenter>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#gridCostCenter").find('.k-grid-header colgroup > col').length;
        $("#gridCostCenter").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange_CC(arg.sender._data);
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
    procesRequest("externalUsersServicesFetchtAction.action", reqData, fnCallbackfnExternalUsersCCFetchSucc, fnCallbackfnExternalUsersCCFetchFail);
    displayLoading("#gridCostCenter>div.k-grid-content");
}


//search fn success
function fnCallbackfnExternalUsersCCFetchSucc(res) {
    var status = JSON.parse(res).objCRSResponse.data[0].status;
    if (status == 'success') {
        var result = JSON.parse(res).objCRSResponse.data[0].result;
        costcenter_grid.dataSource.data("");
        $.each(result, function(i, items) {
            for (var j = 0; j < checkedIds_service.length; j++) {
                if (items.CC_NAME == checkedIds_service[j].CC_NAME) {
                    if (result[i].COUNT == '0') {
                        result[i].COUNT = '1';
                    }
                }
            }
            if (items.COUNT > 0) {
                var index = isValueInArray(checkedIds_service,items);
//                var index = checkedIds_service.indexOf(items);
                if (index == -1) {
                    checkedIds_service.push(items);
                }
            }
        });
        costcenter_grid.setDataSource(new kendo.data.DataSource({
            data: result,
            pageSize: 10
        }));
    } else {
        showMessage("Error", "Unable to fetch user details.", 2, 'accAlrt');
    }
}
//search function failure
function fnCallbackfnExternalUsersCCFetchFail() {
    showMessage("Error", "Unable to fetch user details.", 2);
}

//save permitted users accounts   
var checkedIds_service = [];
function saveCostCenter() {
    var reqData = {};
    var accArr = [];
    if (flag) {
        if (checkedIds_service.length == 0) {
            var obj = {};
            obj.U_ID = userName;
            obj.IS_ACC_LEVEL = 2;
            obj.CC_NAME = "";
            objj.CC_ID ="";
            accArr.push(obj);
        } else {
            for (var i = 0; i < checkedIds_service.length; i++) {
                var objj = {};
                objj.U_ID = userName;
                objj.IS_ACC_LEVEL = 2;
                objj.CC_NAME = checkedIds_service[i].CC_NAME;
                objj.CC_ID = checkedIds_service[i].CC_ID;
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
            obj1.IS_ACC_LEVEL = 2;
            obj1.CC_NAME = checkedIds_service[j].CC_NAME;
            obj1.CC_ID = checkedIds_service[j].CC_ID;
            accArr.push(obj1);
        }
    }
    reqData.USER_ACCESS_ACCOUNTS = accArr;
    procesRequest("saveCostCentersAction.action", reqData, fnsaveccsSucc, fnsaveccsFail);
    loadKMask();

}
//save success function
function fnsaveccsSucc(response) {
    console.log(response);
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
function fnsaveccsFail() {
    checkedIds_service = [];
    closeModal();
    showMessage("Error", "Giving account permission to user are failed.", 2);
}

//on click of the checkbox:
function selectRowCC() {
    alert("in select row");
    console.log(checkedIds_service);
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = costcenter_grid.dataItem(row);
    if (checked) {
        var index = isValueInArray(checkedIds_service,dataItem);
//        var index = checkedIds_service.indexOf(dataItem);
        if (index == -1) {
            checkedIds_service.push(dataItem);
            if (dataItem.COUNT == 0) {
                dataItem.set("COUNT", "1");
            }
        }

    } else {
        alert("in else");
        console.log(isValueInArray(checkedIds_service,dataItem));
//        var index1 = checkedIds_service.indexOf(dataItem);
        var index1 = isValueInArray(checkedIds_service,dataItem);
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
        if (val.CC_NAME== arr[z].CC_NAME) {
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
    displayLoading("#gridCostCenter>div.k-grid-content");
    for (var i = 0; i < ccData.length; i++) {
        if (ccData[i].COUNT == '1') {
            ccData[i].COUNT = '0';
        }
//        for(var j=0;j<checkedIds_service.length;j++){
//            if(ccData[i].ACCOUNT_NO == checkedIds_service[j]){
//                if(ccData[i].COUNT == '0'){
//                    ccData[i].COUNT='1';
//                }
//            }
//        }
    }
    checkedIds_service = [];
    costcenter_grid.setDataSource(new kendo.data.DataSource({
        data: ccData,
        pageSize: 10
    }));
}
//closing modal
function closeModal() {
    $("#divPermissions").modal('hide');
    loadKUnMask();
}

