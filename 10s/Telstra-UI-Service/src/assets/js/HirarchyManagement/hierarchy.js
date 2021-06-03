
var renderDivId = '';
var movingCompnyNode = '';
var movingAccount = '';
var selectedCompnyNode = '';
var movingAccounts = [];
var accounts = {};
var accountGrid = ""
var checkeRows1 = [];
var accounts_grid = "";
var compIdGlobal = "";
var checkedAccountsForDelink = [];
function loadTreeAjaxCall() {
    var reqData = new Object();
    var treeData = [];
    var strURLaction = "loadHirarchy.action";
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData(strURLaction, reqData, true);
    ajaxObj.submit(function(res) {
        //alert('res ::'+res.toSource())
        if (res == null) {
            return;
        }

        // alert('res.success :'+res.success);
        if (res != null) {
            if (res.success == true) {
                treeData = res.data;
                loadHirarchyTree(treeData);
            } else
            {
                alert('Unable to load the hirarchy data');
            }
        }
    });
}

//function loadHirarchyTree(treeData) {
//    var kendotree = $("#treeview1").data("kendoTreeView");
//    kendotree.dataSource.data(treeData);
//}


function loadAccountsGridByComapnyID() {
    var reqParams = new Object();
    if (typeof (Storage) == "undefined") {
        alert("browser not supported");
    } else {
        reqParams.COMPANY_ID = localStorage.getItem("COMPANY_ID");
//         localStorage.getItem("lastname");
var companyName=localStorage.getItem("COMPANY_NAME");
$("#page-title-dynamic-id").text(companyName);
    }
//    alert("comapny id :"+reqData.COMPANY_ID );
    procesRequest("loadAccountData.action", reqParams, loadAccountsSuccess, loadAccountsFail);

//    var ajaxObj = new JQueryAjaxCall();
//    ajaxObj.addData("loadAccountData.action", reqData, true);
//    ajaxObj.submit(function (res) {
//        if (res == null) {
//            return;
//        }
//
//        // alert('res.success :'+res.success);
//        if (res != null) {
//            if (res.success == true) {
//                treeData = res.data;
//                loadHirarchyTree(treeData);
//            } else
//            {
//                alert('Unable to load the hirarchy data');
//            }
//        }
//    });
}

function getGrid(divId) {

    if (divId == "") {
        return null;
    }
    renderDivId = divId;

    accountGrid = $("#" + divId).kendoGrid({
        pageable: true,
        scrollable: true,
        dataSource: {
            data: accounts,
            groupable: true,
            schema: {
                model: {
                    fields: {
                        COMPANY_ID: {
                            type: "string"
                        },
                        ACCOUNT_NAME: {
                            type: "string"
                        },
                        ACCOUNT_NO: {
                            type: "string"
                        },
                        STATUS: {
                            type: "string"
                        },
                        SERVICE_TYPE: {
                           type: "string" 
                        },
                        Action: {
                            type: "celleHtml"

                        }
                    }
                }
            },
            pageSize: 10
        },
        height: 500,
        autoBind: false,
        sortable: true,
        reorderable: true,
        id: 'gridId',
        resizable: true,
        columnMenu: true,
        dataBound: permit_accountGrid_gridDataBound,
        columns: [
            {
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='allViewPointGrid'></span>",
                template: $("#viewPointsGrid_template1").html(),
                menu: false,
                width: "50px"
            },
            {
                field: "COMPANY_ID",
                title: "COMPANY_ID",
//                width: 200,
                encoded: false,
                hidden: true
            },
            {
                field: "ACCOUNT_NAME",
                title: "Account Name",
//                width: 200,
                encoded: false,
                 template: $("#customerAccountGridNameTemplate").html()
                // template: $("#checkbox_template").html()
            }, {
                field: "ACCOUNT_NO",
                title: "Account Number",
//                width: 200,
                encoded: false,
                 template: $("#customerAccountGridNumberTemplate").html()
//                template: $("#accountno_template").html()
            },
//            {
//                field: "CCODE",
//                title: "Cost Code",
//                width: 140,
//                encoded: false,
//                template: $("#customerCostCodeGridNumberTemplate").html()
//            },
            {
                field: "SERVICE_TYPE",
                title: "Service Type",
//                width: 200,
                encoded: false,
                template: $("#customerAccountGridServiceTypeTemplate").html()
            },{
                field: "Action",
                title: "Actions",
//                width: 200,
                encoded: false,
                attributes: {
                    "class": "action"
                },
                template: " <a data-toggle='modal'  onclick='fnMoveAccount(this);'><i class='move_icon' title='Move'></i></a> \n\
                <a href='\\#' onclick='fnDelinkAccount(this);'><i class='delink_icon' title='Delink'></i></a>"
            }
        ],
        filterable: {
            extra: false,
            operators: {
                string: {
                    equals: "="
                            //neq: "!="
                },
                number: {
                    eq: "=",
                    gt: "Greater than",
                    lt: "less than"
                },
                date: {
                    on: "on",
                    before: "before",
                    after: "after"
                }
            }
        }
    }).data("kendoGrid");
    accountGrid.table.on("click", ".checkbox1", onAllAccGridRowSelect);



}


function fnMoveCheckedAccount() {
    var checkedAccounts = [];
    var row;
    var grid;
    var dataItem;
    var account = {};
    var checkedValidAccounts = true;
    debugger;
    $.each($("input[name='accountname']:checked"), function() {
        row = $(this).closest("tr");
        grid = $("#" + renderDivId).data("kendoGrid");
        dataItem = grid.dataItem(row);
        account = {};
        // account.MOVE_COMPANY_ID = movingCompnyNode;
        selectedCompnyNode = dataItem.COMPANY_ID;
        account.CURRENT_COMPANY_ID = dataItem.COMPANY_ID;
        account.ACCOUNT_NO = dataItem.ACCOUNT_NO;
        checkedAccounts.push(account);

    });
    if (checkedAccounts.length > 0) {
        $('#divMove').modal("show");
        var reqParams = {};
        movingAccounts = checkedAccounts;
        procesRequest("moveAccount.action", reqParams, movedAcionSucess, movedActionFail);
         procesRequest("loadHirarchy.action", reqParams, loadPopupTreeSuccess, loadPopupTreeFail);
    } else {
         $('#divMove').modal("hide");
        showMessage("Error", "Please select account", 3);
        return;
    }
   
}

function addAccount2Customer() {
//    if (compIdGlobal == "") {
//        showMessage("Warning", "Please select customer", 2);
//        return;
//    }
    if($("#accName"))
        $("#accName").val("");
    if($("#accNo"))
        $("#accNo").val("");
    if($("#type"))
        $("#type").val("");
    compIdGlobal=localStorage.getItem("COMPANY_ID");
    accounts_grid = $("#gridAccounts").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        dataBound: permit_gridDataBound1,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [
            {
                width: 50,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheck(this)' id='checkAll'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
                template: $("#checkbox_template1").html()

            },
            {
                field: "ACCOUNT_NO",
                title: "Account number",
                template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
                width: 200
            },     
            {
                field: "ACCOUNT_NAME",
                title: "Account name",
                template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
                encoded: false,
                width: 200,
                attribute: {
                    style: "text-align:center"
                }
            }, 
            {
                field: "SERVICE_TYPE",
                title: "Service type",
                template:$("#customerAccountGridServiceTypeTemplate").html(),
                encoded: false,
                width: 200,
                attribute: {
                    style: "text-align:center"
                }
            }
        ]
    }).data('kendoGrid');
    accounts_grid.table.on("click", ".checkbox1", selectRow);
    currentGird = "gridAccounts";
    $('#gridAccounts').show();

    $('#saveAccount').show();
    $('.alert').hide();
//    var row = $(obj).closest("tr");
    var gridObj = $("#permissions_grid").data("kendoGrid");
//    var item = gridObj.dataItem(row);
    var reqData = {};
//    userName = item.LOGIN_ID;
//    reqData.U_ID = item.LOGIN_ID;
//    reqData.AccInfo=true;
//    //    reqData.U_ID = userName;
    $('#divPermissions1').hide();
    $('#divPermissions').on('shown.bs.modal', function() {
        $(document).off('focusin.modal');
    })
    accounts_grid.dataSource.data([]);
    displayLoading("#gridAccounts>div.k-grid-content");

    procesRequest("addAccount2Customer.action", reqData, fnExternalUsersAccountSucc, fnExternalUsersFail);



}

function fnAddAccount_cust() {
//    if (compIdGlobal == "") {
//        showMessage("Warning", "Please select customer", 2);
//        return;
//    }
    if($("#accName"))
        $("#accName").val("");
    if($("#accNo"))
        $("#accNo").val("");
    if($("#type"))
        $("#type").val("");
    compIdGlobal=localStorage.getItem("COMPANY_ID");
    accounts_grid = $("#gridAccounts").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        dataBound: permit_gridDataBound1,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [
            {
                width: 50,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheck(this)' id='checkAll'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
                template: $("#checkbox_template1").html()

            },
            {
                field: "ACCOUNT_NO",
                title: "Account number",
                template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
                width: 200
            },     
            {
                field: "ACCOUNT_NAME",
                title: "Account name",
                template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
                encoded: false,
                width: 200,
                attribute: {
                    style: "text-align:center"
                }
            }, 
            {
                field: "SERVICE_TYPE",
                title: "Service type",
                template:$("#customerAccountGridServiceTypeTemplate").html(),
                encoded: false,
                width: 200,
                attribute: {
                    style: "text-align:center"
                }
            }
        ]
    }).data('kendoGrid');
    accounts_grid.table.on("click", ".checkbox1", selectRow);
    currentGird = "gridAccounts";
    $('#gridAccounts').show();

    $('#saveAccount').show();
    $('.alert').hide();
//    var row = $(obj).closest("tr");
    var gridObj = $("#permissions_grid").data("kendoGrid");
//    var item = gridObj.dataItem(row);
    var reqData = {};
//    userName = item.LOGIN_ID;
//    reqData.U_ID = item.LOGIN_ID;
//    reqData.AccInfo=true;
//    //    reqData.U_ID = userName;
    $('#divPermissions1').hide();
    $('#divPermissions').on('shown.bs.modal', function() {
        $(document).off('focusin.modal');
    })
    accounts_grid.dataSource.data([]);
    displayLoading("#gridAccounts>div.k-grid-content");

    procesRequest("searchOrphanAccounts.action", reqData, fnExternalUsersAccountSucc, fnExternalUsersFail);



}

//externalUsersFetchAction fail function
function fnExternalUsersFail() {
    showMessage("Error", "User  fetching  failed.", 2);
}
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
    var isChecked = $(obj).is(':checked');
    var strGridData = JSON.stringify(accounts_grid._data);
    var objGridData = JSON.parse(strGridData);
    if (isChecked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = accounts_grid.dataSource.view()[idx];
            var index = checkedIds.indexOf(objGridData[idx]);
            if (index == -1) {
                checkedIds.push(objGridData[idx]);
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
            var index1 = checkedIds.indexOf(objGridData[idx]);
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
    var status = JSON.parse(res).objCRSResponse.status;
    if (status) {
        checkedIds = [];
        flag = false;
        var data = JSON.parse(res).objCRSResponse.data;
        accountsData = data;
//        $.each(data, function(i, items) {
//            if (items.COUNT > 0) {
//                var index = checkedIds.indexOf(items.ACCOUNT_NO);
//                if (index == -1) {
//                    checkedIds.push(items.ACCOUNT_NO);
//                }
//                flag = true;
//            }
//        });

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
function permit_gridDataBound1(arg) {
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

function filterData() {
    if (currentGird === "gridAccounts")
    {
        serachAccounts();
    } else
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
    var type = $('#type').val();
    reqData.ACCOUNT_NO = accno;
    reqData.NAME = name;
    reqData.TYPE = type;
//    reqData.PID = cname;
//    reqData.U_ID = userName;
    procesRequest("orphanAccountsSearch.action", reqData, fnCallbackfnExternalUsersAccFetchSucc, fnCallbackfnExternalUsersAccFetchFail);
    displayLoading("#gridAccounts>div.k-grid-content");
}


//search fn success
function fnCallbackfnExternalUsersAccFetchSucc(res) {
    debugger;
    var status = JSON.parse(res).objCRSResponse.status;
    if (status) {
        var result = JSON.parse(res).objCRSResponse.data;
        accounts_grid.dataSource.data("");
//        $.each(result, function(i, items) {
//            for (var j = 0; j < checkedIds.length; j++) {
//                if (items.ACCOUNT_NO == checkedIds[j]) {
//                    if (result[i].COUNT == '0') {
//                        result[i].COUNT = '1';
//                    }
//                }
//            }
//            if (items.COUNT > 0) {
//                var index = checkedIds.indexOf(items.ACCOUNT_NO);
//                if (index == -1) {
//                    checkedIds.push(items.ACCOUNT_NO);
//                }
//            }
//        });
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
//            obj.U_ID = userName;
//            obj.IS_ACC_LEVEL = 1
            obj.ACCOUNT_NO = "";
            obj.compId = compIdGlobal;
            accArr.push(obj);
        } else {
            for (var i = 0; i < checkedIds.length; i++) {
                var objj = {};
//                objj.U_ID = userName;
//                objj.IS_ACC_LEVEL = 1;
                objj.ACCOUNT_NO = checkedIds[i];
                objj.compId = compIdGlobal;
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
//            obj1.U_ID = userName;
//            obj1.IS_ACC_LEVEL = 1;
            obj1.ACCOUNT_NO = checkedIds[j];
            obj1.compId = compIdGlobal;
            accArr.push(obj1);
        }
    }
    reqData.ACCOUNTS = accArr;
    procesRequest("saveOrphanAccounts.action", reqData, fnsaveAccsSucc, fnsaveAccsFail);
    loadKMask();

}


function addAccounts() {
    
    debugger
    var reqData = {};
    if (checkedIds.length == 0) {
        showMessage("Warning","Please select at least one account number to add.",3,"divAddaccountMsg");
        return false;
    }
    loadKMask()
    reqData.ACCOUNTS = checkedIds;
    reqData.compId = compIdGlobal;
    procesRequest("saveOrphanAccounts.action", reqData, fnsaveAccsSucc, fnsaveAccsFail);
    

}



//save success function
function fnsaveAccsSucc(response) {
    checkedIds = [];
    closeModal();
//    var result = JSON.parse(response).objCRSResponse.data[0].response;
    var result = JSON.parse(response).objCRSResponse.status;
    if (result==true || result == 'success') {
        showMessage("Success", "Account are successfully added.", 1);
    } else if (result == 'deletesuccess') {
        showMessage("Success", "Account permissions are successfully removed for the user.", 1);
    } else {
        showMessage("Error", "Accounts adding is failed.", 2);
    }
loadAccountsGridByComapnyID();
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
        var index = checkedIds.indexOf(dataItem);
        if (index == -1) {
            checkedIds.push(dataItem);
            if (dataItem.COUNT == 0) {
                dataItem.set("COUNT", 1);
            }
        }

    } else {
        var index1 = checkedIds.indexOf(dataItem);
        if (index1 != -1) {
            // flag=false;
            checkedIds.splice(index1, 1);
            if (dataItem.COUNT != 0) {
                dataItem.set("COUNT", 0);
            }
        }
    }
}

$(".addproduct").click(function(){
  // Holds the product ID of the clicked element
  var productId = $(this).attr('class').replace('addproduct ', '');

  addToCart(productId);
});

function addAccountMapping()
{
    
}


//clear button click
function clearAccounts() {
    $("#accName").val("");
    $("#accNo").val("");
    $("#type").val("");
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

function fnMoveAccount(item) {
    var row = $(item).closest("tr");
    var grid = $("#" + renderDivId).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var account = {};
    account = {};
    //account.MOVE_COMPANY_ID = movingCompnyNode;
    selectedCompnyNode = dataItem.COMPANY_ID;
    account.CURRENT_COMPANY_ID = dataItem.COMPANY_ID;
    account.ACCOUNT_NO = dataItem.ACCOUNT_NO;
    var checkedAccounts = [];
    checkedAccounts.push(account);
    var reqParams = {};
    var reqData = {};
    movingAccounts = checkedAccounts;
    procesRequest("loadHirarchy.action", reqData, loadPopupTreeSuccess, loadPopupTreeFail);
}

function loadPopupTreeSuccess(response) {
    var treeData = [];
    //alert(response);
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        treeData = response.objCRSResponse.data;
    }
    loadPopUpTreeComponent(treeData);
    $("#divMove").modal('show');
}

function loadPopupTreeFail() {
    alert('Unable to load data');
}
function moveAccount(){
    debugger
    var reqData = {};
    for (var i = 0; i < movingAccounts.length; i++) {
        movingAccounts[i].MOVE_COMPANY_ID = movingCompnyNode;
    }
    var reqParams = {};
    reqData.ACCOUNTS = movingAccounts;
    
    procesRequest("moveCheckAccount.action", reqData, movedCheckSucess, movedActionFail);
    
}

function movedCheckSucess(response) {
    debugger
    response = evaluate(response);
    if (response.objCRSResponse.data>0){
        
        $('#divAknowlegemet').modal("show");
    }else{
        moveAccountToCompany();
    }
    
}
function moveAccountToCompany() {
    var reqData = {};
    for (var i = 0; i < movingAccounts.length; i++) {
        movingAccounts[i].MOVE_COMPANY_ID = movingCompnyNode;
    }
    var reqParams = {};
    reqParams.ACCOUNTS = movingAccounts;
    procesRequest("moveAccount.action", reqParams, movedAcionSucess, movedActionFail);
}

function movedAcionSucess(response) {
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        showMessage("Success", "Account moved successfully", 1);
        loadTreeAjaxCall();// loading latest tree hirarchy
        fnLoadAccounts(selectedCompnyNode); // loading all accounts
    }
}

function movedActionFail() {
    showMessage("Error", "unable to move account, try again!", 3);
}



function loadPopUpTreeComponent(treeData) {
    var treeArr = [];

    //preparing company nodes only
    for (var i = 0; i < treeData.length; i++) {
        var treeNode = {};
        if (selectedCompnyNode == treeData[i].COMPANY_ID)
            continue;
        treeNode['COMPANY_ID'] = treeData[i].COMPANY_ID;
        treeNode['COMPANY_NAME'] = treeData[i].COMPANY_NAME;
        treeArr.push(treeNode)
    }
    var kendotree = $("#treeview").data("kendoTreeView");
    kendotree.dataSource.data(treeArr);

}

//on databound checking for available records
function permit_gridDataBound(arg) {
    kendo.ui.progress($("#accountGrid>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#accountGrid").find('.k-grid-header colgroup > col').length;
        $("#accountGrid").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount + '" style="text-align:center"><b>No records found</b></td></tr>');
    }

}

function fnReturnUnpublishLabel() {
    return"<span class='redtxt'>Unpublished</span>";
}

function fnLoadAccounts(companyId) {
    var reqParams = {};
    compIdGlobal = companyId;
    reqParams.COMPANY_ID = companyId;
    procesRequest("loadAccountData.action", reqParams, loadAccountsSuccess, loadAccountsFail);
}
function loadAccountsSuccess(response) {
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        accounts = response.objCRSResponse.data;
        $("#" + renderDivId).data("kendoGrid").dataSource.data(accounts);
    } else {
        showMessage("Error", "loading accounts failed!", 3);
        $("#" + renderDivId).data("kendoGrid").dataSource.data({});
    }

}
function loadAccountsFail(error) {
    showMessage("Error", "loading accounts failed!", 3);
}

function fnPublishAccount(item) {
    var row = $(item).closest("tr");
    var grid = $("#" + renderDivId).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var account = {};
    account.COMPANY_ID = dataItem.COMPANY_ID;
    account.ACCOUNT_NO = dataItem.ACCOUNT_NO;
    account.ACCOUNT_NAME = dataItem.ACCOUNT_NAME;
    account.TYPE = dataItem.TYPE;
    account.STATUS = dataItem.STATUS;
    var checkedAccounts = [];
    checkedAccounts.push(account);
    var reqParams = {};
    reqParams.ACCOUNTS = checkedAccounts;
    procesRequest("publishAccount.action", reqParams, publishAccountSuccess, publishAccountFail);
}

function publishAccountSuccess(response) {
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        showMessage("Success", "Account published/unpublished successfully", 1);
        accounts = response.objCRSResponse.data;
        $("#" + renderDivId).data("kendoGrid").dataSource.data(accounts);
    } else {
        showMessage("Error", "Publish/Unpublish account failed!", 3);
        $("#" + renderDivId).data("kendoGrid").dataSource.data({});
    }
}

function publishAccountFail(response) {
    showMessage("Error", "Publish account failed!", 3);
}
function fnDelinkAccount(item) {
    try{
        var row = $(item).closest("tr");
        var grid = $("#" + renderDivId).data("kendoGrid");
        var dataItem = grid.dataItem(row);
        var account = {};
        account.COMPANY_ID = dataItem.COMPANY_ID;
        account.ACCOUNT_NO = dataItem.ACCOUNT_NO;
        account.ACCOUNT_NAME = dataItem.ACCOUNT_NAME;
        account.SERVICE_TYPE = dataItem.SERVICE_TYPE;
        account.STATUS = dataItem.STATUS;
        checkedAccountsForDelink.push(account);

        $("#divDelink").modal('show');
    } catch (e) {
        alert(e);
    }
    //procesRequest("delinkAccount.action", reqParams, delinkAccountSuccess, delinkAccountFail);
}

function delinkAccountSuccess(response) {
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        showMessage("Success", "Account delinked successfully", 1);
        accounts = response.objCRSResponse.data;
        $("#" + renderDivId).data("kendoGrid").dataSource.data(accounts);
    } else {
        showMessage("Error", "Delinking account failed!", 3);
        $("#" + renderDivId).data("kendoGrid").dataSource.data({});
    }
}

function delinkAccountFail(response) {
    showMessage("Error", "Delinking account failed!", 3);
}

function fnPublishCheckedAccount(publishStatus) {
    var checkedAccounts = [];
    var row;
    var grid;
    var dataItem;
    var account = {};
    var checkedValidAccounts = true;
    $.each($("input[name='accountname']:checked"), function() {

        row = $(this).closest("tr");
        grid = $("#" + renderDivId).data("kendoGrid");
        dataItem = grid.dataItem(row);
        account = {};
        account.COMPANY_ID = dataItem.COMPANY_ID;
        account.ACCOUNT_NO = dataItem.ACCOUNT_NO;
        account.ACCOUNT_NAME = dataItem.ACCOUNT_NAME;
        account.STATUS = dataItem.STATUS;

        checkedAccounts.push(account);
        if (publishStatus == dataItem.STATUS) {
            checkedValidAccounts = false;
            return false;
        }
    });
    if (!checkedValidAccounts) {
        showMessage("Error", "Please select only " + (publishStatus == "Published" ? "Unpublished" : "Published") + " accounts", 3);
    } else if (checkedAccounts.length > 0) {
        var reqParams = {};
        reqParams.ACCOUNTS = checkedAccounts;
        procesRequest("publishAccount.action", reqParams, publishAccountSuccess, publishAccountFail);
    } else {
        showMessage("Error", "Please select account", 3);
    }
}
  
function fnDelinkMultiCheckedAccountsConfirmation(){
    try {
        
        var row;
        var grid;
        var dataItem;
        var account = {};
        $.each($("input[name='accountname']:checked"), function() {

            row = $(this).closest("tr");
            grid = $("#" + renderDivId).data("kendoGrid");
            dataItem = grid.dataItem(row);
            account = {};
            account.COMPANY_ID = dataItem.COMPANY_ID;
            account.ACCOUNT_NO = dataItem.ACCOUNT_NO;
            account.ACCOUNT_NAME = dataItem.ACCOUNT_NAME;
            account.STATUS = dataItem.STATUS;

            checkedAccountsForDelink.push(account);
        });
        if (checkedAccountsForDelink.length > 0) {
            $("#divDelink").modal('show');
        } else {
            showMessage("Error", "Please select account", 3);
        }
    
    } catch (e) {
        alert(e);
    }
}
  
  

function fnDelinkCheckedAccount() {
        
    if (checkedAccountsForDelink.length > 0) {
        var reqParams = {};
        reqParams.ACCOUNTS = checkedAccountsForDelink;
        checkedAccountsForDelink = [];
        
        procesRequest("delinkAccount.action", reqParams, delinkAccountSuccess, delinkAccountFail);
    } else {
        showMessage("Error", "Please select account", 3);
    }
}

function evaluate(str) {

    if (str == "" && str == null) {
        return "";
    }

    str = str.replaceAll("\\\\", "\/");
    str = str.replaceAll("&quot;", "\"");
    str = str.replaceAll("\n", "");
    str = str.replaceAll("\\r", "");

    var respData = eval("(" + str + ")");

    return respData;
}


function onAllAccGridRowSelect() {
   
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = accountGrid.dataItem(row);
    if (checked) {
        var index = checkeRows1.indexOf(dataItem);
        if (index == -1) {
            checkeRows1.push(dataItem);
            if (dataItem.COUNT == 0) {
                dataItem.set("COUNT", 1);
            }
        }
    } else {
        var index1 = checkeRows1.indexOf(dataItem);
        if (index1 != -1) {
            // flag=false;
            checkeRows1.splice(index1, 1);
            if (dataItem.COUNT != 0) {
                dataItem.set("COUNT", 0);
            }
        }
    }
}

function permit_accountGrid_gridDataBound(arg) {
    kendo.ui.progress($("#accountGrid>div.k-grid-content"), false);
    if (arg.sender._data.length === 0) {
        var colCount = $("#accountGrid").find('.k-grid-header colgroup > col').length;
        $("#accountGrid").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange_main_grid(arg.sender._data);
}

function test_pagechange_main_grid(e) {
    debugger;
    var count = 0;
    var view = e;
    for (var k = 0; k < view.length; k++) {
        if (view[k].COUNT == 1) {
            count++
        }
    }
    if (count == view.length) {
        $("#allViewPointGrid").prop('checked', true);
    } else {
        $("#allViewPointGrid").prop('checked', false);
    }
    if (view.length == 0) {
        $("#allViewPointGrid").prop('checked', false);
    }
}

$(document).on("change", "#allViewPointGrid", function() {

    var strGridData = JSON.stringify(accountGrid._data);

    var objGridData = JSON.parse(strGridData);
    if (this.checked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = accountGrid.dataSource.view()[idx];//checkeRows
            var index = checkeRows1.indexOf(dataItem);
            if (index == -1) {
                checkeRows1.push(dataItem);
                if (dataItem.COUNT == 0) {
                    dataItem.set("COUNT", 1);
                }
            }
            $("#" + objGridData[idx].VP_ID).prop('checked', true);
        }
    }
    else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = accountGrid.dataSource.view()[idx];
            var index1 = checkeRows1.indexOf(dataItem1);
            if (index1 != -1) {
                checkeRows1.splice(index1, 1);
                if (dataItem1.COUNT != 0) {
                    dataItem1.set("COUNT", 0);
                }
            }
            $("#" + objGridData[idx].VP_ID).prop('checked', false);
        }
    }
});

// this method unchecks the remaining nodes (i.e other than selected node)
function uncheckOtherNodes(selectedId, treeObj) {
    try {
        var nodes = treeObj.dataSource.view();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.checked && node.COMPANY_ID != selectedId) {
                node.set('checked', false);
            }
        }
    } catch (e) {
        alert(e);
    }
}