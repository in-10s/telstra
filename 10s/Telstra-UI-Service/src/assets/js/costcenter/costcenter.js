var grid = "";
var accountsArr = [];
var ccRootNodeName = "";
var isGridSerch=false;
var checkeRowsARR=[];
var regexp = /^[a-zA-Z0-9_ ]*$/;

$(document).ready(function () {
    disableLi('accountNoLi');
    enableLi("costCenteLi");
    disableLi("costCodeLi");
    disableLi("addServiceNumbersLi");
    grid = $("#grid").kendoGrid({
        height: 435,
        dataBound: gridDataBound,
        pageable: true,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        //        pageable: {
        //                input: true,
        //                numeric: false
        //            },
        columns: [{
            field: "CC_NAME",
            title: "Cost code",
            width: 180,
            encoded: false
        //            template: $("#checkbox_template1").html()
        }, {
            field: "HIERARCHY",
            title: "Hierarchy",
            width: 200
        }, {
            title: 'Action',
            headerAttributes: {
                style: "padding-left:10px !important;color:#333 !important"
            },
            menu: false,
            template: $("#grid_users_icon_template").html(),
            width: 150

        }
        ]
    }).data("kendoGrid");
    // displayLoading("#grid>div.k-grid-content");  

   
  

    var reqData = {};
    reqData.UniqueKey = parent.generateTocken();
    procesRequest("fetchCostCenterAction.action", reqData, fnCallbackFetchCCSucc, fnCallbackFetchCCFail);

});
//on databound checking for available records
function gridDataBound(arg) {
    loadKUnMask();
   
    kendo.ui.progress($("#grid>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#grid").find('.k-grid-header colgroup > col').length;
        $("#grid").find('.k-grid-content tbody').append('<tr class="kendo-data-row"><td colspan="' + colCount + '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange(arg.sender._data);
}
var result;

function fnCallbackFetchCCSucc(response)
{
    result = JSON.parse(response);

    var sampleData = result.objCRSResponse.data;
    $.each(sampleData, function (i, item) {
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
        if (item.CC_TYPE == 0) {
            item.spriteCssClass = "costCentre";
        }
        if (item.CC_TYPE == 1) {
            item.spriteCssClass = "costcode";
        }
        if (item.CC_TYPE == 2) {
            item.spriteCssClass = "account";
        }
    });
    var homogeneous = new kendo.data.HierarchicalDataSource({
        data: sampleData
    });
    var homogeneous1 = new kendo.data.HierarchicalDataSource({
        data: sampleData
    });

    //tree view for cost center

    $("#treeview").kendoTreeView({
        checkboxes: {
            template: "<input type=\"checkbox\"/><label class='textoverflowec'></label># if(item.CC_TYPE==0){#<div class='actionslink' style='margin-top: -26px;margin-left: #= item.text.length*7.2+90#px;'><a data-toggle='modal' href='javascript:void(0)' onclick='fnCostCenterEdit(\"#= item.id #\",\"#=item.text#\",\"#=item.CC_PARENT#\")' ><i class='editicon' title='Edit cost centre name'></i></a> <a data-toggle='modal'    href='javascript:void(0)' ><i class='deleteicon' title='Delete cost centre name' onclick='fnCostCenterDelete(\"#= item.id#\",\"#=item.text#\",\"#=item.CC_PARENT#\")'></i></a></div># }#"

        },
        dataBound: function (e) {
        //            e.sender.element.find("span.k-in").css('width',' 9em !important');
        //            e.sender.element.find("span.k-in").css('overflow:',' hidden !important');
        //            e.sender.element.find("span.k-in").css('text-overflow',' ellipsis !important');
        //            e.sender.element.find("span.k-in").css('width',' 9em !important');
        },
        animation: false,
        height: 435,
        dataSource: homogeneous,
        select: onSelect,
        dataTextField: "CC_NAME",
        check: onCheck,
        expand: onExpand

    });
    $("#treeview").kendoDropTarget({
        filter: "li",
        drop: function (e) {
          
            loadKMask();
       
            try{
                if (checkeRowsARR.length == 0) {
                    showMessage("Warning", "No contact is selected. Please select a contact.", 3, "msgDiv");
                    loadKUnMask();
                    return;
                }
                var contactArr = [];
                var groupName = e.target.innerText;
                var treeview = $("#treeview").data("kendoTreeView");
                var dataItem=  treeview.dataItem(treeview.findByText( e.target.innerText));
                if(dataItem.CC_TYPE !=1){
                    showMessage("Warning", "Telephone numbers should not be allowed to move under costcentre or telephone number", 3);
                        
                    loadKUnMask();
                    e.preventDefault;
                    return;
                }
                // var groupId = e.target.id;
               
                for (var i = 0; i < checkeRowsARR.length; i++) {
                
                
                    contactArr.push(checkeRowsARR[i].CC_NAME);
                    
                }
                //                if (contactArr.length == 0) {
                //                    showMessage("Warning", "Contacts already exists.", 3, "msgDiv");
                //                    return false;
                //                }
                // groupObj[groupName] = contactArr;
                checkeRowsARR = [];
                //  $("#contactGrid").data('kendoGrid').dataSource.data(data);
                loadKMask();
                var ReqData = new Object();
                ReqData.serviceNoArr = contactArr;
                ReqData.parentId = groupName;
                // ReqData.UniqueKey = parent.generateTocken();
                var ajaxObj = new JQueryAjaxCall();
                //            ajaxObj.addData('saveTaggerNos.action', ReqData, true);
                ajaxObj.addData('updateServiceNos.action', ReqData, true);
                ajaxObj.submit(function (res) {
                 
                    loadKUnMask();
                    if (res == null) {
                        return;
                    }
                    $("#grid").empty();
                    var status = res.data;
                    if (status[0].status == 1) {
                        showMessage("Success", "Telephone numbers moved successfully.", 1);
                    } else if (status[0].status == 3) {
                        showMessage("Warning", "Telephone numbers already exist", 2);
                    } else {
                        showMessage("error", "Unable to move Telephone numbers", 3);
                    }
                    refreshPage();
                });
            }catch(e){
                loadKUnMask();
            }
        }
    });
    $("#treeview1").kendoTreeView({
        checkboxes: {
            template: kendo.template($("#treeview-template").html())
        },
        animation: false,
        dataSource: homogeneous1,
        check: onCheck1,
        select: onSelect1,
        expand: onExpand
    });

    //    $("#accountNumbers").empty();
    //    $("#accountNumbers").kendoTreeView({
    //        checkboxes: {
    //            template:kendo.template($('#accountNoCbTemplate').html())
    //        },    
    //        template:kendo.template($('#accountNoTemplate').html()),
    //        animation: false
    //    });
    kendo.ui.progress($("#grid>div.k-grid-content"), false);
//    if(sampleData.length > 0){
//        var treeview = $("#treeview").data("kendoTreeView");
//        if(sampleData[0].HASCHILDRENS>0){
//            ccRootNodeName = sampleData[0].CC_NAME;
//            treeview.expand(treeview.findByText(sampleData[0].CC_NAME));
//            nodeObj=undefined;
//        }
//    }else{
//
//    }
}
function onSelect(e)
{
    var treeview = $("#treeview").getKendoTreeView();
    var item = treeview.dataItem(e.node);
    if (!item.checked) {
        item.set("checked", true);
        onCheck(e);
    } else {
        item.set("checked", false);
        onCheck(e);
    }
}
function onSelect1(e) {
    var treeview = $("#treeview1").getKendoTreeView();
    var item = treeview.dataItem(e.node);

    if (item.checkable != undefined) {

        if (!item.checked) {
            item.set("checked", true);
            onCheck1(e);
        } else {
            item.set("checked", false);
            onCheck1(e);
        }
    }
}
function fnCallbackFetchCCFail()
{
    showMessage("Error", "Unable to get cost centre details", 2);
}
function traverse(nodes, callback) {
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var children = node.hasChildren && node.children.data();

        callback(node);

        if (children) {
            traverse(children, callback);
        }
    }
}
var uid, destNode, sourceNode, accNodeObj, accUID;
var selector;
var typeOfNode;
nodeObj = undefined;

function disableLi(id) {
    $('#' + id).addClass("disableLi");

}
function enableLi(id) {
    $('#' + id).removeClass("disableLi");
}
function onCheck(e) {
    loadKMask()
    try{
        var treeview = $("#treeview").getKendoTreeView();
        var dataItem = treeview.dataItem(e.node);
        document.getElementById("searchField").value = "";

        if (dataItem.checked) {
            if (dataItem.CC_TYPE == 0) {
                disableLi('accountNoLi');
                disableLi('addServiceNumbersLi');
                enableLi("costCenteLi");
                enableLi("costCodeLi");
                var reqData = {};
                reqData.CC_PARENT = dataItem.CC_ID;
                reqData.CC_TYPE = dataItem.CC_TYPE;
                reqData.CC_NAME = document.getElementById("searchField").value;
                reqData.UniqueKey = parent.generateTocken();
                procesRequest("fetchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSucc, fnCallbackFetchCCGridFail);
            } else if (dataItem.CC_TYPE == 1) {
                disableLi('costCenteLi');
                disableLi('costCodeLi');
                enableLi("accountNoLi");
                enableLi("addServiceNumbersLi");
                var reqData = {};
                reqData.CC_PARENT = dataItem.CC_PARENT;
                reqData.CC_ID = dataItem.CC_ID;
                reqData.CC_TYPE = dataItem.CC_TYPE;
                reqData.CC_NAME = document.getElementById("searchField").value;
                reqData.UniqueKey = parent.generateTocken();
                procesRequest("fetchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSucc, fnCallbackFetchCCGridFail);
            } else {
                disableLi('costCenteLi');
                disableLi('costCodeLi');
                disableLi('accountNoLi');
                disableLi('addServiceNumbersLi');
                var reqData = {};
                var dataItem1 = treeview.dataItem(treeview.parent(e.node))
                reqData.CC_ID = dataItem1.CC_ID;
                reqData.CC_PARENT = dataItem1.CC_PARENT;
                reqData.CC_TYPE = dataItem.CC_TYPE;
                reqData.CC_NAME = document.getElementById("searchField").value;
                reqData.UniqueKey = parent.generateTocken();
                procesRequest("fetchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSucc, fnCallbackFetchCCGridFail);
            }
            if (dataItem.CC_TYPE != 2) {
                uid = $(e.node).closest("li").data("uid");
                nodeObj = treeview.dataSource.getByUid(uid);
                try {
                    var type = dataItem.CC_TYPE;
                    typeOfNode = type;
                } catch (e) {
                }
            } else {
                nodeObj = undefined;
            }

            if (!dataItem.hasChildren)
                dataItem.isExpand = true;

            var rootNodes = treeview.dataSource.data();

            traverse(rootNodes, function (node) {

                if (node != dataItem) {
                    if (dataItem.CC_PARENT == node.CC_PARENT) {

                        if (dataItem.CC_TYPE != 2) {
                            node.set("checked", false);
                        }
                        else {
                        }
                    } else {
                        node.set("checked", false);

                    }
                } else
{
                    if (dataItem.CC_TYPE == 2) {

                        accountsArr.push(dataItem);
                    } else {
                        accountsArr = [];
                    }


                }
            });

            treeview.expand(treeview.findByUid(uid));


        } else {
            loadKUnMask();
            disableLi('accountNoLi');
            disableLi('addServiceNumbersLi');
            enableLi("costCenteLi");
            disableLi("costCodeLi");
            if (accountsArr.length == 0) {
                nodeObj = undefined;
            }
            else {
                var index = getIndexOfAccount(accountsArr, dataItem);

                if (index != -1)
                    accountsArr.splice(index, 1);

            }

        }
        if (accountsArr.length == 0) {

            gridData([]);

        }
    }catch(e){
        enableLi("costCenteLi");
        loadKUnMask();
    }

}
function fnCCValidation(type) { 
    $('.alert').hide();
    
    document.getElementById("costCode").value = "";
    //    document.getElementById("name").value="";
    //    document.getElementById("department").value="";
    //    document.getElementById("budget").value="";
    document.getElementById("costCenterName").value = "";
    if (typeof nodeObj == 'undefined') {
        var treeview = $("#treeview").getKendoTreeView();
        //        if(treeview.dataSource._data.length == 0){
        if (accountsArr.length == 0) {
            if (type == 0)
                loadModal("newCC");
            // $('#newCC').modal('show');
            else if (type == 1) {
                showMessage("Warning", "You cannot add cost code as root node.", 3);
                return;
            } else {
                showMessage("Warning", "You cannot add telephone number as root node.", 3);
                return;
            }
        } else {
            if (type == 0) {
                showMessage("Warning", "You cannot add cost centre to this node.", 3);
            }
            else if (type == 1) {
                showMessage("Warning", "You cannot add cost code to this node.", 3);
                return;
            } else {
                showMessage("Warning", "You cannot add telephone numbers to this node.", 3);
                return;
            }
        }
    //        }
    //        else{
    //            showMessage("Warning", "Please select node to add Cost centre", 3);
    //            return;
    //        }
    } else {
        if (nodeObj.CC_TYPE == 0) {
            if (type == 2) {
                showMessage("Warning", "You cannot add telephone numbers to this node", 3);
                return;
            } else if (type == 1) {
                loadModal("addCostCode");
            // $('#addCostCode').modal('show');
            }
            else {
                loadModal("newCC");
            // $('#newCC').modal('show');
            }

        } else {
            if (type == 0) {
                showMessage("Warning", "You cannot add cost centre to this node", 3);
            }
            else if (type == 1) {
                showMessage("Warning", "You cannot add cost code to this node", 3);
            }
            else {
                if(type==2)
                    loadModal("addPhone");
                else
                    loadModal("addServiceNumbers");
            // $('#addPhone').modal('show');
            }
        }
        $('#addCostCodeCancel').click(function () {
            $("#addCostCode").modal('hide');
            $(".alert").hide();
            
        });


    }
    $('#newCCCancel').click(function () {
        $("#newCC").modal('hide');
        $('.alert').hide();
    });
}

$('#newCC').on('shown.bs.modal', function () {
    $('#costCenterName').focus();
})
$('#addCostCode').on('shown.bs.modal', function () {
    $('#costCode').focus();
})
$('#editCostCenter').on('shown.bs.modal', function () {
    $('#editcostcenter').focus();
})
$('#editCostCode').on('shown.bs.modal', function () {
    $('#editcostcode').focus();
})
$('#addPhone').on('shown.bs.modal', function () {
    $('#serviceNumber').focus();
})
$('#addServiceNumbers').on('shown.bs.modal', function () {
    $('#serviceNumberId').focus();
})
//on Move CostCenter
var uid1, nodeObj1;
function onCheck1(e) {
    var treeview = $("#treeview1").getKendoTreeView();
    var dataItem = treeview.dataItem(e.node);
    if (dataItem.checked) {
        var treeview = $("#treeview1").getKendoTreeView();
        var rootNodes = treeview.dataSource.data();

        traverse(rootNodes, function (node) {
            if (node != dataItem) {
                node.set("checked", false);
            }
        });

        uid1 = $(e.node).closest("li").data("uid");
        nodeObj1 = treeview.dataSource.getByUid(uid1);
        treeview.expand(treeview.findByUid(uid1));
    } else {
        nodeObj1 = undefined;
    }
}

//onExpand
function onExpand(e)
{
    loadKMask();
    try{
        selector = this.element[0].id;
        var reqData = {}

        var dataItem = this.dataItem(e.node);

        if (dataItem.CC_PARENT == -1 && selector == "treeview" && document.getElementById("searchField").value == "") {
            //nodeObj=dataItem;
            reqData.CC_PARENT = dataItem.CC_ID;
            reqData.CC_NAME = document.getElementById("searchField").value;
            reqData.UniqueKey = parent.generateTocken();
            procesRequest("fetchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSucc, fnCallbackFetchCCGridFail);
        }
        reqData = {}
        if (!dataItem.isExpand) {
            loadKMask();
            dataItem.isExpand = true
            uid = $(e.node).closest("li").data("uid");
            reqData.CC_PARENT = dataItem.CC_ID;
            reqData.CC_TYPE = dataItem.CC_TYPE;
            reqData.UniqueKey = parent.generateTocken();
            procesRequest("expandCostCenterAction.action", reqData, fnCallbackExpandCostCenterSucc, fnCallbackExpandCostCenterFail);
        }

        //to expanding current node and to collapse all remaining nodes
        if (expandAll == 1) {
            loadKUnMask()
            try {
                var items = $(this.element).find(".k-item:has(.k-minus)");
                var parents = $(e.node).parents(".k-item");
                var toCollapse = [];

                items.each(function (index, item) {
                    if ($.grep(parents, function (el) {
                        return $(el).data("uid") == $(item).data("uid")
                    }).length <= 0) {
                        toCollapse.push(item);
                    }
                });
                this.collapse(toCollapse);
            } catch (e) {
            }
        }
    }catch(e){
   
    }
}
function fnCallbackExpandCostCenterSucc(response) {
    loadKUnMask()
    result = JSON.parse(response);
    var sampleData1 = result.objCRSResponse.data;
    try{
        if (selector == "treeview1") {

        var nodeData = '';
        if (accountsArr.length == 0) {
            if (nodeObj.CC_TYPE <= 1)
            {
                nodeData = 0;
            } else {
                nodeData = 1;
            }
        } else {
            nodeData = 1;
        }
        $.each(sampleData1, function (i, item) {


            if (item.CC_TYPE == nodeData) {
                item.checkable = true;
            }
            item.id = item.CC_ID
            item.text = item.CC_NAME

            if (item.HASCHILDRENS > 0)
                if (item.CC_TYPE == 0) {
                    item.hasChildren = true;
                    item.isExpand = false;
                }
                else {
                    item.hasChildren = false
                    item.isExpand = true;
                }
            if (item.CC_TYPE == 0) {
                item.spriteCssClass = "costCentre"
            }
            if (item.CC_TYPE == 1) {
                item.spriteCssClass = "costcode"
            }
            if (item.CC_TYPE == 2) {
                item.spriteCssClass = "account"
            }
        });

        var treeview = $("#" + selector + "").data("kendoTreeView");
        treeview.append(sampleData1, treeview.findByUid(uid));

        } else {
            $.each(sampleData1, function (i, item) {
                item.id = item.CC_ID;
                item.text = item.CC_NAME;
                if (item.HASCHILDRENS > 0) {
                    item.isExpand = false;
                    item.hasChildren = true
                } else {
                    item.isExpand = true;
                    item.hasChildren = false;
                }
                if (item.CC_TYPE == 0) {
                    item.spriteCssClass = "costCentre";
                }
                if (item.CC_TYPE == 1) {
                    item.spriteCssClass = "costcode";
                }
                if (item.CC_TYPE == 2) {
                    item.spriteCssClass = "account";
                }
            });
            var treeview = $("#" + selector + "").data("kendoTreeView");
            treeview.append(sampleData1, treeview.findByUid(uid));
        }
    }
catch(e){}
//setInterval(function(){loadKUnMask();}, 5000);
loadKUnMask();


}

function fnCallbackExpandCostCenterFail() {
    loadKUnMask();
}

var globalType = "";

//for saving cost centre/cost code/account numbers into database
function fnAddCostCenter(type)
{
 
    globalType = type;
    var reqData = {};

    if (typeof nodeObj != 'undefined' || nodeObj != null) {
        if (nodeObj.CC_TYPE == "0") {//selected node is cost centre
            if (type == 2) {
                showMessage("Warning", "You cannot add accounts under cost centre node", 3);
            } else {
                if (type == 0) {
                    if ( $.trim(document.getElementById("costCenterName").value)== "") {
                        $('#costCenterName').addClass('form-error');
                        $('#errormsgcostCenterName').html('Please enter cost centre name.');
                        // showMessage("Warning", "Please enter cost centre name.", 3,'showDivCCenter');
                        return false;
                    }
                    if(document.getElementById("costCenterName").value.charAt(0) == '_') {
                        showMessage("Wrong", "You cannot begin  cost centre name with underscore", 3, "showDivCCenter");
                        return false;
                    }
                    if(document.getElementById("costCenterName").value.charAt(0) == ' ') {
                        showMessage("Wrong", "You cannot begin  cost centre name with space", 3, "showDivCCenter"); 
                        return false;
                    }
                    var regexp = /^[a-zA-Z0-9_ ]*$/;
 
                    if (!regexp.test(document.getElementById("costCenterName").value)) {
                        showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "showDivCCenter");
                        return false;
                    }
                    reqData.CC_PARENT = nodeObj.id;
                    reqData.CC_NAME = document.getElementById("costCenterName").value.trim();
                    reqData.CC_DESC = "";
                    reqData.NAME = "";
                    reqData.DEPARTMENT = "";
                    reqData.CC_BUDGET = 0;
                    reqData.CC_TYPE = type;
                    reqData.CREATED_BY = custID;
                    displayLoading(".modal-content");
                    procesRequest("saveCostCenterAction.action", reqData, fnCallbackSaveCostCenterSucc, fnCallbackSaveCostCenterFail);
                } else {
                    var flag = validate('costCodeform');
                    if (flag) {
                        if ( $.trim(document.getElementById("costCode").value)== "") {
                            //                            $('#costCode').addClass('form-error');
                            //                            $('#errormsgcostCode').html('Please enter cost code name.');
                            // showMessage("Warning", "Please enter cost centre name.", 3,'showDivCCenter');
                            showMessage("Wrong", "Please enter cost centre name.", 3, "showDivCCode");
                            return;
                        }
                        if ($("#costCode").val().charAt(0) == '_') {
                            showMessage("Wrong", "You cannot begin a cost code name with underscore.", 3, "showDivCCode");
                            return false;
                        }
                        if ($("#costCode").val().charAt(0) == ' ') {
                            showMessage("Wrong", "You cannot begin a cost centre name with space", 3, "showDivCCode");
                            return false;
                        }
                        var regexp = /^[a-zA-Z0-9_ ]*$/;
 
                        if (!regexp.test(document.getElementById("costCode").value)) {
                            showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "showDivCCenter");
                            return false;
                        }
                        
                        //                        if(!isNumber(document.getElementById("budget").value)){
                        //                            showMessage("Warning", "Please enter budget as number format.", 3,'showDivCCode');
                        //                            return;
                        //                        }
                        reqData.CC_PARENT = nodeObj.id;
                        reqData.CC_NAME = document.getElementById("costCode").value.trim();
                        reqData.NAME = "";
                        reqData.DEPARTMENT = "";
                        reqData.CC_BUDGET = "";
                        reqData.CC_DESC = "";
                        reqData.CC_TYPE = type;
                        reqData.CREATED_BY = custID;
                        displayLoading(".modal-content");
                        procesRequest("saveCostCenterAction.action", reqData, fnCallbackSaveCostCenterSucc, fnCallbackSaveCostCenterFail);




                    }
                }
            }
        } else if (nodeObj.CC_TYPE == "1") {//selected node is cost code
            if (type == 0 || type == 1) {
                showMessage("Warning", "You cannot add cost code or cost centre under cost code node.", 3);
            } else {
                if(type == 2){
                    if (checkedIds.length == 0) {
                        showMessage("Warning","Please select at least one account number to add.",3,"ccMsgAddMobileId");
                        //                    $('#addPhone').modal('hide');
                        return false;
                    }
                    var reqDataArray = [];

                    traverse(checkedIds, function (node) {

                        reqData = {};
                        reqData.CC_PARENT = nodeObj.CC_ID;
                        reqData.CC_NAME = node.SUBSCRIBER_ID;
                        reqData.CC_DESC = "";
                        reqData.TYPE = 2;
                        reqData.NAME = "";
                        reqData.DEPARTMENT = "";
                        reqData.CC_BUDGET = 0;
                        reqData.CC_TYPE = type;
                        reqData.CREATED_BY = custID;
                        reqDataArray.push(reqData);

                    });
                    if (reqDataArray.length == 0) {
                        showMessage("Warning", "Please select at least one account", 3, 'showDivAccNo');
                    } else {
                        checkedIds = [];
                        displayLoading(".modal-content");
                        procesRequest("saveCostCenterAction.action", reqDataArray, fnCallbackSaveCostCenterSucc, fnCallbackSaveCostCenterFail);
                    }
                }else{
                   
                    if (checkedIdsService.length == 0) {
                        showMessage("Warning","Please select at least one telephone number to add.",3,"ccMsgAddMobileIdService");
                        //                    $('#addPhone').modal('hide');
                        return false;
                    }
                    var reqDataArray = [];
                    traverse(checkedIdsService, function (node) {
                        reqData = {};
                        reqData.CC_PARENT = nodeObj.CC_ID;
                        reqData.TYPE = type;
                        reqData.CC_NAME = node.SERVICENUMBERS;
                        reqData.CC_DESC = "";
                        reqData.NAME = "";
                        reqData.DEPARTMENT = "";
                        reqData.CC_BUDGET = 0;
                        reqData.CC_TYPE = 2;
                        reqData.CREATED_BY = custID;
                        reqDataArray.push(reqData);
                    });
                    if (reqDataArray.length == 0) {
                        showMessage("Warning", "Please select at least one telephone", 3, 'showDivAccNo');
                    }
                    else {
                        checkedIdsService = [];
                        displayLoading(".modal-content");
                        procesRequest("saveCostCenterAction.action", reqDataArray, fnCallbackSaveCostCenterSucc, fnCallbackSaveCostCenterFail);
                    }  
                }
            }
        } else if (nodeObj.CC_TYPE == "2") {//selected node is Account number
            showMessage("Warning", "You cannot add cost code, cost centre or telephone number under the telephone number node.", 3);
        } else {
            return;
        }
    } else {

        //        if($("#treeview").data("kendoTreeView").dataSource.data().length==0){
        var reqData = {};
        reqData.CC_PARENT = -1;
        if (type == 0) {
            if ($.trim(document.getElementById("costCenterName").value) == "") {
                $('#costCenterName').addClass('form-error');
                $('#errormsgcostCenterName').html('Please enter cost centre name.');
                // showMessage("Warning", "Please enter cost centre name.", 3,'showDivCCenter');
                return;
            }
            var costcenter = document.getElementById("costCenterName").value;
            if(costcenter.charAt(0) == '_') {
                showMessage("Wrong", "You cannot begin  cost centre name with underscore.", 3, "showDivCCenter");
                return;
            }
            if(document.getElementById("costCenterName").value.charAt(0) == ' ') {
                showMessage("Wrong", "You cannot begin  cost centre name with space", 3, "showDivCCenter"); 
                return false;
            }
            var regexp =/^[a-zA-Z0-9_ ]*$/;
            
            if (!regexp.test(costcenter)) {
                showMessage("Wrong", "Special characters are not allowed except _", 3, "showDivCCenter");
                return;
            }
            reqData.CC_NAME = document.getElementById("costCenterName").value.trim();
            reqData.CC_DESC = "";
            reqData.NAME = "";
            reqData.DEPARTMENT = "";
            reqData.CC_BUDGET = 0;
            reqData.CC_TYPE = type;
            reqData.CREATED_BY = custID;
        } else {
            showMessage("Warning", "You cannot add cost code or telephone number as root node", 3);
        }
        ccRootNodeName = document.getElementById("costCenterName").value;
        displayLoading(".modal-content");
        //        reqData.UniqueKey = parent.generateTocken();
        procesRequest("saveCostCenterAction.action", reqData, fnCallbackFirstTimeSaveCostCenterSucc, fnCallbackFirstTimeSaveCostCenterFail);
    //        }else{
    //            if(type == 0)
    //                showMessage("Warning", "Please select node to add Cost center", 3);
    //            else if(type == 1)
    //                showMessage("Warning", "Please select node to add Cost code", 3);
    //            else if(type == 2)
    //                showMessage("Warning", "Please select node to add Account number", 3);
    //        }
    }
}

function fnCallbackSaveCostCenterSucc(response) {
    loadKUnMask()
    result = JSON.parse(response);
    kendo.ui.progress($(".modal-content"), false);
    if (result.objCRSResponse.data[0].status == "warning") {
        showMessage("warning", "No schema details found", 3);
        return;
    }
   
    if (result.objCRSResponse.data[0].status == "success") {
        if (globalType == "0") {

            $('#newCC').modal('hide');
            showMessage("Success", "Cost centre created successfully", 1);
        } else if (globalType == "1") {

            $('#addCostCode').modal('hide');
           
            var reqData1 = {};
            reqData1.CC_PARENT = nodeObj.CC_ID;
            reqData1.CC_TYPE = nodeObj.CC_TYPE;
            reqData1.CC_NAME = document.getElementById("searchField").value;
            reqData1.UniqueKey = parent.generateTocken();
            procesRequest("fetchCostCenterGridAction.action", reqData1, fnCallbackFetchCCGridSucc, fnCallbackFetchCCGridFail);
            showMessage("Success", "Cost code created successfully", 1);
        } 
        var sampleData1 = result.objCRSResponse.data[0].CC_DATA;
        $.each(sampleData1, function (i, item) {
            item.id = item.CC_ID
            item.text = item.CC_NAME
            item.isExpand = true;
            item.hasChildren = false;
            if (item.CC_TYPE == 0) {
                item.spriteCssClass = "costCentre"
            }
            if (item.CC_TYPE == 1) {
                item.spriteCssClass = "costcode"
            }
            if (item.CC_TYPE == 2) {
                item.spriteCssClass = "account"
            }
        });
        var treeview = $("#treeview").data("kendoTreeView");
        treeview.append(sampleData1, treeview.findByUid(uid));
        if (globalType == "2") {
          
            var treeview = $('#treeview').getKendoTreeView();
            treeview.collapse(".k-item");
            var rootNodes = treeview.dataSource.data();

            traverse(rootNodes, function (node) {
                node.set("checked", false);
            });
            nodeObj=undefined;
            $("#grid").data("kendoGrid").dataSource.data([]);
            $('#addPhone').modal('hide');
            showMessage("Success", "Telephone numbers are added successfully under selected account numbers", 1);
           
        }else if(globalType == "3"){
            
            var treeview = $('#treeview').getKendoTreeView();
            treeview.collapse(".k-item");
            var rootNodes = treeview.dataSource.data();

            traverse(rootNodes, function (node) {
                node.set("checked", false);
            });
            nodeObj=undefined;
            $("#grid").data("kendoGrid").dataSource.data([]);
            $('#addServiceNumbers').modal('hide');
            showMessage("Success", "Telephone numbers are added successfully", 1);
            
        }
    } else if (result.objCRSResponse.data[0].status == "exist") {
        if (globalType == "0")
            showMessage("Warning", "Cost centre name already exists", 3, 'showDivCCenter');
        else if (globalType == "1")
            showMessage("Warning", "Cost code/Cost centre already exists.", 3, 'showDivCCode');
    } else {
        if (globalType == "0") {
            $('#newCC').modal('hide');
            showMessage("Error", "Failed to create cost centre. Please try again.", 2);
        }
        else if (globalType == "1") {

            $('#addCostCode').modal('hide');
            showMessage("Error", "Failed to create cost code. Please try again.", 2);
        }
        else if (globalType == "2") {

            $('#addPhone').modal('hide');
            showMessage("Error", "Faileds to add telephone numbers. Please try again.", 2);
        }
    }
}
function fnCallbackSaveCostCenterFail() {
    loadKUnMask()
    if (globalType == "0")
        showMessage("Error", "Failed to create cost centre. Please try again.", 2);
    else if (globalType == "1")
        showMessage("Error", "Failed to create cost code. Please try again.", 2);
    else if (globalType == "2")
        showMessage("Error", "Faileds to add telephone numbers. Please try again.", 2);
    document.getElementById("costCenterName").value = "";
    //document.getElementById("costCenterDesc").value = "";
    //  document.getElementById("costCode").value = "";
    $("#showDivCCenter").hide();
    $("#showDivCCode").hide();
    $("#showDivAccNo").hide();
}

function fnCallbackFirstTimeSaveCostCenterSucc(response) {
    loadKUnMask()
    result = JSON.parse(response);
    if (result.objCRSResponse.data[0].status == "warning") {
        showMessage("warning", "No schema details found", 3);
        return;
    }
    if (result.objCRSResponse.data[0].status == "success") {
        kendo.ui.progress($(".modal-content"), false);
        $('#newCC').modal('hide');
        showMessage("Success", "Cost centre created successfully.", 1);
        var sampleData1 = result.objCRSResponse.data[0].CC_DATA;
        $.each(sampleData1, function (i, item) {
            item.id = item.CC_ID
            item.text = item.CC_NAME
            item.isExpand = false;
            if (item.CC_TYPE == 0) {
                item.spriteCssClass = "costCentre"
            }
            if (item.CC_TYPE == 1) {
                item.spriteCssClass = "costcode"
            }
            if (item.CC_TYPE == 2) {
                item.spriteCssClass = "account"
            }
        });
        var treeview = $("#treeview").data("kendoTreeView");
        if (treeview.dataSource._data.length == 0) {
            treeview.setDataSource(sampleData1);
        } else {
            treeview.append(sampleData1);
        }


    //        document.getElementsByName("newCCLi")[0].setAttribute("data-toggle","");
    //        document.getElementsByName("newCCLi")[0].setAttribute("href","#");
    //        //for responsive links
    //        document.getElementsByName("newCCLi1")[0].setAttribute("data-toggle","");
    //        document.getElementsByName("newCCLi1")[0].setAttribute("href","#");

    }
    if (result.objCRSResponse.data[0].status == "exist") {
        kendo.ui.progress($(".modal-content"), false);
        showMessage("Warning", "Cost centre name already exists", 3, 'showDivCCenter');
    }

}
function fnCallbackFirstTimeSaveCostCenterFail() {
    loadKUnMask()
}

//Delete
function fnDeleteCostCenter()
{
    loadKUnMask()
    
    if (accountsArr.length == 0) {
        if (nodeObj == undefined || nodeObj == "undefined" || nodeObj == "null") {
            showMessage("Warning", "Please select a node to delete", 3);
        } else {
            var reqData = {}
            //            if(nodeObj.CC_PARENT == "-1"){
            //                if($("#treeview").data("kendoTreeView").dataSource.data().length==0){
            //                    showMessage("Warning", "Please select node to delete.", 3);
            //                }else{
            //                    showMessage("Warning", "Not allowed to delete main Cost centre node.", 3);
            //                }
            //            }else{
            if ((nodeObj.CC_TYPE) == '0') {
                $('#deleteHeader').html("Delete cost centre");
                $('#deleteText').html("Are you sure you want to delete the cost centre?");
            }
            if ((nodeObj.CC_TYPE) == '1') {
                $('#deleteHeader').html("Delete cost code");
                $('#deleteText').html("Are you sure you want to delete the cost code?");
            }
            if ((nodeObj.CC_TYPE) == '2') {
                $('#deleteHeader').html("Delete telephone number");
                $('#deleteText').html("Are you sure you want to delete the telephone number?");
            }
            loadModal("divDelete");
        //            $("#divDelete").modal({
        //                backdrop: 'static'
        //            });

        //            }

        }
    } else {
        $('#deleteHeader').html("Delete telephone number");
        $('#deleteText').html("Are you sure you want to delete telephone number?");
        // $("#divDelete").modal('show');
        loadModal("divDelete");
    }
    $("#yes").unbind("click");
    $('#yes').click(function () {
        $("#divDelete").modal('hide');
        var exArr = [];
        if (accountsArr.length == 0) {
            var obj = {};
            obj.CC_ID = nodeObj.CC_ID;
            obj.CC_PARENT = nodeObj.CC_PARENT;
            obj.CC_NAME = nodeObj.CC_NAME;
            exArr.push(obj)
            reqData = exArr;
        }
        else
        {
            for (var i = 0; i < accountsArr.length; i++) {
                var obj = {};
                obj.CC_ID = accountsArr[i].CC_ID;

                exArr.push(obj)
            }
            reqData = exArr;
        //                    reqData.CC_ID=nodeObj.CC_ID;

        }

        procesRequest("deleteCostCenterAction.action", reqData, fnCallbackDeleteCostCenter1Succ, fnCallbackDeleteCostCenterFail);
    });
    $('#no').click(function () {
        $("#divDelete").modal('hide');
    });
    $('#close').click(function () {
        $("#divDelete").modal('hide');
    });
}
function fnCallbackDeleteCostCenter1Succ(response) {
    loadKUnMask()
    try{
        response = JSON.parse(response);

        var res = response.objCRSResponse.data[0].result;
        var treeview = $("#treeview").data("kendoTreeView");
        if (accountsArr.length == 0) {
          
            treeview.remove(treeview.findByText(nodeObj.CC_NAME));
       
            if (nodeObj.CC_TYPE == "0") {
                if (res == "success")
                    showMessage("Success", "Cost centre deleted successfully.", 1);
                else
                    showMessage("Error", "Unable to delete the cost centre.", 2);

            }
            else if (nodeObj.CC_TYPE == "1") {
                if (res == "success")
                    showMessage("Success", "Cost code deleted successfully.", 1);
                else
                    showMessage("Error", "Unable to delete the cost code.", 2);
            }
            else if (nodeObj.CC_TYPE == "2") {
                if (res == "success")
                    showMessage("Success", "Telephone numbers are deleted successfully.", 1);
                else
                    showMessage("Error", "Unable to delete telephone numbers.", 2);
            }
        } else {

            for (var i = 0; i < accountsArr.length; i++) {
                treeview.remove(treeview.findByText(accountsArr[i].CC_NAME));
            }
            accountsArr = [];
            if (res == "success")
                showMessage("Success", "Telephone numbers are deleted successfully.", 1);
            else
                showMessage("Error", "Unable to delete telephone numbers.", 2);

        }
        gridData([]);
        nodeObj = undefined;
    }catch(e){
        gridData([]);
        nodeObj = undefined;  
    }
    

}
function fnCallbackDeleteCostCenterFail() {
    loadKUnMask()
    if (nodeObj.CC_TYPE == "0")
        showMessage("Success", "Cost centre deleted successfully.", 1);
    else if (nodeObj.CC_TYPE == "1")
        showMessage("Success", "Cost code deleted successfully.", 1);
    else if (nodeObj.CC_TYPE == "2")
        showMessage("Success", "Telephone numbers are deleted successfully.", 1);
}

function fnMoveCostCenter()
{
    
    enableLi('costCenteLi');
    if (accountsArr.length == 0) {

        if (nodeObj == undefined || nodeObj == "undefined" || nodeObj == "null") {
            showMessage("Warning", "Please select a source node to move.", 3);
            return;
        }
    }

    if (nodeObj1 == undefined || nodeObj1 == 'undefined') {
        showMessage("Warning", "Please select destination to move.", 3, 'showDivMove');
        return;
    } else {
        if (accountsArr.length == 0) {
            
            if (nodeObj1.CC_ID == nodeObj.CC_ID) {
                showMessage("Warning", "Source and destination nodes should not be the same", 3, 'showDivMove');
                return;
            }else {
                var reqData = {};
                var exArr = [];

                var obj = {};
                obj.CC_ID = nodeObj.CC_ID;
                obj.CC_PARENT = nodeObj1.CC_ID;
             
                exArr.push(obj)
                reqData = exArr;
            }
        }
        else
        {
            for(var i=0;i<accountsArr.length;i++){
                if(nodeObj1.CC_ID==accountsArr[i].CC_PARENT) {
                    showMessage("Warning", "Parent node should not be same.", 3, 'showDivMove');
                    return;
                 
                }
            }
            var exArr = [];
            for (var i = 0; i < accountsArr.length; i++) {
                var obj = {};
                obj.CC_ID = accountsArr[i].CC_ID;
                obj.CC_PARENT = nodeObj1.CC_ID;
                exArr.push(obj)
            }
            reqData = exArr;


        }

        procesRequest("updateCostCenterAction.action", reqData, fnCallbackUpdateCostCenterSucc, fnCallbackUpdateCostCenterFail);

    }






}
function fnCallbackUpdateCostCenterSucc(response) {
    loadKUnMask()
    response = JSON.parse(response);
    if (response.objCRSResponse.data[0]) {
        if (response.objCRSResponse.data[0].result == "warning") {
            showMessage("warning", "No schema details found", 3);
            // closeModalPOPup("divMove");
            nodeObj1 = undefined;
            nodeObj = undefined;
            accountsArr = [];
            loadKUnMask();
            $('#showDivMove').hide();
            $('#divMove').hide();
            $(".modal-backdrop").removeClass("modal-backdrop fade in");
            return;
        }
    }

    var updateDataArr = [];
    if (accountsArr.length == 0) {
        var treeview = $("#treeview").data("kendoTreeView");
        treeview.remove(treeview.findByText(nodeObj.CC_NAME));
        var updateDataObj = {};

        updateDataObj.CC_ID = nodeObj.CC_ID;
        updateDataObj.CC_PARENT = nodeObj1.CC_ID;
        updateDataObj.CC_NAME = nodeObj.CC_NAME;
        updateDataObj.CC_TYPE = nodeObj.CC_TYPE;
        updateDataObj.spriteCssClass = nodeObj.spriteCssClass;
        updateDataObj.hasChildren = nodeObj.hasChildren;
        updateDataObj.isExpand = false;
        updateDataArr.push(updateDataObj);

    } else {
        for (var i = 0; i < accountsArr.length; i++) {
            var treeview = $("#treeview").data("kendoTreeView");
            treeview.remove(treeview.findByText(accountsArr[i].CC_NAME));
            var updateDataObj = {};
            updateDataObj.CC_ID = accountsArr[i].CC_ID;
            updateDataObj.CC_PARENT = nodeObj1.CC_ID;
            updateDataObj.CC_NAME = accountsArr[i].CC_NAME;
            updateDataObj.CC_TYPE = accountsArr[i].CC_TYPE;
            updateDataObj.spriteCssClass = accountsArr[i].spriteCssClass;
            updateDataObj.isExpand = true;
            updateDataObj.hasChildren = accountsArr[i].hasChildren;
            updateDataArr.push(updateDataObj);
        }
    }
    try {
        var treeview = $("#treeview").data("kendoTreeView");
        treeview.append(updateDataArr, treeview.findByText(nodeObj1.CC_NAME));
    } catch (e) {
    }
    if (accountsArr.length == 0) {
        if (nodeObj.CC_TYPE == "0") {
            showMessage("Success", "Cost centre moved successfully", 1);
        } else if (nodeObj.CC_TYPE == "1") {
            showMessage("Success", "Cost code moved successfully", 1);
        }
    } else {
        showMessage("Success", "Telephone number moved successfully", 1);
    }
    $('#divMove').modal('hide');
    nodeObj1 = undefined;
    nodeObj = undefined;
    accountsArr = [];
    $("#grid").empty();
    loadKUnMask();
    $('#showDivMove').hide();

//    try{
//        var expandNode = treeview.dataItem(treeview.findByText(nodeObj.CC_NAME));
//        treeview.expandTo(expandNode);
//    }catch(e){}
}
function fnCallbackUpdateCostCenterFail() {
    showMessage("Error", "Failed to move the cost centre", 2);
    loadKUnMask();
}
function fnSetCharCount()
{
    var cc_desc = document.getElementById("cc_desc").value;
    var count = 1000 - (cc_desc.length);
    document.getElementById("charCnt").innercostCentre = "Characters left " + count;
}

//Add account numbers
var startIndex;
var endIndex;
function fnAddAccountNumbers(type) {
    if(type==1){
        $("#serviceNumber").val("");
        $("#serviceName").val("");
        $("#accNo").val("");
        accounts_grid.setDataSource(new kendo.data.DataSource({
            data: [],
            pageSize: 10
        }))
        if (typeOfNode == 1) {
            displayLoading("#accountNumbers>div.k-grid-content");
            var reqData = {}

            reqData.CC_PARENT = nodeObj.CC_ID;
            reqData.CUSTOMER_ID = custID;


            procesRequest("fetchPhoneNumbersAction.action", reqData, fnCallbackFetchAccNosSucc, fnCallbackFetchAccNosFail);
        }
    }else{
        $("#serviceNumber").val("");
        $("#serviceName").val("");
        $("#accNo").val("");
        service_grid.setDataSource(new kendo.data.DataSource({
            data: [],
            pageSize: 10
        }))
        if (typeOfNode == 1) {
            displayLoading("#serviceNumbers>div.k-grid-content");
            var reqData = {}
            reqData.CC_PARENT = nodeObj.CC_ID;
            reqData.CUSTOMER_ID = custID;
            procesRequest("fetchServiceNumberssAction.action", reqData, fnCallbackFetchServiceNosSucc, fnCallbackFetchAccNosFail);
        } 
    }
}
function  fnCallbackFetchAccNosSucc(response) {
    loadKUnMask()
    var result1 = JSON.parse(response);

    accountsData = result1.objCRSResponse.data;



    accounts_grid.setDataSource(new kendo.data.DataSource({
        data: accountsData,
        pageSize: 10
    }));
    accounts_grid.refresh();

}
function  fnCallbackFetchServiceNosSucc(response) {
    loadKUnMask()
 
    var result1 = JSON.parse(response);
    accountsData = result1.objCRSResponse.data;
    service_grid.setDataSource(new kendo.data.DataSource({
        data: accountsData,
        pageSize: 10
    }));
    service_grid.refresh();
}
function fnCallbackFetchAccNosFail() {
    showMessage("Error", "Failed to fetch the telephone numbers ", 2);
}

function onMoveCostCenter() {
    if (accountsArr.length == 0) {
        if (nodeObj != undefined) {
            if (nodeObj.CC_PARENT == -1) {
                showMessage("Warning", "You cannot move the main cost centre", 3);
                return
            } else {
                var reqData = {};
                procesRequest("fetchCostCenterAction.action", reqData, fnCallbackFetchCC1Succ, fnCallbackFetchCC1Fail);

            }
        } else {
            showMessage("Warning", "Please select node to move. ", 3);
            return
        }
    } else {
        var reqData = {};
        procesRequest("fetchCostCenterAction.action", reqData, fnCallbackFetchCC1Succ, fnCallbackFetchCC1Fail);

    }


}
function fnCallbackFetchCC1Succ(response) {
    loadKUnMask()
    //$('#divMove').modal('show');
    loadModal("divMove");
    result = JSON.parse(response);

    var sampleData = result.objCRSResponse.data;
    $.each(sampleData, function (i, item) {
        item.id = item.CC_ID;
        item.text = item.CC_NAME;
        if (accountsArr.length == 0) {
            item.checkable = true;
        }
        item.isExpand = false;

        if (item.HASCHILDRENS > 0)
            item.hasChildren = true
        else
            item.hasChildren = false
        if (item.CC_TYPE == 0) {
            item.spriteCssClass = "costCentre"
        }
        if (item.CC_TYPE == 1) {
            item.spriteCssClass = "costcode"
        }
        if (item.CC_TYPE == 2) {
            item.spriteCssClass = "account"
        }
    });
    var treeview1 = $("#treeview1").getKendoTreeView();
    treeview1.setDataSource(sampleData);

}
function fnCallbackFetchCC1Fail() {
    loadKUnMask()
    showMessage("Error", "Failed to retrieve the telephone numbers", 2);
}

function fnModalMoveClose(id) {
    $('#' + id).modal('hide');
    loadKUnMask();
}

function onCollapseAll() {
    loadKMask();

    var treeview = $('#treeview').getKendoTreeView();

    treeview.collapse(".k-item");
    gridData([]);
    setInterval(function () {
        loadKUnMask();
    }, 1000);
}
var expandAll = 1;
function onExpandAll() {
    if ($('#treeview').getKendoTreeView().dataSource._data.length != 0) {
        loadKMask();
        expandAll = 2;
        var reqData = {};
        procesRequest("ExpandAllCostCenterAction.action", reqData, fnCallbackExpandAllCC1Succ, fnCallbackExpandAllCC1Fail);
    }



}

function fnCallbackExpandAllCC1Succ(response) {
    loadKUnMask()
    var result1 = JSON.parse(response);

    var sampleData = result1.objCRSResponse.data;
    $.each(sampleData, function (i, item) {
        item.id = item.CC_ID
        item.text = item.CC_NAME
        item.checkable = true;
        if (item.CC_TYPE == 0) {
            item.isExpand = true;
            item.expanded = true;
        } else {
            item.isExpand = false;
            item.expanded = false;
        }
        if (item.HASCHILDRENS > 0)
            item.hasChildren = true
        else
            item.hasChildren = false
        if (item.CC_TYPE == 0) {
            item.spriteCssClass = "costCentre"
        }
        if (item.CC_TYPE == 1) {
            item.spriteCssClass = "costcode"
        }
        if (item.CC_TYPE == 2) {
            item.spriteCssClass = "account"
        }
    });

    var treeview = $("#treeview").data("kendoTreeView");
    treeview.setDataSource(processTable(sampleData, "CC_ID", "CC_PARENT", -1));

    loadKUnMask();
    expandAll = 1;
    gridData([]);
    nodeObj = undefined;
}
function fnCallbackExpandAllCC1Fail() {
    loadKUnMask();
    expandAll = 1;
    gridData([]);

    showMessage("Error", "An error occurred while expanding all", 2);
}
function processTable(data, idField, foreignKey, rootLevel) {
    var hash = {};

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var id = item[idField];
        var parentId = item[foreignKey];

        hash[id] = hash[id] || [];
        hash[parentId] = hash[parentId] || [];

        item.items = hash[id];
        hash[parentId].push(item);
    }

    return hash[rootLevel];
}
/********    GRID    **********/

function fnCallbackFetchCCGridSucc(response) {
    loadKUnMask()
    
    var sampleData1 = JSON.parse(response).objCRSResponse.data;
    gridData(sampleData1);
}
function fnCallbackFetchCCGridSearchSucc(response) { 
    loadKUnMask()
    
    var sampleData1 = JSON.parse(response).objCRSResponse.data;
    if (sampleData1.length == 0) {
        showMessage("Warning", "No data found for cost code \"" + document.getElementById("searchField").value + "\"", 3);
        gridData(sampleData1);
    } else {

        $('#txt').hide();
        gridData(sampleData1);
        var st = sampleData1[0].HIERARCHY;
        st = st.split(",");
        var treeview = $("#treeview").data("kendoTreeView");
        for (var i = 0; i < st.length; i++) {
            (function (i) {
                setTimeout(function () {
                    treeview.expand(treeview.findByText(st[i]));
                }, 500 * i);
            }(i));

        }
        nodeObj = undefined;
    }
}

function gridData(data) {
    $("#grid").empty();
    grid = null;
    if(isGridSerch){
        isGridSerch=false;
        grid = $("#grid").kendoGrid({
            dataSource: {
                data: data,
                pageSize: 10
            },
            height: 435,
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
            dataBound: gridDataBound,
            pageable: {
                pageSize: 10
            },
            columns: [{
                field: "CC_NAME",
                title: "Cost code",
                encoded: false,
                width: 200
            }, {
                field: "HIERARCHY",
                title: "Hierarchy",
                width: 200
            }, {
                title: 'Action',
                headerAttributes: {
                    style: "padding-left:10px !important;color:#333 !important"
                },
                menu: false,
                template: $("#grid_users_icon_template").html(),
                width: 150

            }
            ]
        }).data("kendoGrid");
    }else{
      
        try{
            if(nodeObj.CC_TYPE ==1){
                checkeRowsARR=[];
                $("#checkAllServiceNumber").remove();
                grid = $("#grid").kendoGrid({
                    dataSource: {
                        data: data,
                        pageSize: 10
                    },
                    height: 435,
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
                    dataBound: gridDataBound,
                    pageable: {
                        pageSize: 10
                    },
                    columns: [  {
                        title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='checkAllServiceNumber'></span>",
                        template: $("#checkbox_template2").html(),
                        menu: false,
                        width: "50px"
                    },{
                        field: "CC_NAME",
                        title: "Telephone number",
                        encoded: false,
                        width: 200
                    },   {
                        field: "CTN_NAME",
                        title: "Telephone name",
                        width: 200
                    },{
                        field: "ACCOUNT_NUMBER",
                        title: "Account number",
                        width: 200
                    },  {
                        field: "OWNER_BAN_NAME",
                        title: "Account name",
                        width: 200
                    }, {
                        title: 'Action',
                        headerAttributes: {
                            style: "padding-left:10px !important;color:#333 !important"
                        },
                        menu: false,
                        template: $("#grid_users_icon_templateforacc").html(),
                        width: 150

                    }
                    ]
                }).data("kendoGrid");
                grid.table.on("click", ".checkbox1", onGridRowSelect);
                $(grid.element).kendoDraggable({
                    filter: "tr",
                    hint: function (e) {
                        // var item = $('<div class="k-grid k-widget" style="background-color: DarkOrange; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
                        return "";
                    },
                    dragstart: function (e) {
                        if (checkeRowsARR.length == 0) {
                            $('body').css('cursor', 'not-allowed');
                            return;
                        } else {
                    
                            $('body').css('cursor', 'move');
                        }
                    //e.currentTarget.hide();
                    },
                    dragend: function (e) {
                        $('body').css('cursor', 'default');
                    //e.currentTarget.show();
                    }
                });
                  
            }else{
                grid = $("#grid").kendoGrid({
                    dataSource: {
                        data: data,
                        pageSize: 10
                    },
                    height: 435,
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
                    dataBound: gridDataBound,
                    pageable: {
                        pageSize: 10
                    },
                    columns: [{
                        field: "CC_NAME",
                        title: "Cost code",
                        encoded: false,
                        width: 200
                    }, {
                        field: "HIERARCHY",
                        title: "Hierarchy",
                        width: 200
                    }, {
                        title: 'Action',
                        headerAttributes: {
                            style: "padding-left:10px !important;color:#333 !important"
                        },
                        menu: false,
                        template: $("#grid_users_icon_template").html(),
                        width: 150

                    }
                    ]
                }).data("kendoGrid");

            }
        }catch(e){}
    }
    
}
function fnCallbackFetchCCGridFail() {
    loadKUnMask();
    showMessage("Error", "Failed to retrieve the grid", 2);

}

function fnUserView(obj) {
    var row = $(obj).closest("tr");
    var ob = grid.dataItem(row);
    loadModal("divView");
    // $('#divView').modal('show');
    document.getElementById('viewcostcode').innerHTML = ob.CC_NAME;
//    document.getElementById('viewname').innerHTML=ob.NAME;
//    document.getElementById('viewdepartment').innerHTML=ob.DEPARTMENT;
//    document.getElementById('viewbudget').innerHTML=ob.CC_BUDGET;
}
var editObj = {};
function fnUserEdit(obj) {
    $(".alert").hide();
    var row = $(obj).closest("tr");

    var ob = grid.dataItem(row);
    editObj = ob;
    loadModal("editCostCode");
    //$('#editCostCode').modal('show');
    document.getElementById('editcostcode').value = ob.CC_NAME;
    //    document.getElementById('editname').value=ob.NAME;
    //    document.getElementById('editdepartment').value=ob.DEPARTMENT;
    //    document.getElementById('editbudget').value=ob.CC_BUDGET;
    $("#Update").unbind("click");
    $('#Update').click(function () {
        var flag = validate('editcostcodeform');
        if (document.getElementById('editcostcode').value.charAt(0) == '_') {
            showMessage("Wrong", "You cannot begin  cost code name with underscore.", 3, "editCostCodemsg");
            return false;
        }
        
        var regexp = /^[a-zA-Z0-9_ ]*$/;
 
        if (!regexp.test(document.getElementById('editcostcode').value)) {
            showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "editCostCodemsg");
            return false;
        }
        if (flag) {
            //            if(!isNumber(document.getElementById("editbudget").value)){
            //                showMessage("Warning", "Please enter budget as number format.", 3,'editCostCodemsg');
            //                return;
            //            }

            var reqData = {};
            reqData.CC_ID = ob.CC_ID
            reqData.old_CC_NAME = ob.CC_NAME;
            reqData.CC_NAME = document.getElementById('editcostcode').value;
            reqData.NAME = "";
            reqData.DEPARTMENT = "";
            reqData.CC_BUDGET = 0;
            procesRequest("updateCostCenterGridAction.action", reqData, fnCallbackUpdateCCGridSucc, fnCallbackUpdateCCGridFail);
        }

    });

}

function fnCostCenterEdit(ccid,ccname,CC_PARENT) {
    $(".alert").hide();
    loadModal("editCostCenter");
    editObj.CC_ID=ccid;
    editObj.CC_PARENT=CC_PARENT;
    editObj.CC_NAME=ccname;
    editObj.CC_TYPE=0;
    $("#editcostcenter").val(ccname);
    //    document.getElementById('editname').value=ob.NAME;
    //    document.getElementById('editdepartment').value=ob.DEPARTMENT;
    //    document.getElementById('editbudget').value=ob.CC_BUDGET;
    $("#UpdateCostCenter").unbind("click");
    $('#UpdateCostCenter').click(function () {
        var flag = validate('editcostcenterform');
        if (document.getElementById('editcostcenter').value.charAt(0) == '_') {
            showMessage("Wrong", "You cannot begin cost centre name with underscore", 3, "editCostCentermsg");
            return false;
        }
        
        var regexp = /^[a-zA-Z0-9_ ]*$/;
 
        if (!regexp.test(document.getElementById('editcostcenter').value)) {
            showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "editCostCentermsg");
            return false;
        }
        if (flag) {
            //            if(!isNumber(document.getElementById("editbudget").value)){
            //                showMessage("Warning", "Please enter budget as number format.", 3,'editCostCodemsg');
            //                return;
            //            }

            var reqData = {};
            reqData.CC_ID = ccid
            reqData.old_CC_NAME = ccname;
            reqData.CC_NAME = document.getElementById('editcostcenter').value;
            reqData.NAME = "";
            reqData.DEPARTMENT = "";
            reqData.CC_BUDGET = 0;
            procesRequest("updateCostCenterGridAction.action", reqData, fnCallbackUpdateCCSucc, fnCallbackUpdateCCGridFail);
        }

    });

}
var curRow={};

function fnUserDelete(obj) {
    try {
        var row = $(obj).closest("tr");
        curRow = grid.dataItem(row);
        if(curRow.CC_TYPE==2){
            $('#deleteHeader').html("Delete telephone number");
            $('#deleteText').html("Are you sure you want to delete the telephone number?"); 
        }else{
            $('#deleteHeader').html("Delete cost code");
            $('#deleteText').html("Are you sure you want to delete the cost code?");
        }
        //  $('#divDelete').modal('show');
        //    $("#divDelete").modal({
        //        backdrop: 'static'
        //    });
        loadModal("divDelete");
        $("#yes").unbind("click");
        $('#yes').click(function () {
            var reqData = {};
            var arr = [];


            arr.push(curRow);
            reqData = arr;
            procesRequest("deleteCostCenterAction.action", reqData, fnCallbackDeleteCostCenterGridSucc, fnCallbackDeleteCostCenterFail);

        });
    } catch (e) {
    }

}

function fnCostCenterDelete(ccid,CC_NAME,ccpARENT) {
    try {
        curRow={}
        curRow.CC_ID=ccid;
        curRow.CC_NAME=CC_NAME;
        curRow.CC_PARENT=ccpARENT;
        $('#deleteHeader').html("Delete cost centre");
        $('#deleteText').html("Are you sure you want to delete the cost centre?");
        //  $('#divDelete').modal('show');
        //    $("#divDelete").modal({
        //        backdrop: 'static'
        //    });
        loadModal("divDelete");
        $("#yes").unbind("click");
        $('#yes').click(function () {
  
            var reqData = {};
            var arr = [];
            //            var curRow={};
            //            curRow.CC_ID=ccid;
            //            curRow.CC_NAME=CC_NAME;
            //            curRow.CC_PARENT=CC_PARENT;
            arr.push(curRow);
            
            reqData = arr;
            procesRequest("deleteCostCenterAction.action", reqData, fnCallbackDeleteCostCentersSucc, fnCallbackDeleteCostCenterFail);

        });
    } catch (e) {
    }

}


function fnCallbackDeleteCostCenterGridSucc(response) {


    response = JSON.parse(response);

    var res = response.objCRSResponse.data[0].result;

    if (res == "success") {
        if(curRow.CC_TYPE==2){
            showMessage("Success", "Telephone number deleted successfully.", 1); 
        }else{
            showMessage("Success", "Cost code deleted successfully.", 1);
        }
        //        var reqData = {};
        //        if (accountsArr.length == 0) {
        //            if (nodeObj.CC_TYPE == 0) {
        //                reqData.CC_PARENT = curRow.CC_PARENT;
        //            } else {
        //                reqData.CC_PARENT = curRow.CC_PARENT;
        //                reqData.CC_ID = curRow.CC_ID;
        //            }
        //        } else {
        //            reqData.CC_PARENT = curRow.CC_PARENT;
        //            reqData.CC_ID = curRow.CC_ID;
        //        }
        //        try{
        //            reqData.CC_TYPE = curRow.CC_TYPE;
        //        }catch(e){}
        //        reqData.CC_NAME = document.getElementById("searchField").value;
        //        reqData.UniqueKey = parent.generateTocken();
        //        procesRequest("fetchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSucc, fnCallbackFetchCCGridFail);
        var treeview = $("#treeview").data("kendoTreeView");
        treeview.remove(treeview.findByText(curRow.CC_NAME));
        var treeview = $('#treeview').getKendoTreeView();

        var rootNodes = treeview.dataSource.data();

        traverse(rootNodes, function (node) {
            node.set("checked", false);
        });
        $("#grid").empty();
    }
    else
        showMessage("Error", "Unable to delete cost code", 2);

}
function fnCallbackDeleteCostCentersSucc(response) {


    response = JSON.parse(response);

    var res = response.objCRSResponse.data[0].result;

    if (res == "success") {
        disableLi('accountNoLi');
        enableLi("costCenteLi");
        disableLi("costCodeLi");
        disableLi("addServiceNumbersLi");
        try{
            if(curRow.CC_ID==nodeObj.CC_ID){
                nodeObj=undefined;
            }
        }catch(e){}
        var treeview = $("#treeview").data("kendoTreeView");
        treeview.remove(treeview.findByText(curRow.CC_NAME));
        showMessage("Success", "Cost centre deleted successfully.", 1);
        gridData([]);
        var treeview = $('#treeview').getKendoTreeView();

        var rootNodes = treeview.dataSource.data();

        traverse(rootNodes, function (node) {
            node.set("checked", false);
        });
        
           nodeObj = undefined;
    }
    else
        showMessage("Error", "Unable to delete cost code", 2);
//      nodeObj = undefined;

}
function fnCallbackUpdateCCGridSucc(response) {

    response = JSON.parse(response);


    var res = response.objCRSResponse.data[0].response;

    if (res == 'exist') {

        showMessage("Warning", "Cost code/Cost centre already exists", 3, 'editCostCodemsg');
    } else {
        if (res == "success") {
            showMessage("Success", "Cost code details are updated successfully.", 1);
            var treeview = $("#treeview").data("kendoTreeView");



            var updateDataArr = [];
            var updateDataObj = {};

            updateDataObj.CC_ID = editObj.CC_ID;
            updateDataObj.CC_PARENT = editObj.CC_PARENT;
            updateDataObj.CC_NAME = document.getElementById('editcostcode').value;
            updateDataObj.CC_TYPE = editObj.CC_TYPE;

            updateDataObj.hasChildren = treeview.dataItem(treeview.findByText(editObj.CC_NAME)).hasChildren;
            //  updateDataObj.uid=treeview.dataItem(treeview.findByText(editObj.CC_NAME)).uid;
            updateDataObj.spriteCssClass = "costcode";
            updateDataObj.isExpand = false;
            updateDataArr.push(updateDataObj);

            try {
                var parent = treeview.parent(treeview.findByText(editObj.CC_NAME));
                treeview.remove(treeview.findByText(editObj.CC_NAME));
                var parentText = treeview.text(parent);

                treeview.append(updateDataArr, treeview.findByText(parentText.toString()));
            } catch (e) {
            }
            $('#editCostCenter').modal('hide');
            $('#editCostCode').modal('hide');
            $("#grid").empty();
            var treeview = $('#treeview').getKendoTreeView();

            var rootNodes = treeview.dataSource.data();

            traverse(rootNodes, function (node) {
                node.set("checked", false);
            });
            
            //            var reqData = {};
            //            reqData.CC_PARENT = editObj.CC_PARENT;
            //            reqData.CC_TYPE = editObj.CC_TYPE;
            //            reqData.CC_NAME = document.getElementById("searchField").value;
            //            // reqData.UniqueKey = parent.generateTocken();
            //            if(nodeObj==undefined)
            //                procesRequest("searchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSearchSucc, fnCallbackFetchCCGridFail);
            //            else
            //                procesRequest("fetchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSucc, fnCallbackFetchCCGridFail);
            $('#editCostCode').modal('hide');
           
        }
        else
            showMessage("Error", "Unable to updated cost code", 2);
    }

}
function fnCallbackUpdateCCSucc(response) {

    response = JSON.parse(response);


    var res = response.objCRSResponse.data[0].response;

    if (res == 'exist') {

        showMessage("Warning", "Cost code/Cost centre already exists", 3, 'editCostCentermsg');
    } else {
        if (res == "success") {
            showMessage("Success", "Cost centre details are updated successfully.", 1);
            var treeview = $("#treeview").data("kendoTreeView");



            var updateDataArr = [];
            var updateDataObj = {};

            updateDataObj.CC_ID = editObj.CC_ID;
            updateDataObj.CC_PARENT = editObj.CC_PARENT;
            updateDataObj.CC_NAME = document.getElementById('editcostcenter').value;
            updateDataObj.CC_TYPE = editObj.CC_TYPE;

            updateDataObj.hasChildren = treeview.dataItem(treeview.findByText(editObj.CC_NAME)).hasChildren;
            //  updateDataObj.uid=treeview.dataItem(treeview.findByText(editObj.CC_NAME)).uid;
            updateDataObj.spriteCssClass = "costCentre";
            updateDataObj.isExpand = false;
            updateDataArr.push(updateDataObj);

            try {
                var reqData = {};
                var reqData = {};
                reqData.UniqueKey = parent.generateTocken();
                procesRequest("fetchCostCenterAction.action", reqData, fnCallbackFetchCCSucc, fnCallbackFetchCCFail);
            
            //                var parent = treeview.parent(treeview.findByText(editObj.CC_NAME));
            ////                treeview.findByText(editObj.CC_NAME)
            //                var item = treeview.findByText(editObj.CC_NAME);
            //                item.data("text", document.getElementById('editcostcenter').value);
            //                item.data("CC_NAME", document.getElementById('editcostcenter').value);
            //                treeview.updateIndeterminate();
            //                treeview.detach(item);
            } catch (e) {
            }
            $('#editCostCenter').modal('hide');
            
        //            var reqData = {};
        //    var reqData = {};
        //    reqData.UniqueKey = parent.generateTocken();
        //    procesRequest("fetchCostCenterAction.action", reqData, fnCallbackFetchCCSucc, fnCallbackFetchCCFail);
           
        }
        else
            showMessage("Error", "Unable to updated cost code", 2);
    }

}
function  fnCallbackUpdateCCGridFail() {
    showMessage("Error", "Unable to updated cost code.", 2);
}

function onGridSearch() {
    
    isGridSerch=true;     
    var treeview = $('#treeview').getKendoTreeView();
    treeview.collapse(".k-item");
    var rootNodes = treeview.dataSource.data();

    traverse(rootNodes, function (node) {
        node.set("checked", false);
    });
    if (document.getElementById("searchField").value != "") {
        var reqData = {};
        reqData.CC_NAME = document.getElementById("searchField").value;
        procesRequest("searchCostCenterGridAction.action", reqData, fnCallbackFetchCCGridSearchSucc, fnCallbackFetchCCGridFail);
    } else{
        $("#grid").data('kendoGrid').dataSource.data([]);
    }
    
    


}


/*********** OTHER ***********/
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
var handleError = function (element, message) {
    $('#' + element).addClass('form-error');
    var spanElement = document.getElementById(element).nextElementSibling;
    if (spanElement == null) {
        $('#' + element).after('<span class="errormsg"></span>');
    }
    var span = $('#' + element).next('.errormsg');
    span.html(message);
    $('#' + element).focus(function () {
        span.html("");
        $('#' + element).removeClass('form-error');
    });
};
function validate(form) {
    var Elements = document.getElementById(form).elements;
    var count = 0;
    for (var i = 0; i < Elements.length; i++) {
        var validation = Elements[i].value;
        if (validation == '') {
            count++;
            handleError(Elements[i].id, Elements[i].title + ' should not be empty');
        }
    }
    if (count != 0) {
        return false;
    } else {
        return true;
    }
}
;

//$('#searchField').keydown(function (e) {
//
//    // If Enter key pressed
//        $('#gridsearch').click();
//
//    
//});
function getIndexOfAccount(Account, data) {

    for (var i = 0; i < Account.length; i++) {
        if (Account[i].CC_NAME == data.CC_NAME)
            return i;
    }
    return -1;
}

$("#costCenterName").keypress(function(event) {

    var regexp = /^[a-zA-Z0-9_ ]*$/;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if(event.keyCode === 13){
        fnAddCostCenter(0);
        return false;
    }
    if($("#costCenterName").val()=="" && key=='_') {
        showMessage("Wrong", "You cannot begin  cost centre name with underscore", 3, "showDivCCenter"); 
        return false;
    } 
    if($("#costCenterName").val()=="" && key==' ') {
        showMessage("Wrong", "You cannot begin cost centre name with space", 3, "showDivCCenter"); 
        return false;
    }
     
    if(event.keyCode === 46 || event.keyCode === 8) {
    }else{
      
        if (!regexp.test(key)) {
            showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "showDivCCenter");

            event.preventDefault();
        // return false;
        }
    }
    
});
$("#costCode").keypress(function(event) {
     
    var regexp = /^[a-zA-Z0-9_ ]*$/;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if(event.keyCode === 13){
        fnAddCostCenter(1);
        return false;
    }
    if($("#costCode").val()=="" && key=='_') {
        showMessage("Wrong", "You cannot begin  cost code name with underscore", 3, "showDivCCode"); 
        return false;
    } 
    if($("#costCode").val()=="" && key==' ') {
        showMessage("Wrong", "You cannot begin  cost code name with space", 3, "showDivCCode"); 
        return false;
    }
    
   
    if(event.keyCode === 46 || event.keyCode === 8) {
    
    }else{
        if (!regexp.test(key)) {
            showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "showDivCCode");

            event.preventDefault();
            return false;
        }
    }
   
    
});
$("#editcostcenter").keypress(function(event) {
     
    var regexp = /^[a-zA-Z0-9_ ]*$/;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if(event.keyCode === 13){
        $( "#UpdateCostCenter" ).trigger( "click" );
        return false;
    }
    if($("#editcostcenter").val()=="" && key=='_') {
        showMessage("Wrong", "You cannot begin  cost centre name with underscore", 3, "editCostCentermsg"); 
        return false;
    } 
    if($("#editcostcenter").val()=="" && key==' ') {
        showMessage("Wrong", "You cannot begin cost centre name with space", 3, "editCostCentermsg"); 
        return false;
    }
   
    if(event.keyCode === 46 || event.keyCode === 8) {
    }else{
        if (!regexp.test(key)) {
            showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "editCostCentermsg");

            event.preventDefault();
            return false;
        }
    }
   
    
});
$("#editcostcode").keypress(function(event) {
     
    var regexp = /^[a-zA-Z0-9_ ]*$/;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if(event.keyCode === 13){
        $( "#Update" ).trigger( "click" );
        return false;
    }
    if($("#editcostcode").val()=="" && key=='_') {
        showMessage("Wrong", "You cannot begin  cost code name with underscore", 3, "editCostCodemsg"); 
        return false;
    } 
    if($("#editcostcode").val()=="" && key==' ') {
        showMessage("Wrong", "You cannot begin  cost code name with space", 3, "editCostCodemsg"); 
        return false;
    }
    if(event.keyCode === 46 || event.keyCode === 8) {
    }else{
        if (!regexp.test(key)) {
            showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "editCostCodemsg");

            event.preventDefault();
            return false;
        }
    }
   
    
});
$(document).on("click", function(e) {
    if ( $(e.target).attr("class")!=="k-link k-pager-nav") {
        $('ul.k-pager-numbers').removeClass("k-state-expanded");
    }
    if($(e.target).attr('class')!=="help_ic") {
        $("#tourpopover").hide();
    }
});

function onGridRowSelect() {
     
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = grid.dataItem(row);
    if (checked) {
        var index = checkeRowsARR.indexOf(dataItem);
        if (index == -1) {
            checkeRowsARR.push(dataItem);
            
        }
    } else {
        var index1 = checkeRowsARR.indexOf(dataItem);
        if (index1 != -1) {
            checkeRowsARR.splice(index1, 1);
            
        }
    }
   
    var count = 0;
    var view = grid.dataSource._data;
    for (var k = 0; k < view.length; k++) {
        if (checkeRowsARR.indexOf(view[k])!=-1) {
            count++
        }
    }
    if (count == view.length) {
        document.getElementById('checkAllServiceNumber').checked=true;
        $("#checkAllServiceNumber").prop('checkAllService', true);
    } else {
        $("#checkAllServiceNumber").prop('checked', false);
    }
    if (view.length == 0) {
        $("#checkAllServiceNumber").prop('checked', false);
    }
}
$(document).on("change","#checkAllServiceNumber",function () {
   
    //                $("#checkAll").change(function () {
    var strGridData = JSON.stringify(grid._data);
    var objGridData = JSON.parse(strGridData);
    if (this.checked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = grid.dataSource.view()[idx];//checkeRows
            var index = checkeRowsARR.indexOf(dataItem);
            if (index == -1) {
                checkeRowsARR.push(dataItem);
                               
            }
            $("#" + objGridData[idx].CC_NAME).prop('checked', true);
        }
    }
    else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem1 = grid.dataSource.view()[idx];
            var index1 = checkeRowsARR.indexOf(dataItem1);
            if (index1 != -1) {
                checkeRowsARR.splice(index1, 1);
                               
            }
            $("#" + objGridData[idx].CC_NAME).prop('checked', false);
        }
    }
});
function test_pagechange(e) {
//    debugger;
//    var count = 0;
//    var view = e;
//    for (var k = 0; k < view.length; k++) {
//        if (checkeRowsARR.indexOf(view[k].CC_NAME)!=-1) {
//            count++
//        }
//    }
//    if (count == view.length) {
//        $("#checkAllService").prop('checked', true);
//    } else {
//        $("#checkAllService").prop('checked', false);
//    }
//    if (view.length == 0) {
//        $("#checkAllService").prop('checked', false);
//    }
}