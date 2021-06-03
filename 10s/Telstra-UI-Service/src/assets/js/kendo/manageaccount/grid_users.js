		var sampleData = [
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				{UserName: "corey_robert", FirstName: "Corey", EmailID: "Corey@gmail.com", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='EditUsers.html'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a> <a data-toggle='modal' href='#divLock'><i class='lockicon' title='Lock'></i></a> <a data-toggle='modal' href='#divReset'><i class='reseticon' title='Reset'></i></a>"},
				
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
                                        UserName: { type: "string" },
                                        FirstName: { type: "string" },
                                        EmailID: { type: "string" },										
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
                                field: "UserName",
                                title: "User name",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            }, {
                                field: "FirstName",
                                title: "First name",
                            }, {
                                field: "EmailID",
                                title: "Email ID",
                            },{
                                field: "Action",
                                title: "Actions",
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