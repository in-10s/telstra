		var SelectedColumnsData = [
				/*{Name: "Account Category", Category: "Mobile Level"},
				{Name: "Account Number", Category: "Account Level"},
				{Name: "Active Date", Category: "Mobile Level"},
				{Name: "Active Date", Category: "Mobile Level"},
				{Name: "BB Roaming Discount", Category: "Mobile Level"},
				{Name: "Balance Due", Category: "Account Level"},
				{Name: "Bill Amount", Category: "Account Level"},
				{Name: "Bill Date", Category: "Account Level"},
				{Name: "Bill Number", Category: "Account Level"},
				{Name: "Bill Ref No", Category: "Mobile Level"},
				{Name: "BlackBerry", Category: "Mobile Level"},
				{Name: "BlackBerry Package", Category: "Mobile Level"},
				{Name: "CPN Exist", Category: "Mobile Level"},
				{Name: "Contract Type", Category: "Account Level"},
				{Name: "Customer Name", Category: "Mobile Level"},
				{Name: "Discounts", Category: "Mobile Level"},
				{Name: "Domestic MMS", Category: "Mobile Level"},
				{Name: "Domestic SMS", Category: "Mobile Level"},*/
				
				];

                var SelectedColumnsDataNextID = SelectedColumnsData.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = SelectedColumnsData.length;

                    for (var j; j < l; j++) {
                        if (SelectedColumnsData[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divSelectedColumns").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(SelectedColumnsData);
                                },
                                create: function (e) {
                                    e.data.ProductID = SelectedColumnsDataNextID++;
                                    SelectedColumnsData.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    SelectedColumnsData[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    SelectedColumnsData.splice(getIndexById(e.data.ProductID), 1);
                                    e.success();
                                }
                            },
                            error: function (e) {
                                // handle data operation error
                                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 5,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
                                        Category: { type: "string" }                                     
                                    }
                                }
                            }
                        },
                        height: 300,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [{
                                field: "Name",
                                title: "Name",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            }, {
                                field: "Category",
                                title: "Category",
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