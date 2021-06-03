
$(document).ready(function () {
    $('#addPhone').on('shown.bs.modal', function () {

        $(document).off('focusin.modal');
    })  
     $('#addServiceNumbers').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    })  
    //displaying records in grid
});
    //displaying records in grid
    accounts_grid = $("#accountNumbers").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        height:370,
//        pageable: {
//                input: true,
//                numeric: false
//            },
        //groupable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        dataBound: permit_gridDataBound,
        pageable: true,
        columns: [
        {
            width: 50,
            menu : false,
            title: "<span class='k-checkbox cc-headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='checkAll'></span>",
            template: $("#checkbox_template1").html()

            }, {
                field: "SUBSCRIBER_ID",
                title: "Account number",
                template: '<span style="cursor:default" title="#=SUBSCRIBER_ID#">#=SUBSCRIBER_ID#</span>',
                encoded: false,
                width: 300,
                attribute: {
                    style: "text-align:center"
                }
            }, {
                field: "ACCOUNTNAME",
                title: "Account name",
                //  template: '<span style="cursor:default" title="#=SUBSCRIBER_NAME#">#=SUBSCRIBER_NAME#</span>',
                width: 190
            }
//        ,  {
//            field: "ACCOUNT_NO",
//            title: "Account number",
//            template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
//            width: 190
//        }
        ]
    }).data('kendoGrid');
    accounts_grid.table.on("click", ".checkbox1", selectRow);
    service_grid = $("#serviceNumbers").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        height:'370px !important',
//        pageable: {
//                input: true,
//                numeric: false
//            },
        //groupable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        dataBound: permit_gridDataBoundService,
        pageable: true,
        columns: [
        {
            width: 50,
            menu : false,
            title: "<span class='k-checkbox cc-headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='checkAllService'></span>",
            template: $("#checkbox_templateservice").html()
            }, 
            {
                field: "SERVICENUMBERS",
                title: "Telephone number",
                template: '<span style="cursor:default" title="#=SERVICENUMBERS#">#=SERVICENUMBERS#</span>',
                encoded: false,
                width: 300,
                attribute: {
                    style: "text-align:center"
                }
            }, 
            {
                field: "CTN_NAME",
                title: "Telephone name",
               
                width: 190
            }, {
                field: "ACCOUNTNUMBER",
                title: "Account number",
              
                width: 190
            }
            , {
                field: "OWNER_BAN_NAME",
                title: "Account name",
         
                encoded: false,
                width: 300,
                attribute: {
                    style: "text-align:center"
                }
            }
//        ,  {
//            field: "ACCOUNT_NO",
//            title: "Account number",
//            template: '<span style="cursor:default" title="#=ACCOUNT_NO#">#=ACCOUNT_NO#</span>',
//            width: 190
//        }
        ]
    }).data('kendoGrid');
    service_grid.table.on("click", ".checkbox1", selectRowServiceNumbers);

//testing checkboxes and changing checkAll checkbox
function test_pagechange(e) {
    var count = 0;
    var view = e;
    for (var k = 0; k < view.length; k++) {
        for (var i = 0; i < checkedIds.length; i++) {
            if (checkedIds[i].SUBSCRIBER_ID == view[k].SUBSCRIBER_ID) {
                $("#" + view[k].SUBSCRIBER_ID).prop('checked', true);
                count++;
                continue;
            }
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
function test_pagechangeservice(e) {
    var count = 0;
    var view = e;
    for (var k = 0; k < view.length; k++) {
        for (var i = 0; i < checkedIdsService.length; i++) {
            if (checkedIdsService[i].SERVICENUMBERS == view[k].SERVICENUMBERS) {
                $("#" + view[k].SERVICENUMBERS).prop('checked', true);
                count++;
                continue;
            }
        }
    }
    if (count == view.length) {
        $("#checkAllService").prop('checked', true);
    } else {
        $("#checkAllService").prop('checked', false);
    }
    if (view.length == 0) {
        $("#checkAllService").prop('checked', false);
    }
}

$(document).ready(function () {
//selectAll checkbox on click event
    $("#checkAll").change(function () {
        var strGridData = JSON.stringify(accounts_grid._data);
        var objGridData = JSON.parse(strGridData);

        if (this.checked) {
            for (var idx = 0; idx < objGridData.length; idx++)
            {
                var dataItem = accounts_grid.dataSource.view()[idx];
                var index = getIndexforAccounts(checkedIds, dataItem);
                if (index == -1) {
                    checkedIds.push(objGridData[idx]);
                }
                $("#" + objGridData[idx].SUBSCRIBER_ID).prop('checked', true);
            }

        }
        else {
            for (var idx = 0; idx < objGridData.length; idx++)
            {
                var dataItem1 = accounts_grid.dataSource.view()[idx];
                var index1 = getIndexforAccounts(checkedIds, dataItem1);
                if (index1 != -1) {
                    checkedIds.splice(index1, 1);

                }
                $("#" + objGridData[idx].SUBSCRIBER_ID).prop('checked', false);
            }
        }
    });
    $("#checkAllService").change(function () {
        var strGridData = JSON.stringify(service_grid._data);
        var objGridData = JSON.parse(strGridData);
        if (this.checked) {
            for (var idx = 0; idx < objGridData.length; idx++)
            {
                var dataItem = service_grid.dataSource.view()[idx];
                var index = getIndexforAccountsService(checkedIdsService, dataItem);
                if (index == -1) {
                    checkedIdsService.push(objGridData[idx]);
                }
                $("#" + objGridData[idx].SERVICENUMBERS).prop('checked', true);
            }
        }
        else {
            for (var idx = 0; idx < objGridData.length; idx++)
            {
                var dataItem1 = service_grid.dataSource.view()[idx];
                var index1 = getIndexforAccountsService(checkedIdsService, dataItem1);
                if (index1 != -1) {
                    checkedIdsService.splice(index1, 1);
                }
                $("#" + objGridData[idx].SERVICENUMBERS).prop('checked', false);
            }
        }
    });

});

//on databound checking for available records
function permit_gridDataBound(arg) {
    kendo.ui.progress($("#accountNumbers>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#accountNumbers").find('.k-grid-header colgroup > col').length;
        $("#accountNumbers").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }

    test_pagechange(arg.sender._data);
}
function permit_gridDataBoundService(arg) {
    kendo.ui.progress($("#serviceNumbers>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#serviceNumbers").find('.k-grid-header colgroup > col').length;
        $("#serviceNumbers").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechangeservice(arg.sender._data);
}

//Search criteria function  for accounts
function serachAccounts() {
    var selecteditem = $('#serviceNumber').val();
    var kgrid = accounts_grid
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
                            field: "SUBSCRIBER_ID",
                            operator: "contains",
                            value: v1
                        },
                        {
                            field: "SUBSCRIBER_ID",
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
//    var  ACCOUNT_NO =$('#accNo').val();
//    var SUBSCRIBER_NAME=$('#serviceName').val();
//
//    if(ACCOUNT_NO!=null && ACCOUNT_NO!='')
//        reqData.ACCOUNT_NO=ACCOUNT_NO;
//    if(SUBSCRIBER_ID!=null && SUBSCRIBER_ID!='' )
//        reqData.SUBSCRIBER_ID=SUBSCRIBER_ID;
//    if(SUBSCRIBER_NAME !=null && SUBSCRIBER_NAME!='')
//        reqData.SUBSCRIBER_NAME=SUBSCRIBER_NAME;
//    if(ACCOUNT_NO=='' &&  SUBSCRIBER_ID=='' && SUBSCRIBER_NAME=='' ){
//     
//        showMessage("Wrong", "Please enter service number or account number or service name", 3,"accAlrt");
//        return;
//    }
//    reqData.CC_PARENT=nodeObj.CC_ID;
//    reqData.CUSTOMER_ID=custID;
//    
//    procesRequest("fetchPhoneNumbersAction",reqData,fnCallbackfnExternalUsersAccFetchSucc,fnCallbackfnExternalUsersAccFetchFail);
//    displayLoading("#accountNumbers>div.k-grid-content");
}
function serachService() {
    var selecteditem = $('#serviceNumberId').val();
    var kgrid = service_grid
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
                            field: "SERVICENUMBERS",
                            operator: "contains",
                            value: v1
                        },
                        {
                            field: "SERVICENUMBERS",
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
//    var  ACCOUNT_NO =$('#accNo').val();
//    var SUBSCRIBER_NAME=$('#serviceName').val();
//
//    if(ACCOUNT_NO!=null && ACCOUNT_NO!='')
//        reqData.ACCOUNT_NO=ACCOUNT_NO;
//    if(SUBSCRIBER_ID!=null && SUBSCRIBER_ID!='' )
//        reqData.SUBSCRIBER_ID=SUBSCRIBER_ID;
//    if(SUBSCRIBER_NAME !=null && SUBSCRIBER_NAME!='')
//        reqData.SUBSCRIBER_NAME=SUBSCRIBER_NAME;
//    if(ACCOUNT_NO=='' &&  SUBSCRIBER_ID=='' && SUBSCRIBER_NAME=='' ){
//     
//        showMessage("Wrong", "Please enter service number or account number or service name", 3,"accAlrt");
//        return;
//    }
//    reqData.CC_PARENT=nodeObj.CC_ID;
//    reqData.CUSTOMER_ID=custID;
//    
//    procesRequest("fetchPhoneNumbersAction",reqData,fnCallbackfnExternalUsersAccFetchSucc,fnCallbackfnExternalUsersAccFetchFail);
//    displayLoading("#accountNumbers>div.k-grid-content");
}
//search fn success
function fnCallbackfnExternalUsersAccFetchSuccService(res) {
    var result1 = JSON.parse(res);
    var accountsData = result1.objCRSResponse.data;
    service_grid.dataSource.data("");
    service_grid.setDataSource(new kendo.data.DataSource({
        data: accountsData,
        pageSize: 10
    }));
}
function fnCallbackfnExternalUsersAccFetchSucc(res) {
    var result1 = JSON.parse(res);

    var accountsData = result1.objCRSResponse.data;


    accounts_grid.dataSource.data("");

    accounts_grid.setDataSource(new kendo.data.DataSource({
        data: accountsData,
        pageSize: 10
    }));

}
//search function failure
function fnCallbackfnExternalUsersAccFetchFail() {
    showMessage("Error", "Unable to fetch user details.", 2);
}



//on click of the checkbox:
function selectRow() {
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = accounts_grid.dataItem(row);
    if (checked) {
        var index = getIndexforAccounts(checkedIds, dataItem);
        if (index == -1) {
            checkedIds.push(dataItem);

        }

    } else {
        var index1 = getIndexforAccounts(checkedIds, dataItem);

        if (index1 != -1) {
            checkedIds.splice(index1, 1);

        }
    }

    var strGridData = JSON.stringify(accounts_grid._data);
    var objGridData = JSON.parse(strGridData);
    var count = 0;

    for (var k = 0; k < objGridData.length; k++) {
        for (var i = 0; i < checkedIds.length; i++) {
            if (checkedIds[i].SUBSCRIBER_ID == objGridData[k].SUBSCRIBER_ID) {
                $("#" + objGridData[k].SUBSCRIBER_ID).prop('checked', true);
                count++;
                continue;
            }
        }

    }
    if (count == objGridData.length) {
        $("#checkAll").prop('checked', true);
    } else {
        $("#checkAll").prop('checked', false);
    }
    if (objGridData.length == 0) {
        $("#checkAll").prop('checked', false);
    }

}
function selectRowServiceNumbers() {
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = service_grid.dataItem(row);
    if (checked) {
        var index = getIndexforAccountsService(checkedIdsService, dataItem);
        if (index == -1) {
            checkedIdsService.push(dataItem);
        }
    } else {
        var index1 = getIndexforAccountsService(checkedIdsService, dataItem);
        if (index1 != -1) {
            checkedIdsService.splice(index1, 1);
        }
    }
    var strGridData = JSON.stringify(service_grid._data);
    var objGridData = JSON.parse(strGridData);
    var count = 0;
    for (var k = 0; k < objGridData.length; k++) {
        for (var i = 0; i < checkedIdsService.length; i++) {
            if (checkedIdsService[i].SERVICENUMBERS == objGridData[k].SERVICENUMBERS) {
                $("#" + objGridData[k].SERVICENUMBERS).prop('checked', true);
                count++;
                continue;
            }
        }
    }
    if (count == objGridData.length) {
        $("#checkAllService").prop('checked', true);
    } else {
        $("#checkAllService").prop('checked', false);
    }
    if (objGridData.length == 0) {
        $("#checkAllService").prop('checked', false);
    }
}

//clear button click
function clearAccounts() {
    $("#serviceNumber").val("");
    $("#serviceName").val("");
    checkedIds = [];
    $("#accNo").val("");
    displayLoading("#accountNumbers>div.k-grid-content");

    accounts_grid.setDataSource(new kendo.data.DataSource({
        data: accountsData,
        pageSize: 10
    }));
    accounts_grid.refresh();
}
//closing modal
function closeModal() {
    checkedIds = [];
    $("#addPhone").modal('hide');
    loadKUnMask();
}
function closeModalService() {
    checkedIdsService = [];
    $("#addServiceNumbers").modal('hide');
    loadKUnMask();
}
function getIndexforAccounts(checkedId, dataitem) {

    for (var i = 0; i < checkedId.length; i++) {

        if (checkedId[i].SUBSCRIBER_ID == dataitem.SUBSCRIBER_ID) {
            return i;
        }
    }
    return -1;
}
function getIndexforAccountsService(checkedId, dataitem) {
    for (var i = 0; i < checkedId.length; i++) {
        if (checkedId[i].SERVICENUMBERS == dataitem.SERVICENUMBERS) {
            return i;
        }
    }
    return -1;
}