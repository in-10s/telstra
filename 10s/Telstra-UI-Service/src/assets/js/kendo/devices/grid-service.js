		var sampleData = [
				{deviceName: "Service1", serviceClass: "General", serviceNumber: "02156845", serviceType: "John", serviceStatus: "Pending", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Service2", serviceClass: "Wireless", serviceNumber: "02156846", serviceType: "David", serviceStatus: "Approve", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Service3", serviceClass: "Data", serviceNumber: "02156847", serviceType: "Amy Evans", serviceStatus: "Pending", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
					{deviceName: "Service4", serviceClass: "General", serviceNumber: "02156848", serviceType: "Jessica Reid", serviceStatus: "Approve", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Service5", serviceClass: "Wireless", serviceNumber: "02156849", serviceType: "Johnson", serviceStatus: "Approve", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Service6", serviceClass: "Data", serviceNumber: "02156849", serviceType: "Louis Scott", serviceStatus: "Pending", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Service7", serviceClass: "General", serviceNumber: "02156850", serviceType: "Joel Mason", serviceStatus: "Approve", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				
				{deviceName: "Service8", serviceClass: "Data", serviceNumber: "02156850", serviceType: "Paul Santos", serviceStatus: "Approve", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"}
								
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
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        deviceName: { type: "string" },
                                        serviceClass: { type: "string" },
                                        serviceNumber: { type: "string" },
										serviceType: { type: "string" },
										serviceStatus: { type: "string" },
                                        Action: { 
										type: "celleHtml"										
										
										}
                                    }
                                }
                            }
                        },
                        height: 440,
                        sortable: true,
                        reorderable: true,
                        groupable: false,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "deviceName",
                                title: "Service name",
								
                                width: 190
                            }, {
                                field: "serviceClass",
                                title: "Service class",
                                width: 190
                            }, {
                                field: "serviceNumber",
                                title: "Service number",
                                width: 180
                            },
							{
                                field: "serviceType",
                                title: "Service owner name",
                                width: 180
                            },
							{
                                field: "serviceStatus",
                                title: "Status",
                                width: 120
                            },
							 {
                                field: "Action",
                                title: "Actions",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 130
                            }
                        ]
                    });
                });
				
				
				/* $(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " ";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
				
				$(".k-item").click(function(){ 
											   alert("hi");
											   $(".action").html(celleHtml)
											   });
				
						   }); */
				
				