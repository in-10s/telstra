		var sampleData = [
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201301</a>", Description: "Fixed line", Expireddate:"16-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201302</a>", Description: "International Private Leased Circuit", Expireddate:"18-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201303</a>", Description: "Basic Business Broadband", Expireddate:"18-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201304</a>", Description: "WiFi Service", Expireddate:"19-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201305</a>", Description: "Email Hosting", Expireddate:"21-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201306</a>", Description: "Internet Leased Line", Expireddate:"21-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201307</a>", Description: "Multi Protocol Label Switching(MPLS)", Expireddate:"18-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201308</a>", Description: "WiFi for Corporate", Expireddate:"20-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201309</a>", Description: "Fixed-Mobile CPN", Expireddate:"20-05-2016"},
				{ContractID: "<a data-toggle='modal' href='#divContractView'>OMCDCP201310</a>", Description: "Mobile Business Prepaid", Expireddate:"19-05-2016"}
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
                    $("#grid_contracts").kendoGrid({
						
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
                            pageSize: 5,
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
                        height: 400,
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
								
								 encoded: false/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "Description",
                                title: "Description",
								
								 encoded: false/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "Expireddate",
                                title: "Expiry Date",
								
								 encoded: false/* template: $("#checkbox_template").html()*/
                            }

							
                        ]
                    });
                });

		