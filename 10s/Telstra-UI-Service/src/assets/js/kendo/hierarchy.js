		var sampleData = [
				{Costcode: "Student Living Jamaica Limited", Hierarchy: "500035663", Name: "Albert", Department: "Sales", Status: "Published", Action: " <a data-toggle='modal' href='#divMove'><i class='move_icon' title='Move'></i></a> <a href='#'><i class='delink_icon' title='Delink'></i></a> <a href='#'><i class='publish_icon' title='Publish'></i></a>"},
				
				{Costcode: "Wholesale", Hierarchy: "500035086", Name: "Hadrian", Department: "Finance", Status: "Published", Action: " <a data-toggle='modal' href='#divMove'><i class='move_icon' title='Move'></i></a> <a href='#'><i class='delink_icon' title='Delink'></i></a> <a href='#'><i class='publish_icon' title='Publish'></i></a>"},
				
				{Costcode: "21st Century Consultants Limited", Hierarchy: "500034249", Name: "Robert", Department: "Purchase", Status: "Published", Action: " <a data-toggle='modal' href='#divMove'><i class='move_icon' title='Move'></i></a> <a href='#'><i class='delink_icon' title='Delink'></i></a> <a href='#'><i class='publish_icon' title='Publish'></i></a>"},
				
				{Costcode: "21st Century Supermarket Wholesale Ltd", Hierarchy: "500030978", Name: "Guryon", Department: "Inventory", Status: "Published", Action: " <a data-toggle='modal' href='#divMove'><i class='move_icon' title='Move'></i></a> <a href='#'><i class='delink_icon' title='Delink'></i></a> <a href='#'><i class='publish_icon' title='Publish'></i></a>"},
				
				{Costcode: "360 Cloud Publications", Hierarchy: "64257458811", Name: "Hadrian", Department: "Sales", Status: "Published", Action: " <a data-toggle='modal' href='#divMove'><i class='move_icon' title='Move'></i></a> <a href='#'><i class='delink_icon' title='Delink'></i></a> <a href='#'><i class='publish_icon' title='Publish'></i></a>"},
				
				{Costcode: "365 Retail Limited", Hierarchy: "<span class='redtxt'>500035855</span>", Name: "Albert", Department: "Operational", Status: "<span class='redtxt'>Unpublished</span>", Action: " <a data-toggle='modal' href='#divMove'><i class='move_icon' title='Move'></i></a> <a href='#'><i class='delink_icon' title='Delink'></i></a> <a href='#'><i class='publish_icon' title='Publish'></i></a>"},
				
				{Costcode: "3A's Cellular", Hierarchy: "<span class='redtxt'>500033131</span>", Name: "Paolo", Department: "Sales", Status: "<span class='redtxt'>Unpublished</span>", Action: " <a data-toggle='modal' href='#divMove'><i class='move_icon' title='Move'></i></a> <a href='#'><i class='delink_icon' title='Delink'></i></a> <a href='#'><i class='publish_icon' title='Publish'></i></a>"}
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
                                        Costcode: { type: "string" },
                                        Hierarchy: {type: "celleHtml"},
                                        Name: { type: "string" },
										Department: { type: "string" },
										Status: { type: "celleHtml" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                       // height: 500,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {field: "AName", title: "Aoocunt Name", width: 200,
								 encoded: false, template: $("#checkbox_template").html()
                            }, {
                                field: "Hierarchy",
                                title: "Account Number",   width: 170,	encoded: false,
                            },  {
                                field: "Status",
                                title: "Status",   width: 140,	encoded: false,
                            },{
                                field: "Action",
                                title: "Actions",   width: 140,
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
celleHtml += "  <a data-toggle='modal' href='#divMove'><i class='editicon' title='Edit'></i> </a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */