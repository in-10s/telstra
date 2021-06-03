		var sampleData = [
				{Costcode: "Umar", Hierarchy: "9999999999", Name: "umar@gmail.com", Department: "Sales", Budget: "500K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Hiba Syed", Hierarchy: "9999999999", Name: "hiba.syed@gmail.com", Department: "Finance", Budget: "350K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Asma Naqvi", Hierarchy: "9999999999", Name: "asma.naqvi@gmail.com", Department: "Purchase", Budget: "152K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Maha Lodhi", Hierarchy: "9999999999", Name: "maha.lodhi@gmail.com", Department: "Inventory", Budget: "604K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Salman Kazmi", Hierarchy: "9999999999", Name: "salman.kazmi@gmail.com", Department: "Operational", Budget: "162K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Mehreen Mir", Hierarchy: "9999999999", Name: "mehreen.mir@gmail.com", Department: "Finance", Budget: "452K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Farrukh Baig", Hierarchy: "9999999999", Name: "farrukh.baig@gmail.com", Department: "Sales", Budget: "672K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Fauzia Durrani", Hierarchy: "9999999999", Name: "fauzia.durrani@gmail.com", Department: "Operational", Budget: "985K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
					{Costcode: "Salman Kazmi", Hierarchy: "9999999999", Name: "salman.kazmi@gmail.com", Department: "Operational", Budget: "162K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Mehreen Mir", Hierarchy: "9999999999", Name: "mehreen.mir@gmail.com", Department: "Finance", Budget: "452K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Farrukh Baig", Hierarchy: "9999999999", Name: "farrukh.baig@gmail.com", Department: "Sales", Budget: "672K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"},
				{Costcode: "Fauzia Durrani", Hierarchy: "9999999999", Name: "fauzia.durrani@gmail.com", Department: "Operational", Budget: "985K", Action: "<a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a data-toggle='modal' href='#divDelete'><i class='deleteicon' title='Delete'></i></a>"}
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
                                        Costcode: { type: "string" },
                                        Hierarchy: { type: "string" },
                                        Name: { type: "string" },
										Department: { type: "string" },
										Budget: { type: "string" },
                                        Action: { 
										type: "celleHtml"
										
										}
                                    }
                                }
                            }
                        },
                        height: 480,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 80 }, {
                                field: "Costcode",
                                title: "Contact name",
								width: 160,
								 encoded: false,/* template: $("#checkbox_template").html()*/
                            }, {
                                field: "Hierarchy",
                                title: "Phone number",width: 180,
                            }, {
                                field: "Name",
                                title: "Email address",width: 180,
                            },{
                                field: "Action",
                                title: "Actions",width: 160,
								encoded: false,
								attributes: {
      										"class": "action"
											},
                            }
                        ]
                    });
                });
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a data-toggle='modal' href='#editContact'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i></a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */