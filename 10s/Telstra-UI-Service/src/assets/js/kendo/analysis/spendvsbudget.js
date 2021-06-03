


//var sampleData =
//        [
//    {ccId: 1, Name: "anz", Budget: "3000.000", ReportsTo: null},
//    {ccId: 2, Name: "depart", Budget: "400", ReportsTo: 1},
//    {ccId: 3, Name: "64257458811", Budget: "650", ReportsTo: 2},
//    {ccId: 4, Name: "3654214", Budget: "240", ReportsTo: 3},
//    {ccId: 5, Name: "3754841", Budget: "300", ReportsTo: 3},
//    {ccId: 6, Name: "Test XZY", Budget: "920", ReportsTo: 1},
//    {ccId: 7, Name: "75846841458", Budget: "450", ReportsTo: 6},
//    {ccId: 8, Name: "2415752", Budget: "300", ReportsTo: 7},
//    {ccId: 9, Name: "7548412", Budget: "150", ReportsTo: 7},
//    {ccId: 10, Name: "75846841458", Budget: "450", ReportsTo: 6},
//    {ccId: 11, Name: "2415752", Budget: "300", ReportsTo: 10},
//    {ccId: 12, Name: "7548412", Budget: "150", ReportsTo: 10}
//
//
//        {ccId: 1, Classname: "costCentre", Name: "My Account", Budget: "3000.000", ReportsTo: null},
//    {ccId: 2, Classname: "costCentre", Name: "Test 123", Budget: "400", ReportsTo: 1},
//    {ccId: 3, Classname: "costcode", Name: "64257458811", Budget: "650", ReportsTo: 2},
//    {ccId: 4, Classname: "account", Name: "3654214", Budget: "240", ReportsTo: 3},
//    {ccId: 5, Classname: "account", Name: "3754841", Budget: "300", ReportsTo: 3},
//    {ccId: 6, Classname: "costCentre", Name: "Test XZY", Budget: "920", ReportsTo: 1},
//    {ccId: 7, Classname: "costcode", Name: "75846841458", Budget: "450", ReportsTo: 6},
//    {ccId: 8, Classname: "account", Name: "2415752", Budget: "300", ReportsTo: 7},
//    {ccId: 9, Classname: "account", Name: "7548412", Budget: "150", ReportsTo: 7},
//    {ccId: 10, Classname: "costcode", Name: "75846841458", Budget: "450", ReportsTo: 1},
//    {ccId: 11, Classname: "account", Name: "2415752", Budget: "300", ReportsTo: 10},
//    {ccId: 12, Classname: "account", Name: "7548412", Budget: "150", ReportsTo: 10}
//];


var sampleData = [];
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

/*function loadLocationBaseData() {
    sampleData = [];
    var selMonth = $("#hierarchy_month_combo_id").val();
    var reqData = {};
    reqData.selMonth = selMonth;
    procesRequest("fetchHierarchyLocationBase.action", reqData, fnfetchlocationbasesucc, fnfetchlocationbaseFail, false);
}

function fnfetchlocationbasesucc(response) {
    console.log(response);
    var res = JSON.parse(response);
    var status = res.objCRSResponse.status;
    if (res.objCRSResponse.success == true) {
        var locationdata = res.objCRSResponse.data;
        sampleData = res.objCRSResponse.data;
        for (var i = 0; i < sampleData.length; i++) {
            if (sampleData[i].ReportsTo == "") {
                sampleData[i].ReportsTo = null;
            }
        }
        locationtree();
    } else {
        showMessage("Error", "Unable to fetch location base details.", 2);
    }
}

function fnfetchlocationbaseFail(response) {

}*/

$(document).ready(function () {
    locationtree();
});

function locationtree() {



    var dataSource = new kendo.data.TreeListDataSource({
        transport: {
            read: {
                url: "fetchHierarchyLocationBase.action",
//                data: {reqData: reqData},
                dataType: "json"
            },
            parameterMap: function (options, operation) {
                var selMonth = $("#hierarchy_month_combo_id").val();
                var reqData = {};
                reqData.selMonth = selMonth;
                reqData = encrypt(JSON.stringify(reqData));
                return {
                    reqData: reqData
                };
            }
        },
        schema: {
            data: function (response) {
                if (response.objCRSResponse.success) {
                    var daatarr = response.objCRSResponse.data;
                    for (var i = 0; i < daatarr.length; i++) {
                        if (daatarr[i].ReportsTo == "") {
                            daatarr[i].ReportsTo = null;
                        }
                    }
                    return daatarr;
                }
            },
            model: {
                id: "ccId",
                fields: {
                    parentId: {field: "ReportsTo", nullable: true},
                    ccId: {field: "ccId", type: "number"},
                    //Extension: { field: "Extension", type: "number" }
                },
                expanded: true
            }

        }
    });

//sampleData=[
// {ccId: 227, Name: "9898989", Budget: "20000", ReportsTo: 226},
// {ccId: 228, Name: "33434343", Budget: "1222", ReportsTo: 226},
//  {ccId: 203, Name: "INDIA", Budget: "21222", ReportsTo: null},
// {ccId: 226, Name: "hyd", Budget: "21222", ReportsTo: 208},
// {ccId: 208, Name: "CHANDRIKA AP", Budget: "21222", ReportsTo: 203}];


    $("#treelist").kendoTreeList({
        dataSource: dataSource,
        resizable: true,
        height: 500,
        columns: [
            {field: "Name", title: "Name", expandable: true},
            //{ field: "Manager", title: "Manager", width: 190},
            {field: "Budget", title: "Budget"},
            {field: "Spend", title: "Spend"}

        ]
    })

}