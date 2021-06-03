		var sampleData = [
				{Name: "Actual CTR", Type: '100*Insert("Clicks")/Insert("Impressions")', Username: "Test1", Action: "<a class='edit btn btn-sm green' href='javascript:;' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='fa fa-times font-padding'></i> </a>"},
				{Name: "Actual CPC", Type: 'Insert("Cost")/Insert("Clicks")', Username: "Test2", Action: "<a class='edit btn btn-sm green' href='javascript:;' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='fa fa-times font-padding' title='Delete'></i> </a>"}
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
                    $("#grid1").kendoGrid({
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
                       // height: 340,
                        sortable: true,
                       // reorderable: true,
                        //groupable: true,
                        resizable: true,
                       // filterable: true,
                       // columnMenu: true,
                       // pageable: true,
                        columns: [ {
                                field: "Name",
                                title: "Column name",								
                                width: 190
                            },  {
                                field: "Type",
                                title: "Formula",								
                                width: 190
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
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_user.html'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */