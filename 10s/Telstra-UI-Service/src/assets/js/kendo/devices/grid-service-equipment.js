		var sampleData = [
				{serviceNumber: "02156845", equipmentId: "00321561", deviceName: "Device name1", IMEI
: "56774500101", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceNumber: "02156824", equipmentId: "00321562", deviceName: "Device name2", IMEI
: "56774500102", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceNumber: "02156255", equipmentId: "00321563", deviceName: "Device name3", IMEI
: "56774500103", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
					{serviceNumber: "02156898", equipmentId: "00321564", deviceName: "Device name4", IMEI
: "56774500104", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceNumber: "02156867", equipmentId: "00321565", deviceName: "Device name5", IMEI
: "56774500105", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceNumber: "02156856", equipmentId: "00321566", deviceName: "Device name6", IMEI
: "56774500106", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{serviceNumber: "02156889", equipmentId: "00321567", deviceName: "Device name7", IMEI
: "56774500107", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},				
				{serviceNumber: "021568436", equipmentId: "00321568", deviceName: "Device name8", IMEI
: "56774500108", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editService_equipment.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"}

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
                                        serviceNumber: { type: "string" },
                                        equipmentId: { type: "string" },
                                        Department: { type: "string" },
										deviceName: { type: "string" },
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
                                field: "serviceNumber",
                                title: "Service number",
								
                                width: 140
                            }, {
                                field: "equipmentId",
                                title: "Equipment ID",
                                width: 150
                            }, 
							{
                                field: "deviceName",
                                title: "Device name",
                                width: 150
                            },
							{
                                field: "IMEI",
                                title: "IMEI",
                                width: 190
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
				
				