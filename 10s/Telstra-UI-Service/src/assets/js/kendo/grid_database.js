		var sampleData = [
				{Name: "12:123:6:15", Type: "LPT1", Username: "Test1", Action: "<a href='view_database.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a href='edit_database.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger' title='Delete'><i class='icon-trash font-padding'></i> </a>"},
				{Name: "12:123:6:15", Type: "LPT3", Username: "Test2", Action: "<a href='view_database.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a href='edit_database.html' class='edit btn btn-sm green'><i class='icon-edit font-padding' title='Edit'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='icon-trash font-padding' title='Delete'></i> </a>"},
				{Name: "12:123:9:22", Type: "COM1", Username: "Test3", Action: "<a href='view_database.html' class='btn btn-sm blue'><i class='icon-view font-paddin' title='View'></i></a> <a href='edit_database.html' class='edit btn btn-sm green'><i class='icon-edit font-padding' title='Edit'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='icon-trash font-padding' title='Delete'></i> </a>"},
				{Name: "12:123:2:24", Type: "COM2", Username: "Test4", Action: "<a href='view_database.html' class='btn btn-sm blue' title='View'><i class='icon-view font-paddin'></i></a> <a href='edit_database.html' class='edit btn btn-sm green' title='Edit'><i class='icon-edit font-padding'></i></a> <a href='#divDelete' class='btn btn-effect-ripple btn-sm btn-danger'><i class='icon-trash font-padding' title='Delete'></i> </a>"}
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
                    $("#databaseGrid").kendoGrid({
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
                        height: 440,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Name",
                                title: "IP address",								
                                width: 190
                            },  {
                                field: "Type",
                                title: "Port number",								
                                width: 190
                            },
							 {
                                field: "Username",
                                title: "User name",								
                                width: 190
                            },
							{headerAttributes: {

                    style: "padding: 10px 30px;"
                },
                command: [
                {
                    template: "<a  class='btn btn-sm blue' onclick = 'viewDataSource(this);'><i class='icon-view font-padding' title='View'></i></a>"
                },
                {
                    template: "<a class='edit btn btn-sm green' onclick = 'editDataSource(this)'><i class='icon-edit font-padding' title='Edit'></i></a> "
                },
                {
                    template: "<a class='btn btn-effect-ripple btn-sm btn-danger' onclick='deletePopUp(this)'><i class='icon-trash font-padding' title='Delete'></i></a>"
                }
                ],
                title:'Actions',
                width: 190
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