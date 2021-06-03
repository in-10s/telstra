var renderDivId = '';
var gridData = {};
var paymentAllocationGrid;
var checkeRows = [];
var parentBans = [];
var uid;
var checkedNodes = [];
var unCheckedNodes = [];
var $dropdownRootElem;
var $treeviewRootElem;
var paymentBy = "";
var checkboxEventFlag = false;
var costCenters = [];
var accountCheck11 = [];
var accountCheck = [];
var treeview;
var dropdown;

$(document).ready(function() {
    getGrid("grid");
    fnLoadPaymentByCombo();
    fnLoadPaymentBy();
    fnPositionTreeview();
    fnLoadGridData();
    fnBindChekAllEventInGrid();
})
function redirectPage()
{
    fnReloadTreeview();
    fnLoadAccounts();
    fnSearchRecordPayment();
//    getGrid("grid");
//    fnLoadPaymentByCombo();
//    fnLoadPaymentBy();
//    fnPositionTreeview();
//    fnLoadGridData();
//    bindChekAllEventInGrid();
}
function getGrid(divId) {

    if (divId == "") {
        return null;
    }
    renderDivId = divId;

    paymentAllocationGrid = $("#" + divId).kendoGrid({
        pageable: true,
        scrollable: true,
        dataSource: {
            data: gridData,
            groupable: true,
            schema: {
                model: {
                    fields: {
                        Name: {
                            type: "string"
                        },
                        Description: {
                            type: "string"
                        },
                        Select: {
                            type: "celleHtml"
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
        dataBound: permit_gridDataBound,
        columns: [{
            title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='checkAll'></span>",
            template: $("#checkbox_template1").html(),
            menu: false,
            width: "50px"
        }, {
            field: "ACCOUNT_NAME",
            title: "Name",
            width: "auto"
        }, {
            field: "BAN",
            title: "BAN",
            encoded: false
        }, {
            field: "INVOICE_NUMBER",
            title: "Invoice Number",
            width: "auto"
        }, {
            field: "MSISDN",
            title: "Phone Number",
            width: "auto"
        },
        {
            field: "AMOUNT",
            sortable: {
                compare: function(a, b) {
                    var fValue=parseFloat(a.AMOUNT);
                    var sValue=parseFloat(b.AMOUNT);
                    return fValue === sValue ? 0 : (fValue > sValue) ? 1 : -1;
                }
            },
            title: "Amount",
            width: "auto"
        },
        {
            field: "ALLOCATION",
            title: "Allocation",
            encoded: false,
            template: $("#allocation-template").html()
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

//paymentAllocationGrid.table.on("click", ".checkbox1", onAllAccGridRowSelect);
}

//on dataBound event restore previous selected rows:
function permit_gridDataBound(arg) {
    kendo.ui.progress($("#grid>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#grid").find('.k-grid-header colgroup > col').length;
        $("#grid").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount + '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange(arg.sender._data);
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

function isValueInArray(arr, val) {
    var inArray = -1;
    for (var z = 0; z < arr.length; z++) {
        if (val.SNO == arr[z].SNO) {
            inArray = z;
            break;
        }
    }
    return inArray;
}
//on click of the checkbox:
function selectRow(ckb) {
    var checked = ckb.checked,
            row = $(ckb).closest("tr"),
            grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem(row);
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

//on dataBound event restore previous selected rows:
function onDataBound(e) {
    var view = this.dataSource.view();
    for (var i = 0; i < view.length; i++) {
        if (checkedIds[view[i].id]) {
            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                    .addClass("k-state-selected")
                    .find(".checkboxed")
                    .attr("checked", "checked");
        }
    }
}

function fnCalculatePaymentAmount() {
    var paymentAmount = 0;
    for (var i = 0; i < gridData.length; i++) {
        paymentAmount = paymentAmount + parseFloat(gridData[i].AMOUNT);
    }
    return paymentAmount.toFixed(2);
}

function fnLoadManagePaymentGrid() {
    var reqParams = {};
    reqParams.SERVICE_TYPE = $("#service").val();
    reqParams.INVOICE_DATE = $("#invoice-date").val();
    procesRequest("loadManagePaymentGrid.action", reqParams, loadManagePaymentGridSuccess, loadManagePaymentGridFail);
}
function loadManagePaymentGridSuccess(response) {
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        gridData = response.objCRSResponse.data;
        if (gridData.length > 0) {
            var paymentAmount = fnCalculatePaymentAmount();
            $("#payment-amount").html("J$" + paymentAmount);
        } else {
            $("#payment-amount").html("");
        }
        $("#" + renderDivId).data("kendoGrid").dataSource.data(gridData);
    } else {
        showMessage("Error", "loading grid failed!", 3);
        $("#" + renderDivId).data("kendoGrid").dataSource.data({});
    }

}
function loadManagePaymentGridFail(error) {
    showMessage("Error", "loading grid failed!", 3);
}

function fnGotoPaymentMethod() {
    var allocatedPayments = [];
    allocatedPayments = checkeRows;
    if (allocatedPayments.length > 0) {
        var reqParams = {};
        reqParams.ALLOCATED_PAYMENTS = allocatedPayments;
        reqParams.LOB = $("#service").val();
        reqParams.INVOICE_DATE = $("#invoice-date").val();
        gotoAction('paymentMethod.action', reqParams);
    } else {
        showMessage("Error", "Please allocate payment", 3);
        $("#bodyframe").scrollTop();
    }
}

function gotoAction(url, reqParams) {
    var form = document.createElement('FORM');
    var inputField = document.createElement("input");
    inputField.name = "reqData";
    inputField.setAttribute("type", "hidden");
    var strData = encrypt(JSON.stringify(reqParams));
    inputField.value = strData;
    form.setAttribute("action", url);
    form.setAttribute("method", "POST");
    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();
}
function fnSearchRecordPayment() {
    if (paymentBy == "" || checkedNodes.length == 0) {
        showMessage("Warning", "Please select parent by", 3);
        return;
    }
    if (accountCheck.length == 0) {
        showMessage("Warning", "Please select  BAN", 3);
        return;
    }
    var searchField = {};
    searchField.INVOICE_DATE = $("#invoice-date").val();
    searchField.PAYMENT_BY = paymentBy;
    searchField.PAYMENT_ON = $("input[name='payment-on']:checked").val();
    var reqParams = {};
    reqParams.SEARCH_FIELDS = searchField;
    reqParams.SERVICE_TYPE = $("#service").val();
    reqParams.CC_ID = checkedNodes.join(",");
    reqParams.PARENT_BAN = accountCheck.join("','");
    procesRequest("searchRecordPayment.action", reqParams, SearchRecordPaymentSuccess, SearchRecordPaymentFail);
}

function SearchRecordPaymentSuccess(response) {
    //    $("#"+renderDivId).data("kendoGrid").dataSource.data({});
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        gridData = response.objCRSResponse.data;
        if (gridData.length > 0) {
            var paymentAmount = fnCalculatePaymentAmount();
            $("#payment-amount").html("J$" + paymentAmount);
        } else {
            $("#payment-amount").html("");
        }
        $("#" + renderDivId).data("kendoGrid").dataSource.data(gridData);

        $("#" + renderDivId).data("kendoGrid").dataSource.page(1);
        checkeRows = [];
    } else {
        showMessage("Error", "loading grid failed!", 2);
        $("#" + renderDivId).data("kendoGrid").dataSource.data({});
    }
}

function SearchRecordPaymentFail(response) {
    showMessage("Error", "loading grid failed!", 2);
}

function fnReloadManagePaymentGrid() {
    fnSearchRecordPayment();
}



function fnUpdateAmtInDataItem(element) {
    var row = $(element).closest('tr');
    var grid = $("#grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var amountToUpdate = $(element).val();
    dataItem.set("ALLOCATION", amountToUpdate);
}

function fnUpdateAllocateAmount() {
    var amountToUpdate;
    var allocationAmountType = $("input[name='allocationAmountType']:checked").val();
    var row;
    var grid;
    var dataItem;
    var gridFilteredData = paymentAllocationGrid.dataSource.view();
    for (var index = 0; index < gridFilteredData.length; index++) {
        row = $("#" + gridFilteredData[index].SNO).closest('tr');
        grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem(row);
        if (allocationAmountType == "enterAmount") {
            amountToUpdate = $("#amountToUpdate").val();
            //            row.find(".allocation-amount").val(amountToUpdate);
            dataItem.set("ALLOCATION", amountToUpdate);
        } else {
            amountToUpdate = dataItem.AMOUNT;
            //            row.find(".allocation-amount").val(amountToUpdate);
            dataItem.set("ALLOCATION", amountToUpdate);
        }
    }
}


function fnLoadAccounts() {
    
    var reqParams = {};
    reqParams.PAYMENT_BY = paymentBy;
    reqParams.CC_ID = checkedNodes.join(",");
    reqParams.PARENT_BAN = accountCheck.join(",");
    reqParams.SERVICE_TYPE = $("#service").val();

    if (paymentBy == "" || checkedNodes.length == 0) {
        showMessage("Warning", "Please select parent by", 3);
        return;
    }
    procesRequest("loadAccounts.action", reqParams, fnLoadAccountsSuccess, fnLoadAccountsFail);
}

function fnLoadAccountsSuccess(response) {
    response = evaluate(response);
    if (response.objCRSResponse.success) {
        parentBans = response.objCRSResponse.data;

        parentBans.unshift({
            ACCOUNT_NO: "All"
        });

        var multiselect = $("#parent-ban").data("kendoDropDownList");
        multiselect.setDataSource(parentBans);
        multiselect.value("All");
        multiselect.refresh();

        //        $("#All").prop('checked', true);
        $("#All").trigger("click");
        $("#parent-ban").data("kendoDropDownList").text("");
    } else {
        showMessage("Error", "loading customers failed!", 2);
        $("#parent-ban").data("kendoDropDownList").dataSource({});
    }
}

function fnLoadAccountsFail(response) {
    showMessage("Error", "loading customers failed!", 2);
}

function onAccountcheckBox(obj)
{
    var value = obj.checked;
    var accountNO = obj.id;
    //    var accountNO= $(obj).val();
    if (value == true) {
        if (accountNO == "All") {
            accountCheck = [];
            var dropdownlist = $("#parent-ban").data("kendoDropDownList");
            var dataItem = dropdownlist.dataSource.options.data;

            for (var i = 0; i < dataItem.length; i++)
            {
                if (i != 0)
                {
                    $("#" + dataItem[i].ACCOUNT_NO).prop('checked', false);
                    accountCheck11.push(dataItem[i].ACCOUNT_NO);
                }
            }
            // accountCheck=accountCheck11;
            accountCheck.push("All");
        } else
        {
            $("#All").prop('checked', false);
            if (accountCheck11.length > 0) {
                accountCheck = [];
                accountCheck11 = [];
            }
            var index = accountCheck.indexOf(accountNO);
            if (index == -1)
            {
                accountCheck.push(accountNO);
            }
        }
    } else
    {
        if (accountNO == "All") {
            accountCheck11 = [];
            accountCheck = [];
        } else {
            var index1 = accountCheck.indexOf(accountNO);
            if (index1 != -1) {
                accountCheck.splice(index1, 1);
            }
        }
    }
    if (accountNO == "All") {
        $("#parent-ban").data("kendoDropDownList").text(accountNO);
    } else {
        $("#parent-ban").data("kendoDropDownList").text("");
    }
}

function onExpandCostCenter(e) {
    try {
        var reqData = {}
        var dataItem = this.dataItem(e.node);
        reqData = {}
        if (!dataItem.isExpand) {
            dataItem.isExpand = true
            uid = $(e.node).closest("li").data("uid");
            reqData.PARENT_ID = dataItem.CC_ID;
            procesRequest("fetchCostCenters.action", reqData, fnExpandCostCenterSuccess, fnExpandCostCenterFail);
        }
    } catch (e) {

    }
}
var reloadTextNode;
function fnReloadTreeview() {
    debugger
    try {
        var treeview = $("#treeview").data("kendoTreeView");
        var dataItem1 = treeview.dataItem(".k-last");
        var reqData = {}
        reqData = {}
        uid = dataItem1.uid;
        reqData.PARENT_ID = -1;
        procesRequest("fetchCostCenters.action", reqData, fnExpandCostCenterSuccess, fnExpandCostCenterFail);
    } catch (e) {

    }
}

function fnRemoveChildrenFromTreeview(node) {
    debugger;
    var tree = $("#treeview").data("kendoTreeView");
    var selectedNode = node;
    var selectedItem = tree.dataItem(selectedNode)
    if (selectedItem.hasChildren) {
        var items = selectedItem.children.data();
        for (var i = 0, max = items.length; i < max; i++) {
            var item = tree.findByUid(items[0].uid);
            tree.remove(item);
        }
    }
}
function fnExpandCostCenterSuccess(response) {
    response = JSON.parse(response);
    costCenters = response.objCRSResponse.data;
    fnPrepareCostCenterData();

    var treeview = $("#treeview").data("kendoTreeView");
    fnRemoveChildrenFromTreeview(treeview.findByUid(uid));
    treeview.append(costCenters, treeview.findByUid(uid));
    onCheckCostCenter();
}

function fnExpandCostCenterFail() {
    showMessage("Error", "loading cost centers failed!", 2);
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

function checkedNodeIds(nodes, checkedNodes, nodeName, checkFlag) {
    var hierarchyDataId, ungroupDataId, allDataId;
    for (var i = 0; i < nodes.length; i++) {
        var nodeId = nodes[i].uid;
        var tempNameNode = nodes[i].CC_NAME;
        if (tempNameNode == "Ungrouped") {
            ungroupDataId = nodeId;
        } else if (tempNameNode == "All") {
            allDataId = nodeId;
        } else {
            hierarchyDataId = nodeId;
        }
    }
    if (checkFlag) {
        if (nodeName == 'Ungrouped') {
            $("#treeview ul [data-uid=" + hierarchyDataId + "] div span.k-checkbox input").prop("checked", false).trigger("change");
            $("#treeview ul [data-uid=" + allDataId + "] > div > span.k-checkbox > input").prop("checked", false).trigger("change");
            paymentBy = nodeName;
        } else if (nodeName == 'All') {
            $("#treeview ul [data-uid=" + hierarchyDataId + "] div span.k-checkbox input").prop("checked", false).trigger("change");
            $("#treeview ul [data-uid=" + ungroupDataId + "] > div > span.k-checkbox > input").prop("checked", false).trigger("change");
            paymentBy = nodeName;
        } else {
            $("#treeview ul [data-uid=" + ungroupDataId + "] > div > span.k-checkbox > input").prop("checked", false).trigger("change");
            $("#treeview ul [data-uid=" + allDataId + "] > div > span.k-checkbox > input").prop("checked", false).trigger("change");
            paymentBy = "Hierarchy";
        }
    }
    for (var i = 0; i < nodes.length; i++) {

        if (nodes[i].checked) {
            checkedNodes.push(nodes[i].CC_ID);
        }
        if (nodes[i].hasChildren) {
            checkedNodeIds(nodes[i].children.view(), checkedNodes);
        }
    }
}

// show checked node IDs on datasource change
function onCheckCostCenter(e) {
    checkedNodes = [];
    var treeView = $("#treeview").data("kendoTreeView");
    var message;

    checkedNodeIds(treeView.dataSource.view(), checkedNodes);

    if (checkedNodes.length > 0) {
        message = "IDs of checked nodes: " + checkedNodes.join(",");
    } else {
        message = "No nodes checked.";
    }

    $("#result").html(message);
}

function fnLoadPaymentByCombo() {
    dropdown = $("#dropdown").kendoDropDownList({
        dataSource: [
            {
                text: "",
                value: null
            },
        ],
        dataTextField: "text",
        dataValueField: "value",
        change: function(e) {
            $("#dropdown").data("kendoDropDownList").text(paymentBy);
        },
        open: function(e) {
            // If the treeview is not visible, then make it visible.
            if (!$treeviewRootElem.hasClass("k-custom-visible")) {
                $treeviewRootElem.slideToggle('fast', function() {
                    $("#dropdown").data("kendoDropDownList").close();
                    $treeviewRootElem.addClass("k-custom-visible");
                });
            }
        }
    }).data("kendoDropDownList");
}

function fnLoadPaymentBy() {
    var costcenterName = ["Hierarchy", "Ungrouped", "All"];
    var costcenter = {};
    for (var i = 0; i < costcenterName.length; i++) {
        costcenter = {};
        costcenter.CC_ID = -1;
        costcenter.CC_PARENT = -1;
        costcenter.CC_NAME = costcenterName[i];
        costcenter.CC_TYPE = "";
        costcenter.hasChildren = (costcenterName[i] == "Hierarchy" ? true : false);
        costcenter.checked = (costcenterName[i] == "All" ? true : false);
        costcenter.isExpand = false;
        costCenters.unshift(costcenter);
    }

    treeview = $("#treeview").kendoTreeView({
        checkboxes: {
            checkChildren: true
        },
        dataSource: new kendo.data.HierarchicalDataSource({
            data: costCenters
        }),
        dataTextField: "CC_NAME",
        check: onCheckCostCenter1,
        expand: onExpandCostCenter
    }).data("kendoTreeView");

}

function fnPositionTreeview() {
    $dropdownRootElem = $(dropdown.element).closest("span.k-dropdown");
    $treeviewRootElem = $(treeview.element).closest("div.k-treeview");
    // Hide the treeview.
    $treeviewRootElem.width($dropdownRootElem.width()).css({
        "border": "1px solid grey",
        "display": "none",
        "position": "absolute",
        "z-index": "1000",
        "background-color": "#ffffff",
        "height": "200px"
    });
    // Position the treeview so that it is below the dropdown.
    $treeviewRootElem.css({
        "top": $dropdownRootElem.position().top + $dropdownRootElem.height(),
        "left": $dropdownRootElem.position().left
    });
}

function fnLoadGridData() {
    checkedNodes[0] = -1;
    paymentBy = "All";
    accountCheck.push("All");
    accountCheck11.push("All");
    fnSearchRecordPayment();
    fnLoadAccounts();
    $("#dropdown").data("kendoDropDownList").text(paymentBy);
}

function onCheckCostCenter1(ckb) {
    if (!checkboxEventFlag) {
        checkboxEventFlag = true;
        checkedNodes = [];
        var treeView = $("#treeview").data("kendoTreeView");
        var dataItem = treeView.dataItem(ckb.node);
        var checkFlag = dataItem.checked;
        var nodeName = "";
        nodeName = dataItem.CC_NAME;
        var message;
        checkedNodeIds(treeView.dataSource.view(), checkedNodes, nodeName, checkFlag);

        if (checkedNodes.length > 0) {
            message = "IDs of checked nodes: " + checkedNodes.join(",");
        } else {
            paymentBy = "";
            message = "No nodes checked.";
        }

        $("#result").html(message);
        checkboxEventFlag = false;
    }
}

$(document).mouseup(function(e)
{
    var container = new Array();
    container.push($('#treeview'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) // if the target of the click isn't the container...
                && $(value).has(e.target).length === 0) // ... nor a descendant of the container
        {
            $(value).hide();
        }
    });
});

$(document).click(function(e) {
    // Ignore clicks on the treetriew.                
    if ($(e.target).closest("div.k-treeview").length == 0 && e.target.classList != undefined && e.target.classList.value != "k-icon k-plus") {
        // If visible, then close the treeview.
        if ($treeviewRootElem.hasClass("k-custom-visible")) {
            $treeviewRootElem.removeClass("k-custom-visible");
            fnLoadAccounts();
            $("#dropdown").data("kendoDropDownList").close();
            $("#dropdown").data("kendoDropDownList").text(paymentBy);
        }
    }
});

$("#filterMobileNo").click(function() {
    $("#" + renderDivId).data("kendoGrid").dataSource.data(gridData);
    checkeRows = [];
    var $filter = new Array();
    var $x = $("#mobile-number").val();
    if ($x) {
        $filter.push({
            field: "BAN",
            operator: "contains",
            value: $x
        });
    }
    $("#" + renderDivId).data("kendoGrid").dataSource.filter($filter);
    //        var allocatedPayments = paymentAllocationGrid.dataSource.data();
    //        var allocatedPayments = paymentAllocationGrid.dataSource.view();
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var allocatedPayments = query.filter(filters).data;
    var paymentAmount = 0;

    for (var index = 0; index < allocatedPayments.length; index++) {
        paymentAmount = paymentAmount + parseFloat(allocatedPayments[index].ALLOCATION);
    }
    $("#payment-amount").html("J$" + paymentAmount.toFixed(2));
});

function fnBindChekAllEventInGrid() {
    $("#checkAll").change(function() {
        var strGridData = JSON.stringify(paymentAllocationGrid._data);
        var objGridData = JSON.parse(strGridData);
        if (this.checked) {
            for (var idx = 0; idx < objGridData.length; idx++)
            {
                var dataItem = paymentAllocationGrid.dataSource.view()[idx];//checkeRows
                var index = isValueInArray(checkeRows, dataItem);
                //                var index = checkeRows.indexOf(dataItem);
                if (index == -1) {
                    checkeRows.push(dataItem);
                    if (dataItem.COUNT == 0) {
                        dataItem.set("COUNT", 1);
                    }
                }

                $("#" + objGridData[idx].SNO).prop('checked', true);
            }
        }
        else {
            for (var idx = 0; idx < objGridData.length; idx++)
            {

                var dataItem1 = paymentAllocationGrid.dataSource.view()[idx];
                var index1 = isValueInArray(checkeRows, dataItem1);
                //                 var index1 = checkeRows.indexOf(dataItem1);
                if (index1 != -1) {
                    checkeRows.splice(index1, 1);
                    if (dataItem1.COUNT != 0) {
                        dataItem1.set("COUNT", 0);
                    }
                }

                $("#" + objGridData[idx].SNO).prop('checked', false);
            }
        }
    });
}

$("#invoice-date").kendoDatePicker({
    value: new Date(),
    dateInput: true,
    format: "dd-MMM-yy"
});

$("#parent-ban").kendoDropDownList({
    dataSource: parentBans,
    dataTextField: "ACCOUNT_NO",
    dataValueField: "ACCOUNT_NO",
    template: "<input type='checkbox'  id='#:ACCOUNT_NO#'  value='' onClick='onAccountcheckBox(this)' /><label class='textoverflowec'>#:ACCOUNT_NO# </label> ",
    change: function(e) {
        $("#parent-ban").data("kendoDropDownList").text("");
    }
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function evaluate(str) {

    if (str == "" || str == null) {
        return "";
    }

    str = str.replaceAll("\\\\", "\/");
    str = str.replaceAll("&quot;", "\"");
    str = str.replaceAll("\n", "");
    str = str.replaceAll("\\r", "");

    var respData = eval("(" + str + ")");

    return respData;
}