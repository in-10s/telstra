		var sampleData = [
				{IP: "12:123:6:15", Port: "8080", Username: "Sysadmin", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:16", Port: "9999", Username: "Admin", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:3:15", Port: "5642", Username: "DBuser", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:4:69", Port: "6745", Username: "User1", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:120:99", Port: "2461", Username: "User2", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "2424", Username: "User3", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "3000", Username: "User4", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "1547", Username: "User5", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "8674", Username: "User6", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "3456", Username: "User7", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "9865", Username: "User8", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "7474", Username: "User9", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{IP: "12:123:6:15", Port: "2564", Username: "User10", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_database.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				
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
                                        IP: { type: "string" },
                                        Port: { type: "string" },
                                        Username: { type: "string" },										
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
                                field: "IP",
                                title: "IP address",
								 width: 190
                            }, {
                                field: "Port",
                                title: "Port number",
								width: 190
                            }, {
                                field: "Username",
                                title: "User name",
								width: 190
                            },{
                                field: "Action",
                                title: "Actions",
								width: 190,
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