		var sampleData = [
				{firstName: "John", Company: "Company name1", Department: "Department1", employeeId: "02156845", serviceOwnerEmail
: "john@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{firstName: "David", Company: "Company name2", Department: "Department2", employeeId: "02156846", serviceOwnerEmail
: "david@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{firstName: "Amy", Company: "Company name3", Department: "Department3", employeeId: "02156847", serviceOwnerEmail
: "amy@hotmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
					{firstName: "jessica", Company: "Company name4", Department: "Department4", employeeId: "02156848", serviceOwnerEmail
: "jessica@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{firstName: "Johnson", Company: "Company name5", Department: "Department5", employeeId: "02156849", serviceOwnerEmail
: "johnson@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{firstName: "Louis", Company: "Company name6", Department: "Department6", employeeId: "02156849", serviceOwnerEmail
: "louis@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},
				{firstName: "Joel", Company: "Company name7", Department: "Department7", employeeId: "02156850", serviceOwnerEmail
: "joel@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"},				
				{firstName: "Paul", Company: "Company name8", Department: "Department8", employeeId: "02156850", serviceOwnerEmail
: "paul@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='editSevice_owner.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>"}
								
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
                                        firstName: { type: "string" },
                                        Company: { type: "string" },
                                        Department: { type: "string" },
										employeeId: { type: "string" },
										serviceOwnerEmail
: { type: "string" },
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
                        groupable: false,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "firstName",
                                title: "First name",
								
                                width: 140
                            }, {
                                field: "Company",
                                title: "Company",
                                width: 150
                            }, {
                                field: "Department",
                                title: "Department",
                                width: 160
                            },
							{
                                field: "employeeId",
                                title: "Employee ID",
                                width: 150
                            },
							{
                                field: "serviceOwnerEmail",
                                title: "Service owner email",
                                width: 190
                            },
							 {
                                field: "Action",
                                title: "Actions",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 130
                            }
                        ]
                    });
                });
				
				
				/* $(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " ";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
				
				$(".k-item").click(function(){ 
											   alert("hi");
											   $(".action").html(celleHtml)
											   });
				
						   }); */
				
				