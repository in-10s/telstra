		var sampleData = [
				{Accounts: "01-Mar-2017	", SubmissionDate: "13-Apr-2017", Type: "COMPANY",  Amount: "$15,502.15", Status: "Processed", Billedunits: "34523", Total : "478.695", Action: "<div class='actionslink'><a class='' href='paymentlist_view.html' title='View Bill'><i class='viewicon'></i></a></div>"}
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
                                        SubmissionDate: { type: "string" },
                                        Type: { type: "string" },
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
                                title: "Invoice Date",	
								encoded: false,
                                width: 180
                            },  {
                                field: "SubmissionDate",
                                title: "Submission Date",
                                width: 220
                            },{
                                field: "Type",
                                title: "Type",
                                width: 190
                            },
							{
                                field: "Amount",
                                title: "Amount",
                               width: 190
							},
							{
                                field: "Status",
                                title: "Status",
                                width: 180
							},
							{
                                field: "Action",
                                title: "Actions",
								encoded: false
                            }							
                        ]
                    });
                });
				
				
			