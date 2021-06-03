		var RaiseRequestData = [
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "},
				{ Accounts: "1002843", BillDate: "01-March-16 "}
				];

                var RaiseRequestDataNextID = RaiseRequestData.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = RaiseRequestData.length;

                    for (var j; j < l; j++) {
                        if (RaiseRequestData[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divRaiseRequest").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(RaiseRequestData);
                                },
                                create: function (e) {
                                    e.data.ProductID = RaiseRequestDataNextID++;
                                    RaiseRequestData.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    RaiseRequestData[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    RaiseRequestData.splice(getIndexById(e.data.ProductID), 1);
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
                                        BillDate: { type: "string" }
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
                                title: "Account number",								
                                width: 200
                            },{
                                field: "BillDate",
                                title: "Bill date",
                               width: 190
							}
                        ]
                    });
                });
				
				
			