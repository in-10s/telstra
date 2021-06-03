		var sampleData1 = [
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Friends", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Global group", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "International", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Project A", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Project B", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Friends", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "International", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "dd-mm-yyy", Time2: "00:00", Servicenumber: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Service1", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"}
				];

                var sampleDataNextID = sampleData1.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData1.length;

                    for (var j; j < l; j++) {
                        if (sampleData1[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#grid1").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData1);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextID++;
                                    sampleData1.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData1[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData1.splice(getIndexById(e.data.ProductID), 1);
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
										Date2: { type: "string" },
										Time2: { type: "string" },
                                        Servicenumber: { type: "string" },
                                        Servicename: { type: "string" },
										Group: { type: "string" },
										Total: { type: "string" },
										Type: { type: "string" },
                                        Accountnumber: { type: "string" },
										  Action: { 
										type: "celleHtml"
										
										}
										
                                    }
                                }
                            }
                        },
                        height: 483,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Date2", width: 140,
                                title: "Date",
								 encoded: false, template: $("#checkbox_template1").html()
                            },{
                                field: "Time2", width: 130,
                                title: "Time",
                            }, {
                                field: "Type",
                                title: "Type",   width: 140,
                            }, {
                                field: "Total",
                                title: "Total",   width: 140,
                            },{
                                field: "Accountnumber", width: 180,
                                title: "Mobile number",
                            },
							{
                                field: "Group",
                                title: "Group",   width: 160,
                            },{
                                field: "Action",
                                title: "Actions",   width: 140,
								encoded: false,
								attributes: {"class": "action"
								},
                            }
                        ]
                    });
                });
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editServicenumber'><i class='editicon' title='Edit'></i> </a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */