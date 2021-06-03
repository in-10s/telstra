/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var checkedNodes = [];
var unCheckedNodes = [];
var uid;
var compId;
var selectedUserId;
var costCenters = [];
jQuery(document).ready(function () {
//    $("#customerDropDownList").kendoDropDownList({
//        dataTextField: "COMPANY_NAME",
//        dataValueField: "COMPANY_ID",
//        dataSource: [],
//        index: 0,
//        select: fnReloadCostCenter,
//        dataBound: selectFirstCompany,
//        optionLabel: {
//            COMPANY_NAME: "Select a customer...",
//            COMPANY_ID: ""
//        },
//        height: 100
//    });

//    $("#costCenterTreeView").kendoTreeView({
//        checkboxes: {
//            template: "<input type=\"checkbox\" onchange='onCheckCostCenter(this)' /><label class='textoverflowec'></label>"
//        },
//        animation: false,
//        dataSource: new kendo.data.HierarchicalDataSource({
//            data: []
//        }),
//        dataTextField: "CC_NAME",
//        expand: onExpandCostCenter
//    });

    $("#userListView").kendoListView({
        dataSource: [],
        selectable: "single",
        dataBound: selectFirstFromList,
        change: fnReloadCompanies,
        template: kendo.template($("#usersListViewTemplate").html())
    });

    $("#costCenterListView").kendoListView({
        dataSource: [],
        selectable: "single",
        dataBound: selectFirstFromList,
        change: fnReloadAccounts,
        template: "<div style='line-height: 25px;'>#:CC_PATH#</div>"
    });
    $("#accountListView").kendoListView({
        dataSource: [],
//        selectable: "multiple",
//        dataBound: selectFirstFromList,
//        template: "<div>#:ACCOUNT_NO#</div>",
//        template: "<div><li class='act' style='line-height: 25px;'><div class='left'><input name='account_list' id='#:ACCOUNT_NO#' type='checkbox'  class='chkBoxCls account_checkbox' value='#:ACCOUNT_NO#'><label class='textoverflowec' id='#:ACCOUNT_NO#' title='#:ACCOUNT_NO#, #:ACCOUNT_NAME#'>#:ACCOUNT_NO# #:ACCOUNT_NAME#</label></div> <div class='right' style=' width:300px;'></div></li></div>"
    });


});


$("#all_accounts_checkbox_id").on("change", function () {
    if ($(this).is(':checked')) {
        $("input:checkbox.account_checkbox").prop('checked', true);
    }else{
         $("input:checkbox.account_checkbox").prop('checked', false);
    }
})


function onCheckCostCenter(ckb) {
    var isChecked = ckb.checked;
    var li = $(ckb).closest("li");
    var treeview = $("#costCenterTreeView").data("kendoTreeView");
    var dataItem = treeview.dataItem(li);
    fnAddRemoveUnCheckedNodes(isChecked, dataItem)
    fnAddRemoveCheckedNodes(isChecked, dataItem)
}

function fnAddRemoveUnCheckedNodes(isChecked, dataItem) {
    var index = unCheckedNodes.indexOf(dataItem);
    if (isChecked) {
        if (index != -1) {
            unCheckedNodes.splice(index, 1);
        }
    } else {
        if (index == -1) {
            unCheckedNodes.push(dataItem);
        }
    }
}

function fnAddRemoveCheckedNodes(isChecked, dataItem) {
    var index = checkedNodes.indexOf(dataItem);
    if (isChecked) {
        if (index == -1) {
            checkedNodes.push(dataItem);
        }
    } else {
        if (index != -1) {
            checkedNodes.splice(index, 1);
        }

    }
}

function fnFetchUsers() {
    var reqParams = {};
    reqParams.LOGIN_ID = 'sysadmin';
    reqParams.USER_TYPE = global_userType;
    reqParams.U_ID = global_LOGIN_U_ID;
    procesRequest("fetchUsers.action", reqParams, fnFetchUsersSuccess, fnFetchUsersFail);
}
function fnFetchUsersSuccess(response) {
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        var users = response.objCRSResponse.data;
        var internalUserList = [];
        var externalUserList = [];
        for (var index = 0; index < users.length; index++) {
            if (users[index].USER_TYPE == "1") {
                internalUserList.push(users[index]);
            } else if (users[index].USER_TYPE == "2") {
                externalUserList.push(users[index]);
            }
        }


        $("#userListView").data("kendoListView").dataSource.data(externalUserList);


    } else {
        showMessage("Error", "loading users failed!", 2);
    }
}

function fnFetchUsersFail(response) {
    showMessage("Error", "loading users failed!", 2);
}
function selectFirstFromList(e) {
    var listView = e.sender;
    listView.select(listView.element.children().first());
}

var global_lastSelectedCustomer_ID = "";
var global_savedCustomerList = [];
function selectFirstCustomerFromList(e) {
    var listView = e.sender;
    listView.select(listView.element.children().first());
}

function SetSelectedCustomerByID(companyID) {
    var listView = $("#customerKendoListView").data("kendoListView");
    var data = $("#customerKendoListView").data("kendoListView").dataSource.view();
    var children = listView.element.children();
    var index = 0;
    for (var x = 0; x < children.length; x++) {
//        alert("saved Customer id :" + companyID + " \nList Id :" +data[x].COMPANY_ID);
        if (data[x].COMPANY_ID == companyID) {
            index = x;
        }
    }
    // selects first list view item
    listView.select(children[index]);
}


function fnReloadCompanies() {
    var data = $("#userListView").data("kendoListView").dataSource.view();
    var userId = data[$(this.select()).index()].U_ID;

    $("#customerKendoListView").html("");

//        alert("External user");
        $("#customerKendoListView").kendoListView({
            dataSource: [],
            selectable: "single",
//            dataBound: selectFirstCustomerFromList,
            change: fnReloadCostCenter,
//        template: "<div style='line-height: 25px;'>#:COMPANY_NAME#</div>"
            template: "<div><li class='act' style='line-height: 25px;'><div ><input name='companies' onclick='onClickOnCustomerRadio(#:COMPANY_ID#);' id='#:COMPANY_NAME#' company_id='#:COMPANY_ID#' type='radio'  class='radioCls company_radio' value='#:COMPANY_NAME#'><label class='textoverflowec' id='#:COMPANY_NAME#' title='#:COMPANY_NAME#'>#:COMPANY_NAME#</label></div> </li></div>"


        });

    fnFetchCompanies(userId);
}

function onClickOnCustomerRadio(customerID) {
    SetSelectedCustomerByID(customerID);
}
function onClickOnCustomerCombo(customerID) {
//    $(this).prop("checked",false);
    if (global_lastSelectedCustomer_ID == customerID) {
        $("input[name=company_list][company_id='" + customerID + "']").prop("checked", true);
    } else {
        $("input[name=company_list][company_id='" + customerID + "']").prop("checked", false);
    }

//SetSelectedCustomerByID(customerID);
}

function fnFetchCompanies(userId) {
    var reqParams = {};
    reqParams.U_ID = userId;
    reqParams.LOGIN_U_ID = global_LOGIN_U_ID;
    reqParams.USER_TYPE = global_userType;
    procesRequest("fetchCompanies.action", reqParams, fnFetchCompaniesSuccess, fnFetchCompaniesFail);
}
function fnFetchCompaniesSuccess(response) {
    checkedNodes = [];
    unCheckedNodes = [];
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        var companies = response.objCRSResponse.data.allCompaniList;

//        $("#customerDropDownList").data("kendoDropDownList").dataSource.data(companies);
        $("#customerKendoListView").data("kendoListView").dataSource.data(companies);
        $("#costCenterListView").data("kendoListView").dataSource.data([]);
//        $("#costCenterList_NoRecordFound_Div").show();
        $("#accountListView").data("kendoListView").dataSource.data([]);
        $("#accountList_NoRecordFound_Div").show();
        if (companies.length == 0) {
            $("#customerList_NoRecordFound_Div").show();
        } else {
            $("#customerList_NoRecordFound_Div").hide();
        }

        var savedCompanies = response.objCRSResponse.data.savedComapniList;

            $("input[name=companies][company_id='" + savedCompanies[0] + "']").prop("checked", true);
        global_lastSelectedCustomer_ID = savedCompanies[0];
        global_savedCustomerList = savedCompanies;
        SetSelectedCustomerByID(global_lastSelectedCustomer_ID);
    } else {
        showMessage("Error", "loading companies failed!", 2);
    }
}

function fnFetchCompaniesFail(response) {
    showMessage("Error", "loading companies failed!", 2);
}

function selectFirstCompany(e) {
    this.select(0);
    if ($("#costCenterTreeView").data("kendoTreeView")) {
        $("#costCenterTreeView").data("kendoTreeView").dataSource.data([]);
    }
}
var twiceCall_falg = false;
function fnReloadCostCenter() {
    if (twiceCall_falg) {
        return false;
    }
    twiceCall_falg = true;
    checkedNodes = [];
    unCheckedNodes = [];
    var companyID = "";

//    if (e.item) {
//        companyID = this.dataItem(e.item).COMPANY_ID;
//    }
    var data = $("#customerKendoListView").data("kendoListView").dataSource.view();
    companyID = data[$(this.select()).index()].COMPANY_ID;
    var companyName = data[$(this.select()).index()].COMPANY_NAME;
     $("input[name=companies][value='" + companyName + "']").prop("checked", true);

    var isSavedCompany = false;
    for (var index = 0; global_savedCustomerList.length > index; index++) {
        if (global_lastSelectedCustomer_ID == global_savedCustomerList[index]) {
            isSavedCompany = true;
        }
    }
//    alert("last selected isSavedCompany :" + isSavedCompany);
    if (!isSavedCompany) {
        $("input[name=company_list][company_id='" + global_lastSelectedCustomer_ID + "']").prop("checked", false);
    }
    global_lastSelectedCustomer_ID = companyID;
    fnFetchCostCenters(companyID);
}

function fnFetchCostCenters(companyID) {
    var data = $("#userListView").data("kendoListView").dataSource.view();
    var U_ID = data[$("#userListView").data("kendoListView").select().index()].U_ID;
    var reqParams = {};
    reqParams.COMPANY_ID = companyID;
    reqParams.U_ID = U_ID;
    if (global_userType == "2") {
        reqParams.U_ID = global_LOGIN_U_ID;
    }
    reqParams.USER_TYPE = global_userType;
    compId = companyID;
//    alert("reqData:"+reqParams.toSource());
    procesRequest("fetchCostCenter.action", reqParams, fnFetchCostCentersSuccess, fnFetchCostCentersFail);
}
function fnFetchCostCentersSuccess(response) {
    twiceCall_falg = false;
    response = JSON.parse(response);
    if (response.objCRSResponse.success) {
        costCenters = response.objCRSResponse.data;

//        fnPrepareCostCenterData();
        var costCenterListArr = fnPrepareCostCenterListData();
//        alert("costCenter arrenge Data :" + costCenterListArr.toSource());
        if (!costCenterListArr) {
            costCenterListArr = [];
        }
        $("#costCenterListView").data("kendoListView").dataSource.data(costCenterListArr);
//        $("#costCenterTreeView").data("kendoTreeView").dataSource.data(costCenters);
//        fnMarkSavedCostCenter();
        $("#accountListView").data("kendoListView").dataSource.data([]);
        $("#accountList_NoRecordFound_Div").show();
//        if (costCenters.length == 0) {
//            $("#costCenterList_NoRecordFound_Div").show();
//        } else {
//            $("#costCenterList_NoRecordFound_Div").hide();
//        }

    } else {
        showMessage("Error", "loading cost centers failed!", 2);
    }
}
function fnPrepareCostCenterListData() {
    var costCenterListArr = [];
    var costCenterRow = {};
    
        costCenterRow.CC_ID = "0";
        costCenterRow.CC_PATH = "All";
        costCenterListArr.push(costCenterRow);
        costCenterRow = {};
        costCenterRow.CC_ID = "-1";
        costCenterRow.CC_PATH = "Ungrouped";
        costCenterListArr.push(costCenterRow);
        costCenterRow = {};
  
    for (var index = 0; index < costCenters.length; index++) {
        costCenterRow = {};
        costCenterRow.CC_ID = costCenters[index].CC_ID;
        costCenterRow.CC_PATH = costCenters[index].CC_HIERARCHY;
        costCenterListArr.push(costCenterRow);
    }

//    for (var index = 0; index < costCenters.length; index++) {
//        costCenterRow = {};
//        var strCostNamePath = costCenters[index].CC_NAME;
//        var childArr = costCenters[index].CHILD_LIST;
//        var lastChildID = costCenters[index].CC_ID;
//        var lastChildP_ID;
//        var lastCostCode = "";
//
//        var falgForBack = false;
//        for (var childIndex = 0; childArr.length > childIndex; childIndex++) {
//            strCostNamePath = strCostNamePath + " > " + childArr[childIndex].CC_NAME;
////            if (lastChildP_ID != childArr[childIndex].CC_PARENT) {
////                strCostNamePath = strCostNamePath + " > " + childArr[childIndex].CC_NAME;
////            } 
////            else {
//////                tempNamePath=strCostNamePath;
////                costCenterRow.CC_ID = lastChildID;
////                costCenterRow.CC_PATH = strCostNamePath;
//////                alert("last :" + costCenterRow.toSource());
////                if (lastCostCode == "2") {
////                    costCenterListArr.push(costCenterRow);
////                    costCenterRow = {};
////                    strCostNamePath = strCostNamePath.substring(0, strCostNamePath.lastIndexOf(">"));
////                    strCostNamePath = strCostNamePath + " > " + childArr[childIndex].CC_NAME;
////                } else {
////                    strCostNamePath = strCostNamePath + " > " + childArr[childIndex].CC_NAME;
////                }
////
////            }
//
//
//
//            if (childArr[childIndex].CC_TYPE == "2") {
//                costCenterRow.CC_ID = childArr[childIndex].CC_ID;
//                costCenterRow.CC_PATH = strCostNamePath;
//                costCenterListArr.push(costCenterRow);
//                costCenterRow = {};
//                strCostNamePath = strCostNamePath.substring(0, strCostNamePath.lastIndexOf(">"));
////                falgForBack=true;
//            } else if (lastCostCode == "2") {
//               
//                if (lastChildP_ID == childArr[childIndex].CC_PARENT) {
//                    strCostNamePath =  strCostNamePath.substring(0, strCostNamePath.lastIndexOf(">"));
//                     strCostNamePath = strCostNamePath + " > " + childArr[childIndex].CC_NAME;
//                }else{
//                
//                strCostNamePath = strCostNamePath.substring(0, strCostNamePath.lastIndexOf(">"));
//                if (strCostNamePath.length > 1) {
//                    strCostNamePath = strCostNamePath.substring(0, strCostNamePath.lastIndexOf(">"));
//                }
//                strCostNamePath = strCostNamePath + " > " + childArr[childIndex].CC_NAME;
//            }
////                falgForBack=false;
//            } else {
////                strCostNamePath = strCostNamePath.substring(0, strCostNamePath.lastIndexOf(">"));
////                strCostNamePath = strCostNamePath + " > " + childArr[childIndex].CC_NAME;
////                falgForBack=false;
//
////                if (lastChildP_ID != childArr[childIndex].CC_PARENT) {
////                    strCostNamePath = strCostNamePath = strCostNamePath.substring(0, strCostNamePath.lastIndexOf(">"));
////                }
//
//            }
//
//
//
//            lastChildID = childArr[childIndex].CC_ID;
//            lastChildP_ID = childArr[childIndex].CC_PARENT;
//            lastCostCode = childArr[childIndex].CC_TYPE;
//
//
//        }
////        if (lastCostCode == "2") {
////            costCenterRow.CC_ID = lastChildID;
////            costCenterRow.CC_PATH = strCostNamePath;
////            costCenterListArr.push(costCenterRow);
////        }
//    }
    return costCenterListArr;

}

function fnReloadAccounts() {
    loadAccountGrid();
    $("#all_accounts_checkbox_id").prop('checked', false);//uncheck all
    var data = $("#costCenterListView").data("kendoListView").dataSource.view();
    var costCenterId = data[$(this.select()).index()].CC_ID;
    data = $("#userListView").data("kendoListView").dataSource.view();
    var U_ID = data[$("#userListView").data("kendoListView").select().index()].U_ID;
    var reqParams = {};
    reqParams.CC_ID = costCenterId;
    reqParams.COMPANY_ID = compId;
    reqParams.SELECTED_U_ID = U_ID;
    reqParams.U_ID = U_ID;
//    reqParams.LOGIN_ID = userId;
    if (global_userType == "2") {
        reqParams.U_ID = global_LOGIN_U_ID;
    }
    reqParams.USER_TYPE = global_userType;

    procesRequest("fetchAccountList.action", reqParams, fnFetchAccountsFromCC_IDSuccess, fnFetchAccountsFromCC_IDFail);
//    if (costCenterId == "0" || costCenterId == "-1") {
//        $("#account_list_div_id").css("visibility", "visible")
//       
//    } else {
//       
//        $("#account_list_div_id").css("visibility", "hidden");
//         $("#checkAllAccounts").css("visibility", "visible");
//    }
}

var global_checkedAccountList;
function fnFetchAccountsFromCC_IDSuccess(response) {
    response = JSON.parse(response);
    var accountArr = [];
    if (response.objCRSResponse.success) {
        accountArr = response.objCRSResponse.data;
        var allAccountArr = accountArr.allAccountArr;
        var checkedAccountArr = accountArr.checkedAccountArr;
        global_checkedAccountList=checkedAccountArr;
//        alert("Account List :" + accountArr.toSource());
        if (allAccountArr && allAccountArr.length > 0) {
            $("#checkAllAccounts").show();
        } else {
            $("#checkAllAccounts").hide();
        }

        account_list_grid.setDataSource(new kendo.data.DataSource({
            data: allAccountArr,
        }));
       


        var data = $("#costCenterListView").data("kendoListView").dataSource.view();
        var costCenterId = data[$("#costCenterListView").data("kendoListView").select().index()].CC_ID;
//        if (costCenterId == "0" || costCenterId == "-1") {
        if (costCenterId) {
            $("#accountListView").data("kendoListView").dataSource.data(allAccountArr);

            if (accountArr.length == 0) {
                $("#accountList_NoRecordFound_Div").show();
            } else {
                $("#accountList_NoRecordFound_Div").hide();
                checkAccountListCheckbox(checkedAccountArr);
            }
        } else {
            allAccountArr = [];
            $("#accountListView").data("kendoListView").dataSource.data(allAccountArr);
            if (checkedAccountArr.length > 0) {
                $("#all_accounts_checkbox_id").prop('checked', true);
            }
        }

    }
}
function fnFetchAccountsFromCC_IDFail(response) {
    alert("Fail to load account based on cost center");
}
function checkAccountListCheckbox(checkedAccountArr) {
    $("input:checkbox[name='account_list']").each(function () {
        var checkboxVal = $(this).val();
        if ($.inArray(checkboxVal, checkedAccountArr) != -1) {
            $(this).prop('checked', true);
        }

    });
}



function saveUserPermissionDetails() {
    var data = $("#userListView").data("kendoListView").dataSource.view();
    var userId = data[$("#userListView").data("kendoListView").select().index()].U_ID;

    data = $("#customerKendoListView").data("kendoListView").dataSource.view();
    var companyID = data[$("#customerKendoListView").data("kendoListView").select().index()].COMPANY_ID;
    var strUnchekCompanies = "";
    var strCheckedCompanies = "";
    $("input[name=company_list]").each(function () {
        var companyID = $(this).attr("company_id");
        if ($(this).is(":checked")) {
            strCheckedCompanies = strCheckedCompanies + companyID + ",";
        } else {
            strUnchekCompanies = strUnchekCompanies + companyID + ",";
        }
    })

    var ReqData = new Object();
    var userTypeValue = $('input[type=radio][name="usertype"]:checked').val();
    ReqData.USER_TYPE = "external";

    ReqData.U_ID = userId;
    ReqData.COMPANY_ID = companyID;
    data = $("#costCenterListView").data("kendoListView").dataSource.view();
    var costCenterId = data[$("#costCenterListView").data("kendoListView").select().index()].CC_ID;
    ReqData.CC_ID = costCenterId;
//    if (costCenterId == "0" || costCenterId == "-1") {
//        ReqData.isCC = false;
    ReqData.checkedNodes = findCheckedNodesFromAccountList();
//    alert("Length of checked nodes :"+ReqData.checkedNodes.length);
    if(ReqData.checkedNodes.length==0){
        showMessage("info", "Need to map acccounts to prepare a cost centre hierarchy", 4);
        $(window).scrollTop(0);
        return false;
    }
    ReqData.allNodes = findAllNodesFromAccountList();
//    } else {
//        ReqData.isCC = true;
//        ReqData.isCheckedAll = $("#all_accounts_checkbox_id").is(':checked');
//        ReqData.checkedNodes = [""];
//        ReqData.allNodes = "";
//    }

//    alert("REQDATA :" + ReqData.toSource());
    ReqData.UniqueKey = generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('saveUserPermissionDetails.action', ReqData, true);
    ajaxObj.submit(function (res) {
        showMessage("Success", res.data, 1);
        global_savedCustomerList = [];
        global_savedCustomerList = strCheckedCompanies.split(",");
    });
}


function findCheckedNodesFromAccountList() {
    var accountCheckArr = [];

    $("input:checkbox[name='account_list']:checked").each(function () {
        accountCheckArr.push($(this).val());
    });
    return accountCheckArr;
}
function findAllNodesFromAccountList() {
    var strAllAccounts = "";
    $("input:checkbox[name='account_list']").each(function () {
        strAllAccounts = strAllAccounts + $(this).val() + ",";
    });
    return strAllAccounts.substring(0, strAllAccounts.lastIndexOf(","));
}

function fnPrepareCostCenterData() {
    $.each(costCenters, function(i, item) {
        item.id = item.CC_ID;
        item.text = item.CC_NAME;
        if (item.HASCHILDRENS > 0) {
            item.hasChildren = true;
            item.isExpand = false;
        }
        else {
            item.hasChildren = false;
            item.isExpand = true;
        }
    });
    return costCenters;
}
function fnMarkSavedCostCenter() {
    var costCenterTreeView = $("#costCenterTreeView").data("kendoTreeView");
    $.each(costCenters, function(i, item) {
        var dataItem = costCenterTreeView.dataItem(costCenterTreeView.findByText(item.CC_NAME));
        if (item.COUNT > 0) {
            dataItem.set("checked", true);
            checkedNodes.push(dataItem);
        } else {
            dataItem.set("checked", false);
        }
    });
    return costCenters;
}
function fnFetchCostCentersFail(response) {
    showMessage("Error", "loading cost centers failed!", 2);
}


function fnExpandCostCenterFail() {
    showMessage("Error", "loading cost centers failed!", 2);
}

function listViewSearch(search) {
    if (search != "")
        $("#userListView").data("kendoListView").dataSource.filter({
            field: "name",
            operator: "contains",
            value: search
        });
    else
        $("#userListView").data("kendoListView").dataSource.filter({});
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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


function filterUsers() {
    var $filter = new Array();
     var filter = { logic: "or", filters: [] };
    var filterProduct = { logic: "or", filters: [] };
    
    var $x = $("#searchUser").val();
    if ($x) {
        filterProduct.filters.push({
            field: "LOGIN_ID",
            operator: "contains",
            value: $x
        });
    }
     if ($x) {
         filterProduct.filters.push({
            field: "FIRST_NAME",
            operator: "contains",
            value: $x
        });
    }
     if ($x) {
         filterProduct.filters.push({
            field: "LAST_NAME",
            operator: "contains",
            value: $x
        });
    }
    if (filterProduct.filters.length > 0) {
        filter.filters.push(filterProduct);
    }
      $("#userListView").data("kendoListView").dataSource.filter(filter);
    
}

function filterCustomers(){
    var $filter = new Array();
    var $x = $("#searchCustomer").val();
    if ($x) {
        $filter.push({
            field: "COMPANY_NAME",
            operator: "contains",
            value: $x
        });
    }
     $("#customerKendoListView").data("kendoListView").dataSource.filter($filter);
    var savedCompanies=global_savedCustomerList;

        $("input[name=companies][company_id='" + savedCompanies[0] + "']").prop("checked", true);

        global_lastSelectedCustomer_ID = savedCompanies[0];
}

function filterAccounts() {
    var $filter = new Array();
     var filter = { logic: "or", filters: [] };
    var filterProduct = { logic: "or", filters: [] };
    
    var $x = $("#searchAccount").val();
    if ($x) {
        filterProduct.filters.push({
            field: "ACCOUNT_NO",
            operator: "contains",
            value: $x
        });
    }
     if ($x) {
        filterProduct.filters.push({
            field: "ACCOUNT_NAME",
            operator: "contains",
            value: $x
        });
    }
     if (filterProduct.filters.length > 0) {
        filter.filters.push(filterProduct);
    }
//    $("#accountListView").data("kendoListView").dataSource.filter(filter);
    $("#account_list_grid").data("kendoGrid").dataSource.filter(filter);
    checkAccountListCheckbox(global_checkedAccountList);

}

var account_list_grid;
function loadAccountGrid() {
    account_list_grid = $("#account_list_grid").kendoGrid({
//        height: 300,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        persistSelection: true,
//        change: onCheckboxChange,
//        dataBound: permissiongridDataBound,
//        pageable: {
//            pageSize: 1000
//        },
        columns: [
//            {field: "Check",
//                titale:"Selection",
//                template:"<input type='checkbox' class='checkbox' />"
//            },

            {
            
            title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' class='chkBoxCls' onchange='changeCheckAll(this)' id='all_accounts_checkbox_id'></span>",
            template: $("#checkbox_template1").html(),
            menu: false,
            width: "30px"
        },
            {
                field: "ACCOUNT_NO",
                title: "Account Number",
                width: 130
            }, {
                field: "ACCOUNT_NAME",
                title: "Account Name",
                width: 190
            }
        ],
        

             
    }).data("kendoGrid");
    $("#account_list_grid .k-grid-header").css('display', 'none');
    $("#account_list_grid .k-grid-content").css('height', '455');
}


function changeCheckAll(objThis){
   if ($(objThis).is(':checked')) {
        $("input:checkbox.account_checkbox").prop('checked', true);
    } else {
        $("input:checkbox.account_checkbox").prop('checked', false);
    }  
}