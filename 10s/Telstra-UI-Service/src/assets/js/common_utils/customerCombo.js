/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var global_customer_id = "";
$(document).ready(function() {
//    var customerComboHtml = '<div class="pull-right" style="pading-right:25px !important;">'
//            + '<ul class="right">'
//            + ' <li style="padding-top:20px !important;" >Select Customer</li>'
//            + ' <li><select id="comman_customer_combo_id" class="styled-select" style="height:30px !important; padding-top:5px !important;"> </select> </li>'
//            + ' </ul>'
//            + '</div>';
//
//    $(".breadcrump").append(customerComboHtml);
//    global_customer_id = $("#comman_customer_combo_id").val();
//    $("#comman_customer_combo_id").on("change", function() {
//        global_customer_id = $(this).val();
////        global_customer_id = $(this).text();
////        alert("customer id is:" + global_customer_id);
//        var reqData = {};
//        reqData.CUSTID = global_customer_id;
//        reqData.CUSTNAME = $(this).find("option:selected").text();
//        
//        procesRequest("selectCustomer.action", reqData, loadSelectedCustomer, fnCallbackFetchCustomerFail, false);
//
//    });
//    fetchCustomerComboData();
});
function loadSelectedCustomer() {
    redirectPage();
}
function fetchCustomerComboData() {
    var reqData = {};
    procesRequest("fetchCustomerList.action", reqData, loadCustomerData, fnCallbackFetchCustomerFail, false);
}
function loadCustomerData(response) {
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var customerArr = result.objCRSResponse.data.CUSTOMER_LIST;
    }
    var optionHtml = "";
    var customerComboObj = $("#comman_customer_combo_id").html("");
    for (var index = 0; customerArr.length > index; index++) {
        optionHtml = "<option value=" + customerArr[index].COMPANY_ID + " >" + customerArr[index].COMPANY_NAME + "</option>";
        customerComboObj.append(optionHtml);
    }
}
function fnCallbackFetchCustomerFail() {
    alert("Error Occured");
}


