/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var companyId;
var companyName;
var selectedNode;
var accountGrid1;
var checkeRows = [];
var checkeRows1 = [];
var allAccData;
var costCenterAccntGrid;
var rootUids = [];
var preItemId;
var rootUid;
var checkedNodes = [];
var UID = 0;
$(document).ready(function () {
    try {
        $("#treeview").kendoTreeView({
            //    checkboxes: {
            //         checkChildren: false
            //    },
            //check: onCheckNode,
            template: "<span style='color: #= item.COLOR #'>#= item.CC_NAME #</span>",
            select: onCheckNode,
//            expand: onExpand,
            dataTextField: ["CC_NAME"],
            schema: {
                model: {
                    children: "items"
                }
            }

        });

        var dataSource1 = new kendo.data.DataSource({
            data: allAccData,
            //batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        AC_NO: {
                            editable: false
                        },
                        AC_NAME: {
                            editable: false
                        }
                    }
                }
            }
        });

        accountGrid1 = $("#addAccount").kendoGrid({
            dataSource: dataSource1,
            pageable: true,
            sortable: true,
            reorderable: true,
            //groupable: true,
            //        pageable: {
            //                input: true,
            //                numeric: false
            //            },
            resizable: true,
            filterable: true,
            columnMenu: true,
            //height: 300,
            //define dataBound event handler
            dataBound: permit_gridDataBound,
            columns: [
                //define template column with checkbox and attach click event handler

                {
                    title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='checkAll'></span>",
                    template: $("#gridALlAcc_template1").html(),
                    menu: false,
                    width: "15%"
                },
                {
                    field: "AC_NO",
                    title: "Account Number",
                    width: "40%"
                }, {
                    field: "AC_NAME",
                    title: "Service Number",
                    width: "45%"
                }
            ]

        }).data("kendoGrid");
        accountGrid1.table.on("click", ".checkbox", onGridRowSelect);



        $("#costCenterUnassignAccntGrid").kendoGrid({
            dataSource: {
                data: [],
                pageSize: 10
            },
            sortable: true,
            reorderable: true,
            resizable: true,
            //  dataBound: permit_gridDataBound1,
            filterable: true,
            columnMenu: true,
            height: 440,
            pageable: true,
            columns: [
                {
                    field: "ACCOUNT_NO",
                    title: "Account number",
                    template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
                    width: "35%"
                }, {
                    field: "ACCOUNT_NAME",
                    title: "Account name",
                    template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
                    encoded: false,
                    width: "35%",
                    attribute: {
                        style: "text-align:center"
                    }
                }, {
                    field: "ACCOUNT_TYPE",
                    title: "Type",
                    width: "30%",
                    template: $("#customerAccountGridAccountTypeTemplate").html()
                }
            ]
        });
    } catch (e) {
        alert(e.message);
    }
    loadCCAccountsGrid();

});

function checkedNodeIds(nodes, selectedId) {
    try {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.checked && node.CC_ID != selectedId) {
                node.set('checked', false);
            }

            if (nodes[i].hasChildren) {
                checkedNodeIds(nodes[i].children.view(), selectedId);
            }
        }
    } catch (e) {
        alert(e);
    }
}

function uncheckOtherNodes(selectedId, treeObj) {
    try {
        checkedNodeIds(treeObj.dataSource.view(), selectedId);

    } catch (e) {
        alert(e);
    }
}
function loadCCAccountsGrid() {
    try {

        var dataSource = new kendo.data.DataSource({
            data: [],
            //batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        AC_NO: {
                            editable: false
                        },
                        AC_NAME: {
                            editable: false
                        },
                        CC_ID: {
                            editable: false
                        },
                        CC_PARENT_ID: {
                            editable: false
                        },
                        CC_PARENT_NAME: {
                            editable: false
                        }
                    }
                }
            }
        });

        costCenterAccntGrid = $("#costCenterAccntGrid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            sortable: true,
            reorderable: true,
            //groupable: true,
            //        pageable: {
            //                input: true,
            //                numeric: false
            //            },
            resizable: true,
            filterable: true,
            columnMenu: true,
            height: 440,
            //define dataBound event handler
            dataBound: permit_accountGrid_gridDataBound,
            columns: [
                //define template column with checkbox and attach click event handler

                {
                    title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='allViewPointGrid'></span>",
                    template: $("#costCenterAccnts").html(),
                    menu: false,
                    width: "10%"
                },
                {
                    field: "AC_NO",
                    title: "Service Number",
                    template: '<span style="cursor:default;white-space: nowrap;" title="#=AC_NO#">#=AC_NO#</span>',
                    width: "30%"
                }, {
                    field: "AC_NAME",
                    title: "Allocated Budget",
                    template: '<span style="cursor:default;white-space: nowrap;" title="#=AC_NAME#">#=AC_NAME#</span>',
                    width: "30%"
                }
                //                {
                //                    field: "CC_PARENT_NAME",
                //                    title: "Cost center",
                //                    width: "45%"
                //                }
                //                ,
                //            {
                //                field: "Action",
                //                title: "Actions",
                //                width: "45%",
                //                encoded: false,
                //                attributes: {
                //                    "class": "action"
                //                },
                //                template: " <a data-toggle='modal'  onclick='fnDeleteAccount(this);'><i class='delete' title='Delete'></i></a>"
                //            }
            ]

        }).data("kendoGrid");
        costCenterAccntGrid.table.on("click", ".checkbox1", onAllAccGridRowSelect);
    } catch (e) {
        alert(e.message);
    }
}

function onGridRowSelect() {

    var checked = this.checked;

    var row = $(this).closest("tr");
    var dataItem = accountGrid1.dataItem(row);
    if (checked) {
        var index = checkeRows.indexOf(dataItem);
        if (index == -1) {
            checkeRows.push(dataItem);
            if (dataItem.COUNT == 0) {
                dataItem.set("COUNT", 1);
            }
        }
    } else {
        var index1 = checkeRows.indexOf(dataItem);
        if (index1 != -1) {
            // flag=false;
            checkeRows.splice(index1, 1);
            if (dataItem.COUNT != 0) {
                dataItem.set("COUNT", 0);
            }
        }
    }
}

function permit_gridDataBound(arg) {
    kendo.ui.progress($("#addAccount>div.k-grid-content"), false);
    if (arg.sender._data.length === 0) {
        var colCount = $("#addAccount").find('.k-grid-header colgroup > col').length;
        $("#addAccount").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange(arg.sender._data);
}


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
function loadCostCenters(respData) {
    var inputData = respData.inputData;
    $("#companyName").text(inputData.COMPANY_NAME);
    companyId = inputData.COMPANY_ID;
    //companyName = inputData.COMPANY_NAME;
    var treeData = [];
    var rootNode = {};
    var treeDataName = ["Hierarchy Management", "Ungrouped Services"];
    for (var i = 0; i < treeDataName.length; i++) {
        rootNode = {};
        rootNode.CC_NAME = treeDataName[i];
        rootNode.CC_ID = '-1';
        rootNode.CC_TYPE = '-1';
        rootNode.COLOR = 'blue';
        rootNode.expanded = true;
//    rootNode.items = respData.costCenterData;
        rootNode.hasChildren = (treeDataName[i] == "Hierarchy Management" ? true : false);

        if (treeDataName[i] == "Hierarchy Management") {
            rootNode.expanded = true;
            rootNode.items = respData.costCenterData;
        } else {
            rootNode.isExpand = false;
        }
        treeData.unshift(rootNode);
//    treeData.push(rootNode);
    }

    var kendotree = $("#treeview").data("kendoTreeView");

    kendotree.dataSource.data(treeData);

}

function loadCostCenterSuccess(resp) {

    var treeData = [];
    // alert(resp);
    try {
        resp = JSON.parse(resp)

        if (resp.objCRSResponse.success) {
            treeData = resp.objCRSResponse.data;
        }
        var kendotree = $("#treeview").data("kendoTreeView");
        fnPrepareCostCenterData(treeData);
        kendotree.dataSource.data(treeData);
    } catch (e) {
        alert(e);
    }
}

function setSelectedNode(node) {
    selectedNode = node;
}

function addCenterPopup() {
    try {
//    alert('compnies to load');
//        if (selectedNode == undefined || (selectedNode.CC_TYPE == 0 || selectedNode.CC_TYPE == -1)) {
        /* var reqData = {};
         reqData.COST_CR_ID = selectNodeId;
         procesRequest("loadCCCompanies.action", reqData, loadCompanySuccess, loadCompanyFail);
         $("#popCountryName").text(companyName); */
        $("#newCCenter").modal('show');
//        } else {
//            showMessage("Error", "Please select Node to add new node.", 2);
//        }
    } catch (e) {
        alert(e);
    }
}


function addNodePopup() {
    try {
//    alert('compnies to load');
        if (selectedNode == undefined || (selectedNode.CC_TYPE == 0 || selectedNode.CC_TYPE == -1)) {
            /* var reqData = {};
             reqData.COST_CR_ID = selectNodeId;
             procesRequest("loadCCCompanies.action", reqData, loadCompanySuccess, loadCompanyFail);
             $("#popCountryName").text(companyName); */
            $("#newCC").modal('show');
        } else {
            showMessage("Error", "Please select Node to add new node.", 2);
        }
    } catch (e) {
        alert(e);
    }
}

function addBudgetPopUp() {
    $("#addBugetAmount").val('');
    //[{"COUNT":1,"AC_NO":"989898990","AC_NAME":"1001","checked":false}]
    try {
        if (finalCheckRow != undefined && finalCheckRow.length == 1) {
            /* var reqData = {};
             reqData.COST_CR_ID = selectNodeId;
             procesRequest("loadCCCompanies.action", reqData, loadCompanySuccess, loadCompanyFail);
             $("#popCountryName").text(companyName); */
            $("#addBudgetPopUp").modal('show');
            $("#addBugetToService").val(finalCheckRow[0].AC_NO);
            if (finalCheckRow[0].AC_NAME.length != 0) {
                $("#addBugetAmount").val(finalCheckRow[0].AC_NAME);
            }

        } else {
            showMessage("Error", "Please select Single Service Number", 2);
        }
    } catch (e) {
        alert(e);
    }
}

function addBudgetToServiceNumber() {
    try {
//    alert('compnies to load');

        if ($("#addBugetAmount").val().length == 0) {
            showMessage("Error", "Please Enter Budget", 2);
            return false;
        }
        if ($("#addBugetToService").val() != finalCheckRow[0].AC_NO) {
            showMessage("Error", "Please Service Number Can not be changed", 2);
            return false;
        }
        if (!(/^[0-9]+$/.test(document.getElementById("addBugetAmount").value))) {
            showMessage("Error", "Budget amount should have numbers only", 2);
            return false;
        }
        var reqData = {};
        reqData.AC_NO = finalCheckRow[0].AC_NO;
        reqData.BUDGET_AMOUNT = $("#addBugetAmount").val();
        reqData.BUDGETACTION = true;

        procesRequest("deleteService.action", reqData, addBudgetSuccess, addBudgetFail, false);


    } catch (e) {
        alert(e);
    }
}

function addCostCodePopUp() {
    try {
//    alert('compnies to load');


        if (selectedNode != undefined && selectedNode.CC_TYPE == 0) {
            /*var reqData = {};
             reqData.COST_CR_ID = selectNodeId;
             procesRequest("loadCCCompanies.action", reqData, loadCompanySuccess, loadCompanyFail);
             $("#popCountryName1").text(companyName); */
            $("#newCCode").modal('show');
        } else {
            showMessage("Error", "Please select Node to add cost code.", 2);
        }
    } catch (e) {
        alert(e);
    }
}

function addCostCenterPopUp() {
    try {
//    alert('compnies to load');
        /*var reqData = {};
         reqData.COST_CR_ID = selectNodeId;
         procesRequest("loadCCCompanies.action", reqData, loadCompanySuccess, loadCompanyFail);
         $("#popCountryName1").text(companyName); */
        $("#divUnAssign").modal('show');

    } catch (e) {
        alert(e);
    }
}


function loadCompanySuccess(resp) {
    var data = [];
    resp = JSON.parse(resp)
    if (resp.objCRSResponse.success) {
        data = resp.objCRSResponse.data;
    }
    $("#compnyComboDiv").data("kendoDropDownList").dataSource.data(data);

}

function loadCompanyFail() {
    showMessage("Error", "Unable to load companies.", 2);
}

function createCostCenter() {
    try {
        var reqData = {};
        reqData.COMPANY_ID = companyId;
        reqData.UID = UID;
        //reqData.COMPANY_NAME = companyName;
        reqData.NEW_CENTER_NAME = $('#costCenterDiv').val();
        if (selectedNode != undefined) {
            reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
        } else {
            reqData.PARENT_CENTER_ID = -1;
        }
        reqData.LEVEL = 0;
        $('#costCenterDiv').val('');
        procesRequest("createCostCenter.action", reqData, costCenterCreateSuccess, costCenterCreateFail, false);
    } catch (e) {
        alert(e)
    }
}



function createCostCode() {
    try {
        var reqData = {};
        reqData.COMPANY_ID = companyId;
        //reqData.COMPANY_NAME = companyName;
        reqData.NEW_CENTER_NAME = $('#costCodeDiv').val();
        $('#costCodeDiv').val('');
        if ((selectedNode != undefined) && (selectedNode.CC_TYPE == 0)) {
            reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
            reqData.LEVEL = 2;
            procesRequest("createCostCenter.action", reqData, costCenterCreateSuccess, costCenterCreateFail, false);
        } else {
            showMessage("Error", "Please select the cost center.", 2);
        }
        //reqData.PARENT_CENTER_LEVEL = 2;


    } catch (e) {
        alert(e)
    }
}

function createCCCostCenter() {
    try {
        var reqData = {};
        reqData.COMPANY_ID = companyId;
        //reqData.COMPANY_NAME = companyName;
        reqData.NEW_CENTER_NAME = $('#costCentreDiv').val();
        $('#costCentreDiv').val('');

        reqData.PARENT_CENTER_ID = -1;
        reqData.LEVEL = 0;
        procesRequest("createCostCenter.action", reqData, costCenterCreateSuccess, costCenterCreateFail, false);

        //reqData.PARENT_CENTER_LEVEL = 2;


    } catch (e) {
        alert(e)
    }
}

function  loadAllServices_HM() {
    $('#searchField').val('');
    filterServiceCC();
    try {
        if (selectedNode != null && selectedNode.CC_TYPE == 2) {
            var reqData = {};
//            reqData.COMPANY_ID = companyId;
            reqData.COST_CENTER = selectedNode.CC_ID;
            procesRequest("loadAllAccountsData.action", reqData, loadAccountsSuccess, loadAccountsFail, false);
            $("#divAddaccounts").modal('show');
        } else {
            showMessage("Error", "Please select the cost code.", 2);
        }
    } catch (e) {
        alert(e);
    }
}

function loadAccountsSuccess(resp) {
    try {
        allAccData = [];
        resp = JSON.parse(resp);
        if (resp.objCRSResponse.success) {
            allAccData = resp.objCRSResponse.data;

        }

        //alert('loading the accounts data :' + data.toSource());
        $("#addAccount").data("kendoGrid").dataSource.data(allAccData);
    } catch (e) {
        alert(e);
    }

}

function loadAccountsFail() {
    showMessage("Error", "Unable to load Services", 2);
}

function costCenterCreateSuccess(resp) {
    resp = JSON.parse(resp);
    var level = resp.objCRSResponse.data.LEVEL;
    var nodeType = '';
    if (0 == level) {
        nodeType = 'Node / Cost center';
    } else if (2 == level) {
        nodeType = 'Cost code';
    }

    if (resp.objCRSResponse.success) {
        showMessage("Success", nodeType + " created  successfully.", 1);
        var reqData = {};
        reqData.COMPANY_ID = companyId;
        reqData.PARENT_ID = -1;
        procesRequest("reloadCostCenterData.action", reqData, relaodCostCenterSucess, relaodCostCenterFail, false);

    } else {
        //showMessage("Error", "unable to create,please try again.", 2); 
        var status = resp.objCRSResponse.data.STATUS;
        if (1 == status) {
            showMessage("Error", nodeType + " is already existed with the same name.", 2);
        } else {
            showMessage("Error", "unable to create,please try again.", 2);
        }
    }
}
function costCenterCreateFail(resp) {
    showMessage("Error", "unable to create,please try again.", 2);
}

function relaodCostCenterSucess(resp) {
    try {
        var costcenterData = JSON.parse(resp);
        var rootNode = {};
        var treeData = [];
        var treeDataName = ["Hierarchy Management", "Ungrouped Services"];
        for (var i = 0; i < treeDataName.length; i++) {
            rootNode = {};
            rootNode.CC_NAME = treeDataName[i];
            rootNode.CC_ID = '-1';
            rootNode.CC_TYPE = '-1';
            rootNode.COLOR = 'blue';
            rootNode.expanded = true;
            rootNode.hasChildren = (treeDataName[i] == "Hierarchy Management" ? true : false);

            if (treeDataName[i] == "Hierarchy Management") {
                rootNode.expanded = true;
                rootNode.items = costcenterData.objCRSResponse.data;
            } else {
                rootNode.isExpand = false;
            }
            treeData.unshift(rootNode);
            //    treeData.push(rootNode);
        }
        //Ungrouped Accounts
//        rootNode.CC_NAME = "Hierarchy Management";
//        rootNode.CC_ID = '-1';
//        rootNode.CC_TYPE = '-1';
//        rootNode.COLOR = 'blue';
//        rootNode.expanded = true;
//         rootNode.items = costcenterData.objCRSResponse.data;
//        treeData.push(rootNode);
        var kendotree = $("#treeview").data("kendoTreeView");
        kendotree.dataSource.data(treeData);
        selectedNode = {};
    } catch (e) {

    }
}

function relaodCostCenterFail(resp) {
    alert(relaodCostCenterFail)
    showMessage("Error", "Unable to load CostCenter details.", 2);
}

function loadCostCenterFail(resp) {
//     alert('Unable to load CostCenter');
    showMessage("Error", "Unable to load CostCenter.", 2);
}

function addAccounts() {
    try {
        var row;
        var grid;
        var dataItem;
        var acc_data = [];
        var reqData = {};
        $.each($("input[name='AC_NO']:checked"), function () {
            row = $(this).closest("tr");
            grid = $("#addAccount").data("kendoGrid");
            dataItem = grid.dataItem(row);
            var accObj = {};
            accObj.AC_NO = dataItem.AC_NAME;
            accObj.AC_NAME = dataItem.AC_NO;
            accObj.PARENT_CENTER_ID = selectedNode.CC_ID;
            accObj.CC_TYPE = 1;
            acc_data.push(accObj);

        });
        reqData.ACC_DATA = acc_data;
        procesRequest("addAccntssToCCenter.action", reqData, addAccountsSuccess, addAccountsFail, false);
    } catch (e) {
        alert(e);
    }
}

function addAccountsSuccess(resp) {
    resp = JSON.parse(resp);
    if (resp.objCRSResponse.success) {
        loadCostCenterAccnts(selectedNode.CC_ID);
        showMessage("Success", "Service added sucessfully.", 1);
    }

}

function addAccountsFail(resp) {
    showMessage("Error", "Unable to add accounts.", 2);
}
function deleteServiceFail(resp) {
    showMessage("Error", "Unable to delete services.", 2);
}
function addBudgetFail(resp) {
    showMessage("Error", "Unable to add/update budget.", 2);
}
function loadCostCenterAccnts(ccId) {
    var reqData = {};
    reqData.COST_CENTER = ccId;
    reqData.COMPANY_ID = companyId;
    procesRequest("loadCostCenterAcnts.action", reqData, loadCCAcntsSuccess, loadCCAcntsFail, false);
}
var finalCheckRow = [];
var finalUncheckRow = [];
function loadCCAcntsSuccess(resp) {
    finalCheckRow = [];
    finalUncheckRow = [];
    try {
        var data = [];
        finalCheckRow = [];
        var obj = {};
        resp = JSON.parse(resp);
        if (resp.objCRSResponse.success) {
            data = resp.objCRSResponse.data;

        }
        //alert('loading the accounts data :' + data.toSource());
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data(data);
        fnMarkSavedCostCenter();
    } catch (e) {
        alert(e);
    }
}

function loadCCAcntsFail(resp) {
    showMessage("Error", "Unable to load cost center accounts.", 2);
}

function fnDeleteAccount(item) {
    var row = $(item).closest("tr");
    var grid = $("#costCenterAccntGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var reqData = {};
    reqData.CC_ID = dataItem.CC_ID;
    procesRequest("deleteCCAccnt.action", reqData, deleteAcntSucess, deleteAcntFail, false);
}

function deleteAcntSucess(resp) {
    resp = JSON.parse(resp);
    if (resp.objCRSResponse.success) {
        showMessage("Success", "Account deleted successfully.", 1);
        loadCostCenterAccnts(selectedNode.CC_ID);
    } else {
        showMessage("Error", "Unable to delete account.", 2);
    }

}

function deleteAcntFail(resp) {
    showMessage("Error", "Unable to delete account.", 2);
}
function fnPrepareCostCenterData(costCenters) {
    $.each(costCenters, function (i, item) {
        item.id = item.CC_ID;
        item.text = item.CC_NAME;
        if (item.HASCHILDRENS > 0) {
            item.hasChildren = true;
            item.isExpand = false;
        } else {
            item.hasChildren = false;
            item.isExpand = true;
        }
        if (item.CC_TYPE == 2) {
            item.COLOR = 'green';
            item.COST_CENTRE_FLAG = true;
        } else {
            item.COST_CENTRE_FLAG = false;
            item.COLOR = 'blue';
        }
    });
    return costCenters;
}

function fnMarkSavedCostCenter() {
    var costCenters = costCenterAccntGrid._data;
    //    $.each(costCenters, function(i, item) {
    for (var i = 0; i < costCenters.length; i++) {
        var dataItem = costCenters[i];
        if (dataItem.COUNT > 0) {
            dataItem.set("checked", true);
            finalCheckRow.push(dataItem);
        } else {
            dataItem.set("checked", false);
        }
    }
    //    });
    return costCenters;
}

function onAllAccGridRowSelect() {

    var isChecked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = costCenterAccntGrid.dataItem(row);
    fnAddRemoveUnCheckedNodes(isChecked, dataItem);
    fnAddRemoveCheckedNodes(isChecked, dataItem);
}

function fnAddRemoveUnCheckedNodes(isChecked, dataItem) {
    var index = finalUncheckRow.indexOf(dataItem);
    if (isChecked) {
        if (index != -1) {
            finalUncheckRow.splice(index, 1);
        }
    } else {
        if (index == -1) {
            finalUncheckRow.push(dataItem);
        }
    }
}

function fnAddRemoveCheckedNodes(isChecked, dataItem) {
    var index = finalCheckRow.indexOf(dataItem);
    if (isChecked) {
        if (index == -1) {
            finalCheckRow.push(dataItem);
        }
        dataItem.set("COUNT", 1);
    } else {
        if (index != -1) {
            finalCheckRow.splice(index, 1);
        }
        dataItem.set("COUNT", 0);
    }
}

//        }

$(document).on("change", "#allViewPointGrid", function () {

    var strGridData = JSON.stringify(costCenterAccntGrid._data);
    var objGridData = JSON.parse(strGridData);
    if (this.checked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = costCenterAccntGrid.dataSource.view()[idx];//checkeRows
            var index = finalCheckRow.indexOf(dataItem);
            if (index == -1) {
                finalCheckRow.push(dataItem);

//                if (dataItem.COUNT == 0) {
//                    dataItem.set("COUNT", 1);
//                }
            }
            $("#" + objGridData[idx].AC_NO).prop('checked', true);
        }
    } else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = costCenterAccntGrid.dataSource.view()[idx];
            var index1 = finalCheckRow.indexOf(dataItem1);
            if (index1 != -1) {
                finalCheckRow.splice(index1, 1);
                finalUncheckRow.push(dataItem1);
                //                if (dataItem1.COUNT != 0) {
                //                    dataItem1.set("COUNT", 0);
                //                }
            }
            $("#" + objGridData[idx].AC_NO).prop('checked', false);
        }
    }
});

function test_pagechange_main_grid(e) {
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

function permit_accountGrid_gridDataBound(arg) {
    kendo.ui.progress($("#costCenterAccntGrid>div.k-grid-content"), false);
    if (arg.sender._data.length === 0) {
        var colCount = $("#costCenterAccntGrid").find('.k-grid-header colgroup > col').length;
        $("#costCenterAccntGrid").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange_main_grid(arg.sender._data);
}

$(document).on("change", "#checkAll", function () {
    var strGridData = JSON.stringify(accountGrid1._data);
    var objGridData = JSON.parse(strGridData);
    if (this.checked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = accountGrid1.dataSource.view()[idx];//checkeRows
            var index = checkeRows.indexOf(dataItem);
            if (index == -1) {
                checkeRows.push(dataItem);
                if (dataItem.COUNT == 0) {
                    dataItem.set("COUNT", 1);
                }
            }
            $("#" + objGridData[idx].ACCOUNT_NUMBER).prop('checked', true);
        }
    } else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = accountGrid1.dataSource.view()[idx];
            var index1 = checkeRows.indexOf(dataItem1);
            if (index1 != -1) {
                checkeRows.splice(index1, 1);
                if (dataItem1.COUNT != 0) {
                    dataItem1.set("COUNT", 0);
                }
            }
            $("#" + objGridData[idx].ACCOUNT_NUMBER).prop('checked', false);
        }
    }
});
function fnPopupUpload1() {
    $('#input_csv').fileinput('clear');
    $("#divUpload").modal('show');
}
function uploadBulkCoupon1() {
    if (document.getElementById("input_csv") !== "") {
        $("#divUpload").modal('hide');
        showMessage("Success", "BulkUpload Done Successfully", 1);
    }
}

function assignAccountNo()
{
    try {
        var row;
        var grid;
        var dataItem;
        var add_ACC = [];
        var reqData = {};

        // alert(JSON.stringify(checkeRows1));
        //        alert(JSON.stringify(finalUncheckRow));
        //        $.each($("input[type='checkbox']:checked"), function(i,item) {
        //            
        //            row = $(this).closest("tr");
        //            // if(row.length>0){
        //            grid = $("#costCenterAccntGrid").data("kendoGrid");
        //            dataItem = grid.dataItem(row);
        //            var accObj = {};
        //            //if(add_ACC!=undefined()){
        //            accObj.AC_NO = dataItem.AC_NO;
        //            accObj.AC_NAME = dataItem.AC_NAME;
        //            accObj.PARENT_CENTER_ID = selectedNode.CC_ID;
        //            accObj.CC_TYPE = 1;
        //            add_ACC.push(accObj);
        //            //  }
        //            alert(JSON.stringify(selectedNode.CC_ID));
        //            alert(JSON.stringify(add_ACC));
        //        //}

        // });
        reqData.add_ACC = finalCheckRow;
        reqData.finalUncheckRow = finalUncheckRow;
        reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
        procesRequest("addAssignToCCenter.action", reqData, addAssignSuccess, addAccountsFail, false);
    } catch (e) {
        alert(e);
    }
}


function deleteServiceNo()
{
    try {
        var row;
        var grid;
        var dataItem;
        var add_ACC = [];
        var reqData = {};

        // alert(JSON.stringify(checkeRows1));
        //        alert(JSON.stringify(finalUncheckRow));
        //        $.each($("input[type='checkbox']:checked"), function(i,item) {
        //            
        //            row = $(this).closest("tr");
        //            // if(row.length>0){
        //            grid = $("#costCenterAccntGrid").data("kendoGrid");
        //            dataItem = grid.dataItem(row);
        //            var accObj = {};
        //            //if(add_ACC!=undefined()){
        //            accObj.AC_NO = dataItem.AC_NO;
        //            accObj.AC_NAME = dataItem.AC_NAME;
        //            accObj.PARENT_CENTER_ID = selectedNode.CC_ID;
        //            accObj.CC_TYPE = 1;
        //            add_ACC.push(accObj);
        //            //  }
        //            alert(JSON.stringify(selectedNode.CC_ID));
        //            alert(JSON.stringify(add_ACC));
        //        //}

        // });
        if (finalCheckRow.length == 0) {
            showMessage("Error", "No Service selected.", 2);
            return false;
        }
        reqData.delete_ACC = finalCheckRow;
        reqData.finalUncheckRow = finalUncheckRow;
        reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
        procesRequest("deleteService.action", reqData, deleteServiceSuccess, deleteServiceFail, false);
    } catch (e) {
        alert(e);
    }
}
function fnPopupUpload() {
    $('#input_csv').fileinput('clear');
    $("#divUpload").modal('show');
}
function uploadBulkCouponCC() {
//    if(document.getElementById("input_csv")!==""){
//     $("#divUpload").modal('hide');
//     showMessage("Success","BulkUpload Done Successfully",1);
// }
    var regex = new RegExp("(.*?)\.(xlsx|xls)$");
    var file1 = document.getElementById("input_csv");
    if (file1.files[0] == undefined || file1.files[0] == "undefined") {
        showMessage("Warning", "Please select a file to upload.", 3, "uploadMsg");
    } else if (!(regex.test($("#input_csv")[0].files[0].name.toLowerCase()))) {
        showMessage("Warning", "Please upload a valid file format.", 3, "uploadMsg");
        $('#input_csv').fileinput('clear');
    } else {
        $("#divUpload").modal('hide');
        $("#CostCenterHomeProgressBarModalId").modal({
            backdrop: 'static',
            keyboard: false
        });
        $( "#CostCenterHomeProgressBarId" ).progressbar({
            value: false
        });
        var fd = new FormData();
        fd.append("userFile", file1.files[0]);
        fd.append("processType", "calltag");

//            var viewPointID = $("#viewPointCombo").data("kendoDropDownList").value();
//            fd.append("viewPoint", viewPointID);
//            if (viewPointID == "-1") {
//                fd.append("mobileData", JSON.stringify(mobileNos));
//            }
        $.ajax({
            url: 'fileUploadCC.action',
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function (response) {
                try {
                    $( "#CostCenterHomeProgressBarId" ).progressbar( "destroy" );
                    $("#CostCenterHomeProgressBarModalId").modal('hide');
                    response = JSON.parse(response);
                    $(".modal-backdrop").removeClass("modal-backdrop fade in");
                    if(response != undefined && (response.EXCEED_MAX_LIMIT || response.EXCEED_MAX_LIMIT == "true")){
                        var msg = "Record size exceeds maximum limit ! Maximum Limit configured: " + response.MAX_LIMIT ; 
                        showMessage("Warning", msg, 2);
                        return true ;
                    }
                    if (response.Total == 0) {
                        var msg = "No records found in uploaded file.";
                        showMessage("Error", msg, 2);
                    } else {
                        if (response.Succeeded == 0) {
                            var msg = "CostCenter details validation failed.Please check xls file once.<br>Total: " + response.Total + ", Success: " + response.Succeeded + ", Failed: " + response.Failed;
                            showMessage("Error", msg, 2);
                        } else {
                            var msg = "Account details are uploaded successfully.<br>Total: " + response.Total + ", Success: " + response.Succeeded + ", Failed: " + response.Failed;
                            showMessage("Success", "CostCenter added successfully", 1);
                        }
                    }
                    var type = "xlsx";
                    var fileType = type.toLowerCase();
                    var fileName = 'CostCenteraAck';
                    var filePath = response.filePath;
                    var flag = false;
                    window.location = ".." + pageContextPath + "/fileDownload.jsp?fileName=" + encrypt(fileName.replace(" ", "_") + "." + fileType.toLowerCase()) + "&filePath=" + encrypt(filePath) + "&formSubmit=" + flag, '_blank';
                } catch (e) {
                }
//                fnReloadAccounts();
                
                var reqData = {};
                reqData.COMPANY_ID = companyId;
                reqData.PARENT_ID = -1;
                procesRequest("reloadCostCenterData.action", reqData, relaodCostCenterSucess, relaodCostCenterFail, false);
            },
            error: function (jqXHR, textStatus, errorMessage) {
                $("#divUpload").modal("hide");
                showMessage("Error", "Failed to upload the file", 2, "msgDiv");
            }
        });
    }
}

function addAssignSuccess(resp) {
//    alert("gsjghsf");
    finalUncheckRow = [];
    resp = JSON.parse(resp);
    if (resp.objCRSResponse.success) {
        loadCostCenterAccnts(selectedNode.CC_ID);
        showMessage("Success", "Accounts assign sucessfully.", 1);
    }

}
function deleteServiceSuccess(resp) {
//    alert("gsjghsf");
    finalUncheckRow = [];
    resp = JSON.parse(resp);
    if (resp.objCRSResponse.success) {
        loadCostCenterAccnts(selectedNode.CC_ID);
        showMessage("Success", "Services deleted sucessfully.", 1);
    }

}
function addBudgetSuccess(resp) {
//    alert("gsjghsf");

    resp = JSON.parse(resp);
    if (resp.objCRSResponse.success) {
        loadCostCenterAccnts(selectedNode.CC_ID);
        showMessage("Success", "Budget Allocated Sucessfully.", 1);
    }

}


function fnDeleteNode()
{
    var reqData = {}
    reqData.CC_ID = selectedNode.CC_ID;
    reqData.CC_NAME = selectedNode.CC_NAME;
//    alert("this node delete = " + selectedNode.CC_ID)
    procesRequest("deleteNodeCenter.action", reqData, deleteNodeSuccess, addAccountsFail, false);
}
function deleteNodeSuccess(res)
{
    res = JSON.parse(res);
    if (res.objCRSResponse.success) {
        // loadCostCenterAccnts(selectedNode.CC_ID);

        showMessage("Success", "Node Delete sucessfully.", 1);
        var reqData = {};
        reqData.COMPANY_ID = companyId;
        reqData.PARENT_ID = -1;
        procesRequest("reloadCostCenterData.action", reqData, relaodCostCenterSucess, relaodCostCenterFail, false);
    }


}
var unAssigndata = [];
function divUnAssign()
{
    var reqData = {}

    reqData.COMPANY_ID = companyId;

    procesRequest("unAssignAccountLoad.action", reqData, unAssignSuccess, addAccountsFail, false);


}
function unAssignSuccess(response)
{
    response = JSON.parse(response);
    createUnassignGrid(response.objCRSResponse.data)
}

function createUnassignGrid(unAssign)
{
    $("#unAssignGrid").kendoGrid({
        dataSource: {
            data: unAssign,
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        //  dataBound: permit_gridDataBound1,
        filterable: true,
        columnMenu: true,
//        height:350,
        pageable: true,
        columns: [
            {
                field: "ACCOUNT_NAME",
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
    });
}

function closeModal() {
    $("#divUnAssign").modal('hide');
    loadKUnMask();
}

function AccounNameFilter()
{
    var accname = $('#accName').val();

    var grid = $("#unAssignGrid").data("kendoGrid");
    grid.dataSource.query({
        page: 1,
        pageSize: 10,
        filter: {
            logic: "or",
            filters: [
                {
                    field: "ACCOUNT_NAME",
                    operator: "contains",
                    value: accname
                },
                {
                    field: "ACCOUNT_NAME",
                    operator: "eq",
                    value: accname
                }
            ]
        }
    });
}

function AccounNoFilter()
{
    var accno = $('#accNo').val();
    var grid = $("#unAssignGrid").data("kendoGrid");
    grid.dataSource.query({
        page: 1,
        pageSize: 10,
        filter: {
            logic: "or",
            filters: [
                {
                    field: "ACCOUNT_NO",
                    operator: "eq",
                    value: accno
                }
            ]
        }
    });
}


function filterData() {
    var accno = $('#accNo').val();
    var accname = $('#accName').val();
    if (accno != "")
    {
        AccounNoFilter();
    } else
    {
        AccounNameFilter();
    }



}

function filterAccountsCC() {
    var $filter = new Array();
    var $x = $("#searchAccount").val();
    if ($x) {
        $filter.push({
            field: "AC_NO",
            operator: "contains",
            value: $x
        });
    }
    $("#costCenterAccntGrid").data("kendoGrid").dataSource.filter($filter);
}

function filterServiceCC() {
    var $filter = new Array();
    var $x = $("#searchField").val();
    if ($x) {
        $filter.push({
            field: "AC_NAME",
            operator: "contains",
            value: $x
        });
    }
    $("#addAccount").data("kendoGrid").dataSource.filter($filter);
}

function onCheckNode(e, expandFlag) {
    var treeview = $("#treeview").getKendoTreeView();

    if (preItemId != "" && preItemId != undefined) {
        $('#treeview ul [data-uid=' + preItemId + '] > div > span.k-in').css("background-color", "#ffffff");
    }
    var dataItem = treeview.dataItem(e.node);
    var itemId = e.node.getAttribute("data-uid");
    preItemId = itemId;
    $('#treeview ul [data-uid=' + itemId + '] > div > span.k-in').css("background-color", "#cac8c8");
    if (dataItem.CC_NAME != "Hierarchy Management") {
        $('#costcenterId').attr('disabled', "true");
        $("#costcenterId").addClass("primarybt2disable");
    }

    if (dataItem.CC_NAME == "Hierarchy Management") {
        $('#costcenterId').attr('disabled', "false");
        $("#costcenterId").removeClass("primarybt2disable");
        $('#nodeId').attr('disabled', "true");
        $('#costCodeId').attr('disabled', "true");
        $("#costCodeId").addClass("primarybt2disable");
        $("#nodeId").addClass("primarybt2disable");
        $('#serviceId').attr('disabled', "true");
        $("#serviceId").addClass("primarybt2disable");
    } else if (dataItem.HASCHILDRENS == 0 && !dataItem.COST_CENTRE_FLAG && dataItem.CC_NAME != "Ungrouped Services") {
        $('#costCodeId').attr('disabled', "false");
        $('#nodeId').attr('disabled', "false");
        $("#costCodeId").addClass("primarybt2enable");
        $("#nodeId").addClass("primarybt2enable");
        $("#costCodeId").removeClass("primarybt2disable");
        $("#nodeId").removeClass("primarybt2disable");
        // $("#accountId").removeClass("primarybt2enable");
        //$("#accountId").addClass("primarybt2disable");
        $('#serviceId').attr('disabled', "true");
        $("#serviceId").addClass("primarybt2disable");
    } else if ((dataItem.HASCHILDRENS == 0 && dataItem.COST_CENTRE_FLAG) || dataItem.CC_NAME == "Ungrouped Services") {
        $('#nodeId').attr('disabled', "true");
        $('#costCodeId').attr('disabled', "true");
        $("#costCodeId").addClass("primarybt2disable");
        $("#nodeId").addClass("primarybt2disable");

        $("#costCodeId").removeClass("primarybt2enable");
        $("#nodeId").removeClass("primarybt2enable");
        if (dataItem.CC_TYPE != 2) {
            $('#serviceId').attr('disabled', "true");
            $("#serviceId").addClass("primarybt2disable");
        } else {
            $('#serviceId').attr('disabled', "false");
            $("#serviceId").removeClass("primarybt2disable");
        }
        //  $("#accountId").addClass("primarybt2enable");
        //    $("#accountId").removeClass("primarybt2disable");
    } else if (dataItem.CC_NAME != "Ungrouped Services") {
        $('#nodeId').attr('disabled', "false");
        $('#costCodeId').attr('disabled', "false");
        $("#costCodeId").removeClass("primarybt2disable");
        $("#costCodeId").addClass("primarybt2enable");
        $("#nodeId").removeClass("primarybt2disable");
        $("#nodeId").addClass("primarybt2enable");
        //   $("#accountId").removeClass("primarybt2enable");
        //  $("#accountId").addClass("primarybt2disable");
        $('#serviceId').attr('disabled', "true");
        $("#serviceId").addClass("primarybt2disable");
    }
    var node = {};
    var selectedId = dataItem.CC_ID;
    node.CC_ID = selectedId;
    node.CC_NAME = dataItem.CC_NAME;
    node.CC_TYPE = dataItem.CC_TYPE;
    //alert('selectedId :'+selectedId+' Cost center name :'+node.CC_NAME);
    if (!expandFlag) {
        if (dataItem.CC_TYPE == 2) {
            loadCostCenterAccnts(selectedId);
        } else
        {
            $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
        }
    } else
    {
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
    }
    if (dataItem.CC_NAME == "Ungrouped Services") {
        // $("#costCenterAccntGrid").css("display","none");
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
        $("#costCenterUnassignAccntGrid").css("display", "block");
        $("#searchAccount").css("display", "none");
        $("#searchUnassignAccount").css("display", "block");

        $("#costCenterUnassignAccntGrid").css("display", "none");
        loadCostCenterAccnts(selectedId);
    } else {
        $("#costCenterUnassignAccntGrid").css("display", "none");
        $("#costCenterAccntGrid").css("display", "block");
        $("#searchAccount").css("display", "block");
        $("#searchUnassignAccount").css("display", "none");
    }
    if (dataItem.CC_NAME == "Hierarchy Management" || dataItem.CC_NAME == "Ungrouped Services") {
        $("#deleteAccountId").css("visibility", "hidden");
        $("#saveAccountId").css("visibility", "hidden");
        $("#saveBudgetId").css("visibility", "hidden");
    } else {
        $("#deleteAccountId").css("visibility", "visible");
        $("#saveAccountId").css("visibility", "visible");
        $("#saveBudgetId").css("visibility", "visible");
    }

    setSelectedNode(node);
    uncheckOtherNodes(selectedId, treeview);

}

function getRoot() {

}

function loadUnassignAccnts() {
    var reqData = {};
    reqData.COMPANY_ID = companyId;
    procesRequest("unAssignAccountLoad.action", reqData, unassignAccntsSuccess, unassignAccntsFail, false);
}
function unassignAccntsSuccess(resp) {
    try {
        var data = [];
        resp = JSON.parse(resp);
        if (resp.objCRSResponse.success) {
            data = resp.objCRSResponse.data;
        }
        $("#costCenterUnassignAccntGrid").data("kendoGrid").dataSource.data(data);
        //fnMarkSavedCostCenter();
    } catch (e) {
        alert(e);
    }
}

function unassignAccntsFail(resp) {
    showMessage("Error", "Unable to add accounts.", 2);
}

function filterUnAssignAccounts() {
    var $filter = new Array();
    var $x = $("#searchUnassignAccount").val();
    if ($x) {
        $filter.push({
            field: "AC_NO",
            operator: "contains",
            value: $x
        });
    }
    $("#costCenterAccntGrid").data("kendoGrid").dataSource.filter($filter);
}