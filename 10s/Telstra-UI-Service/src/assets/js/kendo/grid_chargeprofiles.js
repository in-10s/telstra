		var sampleData = [{
    Name: "CP 01",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 02",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 03",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 04",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 05",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 06",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 07",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 08",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}, {
    Name: "CP 09",
    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    Action: "<a data-toggle='modal' href='#divAssign'><i class='assignicon' title='Assign'></i></a> <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"
}];

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
                                        Description: { type: "string" },                                        
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
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Name",
                                title: "Name",
								
                                width: 190
                            }, {
                                field: "Description",
                                title: "Description",
                                width: 500
                            },{
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
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_charge_profile.html'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */