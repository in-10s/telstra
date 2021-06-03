		var sampleData1 = [
				{Viewpoint: "Viewpoint 1", Hierarchy: "+44 234 234 23", Name: "<a href='#' onClick='document.getElementById('viewpoint').style.display='block';document.getElementById('default').style.display='none';return false;' class='underline'>Company A</a>", Department: "Sales", Group: "", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 2", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Finance", Group: "Family", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Purchase", Group: "Friends", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 3", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Inventory", Group: "Project A", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 4", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Operational", Group: "Project B", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 5", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Finance", Group: "", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Sales", Group: "Global group", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 6", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Operational", Group: "International", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 7", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Sales", Group: "675K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 8", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Inventory", Group: "138K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 9", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Purchase", Group: "197K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"},
				{Viewpoint: "Viewpoint 10", Hierarchy: "+44 234 234 23", Name: "<a href='#' class='underline'>Company A</a>", Department: "Sales", Group: "264K", Action: "<a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i> </a>"}
				];

                var sampleData1NextID = sampleData1.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData1.length;

                    for (var j; j < l; j++) {
                        if (sampleData1[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#grid1").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData1);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleData1NextID++;
                                    sampleData1.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData1[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData1.splice(getIndexById(e.data.ProductID), 1);
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
                                        Viewpoint: { type: "string" },
                                        Hierarchy: { type: "string" },
                                        Name: {type: "celleHtml" },
										Department: { type: "string" },
										Group: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },                     
                      //  sortable: true,
                    //    reorderable: true,
                        //groupable: true,
                     //  resizable: true,
                      //  filterable: true,
                       // columnMenu: true,
                        pageable: true,
                        columns: [  {
                                field: "Name",
                                title: "Account name",
								encoded: false
                            }, {
                                field: "Viewpoint",
                                title: "Viewpoint name"
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