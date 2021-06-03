


var sampleData = [
				{ccId: 1, Classname: "costCentre", Name: "My Account",  Budget: "3000.000", ReportsTo: null},
				{ccId: 2, Classname: "costCentre", Name: "Test 123", Budget: "400", ReportsTo: 1},
				{ccId: 3, Classname: "costcode", Name: "64257458811", Budget: "650", ReportsTo: 2},
				{ccId: 4, Classname: "account", Name: "3654214",  Budget: "240", ReportsTo: 3},
				{ccId: 5, Classname: "account", Name: "3754841",  Budget: "300", ReportsTo: 3},
				{ccId: 6, Classname: "costCentre", Name: "Test XZY", Budget: "920", ReportsTo: 1},
				{ccId: 7, Classname: "costcode", Name: "75846841458", Budget: "450", ReportsTo: 6},
				{ccId: 8, Classname: "account", Name: "2415752",  Budget: "300", ReportsTo: 7},
				{ccId: 9, Classname: "account", Name: "7548412",  Budget: "150", ReportsTo: 7},
				{ccId: 10, Classname: "costcode", Name: "75846841458", Budget: "450", ReportsTo: 1},
				{ccId: 11, Classname: "account", Name: "2415752",  Budget: "300", ReportsTo: 10},
				{ccId: 12, Classname: "account", Name: "7548412",  Budget: "150", ReportsTo: 10}
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
               // var service = "http://demos.telerik.com/kendo-ui/service";

                $("#treelist").kendoTreeList({
											 
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
                        schema: {
                            model: {
                                id: "ccId",
                                fields: {
                                    parentId: { field: "ReportsTo",  nullable: true },
                                    ccId: { field: "ccId", type: "number" },
                                    //Extension: { field: "Extension", type: "number" }
                                },
                                expanded: true
                            }
                        }
                    },
                    height: 540,
                    filterable: true,
                    sortable: true,
                    columns: [
                        { field: "Name", title: "Name", encoded: false, template: $("#checkbox_template").html(), width: 320  },
                        //{ field: "Manager", title: "Manager", width: 190},
                        { field: "Budget", width: 190 }
                        
                    ]
					
                });				
            });