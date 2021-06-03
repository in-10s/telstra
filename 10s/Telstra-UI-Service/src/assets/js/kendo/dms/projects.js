		var sampleData = [
				{Projectname: "Project 01", Owner: "John", Tasks: "16", Milestones: "3", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 02", Owner: "David", Tasks: "8", Milestones: "4", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 03", Owner: "Johnson", Tasks: "10", Milestones: "10", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 04", Owner: "Carl", Tasks: "9", Milestones: "5", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 05", Owner: "Thomas", Tasks: "3", Milestones: "16", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 06", Owner: "John", Tasks: "21", Milestones: "2", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 07", Owner: "David", Tasks: "52", Milestones: "5", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 08", Owner: "Hooper", Tasks: "31", Milestones: "7", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 09", Owner: "Juned", Tasks: "42", Milestones: "4", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 10", Owner: "James", Tasks: "6", Milestones: "1", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 11", Owner: "Jack", Tasks: "18", Milestones: "10", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 12", Owner: "Rofel", Tasks: "15", Milestones: "5", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 13", Owner: "John", Tasks: "13", Milestones: "4", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 14", Owner: "Hooper", Tasks: "12", Milestones: "2", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
				{Projectname: "Project 15", Owner: "Thomas", Tasks: "65", Milestones: "23", Action: "<div class='actionslink'><a class='btn btn-sm blue' href='view_project.html' title='View'><i class='icon-view font-padding'></i></a><a class='edit btn btn-sm green' href='editproject.html' title='Edit'><i class='icon-edit font-padding '></i></a><a class='btn btn-effect-ripple btn-sm btn-danger' href='#' title='Delete'><i class='icon-trash font-padding'></i></a></div>"},
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
                                        Projectname: { type: "string" },
                                        Owner: { type: "string" },
                                        Tasks: { type: "string" },
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
                                field: "Projectname",
                                title: "Project name",								
                                width: 240
                            }, {
                                field: "Owner",
                                title: "Owner",
                                width: 240
                            }, {
                                field: "Tasks",
                                title: "Tasks",
                                width: 190
                            }, {
                                field: "Milestones",
                                title: "Milestones",
                                width: 190
                            },{
                                field: "Action",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 180,
								
								
                            }
                        ]
                    });
                });
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_user.html'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */