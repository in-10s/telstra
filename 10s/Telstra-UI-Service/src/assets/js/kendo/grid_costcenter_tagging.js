		var sampleData = [
				{Costcode: "702 123 231", Hierarchy: "Heather hart", Name: "Albert", Department: "Sales", Budget: "150,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "702 123 231", Hierarchy: "Gloria garicia", Name: "Hadrian", Department: "Finance", Budget: "200,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "702 123 231", Hierarchy: "Austin gonzalez", Name: "Robert", Department: "Purchase", Budget: "100,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "702 123 231", Hierarchy: "Johnny fields", Name: "Guryon", Department: "Inventory", Budget: "100,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "702 123 231", Hierarchy: "Madison bowman", Name: "Albert", Department: "Operational", Budget: "100,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "702 123 231", Hierarchy: "64257458811", Name: "Albert", Department: "Finance", Budget: "100,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "702 123 231", Hierarchy: "64257458811", Name: "Paolo", Department: "Sales", Budget: "150,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "702 123 231", Hierarchy: "64257458811", Name: "Hadrian", Department: "Sales", Budget: "100,00", Action: " <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"}
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
                                        Hierarchy: { type: "string" },
                                        Name: { type: "string" },
										Department: { type: "string" },
										Budget: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                        height: 500,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Type",
                                title: "Type",   width: 200,
								 encoded: false, template: $("#checkbox_template").html()
                            }, {
                                field: "Hierarchy",
                                title: "Mobile name",   width: 170,
                            },  {
                                field: "Budget",
                                title: "Budget",   width: 140,
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
celleHtml += "  <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i> </a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */