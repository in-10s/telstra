		var sampleData = [
				{serviceProvider: "Service provider1", serviceProviderName: "Name 1", serviceRegion: "Service region1", IMEI
: "56774500101", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceProvider: "Service provider2", serviceProviderName: "Name 2", serviceRegion: "Service region2", IMEI
: "56774500102", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceProvider: "Service provider3", serviceProviderName: "Name 3", serviceRegion: "Service region3", IMEI
: "56774500103", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
					{serviceProvider: "Service provider4", serviceProviderName: "Name 4", serviceRegion: "Service region4", IMEI
: "56774500104", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceProvider: "Service provider5", serviceProviderName: "Name 5", serviceRegion: "Service region5", IMEI
: "56774500105", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceProvider: "Service provider6", serviceProviderName: "Name 6", serviceRegion: "Service region6", IMEI
: "56774500106", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceProvider: "Service provider7", serviceProviderName: "Name 7", serviceRegion: "Service region7", IMEI
: "56774500107", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},				
				{serviceProvider: "Service provider8", serviceProviderName: "Name 8", serviceRegion: "Service region8", IMEI
: "56774500108", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_carrier.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"}

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
                                        serviceProvider: { type: "string" },
                                        serviceProviderName: { type: "string" },
                                        Department: { type: "string" },
										serviceRegion: { type: "string" },
										IMEI
: { type: "string" },
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
                                field: "serviceProvider",
                                title: "Service provider",
								
                                width: 140
                            }, {
                                field: "serviceProviderName",
                                title: "Service provider name",
                                width: 150
                            }, 
							{
                                field: "serviceRegion",
                                title: "Service region",
                                width: 150
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
				
				