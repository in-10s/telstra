
var userName;
var accountsData;
var currentGird;


//USER-GRID PERMISSONs FUNCTION                 
function fnExternalUsers(obj) {
    currentGird="gridAccounts";
    $('#gridServices').hide();
    $('#gridCostCenter').hide();
    $('#gridAccounts').show();
        
    $('#saveAccount').show();
    $('#saveServices').hide();
    $('#saveCostCenter').hide();
    $('.alert').hide();
    var row = $(obj).closest("tr");
    var gridObj = $("#permissions_grid").data("kendoGrid");
    var item = gridObj.dataItem(row);
    var reqData = {};
    userName = item.LOGIN_ID;
    reqData.U_ID = item.LOGIN_ID;
    reqData.AccInfo=true;
    //    reqData.U_ID = userName;
    $('#divPermissions1').hide();
    $('#divPermissions').on('shown.bs.modal', function() {
        $(document).off('focusin.modal');
    })
    accounts_grid.dataSource.data([]);
    displayLoading("#gridAccounts>div.k-grid-content");  

    procesRequest("externalUsersAccountAction.action", reqData, fnExternalUsersAccountSucc, fnExternalUsersFail);

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
        $('#divPermissions').on('shown.bs.modal', function() {
            $(document).off('focusin.modal');
        })
        var result = JSON.parse(response).objCRSResponse.data[0].USER_DETAILS;
        //        for(var i=0;i<result.length;i++){
        //            $("#customerName").append( $("<option>").val(result[i].PID).html(result[i].PID_NAME));
        //        }
//        $("#customerName").append($("<option>").val(result[0].PID).html(result[0].PID_NAME));
        var reqData = {};
//        reqData.PID = result[0].PID;
        reqData.U_ID = userName;
        procesRequest("externalUsersAccountAction.action", reqData, fnExternalUsersAccountSucc, fnExternalUsersAccountFail);
    } else {
        showMessage("Error", "User  fetching  failed.", 2);
    }
}

var accounts_grid = "";

$( document ).ready(function() {
    accounts_grid = $("#gridAccounts").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        dataBound: permit_gridDataBound,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [
            {
                width: 50,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheck(this)' id='checkAll'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
                template: $("#checkbox_template1").html()

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
    accounts_grid.table.on("click", ".checkbox1", selectRow);
});
//function loadAccounts() {
//    
//    //displaying records in grid
//    accounts_grid = $("#gridAccounts").kendoGrid({
//        dataSource: {
//            pageSize: 10
//        },
//        sortable: true,
//        reorderable: true,
//        resizable: true,
//        dataBound: permit_gridDataBound,
//        filterable: true,
//        columnMenu: true,
//        pageable: true,
//        columns: [
//            {
//                width: 50,
//                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheck(this)' id='checkAll'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
//                template: $("#checkbox_template1").html()
//
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
//            }
//        ]
//    }).data('kendoGrid');
//    accounts_grid.table.on("click", ".checkbox1", selectRow);
//}

//testing checkboxes and changing checkAll checkbox
function test_pagechange(e) {
    var count = 0;
    var view = e;
    for (var k = 0; k < view.length; k++) {
        if (view[k].COUNT == 1) {
            count++
        }
    }
    if (count == view.length) {
        $("#checkAll").prop('checked', true);
    } else {
        $("#checkAll").prop('checked', false);
    }
    if (view.length == 0) {
        $("#checkAll").prop('checked', false);
    }
}

//selectAll checkbox on click event
function OnCheckAllCheck(obj) {
    alert("inside fn");
    console.log($(obj));
    var isChecked=$(obj).is(':checked');
    alert(isChecked)
    var strGridData = JSON.stringify(accounts_grid._data);
    var objGridData = JSON.parse(strGridData);
    if (isChecked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = accounts_grid.dataSource.view()[idx];
            var index = checkedIds.indexOf(objGridData[idx].ACCOUNT_NO);
            if (index == -1) {
                checkedIds.push(objGridData[idx].ACCOUNT_NO);
                if (dataItem.COUNT == 0) {
                    dataItem.set("COUNT", 1);
                }
            }
            $("#" + objGridData[idx].ACCOUNT_NO).prop('checked', true);
        }

    }
    else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = accounts_grid.dataSource.view()[idx];
            var index1 = checkedIds.indexOf(objGridData[idx].ACCOUNT_NO);
            if (index1 != -1) {
                checkedIds.splice(index1, 1);
                if (dataItem1.COUNT != 0) {
                    dataItem1.set("COUNT", 0);
                }
            }
            $("#" + objGridData[idx].ACCOUNT_NO).prop('checked', false);
        }
    }
}

var flag = false;
//fnExternalUsersAccountFail success fn ::fetching target pid user accounts and displaying grid
function fnExternalUsersAccountSucc(res) {
    var status = JSON.parse(res).objCRSResponse.data[0].status;
    if (status == 'success') {
        checkedIds = [];
        flag = false;
        var data = JSON.parse(res).objCRSResponse.data[0].USER_DETAILS;
        accountsData = data;
        $.each(data, function(i, items) {
            if (items.COUNT > 0) {
                var index = checkedIds.indexOf(items.ACCOUNT_NO);
                if (index == -1) {
                    checkedIds.push(items.ACCOUNT_NO);
                }
                flag = true;
            }
        });
        $("#divPermissions").on('shown.bs.modal', function() {
            accounts_grid.setDataSource(new kendo.data.DataSource({
                data: accountsData,
                pageSize: 10
            }));
            accounts_grid.refresh();
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
function permit_gridDataBound(arg) {
    kendo.ui.progress($("#gridAccounts>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#gridAccounts").find('.k-grid-header colgroup > col').length;
        $("#gridAccounts").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange(arg.sender._data);
}

function filterData(){
    if(currentGird==="gridAccounts")
    {
        serachAccounts();
    }else
    {   
        alert("services");
        serachServices();
    }
}
//Search criteria function  for accounts
function serachAccounts() {
    var reqData = {};
    var name = $('#accName').val();
    var accno = $('#accNo').val();
    var cname = $('#customerName').val();
    reqData.ACCOUNT_NO = accno;
    reqData.NAME = name;
    reqData.PID = cname;
    reqData.U_ID = userName;
    procesRequest("externalUsersAccFetchtAction.action", reqData, fnCallbackfnExternalUsersAccFetchSucc, fnCallbackfnExternalUsersAccFetchFail);
    displayLoading("#gridAccounts>div.k-grid-content");
}


//search fn success
function fnCallbackfnExternalUsersAccFetchSucc(res) {
    var status = JSON.parse(res).objCRSResponse.data[0].status;
    if (status == 'success') {
        var result = JSON.parse(res).objCRSResponse.data[0].result;
        accounts_grid.dataSource.data("");
        $.each(result, function(i, items) {
            for (var j = 0; j < checkedIds.length; j++) {
                if (items.ACCOUNT_NO == checkedIds[j]) {
                    if (result[i].COUNT == '0') {
                        result[i].COUNT = '1';
                    }
                }
            }
            if (items.COUNT > 0) {
                var index = checkedIds.indexOf(items.ACCOUNT_NO);
                if (index == -1) {
                    checkedIds.push(items.ACCOUNT_NO);
                }
            }
        });
        accounts_grid.setDataSource(new kendo.data.DataSource({
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
var checkedIds = [];
function save() {
    var reqData = {};
    var accArr = [];
    if (flag) {
        if (checkedIds.length == 0) {
            var obj = {};
            obj.U_ID = userName;
            obj.IS_ACC_LEVEL = 1
            obj.ACCOUNT_NO = "";
            accArr.push(obj);
        } else {
            for (var i = 0; i < checkedIds.length; i++) {
                var objj = {};
                objj.U_ID = userName;
                objj.IS_ACC_LEVEL = 1;
                objj.ACCOUNT_NO = checkedIds[i];
                accArr.push(objj);
            }
        }
    } else {
        if (checkedIds.length == 0) {
            $("#divPermissions").modal('hide');
            return;
        }
        for (var j = 0; j < checkedIds.length; j++) {
            var obj1 = {};
            obj1.U_ID = userName;
            obj1.IS_ACC_LEVEL = 1;
            obj1.ACCOUNT_NO = checkedIds[j];
            accArr.push(obj1);
        }
    }
    reqData.USER_ACCESS_ACCOUNTS = accArr;
    procesRequest("saveAccountsAction.action", reqData, fnsaveAccsSucc, fnsaveAccsFail);
    loadKMask();

}
//save success function
function fnsaveAccsSucc(response) {
    checkedIds = [];
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
    checkedIds = [];
    closeModal();
    showMessage("Error", "Giving account permission to user are failed.", 2);
}

//on click of the checkbox:
function selectRow() {
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = accounts_grid.dataItem(row);
    if (checked) {
        var index = checkedIds.indexOf(dataItem.ACCOUNT_NO);
        if (index == -1) {
            checkedIds.push(dataItem.ACCOUNT_NO);
            if (dataItem.COUNT == 0) {
                dataItem.set("COUNT", 1);
            }
        }

    } else {
        var index1 = checkedIds.indexOf(dataItem.ACCOUNT_NO);
        if (index1 != -1) {
            // flag=false;
            checkedIds.splice(index1, 1);
            if (dataItem.COUNT != 0) {
                dataItem.set("COUNT", 0);
            }
        }
    }
}

//clear button click
function clearAccounts() {
    $("#accName").val("");
    $("#accNo").val("");
    displayLoading("#gridAccounts>div.k-grid-content");
    for (var i = 0; i < accountsData.length; i++) {
        if (accountsData[i].COUNT == '1') {
            accountsData[i].COUNT = '0';
        }
    }
    checkedIds = [];
    accounts_grid.setDataSource(new kendo.data.DataSource({
        data: accountsData,
        pageSize: 10
    }));
}
//closing modal
function closeModal() {
    $("#divPermissions").modal('hide');
    loadKUnMask();
}