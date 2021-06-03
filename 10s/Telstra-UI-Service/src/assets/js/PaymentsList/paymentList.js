/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function loadPaymentListDetails() {

    $('#invoiceDateTdID').html(invoiceDate);
    $('#paymentTypeTdID').html(type);
    $('#submissionDateTdID').html(submissionDate);
    $('#paymentAmtTdID').html(amount);


    var ReqData = new Object();
    ReqData.type = type;
    ReqData.UniqueKey = parent.generateTocken();
    
    procesRequest("paymentListDetail.action", ReqData, loadPaymentListDetailSuccess, loadPaymentDetailListFail);

}
function loadPaymentDetailListFail() {
    alert("fail");

}
function loadPaymentListDetailSuccess(response) {

    var res = JSON.parse(response);
    if (res == null) {
        alertMessage('error', "error occurred", 'messages-container');
        return;
    }
    var paymentListDetailArr = new Object();
    paymentListDetailArr = res.objCRSResponse.data;


    var paymentListDetailSource;


    paymentListDetailSource = new kendo.data.DataSource({
        pageSize: 10,
        data: paymentListDetailArr,
        autoSync: true,
        schema: {
            model: {
                id: "countryId",
                fields: {
                    NAME: {editable: false, required: true},
                    PHONE_NUMBER: {validation: {required: true}},
                    ALLOCATION: {validation: {required: true}},
                    AMOUNT: {editable: false, nullable: true},
                    STATUS: {editable: false, nullable: true}
                }
            }
        }
    });




    $("#paymentListDetailGrid").kendoGrid({
        dataSource: paymentListDetailSource,
        pageable: true,
        sortable: true,
        resizable: true,
        columnMenu: true,
        filterable: {
            extra: false,
            operators: {
                string: {
                    equals: "="
                }
            }
        },
        columns: [{
                field: "NAME",
                title: "Name"
            }, {
                field: "PHONE_NUMBER",
                title: "Phone Number"
            }, {
                field: "ALLOCATION",
                title: "Allocation"
            },
            {
                field: "AMOUNT",
                title: "Amount"
            },
            {
                field: "STATUS",
                title: "Status"
            }
        ]
    });

}