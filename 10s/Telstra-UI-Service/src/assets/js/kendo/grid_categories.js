		var sampleData = [
				{Category: "Category 1", VEGcodes: "20", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 2", VEGcodes: "15", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 3", VEGcodes: "30", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 4", VEGcodes: "26", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 5", VEGcodes: "9", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 6", VEGcodes: "54", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 7", VEGcodes: "43", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 8", VEGcodes: "11", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Category: "Category 9", VEGcodes: "27", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divEditcategory'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"}
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
                            pageSize: 5,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Category: { type: "string" },
                                        VEGcodes: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                        height: 315,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Category",
                                title: "Category",
								
                                width: 190
                            }, {
                                field: "VEGcodes",
                                title: "No. of VEG codes",
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
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_user.html'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */