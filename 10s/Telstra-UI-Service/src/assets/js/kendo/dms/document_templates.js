		var sampleData = [
				{Name: "Index template 1", Permissiontemplate: "Permissiontemplate 01", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 2", Permissiontemplate: "Permissiontemplate 02", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 3", Permissiontemplate: "Permissiontemplate 03", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 4", Permissiontemplate: "Permissiontemplate 04", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 5", Permissiontemplate: "Permissiontemplate 05", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 6", Permissiontemplate: "Permissiontemplate 06", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 7", Permissiontemplate: "Permissiontemplate 07", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 8", Permissiontemplate: "Permissiontemplate 08", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 9", Permissiontemplate: "Permissiontemplate 09", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Name: "Index template 10", Permissiontemplate: "Permissiontemplate 10", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_document_templates.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_document_templates.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"}
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
                                        Permissiontemplate: { type: "string" },
                                        Createddate: { type: "string" },
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
                                width: 240
                            }, {
                                field: "Permissiontemplate",
                                title: "Permission Template",
                                width: 240
                            }, {
                                field: "Createddate",
                                title: "Created date",
                                width: 190
                            }, {
                                field: "Modifieddate",
                                title: "Modified date",
                                width: 190
                            },{
                                field: "Action",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 180,
								
								
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