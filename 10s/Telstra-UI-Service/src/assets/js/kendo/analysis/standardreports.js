		var sampleData = [
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "78.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "48.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "58.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "34.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "78.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "87.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "34.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "78.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "56.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "76.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "123.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "20.00", Subscriberno: "57467630", BillDate: "-8.00", Costcenters: "68.00", Service: "45.00", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				
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
                            pageSize: 8,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Accounts: { type: "celleHtml" },
                                        Usagetype: { type: "string" },
                                        Subscriberno: { type: "string" },
                                        Action: { type: "celleHtml"}
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
                                field: "Accounts",
                                title: "Account No.",	
								encoded: false,
                                width: 170
                            }, {
                                field: "Subscriberno",
                                title: "Customer no.",
                                width: 190
                            }, {
                                field: "Usagetype",
                                title: "Rental (RO)",
                                width: 170
                            },
							{
                                field: "Costcenters",
                                title: "Setup fee (RO)",
                               width: 190
							},
							{
                                field: "Service",
                                title: "Local charges",
                                width: 180
							},
							{
                                field: "BillDate",
                                title: "Discounts",
                               width: 180
							},{
                                field: "Billedunits",
                                title: "Int call charges",
                                width: 180
							},{
                                field: "Total",
                                title: "Total currency",
                                width: 190
							}
                        ]
                    });
                });
				
				
			