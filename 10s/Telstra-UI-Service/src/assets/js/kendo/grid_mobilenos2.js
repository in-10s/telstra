		var sampleData2 = [
				{Date2: "707 133 354", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Karen Russell", Group: "Family", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "702 197 767", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Linda Ellis", Group: "Friends", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "701 134 564", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Heather Elliott", Group: "Global group", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "706 122 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Gregory Stanley", Group: "International", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "708 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Daniel Rios", Group: "", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "David", Group: "Project A", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Scot Karen", Group: "Project B", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Carl hooper", Group: "Family", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Johnny fields", Group: "Friends", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Austin gonzalez", Group: "Family", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Gloria garicia", Group: "International", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Madison bowman", Group: "Family", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Heather hart", Group: "Family", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Date2: "707 197 250", Time2: "00:00", Servicenumber2: "64257458811", Type: "Calls", Total: "00:00", Name: "Account14", Group: "Family", Mobilenumber2: "9845632541", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"}
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
										Mobilenumber2:{ type: "string" },
                                        Name: { type: "string" }										
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
                                field: "Mobilenumber2", width: 180,
                                title: "Mobile number",
								 encoded: false, template: $("#checkbox_template1").html()
                            }, {
                                field: "Name",
                                title: "Name",   width: 180,
                            },  {
                                field: "Servicenumber2",
                                title: "Account number",   width: 170,
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