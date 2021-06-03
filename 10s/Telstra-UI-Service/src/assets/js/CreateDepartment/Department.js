/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
var compIdGlobal = "";
var checkedIds = [];
var accounts_grid = "";
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
                        ACCOUNT_NUMBER: {
                            editable: false
                        },
                        ACCOUNT_NAME: {
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
                    title: "Account Name",
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
                    title: "Account Number",
                    template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
                    width: "35%"
                }, {
                    field: "ACCOUNT_NAME",
                    title: "Account Name",
                    template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
                    encoded: false,
                    width: "35%",
                    attribute: {
                        style: "text-align:center"
                    }
                }, {
                    field: "ACCOUNT_TYPE",
                    title: "Service Type",
                    width: "30%",
                    template: $("#customerAccountGridAccountTypeTemplate").html()
                }
            ]
        });
    } catch (e) {
        alert(e);
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



var flag = false;
var servicedata = "";
//fnExternalUsersAccountFail success fn ::fetching target pid user accounts and displaying grid
function fnExternalUsersAccountSucc(res) {
    //console.log(res);
    //debugger;
    var status = JSON.parse(res).objCRSResponse.status;
    if (status) {
        checkedIds = [];
        flag = false;
        var data = JSON.parse(res).objCRSResponse.data;
        accountsData = data;
        // alert(JSON.stringify(accountsData))


//        $.each(data, function(i, items) {
//            if (items.COUNT > 0) {
//                var index = checkedIds.indexOf(items.ACCOUNT_NO);
//                if (index == -1) {
//                    checkedIds.push(items.ACCOUNT_NO);
//                }
//                flag = true;
//            }
//        });
//debugger;

        $("#divPermissions").on('shown.bs.modal', function () {
//            accounts_grid.setDataSource(new kendo.data.DataSource({
//                data: accountsData,
//                pageSize: 10
//            });
            // $("#gridAccounts1").data("kendoGrid").dataSource.data([]);
            $("#gridAccounts1").data("kendoGrid").dataSource.data(accountsData);
            // accounts_grid.refresh();
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



function fnExternalUsersAccountSucc2(res) {
    // alert("SDFsdafsdafsda")
    debugger;
    var status = JSON.parse(res).objCRSResponse.status;

    if (status) {
        checkedIds = [];
        flag = false;
        var data = JSON.parse(res).objCRSResponse.data;
        servicedata = data;
        // alert(JSON.stringify(servicedata))

//        $.each(data, function(i, items) {
//            if (items.COUNT > 0) {
//                var index = checkedIds.indexOf(items.ACCOUNT_NO);
//                if (index == -1) {
//                    checkedIds.push(items.ACCOUNT_NO);
//                }
//                flag = true;
//            }
//        });


        $("#divPermissions1").on('shown.bs.modal', function () {
//            service_grid.setDataSource(new kendo.data.DataSource({
//                data: servicedata,
//                pageSize: 10
//            }));
            $("#gridAccounts2").data("kendoGrid").dataSource.data(servicedata);
            //$("#gridAccounts2").data("kendoGrid").dataSource.data(accountsData);
            // accounts_grid.refresh();
        });
        loadModal('divPermissions1');
        //	var width=( jQuery('body').width());
        //         $("#divPermissions").modal({
        //            backdrop: 'static'
        //        });
        //	$('.modal-open').css('width',width);
    } else {
        showMessage("Error", "User accounts fetching failed.", 2);
    }



}










function test_pagechange1(e) {
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

function test_pagechange2(e) {
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


function addaccountCodePopUp() {
    debugger;

//    if (compIdGlobal == "") {
//        showMessage("Warning", "Please select customer", 2);
//        return;
//    }
    if ($("#accName"))
        $("#accName").val("");
    if ($("#accNo"))
        $("#accNo").val("");
    if ($("#type"))
        $("#type").val("");
    compIdGlobal = localStorage.getItem("COMPANY_ID");
    accounts_grid = $("#gridAccounts1").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        dataBound: permit_gridDataBound3,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [
            {
                width: 50,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheck(this)' id='checkAll'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
                template: $("#checkbox_template1").html(),
                editable: false

            },
            {
                field: "ACCOUNT_NO",
                title: "Account Number",
                template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
                width: 200
            },
            {
                field: "ACCOUNT_NAME",
                title: "Account Name",
                template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
                encoded: false,
                width: 200,
                attribute: {
                    style: "text-align:center"
                }
            }
//            {
//                field: "SERVICE_TYPE",
//                title: "Service type",
//                template: $("#customerAccountGridServiceTypeTemplate").html(),
//                encoded: false,
//                width: 200,
//                attribute: {
//                    style: "text-align:center"
//                }
//            }
        ]
    }).data('kendoGrid');
    accounts_grid.table.on("click", ".checkbox1", selectRow);
    //  currentGird = "gridAccounts";
    $('#gridAccounts1').show();

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
    $('#divPermissions').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    })
    accounts_grid.dataSource.data([]);
    displayLoading("#gridAccounts1>div.k-grid-content");

    procesRequest("addaccountsdept.action", reqData, fnExternalUsersAccountSucc, fnExternalUsersFail, false);



}
var service_grid = "";
function addservicesCodePopUp_dept() {
    // alert("sdfsd")
    debugger;
    $("#serviceno").val("");
    $("#accno").val("");
    if ($("#service"))
        $("#service").val("");
    if ($("#type"))
        $("#type").val("");
    compIdGlobal = localStorage.getItem("COMPANY_ID");
    service_grid = $("#gridAccounts2").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        dataBound: permit_gridDataBound4,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [
            {
                width: 50,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' onchange='OnCheckAllCheck1(this)' id='checkAll'><label id='checkAllLabel' style='margin-bottom:-10px;'></label></span>",
                template: $("#checkbox_template3").html(),
                editable: false

            },
            {
                field: "ACCOUNT_NO",
                title: "Account Number",
                template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
                width: 200
            },
//            {
//                field: "ACCOUNT_NAME",
//                title: "Account Name",
//                template: '<span style="cursor:default" title="#=ACCOUNT_NAME#">#=ACCOUNT_NAME#</span>',
//                encoded: false,
//                width: 200,
//                attribute: {
//                    style: "text-align:center"
//                }
//            },
            {
                field: "SERVICE_TYPE",
                title: "Service Number",
                template: $("#customerAccountGridServiceTypeTemplate").html(),
                encoded: false,
                width: 200,
                attribute: {
                    style: "text-align:center"
                }
            }
        ]
    }).data('kendoGrid');
    service_grid.table.on("click", ".checkbox1", selectRow1);
    //  currentGird = "gridAccounts";
    $('#gridAccounts2').show();

    $('#saveAccount').show();
    $('.alert').hide();
//    var row = $(obj).closest("tr");
    //var gridObj = $("#permissions_grid").data("kendoGrid");
//    var item = gridObj.dataItem(row);
    var reqData = {};
    reqData.COMPANY_ID = compIdGlobal;
//    userName = item.LOGIN_ID;
//    reqData.U_ID = item.LOGIN_ID;
//    reqData.AccInfo=true;
//    //    reqData.U_ID = userName;
    $('#divPermissions').hide();
    $('#divPermissions1').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });

    service_grid.dataSource.data([]);
    displayLoading("#gridAccounts2>div.k-grid-content");
    //alert("dsfsdf" + JSON.stringify(reqData));
    //reqData=encrypt(JSON.stringify(reqData,replacer));



    // procesRequest("servicesFetch.action", reqData, fnExternalUsersAccountSucc2, fnExternalUsersFail2);

    $.ajax({
        url: "deptservicesFetch.action",
        method: 'POST',
        dataType: "html",
        data: {
            "reqData": encrypt(JSON.stringify(reqData, replacer))
        },
        beforeSend: function (jqXHR, settings) {
            //alert("beforeSend");
        },
        success: function (res, textStatus, jqXHR) {

            //  alert(JSON.stringify(res))

            var status = JSON.parse(res).objCRSResponse.status;
            // alert(status)
            if (status) {
                checkedIds = [];
                flag = false;
                var data = JSON.parse(res).objCRSResponse.data;
                servicedata = data;
                //alert(JSON.stringify(servicedata))

//        $.each(data, function(i, items) {
//            if (items.COUNT > 0) {
//                var index = checkedIds.indexOf(items.ACCOUNT_NO);
//                if (index == -1) {
//                    checkedIds.push(items.ACCOUNT_NO);
//                }
//                flag = true;
//            }
//        });


                // $("#divPermissions1").on('shown.bs.modal', function () {
                //alert("123")
//            service_grid.setDataSource(new kendo.data.DataSource({
//                data: servicedata,
//                pageSize: 10
//            }));
                $("#gridAccounts2").data("kendoGrid").dataSource.data(servicedata);
                //$("#gridAccounts2").data("kendoGrid").dataSource.data(accountsData);
                //  service_grid.refresh();
                //  });
                loadModal('divPermissions1');



                //if (res.objCRSResponse != null) {

                //window.location.href = "SecurityErrorPage.do";
                //console.log("SessionExp");
                //   window.location.href = "SessionExp.action";
                // }
                // prepareIndexCouponsDiv();


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(JSON.stringify(textStatus))
            console.log("Error in request...");
        },
        complete: function (jqXHR, textStatus) {
            //this.isResponseReady=true;
            //alert("complete");
        },
    });




}


function replacer(key, value) {
    if (value === null) {
        return "";
    }
    return value;
}
function fnExternalUsersFail2() {
    showMessage("Error", "User  fetching  failed.", 2);
}


//selectAll checkbox on click event
function OnCheckAllCheck(obj) {
    debugger;
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

function OnCheckAllCheck1(obj) {
    
    var isChecked = $(obj).is(':checked');
    var strGridData = JSON.stringify(service_grid._data);
    var objGridData = JSON.parse(strGridData);
    if (obj.checked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = service_grid.dataSource.view()[idx];
            var index = checkedIds.indexOf(dataItem);
            if (index == -1) {
                checkedIds.push(dataItem);
                if (dataItem.COUNT == 0) {
                    dataItem.set("COUNT", 1);
                }
            }
            $("#" + objGridData[idx].ACCOUNT_NO+objGridData[idx].SERVICE_TYPE).prop('checked', true);
        }

    }
    else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = service_grid.dataSource.view()[idx];
            var index1 = checkedIds.indexOf(dataItem1);
            if (index1 != -1) {
                checkedIds.splice(index1, 1);
                if (dataItem1.COUNT != 0) {
                    dataItem1.set("COUNT", 0);
                }
            }
            $("#" + objGridData[idx].ACCOUNT_NO+objGridData[idx].SERVICE_TYPE).prop('checked', false);
        }
    }

}

function selectRow() {
    var checked = this.checked;
    var row = $(this).closest("tr");
    // accounts_grid
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



function selectRow1() {
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = service_grid.dataItem(row);
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


function fnExternalUsersFail() {
    showMessage("Error", "User  fetching  failed.", 2);
}

function permit_gridDataBound3(arg) {
    kendo.ui.progress($("#gridAccounts1>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#gridAccounts1").find('.k-grid-header colgroup > col').length;
        $("#gridAccounts1").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange1(arg.sender._data);
}



function permit_gridDataBound4(arg) {
    kendo.ui.progress($("#gridAccounts2>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#gridAccounts2").find('.k-grid-header colgroup > col').length;
        $("#gridAccounts2").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange2(arg.sender._data);
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
                },
                {
                    field: "AC_NAME",
                    title: "Account Number",
                    template: '<span style="cursor:default;white-space: nowrap;" title="#=AC_NAME#">#=AC_NAME#</span>',
                    width: "30%"
                }, 
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
    companyName = inputData.COMPANY_NAME;
    var treeData = [];
    var rootNode = {};
    //var treeDataName = ["Department Accounts", "Ungrouped Accounts"];
    var treeDataName = ["Department Hierarchy"];
    for (var i = 0; i < treeDataName.length; i++) {
        rootNode = {};
        rootNode.CC_NAME = treeDataName[i];
        rootNode.CC_ID = '-1';
        rootNode.CC_TYPE = '-1';
        rootNode.COLOR = 'blue';
        rootNode.expanded = true;
//    rootNode.items = respData.costCenterData;
        rootNode.hasChildren = (treeDataName[i] == "Department Hierarchy" ? true : false);

        if (treeDataName[i] == "Department Hierarchy") {
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



function addNodePopup_dept() {
    //alert("sdfsafs")
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



function createCostCenter_dept() {
    debugger;
    try {
        var reqData = {};
        reqData.COMPANY_ID = companyId;
        reqData.COMPANY_NAME = companyName;
        reqData.NEW_CENTER_NAME = $('#costCenterDiv').val();
        if (selectedNode != undefined) {
            reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
        } else {
            reqData.PARENT_CENTER_ID = -1;
        }
        reqData.LEVEL = 0;
        $('#costCenterDiv').val('');
        procesRequest("createDepartmentNode.action", reqData, costCenterCreateSuccess, costCenterCreateFail, false);
    } catch (e) {
        alert(e)
    }
}

function createCostCode() {
    try {
        var reqData = {};
        reqData.COMPANY_ID = companyId;
        reqData.COMPANY_NAME = companyName;
        reqData.NEW_CENTER_NAME = $('#costCodeDiv').val();
        $('#costCodeDiv').val('');
        if ((selectedNode != undefined) && (selectedNode.CC_TYPE == 0)) {
            reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
            reqData.LEVEL = 2;
            procesRequest("createDepartmentNode.action", reqData, costCenterCreateSuccess, costCenterCreateFail, false);
        } else {
            showMessage("Error", "Please select the cost center.", 2);
        }
        //reqData.PARENT_CENTER_LEVEL = 2;


    } catch (e) {
        alert(e)
    }
}

function  loadAllAccounts() {
    try {
        if (selectedNode != null && selectedNode.CC_TYPE == 2) {
            var reqData = {};
            reqData.COMPANY_ID = companyId;
            procesRequest("loadAllAccountsdeptData.action", reqData, loadAccountsSuccess, loadAccountsFail, false);
            $("#divAddaccounts").modal('show');
        } else {
            showMessage("Error", "Please select the cost code.", 2);
        }
    } catch (e) {

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
    showMessage("Error", "Unable to load accounts.", 2);
}

function costCenterCreateSuccess(resp) {
    resp = JSON.parse(resp);
    var level = resp.objCRSResponse.data.LEVEL;
    var nodeType = '';
    if (0 == level) {
        nodeType = 'Node';
    } else if (2 == level) {
        nodeType = 'Cost code';
    }

    if (resp.objCRSResponse.success) {
        showMessage("Success", nodeType + " created  successfully.", 1);
        var reqData = {};
        // reqData.COMPANY_ID = companyId;
        reqData.PARENT_ID = -1;
        procesRequest("reloadDEPTData.action", reqData, relaodCostCenterSucess, relaodCostCenterFail, false);

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
function loadNodesOnChange() {
    var reqData = {};
    reqData.COMPANY_ID = companyId;
    reqData.PARENT_ID = -1;
    procesRequest("reloadDEPTData.action", reqData, relaodCostCenterSucess, relaodCostCenterFail, false);
}
function fnPopupUpload() {
    $('#input_csv').fileinput('clear');
    $("#divUpload").modal('show');
}
function uploadBulkCoupon() {
//    alert('::uploadBluk::');
//    if(document.getElementById("input_csv")!==""){
//     $("#divUpload").modal('hide');
//     showMessage("Success","BulkUpload Done Successfully",1);
// }
    var file1 = document.getElementById("input_csv");
    if (file1.files[0] == undefined || file1.files[0] == "undefined") {
        showMessage("Warning", "Please select a file to upload.", 3, "uploadMsg");
    } else {
        loadKMask();
        var fd = new FormData();
        fd.append("userFile", file1.files[0]);
        fd.append("processType", "calltag");

//            var viewPointID = $("#viewPointCombo").data("kendoDropDownList").value();
//            fd.append("viewPoint", viewPointID);
//            if (viewPointID == "-1") {
//                fd.append("mobileData", JSON.stringify(mobileNos));
//            }
        $.ajax({
            url: 'fileUpload.action',
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function (response) {
                try {
                    $("#divUpload").modal("hide");
                    response = JSON.parse(response);
                    $(".modal-backdrop").removeClass("modal-backdrop fade in");
                    if (response.Total == 0) {
                        var msg = "No records found in uploaded file.";
                        showMessage("Warning", msg, 3, "msgDiv");
                    } else {
                        if (response.Succeeded == 0) {
                            var msg = "Account details validation failed.Please check xls file once.<br>Total: " + response.Total + ", Success: " + response.Succeeded + ", Failed: " + response.Failed;
                            showMessage("Warning", msg, 3, "msgDiv");
                        } else {
                            var msg = "Account details are uploaded successfully.<br>Total: " + response.Total + ", Success: " + response.Succeeded + ", Failed: " + response.Failed;
                            showMessage("Success", "Viewpoint uploaded successfully", 1);
                        }
                    }
                    var type = "xlsx";
                    var fileType = type.toLowerCase();
                    var fileName = 'CallTagDataAck';
                    var filePath = response.filePath;
                    var flag = false;
                    window.location = ".." + pageContextPath + "/fileDownload.jsp?fileName=" + encrypt(fileName.replace(" ", "_") + "." + fileType.toLowerCase()) + "&filePath=" + encrypt(filePath) + "&formSubmit=" + flag, '_blank';
                } catch (e) {
                }
                loadKUnMask();
            },
            error: function (jqXHR, textStatus, errorMessage) {
                $("#divUpload").modal("hide");
                showMessage("Error", "Failed to upload the file", 2, "msgDiv");
            }
        });
    }
}

//function uploadBulkCoupon(){
//    
//     var file1 = document.getElementById("input_csv");
//  //  var file2 = document.getElementById("input_image");
//    var CsvExtension = $("#input_csv").val().split('.')[$("#input_csv").val().split('.').length - 1];
//  //  var imgExtension = $("#input_image").val().split('.')[$("#input_image").val().split('.').length - 1];
//    //alert($("#input_cc").val()+" xmlExtension::"+xmlExtension);
//
//    if (file1.files[0] == undefined || file1.files[0] == "undefined") {
//       // alertMessage("warning", "Please select excel file to upload.","fileAltMsgId");
//        return false;
//    }else if(CsvExtension.toUpperCase()!="CSV"){
//        alert("Please select CSV file to upload.");
//        return false;
//    }
//    alert(file1.files[0])
//   // else {
//        var fd = new FormData();
//        try{
//            fd.append("userFile", file1.files[0]);
//           // fd.append("imageFile", file2.files[0]);
//           // fd.append("flag", "image");
//        } catch(e) {
//        }
//    
//    
//     $.ajax({
//            url: 'fileUpload.action',
//            type: "POST",
//            data: fd,
//            processData: false,
//            contentType: false,
//            success: function (response) {
//    
//    
//            }
//        });
//            
////}
//}
function costCenterCreateFail(resp) {
    showMessage("Error", "unable to create,please try again.", 2);
}

function relaodCostCenterSucess(resp) {
    try {
        var costcenterData = JSON.parse(resp);
        var rootNode = {};
        var treeData = [];
        rootNode.CC_NAME = 'Department Hierarchy';
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

function loadCostCenterFail(resp) {
//     alert('Unable to load CostCenter');
    showMessage("Error", "Unable to load CostCenter.", 2);
}

function addacc_dept(OBJ) {
    $("#checkAllLabel").prop('checked', false);
    var reqData = {};
    if (checkedIds.length == 0) {
        showMessage("Warning", "Please select at least one account number to add.", 3, "divAddaccountMsg");
        return false;
    }
    loadKMask()
//    if(nodedata!=""){
//        checkedIds.push(nodedata)
//    }
    reqData.ACCOUNTS = checkedIds;
    reqData.compId = compIdGlobal;
    reqData.CC_ID = nodedata.CC_ID;
    reqData.CC_PARENT = nodedata.CC_PARENT;
    if (OBJ === "service") {
        reqData.TYPE = 1;
    } else {
        reqData.TYPE = 2;
    }
    //alert(JSON.stringify(reqData))
    procesRequest("insertAccountsdept.action", reqData, fnsaveAccsSucc, fnsaveAccsFail, false);


}

function fnDeleteAccount(item) {
    var row = $(item).closest("tr");
    var grid = $("#renderDivId").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var account = {};
    //account.COMPANY_ID = dataItem.COMPANY_ID;
    account.ACCOUNT_NO = dataItem.ACCOUNT_NO;
    account.ACCOUNT_NAME = dataItem.ACCOUNT_NAME;
    account.SERVICE_TYPE = dataItem.SERVICE_TYPE;
    // account.STATUS = dataItem.STATUS;
    var checkedAccounts = [];
    checkedAccounts.push(account);
    var reqParams = {};
    reqParams.ACCOUNTS = checkedAccounts;
    //  alert(JSON.stringify(reqParams))

    procesRequest("deleteAccountdept.action", reqParams, deleteAccountSuccess, deleteAccountFail, false);
}

function deleteAccountSuccess(response) {
    //alert(JSON.stringify(response))
    response = JSON.parse(response);
    if (response.objCRSResponse.success) {
        showMessage("Success", "Service deleted successfully", 1);
        // accounts = response.objCRSResponse.data;
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data(response.objCRSResponse.data);
    } else {
        // showMessage("Error", "Delinking account failed!", 3);
        // $("#addAccount").data("kendoGrid").dataSource.data({});
    }
}
function deleteAccountFail(response) {
    showMessage("Error", "Service deleted  failed!", 3);
}

function fnsaveAccsSucc(response) {
    debugger;
    checkedIds = [];
    closeModaldept();
//    var result = JSON.parse(response).objCRSResponse.data[0].response;
    var result = JSON.parse(response).objCRSResponse.status;

    if (result == true || result == 'success') {
        showMessage("Success", "Service added successfully.", 1);
    } else if (result == 'deletesuccess') {
        showMessage("Success", "Account permissions are successfully removed for the user.", 1);
    } else {
        showMessage("Error", "Service failed to add.", 2);
    }
//loadNodesOnChange();
//    loadAccountsGrid();
    onSelectedNode(nodedata.CC_ID);
}
function loadAccountsGrid() {

    var reqParams = {};
    procesRequest("loadDepartmenttabledata.action", reqParams, loadAccountsGridSuccess, loadAccountsGridFail, false);
}

function loadAccountsGridSuccess(resp) {
    debugger;
    //finalCheckRow = [];
    // finalUncheckRow = [];
    try {
        var data = [];
        // finalCheckRow = [];
        var obj = {};
        resp = JSON.parse(resp);
        // alert(JSON.stringify(resp))
        if (resp.objCRSResponse.success) {
            data = resp.objCRSResponse.data;

        }
        //alert('loading the accounts data :' + data.toSource());
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data(data);
        // fnMarkSavedCostCenter();
    } catch (e) {
        alert(e);
    }



}
function loadAccountsGridFail() {
}
function fnsaveAccsFail() {
    checkedIds = [];
    closeModaldept();
    showMessage("Error", "Giving account permission to user are failed.", 2);
}


function loadKMask()
{
    try {
        // var topDocument = top.document;
//        topDocument.documentElement; //Returns a reference to the HTML element
//        topDocument.body;
        // $(topDocument.body).addClass("mask")
        $("iframe").contents().find('body').addClass('mask')
        $('body').addClass("mask");
        document.addClass("mask");
        //aler('mask')
    } catch (e) {


    }
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
            accObj.AC_NO = dataItem.AC_NO;
            accObj.AC_NAME = dataItem.AC_NAME;
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
        showMessage("Success", "Accounts added sucessfully.", 1);
    }

}

function addAccountsFail(resp) {
    showMessage("Error", "Unable to add accounts.", 2);
}
function NodedeleteFail(resp) {
    showMessage("Error", "Unable to delete node.", 2);
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
        showMessage("Success", "Service deleted successfully.", 1);
        loadCostCenterAccnts(selectedNode.CC_ID);
    } else {
        showMessage("Error", "Unable to delete Service.", 2);
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
        }
        else {
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
    }
    else {
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




function test_pagechange_main_grid2(e) {
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
    }
    else {
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

function assignAccountNo()
{
    debugger;
    try {
//        var row;
//        var grid;
//        var dataItem;
//        var add_ACC = [];
//        var reqData = {};

        // alert(JSON.stringify(checkeRows1));
        //        alert(JSON.stringify(finalUncheckRow));
        var row;
        var grid;
        var dataItem;
        var acc_data = [];
        var reqData = {};
//        $.each($("input[id='allViewPointGrid']:checked"), function () {
//            alert("call")
//          //  row = $(this).closest("tr");
//           var grid = $("#costCenterAccntGrid").data("kendoGrid");
//          //  dataItem = grid.dataItem(row);
////            var accObj = {};
////            accObj.AC_NO = dataItem.AC_NO;
////            accObj.AC_NAME = dataItem.AC_NAME;
////            accObj.PARENT_CENTER_ID = selectedNode.CC_ID;
////            accObj.CC_TYPE = 1;
////            acc_data.push(accObj);
//
//        });
        //   reqData.ACC_DATA = acc_data;
        if (finalCheckRow.length > 0) {
            reqData.ACCOUNTS = finalCheckRow;
            // reqData.finalUncheckRow = finalUncheckRow;
            console.log(JSON.stringify(reqData))

            procesRequest("deleteAccountdept.action", reqData, deleteAccountSuccess, deleteAccountFail, false);
//        reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
            //alert(JSON.stringify(reqData))
            //procesRequest("addAssignToCCenter.action", reqData, addAssignSuccess, addAccountsFail);
        }
        else {
            showMessage("Error", "Please select account to delete", 3);
            return false;
        }
    } catch (e) {
        alert(e);
    }
}
function deleteNodeAccountdept()
{
    debugger;
    try {
//        var row;
//        var grid;
//        var dataItem;
//        var add_ACC = [];
//        var reqData = {};

        // alert(JSON.stringify(checkeRows1));
        //        alert(JSON.stringify(finalUncheckRow));
        var row;
        var grid;
        var dataItem;
        var acc_data = [];
        var reqData = {};
//        $.each($("input[id='allViewPointGrid']:checked"), function () {
//            alert("call")
//          //  row = $(this).closest("tr");
//           var grid = $("#costCenterAccntGrid").data("kendoGrid");
//          //  dataItem = grid.dataItem(row);
////            var accObj = {};
////            accObj.AC_NO = dataItem.AC_NO;
////            accObj.AC_NAME = dataItem.AC_NAME;
////            accObj.PARENT_CENTER_ID = selectedNode.CC_ID;
////            accObj.CC_TYPE = 1;
////            acc_data.push(accObj);
//
//        });
        //   reqData.ACC_DATA = acc_data;
        if (finalCheckRow.length > 0) {
            reqData.ACCOUNTS = finalCheckRow;
            reqData.CC_ID = nodedata.CC_ID
            // console.log(JSON.stringify(reqData))

            procesRequest("deleteNodeAccountdept.action", reqData, deleteNodeAccountSuccess, deleteNodeAccountFail, false);
//        reqData.PARENT_CENTER_ID = selectedNode.CC_ID;
            //alert(JSON.stringify(reqData))
            //procesRequest("addAssignToCCenter.action", reqData, addAssignSuccess, addAccountsFail);
        } else {
            showMessage("Error", "Please select service to delete!", 3);
        }
    } catch (e) {
        alert(e);
    }
}
function deleteNodeAccountSuccess(response) {
    //alert(JSON.stringify(response))
    response = JSON.parse(response);
    if (response.objCRSResponse.success) {
        showMessage("Success", "Service deleted successfully", 1);
        // accounts = response.objCRSResponse.data;
        $("#costCenterAccntGrid").data("kendoGrid").dataSource.data(response.objCRSResponse.data);
//        loadNodesOnChange();
        onSelectedNode(nodedata.CC_ID);
        $("#allViewPointGrid").prop('checked', false);
    } else {
        // showMessage("Error", "Delinking account failed!", 3);
        // $("#addAccount").data("kendoGrid").dataSource.data({});
    }
}
function deleteNodeAccountFail(response) {
    showMessage("Error", "Delinking account failed!", 3);
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
function fnDeleteNode_dept()
{

    var reqData = {}
    reqData.CC_ID = selectedNode.CC_ID;
//    alert("this node delete = " + selectedNode.CC_ID)
    procesRequest("deletedeptNodeHierarchy.action", reqData, deleteNodeSuccess, NodedeleteFail, false);
}
function deleteNodeSuccess(res)
{
    //alert(JSON.stringify(res))
    debugger;
    //res = JSON.parse(res);
    // alert(JSON.stringify(res))
    // if (res.objCRSResponse.success) {
    // loadCostCenterAccnts(selectedNode.CC_ID);

    showMessage("Success", "Node Delete sucessfully.", 1);
    var reqData = {};
    //reqData.COMPANY_ID = companyId;
    reqData.PARENT_ID = -1;
    procesRequest("reloadDEPTData.action", reqData, relaodCostCenterSucess, relaodCostCenterFail, false);
    onSelectedNode('-1');
    // }


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
        //  dataBound: permit_gridDataBound,
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

function closeModaldept() {
    $("#divPermissions").modal('hide');
    $("#divPermissions1").modal('hide');
    return false;
    loadKUnMask();
}
function loadKUnMask()
{
    try {
        // var topDocument = top.document;
//        topDocument.documentElement; //Returns a reference to the HTML element
//        topDocument.body;
        // $(topDocument.body).removeClass("mask")
        $("iframe").contents().find('body').removeClass('mask')
        $('body').removeClass("mask");
        document.removeClass("mask");
        //aler('unmask')
    } catch (e) {


    }
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


//function filterData() {
//    var accno = $('#accNo').val();
//    var accname = $('#accName').val();
//    if (accno != "")
//    {
//        AccounNoFilter();
//    } else
//    {
//        AccounNameFilter();
//    }
//
//
//
//}
function onkeysearch1() {
    // alert("calllll")
    debugger;

    var selecteditem = "";
//    if(obj==="account"){
    if ($("#accName").val() !== "" && $("#accNo").val() !== "") {
        selecteditem = $("#accName").val() + " " + $("#accNo").val();
    } else if ($("#accNo").val() !== "") {
        selecteditem = $("#accNo").val();
    } else if ($("#accName").val() !== "") {
        selecteditem = $("#accName").val();
    } else {

    }


    var kgrid = accounts_grid;
    selecteditem = selecteditem.toUpperCase();
    var selectedArray = selecteditem.split(" ");
    if (selecteditem) {
        var orfilter = {
            logic: "or",
            filters: []
        };
        var andfilter = {
            logic: "and",
            filters: []
        };
//        $.each(selectedArray, function (i, v) {
//            if (v.trim() == "") {
//            }
//            else {
//                $.each(selectedArray, function (i, v1) {
//                    if (v1.trim() == "") {
//                    }
//                    else {
//                        
//                        orfilter.filters.push(
//                                {
//                                    field: "ACCOUNT_NO",
//                                    operator: "contains",
//                                    value: v1
//                                },
//                        {
//                            field: "ACCOUNT_NO",
//                            operator: "eq",
//                            value: v1
//                        },
//                        {
//                            field: "ACCOUNT_NAME",
//                            operator: "eq",
//                            value: v1
//                        },
//                                {
//                            field: "ACCOUNT_NAME",
//                            operator: "contains",
//                            value: v1
//                        }
//                       
//                        );
//                
//                      
////                        andfilter.filters.push(orfilter);
////                        orfilter = {
////                            logic: "or",
////                            filters: []
////                        };
//                    }
//
//                });
//            }
//        });

        var $x = $("#accName").val();
        var $y = $("#accNo").val();
        if ($x !== "" && $y == "") {
            andfilter.filters.push({
                field: "ACCOUNT_NAME",
                operator: "contains",
                type: "string",
                value: $x
            });
        } else if ($x === "" && $y !== "") {
            andfilter.filters.push({
                field: "ACCOUNT_NO",
                operator: "contains",
                type: "string",
                value: $y
            });
        } else if ($x != "" && $y != "") {
            andfilter.filters.push({
                field: "ACCOUNT_NAME",
                operator: "contains",
                type: "string",
                value: $x
            },
            {
                field: "ACCOUNT_NO",
                operator: "contains",
                type: "string",
                value: $y
            });
        }
        kgrid.dataSource.filter(andfilter);
    }
    else {
        kgrid.dataSource.filter({});
    }

}
function clearAccounts1() {
    $("#accName").val("");
    $("#accNo").val("");
    onkeysearch1();
}
function onkeyserviceSearch_dept() {
    // alert("calllll")


    var selecteditem = "";
//    if(obj==="account"){
    if ($("#serviceno").val() !== "" && $("#accno").val() !== "") {
        selecteditem = $("#serviceno").val() + " " + $("#accno").val();
    } else if ($("#accno").val() !== "") {
        selecteditem = $("#accno").val();
    } else if ($("#serviceno").val() !== "") {
        selecteditem = $("#serviceno").val();
    } else {

    }

//    }else{
//        
//        servicegridSearch();
//    }


    var kgrid = service_grid;
    selecteditem = selecteditem.toUpperCase();
    var selectedArray = selecteditem.split(" ");
    if (selecteditem) {
        var orfilter = {
            logic: "or",
            filters: []
        };
        var andfilter = {
            logic: "and",
            filters: []
        };
//        $.each(selectedArray, function (i, v) {
//            if (v.trim() == "") {
//            }
//            else {
//                $.each(selectedArray, function (i, v1) {
//                    if (v1.trim() == "") {
//                    }
//                    else {
//                        
//                        orfilter.filters.push(
//                                {
//                                    field: "SERVICE_TYPE",
//                                    operator: "contains",
//                                    value: v1
//                                },
//                        {
//                            field: "SERVICE_TYPE",
//                            operator: "eq",
//                            value: v1
//                        },
//                        {
//                            field: "ACCOUNT_NO",
//                            operator: "eq",
//                            value: v1
//                        },
//                                {
//                            field: "ACCOUNT_NO",
//                            operator: "contains",
//                            value: v1
//                        }
//                       
//                        );
//                
//                      
////                        andfilter.filters.push(orfilter);
////                        orfilter = {
////                            logic: "or",
////                            filters: []
////                        };
//                    }
//
//                });
//            }
//        });
        var $x = $("#accno").val();
        var $y = $("#serviceno").val();
        if ($x !== "" && $y == "") {
            andfilter.filters.push({
                field: "ACCOUNT_NO",
                operator: "contains",
                type: "string",
                value: $x
            });
        } else if ($x === "" && $y !== "") {
            andfilter.filters.push({
                field: "SERVICE_TYPE",
                operator: "contains",
                type: "string",
                value: $y
            });
        } else if ($x != "" && $y != "") {
            andfilter.filters.push({
                field: "ACCOUNT_NO",
                operator: "contains",
                type: "string",
                value: $x
            },
            {
                field: "SERVICE_TYPE",
                operator: "contains",
                type: "string",
                value: $y
            });
        }
        kgrid.dataSource.filter(andfilter);
    }
    else {
        kgrid.dataSource.filter({});
    }

}
function clearserviceSearch_dept() {
    $("#serviceno").val("");
    $("#accno").val("");
    onkeyserviceSearch_dept();
}

function servicegridSearch() {
    var selecteditem = ""
    if ($("#serviceno").val() !== "") {
        selecteditem = $("#serviceno").val();
    } else if ($("#accno").val() !== "") {
        selecteditem = $("#accno").val();
    }

    var kgrid = service_grid;
    selecteditem = selecteditem.toUpperCase();
    var selectedArray = selecteditem.split(" ");
    if (selecteditem) {
        var orfilter = {
            logic: "or",
            filters: []
        };
        var andfilter = {
            logic: "and",
            filters: []
        };
        $.each(selectedArray, function (i, v) {
            if (v.trim() == "") {
            }
            else {
                $.each(selectedArray, function (i, v1) {
                    if (v1.trim() == "") {
                    }
                    else {

                        orfilter.filters.push(
                                {
                                    field: "ACCOUNT_NO",
                                    operator: "contains",
                                    value: v1
                                },
                        {
                            field: "ACCOUNT_NAME",
                            operator: "eq",
                            value: v1
                        }

                        );


//                        andfilter.filters.push(orfilter);
//                        orfilter = {
//                            logic: "or",
//                            filters: []
//                        };
                    }

                });
            }
        });
        kgrid.dataSource.filter(orfilter);
    }
    else {
        kgrid.dataSource.filter({});
    }

}



function filterAccountsdept() {
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
var nodedata = ""
function onCheckNode(e, expandFlag) {
    //alert('selected');
    $("#allViewPointGrid").prop('checked', false);
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
        $("#costCenterUnassignAccntGrid").css("display", "block");
        $("#searchAccount").css("display", "none");
        $("#searchUnassignAccount").css("display", "block");
        // loadUnassignAccnts();
    } else {
        $("#costCenterUnassignAccntGrid").css("display", "none");
        $("#costCenterAccntGrid").css("display", "block");
        $("#searchAccount").css("display", "block");
        $("#searchUnassignAccount").css("display", "none");
    }
    if (dataItem.CC_NAME == "Department Hierarchy" || dataItem.CC_NAME == "Ungrouped Accounts") {
        $("#deleteAccountId").css("visibility", "hidden");
        $("#servicesCodeId").css("visibility", "hidden");
        $("#saveAccountId").css("visibility", "hidden");
    } else {
        $("#deleteAccountId").css("visibility", "visible");
        $("#servicesCodeId").css("visibility", "visible");
        $("#saveAccountId").css("visibility", "visible");
    }

    setSelectedNode(node);
    uncheckOtherNodes(selectedId, treeview);
    onSelectedNode(selectedId);

}
function onSelectedNode(nodeId) {
    var reqData = {};
    reqData.NODE_ID = nodeId;
    procesRequest("fetchSelectedNodeAccountsdept.action", reqData, NodeAccountsSuccess, fetchSelectedNodeAccountsFail, false);
}
function NodeAccountsSuccess(resp) {
    try {
        var gridData = [];
        resp = JSON.parse(resp);
        if (resp.objCRSResponse.success) {
            gridData = resp.objCRSResponse.data;
        }
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

function filterUnAssignAccountsdept() {
    var $filter = new Array();
    var $x = $("#searchUnassignAccount").val();
    if ($x) {
        $filter.push({
            field: "ACCOUNT_NO",
            operator: "contains",
            value: $x
        });
    }
    $("#costCenterUnassignAccntGrid").data("kendoGrid").dataSource.filter($filter);
}