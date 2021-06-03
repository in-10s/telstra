/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var pieDataCompare = [];
var barChartData = [];
var gsmMobileTotalBill = 0.0;
$(document).ready(function() {
//    loadDashboardBillCycleCombo();
//    loadPieChartData();
//    loadAccountsAuditedData();
//    loadBarChartData();
//    loadLineChartData();
    fatchServicesDetails();
    fetchTelecomExpencesBarData();
    fetchLOBSExpencesLineData();
    $(document).bind("kendo:skinChange", fetchLOBSExpencesLineData);
    fetchServicesUsagesPieData();
    $(document).bind("kendo:skinChange", fetchServicesUsagesPieData);
    $(".box").bind("change", refreshPieChard);
    fetchCostCenterBarData();
})


function fatchServicesDetails() {
    var reqData = {};
    reqData.CUST_ID = global_customer_id;
    procesRequest("fetchServiceDetails.action", reqData, fnCallbackLoadServices, fnCallbackFetchUsersFail, true);
}
function fnCallbackFetchUsersFail() {
    alert("Error came");
}
function fnCallbackLoadServices(response)
{
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var serviceData = result.objCRSResponse.data.SERVICE_DATA;
//        alert("data :" + serviceData.toSource());
        var totalDue = 0.0;
        var previousDue = 0.0;
        var totalAmount = 0.0;
//        for (var index = 0; serviceData.length > index; index++) {
//            totalDue = totalDue + parseFloat(sData[index].DUE);
//        }
//        $("#total_bill_amount_as_on_div_id").html('<span class="txt17size">J$</span>' + totalDue);
//        $("#total_bill_amount_previus_div_id").html('<span class="txt17size">J$</span>' + totalDue);
//        $("#total_bill_amount_total_div_id").html('<span class="txt17size">J$</span>' + (totalDue + totalDue));
////        $("#service_loaded_date_id").text(converDateIn_ddMonYYYY_format(new Date()));
//        $("#mobile_total_bill_amount_span_id").text('J$' + serviceData[0].DUE);
//        $("#conn_FV_total_bill_amount_span_id").text('J$' + serviceData[1].DUE);
//        $("#network_and_MC_total_bill_amount_span_id").text('J$' + serviceData[2].DUE);
        $("#mobile_total_bill_amount_span_id").text('J$ 0');
        $("#ftth_total_bill_amount_span_id").text('J$ 0');
        var invoiceDate = "";
        var tempDue = 0;
        var tempPre = 0;
        for (var index = 0; serviceData && serviceData.length > index; index++) {
            tempDue = parseFloat(serviceData[index].TOTAL_DUE ? serviceData[index].TOTAL_DUE : 0);
            tempPre = parseFloat(serviceData[index].PREVIOUS_DUE ? serviceData[index].PREVIOUS_DUE : 0);
            totalDue = totalDue + tempDue;
            previousDue = previousDue + tempPre;

            if (serviceData[index].SERVICE_ID == 1) {
                totalAmount = format1(tempDue + tempPre);
                invoiceDate = serviceData[index].INVOICE_DATE
                $("#mobile_total_bill_date_span_id").text(invoiceDate);
                $("#mobile_total_bill_amount_span_id").text('J$' + (totalAmount));
            } else if (serviceData[index].SERVICE_ID == 2) {
                totalAmount = format1(tempDue + tempPre);
                invoiceDate = serviceData[index].INVOICE_DATE
                $("#ftth_total_bill_date_span_id").text(invoiceDate);
                $("#ftth_total_bill_amount_span_id").text('J$' + (totalAmount));
            }

        }
        totalAmount=totalDue+previousDue;
//        gsmMobileTotalBill=totalAmount
        $("#total_bill_amount_as_on_div_id").html('<span class="txt17size">J$</span>' + format1(totalDue));
        $("#total_bill_amount_previus_div_id").html('<span class="txt17size">J$</span>' + format1(previousDue));
        $("#total_bill_amount_total_div_id").html('<span class="txt17size">J$</span>' + (totalAmount));
//        $("#service_loaded_date_id").text(converDateIn_ddMonYYYY_format(new Date()));
        $("#total_bill_amount_date_span_id").text(invoiceDate);

//        $("#conn_FV_total_bill_amount_span_id").text('Not Available');
//        $("#network_and_MC_total_bill_amount_span_id").text('Not Available');




    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
}

function redirectPage()
{
    fatchServicesDetails();
    fetchTelecomExpencesBarData();
    fetchLOBSExpencesLineData();
    fetchServicesUsagesPieData();
    fetchCostCenterBarData();
//    window.location.href = '../loaddashboard.action';
}
function fetchTelecomExpencesBarData() {
//    alert(global_customer_id);
    var reqData = {};
//    reqData.CUST_ID = global_customer_id;
    procesRequest("fetchTelecomSpendDetails.action", reqData, loadTelecomExpencesBarChart, fnCallbackFetchUsersFail, true);
}
function fetchLOBSExpencesLineData() {
//    alert(global_customer_id);
    var reqData = {};
//    reqData.CUST_ID = global_customer_id;
    procesRequest("fetchTrendOnLOBsDetails.action", reqData, loadTrendAcrossLOBLineChart, fnCallbackFetchUsersFail, true);
}
function fetchServicesUsagesPieData() {
//    alert(global_customer_id);
    var reqData = {};
//    reqData.CUST_ID = global_customer_id;
    procesRequest("fetchTelecomSpendDetails.action", reqData, usageAnalysisPieChart, fnCallbackFetchUsersFail, true);
}
function fetchCostCenterBarData() {
//    alert(global_customer_id);
    var reqData = {};
//    reqData.CUST_ID = global_customer_id;
    procesRequest("fetchCostCenterSpendDetails.action", reqData, loadCostCenterWiseSpendBarChart, fnCallbackFetchUsersFail, true);
}


function loadTelecomExpencesBarChart(response) {
    var telecomSpendDataArr = [];
    var telecomSpendCatArr = [];
    var maxValue = 0;
    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var sData = result.objCRSResponse.data.TELECOM_SPEND_LIST;
//        alert("data :" + sData.toSource());
        var totalDue = 0;

        var tempValue = 0;
        for (var index = 0; sData.length > index; index++) {
            tempValue = parseInt(sData[index].TOTAL_SPEND);
            if (maxValue < tempValue) {
                maxValue = tempValue;
            }
            telecomSpendDataArr.push(sData[index].TOTAL_SPEND);
            telecomSpendCatArr.push(sData[index].SERVICE_NAME);
//            totalDue = totalDue + parseFloat(sData[index].DUE);
        }

    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }
    var minValue = 0;
    if (maxValue == 0) {
        maxValue = 1000;
    }
    maxValue = Math.ceil(maxValue / 100) * 100;
    maxValue = (maxValue * 1.2);
    maxValue = Math.ceil(maxValue / 600) * 600;
    var majorUnit = Math.ceil(parseInt((maxValue - minValue) / 6) / 100) * 100;
    maxValue = Math.ceil(maxValue / 100) * 100;


    $("#dchart2").kendoChart({
        title: {
            //text: "Gross domestic product growth /GDP annual %/"
        },
        height: '400px',
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "column"
        },
        series: [{overlay: {
                    gradient: "none"
                },
                name: "Spend",
//                data: [3000, 7943, 5848],
                data: telecomSpendDataArr,
                color: "#E4002B",
            }],
        valueAxis: {
            max: maxValue,
            min: minValue,
            majorUnit: majorUnit,
            labels: {
                format: "{0}"
            },
            line: {
                visible: false
            },
            axisCrossingValue: 0
        },
        categoryAxis: {
//            categories: ['Mobile', 'Connectivity & Fixed Voice', 'Network & Managed cloud'],
            categories: telecomSpendCatArr,
            line: {
                visible: false
            },
            labels: {
                format: " "
                        //padding: {top: 135}
            }
        },
        tooltip: {
            visible: true, format: "J${0}",
            template: "#= series.name #: #= value #"
        }
    });

}

function loadTrendAcrossLOBLineChart(response) {
    var lobTreadLineChartData = [];
//    var lobTreadLineChartCategory = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var lobTreadLineChartCategory = [];

    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var lobTrendList = result.objCRSResponse.data.LOB_TREND_LIST;
//        alert("data :" + sData.toSource());
        var totalDue = 0;
//        var curServiceName = "current";
//        var lastServiceName = "last";
//        var rowData = {};
//        var intData = [];
//        for (var index = 0; lobTrendList.length > index; index++) {
//            curServiceName = lobTrendList[index].LOB_NAME;
//            if (curServiceName == lastServiceName) {
//                intData.push(parseInt(lobTrendList[index].BILL_AMOUNT));
//            } else {
//                if (index != 0) {
//                    rowData.name = lastServiceName;
//                    rowData.data = intData;
//                    if (lobTrendList[index].LOB_NAME == "GSM") {
//                        rowData.color = "#53565A";
//                    } else {
//                        rowData.color = "#E4002B";
//                    }
//                    lobTreadLineChartData.push(rowData);
//                    rowData = {};
//                    intData = [];
//                }
//            }
//            lastServiceName = curServiceName;
//        }
//        rowData.name = lastServiceName;
//        rowData.data = intData;
//        rowData.color = "#888B8D";
//        lobTreadLineChartData.push(rowData);


        var seriesDataArr = [];
        var maxAmount = 0;
        var minAmount = 0;
        var majorUnit = 1000;
        var intAmount = 0;
        if (lobTrendList.length > 0) {
            intAmount = parseInt(lobTrendList[0].BILL_AMOUNT);
            maxAmount = intAmount;
//          minAmount=intAmount;
        }

        var monthList = fnMonthArrangment();

        var lobGSMTrendList = lobTrendList[0];
        if (lobGSMTrendList.length > 0) {
            intAmount = parseInt(lobGSMTrendList[0].BILL_AMOUNT);
            maxAmount = intAmount;
//          minAmount=intAmount;

        }
        var gsmLobArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var gsmMonths = "";
        for (var index = 0; lobGSMTrendList.length > index; index++) {
            intAmount = parseInt(lobGSMTrendList[index].BILL_AMOUNT);
            if (maxAmount < intAmount) {
                maxAmount = intAmount;
            }
            gsmLobArr[monthList.indexOf(lobGSMTrendList[index].BILL_MONTH) - 1] = lobGSMTrendList[index].BILL_AMOUNT;
//            gsmLobArr.push(lobGSMTrendList[index].BILL_AMOUNT);
//          lobTreadLineChartCategory.push(lobTrendList[index].BILL_MONTH);
            gsmMonths = gsmMonths + lobGSMTrendList[index].BILL_MONTH + ",";
        }

        var lobFTTHTrendList = lobTrendList[1];
        var ftthLobArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var index = 0; lobFTTHTrendList.length > index; index++) {

            intAmount = parseInt(lobFTTHTrendList[index].BILL_AMOUNT);
            if (maxAmount < intAmount) {
                maxAmount = intAmount;
            }
//            ftthLobArr.push(lobFTTHTrendList[index].BILL_AMOUNT);
            ftthLobArr[monthList.indexOf(lobGSMTrendList[index].BILL_MONTH) - 1] = lobFTTHTrendList[index].BILL_AMOUNT;
            if (gsmMonths.indexOf(lobFTTHTrendList[index].BILL_MONTH) < 0) {
                gsmMonths = gsmMonths + lobFTTHTrendList[index].BILL_MONTH + ",";
            }

        }
        gsmMonths = gsmMonths.substring(0, (gsmMonths.length - 1));
        lobTreadLineChartCategory = gsmMonths.split(",");
//        lobTreadLineChartCategory.sort();

//         alert("MaxAmount :"+maxAmount);
//        maxAmount=(maxAmount*1.2);
//        minAmount=(minAmount*0.8);
//        alert("MaxAmount  :"+maxAmount);
        if (maxAmount == 0) {
            maxAmount = 1000;
        }
        maxAmount = Math.ceil(maxAmount / 100) * 100;
        maxAmount = (maxAmount * 1.2) * 2;
        maxAmount = Math.ceil(maxAmount / 600) * 600;
        majorUnit = Math.ceil(parseInt((maxAmount - minAmount) / 6) / 100) * 100;
//        minAmount = Math.floor(minAmount/100)*100;


        var seriesData = {};
        seriesData.name = "GSM";
        seriesData.data = gsmLobArr;
        seriesData.color = "#E4002B";
        lobTreadLineChartData.push(seriesData);
        seriesData = {};
        seriesData.name = "FTTP";
        seriesData.data = ftthLobArr;
        seriesData.color = "#53565A";
        lobTreadLineChartData.push(seriesData);
//        alert("Bill Data :" + lobTreadLineChartData.toSource());
//      alert("Months :"+lobTreadLineChartCategory.toSource());
    } else {
        showMessage("Error", "Unable to fetch user details.", 2);
    }

//    alert("TOTAL LOB DATA :"+lobTreadLineChartData.toSource());
    $("#linechart1").kendoChart({
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "line",
            missingValues: "gap",
            stack: true
        },
        series: lobTreadLineChartData,
//        series: [{
//                name: "GSM",
//                data: [830, 360, 370, 440, 470, 300, 270, 670, 250, 330, 740, 630],
//                color: "#E4002B"
//            }, {
//                name: "Digicel Play",
//                data: [600, 310, 340, 420, 740, 630, 360, 570, 440, 670, 300, 270, ],
//                color: "#53565A"
//            }, {
//                name: "Network and Cloud Services",
//                data: [300, 270, 370, 250, 630, 360, 570, 440, 670, 330, 420, 740, ],
//                color: "#888B8D"
//            }],
        valueAxis: {
            max: maxAmount,
            min: minAmount,
            majorUnit: majorUnit,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            }
        },
        categoryAxis: {
//            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            categories: monthList,
            majorGridLines: {
                visible: true
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    });
}

function usageAnalysisPieChart(response) {
    var pieChartData = [];

    var status = JSON.parse(response).objCRSResponse.status;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var serviceUsagesList = result.objCRSResponse.data.TELECOM_SPEND_LIST;
        var rowData = {};
        for (var index = 0; serviceUsagesList.length > index; index++) {
            rowData = {};
            rowData.category = serviceUsagesList[index].SERVICE_NAME;
            rowData.value = serviceUsagesList[index].TOTAL_SPEND;
            rowData.color = "#E4002B";
            pieChartData.push(rowData);
        }
    }
    $("#chart").kendoChart({
        legend: {
            position: "right"
        },
        seriesDefaults: {
            labels: {
                template: "#= kendo.format('{0:P}', percentage)#",
                position: "outsideEnd",
                visible: true,
                background: "transparent"
            }
        },
        series: [{overlay: {
                    gradient: "none"
                },
                type: "pie",
                data: pieChartData,
//                data: [{
//                        category: "Mobile",
//                        value: 45
//                    }, {
//                        category: "Connectivity & Fixed Voice",
//                        value: 30
//                    }, {
//                        category: "Network & Managed cloud",
//                        value: 25
//                    }]
            }],
        tooltip: {
            visible: true,
            template: "#= category # : #= kendo.format('{0:P}', percentage) #"
        }
    });
}

function refreshPieChard() {
    var chart = $("#chart").data("kendoChart"),
            pieSeries = chart.options.series[0],
            labels = $("#labels").prop("checked"),
            alignInputs = $("input[name='alignType']"),
            alignLabels = alignInputs.filter(":checked").val();

    chart.options.transitions = false;
    pieSeries.labels.visible = labels;
    pieSeries.labels.align = alignLabels;

    alignInputs.attr("disabled", !labels);

    chart.refresh();
}

function loadCostCenterWiseSpendBarChart(response) {
    var costCenterCategoryArr = [];
    var costCenterBarData = [];
    var status = JSON.parse(response).objCRSResponse.status;
    var maxValue = 0;
    var tempValue = 0;
    if (status == 'success' || status == true) {
        var result = JSON.parse(response);
        var costCenterList = result.objCRSResponse.data.COST_CENTER_SPEND_LIST;
        for (var index = 0; costCenterList.length > index; index++) {
            tempValue = parseInt(costCenterList[index].COST_CENTER_SPEND);
            if (maxValue < tempValue) {
                maxValue = tempValue;
            }
            costCenterCategoryArr.push(costCenterList[index].COST_CENTER_NAME);
            costCenterBarData.push(costCenterList[index].COST_CENTER_SPEND);
//            costCenterBarData.push(rowData);
        }
    }

    var minValue = 0;
    if (maxValue == 0) {
        maxValue = 1000;
    }
    maxValue = Math.ceil(maxValue / 100) * 100;
    maxValue = (maxValue * 1.2);
    maxValue = Math.ceil(maxValue / 600) * 600;
    var majorUnit = Math.ceil(parseInt((maxValue - minValue) / 6) / 100) * 100;

    var seriesName = "Cost Center wise Spend";
//    alert("Cost Center data:"+costCenterCategoryArr.toSource());
    $("#dchart3").kendoChart({
        title: {
            //text: "Gross domestic product growth /GDP annual %/"
        },
        height: '400px',
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "column"
        },
        series: [{overlay: {
                    gradient: "none"
                },
                name: seriesName,
//                data: [1200, 943, 1648, 943, 648, 1048, ],
                data: costCenterBarData,
                color: "#E4002B",
            }],
        valueAxis: {
            max: maxValue,
            min: minValue,
            majorUnit: majorUnit,
            labels: {
                format: "{0}"
            },
            line: {
                visible: false
            },
            axisCrossingValue: 0
        },
        categoryAxis: {
//            categories: ['Costcenter1', 'Costcenter2', 'Costcenter3', 'Costcenter4', 'Costcenter5', 'Costcenter6'],
            categories: costCenterCategoryArr,
            line: {
                visible: false
            },
            labels: {
                format: " "
                        //padding: {top: 135}
            }
        },
        tooltip: {
            visible: true, format: "J${0}",
            template: "#= series.name #: #= value #"
        }
    });

}



function loadAccountsByServiceForPayPopup(serviceID) {
    $("#service_cobobox_pay_now_popup_id").val(serviceID);
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
                + '<div id="PaymentAccounts1' + accountWithInvoiceArr[index].ACCOUNT_NO + '" class="panel-collapse ">'
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
                error: function(e) {
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
    if (selInvoiceNo != "-1") {
        var accountId = $("#account_cobobox_pay_now_popup_id").val();
//    var dataListGridArr=$('#divPaymentAccounts01'+accountId).data("kendoGrid").dataSource.data();
//    var invoiceArr=$('#divPaymentAccounts01'+accountId).data().kendoGrid.dataSource.view();
//    var invoiceArr=localStorage.getItem('INVOICE_DATA_SOURCE');
//    alert("grid all Data :"+global_invoiceList[1].toSource());
        var result = $.grep(global_invoiceList, function(e) {
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

function format2(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function  fnMonthArrangment() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() - 1;
    var monthArr = [{key: "JAN", value: "01"}, {key: "FEB", value: "02"}, {key: "MAR", value: "03"}, {key: "APR", value: "04"}, {key: "MAY", value: "05"}, {key: "JUN", value: "06"}, {key: "JUL", value: "07"}, {key: "AUG", value: "08"}, {key: "SEP", value: "09"}, {key: "OCT", value: "10"}, {key: "NOV", value: "11"}, {key: "DEC", value: "12"}];
    var monthList = [];
    for (var i = 0; i < 12; i++) {
        monthList.push(monthArr[month].key);
//            $('.month_with_year').append("<option value='" + monthArr[month].value + "-" + currentYear + "'>" + monthArr[month].key + " " + currentYear + "</option>");
        if (month == 0) {
            month = 12;
//                currentYear = currentYear - 1;
        }
        month = month - 1;

    }
    return monthList.reverse();

}
