		var sampleData = [
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "COMPLETED", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'><i class='fa fa-download fa-lg'></i></a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "PENDING", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'> </a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "PENDING", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'> </a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "PENDING", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'> </a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "COMPLETED", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'><i class='fa fa-download fa-lg'></i></a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "COMPLETED", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'><i class='fa fa-download fa-lg'></i></a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "PENDING", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'> </a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "COMPLETED", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'><i class='fa fa-download fa-lg'></i></a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "PENDING", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'> </a></div>"},
				{Service: "Mobile", RequestType: "All accounts Selected", NoOfAccounts: "10", BillMonth: "March-16", CurrentStatus: "COMPLETED", RequestedDate : "14-Mar-16", RaisedBy : "kiran",  Action: "<div class='actionslink'><a class='' href='#' title='Download Bill'><i class='fa fa-download fa-lg'></i></a></div>"},
				
				
				
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
                                        Service: { type: "string" },
                                        RequestType: { type: "string" },
                                        NoOfAccounts: { type: "string" },
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
                                field: "Service",
                                title: "Service",	
                                width: 140
                            }, {
                                field: "RequestType",
                                title: "Request type",
                                width: 190
                            }, {
                                field: "NoOfAccounts",
                                title: "No. of accounts",
                               width: 190
                            },{
                                field: "BillMonth",
                                title: "Bill month",
                                width: 140
							},{
                                field: "CurrentStatus",
                                title: "Current status",
                               width: 190
							},{
                                field: "RequestedDate",
                                title: "Requested date",
                                width: 190
							},{
                                field: "RaisedBy",
                                title: "Raised by",
                                width: 190
							},{
                                field: "Action",
								title: "Download",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 160,
                            }
                        ]
                    });
                });
				
				
			