		var sampleData = [
				{Name: "Customer 1", Vat: "20%", Monthlyplan: "30.00", Communications: "15.00", Total: "145.00", Amount: "0000,00", Vatin: "23428637423", Action: "<i class='pending_ic' title='Pending'></i> <span class='pad5T'>Pending</span>"},
				{Name: "Customer 2", Vat: "20%", Monthlyplan: "30.00", Communications: "15.00", Total: "145.00", Amount: "0000,00", Vatin: "23428637424", Phone: "9876543210", Email: "Test@test.com", Action: "<i class='processed_ic' title='Processed'></i> <span class='pad5T'>Processed</span>"},
				{Name: "Customer 3", Vat: "20%", Monthlyplan: "30.00", Communications: "15.00", Total: "145.00", Amount: "0000,00", Vatin: "23428637425", Phone: "9876543210", Email: "Test@test.com", Action: "<i class='pending_ic' title='Pending'></i> <span class='pad5T'>Pending</span>"},
				{Name: "Customer 4", Vat: "20%", Monthlyplan: "30.00", Communications: "15.00", Total: "145.00", Amount: "0000,00", Vatin: "23428637426", Phone: "9876543210", Email: "Test@test.com", Action: "<i class='processed_ic' title='Processed'></i> <span class='pad5T'>Processed</span>"},
				{Name: "Customer 8", Vat: "20%", Monthlyplan: "30.00", Communications: "15.00", Total: "145.00", Amount: "0000,00", Vatin: "23428637427", Phone: "9876543210", Email: "Test@test.com", Action: "<i class='pending_ic' title='Pending'></i> <span class='pad5T'>Pending</span>"},
				{Name: "Customer 8", Vat: "20%", Monthlyplan: "30.00", Communications: "15.00", Total: "145.00", Amount: "0000,00", Vatin: "23428637428", Phone: "9876543210", Email: "Test@test.com", Action: "<i class='pending_ic' title='Pending'></i> <span class='pad5T'>Pending</span>"}
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
                                        Name: { type: "string" },
										Vat: { type: "string" },
										Monthlyplan: { type: "string" },
                                        Total: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                       
                       // sortable: true,
                       // reorderable: true,
                       // groupable: true,
                       // resizable: true,
                       // filterable: true,
                       // columnMenu: true,
                       // pageable: true,
                        columns: [ {
                                field: "Vatin",
                                title: "Account number",								
                                width: 160
                            }, {
                                field: "Vat",
                                title: "Vat",								
                                width: 90
                            }, {
                                field: "Monthlyplan",
                                title: "Monthly plan",								
                                width: 110
                            },  {
                                field: "Service",
                                title: "Service1",								
                                width: 90
                            },  {
                                field: "Communications",
                                title: "Communications",								
                                width: 140
                            },   {
                                field: "Addcharges",
                                title: "Additional charges",								
                                width: 150
                            },  {
                                field: "Discounts",
                                title: "Discounts",								
                                width: 90
                            }, {
                                field: "Total",
                                title: "Total",								
                                width: 110
                            }/*{
                                field: "Action",
                                title: "Status",
								encoded: false,
								attributes: {"class": "action"},
                                width: 150
                            }*/
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