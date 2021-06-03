		
						


		var sampleData1 = [
				{accno: "<a data-toggle='modal' href='#divContractView1'>7714799793</a>", billplan: "500", spent:"389", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7785453234</a>", billplan: "1000", spent:"1100", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7985291968</a>", billplan: "299", spent:"200", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7985157110</a>", billplan: "999 ", spent:"899", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7985425794</a>", billplan: "499", spent:"899", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>860473614</a>", billplan: "499", spent:"699", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>870640508</a>", billplan: "499", spent:"199", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>871881381</a>", billplan: "599 ", spent:"499", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>876107303</a>", billplan: "1000", spent:"800", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>876399780</a>", billplan: "1000", spent:"827", Action: "<a href='#' class='primarybt' >Upgrade</a>"}
				
				];
         var sampleData1bb = [
				{accno: "<a data-toggle='modal' href='#divContractView1'>7714799793</a>", billplan: "100", spent:"87", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7785453234</a>", billplan: "500", spent:"599", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7985291968</a>", billplan: "100", spent:"89", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7985157110</a>", billplan: "300 ", spent:"189", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>7985425794</a>", billplan: "400", spent:"351", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>860473614</a>", billplan: "300 ", spent:"189", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>870640508</a>", billplan: "400", spent:"351", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>871881381</a>", billplan: "100 ", spent:"189", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>876107303</a>", billplan: "300", spent:"351", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>876399780</a>", billplan: "100", spent:"351", Action: "<a href='#' class='primarybt' >Upgrade</a>"}
	            
				];

				var sampleData1fx = [
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376539</a>", billplan: "1500", spent:"2500", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376540</a>", billplan: "1000", spent:"1000", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376541</a>", billplan: "1299", spent:"1399", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376542</a>", billplan: "1999 ", spent:"1999", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376543</a>", billplan: "1499", spent:"1999", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376544</a>", billplan: "1499", spent:"1599", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376545</a>", billplan: "1499", spent:"799", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376545</a>", billplan: "1499 ", spent:"799", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376546</a>", billplan: "1000", spent:"800", Action: "<a href='#' class='primarybt' >Upgrade</a>"},
				{accno: "<a data-toggle='modal' href='#divContractView1'>352376547</a>", billplan: "1000", spent:"500", Action: "<a href='#' class='primarybt' >Upgrade</a>"}
				];

                var sampleDataNextID1 = sampleData1.length + 1;
				var sampleDataNextIDfx = sampleData1fx.length + 1;
                var sampleDataNextIDbb = sampleData1bb.length + 1;
                function getIndexById1(id) {

                    var idx,
                    l = sampleData1.length;

                    for (var j; j < l; j++) {
                        if (sampleData1[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
				function getIndexByIdfx(id) {

                    var idx,
                    l = sampleData1fx.length;

                    for (var j; j < l; j++) {
                        if (sampleData1fx[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
				function getIndexByIdbb(id) {

                    var idx,
                    l = sampleData1bb.length;

                    for (var j; jb < l; j++) {
                        if (sampleData1bb[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
				var onDataBound = function() {
					$('#grid_usage tr').each(function(){
						
						did = $(this).find("td:eq(2)").text();
						sid = $(this).find("td:eq(1)").text();
						lid = $(this).find("td:eq(3)").html();
						//alert(did+"  "+sid);
						 //alert($(this).find("td:last-child").html());
						if( sid > did)
						{
							//alert(did+"  "+sid);
							//alert(lid);
							//$($(this).find("td:eq(2)") ).css("color", "#A7D163");
							$($(this).find("td:eq(3)") ).remove("");
							$($(this).find("td:eq(2)") ).after("<td>&nbsp;</td>");
							
						}
						else if(sid < did){
						//$($(this).find("td:eq(2)") ).css("color", "#ED561B");	
						
							
						}
						else
						{
							//$($(this).find("td:eq(2)") ).css("color", "black");
							
							
						}
					});
						
					
				
					};
					var onDataBound1 = function() {
					$('#grid_usagefx tr').each(function(){
						
						did = $(this).find("td:eq(2)").text();
						sid = $(this).find("td:eq(1)").text();
						lid = $(this).find("td:eq(3)").html();
						//alert(did+"  "+sid);
						 //alert($(this).find("td:last-child").html());
						if( sid > did)
						{
							//alert(did+"  "+sid);
							//alert(lid);
							//$($(this).find("td:eq(2)") ).css("color", "#A7D163");
							$($(this).find("td:eq(3)") ).remove("");
							$($(this).find("td:eq(2)") ).after("<td>&nbsp;</td>");
							
						}
						else if(sid < did){
						//$($(this).find("td:eq(2)") ).css("color", "#ED561B");	
						
							
						}
						else
						{
							//$($(this).find("td:eq(2)") ).css("color", "black");
							
							
						}
					});
						
					
				
					};
					
					var onDataBound2 = function() {
					$('#grid_usagebb tr').each(function(){
						
						did = $(this).find("td:eq(2)").text();
						sid = $(this).find("td:eq(1)").text();
						lid = $(this).find("td:eq(3)").html();
						//alert(did+"  "+sid);
						 //alert($(this).find("td:last-child").html());
						if( sid > did)
						{
							//alert(did+"  "+sid);
							//alert(lid);
							//$($(this).find("td:eq(2)") ).css("color", "#A7D163");
							$($(this).find("td:eq(3)") ).remove("");
							$($(this).find("td:eq(2)") ).after("<td>&nbsp;</td>");
							
						}
						else if(sid < did){
						//$($(this).find("td:eq(2)") ).css("color", "#ED561B");	
						
							
						}
						else
						{
							//$($(this).find("td:eq(2)") ).css("color", "black");
							
							
						}
					});
						
					
				
					};
		
                $(document).ready(function() {
					
					$('#grid_usagefx').hide();
					$('#grid_usagebb').hide();
					$( "#select" ).change(function() {
					var val=$("#select" ).val();
					//alert("val "+val);
					if(val=="fixedline"){
				    //alert("fixedline");
					//alert(val);
					$('#grid_usage').hide();
					$('#grid_usagebb').hide();
					$('#grid_usagefx').show();
					
					
					}
					if(val=="broadband"){
						//alert("broadband");
					$('#grid_usagebb').show();
					$('#grid_usagefx').hide();
					$('#grid_usage').hide();
					}
					if(val=="mobility"){
						//alert("mobility");
					$('#grid_usage').show();
					$('#grid_usagefx').hide();
					$('#grid_usagebb').hide();	
					}
                    
					
                    });
                    $("#grid_usage").kendoGrid({
						 dataBound: onDataBound,
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData1);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextID1++;
                                    sampleData1.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData1[getIndexById1(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData1.splice(getIndexById1(e.data.ProductID), 1);
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
                                field: "accno",
                                title: "Service No",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "billplan",
                                title: "Mobile Plan(Mins)",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "spent",
                                title: "Usage(Mins)",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },

							{
                                field: "Action",
                                title: "Actions",
								encoded: false,
								template: "<div>#= Action #</div>"
                            }
                        ]
                    });
					$("#grid_usagebb").kendoGrid({
						 dataBound: onDataBound2,
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData1bb);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextIDbb++;
                                    sampleData1bb.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData1bb[getIndexByIdbb(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData1bb.splice(getIndexByIdbb(e.data.ProductID), 1);
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
                                field: "accno",
                                title: "Service No",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "billplan",
                                title: "Mobile Plan(Mins)",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "spent",
                                title: "Usage(Mins)",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },

							{
                                field: "Action",
                                title: "Actions",
								
								encoded: false,
								template: "<div>#= Action #</div>"
								
                            }
                        ]
                    });
					 $("#grid_usagefx").kendoGrid({
						  dataBound: onDataBound1,
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData1fx);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleDataNextIDfx++;
                                    sampleData1fx.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData1fx[getIndexByIdfx(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData1fx.splice(getIndexByIdfx(e.data.ProductID), 1);
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
                                field: "accno",
                                title: "Service No",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "billplan",
                                title: "Mobile Plan(Mins)",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },
							{
                                field: "spent",
                                title: "Usage(Mins)",
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            },

							{
                                field: "Action",
                                title: "Actions",
								
								encoded: false,
								template: "<div>#= Action #</div>"
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