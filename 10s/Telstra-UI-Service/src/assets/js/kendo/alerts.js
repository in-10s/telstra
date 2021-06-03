		var sampleData = [
				{CallTo: "9876543210", CallDuration: "16:06", CallCharges: "$23.08", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "9876543454", CallDuration: "12:17", CallCharges: "$13.24", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "9876543569", CallDuration: "06:45", CallCharges: "$03.34", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "9876598760", CallDuration: "32:16", CallCharges: "$56.04", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "9876598760", CallDuration: "42:23", CallCharges: "$23.04", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "9874356210", CallDuration: "08:08", CallCharges: "$06.03", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "9834561063", CallDuration: "12:23", CallCharges: "$16.00", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "987765544", CallDuration: "11:09", CallCharges: "$12.10", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{CallTo: "9876543210", CallDuration: "13:01", CallCharges: "$12.01", CallDate: "12-2-2016", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_datasource.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"}
				];
		var sampleDataexxie

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
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
                                        CallDuration: { type: "string" },
                                        Action: { 
										type: "celleHtml"										
										}
                                    }
                                }
                            }
                        },
                        height: 440,
                        sortable: false,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
						//selectable: "row",
                        filterable: false,
                        columnMenu: false,
                        pageable: false,
                        columns: [ 
								  {
                                field: "CallTo",
                                title: "Call To",
								 width: 190
                            }, {
                                field: "CallDuration",
                                title: "Call Duration (hh:mm:sec)",
                              	 width: 190
                            }, {
                                field: "CallCharges",
                                title: "Call Charges",
                             	 width: 190
                            }, {
                                field: "CallDate",
                                title: "Call Date",
                             	 width: 190
                            }/*, {
                                field: "Action",
                                title: "Actions",
								encoded: false,
								attributes: {
									"class": "action"
									},
                                width: 180
                            }*/
                        ]
                    });
                });
				
			
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_user.html'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i></a>";	

	celleHtml += "</div>";	
			   $(".action").html(celleHtml);
			   
			   }); */