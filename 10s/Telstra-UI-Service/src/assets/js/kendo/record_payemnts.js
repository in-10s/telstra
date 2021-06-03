var sampleData = [
{SNO:1, Name: "21st Century consultants limited.", Ban: "10100059982", Invoicenumber: "JM18328644", Phonenumber: "18765649725", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"},
{SNO:2, Name: "21st Century consultants limited.", Ban: "10100059983", Invoicenumber: "JM18328316", Phonenumber: "18765649755", Amount: "1,400.00", COUNT:0, GCTAmount: "350.00",  Totalamount: "1,750.00", Allocation: "<input type='text' placeholder='1,750.00'>"},
{SNO:3, Name: "Talbert Morrisson", Ban: "10100059985", Invoicenumber: "JM18328766", Phonenumber: "18765649759", Amount: "4,380.61", COUNT:0, GCTAmount: "1,017.89",  Totalamount: "5,398.50", Allocation: "<input type='text' placeholder='5,398.50'>"},
{SNO:4, Name: "21st Century.", Ban: "10100059986", Invoicenumber: "JM18328355", Phonenumber: "18765648734", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"},
{SNO:5, Name: "21st Century consultants limited.", Ban: "10100059982", Invoicenumber: "JM18328644", Phonenumber: "18765649725", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"},
{SNO:6, Name: "21st Century consultants limited.", Ban: "10100059982", Invoicenumber: "JM18328644", Phonenumber: "18765649725", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"},
{SNO:1, Name: "21st Century consultants limited.", Ban: "10100059982", Invoicenumber: "JM18328644", Phonenumber: "18765649725", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"},
{SNO:2, Name: "21st Century consultants limited.", Ban: "10100059983", Invoicenumber: "JM18328316", Phonenumber: "18765649755", Amount: "1,400.00", COUNT:0, GCTAmount: "350.00",  Totalamount: "1,750.00", Allocation: "<input type='text' placeholder='1,750.00'>"},
{SNO:3, Name: "Talbert Morrisson", Ban: "10100059985", Invoicenumber: "JM18328766", Phonenumber: "18765649759", Amount: "4,380.61", COUNT:0, GCTAmount: "1,017.89",  Totalamount: "5,398.50", Allocation: "<input type='text' placeholder='5,398.50'>"},
{SNO:4, Name: "21st Century.", Ban: "10100059986", Invoicenumber: "JM18328355", Phonenumber: "18765648734", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"},
{SNO:5, Name: "21st Century consultants limited.", Ban: "10100059982", Invoicenumber: "JM18328644", Phonenumber: "18765649725", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"},
{SNO:6, Name: "21st Century consultants limited.", Ban: "10100059982", Invoicenumber: "JM18328644", Phonenumber: "18765649725", Amount: "3,967.47", COUNT:0, GCTAmount: "934.48",  Totalamount: "4,901.95", Allocation: "<input type='text' placeholder='4,901.95'>"}

];

var contactGrid;
var checkeRows1 = [];
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
$(document).ready(function () {
   contactGrid= $("#grid").kendoGrid({
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
                Campaign("Status: " + e.status + "; Error message: " + e.errorThrown);
            },
            pageSize: 10,
            batch: false,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        Name: {type: "string"},
                        Description: {type: "string"},
                        Select: {
                            type: "celleHtml"
                        },
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
         dataBound: permit_gridDataBound,
        resizable: true,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [{
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:9px'><input type='checkbox' id='checkAll'></span>",
                template: $("#checkbox_template1").html(),
                menu: false,
                width: "50px"
            }, {
                field: "Name",
                title: "Name",
                width: 150
            }, {
				field: "Ban",
				title: "BAN",	
				encoded: false
			},  {
				field: "Invoicenumber",
				title: "Invoice Number",  width: 120
			},{
				field: "Phonenumber",
				title: "Phone Number",  width: 120
			},
			{
				field: "Amount",
				title: "Amount",width: 170
			},
			{
				field: "GCTAmount",
				title: "GCT Amount"
			},
			{
				field: "Totalamount",
				title: "Total Amount"
			},
			{
				field: "Allocation",
				title: "Allocation",
				encoded: false
			}	
        ],
        editable: "inline"
    }).data("kendoGrid");
    //	bind click event to the checkbox
	//    grid.table.on("click", ".checkboxed", selectRow);
	//    $('#header-chb').change(function (ev) {
	//        var checked = ev.target.checked;
	//        $('.row-checkboxed').each(function (idx, item) {
	//            if (checked) {
	//                if (!($(item).closest('tr').is('.k-state-selected'))) {
	//                    $(item).click();
	//                }
	//            } else {
	//                if ($(item).closest('tr').is('.k-state-selected')) {
	//                    $(item).click();
	//                }
	//            }
	//        });
	//    });
	//    $("#showSelection").bind("click", function () {
	//        var checked = [];
	//        for (var i in checkedIds) {
	//            if (checkedIds[i]) {
	//                checked.push(i);
	//            }
	//        }
	//
	//        alert(checked);
	//    });
 contactGrid.table.on("click", ".checkbox1", onAllAccGridRowSelect);
});

//selectAll checkbox on click event
$(document).ready(function () {
    $("#checkAll").change(function () {
        var strGridData = JSON.stringify(contactGrid._data);
        var objGridData = JSON.parse(strGridData);
        if (this.checked) {
            for (var idx = 0; idx < objGridData.length; idx++)
            {
                var dataItem = contactGrid.dataSource.view()[idx];//checkeRows
                    var index = isValueInArray(checkeRows1, dataItem);
                    //var index = checkeRows1.indexOf(dataItem);
                    if (index == -1) {
                        checkeRows1.push(dataItem);
                        if (dataItem.COUNT == 0) {
                            dataItem.set("COUNT", 1);
                        }
                    }
				
                $("#" + objGridData[idx].SNO).prop('checked', true);
            }
        }
        else {
            for (var idx = 0; idx < objGridData.length; idx++)
            {

                var dataItem1 = contactGrid.dataSource.view()[idx];
                    var index1 = isValueInArray(checkeRows1, dataItem1);
                    // var index1 = checkeRows1.indexOf(dataItem1);
                    if (index1 != -1) {
                        checkeRows1.splice(index1, 1);
                        if (dataItem1.COUNT != 0) {
                            dataItem1.set("COUNT", 0);
                        }
                    }
				
                $("#" + objGridData[idx].SNO).prop('checked', false);
            }
        }
    });
})

//on dataBound event restore previous selected rows:
function permit_gridDataBound(arg) {
    if (arg.sender._data.length === 0) {
        var colCount = $("#grid").find('.k-grid-header colgroup > col').length;
        $("#grid").find('.k-grid-content tbody')
                .append('<tr class="kendo-data-row"><td colspan="' +
                        colCount +
                        '" style="text-align:center"><b>No records found</b></td></tr>');
    }
    test_pagechange(arg.sender._data);
}

//testing checkboxes and changing checkAll checkbox
function test_pagechange(e) {
    var count = 0;
    var view = e;
    for (var k = 0; k < view.length; k++) {
        if (view[k].COUNT == 1) {
            count++
        }
    }
    if (count == view.length) {
        $("#checkAll").prop('checked', true);
    } else {
        $("#checkAll").prop('checked', false);
    }
    if (view.length == 0) {
        $("#checkAll").prop('checked', false);
    }
}

// storeing selected email id in a array
function onAllAccGridRowSelect(obj) {
    var checked = this.checked;
    var row = $(this).closest("tr");
    var dataItem = contactGrid.dataItem(row);
    if (checked) {
            var index = isValueInArray(checkeRows1, dataItem);
            // var index = checkeRows1.indexOf(dataItem);
            if (index == -1) {
                checkeRows1.push(dataItem);
                if (dataItem.COUNT == 0) {
                    dataItem.set("COUNT", 1);
                }
            }        
    } else {
            var index1 = isValueInArray(checkeRows1, dataItem);
            if (index1 != -1) {
                checkeRows1.splice(index1, 1);
                if (dataItem.COUNT != 0) {
                    dataItem.set("COUNT", 0);
                }
            }        
    }
}

function isValueInArray(arr, val) {
    var inArray = -1;
    for (var z = 0; z < arr.length; z++) {
        if (val.SNO == arr[z].SNO) {
            inArray = z;
            break;
        }
    }
    return inArray;
}

//on click of the checkbox:
function selectRow() {
    var checked = this.checked,
            row = $(this).closest("tr"),
            grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem(row);
    checkedIds[dataItem.id] = checked;
    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
    } else {
        //-remove selection
        row.removeClass("k-state-selected");
    }
}

//on dataBound event restore previous selected rows:
function onDataBound(e) {
    var view = this.dataSource.view();
    for (var i = 0; i < view.length; i++) {
        if (checkedIds[view[i].id]) {
            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                    .addClass("k-state-selected")
                    .find(".checkboxed")
                    .attr("checked", "checked");
        }
    }
}