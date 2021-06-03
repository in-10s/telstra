		var UploadPaymentDetailsData03 = [
				{ Invoice: "1002843",  Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843", Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843",  Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843", Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				{ Invoice: "1002843",  Amount: "<input type='text' class='gridTextBox' placeholder='Enter amount'>"},
				
				];

                var UploadPaymentDetailsData03NextID = UploadPaymentDetailsData03.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = UploadPaymentDetailsData03.length;

                    for (var j; j < l; j++) {
                        if (UploadPaymentDetailsData03[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divUploadPaymentDetails03").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(UploadPaymentDetailsData03);
                                },
                                create: function (e) {
                                    e.data.ProductID = UploadPaymentDetailsData03NextID++;
                                    UploadPaymentDetailsData03.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    UploadPaymentDetailsData03[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    UploadPaymentDetailsData03.splice(getIndexById(e.data.ProductID), 1);
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
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 100 }, {
                                field: "Invoice",
                                title: "Invoice No.",								
                                width: 200
                            }, {
                                field: "Amount",
                                title: "Amount",
								encoded: false,
                                width: 190
                            }
                        ]
                    });
                });
				
				
			