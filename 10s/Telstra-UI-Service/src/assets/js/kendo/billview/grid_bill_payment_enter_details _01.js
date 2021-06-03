		var EnterDetailsData01 = [
				{ Invoice: "1002843", TotalDue: "478.695", Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843", TotalDue: "478.695", Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843", TotalDue: "478.695", Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843", TotalDue: "478.695", Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843", TotalDue: "478.695", Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				
				];

                var EnterDetailsData01NextID = EnterDetailsData01.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = EnterDetailsData01.length;

                    for (var j; j < l; j++) {
                        if (EnterDetailsData01[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divEnterDetails01").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(EnterDetailsData01);
                                },
                                create: function (e) {
                                    e.data.ProductID = EnterDetailsData01NextID++;
                                    EnterDetailsData01.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    EnterDetailsData01[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    EnterDetailsData01.splice(getIndexById(e.data.ProductID), 1);
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
                                        Invoice: { type: "string" },
                                        TotalDue: { type: "string" },
                                        Amount: {  type: "celleHtml"},
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
                        columns: [ /*{ template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 100 },*/ {
                                field: "Invoice",
                                title: "Invoice No.",								
                                width: 200
                            }, {
                                field: "TotalDue",
                                title: "Total Due",
                                width: 140
                            }, {
                                field: "Amount",
                                title: "Amount to be Paid",
								encoded: false,
                                width: 190
                            }/*,{
                                field: "BillDate",
                                title: "Bill date",
                               //width: 190
							},{
                                field: "DueDate",
                                title: "Due date",
                                //width: 190
							},{
                                field: "TotalDue",
                                title: "Total due",
                                //width: 190
							}*/
                        ]
                    });
                });
				
				
			