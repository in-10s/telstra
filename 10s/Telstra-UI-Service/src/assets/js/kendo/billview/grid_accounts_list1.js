		var sampleData = [
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002843</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002844</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002845</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002846</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002847</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002848</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002849</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002850</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002851</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002852</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002853</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				{Accounts: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divAccount'>1002854</a>", Amount: "478.695", BillNo: "57467630", BillDate: "01-March-16", DueDate: "20-March-16", TotalDue : "478.695", Action: "<div class='actionslink'><a class='' href='#' title='View Bill'><i class='fa fa-file-pdf-o fa-lg'></i></a></div>"},
				
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
                    $("#gridaclist").kendoGrid({
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
                            pageSize: 5,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Accounts: { type: "celleHtml" },
                                        Amount: { type: "string" },
                                        BillNo: { type: "string" },
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
                            }
                        ]
                    });
                });
				
				
			