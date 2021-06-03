		var sampleData = [
				{Accounts: "1002843", Usagetype: "Mobile", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter1", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Fixed line", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter2", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Fixed line", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter3", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Broadband", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter4", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Fixed line", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter5", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Fixed line", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter6", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Broadband", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter7", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Mobile", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter8", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Broadband", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter9", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Mobile", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter10", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Mobile", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter11", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Usagetype: "Fixed line", Subscriberno: "57467630", BillDate: "01-March-16", Costcenters: "costcenter12", Service: "Service1", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				
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
                                title: "Accounts",	
								encoded: false,
                                width: 150
                            },  {
                                field: "Usagetype",
                                title: "Usage type",
                                width: 170
                            },{
                                field: "Subscriberno",
                                title: "Subscriber no.",
                                width: 190
                            },
							{
                                field: "Costcenters",
                                title: "Cost centers",
                               width: 190
							},
							{
                                field: "Service",
                                title: "Service",
                                width: 180
							},
							{
                                field: "BillDate",
                                title: "Bill Date",
                               width: 180
							},{
                                field: "Billedunits",
                                title: "Billed units",
                                width: 180
							},{
                                field: "Total",
                                title: "Total RO",
                                width: 190
							}
                        ]
                    });
                });
				
				
			