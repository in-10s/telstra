		var sampleData = [
				{TemplateName: "Template 001", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 002", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 003", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 004", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 005", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 006", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 007", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 008", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 009", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 010", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 011", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{TemplateName: "Template 012", Description: "Test Template", CreatedDate: "14-Mar-16", Action: "<a href='ViewPermission_template.html'><i class='viewicon' title='View'></i></a> <a href='EditPermission_template.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				
				
				
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
                                        TemplateName: { type: "string" },
                                        Description: { type: "string" },
                                        CreatedDate: { type: "string" },										
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                        height: 550,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [{
                                field: "TemplateName",
                                title: "Template name",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            }, {
                                field: "Description",
                                title: "Description",
                            }, {
                                field: "CreatedDate",
                                title: "Created date",
                            },{
                                field: "Action",
                                title: "Actions",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                            }
                        ]
                    });
                });
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i></a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */