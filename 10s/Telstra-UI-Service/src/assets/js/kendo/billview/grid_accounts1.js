		var sampleData01 = [
				{MobileNumber: "+968 26840297", Limit:"<a data-toggle='modal' href='#topsliderlimit'>500 OMR</a>", Voice: "<a data-toggle='modal' href='#topslidervalue'>400 mins</a>", SMS: "<a data-toggle='modal' href='#topslidersms'>200</a>", Data: "<a data-toggle='modal' href='#topsliderdata'>3GB</a>", InternationalCharges: "<a data-toggle='modal' href='#topsliderdomas'>50 mins</a>", RoamingCharges: "<a data-toggle='modal' href='#topsliderinter'>50 mins</a>",  Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{MobileNumber: "+968 25342634", Limit:"<a data-toggle='modal' href='#topsliderlimit'>500 OMR</a>", Voice: "<a data-toggle='modal' href='#topslidervalue'>300 mins</a>", SMS: "<a data-toggle='modal' href='#topslidersms'>200</a>", Data: "<a data-toggle='modal' href='#topsliderdata'>3GB</a>", InternationalCharges: "<a data-toggle='modal' href='#topsliderdomas'>50 mins</a>", RoamingCharges: "<a data-toggle='modal' href='#topsliderinter'>50 mins</a>",  Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{MobileNumber: "+968 29384753", Limit:"<a data-toggle='modal' href='#topsliderlimit'>500 OMR</a>", Voice: "<a data-toggle='modal' href='#topslidervalue'>400 mins</a>", SMS: "<a data-toggle='modal' href='#topslidersms'>200</a>", Data: "<a data-toggle='modal' href='#topsliderdata'>3GB</a>", InternationalCharges: "<a data-toggle='modal' href='#topsliderdomas'>50 mins</a>", RoamingCharges: "<a data-toggle='modal' href='#topsliderinter'>50 mins</a>",  Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{MobileNumber: "+968 27485968", Limit:"<a data-toggle='modal' href='#topsliderlimit'>500 OMR</a>", Voice: "<a data-toggle='modal' href='#topslidervalue'>300 mins</a>", SMS: "<a data-toggle='modal' href='#topslidersms'>200</a>", Data: "<a data-toggle='modal' href='#topsliderdata'>3GB</a>", InternationalCharges: "<a data-toggle='modal' href='#topsliderdomas'>50 mins</a>", RoamingCharges: "<a data-toggle='modal' href='#topsliderinter'>50 mins</a>",  Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"},
				{MobileNumber: "+968 26252423", Limit:"<a data-toggle='modal' href='#topslidervalue'>500 OMR</a>", Voice: "<a data-toggle='modal' href='#topslidervalue'>400 mins</a>", SMS: "<a data-toggle='modal' href='#topslidersms'>200</a>", Data: "<a data-toggle='modal' href='#topsliderdata'>3GB</a>", InternationalCharges: "<a data-toggle='modal' href='#topsliderdomas'>50 mins</a>", RoamingCharges: "<a data-toggle='modal' href='#topsliderinter'>50 mins</a>",  Action: "<a href='alert.html'><i class='alerticon' title='Alert'></i></a>"}
				];

                var sampleData01NextID = sampleData01.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData01.length;

                    for (var j; j < l; j++) {
                        if (sampleData01[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divAccountorderrequest").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData01);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleData01NextID++;
                                    sampleData01.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData01[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData01.splice(getIndexById(e.data.ProductID), 1);
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
                                        MobileNumber: { type: "celleHtml" },
                                        Voice: { type: "string" },
                                        SMS: { type: "string" },
                                        //Action: { type: "celleHtml"}
                                    }
                                }
                            }
                        },
                        /*height: 440,*/
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "MobileNumber",
                                title: "Mobile number",	
								encoded: false,
                                width: 190
                            }, {
                                field: "Limit",
                                title: "Limit",
								encoded: false,
                                width:160
                            }, {
                                field: "Voice",
                                title: "Voice",
								encoded: false,
                                width:160
                            }, {
                                field: "SMS",
                                title: "SMS",
								encoded: false,
                                width: 150
                            },{
                                field: "Data",
                                title: "Data",
								encoded: false,
                               width: 130
							},{
                                field: "RoamingCharges",
                                title: "Roaming domastic",
								encoded: false,
                               width:200
							},
							{
                                field: "InternationalCharges",
                                title: "Roaming international",
								encoded: false,
                               width: 230
							}
                        ]
                    });
                });
				
				
			