		var sampleData1 = [
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"},
				{Servicenumber: "64257458811", Servicename: "Service1", Accountnumber: "9845632541"}
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
                                        Servicenumber: { type: "string" },
                                        Servicename: { type: "string" },
                                        Accountnumber: { type: "string" }
										
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
                                field: "Servicenumber",
                                title: "Service number",
								 encoded: false, template: $("#checkbox_template1").html()
                            }, {
                                field: "Servicename",
                                title: "Service name",
                            }, {
                                field: "Accountnumber",
                                title: "Account number",
                            }
                        ]
                    });
                });
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editServicenumber'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i></a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */