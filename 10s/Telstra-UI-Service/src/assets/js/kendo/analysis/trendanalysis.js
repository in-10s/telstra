		var sampleData = [
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "345", Performedby: "Omar", accountno: "1580978", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016", comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "345", Performedby: "Omar", accountno: "3545454", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "345", Performedby: "Omar", accountno: "3453454", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",   comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "56868688", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "1580978", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Failure", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "1580978", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "1580978", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12",Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "4543545", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "13232343", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "1580978", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "1580978", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{billmonth: "Feb 2016", services: "Fixed line", noofsub: "435", Performedby: "Omar", accountno: "1580978", billdate: "13-03-2016", Totaldue: "36.00", Total : "32.12", processdate: "13-03-2016", requesteddate: "15-03-2016",  comments : "Success", Totaladj : "0.00", Previoustotal : "32.12", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				
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
                                        billmonth: { type: "celleHtml" },
                                        services: { type: "string" },
                                        noofsub: { type: "string" },
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
                                field: "billmonth",
                                title: "Month",	
								encoded: false,
                                width: 170
                            },
							{
                                field: "noofsub",
                                title: "No. of subscription",
                                width: 210
							},
							
							{
                                field: "services",
                                title: "Service type",
                                width: 180
                            }, 
							
							 
							{
                                field: "Total",
                                title: "Usage total",
                               width: 190
							}
                        ]
                    });
                });
				
				
			