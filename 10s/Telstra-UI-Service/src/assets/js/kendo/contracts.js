		var sampleData = [
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201301</a>", Description: "Fixed line", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201302</a>", Description: "International Private Leased Circuit", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201303</a>", Description: "Basic Business Broadband", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201304</a>", Description: "WiFi Service", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201305</a>", Description: "Email Hosting", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201306</a>", Description: "Internet Leased Line", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201307</a>", Description: "Multi Protocol Label Switching(MPLS)", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201308</a>", Description: "WiFi for Corporate", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201309</a>", Description: "Fixed-Mobile CPN", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMNDCP201310</a>", Description: "Mobile Business Prepaid", Expireddate:"23-04-2016", Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"}				
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
                                        ContractID: { type: "string" },
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
                                field: "ContractID",
                                title: "Contract ID",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "Description",
                                title: "Description",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "Expireddate",
                                title: "Expired date",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							
							{
                                field: "Action",
                                title: "Actions",
								encoded: false
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