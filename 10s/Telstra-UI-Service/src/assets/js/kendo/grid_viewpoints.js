		var sampleData = [
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Sales", Group: "", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Finance", Group: "Family", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Purchase", Group: "Friends", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Inventory", Group: "Project A", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Operational", Group: "Project B", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Finance", Group: "", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Sales", Group: "Global group", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Operational", Group: "International", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Sales", Group: "675K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Inventory", Group: "138K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Purchase", Group: "197K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Costcode: "23428637423", Hierarchy: "+44 234 234 23", Name: "Company A", Department: "Sales", Group: "264K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"}
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
										Group: { type: "string" },
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
                                field: "Costcode",
                                title: "Account Number",   width: 190,
								 encoded: false, template: $("#checkbox_template").html()
                            },  {
                                field: "Name",
                                title: "Account Name",   width: 160,
                            }, {
                                field: "Hierarchy",
                                title: "Mobile Number",   width: 180,
                            },{
                                field: "Action",
                                title: "Actions",   width: 130,
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
celleHtml += "<a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */