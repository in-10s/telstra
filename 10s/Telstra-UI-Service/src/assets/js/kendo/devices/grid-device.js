		var sampleData = [
				{deviceName: "iPhone", serviceClass: "Apple", serviceStatus: "Apple iPhone 6", serviceType: "Mobile", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Motoe", serviceClass: "Motorola", serviceStatus: "MotoE 2nd gen", serviceType: "Mobile", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Galaxy", serviceClass: "Samsung", serviceStatus: "Sasung Galaxy", serviceType: "Tablet", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
					{deviceName: "iPhone", serviceClass: "Apple", serviceStatus: "Apple iPhone 5S", serviceType: "Mobile", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Zenfone", serviceClass: "Asus", serviceStatus: "Asus Zenfone 5", serviceType: "Mobile", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Samsung", serviceClass: "Samsung", serviceStatus: "Samsung Galaxy S3", serviceType: "Mobile", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{deviceName: "Moto", serviceClass: "Class X", serviceStatus: "MotoG", serviceType: "Mobile", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				
					{deviceName: "Moto", serviceClass: "Class X", serviceStatus: "MotoG", serviceType: "Mobile", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editDevice.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"}
				
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
                                        serviceStatus: { type: "string" },
										serviceType: { type: "string" },
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
                                title: "Equipments name",
								
                                width: 190
                            }, {
                                field: "serviceClass",
                                title: "Equipment manufacturer",
                                width: 190
                            }, {
                                field: "serviceStatus",
                                title: "Equipment model",
                                width: 180
                            },
							{
                                field: "serviceType",
                                title: "Equipment type",
                                width: 180
                            },
							 {
                                field: "Action",
                                title: "Actions",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 180
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
				
				