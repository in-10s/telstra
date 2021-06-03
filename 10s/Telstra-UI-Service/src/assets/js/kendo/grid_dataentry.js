		var sampleData = [
			{Name: "Account details", DEvalues: "", DDEvalues: "", Retainvalues: "",  Successcount: "", Failure: "", Action: ""},
			{Name: "Mobile number", DEvalues: "9701414578", DDEvalues: "7/14/2015 01:05:22 PM", Retainvalues: "<input type='radio' name='radio'><label>DE</label> <input type='radio' name='radio' checked><label>DDE</label> <input type='radio' name='radio'><label>Other</label>", Failure: "0", Action: ""},
			{Name: "FSE registration date & time", DEvalues: "28/07/2015, 11:12:48", DDEvalues: "28/07/2015, 11:12:48", Retainvalues: "<input type='radio' name='radio1'><label>DE</label> <input type='radio' name='radio1' checked><label>DDE</label> <input type='radio' name='radio1'><label>Other</label>", Failure: "0", Action: ""},
			{Name: "Registration type", DEvalues: "", DDEvalues: "", Retainvalues: "<input type='radio' name='radio2'><label>DE</label> <input type='radio' name='radio2' checked><label>DDE</label> <input type='radio' name='radio2'><label>Other</label>", Failure: "1", Action: ""},
			{Name: "Circle name", DEvalues: "JK", DDEvalues: "JK", Retainvalues: "<input type='radio' name='radio3'><label>DE</label> <input type='radio' name='radio3' ><label>DDE</label> <input type='radio' name='radio3' checked><label>Other</label>", Failure: "0", Action: "<input name='Retailer number' class='width80' type='text' value='AK12457'>"},
			{Name: "Actor type", DEvalues: "", DDEvalues: "", Retainvalues: "<input type='radio' name='radio4' checked><label>DE</label> <input type='radio' name='radio4'><label>DDE</label> <input type='radio' name='radio4'><label>Other</label>", Failure: "0", Action: ""},
			{Name: "Customer type", DEvalues: "", DDEvalues: "", Retainvalues: "<input type='radio' name='radio5'><label>DE</label> <input type='radio' name='radio5' checked><label>DDE</label> <input type='radio' name='radio5'><label>Other</label>", Failure: "0", Action: ""},	
			
			{Name: "Retailer details", DEvalues: "", DDEvalues: "", Retainvalues: "",  Successcount: "", Failure: "", Action: ""},				
			{Name: "Retailer registration date & time", DEvalues: "29/07/2015 10:24:15", DDEvalues: "29/07/2015 10:24:15", Retainvalues: "<input type='radio' name='radio6'><label>DE</label> <input type='radio' name='radio6' checked><label>DDE</label> <input type='radio' name='radio6'><label>Other</label>", Failure: "0", Action: ""},
			{Name: "Retailer number", DEvalues: "AK12457", DDEvalues: "AK12457", Retainvalues: "<input type='radio' name='radio7'><label>DE</label> <input type='radio' name='radio7' checked><label>DDE</label> <input type='radio' name='radio7'><label>Other</label>", Failure: "0", Action: ""},
			
			{Name: "Retailer name", DEvalues: "Lorem", DDEvalues: "Lorem", Retainvalues: "<input type='radio' name='radio8'><label>DE</label> <input type='radio' name='radio8' checked><label>DDE</label> <input type='radio' name='radio8'><label>Other</label>", Failure: "0", Action: ""},
			
			{Name: "Distributor details", DEvalues: "", DDEvalues: "", Retainvalues: "",  Successcount: "", Failure: "", Action: ""}	,	
			
			{Name: "Distributor number", DEvalues: "45784", DDEvalues: "45784", Retainvalues: "<input type='radio' name='radio9'><label>DE</label> <input type='radio' name='radio9' checked><label>DDE</label> <input type='radio' name='radio9'><label>Other</label>", Failure: "0", Action: ""},
		
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
                            pageSize: 40,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
                                        DEvalues: { type: "string" },
                                        DDEvalues: { type: "string" },
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
                        pageable: false,
                        columns: [ {
                                field: "Name",
                                title: "Field name",								
                                width: 180,
                            },							
							{
                                field: "DEvalues",
                                title: "DE values",
                                width: 160
                            }, {
                                field: "DDEvalues",
                                title: "DDE/EC values",
                                width: 190
                            },							 					
							{
                                field: "Retainvalues",
								  title: "Retain values",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 240
                            },
							{
                                field: "Action",
								 title: "",
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