		var sampleData = [
				{Name: "<a href='details.html'>5264311727</a>", Mobilenum: "7889455690", Retailer: "T1047223569", Distributor: "4256372235", Customerf: "John", Successcount: "1", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264312342</a>", Mobilenum: "8485860044", Retailer: "H104756238", Distributor: "2546895686", Customerf: "John", Successcount: "1", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264311667</a>", Mobilenum: "8485860030", Retailer: "G745178945", Distributor: "1246895667", Customerf: "John", Successcount: "2", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264311786</a>", Mobilenum: "6566670031", Retailer: "A741578944", Distributor: "7286895634", Customerf: "David", Successcount: "0", Failure: "1", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264311864</a>", Mobilenum: "9393930007", Retailer: "G104756238", Distributor: "4256895655", Customerf: "John", Successcount: "1", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264311958</a>", Mobilenum: "8510365669", Retailer: "A784562146", Distributor: "7546895634", Customerf: "John", Successcount: "1", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264311268</a>", Mobilenum: "8510356892", Retailer: "J876637799", Distributor: "5746895876", Customerf: "David", Successcount: "1", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264311486</a>", Mobilenum: "8510365539", Retailer: "J876637699", Distributor: "6236637645", Customerf: "John", Successcount: "0", Failure: "1", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
				{Name: "<a href='details.html'>5264311948</a>", Mobilenum: "8510368592", Retailer: "J876637499", Distributor: "6546895983", Customerf: "John", Successcount: "1", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
					{Name: "<a href='details.html'>8664311356</a>", Mobilenum: "8510345572", Retailer: "J876637499", Distributor: "3446895879", Customerf: "John", Successcount: "1", Failure: "0", Action: "<a href='#'><i class='messsage_ic' title='comments'></a>"},
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
                                alert("Customerf: " + e.Customerf + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
                                        Mobilenum: { type: "string" },
                                        Retailer: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                        height: 480,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 70 },
								  {
                                field: "Name",
                                title: "Job title",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 150
                            }, {
                                field: "Mobilenum",
                                title: "Mobile number",
                                width: 180
                            }, {
                                field: "Retailer",
                                title: "Retailer number",
                                width: 190
                            }, {
                                field: "Distributor",
                                title: "Distributor number",
                                width: 190
                            }, {
                                field: "Customerf",
                                title: "Customer first name",
                                width: 150
                            },{
                                field: "Action",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 180
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