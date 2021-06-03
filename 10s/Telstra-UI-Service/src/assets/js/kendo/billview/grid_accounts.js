		var sampleData01 = [
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				{MobileNumber: "<a href='#' data-dismiss='modal'  data-toggle='modal' data-target='#divSubscriber'>9876543210</a>", MonthlyCharges: "5.990", LocalCharges: "5.911", DataCharges: "0.500", InternationalCharges: "0.750", RoamingCharges: "0.000",  OtherCharges: "-4.432",  TotalCurrentCharges: "8.719"},
				
				
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
                    $("#divAccountGrid").kendoGrid({
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
                            pageSize: 4,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        MobileNumber: { type: "celleHtml" },
                                        MonthlyCharges: { type: "string" },
                                        LocalCharges: { type: "string" },
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
                                width: 200
                            }, {
                                field: "MonthlyCharges",
                                title: "Monthly charges",
                                width: 200
                            }, {
                                field: "LocalCharges",
                                title: "Local charges",
                                width: 190
                            },{
                                field: "DataCharges",
                                title: "Data charges",
                               width: 190
							},{
                                field: "InternationalCharges",
                                title: "International charges",
                                width: 250
							},{
                                field: "RoamingCharges",
                                title: "Roaming charges",
                                width: 230
							},{
                                field: "OtherCharges",
                                title: "Other charges",
                                width: 190
							},{
                                field: "TotalCurrentCharges",
                                title: "Total current charges",
                                width: 250
							}/*,{
                                field: "Action",
								title: "View Bill",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                //width: 180,
                            }*/
                        ]
                    });
                });
				
				
			