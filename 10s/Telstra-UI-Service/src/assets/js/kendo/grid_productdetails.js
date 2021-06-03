		var sampleData3 = [
				{Name: "Product name", Aliasname: "", Lookupcolumn: ""},
				{Name: "Product ID", Aliasname: "", Lookupcolumn: ""},
				{Name: "Product name", Aliasname: "", Lookupcolumn: ""},
				{Name: "Salary", Aliasname: "", Lookupcolumn: ""}
				];

                var sampleData3NextID = sampleData3.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData3.length;

                    for (var j; j < l; j++) {
                        if (sampleData3[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#grid3").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData3);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleData3NextID++;
                                    sampleData3.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData3[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData3.splice(getIndexById(e.data.ProductID), 1);
                                    e.success();
                                }
                            },
                            error: function (e) {
                                // handle data operation error
                                alert("Category: " + e.Category + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
                                        Aliasname: { type: "string" },
                                        Lookupcolumn: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
   
                        height: 260,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                       // filterable: true,
                        columnMenu: false,
                      //  pageable: true,
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 60 }, {
                                field: "Name",
                                title: "Column name",								
                                width: 200
                            }, {
                                field: "Aliasname",
                                title: "Alias name",
                                width: 180
                            }, {
                                field: "Lookupcolumn",
                                title: "Lookup column",
                                width: 160
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