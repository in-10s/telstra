		var sampleData = [
				{Costcode: "64257458811", Hierarchy: "Costcentres\London\64257458811", Name: "Albert", Department: "Sales", Budget: "500K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "64257458812", Hierarchy: "Costcentres\London\64257458811", Name: "Hadrian", Department: "Finance", Budget: "350K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "64257458813", Hierarchy: "Costcentres\London\64257458811", Name: "Robert", Department: "Purchase", Budget: "152K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "64257458814", Hierarchy: "Costcentres\London\64257458811", Name: "Guryon", Department: "Inventory", Budget: "604K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "59257456600", Hierarchy: "Costcentres\London\64257458811", Name: "Albert", Department: "Operational", Budget: "162K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "59257456601", Hierarchy: "Costcentres\London\64257458811", Name: "Albert", Department: "Finance", Budget: "452K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "59257456602", Hierarchy: "Costcentres\London\64257458811", Name: "Paolo", Department: "Sales", Budget: "672K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "59257456603", Hierarchy: "Costcentres\London\64257458811", Name: "Randy", Department: "Operational", Budget: "985K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "37257459400", Hierarchy: "Costcentres\London\64257458811", Name: "Tabby", Department: "Sales", Budget: "675K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "37257459401", Hierarchy: "Costcentres\London\64257458811", Name: "Guryon", Department: "Inventory", Budget: "138K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "37257459402", Hierarchy: "Costcentres\London\64257458811", Name: "Robert", Department: "Purchase", Budget: "197K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "37257459403", Hierarchy: "Costcentres\London\64257458811", Name: "Hadrian", Department: "Sales", Budget: "264K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editCostCode'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"}
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
                        height: 550,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 80 }, {
                                field: "Costcode",
                                title: "Cost code",
								width: 160,
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            }, {
                                field: "Hierarchy",
                                title: "Hierarchy",width: 150,
                            }, {
                                field: "Name",
                                title: "Name",width: 140,
                            }, {
                                field: "Department",
                                title: "Department",width: 160,
                            }, {
                                field: "Budget",
                                title: "Budget",width: 140,
                            },{
                                field: "Action",
                                title: "Actions",width: 160,
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