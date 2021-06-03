		var sampleData = [
				{ServiceProvider: "Vodafone", AccountNumber: "525227732", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "5", InvoiceNumber: "216055001", BillDate: "11/1/2012"},
				{ServiceProvider: "Airtel", AccountNumber: "245145237", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "96", InvoiceNumber: "JEV1836", BillDate: "11/1/2012"},
				{ServiceProvider: "China Mobile", AccountNumber: "324356767", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "21", InvoiceNumber: "VDF128529090", BillDate: "11/1/2012"},
				{ServiceProvider: "America Movil", AccountNumber: "233434657", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "21", InvoiceNumber: "VDF128532433", BillDate: "11/1/2012"},
				{ServiceProvider: "Telefonica", AccountNumber: "4t3543657", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "21", InvoiceNumber: "VDF128494838", BillDate: "11/1/2012"},
				{ServiceProvider: "Axiata", AccountNumber: "534347665", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "21", InvoiceNumber: "VDF128573868", BillDate: "11/1/2012"},
				{ServiceProvider: "VimpleCom", AccountNumber: "233434657", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "21", InvoiceNumber: "VDF128449238", BillDate: "11/1/2012"},
				{ServiceProvider: "MTN Group", AccountNumber: "233434657", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "21", InvoiceNumber: "VDF128449236", BillDate: "11/1/2012"},
				{ServiceProvider: "Telenor", AccountNumber: "534347665", AccountStatus: "4", AccountType: "5", Billingaddressgroup: "21", InvoiceNumber: "VDF128619073", BillDate: "11/1/2012"}
				];

                var sampleDataNextID = sampleData.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData.length;

                    for (var j; j < l; j++) {
                        if (sampleData[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#grid").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextID++;
                                    sampleData.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData.splice(getIndexById(e.data.ProductID), 1);
                                    e.success();
                                }
                            },
                            error: function (e) {
                                // handle data operation error
                                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        ServiceProvider: { type: "string" },
                                        AccountNumber: { type: "string" },
                                        AccountStatus: { type: "string" },
                                        AccountType: { type: "string" },
                                        Billingaddressgroup: { type: "string" }
                                    }
                                }
                            }
                        },
                        height: 440,
                        sortable: true,
                        reorderable: true,
                        groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "ServiceProvider",
                                title: "Service provider",
                                width: 190
                            }, {
                                field: "AccountNumber",
                                title: "Account number",
                                width: 190
                            }, {
                                field: "AccountStatus",
                                title: "Account status",
                                width: 180
                            },{
                                field: "AccountType",
                                title: "Account type",
                                width: 180
                            },  {
                                field: "Billingaddressgroup",
								 title: "Billing address group",
                                width: 220
                            },{
                                field: "InvoiceNumber",
                                title: "Invoice number",
                                width: 180
                            },  {
                                field: "BillDate",
								title: "Bill date",
                                width: 160
                            }
                        ]
                    });
                });