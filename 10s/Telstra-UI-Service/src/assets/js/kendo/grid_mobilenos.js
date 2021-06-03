		var sampleData2 = [
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account1", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account2", Group: "Friends", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account3", Group: "Global group", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account4", Group: "International", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account5", Group: "", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account6", Group: "Project A", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account7", Group: "Project B", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account8", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account9", Group: "Friends", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account10", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account11", Group: "International", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account12", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account13", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "64257458811", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Servicename: "Account14", Group: "Family", Accountnumber: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"}
				];

                var sampleDataNextID = sampleData2.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData2.length;

                    for (var j; j < l; j++) {
                        if (sampleData2[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#grid2").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData2);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextID++;
                                    sampleData2.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData2[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData2.splice(getIndexById(e.data.ProductID), 1);
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
                                        Servicenumber2: { type: "string" },
                                        Servicename: { type: "string" }										
                                    }
                                }
                            }
                        },
                        //height: 240,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Servicenumber2", width: 180,
                                title: "Mobile Number",
								 encoded: false, template: $("#checkbox_template1").html()
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