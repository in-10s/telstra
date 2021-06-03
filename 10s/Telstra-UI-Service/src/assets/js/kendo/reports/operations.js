		var sampleData = [
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12",  Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12",Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "1002843", Fromdate: "20-02-2016", Subscriberno: "12-03-2016", Newcharges: "12.00", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				
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
                                        Fromdate: { type: "string" },
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
                                title: "Product Date",
                                width: 190
                            }, {
                                field: "Fromdate",
                                title: "From Date",
                                width: 170
                            },
							{
                                field: "Todate",
                                title: "To Date",
                               width: 190
							},
							{
                                field: "Statementdate",
                                title: "Statement Date",
                                width: 180
							},
							{
                                field: "Newcharges",
                                title: "New charges",
                               width: 180
							},{
                                field: "Totaldue",
                                title: "Total Due",
                                width: 180
							},{
                                field: "Total",
                                title: "Balance Currency",
                                width: 190
							},{
                                field: "Previoustotal",
                                title: "Previous Total",
                                width: 190
							},{
                                field: "Totalpaid",
                                title: "Total Paid",
                                width: 160
							},{
                                field: "Totaladj",
                                title: "Total Adj",
                                width: 160
							}
                        ]
                    });
                });
				
				
			