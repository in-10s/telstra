		var VerifyPayData = [
				{ Account: "1002843", Invoice: "5642452", TotalDue: "854.000", Amount: "300.000"},
				{ Account: "1002843", Invoice: "5642460", TotalDue: "672.000", Amount: "100.000"},
				{ Account: "1002844", Invoice: "5642246", TotalDue: "657.000", Amount: "250.000"},
				{ Account: "1002844", Invoice: "5642157", TotalDue: "834.000", Amount: "10.000"},
				{ Account: "1002845", Invoice: "5642475", TotalDue: "6875.000", Amount: "3450.000"},
				{ Account: "1002845", Invoice: "5642247", TotalDue: "375.000", Amount: "750.000"},
				{ Account: "1002845", Invoice: "5642375", TotalDue: "964.000", Amount: "157.000"},
				{ Account: "1002846", Invoice: "5642157", TotalDue: "1245.000", Amount: "152.000"},
				{ Account: "1002847", Invoice: "5642365", TotalDue: "3540.000", Amount: "654.000"},
				
				
				];

                var VerifyPayDataNextID = VerifyPayData.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = VerifyPayData.length;

                    for (var j; j < l; j++) {
                        if (VerifyPayData[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divVerifyPay").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(VerifyPayData);
                                },
                                create: function (e) {
                                    e.data.ProductID = VerifyPayDataNextID++;
                                    VerifyPayData.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    VerifyPayData[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    VerifyPayData.splice(getIndexById(e.data.ProductID), 1);
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
                                        Account: { type: "string" },
										Invoice: { type: "string" },
                                        TotalDue: { type: "string" },
                                        Amount: {  type: "string"},
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
                        columns: [ {
                                field: "Account",
                                title: "Account No.",	
								width: 200
                            }, {
                                field: "Invoice",
                                title: "Invoice No.",
								width: 200
                            },{
                                field: "TotalDue",
                                title: "Total due",
								width: 200
                            }, {
                                field: "Amount",
                                title: "Amount to be paid",		
								width: 200
                            }
                        ]
                    });
                });
				
				
			