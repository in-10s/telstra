		var sampleData = [
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Failure", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12",Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "MPLS/Internet", Fromdate: "234", Subscriberno: "Selected accounts", Performedby: "Omar", prmaryemail: "omar@gmail.com", Statementdate: "omar@gmail.com", Totaldue: "36.00", Total : "32.12", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				
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
                                title: "services",	
								encoded: false,
                                width: 170
                            }, {
                                field: "Fromdate",
                                title: "No. of accounts Subscription",
                                width: 220
                            }, 
							
							{
                                field: "Subscriberno",
                                title: "Subscription type",
                                width: 190
							}, 
							
							{
                                field: "Statementdate",
                                title: "Performed date",
                                width: 190
							},							
							{
                                field: "Performedby",
                                title: "Performed by",
                                width: 190
							},
							{
                                field: "prmaryemail",
                                title: "Primary email",
                               width: 180
							},
							{
                                field: "secondaryemail",
                                title: "Secondary email",
                               width: 190
							},
							{
                                field: "comments",
                                title: "Comments",
                               width: 190
							}
                        ]
                    });
                });
				
				
			