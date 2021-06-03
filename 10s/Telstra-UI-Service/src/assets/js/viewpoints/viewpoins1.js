var loadCompanyData="";
var homogeneous="";
var viewPointsArr="";
var isFirstTIme = true;

var loadCompanyData = "";
var data;
var addAccountDATA=[];
var accountGrid = "";
var accountGrid1="";
var accountGridData=[];
var allAccData=[];
var selected_ViewPoint="";
var selected_ViewPointName = "";
var checkeRows = [];
var checkeRows1 = [];
   
   
$(document).ready(function ()
{
    loadKMask();
    var ReqData = new Object();
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('loadViewPointsData.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        
        
        data = res.data.ACC_DATA;
       
        viewPointsArr = res.data.VIEWPOINTS_DATA;
        if (res == null) {
            return;
        }
        if(isFirstTIme) {
            isFirstTIme = false;
            var codesDataSource = new kendo.data.DataSource({
                data: viewPointsArr
            });
            $("#grpSelectId").kendoListView({
                dataSource: codesDataSource,
                template: "<li class='act' ><div class='left'><input name='viewpoint' id='#:VP_NAME#' type='checkbox'  class='chkBoxCls' value='#:VP_NAME#,#:VP_ID#' onchange='onGroupCheck(this)'><label class='textoverflowec' id='#:VP_ID#' title='#:VP_NAME#'>#:VP_NAME#</label></div> <div class='right'><a data-toggle='modal' href='javascript:void(0)' onclick='fnEditViewPointName(\"#:VP_NAME#\",\"#:VP_ID#\")'><i class='editicon' title='Edit viewpoint name'></i></a> <a data-toggle='modal' href='javascript:void(0)' onclick='fnDeleteViewPoint(\"#:VP_NAME#\",\"#:VP_ID#\")'><i class='deleteicon' title='Delete viewpoint'></i></a></div></li>",
                scrollable: true
            });
            
            $("#treeview1").kendoListView({
                dataSource: codesDataSource,
                template: "<li class='act'><div class='left'><input name='' id='m#:VP_NAME#' type='checkbox'  class='chkBoxCls1' value='#:VP_NAME#,#:VP_ID#' onchange='onmoveGroupCheck(\"#:VP_NAME#\",\"#:VP_ID#\")'><label>#:VP_NAME#</label></div></li>",
                scrollable: true
            });
            
        } 
        var dataSource1 = new kendo.data.DataSource({
            data: [],
            //batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "ProductID1",
                    fields: {
                        VP_NAME: {
                            editable: false
                        },
                        MOBILE_NO: {
                            editable: false
                        },
                        VP_ID: {
                            editable: false
                        },
                        VP_PARENT: {
                            editable: false
                        }
                    }
                }
            }
        });
        
        accountGrid = $("#accountGrid").kendoGrid({
            dataSource:dataSource1,
            pageable: true,
            height: 435,
            sortable: true,
            reorderable: true,
            //        pageable: {
            //                input: true,
            //                numeric: false
            //            },
            //groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            //define dataBound event handler
            dataBound: permit_accountGrid_gridDataBound,
            columns: [
            //define template column with checkbox and attach click event handler
            {
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='allViewPointGrid'></span>",
                template: $("#viewPointsGrid_template1").html(),
                menu:false,
                width: "50px"
            },
            {
                field: "VP_NAME",
                title: "Account number",
                width: "180px"
            },
            {
                field: "VP_PARENT",
                title: "VP_PARENT",
                menu:false,
                hidden: true
            },
            {
                field: "ACCOUNT_NAME",
                title: "Account name",
                width: "180px"
            },
            {
                field: "MOBILE_NO",
                title: "Telephone number",
                width: "180px"
            }, {
                title: 'Action',
                headerAttributes: {
                    style: "padding-left:10px !important;color:#333 !important"
                },
                menu: false,
                template: $("#grid_tigger_nos_template").html(),
                width: 100
            }
            ]
             
        }).data("kendoGrid");
        accountGrid.table.on("click", ".checkbox1", onAllAccGridRowSelect); 
        
        
        var dataSource11 = new kendo.data.DataSource({
            data:allAccData,
            //batch: true,
            pageSize: 5,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        AC_NO: {
                            editable: false
                        },
                        AC_NO: {
                            editable: false
                        }
                    }
                }
            }
        });

        accountGrid1 = $("#addAccount").kendoGrid({
            dataSource: dataSource11,
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
                menu:false,
                width: "15%"
            },
            {
                field: "AC_NO",
                title: "Account number",
                width: "40%"
            }, {
                field: "AC_NAME",
                title: "Account name",
                width: "45%"
            }
            ]

        }).data("kendoGrid");
        accountGrid1.table.on("click", ".checkbox", onGridRowSelect);


        
    
    });
    
    //var viewPoints=["One", "Two"];
    $("#dropdownlist").kendoDropDownList({
        dataTextField: "COMPANY_NAME",
        dataValueField: "COMPANY_ID",
        dataSource: loadCompanyData,
        //change: onViewPointChange,
        height: 150
    // filter: "contains",
    //  value: (viewPoints.length > 0) ? viewPoints[0].VP_ID : ""
    });
});
    
function permit_gridDataBound(arg) {
    kendo.ui.progress($("#accountGrid>div.k-grid-content"), false);
    if (arg.sender._data.length === 0) {
        var colCount = $("#accountGrid").find('.k-grid-header colgroup > col').length;
        $("#accountGrid").find('.k-grid-content tbody')
        .append('<tr class="kendo-data-row"><td colspan="' +
            colCount +
            '" style="text-align:center"><b>No records found</b></td></tr>');
    }
// test_pagechange(arg.sender._data);
}
function loadCompanyName()
{
   
    var ReqData = new Object();
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('loadCompanyName.action', ReqData, true);
    ajaxObj.submit(function (res) {
        
        var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        dropdownlist.setDataSource(res.data.COMPANY_DATA);  
           
    });
    
}

function loadInitialData() {
    debugger
    loadKMask()
    try{
        checkeRows = [];
        // checkeRows1 = [];
        // mcheckeRows = [];
        data = [];
        //    selected_ViewPoint = "";
        var ReqData = new Object();
        ReqData.UniqueKey = parent.generateTocken();
        var ajaxObj = new JQueryAjaxCall();
        ajaxObj.addData('loadViewPointsData.action', ReqData, true);
        ajaxObj.submit(function (res) {
            try{
                
                debugger
                data = res.data.ACC_DATA;
                try{
                    $("#accountGrid").data('kendoGrid').dataSource.data(data);
                }catch(e){
                    
                }
                
                viewPointsArr = res.data.VIEWPOINTS_DATA;
                var codesDataSource = new kendo.data.DataSource({
                    data: viewPointsArr
                });
                $("#grpSelectId").data('kendoListView').setDataSource(codesDataSource);
                // $("#treeview1").data('kendoListView').setDataSource(codesDataSource);
                if (res == null) {
                    return;
                }
                //                try{
                //                    if(selected_ViewPoint !==""){
                //                        $('#'+selected_ViewPointName).prop('checked',true);
                //                        $('#'+selected_ViewPointName).trigger('change');
                //                    }else{
                //                        $("#grid").data('kendoGrid').dataSource.data([])
                //                    }
                //                } catch(e) {
                //            
                //        
                //                }
                loadKUnMask() 
            }catch(e){
                loadKUnMask() 
            }
        
        });
    }catch(e){
        loadKUnMask()
    }
}
function trimData(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}
function addViewPoint() {
    
    
    var vp_name = trimData($("#viewname").val());
    //    if (vp_name == "") {
    //        showMessage("Warning","Please enter the viewpoint name.",3,"groupMsg");
    //        return false;
    //    }
    //    if (vp_name.charAt(0) == "_") {
    //        showMessage("Warning","You cannot begin a viewpoint name with underscore.",3,"groupMsg");
    //        return false;
    //    }
    //    var regexp = /^[a-zA-Z0-9_ ]*$/;
    //    if (!regexp.test(vp_name)) {
    //        showMessage("Wrong", "Special characters are not allowed except underscore and space", 3, "groupMsg");
    //        return false;
    //    }
    loadKMask();
    var ReqData = new Object();
    ReqData.VP_NAME = vp_name;
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('addViewPoints.action', ReqData, false);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        debugger
        if (res == null) {
            return;
        }
        var status = res.data;
        if (status == 1) {
            $('#newCC').modal('hide');
            showMessage("Success", "Viewpoint added successfully.",1,"msgDiv");
        } else if (status == 3) {
            showMessage("Error", "Unable to add viewpoint.",2,"msgDiv");
            $('#newCC').modal('hide');
        } else {
            showMessage("Warning", "The viewpoint already exists.",3,"groupMsg");
            return false;
        }
        loadInitialData();
    });
}

function addAccountNo() {
    debugger
    if (selected_ViewPoint != "") {
        
    //$('#divAddaccount').modal("show");
    
        
    } else {
        //showMessage("Warning","Select a viewpoint to add account numbers.",3,"msgDiv");
        alert("please Select viewpoint");
        return false;
    }
    checkeRows = [];
    loadKMask();
    var ReqData = new Object();
    ReqData.VP_ID = selected_ViewPoint;
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('loadAllAccountsData.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        allAccData = res.data.All_ACCOUNTS_DATA;
        $("#addAccount").data('kendoGrid').dataSource.data(allAccData);
        $("#addAccount").find(".k-grid-content").height(280);
    });
    //$("#searchField_accountGrid1").val('');
    $("#addAccount").data('kendoGrid').dataSource.filter([]);
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

function onGroupCheck(obj) {
    debugger
    var groupName = $(obj).val();
    var temp = groupName.split(",");
    groupName = temp[0];
    var groupId = temp[1];
    checkeRows1=[];
    selected_ViewPoint = groupId;
    selected_ViewPointName=groupName;
    if (document.getElementById(groupName).checked) {
        accountGrid.dataSource.data(data);
    
    } else {
        
        $("#accountGrid").data('kendoGrid').dataSource.data([])
        groupName = "";
        selected_ViewPoint = "";
    }

    $(".chkBoxCls").prop('checked', false);
    if (groupName !== "") {
        document.getElementById(groupName).checked=true;
        
        if (data.length == 0) {
            return false;
        }
        var selecteditem = groupId;
        var kgrid = accountGrid;
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
                            orfilter.filters.push({
                                field: "VP_PARENT",
                                operator: "contains",
                                value: v1
                            },
                            {
                                field: "VP_PARENT",
                                operator: "eq",
                                value: v1
                            }
                            );
                            andfilter.filters.push(orfilter);
                            orfilter = {
                                logic: "or",
                                filters: []
                            };
                        }

                    });
                }
            });
            kgrid.dataSource.filter(andfilter);
        }
        else {
            kgrid.dataSource.filter({});
        }
    } else {
        // ReqData.GROUPID="";
        //        dataSource = new kendo.data.DataSource({
        //            data: data,
        //            pageSize: 10,
        //            schema: {
        //                model: {
        //                    id: "ProductID1",
        //                    fields: {
        //                        VP_NAME: {
        //                            editable: false
        //                        },
        //                        VP_ID: {
        //                            editable: false
        //                        },
        //                        VP_PARENT: {
        //                            editable: false
        //                        }
        //                    }
        //                }
        //            }
        //        });
        //$('#' + groupName).prop('checked', true);
        accountGrid.dataSource.filter({});
    }



}

function fnAddAccount()
{
    loadKMask();
    var ReqData = new Object();
    // ReqData.VP_ID = selected_ViewPoint;
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('loadAllAccountsData.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
       
       
        accountGridData=res.data.All_ACCOUNTS_DATA
        //   createdAccGrid(res.data.All_ACCOUNTS_DATA);
        $("#addAccount").data('kendoGrid').dataSource.data(accountGridData);
        $("#addAccount").find(".k-grid-content").height(280);
    });
}
var grid=""
function createdAccGrid(data)
{
    grid= $("#addAccount").kendoGrid({
        dataSource:{
            data:data,
            pageSize:5
                
        },
        height: 400,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        // dataBound: permissiongridDataBound,
        columnMenu: true,
        pageable: true,
        columns: [
        {
            template: "<input type='checkbox'/> <label>&nbsp;</label>", 
            width: 80
        },
        {
            field: "AC_NO",
            title: "Account Number",
            width: 150
                
        },
        {
            field: "AC_NAME",
            title: "Account Name",
            width: 150
        }
        ]
        
    }).data("kendoGrid");
    grid.table.on("click", ".checkbox", onGridRowSelect);
}


function addAccounts() {
    debugger
    if (checkeRows.length == 0) {
        showMessage("Warning","Please select at least one account number to add.",3,"divAddaccountMsg");
        return false;
    }
    loadKMask()
    var ReqData = new Object();
    ReqData.ACCOUNTS = checkeRows;
    ReqData.VP_ID = selected_ViewPoint;

    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('addAccVeiwPointLoad.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask()
        
        if (res == null) {
            return;
        }
        // $("#divAddaccount").hide();
        $('#divAddaccount').modal("hide");
        var status = res.data;
        if (status == 1) {
            showMessage("Success", "Account numbers added successfully.",1,"msgDiv");
            $('#divAddaccount').modal("hide");
        } else if (status == 3) {
            showMessage("Error", "Unable to add account numbers.",2,"msgDiv");
        } else {
            showMessage("Warning", "The account already exists under the selected viewpoint.",3,"msgDiv");
        }
        loadInitialData();
    });
// $("#searchField_accountGrid1").val('');
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


$(document).on("change","#checkAll",function () {
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

$(document).on("change","#allViewPointGrid",function () {
    
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

function moveMultipleTigNos() {
    alert("fsdfsdkfj");
    if(selected_ViewPoint == '') {
        showMessage("Warning","Select a viewpoint.",3,"msgDiv");
        return false;
    }
    if (checkeRows1.length == 0) {
        showMessage("Warning","Select an account number to move",3,"msgDiv");
        return false;
    }
    $('#divMove').modal('show');
    $('.alert').hide();
}


function onMovetoGroup() {
    alert("onMovetoGroup");
    var vpName = "";
    var vpId = "";
    debugger;
    $('#treeview1 :checkbox:enabled').each(function () {
        var sThisVal = (this.checked ? $(this).val() : "");
        if (sThisVal != "") {
            var temp = sThisVal.split(",");
            vpName = temp[0];
            vpId = temp[1];
        }
    });
    if (vpName == "") {
        showMessage("Warning","Please select at least one viewpoint",3,"movMsg");
        return false;
    }
    
    var accArr = [];
    var isDuplicate = false;
    for (var i = 0; i < checkeRows1.length; i++) {

        isDuplicate = false;
        if (checkeRows1[i].VP_ID == vpId) {
            isDuplicate = true;
        }
        if (!isDuplicate) {
            accArr.push(checkeRows1[i]);
        }
    }
    if (accArr.length == 0) {
        showMessage("Warning","Records already exist under the selected group",3,"msgDiv");
        return false;
    }
    loadKMask();
    var ReqData = new Object();
    ReqData.MOVE_DATA = accArr;
    ReqData.VP_PARENT = vpId;
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('moveViewPointsAcc.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        alert(JSON.stringify(res));
        if (res == null) {
            return;
        }
        var status = res.data;
        if (status == 1) {
            showMessage("Success", "Accounts are moved successfully.",1,"msgDiv");
            $('#divMove').modal('hide');
        } else if (status == 3) {
            showMessage("Error", "Unable to move accounts.",2,"msgDiv");
            $('#divMove').modal('hide');
        } else {
            if(status==4){
                showMessage("Success", "Telephone numbers are moved successfully",1,"msgDiv");
                $('#divMove').modal('hide');
            }else{
                if(status==5){
                    showMessage("Warning", "Accounts and telephone number already exist under the selected viewpoint.",3,"msgDiv");
                    $('#divMove').modal('hide');
                }else{
                    showMessage("Warning", "Accounts already exist under the selected viewpoint.",3,"msgDiv");
                    $('#divMove').modal('hide');
                }
            }
        }
        $('.chkBoxCls').prop('checked',false)
        selected_ViewPointName=vpName;
        loadInitialData();
    });
}


// account number delete popup
var MBNo="";
function fnAccountNumberDelete(obj) {
    var row = $(obj).closest("tr");
    var item = accountGrid.dataItem(row);
    $('#divDeleteAccountGrid').modal("show");
    $('#snoID').val(item.VP_ID);
    MBNo=item.MOBILE_NO;
}

// delete account number
function fnDeleteAccount() {
    var tempArr = [];
  
    var obj = new Object();
    obj.VP_ID = $("#snoID").val();
    obj.MOBILE_NO = MBNo;
    obj.VP_NAME = $("#vp_name").val();
    tempArr.push(obj);
    loadKMask();
    var ReqData = new Object();
    ReqData.DELETE_DATA = tempArr;
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('deleteAccounts.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        alert(JSON.stringify(res));
        if (res == null) {
            return;
        }
        var status = res.data;
        if (status == 1) {
            //            showMessage("Success", "Viewpoint accounts deleted Successfully.",1,"msgDiv");
            showMessage("Success", "Viewpoint account/telephone numbers deleted successfully.",1,"msgDiv");
        } else if (status == 2) {
            showMessage("Error", "Unable to delete viewpoint accounts.",2,"msgDiv");
        }
        loadInitialData();
    });
}

function deleteMulptipleAccs() {
    if (checkeRows1.length == 0) {
        showMessage("Warning","Select account details to delete.",3,"msgDiv");
        return false;
    }
    $('#divDelete').modal('show');
}

function fnDeleteAccountNos() {
    loadKMask();
    var ReqData = new Object();
    ReqData.DELETE_DATA = checkeRows1;
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('deleteAccounts.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        alert(JSON.stringify(res));
        if (res == null) {
            return;
        }
        var status = res.data;
        if (status == 1) {
            //            showMessage("Success", "Accounts deleted Successfully.",1,"msgDiv");
            showMessage("Success", "Viewpoint account/telephone number deleted successfully.",1,"msgDiv");
            $('#divDelete').modal('hide');
        } else if (status == 3) {
            $('#divDelete').modal('hide');
            showMessage("Error", "Unable to delete accounts.",2,"msgDiv");
        } 
        loadInitialData();
    });
}

function permit_accountGrid_gridDataBound(arg) {
    kendo.ui.progress($("#grid>div.k-grid-content"), false);
    if (arg.sender._data.length === 0) {
        var colCount = $("#grid").find('.k-grid-header colgroup > col').length;
        $("#grid").find('.k-grid-content tbody')
        .append('<tr class="kendo-data-row"><td colspan="' +
            colCount +
            '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange_main_grid(arg.sender._data);
}

//on dataBound event restore previous selected rows:grid1
function permit_gridDataBound(arg) {
    kendo.ui.progress($("#grid1>div.k-grid-content"), false);
    if (arg.sender._data.length === 0) {
        var colCount = $("#grid1").find('.k-grid-header colgroup > col').length;
        $("#grid1").find('.k-grid-content tbody')
        .append('<tr class="kendo-data-row"><td colspan="' +
            colCount +
            '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange(arg.sender._data);
}

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

// Edit ViewPoint popup
var editView='';
function fnEditViewPointName(vpName, vpCode) {
    alert("fnEditViewPointName")
    editView= vpName
    $('#vp_name').val(vpName);
    $('#vp_id').val(vpCode);
    $('#editviewPoint').modal('show');
    $('.alert').hide();
}

// Update Viewpoint Name
function fnUpdateVP() {
    var vp_name = trimData($("#vp_name").val());
    if (vp_name == "") {
        showMessage("Warning","Please enter the viewpoint name.",3,"editVpMsg");
        return false;
    }
    if (vp_name.charAt(0) == "_" || vp_name.charAt(0) == " " ) {
        showMessage("Warning","You cannot begin a viewpoint name with underscore.",3,"editVpMsg");
        return false;
    }
    var regexp = /^[a-zA-Z0-9_ ]*$/;
    if (!regexp.test(vp_name)) {
        showMessage("Warning", "Special characters are not allowed except underscore and space", 3, "editVpMsg");
        return false;
    }
    if(editView==vp_name){
        showMessage("Warning", "No changes are made to the viewpoint name",3,"editVpMsg");
        return false;
    }
    loadKMask();
    var ReqData = new Object();
    ReqData.VP_ID = $("#vp_id").val();
    ReqData.VP_NAME = vp_name;
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('updateViewPoint.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        if (res == null) {
            return;
        }
        var status = res.data;
        if (status == 1) {
            $('#editviewPoint').modal('hide');
            showMessage("Success", "Viewpoint name updated successfully.",1,"msgDiv");
        } else if (status == 3) {
            $('#editviewPoint').modal('hide');
            showMessage("Error", "Unable to update viewpoint.",2,"msgDiv");
        } else {
            showMessage("Warning", "The viewpoint name already exists",3,"editVpMsg");
            return false;
        }
        loadInitialData();
    });
}

//Delete ViewPoint popup
function fnDeleteViewPoint(vpName, vpCode) {
    alert("dffsdf")
    $('#vp_id').val(vpCode);
    $('#vp_name').val(vpName);
    $('#divDeleteGrp').modal('show')
}

// Delete VP
function fnDeleteVP() {
    loadKMask();
    var ReqData = new Object();
    ReqData.VP_ID = $("#vp_id").val();
    ReqData.VP_NAME = $("#vp_name").val();
    ReqData.UniqueKey = parent.generateTocken();
    var ajaxObj = new JQueryAjaxCall();
    ajaxObj.addData('deleteViewPoint.action', ReqData, true);
    ajaxObj.submit(function (res) {
        loadKUnMask();
        if (res == null) {
            return;
        }
        var status = res.data;
        if (status == 1) {
            showMessage("Success", "Viewpoint name deleted successfully.",1,"msgDiv");
        } else if (status == 2) {
            showMessage("Error", "Unable to delete viewpoint.",2,"msgDiv");
        }
        loadInitialData();
    });
}