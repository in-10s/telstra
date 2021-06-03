		var sampleData = [
				{Name: "Data source 1", Type: "Database 1", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_datasource.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a href='share_datasource.html' class='btn btn-sm blue' title='share'><i class='icon-share'></i></a>  <a href='edit_datasource.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"},
				
				{Name: "Data source 2", Type: "Database 2", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_datasource.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a href='share_datasource.html' class='btn btn-sm blue' title='share'><i class='icon-share'></i></a> <a href='edit_datasource.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"},
				
				{Name: "Data source 3", Type: "Database 3", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_datasource.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a href='share_datasource.html' class='btn btn-sm blue' title='share'><i class='icon-share'></i></a> <a href='edit_datasource.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"},
				
				{Name: "Data source 4", Type: "Database 4", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_datasource.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a href='share_datasource.html' class='btn btn-sm blue' title='share'><i class='icon-share'></i></a> <a href='edit_datasource.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"}
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
                                title: "Datasource name",								
                                width: 190
                            },  {
                                field: "Type",
                                title: "Datasource type",								
                                width: 190
                            },
							{
                                field: "Description",
                                title: "Description",
                                width: 190
                            }, {
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