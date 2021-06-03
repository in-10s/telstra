		var sampleData = [
				{Templatename: "Name1", Templatetype: "Standard grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name2", Templatetype: "Standard grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name3", Templatetype: "Pivot grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name4", Templatetype: "Standard grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name5", Templatetype: "Standard grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name6", Templatetype: "Standard grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name7", Templatetype: "Pivot grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name8", Templatetype: "Pivot grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a> "},
				{Templatename: "Name9", Templatetype: "Pivot grid", Templatedescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "<a href='View_report_summary.html'><i class='viewicon' title='View'></i></a> <a href='Edit_report_summary.html'><i class='editicon' title='Edit'></i></a> <i class='deleteicon' title='Delete'></i>  <a href='Publish_report_summary.html'><i class='publish_ic' title='Publish'></i></a>"}
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
                                        Templatename: { type: "string" },
                                        Templatetype: { type: "string" },
                                        Templatedescription: { type: "string" },
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
                        groupable: false,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "Templatename",
                                title: "Template name",
								
                                width: 190
                            }, {
                                field: "Templatetype",
                                title: "Template type",
                                width: 190
                            }, {
                                field: "Templatedescription",
                                title: "Template description",
                                width: 180
                            },
							 {
                                field: "Action",
                                title: "Actions",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 180
                            }
                        ]
                    });
                });
				
		