		var sampleData02 = [
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				{ date: "06-Mar-16", Time: "11:11:12", PointOrigin: "99", PointTarget: "999", Units: "2",  PrimaryUnits: "2",  Amount: "0.719"},
				
				
				
				];

                var sampleData02NextID = sampleData02.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData02.length;

                    for (var j; j < l; j++) {
                        if (sampleData02[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
                    $("#divDetailsGrid").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    e.success(sampleData02);
                                },
                                create: function (e) {
                                    e.data.ProductID = sampleData02NextID++;
                                    sampleData02.push(e.data);
                                    e.success(e.data);
                                },
                                update: function (e) {
                                    sampleData02[getIndexById(e.data.ProductID)] = e.data;
                                    e.success();
                                },
                                destroy: function (e) {
                                    sampleData02.splice(getIndexById(e.data.ProductID), 1);
                                    e.success();
                                }
                            },
                            error: function (e) {
                                // handle data operation error
                                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 6,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        date: { type: "string" },
                                        Time: { type: "string" },
                                        PointOrigin: { type: "string" },
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
                                field: "date",
                                title: "Date",								
                                width: 150
                            }, {
                                field: "Time",
                                title: "Time",
                                width: 140
                            }, {
                                field: "PointOrigin",
                                title: "Service origin",
                                width: 190
                            },{
                                field: "PointTarget",
                                title: "Service Distination",
                               width: 190
							},{
                                field: "Units",
                                title: "Units",
                                width: 190
							},{
                                field: "PrimaryUnits",
                                title: "Primary units",
                                width: 190
							},{
                                field: "Amount",
                                title: "Amount",
                                width: 190
							}
                        ]
                    });
                });
				
				
			