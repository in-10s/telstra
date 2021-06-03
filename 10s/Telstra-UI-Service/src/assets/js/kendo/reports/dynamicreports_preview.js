		var PreviewData = [
				{Name: "Account Category", Category: "Sum"},
				{Name: "Account Number", Category: "MAX"},
				{Name: "Active Date", Category: "Mobile Level"},
				{Name: "Active Date", Category: "Mobile Level"},
				{Name: "BB Roaming Discount", Category: "DISTINCT"},
				{Name: "Balance Due", Category: "AVG"},
				{Name: "Bill Amount", Category: "Account Level"},
				{Name: "Bill Date", Category: "Account Level"},
				{Name: "Bill Number", Category: "MIN"},
				{Name: "Bill Ref No", Category: "Mobile Level"},
				{Name: "BlackBerry", Category: "Mobile Level"},
				{Name: "BlackBerry Package", Category: "MIN"},
				{Name: "CPN Exist", Category: "Mobile Level"},
				{Name: "Contract Type", Category: "Account Level"},
				{Name: "Customer Name", Category: "Mobile Level"},
				{Name: "Discounts", Category: "Mobile Level"},
				{Name: "Domestic MMS", Category: "COUNT"},
				{Name: "Domestic SMS", Category: "COUNT"},
				
				];

                var PreviewDataNextID = PreviewData.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = PreviewData.length;

                    for (var j; j < l; j++) {
                        if (PreviewData[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divPreview").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(PreviewData);
                                },
                                create: function (e) {
                                    e.data.ProductID = PreviewDataNextID++;
                                    PreviewData.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    PreviewData[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    PreviewData.splice(getIndexById(e.data.ProductID), 1);
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