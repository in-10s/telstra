		var PaymentAccountsData01 = [
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"},
				{ Accounts: "1002843", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16 ", DueDate: "20-March-16",  TotalDue: "478.695"}
				];

                var PaymentAccountsData01NextID = PaymentAccountsData01.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = PaymentAccountsData01.length;

                    for (var j; j < l; j++) {
                        if (PaymentAccountsData01[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divPaymentAccounts01").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(PaymentAccountsData01);
                                },
                                create: function (e) {
                                    e.data.ProductID = PaymentAccountsData01NextID++;
                                    PaymentAccountsData01.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    PaymentAccountsData01[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    PaymentAccountsData01.splice(getIndexById(e.data.ProductID), 1);
                                    e.success();
                                }
                            },
                            error: function (e) {
                                // handle data operation error
                                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 5,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Accounts: { type: "string" },
                                        Amount: { type: "string" },
                                        BillNo: { type: "string" },
                                        //Action: { type: "celleHtml"}
                                    }
                                }
                            }
                        },
                        /*height: 440,*/
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 100 }, {
                                field: "Accounts",
                                title: "Invoice No.",								
                                width: 200
                            }, {
                                field: "Amount",
                                title: "Amount",
                                width: 140
                            }, {
                                field: "BillNo",
                                title: "Bill No.",
                                width: 190
                            },{
                                field: "BillDate",
                                title: "Bill Date",
                               width: 190
							},{
                                field: "DueDate",
                                title: "Due Date",
                                width: 190
							},{
                                field: "TotalDue",
                                title: "Total Due",
                                width: 190
							}
                        ]
                    });
                });
				
				
			