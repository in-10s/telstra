

//var sampleData2 = [
//    {ccId: 1, Name: "Anz", Budget: "79,550.00", Spend: "79,364.00", ReportsTo: null},
//    /*	{ccId: 2, Name: "Australia",  Budget: "26,100.00",Spend:"26,455.00", ReportsTo: 1},
//     {ccId: 21, Name: "Western Australia", Budget: "7,850.00",Spend:"7,936.00", ReportsTo: 1},
//     {ccId: 211, Name: "102376539", Budget: "3,950.00",Spend:"3,968.00", ReportsTo: 21},*/
//    {ccId: 2111, Name: "Marketing", Budget: "22,700.00", Spend: "22,121.00", ReportsTo: 1},
//    {ccId: 21111, Name: "Jack 2056543602", Budget: "150.00", Spend: "164.00", ReportsTo: 2111},
//    {ccId: 21112, Name: "William 2056543318", Budget: "200.00", Spend: "200.00", ReportsTo: 2111},
//    {ccId: 21113, Name: "Noah 2056546151", Budget: "150.00", Spend: "121.00", ReportsTo: 2111},
//    {ccId: 21114, Name: "Ethan 2056547483", Budget: "200.00", Spend: "229.00", ReportsTo: 2111},
//    {ccId: 21211, Name: "Zoe 2056548464", Budget: "150.00", Spend: "164.00", ReportsTo: 2111},
//    {ccId: 21212, Name: "Isla 2056549483", Budget: "200.00", Spend: "200.00", ReportsTo: 2111},
//    {ccId: 21213, Name: "Lucy 2056543127", Budget: "150.00", Spend: "121.00", ReportsTo: 2111},
//    {ccId: 21214, Name: "Oscar 2056546534", Budget: "200.00", Spend: "229.00", ReportsTo: 2111},
//    {ccId: 22111, Name: "Charlie 2056554335", Budget: "200.00", Spend: "216.00", ReportsTo: 2111},
//    {ccId: 22112, Name: "Max 2056577773", Budget: "300.00", Spend: "263.00", ReportsTo: 2111},
//    {ccId: 22113, Name: "Hunter 2056543343", Budget: "150.00", Spend: "160.00", ReportsTo: 2111},
//    {ccId: 22114, Name: "Scarlett 2056541238", Budget: "350.00", Spend: "301.00", ReportsTo: 2111},
//    {ccId: 22211, Name: "Hudson 2056543390", Budget: "150.00", Spend: "200.00", ReportsTo: 2111},
//    {ccId: 22212, Name: "Alice 2050987565", Budget: "250.00", Spend: "243.00", ReportsTo: 2111},
//    {ccId: 22213, Name: "Willow 2050241572", Budget: "150.00", Spend: "148.00", ReportsTo: 2111},
//    {ccId: 22214, Name: "Georgia 2050754842", Budget: "300.00", Spend: "278.00", ReportsTo: 2111},
//    {ccId: 23111, Name: "Lucas 2075489988", Budget: "200.00", Spend: "193.00", ReportsTo: 2111},
//    {ccId: 23112, Name: "Lachlan 2075480988", Budget: "200.00", Spend: "235.00", ReportsTo: 2111},
//    {ccId: 23113, Name: "Mia 2075484585", Budget: "150.00", Spend: "142.00", ReportsTo: 2111},
//    {ccId: 23114, Name: "Amelia 2075489876", Budget: "200.00", Spend: "268.00", ReportsTo: 2111},
//    {ccId: 23211, Name: "Flynn 2078987655", Budget: "200.00", Spend: "158.00", ReportsTo: 2111},
//    {ccId: 23212, Name: "Sebastian 2078985675", Budget: "150.00", Spend: "192.00", ReportsTo: 2111},
//    {ccId: 23213, Name: "Logan 2078912365", Budget: "150.00", Spend: "117.00", ReportsTo: 2111},
//    {ccId: 23214, Name: "Jaxon 2078989433", Budget: "150.00", Spend: "219.00", ReportsTo: 2111},
//    {ccId: 31111, Name: "George 2078957588", Budget: "500.00", Spend: "450.00", ReportsTo: 2111},
//    {ccId: 31112, Name: "Sebastian 2078980068", Budget: "500.00", Spend: "600.00", ReportsTo: 2111},
//    {ccId: 31113, Name: "Daniel 2078907860", Budget: "300.00", Spend: "200.00", ReportsTo: 2111},
//    {ccId: 31114, Name: "Archer 2078976986", Budget: "700.00", Spend: "700.00", ReportsTo: 2111},
//    {ccId: 32111, Name: "Dylan 2078970970", Budget: "500.00", Spend: "450.00", ReportsTo: 2111},
//    {ccId: 32112, Name: "Joseph 2078987097", Budget: "500.00", Spend: "600.00", ReportsTo: 2111},
//    {ccId: 32113, Name: "Beau 2078790797", Budget: "300.00", Spend: "200.00", ReportsTo: 2111},
//    {ccId: 32114, Name: "Austin 2078070700", Budget: "700.00", Spend: "700.00", ReportsTo: 2111},
//    {ccId: 21221, Name: "Daniel 2056546412", Budget: "600.00", Spend: "648.00", ReportsTo: 2111},
//    {ccId: 21222, Name: "Logan 2056544550", Budget: "650.00", Spend: "622.00", ReportsTo: 2111},
//    {ccId: 22121, Name: "Daniel 2056343237", Budget: "800.00", Spend: "800.00", ReportsTo: 2111},
//    {ccId: 22122, Name: "Jayden 2056543436", Budget: "800.00", Spend: "768.00", ReportsTo: 2111},
//    {ccId: 22221, Name: "Patrick 2050241800", Budget: "750.00", Spend: "787.00", ReportsTo: 2111},
//    {ccId: 22222, Name: "Hudson 2050754912", Budget: "800.00", Spend: "757.00", ReportsTo: 2111},
//    {ccId: 2112, Name: "Sales", Budget: "25,200.00", Spend: "25,991.00", ReportsTo: 1},
//    {ccId: 21121, Name: "Oliver 2056547643", Budget: "600.00", Spend: "607.00", ReportsTo: 2112},
//    {ccId: 21122, Name: "Thomas 2056547301", Budget: "600.00", Spend: "583.00", ReportsTo: 2112},
//    {ccId: 21221, Name: "Daniel 2056546412", Budget: "600.00", Spend: "648.00", ReportsTo: 2112},
//    {ccId: 21222, Name: "Logan 2056544550", Budget: "650.00", Spend: "622.00", ReportsTo: 2112},
//    {ccId: 22121, Name: "Daniel 2056343237", Budget: "800.00", Spend: "800.00", ReportsTo: 2112},
//    {ccId: 22122, Name: "Jayden 2056543436", Budget: "800.00", Spend: "768.00", ReportsTo: 2112},
//    {ccId: 22221, Name: "Patrick 2050241800", Budget: "750.00", Spend: "787.00", ReportsTo: 2112},
//    {ccId: 22222, Name: "Hudson 2050754912", Budget: "800.00", Spend: "757.00", ReportsTo: 2112},
//    {ccId: 23121, Name: "Samuel 2075484165", Budget: "700.00", Spend: "712.00", ReportsTo: 2112},
//    {ccId: 23122, Name: "Jacob 2075484165", Budget: "700.00", Spend: "684.00", ReportsTo: 2112},
//    {ccId: 32121, Name: "Ashton 2078097907", Budget: "650.00", Spend: "600.00", ReportsTo: 2112},
//    {ccId: 32122, Name: "Angus 2078709870", Budget: "350.00", Spend: "400.00", ReportsTo: 2112},
//    {ccId: 23221, Name: "Jayden 2078925425", Budget: "600.00", Spend: "622.00", ReportsTo: 2112},
//    {ccId: 23222, Name: "Henry 2078982455", Budget: "550.00", Spend: "597.00", ReportsTo: 2112},
//    {ccId: 31121, Name: "Patrick 2078996796", Budget: "650.00", Spend: "600.00", ReportsTo: 2112},
//    {ccId: 31122, Name: "Tyler 2078968699", Budget: "350.00", Spend: "400.00", ReportsTo: 2112},
//    {ccId: 22211, Name: "Hudson 2056543390", Budget: "150.00", Spend: "200.00", ReportsTo: 2112},
//    {ccId: 22212, Name: "Alice 2050987565", Budget: "250.00", Spend: "243.00", ReportsTo: 2112},
//    {ccId: 22213, Name: "Willow 2050241572", Budget: "150.00", Spend: "148.00", ReportsTo: 2112},
//    {ccId: 22214, Name: "Georgia 2050754842", Budget: "300.00", Spend: "278.00", ReportsTo: 2112},
//    {ccId: 23111, Name: "Lucas 2075489988", Budget: "200.00", Spend: "193.00", ReportsTo: 2112},
//    {ccId: 23112, Name: "Lachlan 2075480988", Budget: "200.00", Spend: "235.00", ReportsTo: 2112},
//    {ccId: 23113, Name: "Mia 2075484585", Budget: "150.00", Spend: "142.00", ReportsTo: 2112},
//    {ccId: 23114, Name: "Amelia 2075489876", Budget: "200.00", Spend: "268.00", ReportsTo: 2112},
//    {ccId: 23211, Name: "Flynn 2078987655", Budget: "200.00", Spend: "158.00", ReportsTo: 2112},
//    {ccId: 23212, Name: "Sebastian 2078985675", Budget: "150.00", Spend: "192.00", ReportsTo: 2112},
//    {ccId: 23213, Name: "Logan 2078912365", Budget: "150.00", Spend: "117.00", ReportsTo: 2112},
//    {ccId: 2113, Name: "HR", Budget: "16,000.00", Spend: "15,905.00", ReportsTo: 1},
//    {ccId: 21131, Name: "Cooper 2056548434", Budget: "300.00", Spend: "319.00", ReportsTo: 2113},
//    {ccId: 21132, Name: "James 2056548394", Budget: "400.00", Spend: "389.00", ReportsTo: 2113},
//    {ccId: 21133, Name: "Lucas 2056540923", Budget: "200.00", Spend: "236.00", ReportsTo: 2113},
//    {ccId: 21134, Name: "Ruby 2056546531", Budget: "500.00", Spend: "444.00", ReportsTo: 2113},
//    {ccId: 21231, Name: "Jake 2056543217", Budget: "300.00", Spend: "274.00", ReportsTo: 2113},
//    {ccId: 21232, Name: "Harper 2056545490", Budget: "300.00", Spend: "333.00", ReportsTo: 2113},
//    {ccId: 21233, Name: "Alice 2056543781", Budget: "200.00", Spend: "202.00", ReportsTo: 2113},
//    {ccId: 21234, Name: "Mitchell 2056544761", Budget: "350.00", Spend: "381.00", ReportsTo: 2113},
//    {ccId: 22131, Name: "Logan 2056544555", Budget: "400.00", Spend: "421.00", ReportsTo: 2113},
//    {ccId: 22132, Name: "Sebastian 2056543434", Budget: "500.00", Spend: "512.00", ReportsTo: 2113},
//    {ccId: 22133, Name: "Alice 2056544761", Budget: "300.00", Spend: "311.00", ReportsTo: 2113},
//    {ccId: 22134, Name: "Willow 2056544544", Budget: "600.00", Spend: "585.00", ReportsTo: 2113},
//    {ccId: 22231, Name: "Daniel 2052415752", Budget: "350.00", Spend: "333.00", ReportsTo: 2113},
//    {ccId: 22232, Name: "Eli 2057548412", Budget: "400.00", Spend: "405.00", ReportsTo: 2113},
//    {ccId: 22233, Name: "Henry 2024157577", Budget: "200.00", Spend: "246.00", ReportsTo: 2113},
//    {ccId: 22234, Name: "Jessica 2075484165", Budget: "500.00", Spend: "463.00", ReportsTo: 2113},
//    {ccId: 23131, Name: "Lily 2075467889", Budget: "400.00", Spend: "375.00", ReportsTo: 2113},
//    {ccId: 23132, Name: "Grace 2075478689", Budget: "450.00", Spend: "456.00", ReportsTo: 2113},
//    {ccId: 23133, Name: "Isabella 2075487689", Budget: "300.00", Spend: "277.00", ReportsTo: 2113},
//    {ccId: 23134, Name: "Ella 2075896979", Budget: "500.00", Spend: "521.00", ReportsTo: 2113},
//    {ccId: 23231, Name: "Braxton 2078912233", Budget: "250.00", Spend: "263.00", ReportsTo: 2113},
//    {ccId: 23232, Name: "Blake 2078986545", Budget: "350.00", Spend: "320.00", ReportsTo: 2113},
//    {ccId: 23233, Name: "Jackson 2078989870", Budget: "150.00", Spend: "194.00", ReportsTo: 2113},
//    {ccId: 23234, Name: "Archie 2078989989", Budget: "350.00", Spend: "366.00", ReportsTo: 2113},
//    {ccId: 31131, Name: "Nate 2078697969", Budget: "650.00", Spend: "600.00", ReportsTo: 2113},
//    {ccId: 31132, Name: "Jayden 2078976796", Budget: "350.00", Spend: "400.00", ReportsTo: 2113},
//    {ccId: 31133, Name: "Lincoln 2078986969", Budget: "650.00", Spend: "600.00", ReportsTo: 2113},
//    {ccId: 31134, Name: "Micheal 2078969699", Budget: "350.00", Spend: "400.00", ReportsTo: 2113},
//    {ccId: 32131, Name: "Chase 2078343665", Budget: "650.00", Spend: "600.00", ReportsTo: 2113},
//    {ccId: 32132, Name: "Theodore 2078986365", Budget: "350.00", Spend: "400.00", ReportsTo: 2113},
//    {ccId: 32133, Name: "Jordan 2078983454", Budget: "650.00", Spend: "600.00", ReportsTo: 2113},
//    {ccId: 32134, Name: "Zachary 2078989169", Budget: "350.00", Spend: "400.00", ReportsTo: 2113},
//    {ccId: 22243, Name: "Lilly 2075484334", Budget: "250.00", Spend: "309.00", ReportsTo: 2113},
//    {ccId: 23141, Name: "Ivy 2075986869", Budget: "200.00", Spend: "182.00", ReportsTo: 2113},
//    {ccId: 23142, Name: "Abigail 2075489999", Budget: "200.00", Spend: "222.00", ReportsTo: 2113},
//    {ccId: 23143, Name: "Chelsea 2078898965", Budget: "100.00", Spend: "135.00", ReportsTo: 2113},
//    {ccId: 23143, Name: "Jessica 207898899", Budget: "200.00", Spend: "253.00", ReportsTo: 2113},
//    {ccId: 23241, Name: "Elijah 2079898989", Budget: "200.00", Spend: "175.00", ReportsTo: 2113},
//    {ccId: 23242, Name: "Logan 2078989165", Budget: "350.00", Spend: "343.00", ReportsTo: 2113},
//    {ccId: 23243, Name: "Riley 2078989805", Budget: "250.00", Spend: "244.00", ReportsTo: 2113},
//    {ccId: 31141, Name: "Harvey 2078907077", Budget: "650.00", Spend: "600.00", ReportsTo: 2113},
//    {ccId: 31142, Name: "Matthew 2078709709", Budget: "350.00", Spend: "400.00", ReportsTo: 2113},
//    {ccId: 31143, Name: "Luke 2078707900", Budget: "650.00", Spend: "600.00", ReportsTo: 2113},
//    {ccId: 2114, Name: "Finance", Budget: "15,650.00", Spend: "15,356.00", ReportsTo: 1},
//    {ccId: 21141, Name: "Olivia 2056543277", Budget: "150.00", Spend: "155.00", ReportsTo: 2114},
//    {ccId: 21142, Name: "Chloe 2056548439", Budget: "200.00", Spend: "189.00", ReportsTo: 2114},
//    {ccId: 21143, Name: "Tyler 2056541175", Budget: "100.00", Spend: "115.00", ReportsTo: 2114},
//    {ccId: 21144, Name: "Ryan 2056545731", Budget: "200.00", Spend: "216.00", ReportsTo: 2114},
//    {ccId: 21241, Name: "Levi 2056544124", Budget: "400.00", Spend: "405.00", ReportsTo: 2124},
//    {ccId: 21242, Name: "Ivy 2056544642", Budget: "150.00", Spend: "135.00", ReportsTo: 2124},
//    {ccId: 21243, Name: "Maddison 2056345634", Budget: "250.00", Spend: "254.00", ReportsTo: 2124},
//    {ccId: 22141, Name: "Imogen 2056544785", Budget: "200.00", Spend: "204.00", ReportsTo: 2214},
//    {ccId: 22142, Name: "Aiden 2056549889", Budget: "250.00", Spend: "249.00", ReportsTo: 2214},
//    {ccId: 22143, Name: "Matthew 2056532232", Budget: "150.00", Spend: "151.00", ReportsTo: 2214},
//    {ccId: 22144, Name: "Connor 2056554333", Budget: "300.00", Spend: "284.00", ReportsTo: 2214},
//    {ccId: 22241, Name: "Layla 2075484334", Budget: "400.00", Spend: "386.00", ReportsTo: 2224},
//    {ccId: 22242, Name: "Braxton 2075484333", Budget: "250.00", Spend: "270.00", ReportsTo: 2224},
//    {ccId: 22243, Name: "Lilly 2075484334", Budget: "250.00", Spend: "309.00", ReportsTo: 2224},
//    {ccId: 23141, Name: "Ivy 2075986869", Budget: "200.00", Spend: "182.00", ReportsTo: 2314},
//    {ccId: 23142, Name: "Abigail 2075489999", Budget: "200.00", Spend: "222.00", ReportsTo: 2314},
//    {ccId: 23143, Name: "Chelsea 2078898965", Budget: "100.00", Spend: "135.00", ReportsTo: 2314},
//    {ccId: 23143, Name: "Jessica 207898899", Budget: "200.00", Spend: "253.00", ReportsTo: 2314},
//    {ccId: 23241, Name: "Elijah 2079898989", Budget: "200.00", Spend: "175.00", ReportsTo: 2324},
//    {ccId: 23242, Name: "Logan 2078989165", Budget: "350.00", Spend: "343.00", ReportsTo: 2324},
//    {ccId: 23243, Name: "Riley 2078989805", Budget: "250.00", Spend: "244.00", ReportsTo: 2324},
//    {ccId: 31141, Name: "Harvey 2078907077", Budget: "650.00", Spend: "600.00", ReportsTo: 3114},
//    {ccId: 31142, Name: "Matthew 2078709709", Budget: "350.00", Spend: "400.00", ReportsTo: 3114},
//    {ccId: 31143, Name: "Luke 2078707900", Budget: "650.00", Spend: "600.00", ReportsTo: 3114},
//    {ccId: 31144, Name: "Blake 2070790790", Budget: "350.00", Spend: "400.00", ReportsTo: 3114},
//    {ccId: 23231, Name: "Braxton 2078912233", Budget: "250.00", Spend: "263.00", ReportsTo: 3114},
//    {ccId: 23232, Name: "Blake 2078986545", Budget: "350.00", Spend: "320.00", ReportsTo: 3114},
//    {ccId: 23233, Name: "Jackson 2078989870", Budget: "150.00", Spend: "194.00", ReportsTo: 3114},
//    {ccId: 23234, Name: "Archie 2078989989", Budget: "350.00", Spend: "366.00", ReportsTo: 3114},
//    {ccId: 31131, Name: "Nate 2078697969", Budget: "650.00", Spend: "600.00", ReportsTo: 3114},
//    {ccId: 31132, Name: "Jayden 2078976796", Budget: "350.00", Spend: "400.00", ReportsTo: 3114},
//    {ccId: 31133, Name: "Lincoln 2078986969", Budget: "650.00", Spend: "600.00", ReportsTo: 3114},
//    {ccId: 31134, Name: "Micheal 2078969699", Budget: "350.00", Spend: "400.00", ReportsTo: 3114},
//    /*	{ccId: 4, Name: "China",  Budget: "25,500.00",Spend:"25,300.00", ReportsTo: 1},		
//     {ccId: 41, Name: "Qinghai",  Budget: "15,000.00",Spend:"14,000.00", ReportsTo: 1},
//     {ccId: 411, Name: "102376539", Budget: "1,100.00",Spend:"1,050.00", ReportsTo: 41},
//     {ccId: 42, Name: "Heilongjiang",  Budget: "10,500.00", Spend:"11,300.00",ReportsTo: 1},
//     {ccId: 411, Name: "102376539", Budget: "1,100.00",Spend:"1,050.00", ReportsTo: 41},*/
//];

var sampleData2 = [];
var sampleData2NextID = sampleData2.length + 1;

function getIndexById(id) {

    var idx,
            l = sampleData2.length;


    for (var j; j < l; j++) {
        if (sampleData2[j].ProductID == id) {
            return j;
        }
    }

    return null;


}
var onDataBound = function () {
    $('tr').each(function () {

        did = $(this).find("td:eq(2)").text();
        sid = $(this).find("td:eq(1)").text();
        //alert(did+"  "+sid);
        //alert($(this).find("td:last-child").html());
        if (sid > did)
        {
            //alert(did);
            $($(this).find("td:eq(2)")).css("color", "#A7D163");
        }
        else if (sid < did) {
            $($(this).find("td:eq(2)")).css("color", "#ED561B");

        }
        else
        {
            $($(this).find("td:eq(2)")).css("color", "black");
        }
    });



};

function loadDepartmentBaseData() {
    var selMonth = $("#hierarchy_month_combo_id").val();
    var reqData = {};
    reqData.selMonth = selMonth;
    procesRequest("fetchHierarchyDepartmentBase.action", reqData, fnfetchDepartmentbasesucc, fnfetchDepartmentbaseFail, false);
}

function fnfetchDepartmentbasesucc(response) {
    var res = JSON.parse(response);
    var status = res.objCRSResponse.status;
    if (res.objCRSResponse.success == true) {
        var departmentdata = res.objCRSResponse.data;
        sampleData2 = departmentdata;
        for (var i = 0; i < sampleData2.length; i++) {
            if (sampleData2[i].ReportsTo == "") {
                sampleData2[i].ReportsTo = null;
            }
        }
        departmenttree();
    } else {
        showMessage("Error", "Unable to fetch Department base details.", 2);
    }
}

function fnfetchDepartmentbaseFail(response) {
}

$(document).ready(function () {
    departmenttree();
});

function departmenttree() {

    var dataSource = new kendo.data.TreeListDataSource({
        transport: {
            read: {
                url: "fetchHierarchyDepartmentBase.action",
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
                expanded: false
            }

        }
    });

//sampleData=[
// {ccId: 227, Name: "9898989", Budget: "20000", ReportsTo: 226},
// {ccId: 228, Name: "33434343", Budget: "1222", ReportsTo: 226},
//  {ccId: 203, Name: "INDIA", Budget: "21222", ReportsTo: null},
// {ccId: 226, Name: "hyd", Budget: "21222", ReportsTo: 208},
// {ccId: 208, Name: "CHANDRIKA AP", Budget: "21222", ReportsTo: 203}];
    console.log(dataSource.data());
    console.log("before department dataSource");

    $("#treelist3").kendoTreeList({
        dataSource: dataSource,
        resizable: true,
        height: 300,
        columns: [
            {field: "Name", title: "Name", expandable: true},
            //{ field: "Manager", title: "Manager", width: 190},
            {field: "Budget", title: "Budget"},
            {field: "Spend", title: "Spend"}

        ]
    })

}
