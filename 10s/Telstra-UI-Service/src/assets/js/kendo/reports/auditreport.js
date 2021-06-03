		var sampleData = [
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12",  Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12",Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "malik", Fromdate: "20-02-2016", Subscriberno: "Number deleted", Newcharges: "Action1", Todate: "13-03-2016", Statementdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", Totalpaid : "42.12", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				
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
                                title: "Performed By",	
								encoded: false,
                                width: 170
                            }, {
                                field: "Fromdate",
                                title: "Performed Date",
                                width: 190
                            }, 
							
							{
                                field: "Statementdate",
                                title: "Perform Action",
                                width: 180
							},
							{
                                field: "Newcharges",
                                title: "Action Performed",
                               width: 180
							}
                        ]
                    });
                });
				
				
			