		var sampleData = [
				{Num: "11 Jul 2015", Name: "$27.12", Aliasname: "$93.37", Lookupcolumn: "$161.32", Kidsbikes: "$77.41", Totalcost: "$359.22"},
				{Num: "13 Jul 2015", Name: "$72.3", Aliasname: "$38.96", Lookupcolumn: "$102.21", Kidsbikes: "$137.86", Totalcost: "$351.32"},
				{Num: "14 Jul 2015", Name: "$91.48", Aliasname: "$58.97", Lookupcolumn: "$41.18", Kidsbikes: "$45.81", Totalcost: "$235.5"},
				{Num: "15 Jul 2015", Name: "$168.74", Aliasname: "$33.73", Lookupcolumn: "$204.11", Kidsbikes: "$84.82", Totalcost: "$518.34"},
				{Num: "17 Jul 2015", Name: "$98.16", Aliasname: "$145.35", Lookupcolumn: "$103.31", Kidsbikes: "$123.26", Totalcost: "$433.71"},
				{Num: "18 Jul 2015", Name: "$165.33", Aliasname: "$226.47", Lookupcolumn: "$55.69", Kidsbikes: "$75.03", Totalcost: "$522.52"},
				{Num: "19 Jul 2015",  Name: "$91.48", Aliasname: "$58.97", Lookupcolumn: "$41.18", Kidsbikes: "$45.81", Totalcost: "$235.5"},
				{Num: "20 Jul 2015", Name: "$27.12", Aliasname: "$93.37", Lookupcolumn: "$161.32", Kidsbikes: "$77.41", Totalcost: "$359.22"},
				{Num: "19 Jul 2015", Name: "$112.16", Aliasname: "$125.35", Lookupcolumn: "$133.34", Kidsbikes: "$123.26", Totalcost: "$433.71"},
				{Num: "20 Jul 2015", Name: "$27.12", Aliasname: "$93.37", Lookupcolumn: "$161.32", Kidsbikes: "$77.41", Totalcost: "$359.22"}
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
                                width: 160,
								attributes: {style: "background-color: lightgray;"}
                            },  
								  {
                                field: "Name",
                                title: "Adult bikes",								
                                width: 200
                            }, {
                                field: "Aliasname",
                                title: "Athletic bikes",
                                width: 180
                            }, {
                                field: "Lookupcolumn",
                                title: "Common keywords",
                                width: 160
                            }, {
                                field: "Kidsbikes",
                                title: "Kids bikes",
                                width: 160
                            }, {
                                field: "Totalcost",
                                title: "Total cost",
                                width: 160
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