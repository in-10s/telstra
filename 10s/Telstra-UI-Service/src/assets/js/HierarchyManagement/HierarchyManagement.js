/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var preItemId;
var costCenterAccntGrid;
var companyId;
var companyName;
var selectedNode;
var hierarchyTotalResponse;
var hierarchySet;
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
    }
    catch (e) {
        alert(e);
    }
    loadCCAccountsGrid();
});

function loadCostCenters(respData) {
    debugger;
    var inputData = respData.inputData;
    $("#companyName").text(inputData.COMPANY_NAME);
    companyId = inputData.COMPANY_ID;
    companyName = inputData.COMPANY_NAME;
    var treeData = [];
    var rootNode = {};
    //var treeDataName = ["Hierarchy Accounts", "Ungrouped Accounts"];
    var treeDataName = ["Hierarchy"];
    for (var i = 0; i < treeDataName.length; i++) {
        rootNode = {};
        rootNode.CC_NAME = treeDataName[i];
        rootNode.CC_ID = '-1';
        rootNode.CC_TYPE = '-1';
        rootNode.COLOR = 'blue';
        rootNode.expanded = true;
//    rootNode.items = respData.costCenterData;
        rootNode.hasChildren = (treeDataName[i] == "Hierarchy" ? true : false);

        if (treeDataName[i] == "Hierarchy") {
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
    loadLocationBaseData();

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
                        COUNT: {
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
            // dataBound: permit_accountGrid_gridDataBound,
            columns: [
                //define template column with checkbox and attach click event handler

//                {
//                    title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='allViewPointGrid'></span>",
//                    template: $("#costCenterAccnts").html(),
//                    menu: false,
//                    width: "10%"
//                },
                {
                    field: "AC_NO",
                    title: "Service Number",
                    template: '<span style="cursor:default;white-space: nowrap;" title="#=AC_NO#">#=AC_NO#</span>',
                    width: "30%"
                },
                {
                    field: "Budget",
                    title: "Budget",
                    template: '<span style="cursor:default;white-space: nowrap;" title="#=Budget#">#=Budget#</span>',
                    width: "30%"
                },
                {
                    field: "Spend",
                    title: "Spend",
                    template: '<span style="cursor:default;white-space: nowrap;" title="#=Spend#">#=Spend#</span>',
                    width: "30%"
                }
//                {
//                    field: "AC_NAME",
//                    title: "Account Name",
//                    template: '<span style="cursor:default;white-space: nowrap;" title="#=AC_NAME#">#=AC_NAME#</span>',
//                    width: "30%"
//                }, 
//                {
//                    field: "TYPE",
//                    title: "Service Number",
//                    width: "30%"
//                },
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
//        costCenterAccntGrid.table.on("click", ".checkbox1", onAllAccGridRowSelect);
    } catch (e) {
        alert(e.message);
    }
}



var nodedata = ""
function onCheckNode(e, expandFlag) {
    //alert('selected');
//    $("#allViewPointGrid").prop('checked', false);
    var treeview = $("#treeview").getKendoTreeView();
    if (preItemId != "" && preItemId != undefined) {
        $('#treeview ul [data-uid=' + preItemId + '] > div > span.k-in').css("background-color", "#ffffff");
    }

    var dataItem = treeview.dataItem(e.node);
    var itemId = e.node.getAttribute("data-uid");
    preItemId = itemId;
    $('#treeview ul [data-uid=' + itemId + '] > div > span.k-in').css("background-color", "#cac8c8");
    console.log(JSON.stringify(dataItem))
    // alert(dataItem.HASCHILDRENS + dataItem.CC_NAME + dataItem.COST_CENTRE_FLAG)
    if (dataItem.HASCHILDRENS == 0 && !dataItem.COST_CENTRE_FLAG && dataItem.CC_NAME != "Ungrouped Accounts") {
        $('#subscriberCodeId').addClass("primarybt2enable");
        $('#subscriberCodeId').attr('disabled', "true");
//        $('#costCodeId').attr('disabled',"false");
        $('#nodeId').attr('disabled', "false");
//        $("#costCodeId").addClass("primarybt2enable");  
        $("#nodeId").addClass("primarybt2enable");
//        $("#costCodeId").removeClass("primarybt2disable");  
        $("#nodeId").removeClass("primarybt2disable");
        // $("#accountId").removeClass("primarybt2enable");
        //$("#accountId").addClass("primarybt2disable");
    } else if ((dataItem.HASCHILDRENS == 0 && dataItem.COST_CENTRE_FLAG) || dataItem.CC_NAME == "Ungrouped Accounts") {

        $('#serviceCodeId').addClass("primarybt2enable");
        $("#serviceCodeId").removeClass("primarybt2disable");

        $('#accountCodeId').addClass("primarybt2enable");
        //$("#accountCodeId").removeClass("primarybt2disable");
        $('#subscriberCodeId').attr('disabled', "false");
        $('#nodeId').attr('disabled', "true");
//        $('#costCodeId').attr('disabled',"true");
//        $("#costCodeId").addClass("primarybt2disable");  
        $("#nodeId").addClass("primarybt2disable");

//        $("#costCodeId").removeClass("primarybt2enable");  
        $("#nodeId").removeClass("primarybt2enable");
        //  $("#accountId").addClass("primarybt2enable");
        //    $("#accountId").removeClass("primarybt2disable");
    } else if (dataItem.CC_NAME != "Ungrouped Accounts") {
        $('#subscriberCodeId').addClass("primarybt2enable");
        $('#nodeId').attr('disabled', "false");
//        $('#costCodeId').attr('disabled',"false");
//        $("#costCodeId").removeClass("primarybt2disable");
//        $("#costCodeId").addClass("primarybt2enable");  
        $("#nodeId").removeClass("primarybt2disable");
        $("#nodeId").addClass("primarybt2enable");
        //   $("#accountId").removeClass("primarybt2enable");
        //  $("#accountId").addClass("primarybt2disable");
    }
    var node = {};
    var selectedId = dataItem.CC_ID;
    node.CC_ID = selectedId;
    node.CC_NAME = dataItem.CC_NAME;
    node.CC_TYPE = dataItem.CC_TYPE;
    //alert('selectedId :' + selectedId + ' Cost center name :' + node.CC_NAME);
    // alert(dataItem.CC_TYPE)
    node.CC_PARENT = dataItem.CC_PARENT;
    // alert(JSON.stringify(dataItem))
    nodedata = node;
    if (!expandFlag) {
        // $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
//        if(dataItem.CC_TYPE==2){
//            loadCostCenterAccnts(selectedId);
//        }else
//        {
//            
//        }
    } else
    {
        // $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
    }
    if (dataItem.CC_NAME == "Ungrouped Accounts") {
        $("#costCenterAccntGrid").css("display", "none");
//        $("#costCenterUnassignAccntGrid").css("display", "block");
//        $("#searchAccount").css("display", "none");
//        $("#searchUnassignAccount").css("display", "block");
        // loadUnassignAccnts();
    } else {
//        $("#costCenterUnassignAccntGrid").css("display", "none");
        $("#costCenterAccntGrid").css("display", "block");
//        $("#searchAccount").css("display", "block");
//        $("#searchUnassignAccount").css("display", "none");
    }
//    if (dataItem.CC_NAME == "Hierarchy Accounts" || dataItem.CC_NAME == "Ungrouped Accounts") {
//        $("#deleteAccountId").css("visibility", "hidden");
//        $("#saveAccountId").css("visibility", "hidden");
//    } else {
//        $("#deleteAccountId").css("visibility", "visible");
//        $("#saveAccountId").css("visibility", "visible");
//    }

    setSelectedNode(node);
    onSelectedNode(selectedId);

}

function setSelectedNode(node) {
    selectedNode = node;
}
function onSelectedNode(nodeId) {
    /*var reqData = {};
    reqData.NODE_ID = nodeId;
    reqData.selMonth = $("#hierarchy_month_combo_id").val();
    ;
    procesRequest("fetchSelectedNodeHierarchy.action", reqData, NodeAccountsSuccess, fetchSelectedNodeAccountsFail, false);*/
    hierarchySet = new Set();
    fetchHierarchy(nodeId);
    NodeAccountsSuccess(Array.from(hierarchySet));
}
function NodeAccountsSuccess(resp) {
    try {
        var gridData = resp;
        /*resp = JSON.parse(resp);
        if (resp.objCRSResponse.success) {
            gridData = resp.objCRSResponse.data;
        }*/
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data(gridData);
        //fnMarkSavedCostCenter();
    } catch (e) {
        alert(e);
    }
}

function fetchSelectedNodeAccountsFail(resp) {
    showMessage("Error", "Unable to add accounts.", 2);
}

function fetchHierarchy(ccId){
ccIdDetails(ccId);
for(var index=0;index<hierarchyTotalResponse.length;index++){
var ele = hierarchyTotalResponse[index];
if(ele.ReportsTo != null && ele.ReportsTo == ccId){
hierarchySet.add(ele);
fetchHierarchy(ele.ccId);
}
}
}

function ccIdDetails(ccId){
for(var i=0; i<hierarchyTotalResponse.length;i++){
var ele = hierarchyTotalResponse[i];
if(ele.ccId == ccId){
console.log("ele", ele);
hierarchySet.add(ele);
break;
}
}
}

function reloadHierarchydata() {
    var reqData = {};
    // reqData.COMPANY_ID = companyId;
    reqData.PARENT_ID = -1;
    procesRequest("reloadHierarchyData.action", reqData, relaodCostCenterSucess, relaodCostCenterFail, false);
    loadLocationBaseData();
}

function loadLocationBaseData() {
    sampleData = [];
    var selMonth = $("#hierarchy_month_combo_id").val();
    var reqData = {};
    reqData.selMonth = selMonth;
    procesRequest("fetchHierarchyLocationBase.action", reqData, fnfetchlocationbasesucc, fnfetchlocationbaseFail, false);
}

function fnfetchlocationbasesucc(response) {
    console.log("fnfetchlocationbasesucc:::", response);
    var res = JSON.parse(response);
    var status = res.objCRSResponse.status;
    if (res.objCRSResponse.success == true) {
        var locationdata = res.objCRSResponse.data;
        sampleData = res.objCRSResponse.data;
        for (var i = 0; i < sampleData.length; i++) {
            if (sampleData[i].ReportsTo == "") {
                sampleData[i].ReportsTo = null;
            }
            sampleData[i].AC_NO = sampleData[i].Name;
        }
        hierarchyTotalResponse = res.objCRSResponse.data;
        //locationtree();
    } else {
        showMessage("Error", "Unable to fetch location base details.", 2);
    }
}

function fnfetchlocationbaseFail(response) {

}

function relaodCostCenterSucess(resp) {
    try {
        var costcenterData = JSON.parse(resp);
        var rootNode = {};
        var treeData = [];
        rootNode.CC_NAME = 'Hierarchy';
        rootNode.CC_ID = '-1';
        rootNode.CC_TYPE = '-1';
        rootNode.COLOR = 'blue';
        rootNode.expanded = true;
        rootNode.items = costcenterData.objCRSResponse.data;
        treeData.push(rootNode);
        //alert(JSON.stringify(treeData))
        var kendotree = $("#treeview").data("kendoTreeView");
        kendotree.dataSource.data(treeData);
        selectedNode = {};

    } catch (e) {

    }
}

function relaodCostCenterFail(resp) {
    showMessage("Error", "Unable to load CostCenter details.", 2);
}
