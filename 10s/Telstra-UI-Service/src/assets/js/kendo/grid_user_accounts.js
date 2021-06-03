		var sampleData_1 = [
				{Accountname: "TESCO STORES LTD (SPARE)", Accountnumber:"8000001821", Billingsystem: "SSBS", Customername: "James Smith"},
				{Accountname: "TESCO STORES LTD (T&S)", Accountnumber:"8000001844", Billingsystem: "ARBOR", Customername: "John Bosco"},
				{Accountname: "TESCO.COM (PRS USAGE)", Accountnumber:"8000002354", Billingsystem: "SSBS", Customername: "Robert williams"},
				{Accountname: "TESCO STORES LTD (ADSL)", Accountnumber:"8000001821", Billingsystem: "PCB", Customername: "Michael clark"},
				{Accountname: "TESCO STORES LTD", Accountnumber:"8000002336", Billingsystem: "PCB", Customername: "William Joseph"},
				{Accountname: "TESCO STORES LTD (SPARE)", Accountnumber:"8000001821", Billingsystem: "SSBS", Customername: "James Smith"},
				{Accountname: "TESCO STORES LTD (T&S)", Accountnumber:"8000001844", Billingsystem: "ARBOR", Customername: "John Bosco"},
				{Accountname: "TESCO.COM (PRS USAGE-CONTACT)", Accountnumber:"8000002354", Billingsystem: "SSBS", Customername: "Robert williams"},
				{Accountname: "TESCO STORES LTD (ADSL)", Accountnumber:"8000001821", Billingsystem: "PCB", Customername: "Michael clark"},
				{Accountname: "TESCO STORES LTD", Accountnumber:"8000002336", Billingsystem: "PCB", Customername: "William Joseph"}
				];



                var sampleDataNextID = sampleData_1.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData_1.length;

                    for (var j; j < l; j++) {
                        if (sampleData_1[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#gridAccounts").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData_1);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextID++;
                                    sampleData_1.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData_1[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData_1.splice(getIndexById(e.data.ProductID), 1);
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
                                        Accountname: { type: "string" },
                                        Accountnumber: { type: "string" },
                                        Billingsystem: { type: "string" },
										Customername: { type: "string" }
                                    }
                                }
                            }
                        },
                        //height: 360,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ 
								  
								  {
                                field: "Accountname",
                                title: "Account name",
								encoded: false,
								template: $("#checkbox_template").html(),
								width: 220
                            },  {
                                field: "Accountnumber",
                                title: "Account number",
								width: 190
                            },{
                                field: "Billingsystem",
                                title: "Billing system",
								width: 190
                            }, {
                                field: "Customername",
                                title: "Customer name",
								width: 190
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