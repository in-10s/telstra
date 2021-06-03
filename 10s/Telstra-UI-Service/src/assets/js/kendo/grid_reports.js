		var sampleData = [
				{Name: "Sales report 1", Type: "Pivot grid", Datasource: "Ipsum", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_report.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a title='Schedule' href='#scheduler' data-toggle='modal'  class='btn btn-sm blue'> <i class='fa fa-calendar  font-paddin' title='Schedule'></i></a> <a href='share_report.html' class='btn btn-sm blue' title='share'><i class='fa fa-share-alt'></i></a>  <a title='Publish' href='#Publishreport' class='btn btn-sm blue' data-toggle='modal'><i class='fa fa-arrow-up' title='Publish'></i></a>  <a title='E-mail' href='#email'  class='btn btn-sm blue' data-toggle='modal'> <i class='fa fa fa-envelope' title='E-mail'></i></a>  <a href='edit_report.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"},
				
				
				{Name: "Sales report 2", Type: "Standard grid", Datasource: "Ipsum", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_report.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a title='Schedule' href='#scheduler' data-toggle='modal'  class='btn btn-sm blue'> <i class='fa fa-calendar  font-paddin' title='Schedule'></i></a> <a href='share_report.html' class='btn btn-sm blue' title='share'><i class='fa fa-share-alt'></i></a> <a title='Publish' href='#Publishreport' class='btn btn-sm blue' data-toggle='modal'><i class='fa fa-arrow-up' title='Publish'></i></a> <a title='E-mail' href='#email'  class='btn btn-sm blue' data-toggle='modal'> <i class='fa fa fa-envelope' title='E-mail'></i></a>  <a href='edit_report.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"},
				
				{Name: "Sales report 3", Type: "Pivot grid", Datasource: "Ipsum", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_report.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a title='Schedule' href='#scheduler' data-toggle='modal'  class='btn btn-sm blue'> <i class='fa fa-calendar  font-paddin' title='Schedule'></i></a> <a href='share_report.html' class='btn btn-sm blue' title='share'><i class='fa fa-share-alt'></i></a> <a title='Publish' href='#Publishreport' class='btn btn-sm blue' data-toggle='modal'><i class='fa fa-arrow-up' title='Publish'></i></a> <a title='E-mail' href='#email'  class='btn btn-sm blue' data-toggle='modal'> <i class='fa fa fa-envelope' title='E-mail'></i></a>  <a href='edit_report.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"},
				
				{Name: "Sales report 4", Type: "Pivot grid", Datasource: "Ipsum", Description: "Lorem Ipsum Lorem Ipsum", Action: "<a href='view_report.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a title='Schedule' href='#scheduler' data-toggle='modal'  class='btn btn-sm blue'> <i class='fa fa-calendar  font-paddin' title='Schedule'></i></a> <a href='share_report.html' class='btn btn-sm blue' title='share'><i class='fa fa-share-alt'></i></a> <a title='Publish'  href='#Publishreport' class='btn btn-sm blue' data-toggle='modal'><i class='fa fa-arrow-up' title='Publish'></i></a> <a title='E-mail' href='#email'  class='btn btn-sm blue' data-toggle='modal'> <i class='fa fa fa-envelope' title='E-mail'></i></a>  <a href='edit_report.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a>  <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"}
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
                                title: "Report name",								
                                width: 190
                            },  {
                                field: "Type",
                                title: "Report name",								
                                width: 190
                            }, {
                                field: "Datasource",
                                title: "Datasource",								
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
                                width: 250
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