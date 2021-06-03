		var sampleData_1 = [
				{Name: "date", Type: "Date", Datatype: "Type1", Action: "<a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='fa fa-times font-padding'></i> </a>"},
				{Name: "cmp_name", Type: "Campaign", Datatype: "Type2", Action: "<a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='fa fa-times font-padding' title='Delete'></i> </a>"},
				{Name: "od_group", Type: "Ad group", Datatype: "Type3", Action: "<a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='fa fa-times font-padding' title='Delete'></i> </a>"},
				{Name: "impressions_cmp", Type: "Impressions", Datatype: "Type4", Action: "<a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='fa fa-times font-padding' title='Delete'></i> </a>"},
					{Name: "cmp_clicks", Type: "Clicks", Datatype: "Type3", Action: "<a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='fa fa-times font-padding' title='Delete'></i> </a>"},
				{Name: "ctr", Type: "CTR", Datatype: "Type4", Action: "<a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='fa fa-times font-padding' title='Delete'></i> </a>"}
				];

                var sampleDataNextID = sampleData_1.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData_1.length;

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
                                    e.success(sampleData_1);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextID++;
                                    sampleData_1.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData_1[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData_1.splice(getIndexById(e.data.ProductID), 1);
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
                                title: "Alias name",								
                                width: 190
                            },
							 {
                                field: "Datatype",
                                title: "Data type",								
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