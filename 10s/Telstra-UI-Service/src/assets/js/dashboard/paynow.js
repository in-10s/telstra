var renderDivId='';
var gridData={};
var paymentAllocationGrid;
var checkeRows =[];
function getGrid(divId){

    if(divId == ""){
        return null;
    }
    renderDivId=divId;
    
    paymentAllocationGrid=$("#"+divId).kendoGrid({
        pageable: true,
        scrollable: true,
        dataSource: {
            data: gridData,
            groupable:true,
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
//        height: 500,
        autoBind: false,
        sortable: true,
        reorderable: true,
        id:'gridId',
        resizable: true,
        columnMenu: true,
        dataBound:permit_gridDataBound,
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
        },  {
            field: "INVOICE_NUMBER",
            title: "Invoice Number",
            width: "auto"
        },{
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
        //        {
        //            field: "GCT_AMOUNT",
        //            title: "GCT Amount"
        //        },
        //        {
        //            field: "TOTAL_AMOUNT",
        //            title: "Total Amount"
        //        },
        {
            field: "ALLOCATION",
            title: "Allocation",
            encoded: false,
            template:$("#allocation-template").html()
        }	
        ],
        filterable: {
            extra: false,
            operators: {
                string: {
                    equals:"="
                //neq: "!="
                },
                number:{
                    eq: "=",
                    gt: "Greater than",
                    lt: "less than"
                },
                date:{
                    on: "on",
                    before:"before",
                    after:"after"
                }
            }
        }
    }).data("kendoGrid");

//paymentAllocationGrid.table.on("click", ".checkbox1", onAllAccGridRowSelect);
}

//on dataBound event restore previous selected rows:
function permit_gridDataBound(arg) {
    kendo.ui.progress( $("#grid>div.k-grid-content"), false);
    if(arg.sender._data.length == 0){
        var colCount = $("#grid").find('.k-grid-header colgroup > col').length;
        $("#grid").find('.k-grid-content tbody')
        .append('<tr class="kendo-data-row"><td colspan="' +
            colCount +'" style="text-align:center"><b>No records found</b></td></tr>');
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

$(document).ready(function () {
    getGrid("grid");
    //    fnLoadManagePaymentGrid();
    
    $("#checkAll").change(function () {
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
    
    $("#transfer-date").kendoDatePicker({
        value: new Date(),
        dateInput: true,
        format: "dd-MMM-yy"
    });
    $("#cheque-date").kendoDatePicker({
        value: new Date(),
        dateInput: true,
        format: "dd-MMM-yy"
    });
    $("#invoice-date").kendoDatePicker({
        value: new Date(),
        dateInput: true,
        format: "dd-MMM-yy"
    });
});//end of document ready

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

function fnCalculatePaymentAmount(){
    var paymentAmount =0;
    for(var i=0; i<gridData.length; i++){
        paymentAmount+=parseInt(gridData[i].AMOUNT);
    }
    return paymentAmount;
}

function fnLoadManagePaymentGrid(){
    var reqParams={};
    reqParams.SERVICE_TYPE = $("#service").val();
    reqParams.INVOICE_DATE = $("#invoice-date").val();
    procesRequest("loadManagePaymentGrid.action",reqParams,loadManagePaymentGridSuccess, loadManagePaymentGridFail);
}
function loadManagePaymentGridSuccess(response){
    response = evaluate(response);
    //    response =  eval("(" + response + ")");  
    if(response.objCRSResponse.success){
        gridData = response.objCRSResponse.data;
        if(gridData.length>0){
            var paymentAmount = fnCalculatePaymentAmount();
//            $("#payment-amount").html("J$-"+paymentAmount);
        }else{
//            $("#payment-amount").html("");
        }
        $("#"+renderDivId).data("kendoGrid").dataSource.data(gridData);
    }else{
        showMessage("Error","loading grid failed!",3);
        $("#"+renderDivId).data("kendoGrid").dataSource.data({});
    }
   
}
function loadManagePaymentGridFail(error){
    showMessage("Error","loading grid failed!",3);               
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
            
function evaluate(str){
                
    if(str == "" || str == null){
        return "";
    }
                
    str =str.replaceAll("\\\\", "\/");
    str =str.replaceAll("&quot;", "\"");
    str = str.replaceAll("\n","");
    str = str.replaceAll("\\r","");       
    
    var respData =  eval("(" + str + ")");  
    
    return respData;
}

function fnGotoPaymentMethod(){
    var allocatedPayments=[];
    allocatedPayments = checkeRows;
    if(allocatedPayments.length > 0){
        //        var reqParams ={};
        //        reqParams.ALLOCATED_PAYMENTS=allocatedPayments;
        //        var jsonString=JSON.stringify(reqParams);
        //        var jsonEncrypt=encrypt(jsonString);
        //        window.location.href="paymentMethod.action?reqData="+jsonEncrypt;
        fnCalculateAllocatedAmount();
        return true;
    }else{
        showMessage("Error","Please allocate payment",3);      
        return false;
    }
}

function fnSearchRecordPayment(){
    var searchField ={};
    searchField.INVOICE_DATE=$("#invoice-date").val();
    searchField.PAYMENT_BY=$("#payment-by").val();
    searchField.DEPARTMENT=$("#department").val();
    searchField.PARENT_BAN=$("#parent-ban").val();
    searchField.PAYMENT_ON= $("input[name='payment-on']:checked").val();
    var reqParams={};
    reqParams.SEARCH_FIELDS=searchField;
    reqParams.SERVICE_TYPE = $("#service").val();
//    reqParams.COMPANY_ID =global_customer_id;
    debugger;
    procesRequest("searchRecordPayment.action",reqParams,SearchRecordPaymentSuccess, SearchRecordPaymentFail);
}

function SearchRecordPaymentSuccess(response){
    debugger;
    response = evaluate(response);
    if(response.objCRSResponse.success){
        gridData = response.objCRSResponse.data;
        if(gridData.length>0){
            var paymentAmount = fnCalculatePaymentAmount();
//            $("#payment-amount").html("J$-"+paymentAmount);
        }else{
//            $("#payment-amount").html("");
        }
        $("#"+renderDivId).data("kendoGrid").dataSource.data(gridData);
        checkeRows=[];
    }else{
        showMessage("Error","loading grid failed!",2);
        $("#"+renderDivId).data("kendoGrid").dataSource.data({});
    }
}

function SearchRecordPaymentFail(response){
    showMessage("Error","loading grid failed!",2);
}

function fnReloadManagePaymentGrid(){
 fnLoadManagePaymentGrid();
}

$("#filterMobileNo").click(function () {
    $("#"+renderDivId).data("kendoGrid").dataSource.data(gridData);
    checkeRows=[];
    var $filter = new Array();
    var $x = $("#mobile-number").val();
    if ($x) {
        $filter.push({
            field:"PHONE_NUMBER", 
            operator:"contains", 
            value:$x
        });
    }
    $("#"+renderDivId).data("kendoGrid").dataSource.filter($filter);
    //        var allocatedPayments = paymentAllocationGrid.dataSource.data();
    //        var allocatedPayments = paymentAllocationGrid.dataSource.view();
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var allocatedPayments = query.filter(filters).data;
    var paymentAmount=0;
        
    for(var index=0; index<allocatedPayments.length; index++){
        paymentAmount=paymentAmount+parseFloat(allocatedPayments[index].ALLOCATION);
    }
//    $("#payment-amount").html("J$-"+paymentAmount.toFixed(2));
});
function fnUpdateAmtInDataItem(element){
    var row = $(element).closest('tr');
    var  grid = $("#grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var amountToUpdate =$(element).val();
    dataItem.set("ALLOCATION", amountToUpdate);
}

function fnUpdateAllocateAmount(){
    var amountToUpdate;
    var allocationAmountType = $("input[name='allocationAmountType']:checked").val();
    var row;
    var grid;
    var dataItem;
    var gridFilteredData = paymentAllocationGrid.dataSource.view();
    for(var index=0; index<gridFilteredData.length; index++){
        row = $("#" + gridFilteredData[index].SNO).closest('tr');
        grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem(row);
        if(allocationAmountType =="enterAmount"){
            amountToUpdate=$("#amountToUpdate").val();
            //            row.find(".allocation-amount").val(amountToUpdate);
            dataItem.set("ALLOCATION", amountToUpdate);
        }else{
            amountToUpdate=dataItem.TOTAL_AMOUNT;
            //            row.find(".allocation-amount").val(amountToUpdate);
            dataItem.set("ALLOCATION", amountToUpdate);
        }
    }
}

$(document).ready(function() {

    $("select").change(function() {
        $("select option:selected").each(function() {
            if ($(this).attr("value") == "directdeposit") {
                $(".paymentbox").hide();
                $(".directdeposit").show();
            }
            if ($(this).attr("value") == "online") {
                $(".paymentbox").hide();
                $(".online").show();
            }
            if ($(this).attr("value") == "cheque") {
                $(".paymentbox").hide();
                $(".cheque").show();
            }
            if ($(this).attr("value") == "choose") {
                $(".paymentbox").hide();
                $(".choose").show();
            }
        });
    }).change();
});
            
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function fnCalculateAllocatedAmount(){
    var paymentAmount = 0;
    for (var index = 0; index < checkeRows.length; index++) {
        paymentAmount = paymentAmount + parseFloat(checkeRows[index].ALLOCATION);
    }
    $("#paymentAmount").html(paymentAmount.toFixed(2));
}
function fnMakePayment() {
    var paymentMethod=$("#payment-method").val();
    var payment = {};
    payment.PAY_METHOD = paymentMethod;
    payment.BANK_NAME = $("#bank").val();
    payment.TRANSFER_DATE = $("#transfer-date").val();
    payment.CONFIRMATION_ID = $("#confirmation-id").val();
    payment.CHEQUE_DATE = $("#cheque-date").val();
    payment.CHEQUE_NUMBER = $("#cheque-no").val();
    payment.AMOUNT = $("#paymentAmount").html();
//    payment.COMPANY_ID = global_customer_id;
    payment.LOB = $("#service").val();
    payment.INVOICE_DATE = $("#invoice-date").val();
    
    if(paymentMethod=="directdeposit"){
        payment.PROCESSED_DATE = $("#transfer-date").val();
    }else   if(paymentMethod=="cheque"){
        payment.PROCESSED_DATE = $("#cheque-date").val();
    }else{
        payment.PROCESSED_DATE = $("#transfer-date").val();
    }
   
    if(isValidPayment(payment)){        
        var reqParams = {};
        reqParams.PAYMENT = payment;
        reqParams.ALLOCATED_PAYMENT = checkeRows;
        var url;
        if(pageName=="Dashboard"){
            url="makePaymentDashboard.action"
        }else
        {
            url="makePaymentBillView.action"   
        }
        gotoAction(url,reqParams);
    }
}

function gotoAction(url,reqParams){
    var form=document.createElement('FORM');
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

function isValidPayment(payment){
    if(payment.PAY_METHOD=="choose"){
        showMessage("Warning","Please select payment method",3);
        return false;
    }else if(payment.PAY_METHOD=="directdeposit"){
        if(payment.BANK_NAME==""){
            showMessage("Warning","Please select bank",3);
            return false;
        }
        if(payment.PROCESSED_DATE==""){
            showMessage("Warning","Please select transfer date",3);
            return false;
        }
        if(payment.CONFIRMATION_ID==""){
            showMessage("Warning","Please enter confirmation id",3);
            return false;
        }
    }else   if(payment.PAY_METHOD=="cheque"){
        if(payment.PROCESSED_DATE==""){
            showMessage("Warning","Please select checque date",3);
            return false;
        }
        if(payment.CHEQUE_NUMBER==""){
            showMessage("Warning","Please enter checque number",3);
            return false;
        }
               
    }else if(payment.PAY_METHOD=="online"){
    //TODO
    }            
    return true;
}