		var sampleData = [
				{Num: "11 Jul 2015", Name: "2712", Aliasname: "9337", Lookupcolumn: "6132", Kidsbikes: "7741", Totalcost: "5922"},
				{Num: "13 Jul 2015", Name: "7237", Aliasname: "3896", Lookupcolumn: "1021", Kidsbikes: "3786", Totalcost: "5132"},
				{Num: "14 Jul 2015", Name: "9148", Aliasname: "5897", Lookupcolumn: "4118", Kidsbikes: "4581", Totalcost: "2355"},
				{Num: "15 Jul 2015", Name: "1684", Aliasname: "3373", Lookupcolumn: "2411", Kidsbikes: "8482", Totalcost: "1834"},
				{Num: "17 Jul 2015", Name: "9816", Aliasname: "1535", Lookupcolumn: "1331", Kidsbikes: "1326", Totalcost: "3371"},
				{Num: "18 Jul 2015", Name: "1653", Aliasname: "2647", Lookupcolumn: "5569", Kidsbikes: "7503", Totalcost: "2252"},
				{Num: "19 Jul 2015",  Name: "9148", Aliasname: "7587", Lookupcolumn: "4118", Kidsbikes: "4581", Totalcost: "2355"},
				{Num: "20 Jul 2015", Name: "2712", Aliasname: "9347", Lookupcolumn: "6132", Kidsbikes: "7741", Totalcost: "5922"},
				{Num: "19 Jul 2015", Name: "1126", Aliasname: "2535", Lookupcolumn: "3334", Kidsbikes: "1226", Totalcost: "3371"},
				{Num: "20 Jul 2015", Name: "2712", Aliasname: "9337", Lookupcolumn: "6132", Kidsbikes: "2741", Totalcost: "5922"}
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
                    $("#grid1").kendoGrid({
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
   
                        height: 460,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                       // filterable: true,
                        columnMenu: false,
                      //  pageable: true,
                        columns: [{
                                field: "Num",
								 title: "Date of date",
								 locked: true,
                        		 lockable: false,
                                width: 200,
								attributes: {style: "background-color: lightgray;"}
                            },  
								  {
                                field: "Name",
                                title: "Adult bikes",								
                                width: 200
                            }, {
                                field: "Aliasname",
                                title: "Athletic bikes",
                                width: 200
                            }, {
                                field: "Lookupcolumn",
                                title: "Common keywords",
                                width: 200
                            }, {
                                field: "Kidsbikes",
                                title: "Kids bikes",
                                width: 200
                            }, {
                                field: "Totalcost",
                                title: "Total clicks",
                                width: 200
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