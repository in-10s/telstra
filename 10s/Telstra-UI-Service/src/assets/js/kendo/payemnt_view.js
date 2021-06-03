		var sampleData = [
				{Name: "	", PhoneNumber: "18768895723", Allocation: "2,506.87",  Status: "Processed"},
				{Name: "	", PhoneNumber: "18768895284", Allocation: "2,506.87",  Status: "Processed"},
				{Name: "	", PhoneNumber: "18765520985", Allocation: "2,506.87",  Status: "Processed"},
				{Name: "	", PhoneNumber: "18768914324", Allocation: "2,506.87",  Status: "Processed"},
				{Name: "<span class='bold'>Total</span>", PhoneNumber: "", Allocation: "<span class='bold'>15,502.15</span>",  Status: ""}
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
                            pageSize: 8,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "celleHtml" },
                                        SubmissionDate: { type: "string" },
                                        Allocation: { type: "celleHtml" },
                                        Action: { type: "celleHtml"}
                                    }
                                }
                            }
                        },
                        /*height: 440,*/
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: false,
                        filterable: false,
                        columnMenu: false,
                        pageable: false,
                        columns: [ {
                                field: "Name",
                                title: "Name",	
								encoded: false,
                                width: 180
                            },  {
                                field: "PhoneNumber",
                                title: "Phone Number",
                                width: 220
                            },{
                                field: "Allocation",
                                title: "Allocation", encoded: false,
                                width: 190
                            },
							{
                               field: "Amount",
                               title: "Amount",
                               width: 190,
							},
							{
                                field: "Status",
                                title: "Status",
                                width: 180
							}						
                        ]
                    });
                });