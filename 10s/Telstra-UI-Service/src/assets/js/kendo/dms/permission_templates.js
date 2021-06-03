		var sampleData = [
				{Permissiontemplate: "Permission template 1", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 2", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 3", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 4", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 5", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 6", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 7", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 8", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 9", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 11", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Permissiontemplate: "Permission template 12", Owner: "John", Createddate: "16-4-2015", Modifieddate: "12-6-2015", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_permissiontemplate.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='edit_permissiontemplate.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
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
                                        Permissiontemplate: { type: "string" },
                                        Owner: { type: "string" },
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
                                field: "Permissiontemplate",
                                title: "Permission template",								
                                width: 240
                            }, {
                                field: "Owner",
                                title: "Owner",
                                width: 140
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