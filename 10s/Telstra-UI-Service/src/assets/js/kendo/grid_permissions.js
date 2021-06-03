		var sampleData = [
				{Name: "James Smith", UserID:"james", Usertype: "Internal", Securitytype: "Default", Organization: "Stewarts supermarkets ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "John Bosco", UserID:"john", Usertype: "Internal", Securitytype: "Limited secured", Organization: "Tesco stores ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "Robert williams", UserID:"robert", Usertype: "External", Securitytype: "All secured", Organization: "Flitwick pharmacies ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "Michael clark", UserID:"michael", Usertype: "External", Securitytype: "Default", Organization: "Sanders supermarkets ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "William Joseph", UserID:"william", Usertype: "Internal", Securitytype: "Default", Organization: "Tesco fuel ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "James Smith", UserID:"james", Usertype: "Internal", Securitytype: "Default", Organization: "Stewarts supermarkets ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "John Bosco", UserID:"john", Usertype: "Internal", Securitytype: "Limited secured", Organization: "Tesco stores ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "Robert williams", UserID:"robert", Usertype: "External", Securitytype: "All secured", Organization: "Flitwick pharmacies ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "Michael clark", UserID:"michael", Usertype: "External", Securitytype: "Default", Organization: "Sanders supermarkets ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"},
				{Name: "William Joseph", UserID:"william", Usertype: "Internal", Securitytype: "Default", Organization: "Tesco fuel ltd", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='permission_ic' title='Permission'></i></a>"}
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
                                        Usertype: { type: "string" },
                                        Phone: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                        height: 440,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Name",
                                title: "Name",
								width: 190
                            },  {
                                field: "UserID",
                                title: "User ID",
								width: 125
                            },{
                                field: "Usertype",
                                title: "User type",
								width: 150
                            }, {
                                field: "Securitytype",
                                title: "Security type",
								width: 190
                            }, {
                                field: "Organization",
                                title: "Organization",
								width: 190
                            },{
                                field: "Action",
                                title: "Actions",
								width: 125,
								encoded: false,
								attributes: {
      										"class": "action"
											}
                            }
                        ]
                    });
                });
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#divPermissions'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */
			
//declare function overrideKendoTooltipShow
function overrideKendoTooltipShow() {
    kendo.ui.Tooltip.fn._show = function (show) {
        return function (target) {
            var e = {
                sender: this,
                target: target,
                preventDefault: function () {
                    this.isDefaultPrevented = true;
                }
            };
            if (typeof this.options.beforeShow === "function") {
                this.options.beforeShow.call(this, e);
            }
            if (!e.isDefaultPrevented) {
                show.call(this, target);
            }
        };
    }(kendo.ui.Tooltip.fn._show);
}
//calling function overrideKendoTooltipShow
overrideKendoTooltipShow();
//creating tooltip function
var toolTip = $('#grid').kendoTooltip({
    filter: "td[role=gridcell]",
    content: function (e) {
        var target = e.target;  
        return  target.text();            
    },
    beforeShow: function (e) {
        var target = e.target;
        if(target[0].cellIndex == 5){
            e.preventDefault();
        }
    }
}).data("kendoTooltip");
//toolTip.show($("td[role=gridcell]:eq(9)")); 
