/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var global_accountNo;
var global_Account_combo = [];
var accountCheck = [];
var accountNo;
var paymentHistoryGrid;
var charges_detail_grid;
var global_subscriberID;
var global_chargeTypeID;
var global_serviceID;

function initBillView()
{
//    loadServiceData1()
    loadAccounts(1)
    //loadAccountsForMobile();
//    loadAccountListForMobile();

    $("#bill_summary_month_combo_id").on("change", function () {
//        alert("coming change");
        loadServiceData1();
        loadAccounts(1);
    })
//    $("#account_grid_month_combo_id").on("change", function () {
//        loadAccountsBySelectedMonth();
//    })
//    $("#subscriber_grid_month_combo_id").on("change",function(){
//        loadSubscriberDetailBySelectedMonth();
//    })
//      $("#Bill_grid_month_combo_id").on("change", function () {
//        loadBillSummaryDetailBySelectedMaonth();
//    })
//    
//       $("#call_details_grid_month_combo_id").on("change", function () {
//        loadCallDetailBySelectedMonth();
//    })


    $("#account_combobox_id_new").kendoDropDownList({
        dataSource: global_Account_combo,
        dataTextField: "name",
        dataValueField: "name",
        // change: onChange,
        template: "<li class='act' ><div class='left'><input name='billview' id='#:name#' type='checkbox' onClick='onAccountcheckBox(this)'  class='chkBoxCls' value='#:name#'><label class='textoverflowec' id='#:name#' title='#:name#'>#:name#</label></div> <div class='right'></div></li>"


    });


    paymentHistoryGrid = $("#paymentHistoryGrid").kendoGrid({
        height: 440,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        dataBound: permissiongridDataBound,
        pageable: {
            pageSize: 10
        },
        columns: [{
                field: "INVOICE_NUMBER",
                title: "Invoice Number",
                //                template: '<a style="cursor:default" title="#=ACCOUNTS#" data-toggle="modal" data-dismiss="modal" data-target="\\\\#divAccount"  onclick="loadAccountsDetails(\'#=ACCOUNTS#\')" >#=ACCOUNTS#</a>',
                encoded: false,
                width: 150
            },
            {
                field: "PAY_ID",
                title: "PAY_ID",
                hidden: true,
                width: 150
            },
            {
                field: "PAYMENT_AMOUNT",
                title: "Payment Amount",
                width: 150
            }, {
                field: "PAYMENT_DATE",
                title: "Payment Date",
                width: 150
            }, {
                field: "BAN",
                title: "BAN",
                width: 150
            }

        ]
    }).data("kendoGrid");

}
function redirectPage()
{
    initBillView();
}
var accountCheck11 = [];
function onAccountcheckBox(obj)
{
    var value = obj.checked;
    var accountNO = $(obj).val();
    var reqData = {};

    if (value == true) {
        if (accountNO == "All") {
            accountCheck = [];
            // $("#account_combobox_id_new").data("kendoDropDownList").dataSource.options.data

            var dropdownlist = $("#account_combobox_id_new").data("kendoDropDownList");
            var dataItem = dropdownlist.dataSource.options.data;

            for (var i = 0; i < dataItem.length; i++)
            {
                if (i != 0)
                {
                    $("#" + dataItem[i].name).prop('checked', false);
                    accountCheck11.push(dataItem[i].name);
                }
            }
            accountCheck = accountCheck11;

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
    reqData.accountCheck = accountCheck;
    procesRequest("bill_summary_month_combo_id.action", reqData, loadDataInPaymentHistoryGrid, fnCallbackFetchUsersFail, false);

}



function loadAccountsForMobile() {
    var reqData = {};
    reqData.serviceID = 1;
    reqData.selMonth = $("#bill_summary_month_combo_id").val();
    procesRequest("fetchAccountsByService.action", reqData, fnCallbackloadAccountsForMobile, fnCallbackFetchUsersFail, false);
}

function loadAccountsBySelectedMonth() {
    var reqData = {};
    reqData.serviceID = 1;
    reqData.selMonth = $("#bill_summary_month_combo_id").val();

    procesRequest("fetchAccountsByService.action", reqData, fnCallbackfetchAccountByServiceSucc, fnCallbackFetchUsersFail, false);

}
function loadSubscriberDetailBySelectedMonth() {
    var selMonth = $("#bill_summary_month_combo_id").val();
    var reqData = {};
    reqData.accountID = global_accountNo;
    reqData.selMonth = selMonth;
//    $("#bill_summary_month_combo_id").val(selMonth);
    procesRequest("fetchAccountDetailsByAccountNo.action", reqData, fnCallBackFetchAccountDetails, fnCallbackFetchUsersFail);
}

function loadBillSummaryDetailBySelectedMaonth() {
    var selMonth = $("#bill_summary_month_combo_id").val();
    var reqData = {};
    reqData.MSISDN = global_subscriberID;
    reqData.selMonth = selMonth;
    reqData.accountNo = global_accountNo;
    procesRequest("fetchSubscriberSummaryBySubscriberNo.action", reqData, fnCallBackFetchSubscriberDetails, fnCallbackFetchUsersFail);
}

function loadCallDetailBySelectedMonth() {
    var selMonth = $("#bill_summary_month_combo_id").val();
    var reqData = {};
    reqData.accountID = global_accountNo;
    reqData.selMonth = selMonth;
    reqData.subscriberID = global_subscriberID;
    reqData.chargeTypeID = global_chargeTypeID;
//    $("#bill_summary_month_combo_id").val(selMonth);
    procesRequest("fetchSubsChargesDetailByChargeType.action", reqData, fnCallBackFetchSubscriberChargeDetails, fnCallbackFetchUsersFail);
}

function loadAccountListForMobile() {
    var reqData = {};
    reqData.serviceID = 1;
    procesRequest("fetchAccountListByService.action", reqData, fnCallbackloadAccountListForMobile, fnCallbackFetchUsersFail, true);
}
function fnCallbackloadAccountListForMobile(response) {
    loadAccountsInCombo(response);
}

function fnCallbackloadAccountsForMobile(globalAccountResponseForMobile) {
    loadAccountDetailForUploadPayment(globalAccountResponseForMobile);
//    loadAccountsInComboForPayPopup(globalAccountResponseForMobile);
}


//fetchUsersPermissionAction success::USER-GRID DATA LOADING FUNCTION
function fnCallbackLoadServices(response)
{
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var serviceData = result.objCRSResponse.data.SERVICE_DATA;
        // alert("data :"+response);
        var totalDue = 0;
//        for (var index = 0; serviceData.length > index; index++) {
//            totalDue = totalDue + parseFloat(serviceData[index].DUE);
//        }
        for (var index = 0; serviceData.length > index; index++) {
            totalDue = totalDue + parseFloat(serviceData[index].TOTAL_DUE);
        }
        $("#total_amount_due_span").text("$" + totalDue);

        $("#service_loaded_date_id").text(serviceData[0].INVOICE_DATE);
        sevices_grid.setDataSource(new kendo.data.DataSource({
            data: serviceData,
            pageSize: 10
        }));
        if (totalDue == 0) {
            var dataSource = $('#sevices_grid').data("kendoGrid").dataSource;
            dataSource.data([]);
        }
        //$("#service_combobox_id").change();
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
//fetchUsersPermissionAction failure :::USER-GRID DATA LOADING FAILURE FUNCTION
function fnCallbackFetchUsersFail()
{
    alert("Error came");
    showMessage("Error", "Unable to fetch user details.", 2);
}
var sevices_grid = "";
////GRID CREATION
//function loadServiceData() {
//    // $("#service_combobox_of_upload_payment").change();
//
//    loadKUnMask();
//    sevices_grid = $("#sevices_grid").kendoGrid({
//        height: 440,
//        sortable: true,
//        reorderable: true,
//        resizable: true,
//        filterable: true,
//        columnMenu: true,
//        dataBound: permissiongridDataBound,
//        pageable: {
//            pageSize: 10
//        },
//        columns: [{
//                field: "SERVICE_ID",
//                hidden: true,
//                width: 190
//            }, {
//                field: "SERVICE_NAME",
//                title: "Services",
//                template: '<a style="cursor:default" title="#=SERVICE_NAME#" data-toggle="modal" data-target="\\\\#divAccountsList"  onclick="loadAccounts(\'#=SERVICE_ID#\')" >#=SERVICE_NAME#</a>',
//                width: 190
//            }, {
//                field: "TOTAL_DUE",
//                title: "Amount Due",
//                template: '<span style="cursor:default" title="#=TOTAL_DUE#" >#=TOTAL_DUE#</span>',
//                
//                width: 190
//            }, {
//                title: 'Actions',
//                headerAttributes: {
//                    style: "padding-left:17px"
//                },
////                template: $("#permission_icon_template").html(),
//                template: ' <a class="primarybt" title="View"  data-toggle="modal" data-target="\\\\#divPayment" onclick="selectServiceOnViewPopup(\'#=SERVICE_ID#\');gotoBillPayment(\'#=SERVICE_NAME#\',\'#=TOTAL_DUE#\');">Pay Now</a>',
//                menu: false,
//                width: 190
//            }
//        ]
//    }).data("kendoGrid");
//
//    var reqData = {};
//    var selMonth = $("#bill_summary_month_combo_id").val();
//
//    reqData.selMonth = selMonth;
////    procesRequest("fetchServices.action", reqData, fnCallbackLoadServices, fnCallbackFetchUsersFail, true);
//    procesRequest("fetchBillviewServiceDetails.action", reqData, fnCallbackLoadServices, fnCallbackFetchUsersFail, true);
////    displayLoading("#sevices_grid>div.k-grid-content");
//    // loadAccounts();
//
//
//}
function loadServiceData1() {
    // $("#service_combobox_of_upload_payment").change();
    var reqData = {};
    var selMonth = $("#bill_summary_month_combo_id").val();

    reqData.selMonth = selMonth;
//    procesRequest("fetchServices.action", reqData, fnCallbackLoadServices, fnCallbackFetchUsersFail, true);
    procesRequest("fetchAccountsByService.action", reqData, fnCallbackLoadServices, fnCallbackFetchUsersFail, false);
//    displayLoading("#sevices_grid>div.k-grid-content");
    // loadAccounts();


}

function selectServiceOnViewPopup(serviceID) {
    $('#service_cobobox_pay_now_popup_id').val(serviceID);
    $('#service_cobobox_pay_now_popup_id').change();
}
//on databound checking for available records
function permissiongridDataBound(arg) {
////    kendo.ui.progress($("#sevices_grid1>div.k-grid-content"), false);
//    kendo.ui.progress($("#sevices_grid>div.k-grid-content"), false);
//    if (arg.sender._data.length == 0) {
//        var colCount = $("#sevices_grid").find('.k-grid-header colgroup > col').length;
//        $("#sevices_grid").find('.k-grid-content tbody')
//                .append('<tr class="kendo-data-row"><td colspan="' +
//                        colCount +
//                        '" style="text-align:center"><b>No records found</b></td></tr>');
//    }
}





function fnCallbackfetchUsersFail()
{
    showMessage("Error", "Unable to fetch user details.", 2);
}




//searchUsersAction failure function 
function fnCallbackSearchUsersFail() {
    showMessage("Error", "Unable to fetch user details.", 2);
}

var account_grid;
function loadAccounts(serviceID) {
   
    loadKUnMask();
    global_serviceID = serviceID;
    account_grid = $("#account_grid").kendoGrid({
        height: 440,
	dataSource: {
            data: [],
            pageSize: 10
        },
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        dataBound: permissiongridDataBound,
        pageable: {
            pageSize: 10
        },
        columns: [{
                field: "ACCOUNT_NO",
                title: "Accounts",
                template: '<a style="cursor:default" title="#=ACCOUNT_NO#" data-toggle="modal" data-dismiss="modal" data-target="\\\\#divAccount"  onclick="loadAccountsDetails(\'#=ACCOUNT_NO#\',this)" >#=ACCOUNT_NO#</a>',
//                    encoded: false,
                width: 150
            }, {
                field: "BILL_NO",
                title: "Invoice No.",
                width: 150
            }, {
                field: "BILL_DATE",
                title: "Invoice Date",
                width: 150
            }, {
                field: "DUE_DATE",
                title: "Due Date",
                width: 150
            },
            {
                field: "SERVICE_TYPE",
                title: "Service Type",
                width: 150
            },
            {
                field: "TOTAL_DUE",
                title: "Total Due",
                width: 150,
               // type: "number",
                template: '#= kendo.format("{0:c3}",TOTAL_DUE) #'
                
            }
//            , {
//                field: "Action",
//                title: "View Bill",
//                width: 150,
//                encoded: false,
//                attributes: {
//                    "class": "action"
//                }
//                //width: 180,
//            }
        ]
    }).data("kendoGrid");
//    displayLoading("#sevices_grid>div.k-grid-content");

    var selMonth = $("#bill_summary_month_combo_id").val();
    var reqData = {};
    reqData.serviceID = serviceID;
    reqData.selMonth = selMonth;
//    $("#account_grid_month_combo_id").val(selMonth);
    procesRequest("fetchAccountsByService.action", reqData, fnCallbackfetchAccountByServiceSucc, fnCallbackFetchUsersFail, false);

}
function fnCallbackfetchAccountByServiceSucc(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var sData = result.objCRSResponse.data.ACCOUNT_LIST;
//        alert("data :" + JSON.stringify(sData));
        $("#BillViewTotalNoRecodId").text(sData.length);
        if (sData.length != 0) {
            account_grid.setDataSource(new kendo.data.DataSource({
                data: sData,
                pageSize: 10
            }));
        } else {
            showMessage("Success", "No Record Found", 1);
        }

    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}

var account_item_grid;
function loadAccountsDetails(accountNO, rowdata) {
    checkedRows = [];
    $("#account_item_grid").html("");
    $("#account_item_vns_grid").html("");
    $("#div_account_detail_header_text_id").html("Bill View For Account No :" + accountNO);
    $("#div_account_detail_header_text_id").attr("account_no", accountNO);
    $("#div_account_detail_path_breadcrumb_id").html('<a href="#"  data-dismiss="modal"  data-toggle="modal">' + accountNO + '</a>  ');
    var row = $(rowdata).closest("tr");
    var dataItem = account_grid.dataItem(row);
    loadKUnMask();
    var serviceid;
    if (dataItem.SERVICE_TYPE.toLowerCase() == "fixed line") {
        serviceid = "1";
    } else if (dataItem.SERVICE_TYPE.toLowerCase() == "mobile") {
        serviceid = "2";
    } else {
        serviceid = "3";
    }

//        displayLoading("#sevices_grid>div.k-grid-content");
    if ((dataItem.SERVICE_TYPE.toLowerCase() == "fixed line") || (dataItem.SERVICE_TYPE.toLowerCase() == "mobile")) {
        $("#account_item_vns_grid").hide();
        $("#account_item_grid").show();
        account_item_grid = "";
        account_item_grid = $("#account_item_grid").kendoGrid({
            height: 300,
            sortable: true,
            reorderable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            dataBound: permit_gridDataBound,
            pageable: {
                pageSize: 5
            },
            columns: [
//                {
//                    headerTemplate: "<p class='k-checkbox' role='presentation' style='margin-left:9px'><input type='checkbox' id='conCheckAll'> </span>",
//                    template: "<span class='k-checkbox' role='presentation'><input type='checkbox' class='checkbox1' id='#:MOBILE_NO#' /><label></label></span>",
//                    menu: false,
//                    width: 55
//                },

                {
                    template: $("#account_item_grid_checkbox").html(),
                    title: '',
                    headerTemplate: "<p class='k-checkbox' role='presentation' style='margin-left:10px'><input type='checkbox' id='checkAll' class='checkbox1' onclick='selectAll(this)'></p>",
                    width: '55'
                },
                {
                    field: "MOBILE_NO",
                    title: "Service No",
                    template: "<a style='cursor:default' title='#=MOBILE_NO#' data-dismiss='modal' data-toggle='modal' data-target='\\\\#divSubscriber'  onclick='loadSubscriberBillSummary(\"#=MOBILE_NO#\"," + serviceid + "," + accountNO + ")'>#=MOBILE_NO#</a>",
//                    encoded: false,
                    width: 150
                },
//            {
//                field: "MONTHLY_CHARGE",
//                title: "Monthly Charge",
//                width: 140
//            },
                {
                    field: "LOCAL_CHARGE",
                    title: "Local Charge",
                    width: 150
                }, {
                    field: "INTERNATIONAL_CHARGE",
                    title: "International Charge",
                    headerTemplate: '<span title="International Charge">International Charge</span>',
                    width: 150
                }, {
                    field: "ROAMING_CHARGE",
                    title: "Roaming Charge",
                     headerTemplate: '<span title="Roaming Charge">Roaming Charge</span>',
                    width: 150
                }, {
                    field: "DATA_CHARGE",
                    title: "Data Charge ",
                    width: 150
                },
//            {
//                field: "OTHER_CHARGE",
//                title: "Other charge",
//                width: 150
//            }, 
                {
                    field: "TOTAL_CURRENT_CHARGE",
                    title: "Total Current Charge",
                     headerTemplate: '<span title="Total Current Charge">Total Current Charge</span>',
                    width: 150
                }
//                , {
//                    field: "Action",
//                    title: "View Bill",
//                    width: 150,
//                    encoded: false,
//                    attributes: {
//                        "class": "action"
//                    },
//                    //width: 180,
//                }
            ]
        }).data("kendoGrid");
//        account_item_grid.table.on("click", ".checkbox1", onAllAccGridRowSelect);
        $("#checkAll").closest("th").css({"padding-bottom": "1.5"});
        $("#account_item_grid").kendoTooltip({
            filter: ".k-header span"
        });
    } else {
        $("#account_item_grid").hide();
        $("#account_item_vns_grid").show();
        account_item_grid = "";
        account_item_grid = $("#account_item_vns_grid").kendoGrid({
            height: 300,
            sortable: true,
            reorderable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            dataBound: permissiongridDataBound,
            pageable: {
                pageSize: 5
            },
            columns: [
                {
                    template: $("#account_item_grid_checkbox").html(),
                    title: '',
                    headerTemplate: "<p class='k-checkbox' role='presentation' style='margin-left:10px'><input type='checkbox' id='checkAll' class='checkbox1' onclick='selectAll(this)'></p>",
                    width: '55'
                }, {
                    field: "MOBILE_NO",
                    title: "Service No",
                    template: "<a style='cursor:default' title='#=MOBILE_NO#' data-dismiss='modal' data-toggle='modal' data-target='\\\\#divSubscriber'  onclick='loadSubscriberBillSummary(\"#=MOBILE_NO#\"," + serviceid + "," + accountNO + ")'>#=MOBILE_NO#</a>",
//                    encoded: false,
                    width: 150
                },
//            {
//                field: "MONTHLY_CHARGE",
//                title: "Monthly Charge",
//                width: 140
//            },
                {
                    field: "ON_NET_NATIONAL",
                    title: "On Net National",
                    headerTemplate: '<span title="On Net National">On Net National</span>',
                    width: 150
                }, {
                    field: "OFF_NET_NATIONAL",
                    title: "Off Net National",
                    headerTemplate: '<span title="Off Net National">Off Net National</span>',
                    width: 150
                }, {
                    field: "ON_NET_INTERNATIONAL",
                    title: "On Net International",
                    headerTemplate: '<span title="On Net International">On Net International</span>',
                    width: 150
                }, {
                    field: "OFF_NET_INTERNATIONAL",
                    title: "Off Net International",
                    headerTemplate: '<span title="Off Net International">Off Net International</span>',
                    width: 150
                },
//            {
//                field: "OTHER_CHARGE",
//                title: "Other charge",
//                width: 150
//            }, 
                {
                    field: "TOTAL_CURRENT_CHARGE",
                    title: "Total Current Charge",
                    headerTemplate: '<span title="Total Current Charge">Total Current Charge</span>',
                    width: 150
                }
//                , {
//                    field: "Action",
//                    title: "View Bill",
//                    width: 150,
//                    encoded: false,
//                    attributes: {
//                        "class": "action"
//                    },
//                    //width: 180,
//                }
            ]
        }).data("kendoGrid");
        $("#checkAll").closest("th").css({"padding-bottom": "1.5"});
        $("#account_item_vns_grid").kendoTooltip({
            filter: ".k-header span"
        });
    }

    var selMonth = $("#bill_summary_month_combo_id").val();
    var reqData = {};
    global_accountNo = accountNO;
    reqData.accountID = accountNO;
    reqData.selMonth = selMonth;
    $('#disputebill').attr('data-actnum', accountNO);
    $('#disputebill').attr('data-invnum', dataItem.BILL_NO);
//    reqData.serviceID = global_serviceID;
    if (dataItem.SERVICE_TYPE.toLowerCase() == "fixed line") {
        reqData.serviceID = "1";
        global_serviceID = "1";
    } else if (dataItem.SERVICE_TYPE.toLowerCase() == "mobile") {
        reqData.serviceID = "2";
        global_serviceID = "2";
    } else {
        reqData.serviceID = "3";
        global_serviceID = "3";
    }
//    $("#subscriber_grid_month_combo_id").val(selMonth);
    procesRequest("fetchAccountDetailsByAccountNo.action", reqData, fnCallBackFetchAccountDetails, fnCallbackFetchAccountFail, false);
}

function renderAmount(){
    var reqData={};
    procesRequest("fetchrenderAmount.action", reqData, fnrenderAmount, fnrenderAmountFail, false);
}

function fnrenderAmount(res){
   // alert(JSON.stringify(res))
    var result = JSON.parse(res);
    var resultdata=result.objCRSResponse.data;
    //alert(JSON.stringify(resultdata[0]))
   var amountdata= resultdata[0];
   var x=amountdata.TOTAL_DUE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   $("#total_amount_due_span").text("$ "+x);
   $("#service_loaded_date_id").text(amountdata.MONTH);
    
}
function fnrenderAmountFail(){
    alert("fail")
}

function fnCallbackFetchAccountFail() {
    showMessage("Error", "Unable to fetch account details.", 2);
}
function fnCallBackFetchAccountDetails(response) {
    var result = JSON.parse(response);
    var status = result.objCRSResponse.status;
    if (status == 'success' || status == true) {
        var accountData = result.objCRSResponse.data;
//        alert("data :" + accountData.toSource());
        account_item_grid.setDataSource(new kendo.data.DataSource({
            data: accountData.ITEM_DATA,
            pageSize: 10
        }));

        //print account summary
        var summaryData = accountData.ACCOUNT_SUMMARY;
        $("#account_summary_table_body").html("<tr></tr> ");
        //if (summaryData.length > 0) {
        var summaryBodyHtml = '<tr><td>' + summaryData.LAST_BILL_AMOUNT + '</td><td> ' + summaryData.ADJUSTMENTS + '</td><td> ' + summaryData.PAYMENTS + '</td><td> ' + summaryData.BILL_AMOUNT + '</td> <td> ' + summaryData.TOTAL_DUE + '</td></tr>';
        $("#account_summary_table_body").html(summaryBodyHtml);
        // }
    } else {
        showMessage("Error", "Unable to fetch account details else.", 2);
    }

}


function loadSubscriberBillSummary(mobileNo, serviceid, accountNo) {
    $("#div_subscriber_detail_header_text_id").html("Bill View For Subscriber No :" + mobileNo);
    var accountNo = $("#div_account_detail_header_text_id").attr("account_no");
    var subsBillSmryPath = '<a href="#"  data-dismiss="modal"  data-toggle="modal" data-target="#divAccount">' + accountNo + '</a> ' + mobileNo;

    $("#div_subscriber_detail_path_breadcrumb_id").html(subsBillSmryPath);
    var reqData = {};
    global_subscriberID = mobileNo;
    var selMonth = $("#bill_summary_month_combo_id").val();
    reqData.MSISDN = mobileNo;
    reqData.selMonth = selMonth;
    reqData.serviceid = serviceid;
    reqData.accountNo = accountNo;
    global_serviceID = serviceid;
//    $("#Bill_grid_month_combo_id").val(selMonth);
    procesRequest("fetchSubscriberSummaryBySubscriberNo.action", reqData, fnCallBackFetchSubscriberDetails, fnCallBackFetchSubscriberDetailsFail, false);
}

function loadSubscriberBillSummary1(mobileNo, serviceid, accountNo) {
    $("#div_subscriber_detail_header_text_id").html("Bill View For Subscriber No :" + mobileNo);
    var accountNo = $("#div_account_detail_header_text_id").attr("account_no");
    var subsBillSmryPath = '<a href="#"  data-dismiss="modal"  data-toggle="modal" data-target="#divAccount">' + accountNo + '</a> ' + mobileNo;

    $("#div_subscriber_detail_path_breadcrumb_id").html(subsBillSmryPath);
    var reqData = {};
    global_subscriberID = mobileNo;
    var selMonth = $("#bill_summary_month_combo_id").val();
    reqData.MSISDN = mobileNo;
    reqData.selMonth = selMonth;
    reqData.serviceid = serviceid;
    reqData.accountNo = accountNo;
    global_serviceID = serviceid;
//    $("#Bill_grid_month_combo_id").val(selMonth);
    procesRequest("fetchSubscriberSummaryBySubscriberNo.action", reqData, fnCallBackFetchSubscriberDetails, fnCallBackFetchSubscriberDetailsFail, false);
}

function fnCallBackFetchSubscriberDetailsFail(response) {
    showMessage("Error", "Unable to fetch account details else.", 2);
}
function fnCallBackFetchSubscriberDetails(response) {
    var result = JSON.parse(response);
    var resultList = result.objCRSResponse.data.ITEM_DATA;
    $("#local_charges_list_div_id").html("");
    var currentChargesType = "";
    var lastChargesType = "";
    if (global_serviceID == "3") {
        lastChargesType = "onn";
    } else {
        lastChargesType = "t";
    }
    var chargesHeaderHtml = "";
    var chargesListHtml = "";
    var headerTotalCount = 0;
    var headerTotalAmount = 0.00;
    if (global_serviceID == "3") {
        if (resultList.length > 0) {
            cleardivs();
            makevnsDivsEmpaty();
            for (var index = 0; resultList.length > index; index++) {
                var jsonResult = resultList[index];
                currentChargesType = jsonResult.CHARGES_TYPE.trim().toLowerCase();
                lastChargesType = currentChargesType;
//                if (currentChargesType.toLowerCase() == lastChargesType.toLowerCase()) {
//                    headerTotalCount = headerTotalCount + parseInt(jsonResult.NO_OF_RECORDS || 0);
//                    headerTotalAmount = headerTotalAmount + parseFloat(jsonResult.AMOUNT);
//                    chargesListHtml = chargesListHtml + '<a href="#" onclick="loadSubscriberChargeDetail(' + jsonResult.SUBSCRIBER_ID + ',' + jsonResult.CHARGES_NAME + ',\'' + jsonResult.CHARGE_DESC + '\',' + global_serviceID + ');" data-dismiss="modal"  data-toggle="modal" data-target="#divDetails" class="list-group-item">'
//                            + '<label class="ServiceName">' + jsonResult.CHARGE_DESC + '</label>'
//                            + ' <label class="TotalCalls pad120R">' + jsonResult.NO_OF_RECORDS + '</label>'
//                            + '<label class="TotalCalls pad120R">' + jsonResult.AMOUNT + '</label>'
//                            + '</a>';
//
//                } else {
                chargesListHtml = "";
                headerTotalCount = 0;
                headerTotalAmount = 0.00;

                headerTotalCount = headerTotalCount + jsonResult.NO_OF_RECORDS;
                headerTotalAmount = headerTotalAmount + parseFloat(jsonResult.AMOUNT);
                chargesListHtml = chargesListHtml + '<a href="#" onclick="loadSubscriberChargeDetail(' + jsonResult.SUBSCRIBER_ID + ',' + jsonResult.CHARGES_NAME + ',\'' + jsonResult.CHARGE_DESC + '\',' + global_serviceID + ');" data-dismiss="modal"  data-toggle="modal" data-target="#divDetails" class="list-group-item">'
                        + '<label class="ServiceName">' + jsonResult.CHARGE_DESC + '</label>'
                        + ' <label class="TotalCalls pad120R">' + jsonResult.NO_OF_RECORDS + '</label>'
                        + '<label class="TotalCalls pad120R">' + format1(jsonResult.AMOUNT) + '</label>'
                        + '</a>';

                var serviceName = lastChargesType;
                chargesHeaderHtml = '<label class="ServiceName"><strong>' + serviceName + '</strong></label>'
                        + '<label class="TotalCalls">Total No.of Calls: <strong>' + headerTotalCount + '</strong> </label>'
                        + '<label class="TotalCalls">Amount : <strong>' + format1(headerTotalAmount) + '</strong> </label>';


                if (lastChargesType.toLowerCase() == "onnetnational") {
                    serviceName = "On Net National"
                    $("#local_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#local_charges_list_div_id").html(chargesListHtml);
                } else if (lastChargesType.toLowerCase() == "offnetnational") {
                    $("#international_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#international_charges_list_div_id").html(chargesListHtml);
                } else if (lastChargesType.toLowerCase().trim() == "onnetinternational") {
                    $("#offnetinternational_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#offnetinternational_charges_list_div_id").html(chargesListHtml);
                }
                else if (lastChargesType.toLowerCase() == "offnetinternational") {
                    $("#roming_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#roming_charges_list_div_id").html(chargesListHtml);
                }
//                else if (lastChargesType == "data") {
//
//                    chargesHeaderHtml = '<label class="ServiceName"><strong>' + serviceName + '</strong></label>'
//                            + '<label class="TotalCalls pad120R">Total KB: <strong>' + headerTotalCount + '</strong> </label>'
//                            + '<label class="TotalCalls pad120R">Amount : <strong>' + format1(headerTotalAmount) + '</strong> </label>';
//
//                    $("#data_charge_heading_a_id").html(chargesHeaderHtml);
//                    $("#data_charges_list_div_id").html(chargesListHtml);
//                }
//                    else {
//                        console.log("other_charge_heading_a_id::" + lastChargesType);
//                        $("#other_charge_heading_a_id").html(chargesHeaderHtml);
//                        $("#other_charges_list_div_id").html(chargesListHtml);
//                    }
//            chargesHeaderHtml = "";


//                }

            }
//            chargesHeaderHtml = '<label class="ServiceName"><strong>' + currentChargesType + '</strong></label>'
//                    + '<label class="TotalCalls">Total KB: <strong>' + headerTotalCount + '</strong> </label>'
//                    + '<label class="TotalCalls">Amount : <strong>' + headerTotalAmount + '</strong> </label>';
//            //offnetnational
//            if (lastChargesType == "data") {
//                console.log("data_charge_heading_a_id::" + lastChargesType);
//                $("#local_charge_heading_a_id").html(chargesHeaderHtml);
//                $("#local_charges_list_div_id").html(chargesListHtml);
//            } else {
//                console.log("data_charge_heading_a_id other_charge_heading_a_id::" + lastChargesType);
//                $("#other_charge_heading_a_id").html(chargesHeaderHtml);
//                $("#other_charges_list_div_id").html(chargesListHtml);
//            }
        } else {
            makevnsDivsEmpaty();
        }
    } else {
        if (resultList.length > 0) {
            cleardivs();
            makeDivsEmpaty();
            for (var index = 0; resultList.length > index; index++) {
                var jsonResult = resultList[index];
                currentChargesType = jsonResult.CHARGES_TYPE.trim().toLowerCase();
                lastChargesType = currentChargesType;
//                if (currentChargesType.toLowerCase() == lastChargesType.toLowerCase()) {
//                    headerTotalCount = headerTotalCount + parseInt(jsonResult.NO_OF_RECORDS || 0);
//                    headerTotalAmount = headerTotalAmount + parseFloat(jsonResult.AMOUNT);
//                    chargesListHtml = chargesListHtml + '<a href="#" onclick="loadSubscriberChargeDetail(' + jsonResult.SUBSCRIBER_ID + ',' + jsonResult.CHARGES_NAME + ',\'' + jsonResult.CHARGE_DESC + '\',' + global_serviceID + ');" data-dismiss="modal"  data-toggle="modal" data-target="#divDetails" class="list-group-item">'
//                            + '<label class="ServiceName">' + jsonResult.CHARGE_DESC + '</label>'
//                            + ' <label class="TotalCalls pad120R">' + jsonResult.NO_OF_RECORDS + '</label>'
//                            + '<label class="TotalCalls pad120R">' + jsonResult.AMOUNT + '</label>'
//                            + '</a>';
//
//                } else {
                chargesListHtml = "";
                headerTotalCount = 0;
                headerTotalAmount = 0.00;

                    headerTotalCount = headerTotalCount + jsonResult.NO_OF_RECORDS;
                    headerTotalAmount = headerTotalAmount + parseFloat(jsonResult.AMOUNT);
                    chargesListHtml = chargesListHtml + '<a href="#" onclick="loadSubscriberChargeDetail(' + jsonResult.SUBSCRIBER_ID + ',' + jsonResult.CHARGES_NAME + ',\'' + jsonResult.CHARGE_DESC + '\',' + global_serviceID + ');" data-dismiss="modal"  data-toggle="modal" data-target="#divDetails" class="list-group-item">'
                            + '<label class="ServiceName">' + jsonResult.CHARGE_DESC + '</label>'
                            + ' <label class="TotalCalls pad120R">' + jsonResult.NO_OF_RECORDS + '</label>'
                            + '<label class="TotalCalls pad120R">' + format1(jsonResult.AMOUNT) + '</label>'
                            + '</a>';

                var serviceName = lastChargesType;
                chargesHeaderHtml = '<label class="ServiceName"><strong>' + serviceName + '</strong></label>'
                        + '<label class="TotalCalls">Total No.of Calls: <strong>' + headerTotalCount + '</strong> </label>'
                        + '<label class="TotalCalls">Amount : <strong>' + format1(headerTotalAmount) + '</strong> </label>';

                if (lastChargesType.toLowerCase() == "local") {
                    serviceName = "Local Charges"
                    $("#local_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#local_charges_list_div_id").html(chargesListHtml);
                }
                else if (lastChargesType.toLowerCase() == "telstraroam") {
                    $("#offnetinternational_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#offnetinternational_charges_list_div_id").html(chargesListHtml);
                }
                else if (lastChargesType.toLowerCase() == "international") {
                    $("#international_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#international_charges_list_div_id").html(chargesListHtml);
                } else if (lastChargesType.toLowerCase() == "roaming") {
                    $("#roming_charge_heading_a_id").html(chargesHeaderHtml);
                    $("#roming_charges_list_div_id").html(chargesListHtml);
                }
//                else if (lastChargesType == "data") {
//
//                    chargesHeaderHtml = '<label class="ServiceName"><strong>' + serviceName + '</strong></label>'
//                            + '<label class="TotalCalls pad120R">Total KB: <strong>' + headerTotalCount + '</strong> </label>'
//                            + '<label class="TotalCalls pad120R">Amount : <strong>' + format1(headerTotalAmount) + '</strong> </label>';
//
//                    $("#data_charge_heading_a_id").html(chargesHeaderHtml);
//                    $("#data_charges_list_div_id").html(chargesListHtml);
//                }
//                    else {
//                        $("#other_charge_heading_a_id").html(chargesHeaderHtml);
//                        $("#other_charges_list_div_id").html(chargesListHtml);
//                    }
//            chargesHeaderHtml = "";


//                }
            }
//            chargesHeaderHtml = '<label class="ServiceName"><strong>' + currentChargesType + '</strong></label>'
//                    + '<label class="TotalCalls">Total KB: <strong>' + headerTotalCount + '</strong> </label>'
//                    + '<label class="TotalCalls">Amount : <strong>' + headerTotalAmount + '</strong> </label>';
//            //telestraroam
//            if (lastChargesType == "local") {
//                $("#local_charge_heading_a_id").html(chargesHeaderHtml);
//                $("#local_charges_list_div_id").html(chargesListHtml);
//            } else {
//                $("#other_charge_heading_a_id").html(chargesHeaderHtml);
//                $("#other_charges_list_div_id").html(chargesListHtml);
//            }
        } else {
            makeDivsEmpaty();
        }
    }

}

function cleardivs() {
    $("#local_charge_heading_a_id").html("");
    $("#local_charges_list_div_id").html("");
//    $("#other_charge_heading_a_id").html("");
//    $("#other_charges_list_div_id").html("");
    $("#offnetinternational_charge_heading_a_id").html("");
    $("#offnetinternational_charges_list_div_id").html("");
    $("#international_charge_heading_a_id").html("");
    $("#international_charges_list_div_id").html("");
    $("#roming_charge_heading_a_id").html("");
    $("#roming_charges_list_div_id").html("");
}
function makevnsDivsEmpaty() {
    var headerType = "onnetnational";
    var headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';

    $("#local_charge_heading_a_id").html(headerHtml);
    $("#local_charges_list_div_id").html("");
//    var headerType = "onnetnational";
//    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
//            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
//            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';
//    $("#other_charge_heading_a_id").html(headerHtml);
//    $("#other_charges_list_div_id").html("");
    headerType = "onnetinternational";
    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';
    $("#offnetinternational_charge_heading_a_id").html(headerHtml);
    $("#offnetinternational_charges_list_div_id").html("");
    headerType = "offnetnational";
    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';
    $("#international_charge_heading_a_id").html(headerHtml);
    $("#international_charges_list_div_id").html("");

    headerType = "offnetinternational";
    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';

    $("#roming_charge_heading_a_id").html(headerHtml);
    $("#roming_charges_list_div_id").html("");

}

function makeDivsEmpaty() {
    var headerType = "local";
    var headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';

    $("#local_charge_heading_a_id").html(headerHtml);
    $("#local_charges_list_div_id").html("");
//    var headerType = "local";
//    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
//            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
//            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';
//    $("#other_charge_heading_a_id").html(headerHtml);
//    $("#other_charges_list_div_id").html("");
    headerType = "telstraroam";
    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';
    $("#offnetinternational_charge_heading_a_id").html(headerHtml);
    $("#offnetinternational_charges_list_div_id").html("");
    headerType = "international";
    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';
    $("#international_charge_heading_a_id").html(headerHtml);
    $("#international_charges_list_div_id").html("");

    headerType = "roaming";
    headerHtml = '<label class="ServiceName"><strong>' + headerType + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>0</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>0</strong> </label>';

    $("#roming_charge_heading_a_id").html(headerHtml);
    $("#roming_charges_list_div_id").html("");

}


function loadSubscriberChargeDetail(subscriberID, chargeTypeID, chargeDesc, serviceid) {

    charges_detail_grid = [];
    loadKUnMask();
    charges_detail_grid = $("#divDetailsGrid").kendoGrid({
        height: 420,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        dataBound: permissiongridDataBound,
        pageable: {
            pageSize: 10
        },
        columns: [{
                field: "BILL_DATE",
                title: "Invoice Date",
//                template: '<a style="cursor:default" title="#=ACCOUNTS#" data-toggle="modal" data-dismiss="modal" data-target="\\\\#divAccount"  onclick="loadAccountsDetails(\'#=ACCOUNTS#\')" >#=ACCOUNTS#</a>',
                encoded: false,
                width: 160
            }, {
                field: "BILL_TIME",
                title: "Invoice Time",
                width: 150
            }, {
                field: "POINT_ORIGIN",
                title: "Service Number",
                 headerTemplate: '<span title="Service Number">Service Number</span>',
                width: 180
            }, {
                field: "POINT_TARGET",
                title: "Call Destination",
                width: 220
            }, {
                field: "CALL_DURATION",
                title: "Call Duration",
                 headerTemplate: '<span title="Call Duration">Call Duration</span>',
                width: 150
            }, {
                field: "PRIMARY_UNITS",
                title: "Primary Units",
                width: 200
            }, {
                field: "AMOUNT",
                title: "Amount",
                width: 150
            }
//            , {
//                field: "Action",
//                title: "View Bill",
//                width: 150,
//                encoded: false,
//                attributes: {
//                    "class": "action"
//                },
//                //width: 180,
//            }
        ]
    }).data("kendoGrid");
     $("#divDetailsGrid").kendoTooltip({
            filter: ".k-header span"
        });
    var selMonth = $("#bill_summary_month_combo_id").val();
    global_subscriberID = subscriberID;
    global_chargeTypeID = chargeTypeID;
    var reqData = {};
    reqData.subscriberID = global_subscriberID;
    reqData.chargeTypeID = global_chargeTypeID;
    reqData.selMonth = selMonth;
    reqData.accountID = global_accountNo;
    reqData.serviceid = serviceid;
//    $("#call_details_grid_month_combo_id").val(selMonth);
    procesRequest("fetchSubsChargesDetailByChargeType.action", reqData, fnCallBackFetchSubscriberChargeDetails, fnCallbackFetchUsersFail, false);
    $("#call_details_header_h4_id").text("Detailed view of " + chargeDesc);
    var callBreadcrumb = '<a href="#"  data-dismiss="modal"  data-toggle="modal" data-target="#divAccount">' + global_accountNo + '</a> / '
            + '<a href="#"  data-dismiss="modal"  data-toggle="modal" data-target="#divSubscriber">' + global_subscriberID + '</a> / ' + chargeDesc;
    $("#call_details_breadcrumb_li_id").html(callBreadcrumb);
}

function fnCallBackFetchSubscriberChargeDetails(response) {
    var result = JSON.parse(response);
    var status = result.objCRSResponse.status;
    if (status == 'success' || status == true) {
        var chargeData = result.objCRSResponse.data.CHARGE_DATA;
        charges_detail_grid.setDataSource(new kendo.data.DataSource({
            data: chargeData,
            pageSize: 10
        }));
    }
}


var account_NO;
function loadAccountByService(objThis) {
    var serviceID = $(objThis).val();
    var reqData = {};
    reqData.serviceID = serviceID;
    procesRequest("fetchAccountListByService.action", reqData, loadAccountsInCombo, fnCallbackFetchUsersFail, false);
}
function loadAccountsInCombo(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        global_Account_combo = result.objCRSResponse.data.ACCOUNT_LIST;

        global_Account_combo.unshift({
            name: "All"
        });

        var multiselect = $("#account_combobox_id_new").data("kendoDropDownList");

        multiselect.setDataSource(global_Account_combo);

        $("#All").prop('checked', true);
        // multiselect.value(uniqueAccountArr[0].name);
        //accountNo=uniqueAccountArr[0].name;
        //loadPaymentHistoryGrid(global_Account_combo[0].name);

    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}

var paymentHistoryGrid;
function loadPaymentHistoryGrid(accountNo) {
    loadKUnMask();

    var reqData = {};
    if (accountNo == "All")
    {
        // var accountCheck1=[];
        var dropdownlist = $("#account_combobox_id_new").data("kendoDropDownList");
        var dataItem = dropdownlist.dataSource.options.data;

        for (var i = 0; i < dataItem.length; i++)
        {
            if (i != 0)
            {
                accountCheck11.push(dataItem[i].name);
            }
        }
    }
    accountCheck = accountCheck11;
    reqData.accountCheck = accountCheck11;
   var selMonth = $("#bill_summary_month_combo_id").val();
   alert(selMonth)
   
   
    //accountCheck=[];
    //alert("loadPaymentHistoryGrid"+JSON.stringify(accountCheck));
    //procesRequest("fetchPaymentHistoryByAccountNo.action", reqData, loadDataInPaymentHistoryGrid, fnCallbackFetchUsersFail, true);

}
function loadDataInPaymentHistoryGrid(response) {
   
    var result = JSON.parse(response);
    var status = result.objCRSResponse.status;
    if (status == 'success' || status == true) {
        var accountData = result.objCRSResponse.data;
//        alert("payment history data :" + accountData.toSource());
        paymentHistoryGrid.setDataSource(new kendo.data.DataSource({
            data: accountData.PAYMENT_DATA,
            pageSize: 10
        }));

    } else {
        showMessage("Error", "Unable to fetch account details.", 2);
    }
}

function loadAccountByServiceForUploadPayment(objThis) {
    var serviceID = $(objThis).val();
    var selMonth = $("#bill_summary_month_combo_id").val();
    var reqData = {};
    reqData.serviceID = serviceID;
    reqData.selMonth = selMonth;
//    $("#account_grid_month_combo_id").val(selMonth);
    procesRequest("fetchAccountsByService.action", reqData, loadAccountDetailForUploadPayment, fnCallbackFetchUsersFail, false);
}

function loadAccountDetailForUploadPayment(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
//        alert("account upload Payment DATA:"+result.toSource());
        var accountArr = result.objCRSResponse.data.ACCOUNT_LIST;

        var uniqueAccountArr = [];
        if (accountArr != undefined) {
            for (var index = 0; accountArr.length > index; index++) {
                if ($.inArray(accountArr[index].ACCOUNT_NO, uniqueAccountArr) < 0) {
                    uniqueAccountArr.push(accountArr[index].ACCOUNT_NO);
                }
            }
        }
        var paymentHeaderHtml = "";
        var paymentBodyHtml = "";
        var accDetailArrIndex = 0;
        $("#accordionUploadDocument1").html("");
        for (var index = 0; uniqueAccountArr.length > index; index++) {
            var paymentBodyDataArr = [];
//            alert("account no matching :First:"+accountArr[accDetailArrIndex].ACCOUNT_NO+"Second:"+uniqueAccountArr[index]);
//            alert(accountArr[accDetailArrIndex].ACCOUNT_NO == uniqueAccountArr[index]);
            for (accDetailArrIndex; accountArr[accDetailArrIndex] && accountArr[accDetailArrIndex].ACCOUNT_NO == uniqueAccountArr[index]; accDetailArrIndex++) {
                var rowJson = {};
                rowJson.INVOICE_NO = accountArr[accDetailArrIndex].INVOICE_NO;
                rowJson.Amount = "<input type='text' class='gridTextBox' placeholder='Enter amount'>";
                paymentBodyDataArr.push(rowJson);
            }
//            alert("payment Body :"+paymentBodyDataArr.toSource());

            paymentHeaderHtml = ' <div class="panel panel-default ">'
                    + '<div class="panel-heading">'
                    + '<h4 class="panel-title acrdLabels"> <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordionUploadDocument1" href="#UploadDocument1' + uniqueAccountArr[index] + '">'
                    + ' <label class="ServiceName">Account Number : <strong>' + uniqueAccountArr[index] + '</strong></label><label class="TotalCalls">Bill No.: <strong>57467630</strong></label><label class="TotalCalls">Amount : <strong>478.695</strong></label>'
                    + ' </a> </h4>'
                    + '</div>'
                    + '<div id="UploadDocument1' + uniqueAccountArr[index] + '" class="panel-collapse collapse in">'
                    + '<div class="panel-body pad0A">'
                    + ' <div id="divUploadPaymentDetails' + uniqueAccountArr[index] + '"></div>'
                    + ' </div>'
                    + '</div>'
                    + ' </div>';
            $("#accordionUploadDocument1").append(paymentHeaderHtml);


            $("#divUploadPaymentDetails" + uniqueAccountArr[index] + "").kendoGrid({
                dataSource: {
                    data: paymentBodyDataArr,
                    error: function (e) {
                        // handle data operation error
                        alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                    },
                    pageSize: 5,
                    batch: false
//                    schema: {
//                        model: {
//                            id: "ProductID",
//                            fields: {
//                                INVOICE_NO: {type: "string"},
//                                Amount: {type: "celleHtml"},
//                                //Action: { type: "celleHtml"}
//                            }
//                        }
//                    }
                },
                /*height: 440,*/
                sortable: true,
                reorderable: true,
                //groupable: true,
                resizable: true,
                filterable: true,
                columnMenu: true,
                pageable: true,
                columns: [{
                        template: "<input type='checkbox'/> <label>&nbsp;</label>",
                        width: 100
                    },
                    {
                        field: "INVOICE_NO",
                        title: "Invoice No.",
                        width: 200
                    }, {
                        field: "Amount",
                        title: "Amount",
                        encoded: false,
                        width: 190
                    }
                ]
            });



        }

    }
}


function loadAccountsByServiceForPayPopup(objThis) {
    var serviceID = $(objThis).val();
    var reqData = {};
    reqData.serviceID = serviceID;
    procesRequest("fetchAccountsWithInvoiceByService.action", reqData, loadAccountsInComboForPayPopup, fnCallbackFetchUsersFail, false);
}
function loadAccountsInComboForPayPopup(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var uniqueAccountArr = result.objCRSResponse.data.ACCOUNT_LIST;
//        alert("data :" + uniqueAccountArr.toSource());
        var objAccountCombo = $("#account_cobobox_pay_now_popup_id");
        objAccountCombo.html("");
        $("#invoice_cobobox_pay_now_popup_id").html("");
        var accountOption = '<option value="-1">Select Account</option>';
        objAccountCombo.append(accountOption);
//        var uniqueAccountArr = [];
//        for (var index = 0; accountArr.length > index; index++) {
//            if ($.inArray(accountArr[index].ACCOUNT_NO, uniqueAccountArr) < 0)
//                uniqueAccountArr.push(accountArr[index].ACCOUNT_NO);
//        }
        for (var index = 0; uniqueAccountArr.length > index; index++) {
            accountOption = '<option value="' + uniqueAccountArr[index].ACCOUNT_NO + '" billno="' + uniqueAccountArr[index].BILL_NO + '" totalamount="' + uniqueAccountArr[index].TOTAL_AMOUNT + '">' + uniqueAccountArr[index].ACCOUNT_NO + '</option>';
            objAccountCombo.append(accountOption);
        }
//        var defaultAccountNo = accountArr[0].ACCOUNT_NO;
        loadAccountsInDivForPayPopup(uniqueAccountArr);
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
//var accountNO=[];
function onChange()
{
    loadPaymentHistoryGrid(this.value());
}

function loadAccountsInDivForPayPopup(accountWithInvoiceArr) {
    var payNowHeaderHtml = "";
    $("#accordionPayment").html("");
    for (var index = 0; accountWithInvoiceArr.length > index; index++) {

        var invoiceArr = accountWithInvoiceArr[index].INVOICE_DATA;
//                rowJson.INVOICE_NO = accountWithInvoiceArr[index].INVOICE_NO;
//                rowJson.Amount= "<input type='text' class='gridTextBox' placeholder='Enter amount'>";
//                paymentBodyDataArr.push(rowJson);

//            alert("payment Body :"+paymentBodyDataArr.toSource());

        payNowHeaderHtml = ' <div class="panel panel-default ">'
                + ' <div class="panel-heading">'
                + ' <h4 class="panel-title acrdLabels"> <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordionPayment" href="#PaymentAccounts1' + accountWithInvoiceArr[index].ACCOUNT_NO + '">'
                + '<label class="ServiceName">Account Number : <strong>' + accountWithInvoiceArr[index].ACCOUNT_NO + '</strong></label><label class="TotalCalls">Bill Number <strong>57467630</strong></label><label class="TotalCalls">Amount : <strong>478.695</strong></label>'
                + ' </a> </h4>'
                + ' </div>'
                + '<div id="PaymentAccounts1' + accountWithInvoiceArr[index].ACCOUNT_NO + '" class="panel-collapse collapse in">'
                + '<div class="panel-body pad0A">'
                + ' <div id="divPaymentAccounts01' + accountWithInvoiceArr[index].ACCOUNT_NO + '"></div>'
                + ' </div>'
                + '</div>'
                + ' </div>';


//        alert("payment Body :" + payNowHeaderHtml.toSource());
        $("#accordionPayment").append(payNowHeaderHtml);


        $("#divPaymentAccounts01" + accountWithInvoiceArr[index].ACCOUNT_NO + "").kendoGrid({
            dataSource: {
                data: invoiceArr,
                error: function (e) {
                    // handle data operation error
                    alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                },
                pageSize: 5,
                batch: false
//                    schema: {
//                        model: {
//                            id: "ProductID",
//                            fields: {
//                                INVOICE_NO: {type: "string"},
//                                Amount: {type: "celleHtml"},
//                                //Action: { type: "celleHtml"}
//                            }
//                        }
//                    }
            },
            /*height: 440,*/
            sortable: true,
            reorderable: true,
            //groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [{
                    template: "<input type='checkbox'/> <label>&nbsp;</label>",
                    width: 100
                },
                {
                    field: "INVOICE_NO",
                    title: "Invoice No",
                    width: 200
                }, {
                    field: "TOTAL_AMOUNT",
                    title: "Amount",
                    width: 200
                }, {
                    field: "BILL_NO",
                    title: "Bill No",
                    width: 200
                }, {
                    field: "BILL_DATE",
                    title: "Bill Date",
                    width: 200
                }, {
                    field: "DUE_DATE",
                    title: "Due Date",
                    width: 200
                }, {
                    field: "TOTAL_DUE",
                    title: "Total Due",
                    //                        encoded: false,
                    width: 190
                }

            ]
        });


    }

}

function loadInvoiceInComboForPayPopup(objThis) {
    var accountID = $(objThis).val();
    var billNo = $(objThis).attr("billno");
    var totalAmount = $(objThis).attr("totalamount");
    var reqData = {};
    reqData.accountID = accountID;
    if (accountID > 0) {
        procesRequest("fetchInvoiceListByAccountNO.action", reqData, fnCallBackLoadInvoiceInComboForPayPopup, fnCallbackFetchUsersFail, false);
    }

}
var global_invoiceList;
function fnCallBackLoadInvoiceInComboForPayPopup(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var invoiceArr = result.objCRSResponse.data.INVOICE_LIST;
//        alert("data invoiceArr :" + invoiceArr.toSource());
        var objAccountCombo = $("#account_cobobox_pay_now_popup_id");

        var accountID = objAccountCombo.val();
        var billNo = objAccountCombo.attr("billno");
        var totalAmount = objAccountCombo.attr("totalamount");
        var objInvoiceCombo = $("#invoice_cobobox_pay_now_popup_id");
        objInvoiceCombo.html("");
        var invoiceOption = '<option value="-1">Select Invoice</option>';
        objInvoiceCombo.append(invoiceOption);
        for (var index = 0; invoiceArr.length > index; index++) {
            invoiceOption = '<option value="' + invoiceArr[index].INVOICE_NO + '">' + invoiceArr[index].INVOICE_NO + '</option>';
            objInvoiceCombo.append(invoiceOption);
        }
        var accountWithInvoiceArr = [];
        var accountRow = {};
        accountRow.ACCOUNT_NO = accountID;
        accountRow.BILL_NO = billNo;
        accountRow.TOTAL_AMOUNT = totalAmount;
        accountRow.INVOICE_DATA = invoiceArr;

        accountWithInvoiceArr.push(accountRow);
        loadAccountsInDivForPayPopup(accountWithInvoiceArr);
        global_invoiceList = invoiceArr;

    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}

function searchInvoiceInGrid(objThis) {
    var selInvoiceNo = $(objThis).val();
    if (selInvoiceNo != "-1") {
        var accountId = $("#account_cobobox_pay_now_popup_id").val();
//    var dataListGridArr=$('#divPaymentAccounts01'+accountId).data("kendoGrid").dataSource.data();
//    var invoiceArr=$('#divPaymentAccounts01'+accountId).data().kendoGrid.dataSource.view();
//    var invoiceArr=localStorage.getItem('INVOICE_DATA_SOURCE');
//    alert("grid all Data :"+global_invoiceList[1].toSource());
        var result = $.grep(global_invoiceList, function (e) {
            var invoiceNo = e.INVOICE_NO;
            if (invoiceNo != null && invoiceNo != "") {
                return invoiceNo.indexOf(selInvoiceNo) != -1;
            }
        });
        var dataSource = $('#divPaymentAccounts01' + accountId).data("kendoGrid").dataSource;
        dataSource.data([]);
        dataSource.data(result);

//var filters = dataSource.filter();
//var allData = dataSource.data();
//var query = new kendo.data.Query(allData);
//var data = query.filter(filters).data;
    }

}

function format1(num) {
//    alert("hi")
    num = num.toString();
    var temp = num.split(".");
    num = temp[0];
    var temp1 = "00";
    if (temp[1] !== undefined) {
        if (temp[1].length >= 3) {
            temp1 = temp[1].substring(0, 3);
        } else if (temp[1].length == 2) {
            temp1 = temp[1] + "";
        } else if (temp[1].length == 1) {
            temp1 = temp[1] + "0";
        }
    }
    var tempVal = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return tempVal + "." + temp1;
}


function converDateIn_ddMonYYYY_format(date) {
    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    var strDate = date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
    return strDate;
}

function kendoGridDataSearch() {
    var result = $.grep(dataListGridArr, function (e) {
        var datalist_Name = e.dataListName;
        if (datalist_Name != null && datalist_Name != "") {
            return datalist_Name.indexOf(searchVal) != -1;
        }

    });
}

function paymentHistory()

{
    //alert("dfsdf")
   //alert($("#bill_summary_month_combo_id").val())
    var reqData = {}
    // var serviceID = 
    reqData.Month = $("#bill_summary_month_combo_id").val();
    // reqData.serviceID=serviceID;
   // procesRequest("loadAccountCombo.action", reqData, loadAccountsInCombo, fnCallbackFetchUsersFail, false);
   
   

  procesRequest("fetchPaymentHistoryByAccountNo.action", reqData, loadDataInPaymentHistoryGrid, fnCallbackFetchUsersFail, true);
}




function createPaymentHistoryGrid()
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
var viewAccount_grid;
function callViewer(obj)
{
    var row = $(obj).closest('tr');
    var grid = $("#paymentHistoryGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);


    $('#invoiceDateTdID').html(dataItem.PAYMENT_DATE);
    $('#submissionDateTdID').html(dataItem.PAYMENT_DATE);
    $('#paymentAmtTdID').html(dataItem.PAYMENT_AMOUNT);
    $('#paymentTypeTdID').html(dataItem.MODE_OF_PAYMENT);


    viewAccount_grid = $("#viewAccount_grid").kendoGrid({
        //height: 440,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        dataBound: viewPaymentHisgridDataBound,
        pageable: {
            pageSize: 5
        },
        columns: [
            {
                field: "INVOICE_NO",
                title: "INVOICE NUMBER",
                width: 140
            }, {
                field: "BAN",
                title: "BAN",
                width: 150
            }, {
                field: "MSISDN",
                title: "MOBILE NUMBER",
                width: 150
            }, {
                field: "AMOUNT",
                title: "AMOUNT",
                width: 150
            }, {
                field: "status",
                title: "STATUS",
                width: 150
            }
        ]
    }).data("kendoGrid");




    var reqData = {}

    reqData.PAY_ID = dataItem.PAY_ID;
    reqData.accountCheck = accountCheck;

    procesRequest("veiwPaymentHistory.action", reqData, viewPaymentHistory, fnCallbackFetchUsersFail, false);

}

function viewPaymentHistory(response)
{
    debugger
    $('#divViewPaymentHistory').modal('show')
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var sData = result.objCRSResponse.data.ACCOUNT_LIST;
        //        alert("data :" + sData.toSource());
        viewAccount_grid.setDataSource(new kendo.data.DataSource({
            data: sData,
            pageSize: 5
        }));
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}

function closeddivViewPaymentHistorypop()
{

    $('#divViewPaymentHistory').modal('hide');
}


function viewPaymentHisgridDataBound(arg) {
    kendo.ui.progress($("#viewAccount_grid>div.k-grid-content"), false);
    kendo.ui.progress($("#viewAccount_grid>div.k-grid-content"), false);
    if (arg.sender._data.length == 0) {
        var colCount = $("#viewAccount_grid").find('.k-grid-header colgroup > col').length;
        $("#viewAccount_grid").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
}

var disputeinvoicenum = [];
function disputeBillAccountnumbers() {
    disputeinvoicenum=[];
    document.getElementById("savedisputebill").reset();
    $("select#servicenumlist").html('<option value="0">Select Service Number</option>');
    document.getElementById("dis_bill_date").value = $('#bill_summary_month_combo_id :selected').text();
    document.getElementById("disputeval").style.display = "none";
    var reqData = {}
    var selMonth = $("#bill_summary_month_combo_id").val();
    reqData.selMonth = selMonth;
//    reqData.accountCheck = accountCheck;
//    procesRequest("fetchAccountsForDisputeBill.action", reqData, disputeBillAccountnumbersSucc, disputeBillAccountnumbersFail, false);
    document.getElementById("acctnumlist").value = $('#disputebill').attr('data-actnum');
    var desgnationOptions = '<option value="0">Select Service Number</option>';
    $.each(checkedRows, function (key, value) {
        desgnationOptions += "<option value = " + value + ">" + value + " </option>";
    });
    $("select#servicenumlist").html(desgnationOptions);

}

function disputeBillAccountnumbersSucc(response) {
    var res = JSON.parse(response);
    var status = res.objCRSResponse.status;
    if (status == 'success' || status == true) {
        var sData = res.objCRSResponse.data.ACCOUNT_LIST;
        if (sData.length != 0) {
            var desgnationsArr = sData;
            var desgnationOptions = '<option value="0">Select Account Numbers</option>';
            $.each(desgnationsArr, function (key, value) {
                desgnationOptions += "<option value = " + value.ACCOUNT_NO + ">" + value.ACCOUNT_NO + " </option>";
                disputeinvoicenum[value.ACCOUNT_NO] = value.INVOICE_NO;
            });
            $("select#acctnumlist").html(desgnationOptions);
        }
    }
}

function disputeBillAccountnumbersFail(response) {

    showMessage("Error", "Unable to fetch Account numbers in Dispute Bill details.", 2);
}
function savedisputebill() {

//    if (document.getElementById("acctnumlist").value == "0") {
//        document.getElementById("disputeval").style.display = "inline";
//        document.getElementById("disputeval").innerHTML = "Account Number Is Mandatory";
//
//    } else
    if (document.getElementById("servicenumlist").value == "0") {
        document.getElementById("disputeval").style.display = "inline";
        document.getElementById("disputeval").innerHTML = "Service Number Is Mandatory";

    } else {
        var reqData = {}
        var selMonth = $("#bill_summary_month_combo_id").val();
        reqData.category = $('#dis_category :selected').text();
        reqData.description = $('#prblm_des').val();
        reqData.account_no = $('#acctnumlist').val();
        reqData.service_no = $('#servicenumlist').val();
        reqData.invoice_no = $('#disputebill').attr('data-invnum');
        reqData.service_type = global_serviceID;
        procesRequest("saveDisputeBill.action", reqData, saveDisputeBillSucc, saveDisputeBillFail, false);

    }
}

function saveDisputeBillSucc(response) {
    var res = JSON.parse(response);
    var success = res.objCRSResponse.success;
    if (success == true) {
        $("#divDisputeAdd").modal('hide');
        showMessage("Success", "Dispute Raised Successfully", 1, "disputsucc");
    } else {

    }
}
function saveDisputeBillFail(response) {
    showMessage("Success", "Dispute Raised Successfully", 1, "disputsucc");
}
function test_pagechange(e) {
    var count = 0;
    var view = e;
    for (var k = 0; k < view.length; k++) {
        for (var i = 0; i < checkedRows.length; i++) {
            if (checkedRows[i] == view[k].MOBILE_NO) {
                $("#" + view[k].MOBILE_NO).prop('checked', true);
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
//on databound checking for available records
function permit_gridDataBound(arg) {
//    kendo.ui.progress($("#account_item_grid>div.k-grid-content"), false);
//    if (arg.sender._data.length == 0) {
//        var colCount = $("#grid").find('.k-grid-header colgroup > col').length;
//        $("#account_item_grid").find('.k-grid-content tbody')
//                .append('<tr class="kendo-data-row"><td colspan="' +
//                        colCount +
//                        '" style="text-align:center"><b>No records found</b></td></tr>');
//    }
//    test_pagechange(arg.sender._data);
}

var checkedRows = [];
function selectAll(object) {
    var strGridData = JSON.stringify(account_item_grid._data);
    var objGridData = JSON.parse(strGridData);
    if (object.checked) {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var dataItem = account_item_grid.dataSource.view()[idx];
            var index = checkedRows.indexOf(objGridData[idx].MOBILE_NO);
            if (index == -1) {
                checkedRows.push(objGridData[idx].MOBILE_NO);
            }
            $("#" + objGridData[idx].MOBILE_NO).prop('checked', true);
        }
    }
    else {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var index1 = checkedRows.indexOf(objGridData[idx].MOBILE_NO);
            if (index1 != -1) {
                checkedRows.splice(index1, 1);
            }
            $("#" + objGridData[idx].MOBILE_NO).prop('checked', false);
        }
    }
}

function deSelectAll() {
    var strGridData = JSON.stringify(account_item_grid._data);
    var objGridData = JSON.parse(strGridData);
    try {
        for (var idx = 0; idx < objGridData.length; idx++)
        {
            var index1 = checkedRows.indexOf(objGridData[idx].MOBILE_NO);
            if (index1 != -1) {
                checkedRows.splice(index1, 1);
            }
            $("#" + objGridData[idx].MOBILE_NO).prop('checked', false);
        }
        $("#checkAll").prop('checked', false);
    } catch (e) {

    }
    checkedRows = [];
}
function selectRow(object) {
    var checked = object.checked;
    var row = $(object).closest("tr");
    var dataItem = account_item_grid.dataItem(row);
    if (checked) {
        var index = checkedRows.indexOf(dataItem.MOBILE_NO);
        if (index == -1) {
            checkedRows.push(dataItem.MOBILE_NO);
        }
    } else {
        var index1 = checkedRows.indexOf(dataItem.MOBILE_NO);
        if (index1 != -1) {
            checkedRows.splice(index1, 1);
        }
    }

    var strGridData = JSON.stringify(account_item_grid._data);
    var objGridData = JSON.parse(strGridData);
    var count = 0;
    for (var k = 0; k < objGridData.length; k++) {
        for (var i = 0; i < checkedRows.length; i++) {
            if (checkedRows[i] == objGridData[k].MOBILE_NO) {
                $("#" + objGridData[k].MOBILE_NO).prop('checked', true);
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