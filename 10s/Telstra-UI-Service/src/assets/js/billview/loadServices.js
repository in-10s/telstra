/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loadAccountsForMobile() {
    var reqData = {};
    reqData.serviceID = 1;
    procesRequest("fetchAccountsByService.action", reqData, fnCallbackloadAccountsForMobile, fnCallbackFetchUsersFail, true);
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
function init(custID)
{
//    var reqData = {};
//    reqData.PID = custID;
//    procesRequest("fetchServices.action", reqData, fnCallbackLoadServices, fnCallbackFetchUsersFail, true);

}

//fetchUsersPermissionAction success::USER-GRID DATA LOADING FUNCTION
function fnCallbackLoadServices(response)
{
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var sData = result.objCRSResponse.data.SERVICE_DATA;
//        alert("data :"+sData.toSource());
        var totalDue = 0;
        for (var index = 0; sData.length > index; index++) {
            totalDue = totalDue + parseFloat(sData[index].DUE);
        }
        $("#total_amount_due_span").text("$" + totalDue);
        $("#service_loaded_date_id").text(converDateIn_ddMonYYYY_format(new Date()));
        sevices_grid.setDataSource(new kendo.data.DataSource({
            data: sData,
            pageSize: 10
        }));
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
//GRID CREATION
function loadData() {
    // $("#service_combobox_of_upload_payment").change();
    loadAccountsForMobile();
    loadAccountListForMobile();
    loadKUnMask();
    sevices_grid = $("#sevices_grid").kendoGrid({
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
                field: "SERVICE_ID",
                hidden: true,
                width: 190
            }, {
                field: "SERVICES",
                title: "Services",
                template: '<a style="cursor:default" title="#=SERVICES#" data-toggle="modal" data-target="\\\\#divAccountsList"  onclick="loadAccounts(\'#=SERVICE_ID#\')" >#=SERVICES#</a>',
                width: 190
            }, {
                field: "DUE",
                title: "Amount Due",
                template: '<span style="cursor:default" title="#=DUE#" >#=DUE#</span>',
                width: 190
            }, {
                title: 'Actions',
                headerAttributes: {
                    style: "padding-left:17px"
                },
//                template: $("#permission_icon_template").html(),
                template: ' <a class="primarybt" title="View"  data-toggle="modal" data-target="\\\\#divPayment" onclick="selectServiceOnViewPopup(\'#=SERVICE_ID#\')">Pay Now</a>',
                menu: false,
                width: 190
            }
        ]
    }).data("kendoGrid");

    var reqData = {};
    reqData.PID = custID;
    procesRequest("fetchServices.action", reqData, fnCallbackLoadServices, fnCallbackFetchUsersFail, true);
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


//USER-GRID VIEW FUNCTION
function fnUserView(obj) {
    var row = $(obj).closest("tr");
    var item = sevices_grid.dataItem(row);
    var reqData = {};
    reqData.EMAIL_ID = item.LOGIN_ID;
    procesRequest("viewUsersPermissionAction.action", reqData, fnCallbackfetchUsersSucc1, fnCallbackfetchUsersFail);
}

//viewUsersPermissionAction success:::USER-GRID VIEW PROCEEREQUEST SUCCESS FUNCTION
function fnCallbackfetchUsersSucc1(res)
{
    //var width=( jQuery('body').width());

    var status = JSON.parse(res).objCRSResponse.data[0].status;
    if (status == 'success') {
        try {
            var userDetails_UM = JSON.parse(res).objCRSResponse.data[0].USER_DETAILS_UM;
            document.getElementById('FIRST_NAME').innerHTML = userDetails_UM[0].FIRST_NAME;
            document.getElementById('LAST_NAME').innerHTML = userDetails_UM[0].LAST_NAME;
            var roles = userDetails_UM[0].ROLES;
            document.getElementById('ext-gen1055').innerHTML = roles.substr(0, roles.length - 2);
            document.getElementById('EMAIL_ID').innerHTML = userDetails_UM[0].EMAIL_ID;


        } catch (e) {
            showMessage("Error", "Exception in proceesing user details.", 2);
        } finally {
            loadModal('divView');
//            $("#divView").modal({
//                backdrop: 'static'
//            });
//             $('.modal-open').css('width',width);
        }
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
//USER-GRID VIEW PROCEEREQUEST FAILURE FUNCTION
function fnCallbackfetchUsersFail()
{
    showMessage("Error", "Unable to fetch user details.", 2);
}


//USER-PERMISSION GRID SEARCH
function searchUser() {
    var uid = $('#emailID').val();
    var name = $('#Name').val();
//    var isInternal=$('#IS_INTERNAL').val();
    var reqData = {};
    reqData.FIRST_NAME = name;
    reqData.EMAIL_ID = uid;
//    if(isInternal == "External"){
    reqData.IS_INTERNAL = '0';
//    }else if(isInternal == "Internal"){
//        reqData.IS_INTERNAL ='1';
//    }else{
//        reqData.IS_INTERNAL ='All';
//    }
    procesRequest("searchUsersAction.action", reqData, fnCallbackSearchUsersSucc, fnCallbackSearchUsersFail);
//    displayLoading("#sevices_grid>div.k-grid-content");
}
//searchUsersAction success fn
function fnCallbackSearchUsersSucc() {
    var status = JSON.parse(response).objCRSResponse.data[0].status;
    if (status == 'success') {
        var result = JSON.parse(response);
        var sData = result.objCRSResponse.data[0].result;
        permit_grid.setDataSource(new kendo.data.DataSource({
            data: sData,
            pageSize: 10
        }));
        permit_grid.refresh();
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}
//searchUsersAction failure function 
function fnCallbackSearchUsersFail() {
    showMessage("Error", "Unable to fetch user details.", 2);
}

var account_grid;
function loadAccounts(serviceID) {
    loadKUnMask();
    account_grid = $("#account_grid").kendoGrid({
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
                field: "ACCOUNT_NO",
                title: "Accounts",
                template: '<a style="cursor:default" title="#=ACCOUNT_NO#" data-toggle="modal" data-dismiss="modal" data-target="\\\\#divAccount"  onclick="loadAccountsDetails(\'#=ACCOUNT_NO#\')" >#=ACCOUNT_NO#</a>',
//                    encoded: false,
                width: 150
            }, {
                field: "TOTAL_AMOUNT",
                title: "Amount",
                width: 140
            }, {
                field: "BILL_NO",
                title: "Bill No.",
                width: 150
            }, {
                field: "BILL_DATE",
                title: "Bill Date",
                width: 150
            }, {
                field: "DUE_DATE",
                title: "Due Date",
                width: 150
            }, {
                field: "TOTAL_DUE",
                title: "Total Due",
                width: 150
            }, {
                field: "Action",
                title: "View Bill",
                width: 150,
                encoded: false,
                attributes: {
                    "class": "action"
                },
                //width: 180,
            }
        ]
    }).data("kendoGrid");
//    displayLoading("#sevices_grid>div.k-grid-content");

    var reqData = {};
    reqData.serviceID = serviceID;
    procesRequest("fetchAccountsByService.action", reqData, fnCallbackfetchAccountByServiceSucc, fnCallbackFetchUsersFail, true);
}
function fnCallbackfetchAccountByServiceSucc(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var sData = result.objCRSResponse.data.ACCOUNT_LIST;
//        alert("data :" + sData.toSource());
        account_grid.setDataSource(new kendo.data.DataSource({
            data: sData,
            pageSize: 10
        }));
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}

var account_item_grid;
function loadAccountsDetails(accountNO) {
    alert("loadAccountsDetails");
    $("#div_account_detail_header_text_id").append(accountNO);
    $("#div_account_detail_header_text_id").attr("account_no", accountNO);
    $("#div_account_detail_path_breadcrumb_id").html('<a href="#"  data-dismiss="modal"  data-toggle="modal" data-target="#divAccountsList">' + accountNO + '</a> / ');
    loadKUnMask();
    account_item_grid = $("#account_item_grid").kendoGrid({
        height: 440,
        sortable: true,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        //dataBound: permissiongridDataBound,
        pageable: {
            pageSize: 10
        },
        columns: [{
                field: "MOBILE_NO",
                title: "Mobile No",
                template: '<a style="cursor:default" title="#=MOBILE_NO#" data-dismiss="modal" data-toggle="modal" data-target="\\\\#divSubscriber"  onclick="loadSubscriberBillSummary(\'#=MOBILE_NO#\')" >#=MOBILE_NO#</a>',
//                    encoded: false,
                width: 150
            }, {
                field: "MONTHLY_CHARGE",
                title: "Monthly Charge",
                width: 140
            }, {
                field: "LOCAL_CHARGE",
                title: "Local Charge",
                width: 150
            }, {
                field: "DATA_CHARGE",
                title: "Data charge ",
                width: 150
            }, {
                field: "INTERNATIONAL_CHARGE",
                title: "Intenational Charge",
                tooltip: {
                    visible: true,
                    color: "green"
                },
                width: 150
            }, {
                field: "ROAMING_CHARGE",
                title: "Roaming Charge",
                width: 150
            }, {
                field: "OTHER_CHARGE",
                title: "Other Charge",
                width: 150
            }, {
                field: "TOTAL_CURRENT_CHARGE",
                title: "Total Current Charge",
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
//        displayLoading("#sevices_grid>div.k-grid-content");

    var reqData = {};
    reqData.accountID = accountNO;
    procesRequest("fetchAccountDetailsByAccountNo.action", reqData, fnCallBackFetchAccountDetails, fnCallbackFetchUsersFail);
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
        if (accountData.length > 0) {
            var summaryBodyHtml = '<tr><td>' + summaryData.LAST_BILL_AMOUNT + '</td><td> ' + summaryData.ADJUSTMENTS + '</td><td> ' + summaryData.PAYMENTS + '</td><td> ' + summaryData.BILL_AMOUNT + '</td> <td> ' + summaryData.TOTAL_DUE + '</td><td> ' + summaryData.ACC_LEVEL_CHARGES + '</td><td> ' + summaryData.ACC_LEVEL_WAIVER + '</td></tr>';
            $("#account_summary_table_body").html(summaryBodyHtml);
        }
    } else {
        showMessage("Error", "Unable to fetch account details.", 2);
    }
}


function loadSubscriberBillSummary(mobileNo) {

    $("#div_subscriber_detail_header_text_id").html($("#div_account_detail_header_text_id").html() + " / " + mobileNo);
    var accountNo = $("#div_account_detail_header_text_id").attr("account_no");
    $("#div_subscriber_detail_path_breadcrumb_id").html($("#div_account_detail_path_breadcrumb_id").html() + " / " + mobileNo);
    var reqData = {};
    reqData.subscriberID = mobileNo;
    procesRequest("fetchSubscriberSummaryBySubscriberNo.action", reqData, fnCallBackFetchSubscriberDetails, fnCallbackFetchUsersFail);
}
function fnCallBackFetchSubscriberDetails(response) {
    var result = JSON.parse(response);
//    alert("result:" + result.toSource());
    var resultList = result.objCRSResponse.data.ITEM_DATA;
    $("#local_charges_list_div_id").html("");
    var currentChargesType = "";
    var lastChargesType = "local charge";
    var chargesHeaderHtml = "";
    var chargesListHtml = "";
    var headerTotalCount = 0;
    var headerTotalAmount = 0.00;
    for (var index = 0; resultList.length > index; index++) {
        var jsonResult = resultList[index];
        currentChargesType = jsonResult.CHARGES_TYPE.trim().toLowerCase();
        if (currentChargesType == lastChargesType) {
            headerTotalCount = headerTotalCount + jsonResult.NO_OF_RECORDS;
            headerTotalAmount = headerTotalAmount + parseFloat(jsonResult.AMOUNT);
            chargesListHtml = chargesListHtml + '<a href="#" onclick="loadSubscriberChargeDetail(' + jsonResult.SUBSCRIBER_ID + ',' + jsonResult.CHARGES_ID + ');" data-dismiss="modal"  data-toggle="modal" data-target="#divDetails" class="list-group-item">'
                    + '<label class="ServiceName">' + jsonResult.CHARGES_NAME + '</label>'
                    + ' <label class="TotalCalls">' + jsonResult.NO_OF_RECORDS + '</label>'
                    + '<label class="TotalCalls">' + jsonResult.AMOUNT + '</label>'
                    + '</a>';

        } else {
//            alert("lastcharges:" + lastChargesType);
            var serviceName = lastChargesType;
            chargesHeaderHtml = '<label class="ServiceName"><strong>' + serviceName + '</strong></label>'
                    + '<label class="TotalCalls">Total No.of Calls: <strong>' + headerTotalCount + '</strong> </label>'
                    + '<label class="TotalCalls">Amount : <strong>' + format1(headerTotalAmount) + '</strong> </label>';

            if (lastChargesType == "local charge") {
                serviceName = "Local Charges"
                $("#local_charge_heading_a_id").html(chargesHeaderHtml);
                $("#local_charges_list_div_id").html(chargesListHtml);
            } else if (lastChargesType == "international charge") {
                $("#international_charge_heading_a_id").html(chargesHeaderHtml);
                $("#international_charges_list_div_id").html(chargesListHtml);
            }
            else if (lastChargesType == "data and content charges") {
                $("#data_charge_heading_a_id").html(chargesHeaderHtml);
                $("#data_charges_list_div_id").html(chargesListHtml);
            }
            else {
                $("#other_charge_heading_a_id").html(chargesHeaderHtml);
                $("#other_charges_list_div_id").html(chargesListHtml);
            }
//            alert("lastChargesType is:"+lastChargesType == "local charge");
//            alert("header html:"+chargesHeaderHtml)
//            alert("Body html :"+chargesListHtml)
//            chargesHeaderHtml = "";
            chargesListHtml = "";
            headerTotalCount = 0;
            headerTotalAmount = 0.00;

            headerTotalCount = headerTotalCount + jsonResult.NO_OF_RECORDS;
            headerTotalAmount = headerTotalAmount + parseFloat(jsonResult.AMOUNT);
            chargesListHtml = chargesListHtml + '<a href="#" onclick="loadSubscriberChargeDetail(' + jsonResult.SUBSCRIBER_ID + ',' + jsonResult.CHARGES_ID + ');" data-dismiss="modal"  data-toggle="modal" data-target="#divDetails" class="list-group-item">'
                    + '<label class="ServiceName">' + jsonResult.CHARGES_NAME + '</label>'
                    + ' <label class="TotalCalls">' + jsonResult.NO_OF_RECORDS + '</label>'
                    + '<label class="TotalCalls">' + format1(jsonResult.AMOUNT) + '</label>'
                    + '</a>';

        }
        lastChargesType = currentChargesType;
    }
    chargesHeaderHtml = '<label class="ServiceName"><strong>' + serviceName + '</strong></label>'
            + '<label class="TotalCalls">Total No.of Calls: <strong>' + headerTotalCount + '</strong> </label>'
            + '<label class="TotalCalls">Amount : <strong>' + headerTotalAmount + '</strong> </label>';
    $("#other_charge_heading_a_id").html(chargesHeaderHtml);
    $("#other_charges_list_div_id").html(chargesListHtml);

}

var charges_detail_grid;
function loadSubscriberChargeDetail(subscriberID, chargeTypeID) {
    loadKUnMask();
    charges_detail_grid = $("#divDetailsGrid").kendoGrid({
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
                field: "BILL_DATE",
                title: "Bill Date",
//                template: '<a style="cursor:default" title="#=ACCOUNTS#" data-toggle="modal" data-dismiss="modal" data-target="\\\\#divAccount"  onclick="loadAccountsDetails(\'#=ACCOUNTS#\')" >#=ACCOUNTS#</a>',
                encoded: false,
                width: 150
            }, {
                field: "BILL_TIME",
                title: "Bill Time",
                width: 140
            }, {
                field: "POINT_ORIGIN",
                title: "Service Origin",
                width: 150
            }, {
                field: "POINT_TARGET",
                title: "Service Distination",
                width: 150
            }, {
                field: "UNITS",
                title: "Units",
                width: 150
            }, {
                field: "PRIMARY_UNITS",
                title: "Primary Units",
                width: 150
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

    var reqData = {};
    reqData.subscriberID = subscriberID;
    reqData.chargeTypeID = chargeTypeID;
    procesRequest("fetchSubsChargesDetailByChargeType.action", reqData, fnCallBackFetchSubscriberChargeDetails, fnCallbackFetchUsersFail);
}

function fnCallBackFetchSubscriberChargeDetails(response) {
    var result = JSON.parse(response);
//    alert("result:" + result.toSource());
    var status = result.objCRSResponse.status;
    if (status == 'success' || status == true) {
        var chargeData = result.objCRSResponse.data.CHARGE_DATA;
        charges_detail_grid.setDataSource(new kendo.data.DataSource({
            data: chargeData,
            pageSize: 10
        }));
    }
}



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
        var uniqueAccountArr = result.objCRSResponse.data.ACCOUNT_LIST;
//        alert("payment history account combo data :" + uniqueAccountArr.toSource());
        var accountOption = "";
        var objAccountCombo = $("#account_combobox_id");
        objAccountCombo.html("");
//        for (var index = 0; accountArr.length > index; index++) {
//            if ($.inArray(accountArr[index].ACCOUNT_NO, uniqueAccountArr) < 0)
//                uniqueAccountArr.push(accountArr[index].ACCOUNT_NO);
//        }
//        uniqueAccountArr = $.unique(uniqueAccountArr);// it's only work for DOM element
        for (var index = 0; uniqueAccountArr.length > index; index++) {
            accountOption = '<option value="' + uniqueAccountArr[index].ACCOUNT_NO + '">' + uniqueAccountArr[index].ACCOUNT_NO + '</option>';
            objAccountCombo.append(accountOption);
        }
        var defaultAccountNo = uniqueAccountArr[0].ACCOUNT_NO;
        loadPaymentHistoryGrid(defaultAccountNo);
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}

var paymentHistoryGrid;
function loadPaymentHistoryGrid(accountNo) {
    loadKUnMask();
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
            }, {
                field: "MODE_OF_PAYMENT",
                title: "Mode of payment",
                width: 140
            }, {
                field: "PAYMENT_AMOUNT",
                title: "Payment Amount",
                width: 150
            }, {
                field: "PAYMENT_DATE",
                title: "Payment Date",
                width: 150
            }, {
                field: "CHEQUE_NUMBER",
                title: "Cheque Number",
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

    var reqData = {};
    reqData.accountID = accountNo;
    procesRequest("fetchPaymentHistoryByAccountNo.action", reqData, loadDataInPaymentHistoryGrid, fnCallbackFetchUsersFail, true);

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
    var reqData = {};
    reqData.serviceID = serviceID;
    procesRequest("fetchAccountsByService.action", reqData, loadAccountDetailForUploadPayment, fnCallbackFetchUsersFail, true);
}

function loadAccountDetailForUploadPayment(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
//        alert("account upload Payment DATA:"+result.toSource());
        var accountArr = result.objCRSResponse.data.ACCOUNT_LIST;

        var uniqueAccountArr = [];
        for (var index = 0; accountArr.length > index; index++) {
            if ($.inArray(accountArr[index].ACCOUNT_NO, uniqueAccountArr) < 0) {
                uniqueAccountArr.push(accountArr[index].ACCOUNT_NO);
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
                    batch: false,
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
                columns: [{template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 100},
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
                batch: false,
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
            columns: [{template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 100},
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
    if (selInvoiceNo > 0) {
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

