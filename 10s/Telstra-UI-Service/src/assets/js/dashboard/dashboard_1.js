
var currentData="";
var color='#FFFFFF';
var backFlag="";
var continentData="";
var CountryData="";
var mapPieDataArr="";
var mapLink='';
var barResult="";
var pieDataArr=[]; 
var carrierGraphical=true;
var topGraphical=true;
var topSpenderNext=false;

 
var colorArr=['#FFCC99', '#E68A00', '#FFCC00', '#4747FF', '#FFFFCC', "#9EBF5E", "#4775FF","#AF5E5E","#19FFFF"];

//var isDillDown=false;
//var continentCode="";

$(document).ready(function() {
  
    //for responsive bar-chart and pie-chart
    $(window).on("resize", function() {
        kendo.resize($("#bar-chart"));
        kendo.resize($("#pie-chart"));
        kendo.resize($("#grid"));
        // kendo.resize($("#container"));
        if($("#grid").data("kendoChart")!=null)
            $("#grid").data("kendoChart").refresh();

    });


    //Load Categories
    procesRequest("loadCategory",{},fnCallbackLoadCategoriesSucc,fnCallbackLoadCategoriesFail);

    function fnCallbackLoadCategoriesSucc(res) {
        var temp = JSON.parse(res).objCRSResponse.data;
        var response = temp.status;
        if (response == "success") {
            var result = temp.categoryArr;
            for (var i = 0; i < result.length; i++) {
                var value = result[i].split(" ");
                $("#analysis").append($("<option>").val(value[0]).html(result[i]));
            }

//dynamic currency combo loading.....
            var cur_res = temp.CURRENCY_DATA;
            $("#currency_id").html("");
//            $("#currency_id").append($("<option>").val("EUR").html("EUR"));
            for (var i = 0; i < cur_res.length; i++) {
                $("#currency_id").append($("<option>").val(cur_res[i].CONVERSION_CURRENCY).html(cur_res[i].CONVERSION_CURRENCY));
            }
$("#currency_id").val("EUR");
        } else {
            showMessage("Error", "Unable to load location details", 2);
        }
    }
    function fnCallbackLoadCategoriesFail(){
        showMessage("Error", "Unable to get Pie  details", 2);
    }

    $("#month_slider_example").ionRangeSlider({
        type:"double",
        grid:!0,
        from:0,
        to:24,
        onFinish: fnSlideVal,
        values:monthsArrayGlobal
    })
    //  var dateStr="JAN2015,FEB2015,MAR2015,APR2015,MAY2015,JUN2015,JUL2015,AUG2015,SEP2015,OCT2015,NOV2015,DEC2015";

    var result='';



    /*******************************
DYNAMICAL MAPS
     *******************************/
    $(document).ready(function() {
        $('#nextId').hide();
        $('#prevId').hide();
        loadWorldMap();
        $('#backId').on('click', function(e) {
            if($('#analysis').val()=='Carrier'){
                if(mapPieCarrierArrIndex>0){
                    mapPieCarrierArrIndex=mapPieCarrierArrIndex-1;
                    var reqData={}
                    reqData.analysis= $('#analysis').val();
                    reqData.currency= $('#currency_id').val();
                    reqData.type= $('#type').val();
                    reqData.dateStr=dateStr
                    startIndex=mapPieCarrierArrStartIndex[mapPieCarrierArrIndex];
                    endIndex=mapPieCarrierArrStartIndex[mapPieCarrierArrIndex]+10;

                    reqData.startIndex=startIndex;
                    reqData.endIndex=endIndex;

                    if(mapPieCarrierArrIndex==0){
                        isDillDown=false;
                        $("#pie-chart-type").val($('#type').val());
                        $('#Spendbycountry').html('Drilldown: '+$('#type').val()+' by country (All) Top 25');
                        $('#Spendbymonth').html('Trend: '+$('#type').val()+' by month (All)');
                    }
                    //                    pieMapCarrier(mapPieCarrierArr[mapPieCarrierArrIndex]);
                    if(isDillDown){
                        reqData.drillDownIndex=mapPieCarrierArrIndex;
                        if(mapPieCarrierArrIndex==1){
                            reqData.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];

                        }else if(mapPieCarrierArrIndex==2){

                            reqData.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                            reqData.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

                        }else if(mapPieCarrierArrIndex==3){
                            reqData.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                            reqData.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                            reqData.GROUP_LONG_DESCRIPTION=mapPieCarrierRequestArr["GROUP_LONG_DESCRIPTION"];
                        }

                        procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);
                    }else{
                        procesRequest("fetchDashBoardMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);
                        procesRequest("fetchDashBoardChartAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
                        procesRequest("fetchDashBoardGridAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);
                    }

                }
            }else{
                //        alert("hiiii");
                if(backFlag==""){
                }else if(backFlag=="1"){
                    isDillDown=false;
                    $("#pie-chart-type").val($('#type').val());
                    $('#Spendbycountry').html('Drilldown: '+$('#type').val()+' by country (All) Top 25');
                    $('#Spendbymonth').html('Trend: '+$('#type').val()+' by month (All)');
                    var reqData = {};
                    reqData.analysis= $('#analysis').val();
                    reqData.currency= $('#currency_id').val();
                    reqData.type= $('#type').val();
                    reqData.dateStr=dateStr;
                    $("#grid-loading").show();
                    $("#map-loading").show();
                    //                    $("#pie-chart-loading").show();
                    $("#bar-chart-loading").show();
                    if($("#analysis").val()=='Top'){

                        reqData.startIndex=startIndex;
                        reqData.endIndex=endIndex;

                        if(startIndex==1){
                            $("#prevId").hide();
                        }else{
                            $("#prevId").show();
                        }
                        if(endIndex==31){
                            $("#nextId").hide();
                        }else{
                            $("#nextId").show();
                        }

                        procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
                        backFlag="";
                    }else{
                        backFlag="";
                        loadWorldMap();
                    }
                    procesRequest("fetchDashBoardChartAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
                    //                    procesRequest("fetchDashBoardPieAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);

                    procesRequest("fetchDashBoardGridAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);
                    $("#grid-loading").show();
                    $("#map-loading").show();
                    //                    $("#pie-chart-loading").show();
                    $("#bar-chart-loading").show();
                }else if(backFlag=="2"){

                    loadContinentMap(continentData);
                }
                else if(backFlag=="3"){
                    loadCountryMap(CountryData);
                }
            }
        });
    });


    $('#nextId').on('click', function(e) {
        if($('#analysis').val()=='Top'){
            startIndex=endIndex;
            endIndex=endIndex+10;
            topSpenderNext=true;
            $("#map-loading").show();
            $('#prevId').show();
            var reqData={};
            if(endIndex<31){
                reqData.analysis= $('#analysis').val();
                reqData.currency= $('#currency_id').val();
                reqData.type= $('#type').val();
                reqData.dateStr=dateStr;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }else if(endIndex=31){
                $('#nextId').hide();
                reqData.analysis= $('#analysis').val();
                reqData.currency= $('#currency_id').val();
                reqData.type= $('#type').val();
                reqData.dateStr=dateStr;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }
        }else if($('#analysis').val()=='Carrier'){
            startIndex=endIndex;
            endIndex=endIndex+10;
            $("#map-loading").show();
            $('#prevId').show();
            var reqData={}
            reqData.analysis= $('#analysis').val();
            reqData.currency= $('#currency_id').val();
            reqData.type= $('#type').val();
            reqData.dateStr=dateStr;
            reqData.startIndex=startIndex;
            reqData.endIndex=endIndex;
            //console.log(reqData);
            if(isDillDown){
                reqData.drillDownIndex=mapPieCarrierArrIndex;
                if(mapPieCarrierArrIndex==1){
                    reqData.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==2){

                    reqData.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==3){
                    reqData.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                    reqData.GROUP_LONG_DESCRIPTION=mapPieCarrierRequestArr["GROUP_LONG_DESCRIPTION"];
                }
                //console.log(reqData);
                procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);
            }

            else
            {
                //console.log(reqData);
                procesRequest("fetchDashBoardMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);
            }


        }else if($('#analysis').val()=='Charge'){
          
            var reqData={};
            reqData.analysis= $('#analysis').val();
            reqData.currency= $('#currency_id').val();
            reqData.type= $('#type').val();
            reqData.dateStr=dateStr;
            startIndex=startIndex+10;
            endIndex=endIndex+10;
            reqData.startIndex=startIndex;
            reqData.endIndex=endIndex;
           
            procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
        }


    });
    $('#prevId').on('click', function(e) {
        if($('#analysis').val()=='Top'){
            var reqData={}
            startIndex=startIndex-10;
            endIndex=startIndex+10;
            $('#nextId').show();
            $("#map-loading").show();
            if(startIndex>1){
                reqData.analysis= $('#analysis').val();
                reqData.currency= $('#currency_id').val();
                reqData.type= $('#type').val();
                reqData.dateStr=dateStr;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }else if(startIndex=1){
                reqData.analysis= $('#analysis').val();
                reqData.currency= $('#currency_id').val();
                reqData.type= $('#type').val();
                reqData.dateStr=dateStr;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
                $('#prevId').hide();
            }
        }else if($('#analysis').val()=='Carrier'){
            startIndex=startIndex-10;
            endIndex=startIndex+10;
            $('#nextId').show();
            $("#map-loading").show();
            var reqData={}
            reqData.analysis= $('#analysis').val();
            reqData.currency= $('#currency_id').val();
            reqData.type= $('#type').val();
            reqData.dateStr=dateStr;
            reqData.startIndex=startIndex;
            reqData.endIndex=endIndex;
            if(isDillDown){
                reqData.drillDownIndex=mapPieCarrierArrIndex;
                if(mapPieCarrierArrIndex==1){
                    reqData.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==2){

                    reqData.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==3){
                    reqData.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                    reqData.GROUP_LONG_DESCRIPTION=mapPieCarrierRequestArr["GROUP_LONG_DESCRIPTION"];
                }

                procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);
            }else{
                procesRequest("fetchDashBoardMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);
            }



        }else if($('#analysis').val()=='Charge'){
            var reqData={};
            reqData.analysis= $('#analysis').val();
            reqData.currency= $('#currency_id').val();
            reqData.type= $('#type').val();
            reqData.dateStr=dateStr;
            startIndex=startIndex-10;
            endIndex=endIndex-10;
            reqData.startIndex=startIndex;
            reqData.endIndex=endIndex;
            procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
        }

    });


    /*******************************
DYNAMICAL BAR CHART
         *******************************/

    var number =$("#month_slider_example").ionRangeSlider("value");
    from = number.data("from");
    to =  number.data("to");

    //    var reqData = {};
    reqData.analysis= $('#analysis').val();
    reqData.currency = $('#currency_id').val();
    reqData.type= $('#type').val();
    reqData.dateStr=dateStr;
    //    alert(reqData.toSource());
    procesRequest("fetchDashBoardChartAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);

    /*******************************
DYNAMICAL PIE CHART
     *******************************/

    //    procesRequest("fetchDashBoardPieAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
    //    startIndex=startIndex-10;
    //    endIndex=endIndex-10;
    //    reqData.startIndex=startIndex;
    //    reqData.endIndex=endIndex;
    //    procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);



    /*******************************
DYNAMICAL GRID
     *******************************/

    procesRequest("fetchDashBoardGridAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);


    var from='';
    var to='';
    //getting values from slider
    function fnSlideVal(data11) {
        carrierGraphical=true;
        topGraphical=true;
        var number =$("#month_slider_example").ionRangeSlider("value");
       
        var st=number.data("from");
        var st1=number.data("to");
        //alert("Data:: "+st+" to:: "+st1);
       
        from = data11.from;
        to = data11.to;
             //   alert(from+"    "+to);
        var monthNames = monthsArrayGlobal;//['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var dateStr1='';
        if(to==from){
             dateStr1=","+monthNames[to];
        }else{
            for(var i=from;i<=to;i++){
                dateStr1=dateStr1+","+(monthNames[i]);
            }
        }
//        if(to==from){
//            //            alert("if");
//            dateStr1=","+monthNames[to-1];
//        //            alert(dateStr1);
//        }else if(to>from){
//            for(var i=from-1;i<to;i++){
//                dateStr1=dateStr1+","+(monthNames[i]);
//            }
//        }
//        else{
//            for(var i=from-1;i<=11;i++){
//                dateStr1=dateStr1+","+(monthNames[i]);
//            }
//            for(var j=0;j<to;j++){
//                dateStr1=dateStr1+","+(monthNames[j])
//            }
//        }
        dateStr = dateStr1.substring(1);
        //        alert(dateStr);

        var reqData = {};
        reqData.analysis= $('#analysis').val();
        reqData.currency = $('#currency_id').val();
        reqData.type= $('#type').val();
        reqData.dateStr=dateStr;
       
        $('#pie-chart-charge-category').empty();
        $('#pie-chart-charge-category').append(' by charge category ');
        //        alert(isDillDown);
        if(isDillDown){
            $('#nextId').hide();
            $('#prevId').hide();
            reqData.continent=continentCode.toUpperCase();
            if( $('#analysis').val()=='Top'){
                $("#map-loading").show(); 
                reqData.SUB_OWNER=subowner;
                procesRequest("fetchDashBoardDrillDownMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);



            }else if($('#analysis').val()=='Carrier'){
                $('#nextId').hide();
                $('#prevId').hide();
                $("#map-loading").show();

                var reqData2={}
                reqData2.analysis= $('#analysis').val();
                reqData2.currency = $('#currency_id').val();
                reqData2.type= $('#type').val();
                reqData2.dateStr=dateStr;
                startIndex=1;
                endIndex=11;
                reqData2.startIndex=startIndex;
                reqData2.endIndex=endIndex;

                reqData2.drillDownIndex=mapPieCarrierArrIndex;
                if(mapPieCarrierArrIndex==1){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==2){

                    reqData2.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==3){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                    reqData2.GROUP_LONG_DESCRIPTION=mapPieCarrierRequestArr["GROUP_LONG_DESCRIPTION"];
                }

                //console.log(reqData2);
                procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData2,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);
            
            //            }else if($('#analysis').val()=='Charge'){
            //                startIndex=1;
            //                endIndex=11;
            //                reqData.startIndex=startIndex;
            //                reqData.endIndex=endIndex;
            //
            //                procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
            //            }
            }else{
                $("#grid-loading").show();
                $("#map-loading").show();
                $("#pie-chart-loading").show();
                $("#bar-chart-loading").show();
                $("#pie-chart-type").val($('#type').val());
                procesRequest("fetchDashBoardMapDrilldownAction",reqData,loadContinentMapSuccess,fnCallbackFetchPieChartFail);
                //                procesRequest("fetchDashBoardPieDrilldownAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
                procesRequest("fetchDashBoardChartDrilldownAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
                procesRequest("fetchDashBoardGridDrilldownAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);

            } 

        } else{
            $("#pie-chart-type").val($('#type').val());
            $("#grid-loading").show();
            $("#map-loading").show();
            $("#pie-chart-loading").show();
            $("#bar-chart-loading").show();
            if( $('#analysis').val()=='Top'){
                $('#nextId').show();
                $('#prevId').hide();
                topSpenderNext=false;
                startIndex=1;
                endIndex=11;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }else if($('#analysis').val()=='Carrier'){
                $('#nextId').hide();
                $('#prevId').hide();
                startIndex=1;
                endIndex=11;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                //                alert($('#analysis').val());
                procesRequest("fetchDashBoardMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);

            }else {
                procesRequest("fetchDashBoardMapAction",reqData,fnCallbackFetchMapChartSucc,fnCallbackFetchMapChartFail);
            }
            //            if($('#analysis').val()=='Charge'){
            //            startIndex=1;
            //            endIndex=11;
            //            reqData.startIndex=startIndex;
            //            reqData.endIndex=endIndex;
            //
            //            procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
            //            }
            //            else{
            //                procesRequest("fetchDashBoardPieAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
            //            }
            procesRequest("fetchDashBoardChartAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
            procesRequest("fetchDashBoardGridAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);


        }
    }
    $('#analysis').on('change', function () {
        $('#container').empty();
        if ($('#container').highcharts()) {
            $('#container').highcharts().destroy();
        }
        $('#container').removeClass("k-grid k-widget");
        $('#container').attr("data-role", "chart");
        $('#container').removeAttr("style");
        $('#container').css("position", "relative");

        carrierGraphical = true;
        topGraphical = true;
        var reqData = {};
        reqData.analysis= $('#analysis').val();
        reqData.currency = $('#currency_id').val();
        reqData.type= $('#type').val();
   
        $('#pie-chart-charge-category').empty();
        $('#pie-chart-charge-category').append(' by charge category ');
        reqData.dateStr=dateStr;


        if($('#analysis').val()=='Top'){
            $('#Spendbyregion').html('Navigation: '+$('#type').val()+' by ' +$('#analysis').val().toLowerCase()+' spender');
        }else{
            $('#Spendbyregion').html('Navigation: '+$('#type').val()+' by ' +$('#analysis').val().toLowerCase());
        }
        $('#Spendbycountry').html('Drilldown: '+$('#type').val().toLowerCase()+' by country (All) Top 25');
        $('#Spendbymonth').html('Trend: '+$('#type').val().toLowerCase()+' by month (All)');

        //        var option = $('<option></option>').attr("value", "Spend").text("Spend by origin");
        //        $("#charge_type").empty().append(option);
        //console.log($('#analysis').val());
        isDillDown=false;
        if(isDillDown){
            $('#nextId').hide();
            $('#prevId').hide();
            reqData.continent=continentCode.toUpperCase();
            if( $('#analysis').val()=='Top'){
                $("#map-loading").show();
                $('#nextId').show();
                $('#prevId').hide();
                reqData.SUB_OWNER=subowner;
                backFlag="";
                procesRequest("fetchDashBoardDrillDownMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }else if($('#analysis').val()=='Carrier'){

                //                $('#nextId').hide();
                //                $('#prevId').hide();
                $("#map-loading").show();

                var reqData2={}
                reqData2.analysis= $('#analysis').val();
                reqData2.currency = $('#currency_id').val();
                reqData2.type= $('#type').val();
                reqData2.dateStr=dateStr;
                startIndex=1;
                endIndex=11;
                reqData2.startIndex=startIndex;
                reqData2.endIndex=endIndex;
                reqData2.drillDownIndex=mapPieCarrierArrIndex;
                if(mapPieCarrierArrIndex==1){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==2){

                    reqData2.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==3){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                    reqData2.GROUP_LONG_DESCRIPTION=mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                }
                subowner=e.category;
                //console.log(reqData2);
                procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData2,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);


            }

            else{
                $("#grid-loading").show();
                $("#map-loading").show();
                $("#pie-chart-loading").show();
                $("#bar-chart-loading").show();
                $("#pie-chart-type").val($('#type').val());
                $('#nextId').hide();
                $('#prevId').hide();
                procesRequest("fetchDashBoardMapDrilldownAction",reqData,loadContinentMapSuccess,fnCallbackFetchPieChartFail);
                //                if($('#analysis').val()=='Charge'){
                //                    $('#charge_type').data($('#analysis').val());
                //                startIndex=1;
                //                endIndex=11;
                //                reqData.startIndex=startIndex;
                //                reqData.endIndex=endIndex;
                //
                //                procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
                //                } else{
                //                    procesRequest("fetchDashBoardPieDrilldownAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
                //                }
                procesRequest("fetchDashBoardChartDrilldownAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
                procesRequest("fetchDashBoardGridDrilldownAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);
            }

        } else{
            $("#pie-chart-type").val($('#type').val());
            $("#grid-loading").show();
            $("#map-loading").show();
            $("#pie-chart-loading").show();
            $("#bar-chart-loading").show();
          
            //            if($('#analysis').val()=='Charge'){

            //                var option = $('<option></option>').attr("value", "Spend").text("Spend by "+$('#analysis').val().toLowerCase());
            //                $("#charge_type").empty().append(option);
            //            startIndex=1;
            //            endIndex=11;
            //            reqData.startIndex=startIndex;
            //            reqData.endIndex=endIndex;
            //
            //            procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
            //            }else{
            //                procesRequest("fetchDashBoardPieAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
            //            }
            procesRequest("fetchDashBoardChartAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
            procesRequest("fetchDashBoardGridAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);
            if( $('#analysis').val()=='Top'){
                //                    reqData.SUB_OWNER=subowner;
                $('#nextId').show();
                $('#prevId').hide();
                topSpenderNext=false;
                backFlag="";
                startIndex=1;
                endIndex=11;

                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }else if($('#analysis').val()=='Carrier'){
                $('#nextId').show();
                $('#prevId').hide();
                startIndex=1;
                endIndex=11;

                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                //                alert($('#analysis').val());
                procesRequest("fetchDashBoardMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);

            }


            else{
                $('#nextId').hide();
                $('#prevId').hide();
                procesRequest("fetchDashBoardMapAction",reqData,fnCallbackFetchMapChartSucc,fnCallbackFetchMapChartFail);
            }

        }
    });
    $('#type').on('change', function() {
        var typeVal = $('#type').val();
      
        if (typeVal == "Spend") {
             $('#currency_id').show();

         } else { 
            $('#currency_id').hide();
        }
        carrierGraphical=true;
        topGraphical=true;
        if($('#analysis').val()=='Top'){
            $('#Spendbyregion').html('Navigation: '+$('#type').val()+' by ' +$('#analysis').val().toLowerCase()+' spender');
        }else{
            $('#Spendbyregion').html('Navigation: '+$('#type').val()+' by ' +$('#analysis').val().toLowerCase());
        }
        if(!isDillDown){
            $('#Spendbycountry').html('Drilldown: '+$('#type').val().toLowerCase()+' by country (All) Top 25');
            $('#Spendbymonth').html('Trend: '+$('#type').val().toLowerCase()+' by month (All)');
        }

        var reqData = {};
        reqData.analysis= $('#analysis').val();
        reqData.currency = $('#currency_id').val();
        reqData.type= $('#type').val();
        reqData.dateStr=dateStr;

        $('#pie-chart-charge-category').empty();
        $('#pie-chart-charge-category').append(' by charge category ');
        if(isDillDown){
            $('#nextId').hide();
            $('#prevId').hide();
            reqData.continent=continentCode.toUpperCase();
            if( $('#analysis').val()=='Top'){
                $("#map-loading").show();
                reqData.SUB_OWNER=subowner;
                // console.log(reqData);
                procesRequest("fetchDashBoardDrillDownMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);



            }
            else if($('#analysis').val()=='Carrier'){

                $('#nextId').hide();
                $('#prevId').hide();
                $("#map-loading").show();

                var reqData2={}
                reqData2.analysis= $('#analysis').val();
                reqData2.currency = $('#currency_id').val();
                reqData2.type= $('#type').val();
                reqData2.dateStr=dateStr;
                startIndex=1;
                endIndex=11;
                reqData2.startIndex=startIndex;
                reqData2.endIndex=endIndex;
                reqData2.drillDownIndex=mapPieCarrierArrIndex;
                if(mapPieCarrierArrIndex==1){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==2){

                    reqData2.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==3){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                    reqData2.GROUP_LONG_DESCRIPTION=mapPieCarrierRequestArr["GROUP_LONG_DESCRIPTION"];
                }

                //console.log(reqData2);
                procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData2,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);

            //            }else if($('#analysis').val()=='Charge'){
            //                startIndex=1;
            //                endIndex=11;
            //                reqData.startIndex=startIndex;
            //                reqData.endIndex=endIndex;
            //
            //                procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
            }else{
                $("#grid-loading").show();
                $("#map-loading").show();
                $("#pie-chart-loading").show();
                $("#bar-chart-loading").show();
                $("#pie-chart-type").val($('#type').val());
                $('#nextId').hide();
                $('#prevId').hide();
                procesRequest("fetchDashBoardMapDrilldownAction",reqData,loadContinentMapSuccess,fnCallbackFetchPieChartFail);
                //                procesRequest("fetchDashBoardPieDrilldownAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
                procesRequest("fetchDashBoardChartDrilldownAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
                procesRequest("fetchDashBoardGridDrilldownAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);
            }
        //                alert(reqData.toSource());


        } else{
            $("#grid-loading").show();
            $("#map-loading").show();
            $("#pie-chart-loading").show();
            $("#bar-chart-loading").show();
            $("#pie-chart-type").val($('#type').val());
            if( $('#analysis').val()=='Top'){
                //                 reqData.SUB_OWNER=subowner;
                $('#nextId').show();
                $('#prevId').hide();
                topSpenderNext=false;
                startIndex=1;
                endIndex=11;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }else if($('#analysis').val()=='Carrier'){
                $('#nextId').hide();
                $('#prevId').hide();
                //                alert($('#analysis').val());
                startIndex=1;
                endIndex=11;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);

            }

            else{
                $('#nextId').hide();
                $('#prevId').hide();
                procesRequest("fetchDashBoardMapAction",reqData,fnCallbackFetchMapChartSucc,fnCallbackFetchMapChartFail);
            }
            //            if($('#analysis').val()=='Charge'){
            //            startIndex=1;
            //            endIndex=11;
            //            reqData.startIndex=startIndex;
            //            reqData.endIndex=endIndex;
            //
            //            procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
            //                     }
            //            else{
            //                procesRequest("fetchDashBoardPieAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
            //            }
            procesRequest("fetchDashBoardChartAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
            procesRequest("fetchDashBoardGridAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);

            }
       
    });
    $('#pie-chart-type').on('change', function() {
        $('#pie-chart-loading').show();
        var reqData = {};
        reqData.analysis= $('#analysis').val();
        reqData.currency = $('#currency_id').val();
        reqData.type= $('#pie-chart-type').val();
        if(chargeDateStr!=""){
            reqData.dateStr=chargeDateStr;
        } else{
            reqData.dateStr=dateStr;
        }
        //        if(isDillDown && $('#analysis').val()=='Location' ){
        if(isDillDown){
            if($('#analysis').val()=='Location')
            reqData.continent=continentCode.toUpperCase();
        }
        //            procesRequest("fetchDashBoardPieDrilldownAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);

        //        }else if($('#analysis').val()=='Charge'){
        startIndex=1;
        endIndex=11;
        reqData.startIndex=startIndex;
        reqData.endIndex=endIndex;

        procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);
    //        }else{
    //            procesRequest("fetchDashBoardPieAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
    //        }
    });
    $('#currency_id').on('change', function () {
        var reqData = {};
        reqData.analysis= $('#analysis').val();
        reqData.currency = $('#currency_id').val();
        reqData.type= $('#type').val();
        reqData.dateStr=dateStr;
        if(isDillDown){
            $('#nextId').hide();
            $('#prevId').hide();
            reqData.continent=continentCode.toUpperCase();
            if( $('#analysis').val()=='Top'){
                $("#map-loading").show();
                reqData.SUB_OWNER=subowner;
                procesRequest("fetchDashBoardDrillDownMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);

            }else if($('#analysis').val()=='Carrier'){
                   $('#nextId').hide();
                $('#prevId').hide();
                $("#map-loading").show();

                var reqData2={}
                reqData2.analysis= $('#analysis').val();
                reqData2.currency = $('#currency_id').val();
                reqData2.type= $('#type').val();
                reqData2.dateStr=dateStr;
                startIndex=1;
                endIndex=11;
                reqData2.startIndex=startIndex;
                reqData2.endIndex=endIndex;
                reqData2.drillDownIndex=mapPieCarrierArrIndex;
                if(mapPieCarrierArrIndex==1){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==2){

                    reqData2.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

                }else if(mapPieCarrierArrIndex==3){
                    reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
                    reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];
                    reqData2.GROUP_LONG_DESCRIPTION=mapPieCarrierRequestArr["GROUP_LONG_DESCRIPTION"];
                }

                //console.log(reqData2);
                procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData2,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);

            }
            else{
                $("#grid-loading").show();
                $("#map-loading").show();
                $("#pie-chart-loading").show();
                $("#bar-chart-loading").show();
                $('#nextId').hide();
                $('#prevId').hide();
                procesRequest("fetchDashBoardMapDrilldownAction",reqData,loadContinentMapSuccess,fnCallbackFetchPieChartFail);
//                procesRequest("fetchDashBoardPieDrilldownAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
                procesRequest("fetchDashBoardChartDrilldownAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
                procesRequest("fetchDashBoardGridDrilldownAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);
            }

        } else{
            $("#map-loading").show();
            $("#grid-loading").show();

            $("#pie-chart-loading").show();
            $("#bar-chart-loading").show();
            if( $('#analysis').val()=='Top'){
                $('#nextId').show();
                $('#prevId').hide();
                startIndex=1;
                endIndex=11;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex; //                    reqData.SUB_OWNER=subowner;
                procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
            }else if($('#analysis').val()=='Carrier'){
                $('#nextId').hide();
                $('#prevId').hide();
                //                alert($('#analysis').val());
                startIndex=1;
                endIndex=11;
                reqData.startIndex=startIndex;
                reqData.endIndex=endIndex;
                procesRequest("fetchDashBoardMapPieCarrierAction",reqData,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);

            }
            else{
                $('#nextId').hide();
                $('#prevId').hide();
                procesRequest("fetchDashBoardMapAction",reqData,fnCallbackFetchMapChartSucc,fnCallbackFetchMapChartFail);
            }
//            procesRequest("fetchDashBoardPieAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
            procesRequest("fetchDashBoardChartAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
            procesRequest("fetchDashBoardGridAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);

        }
    });

});//END

/*******************************
FUNCTION FOR GRID AND PIE AND CHART
 *******************************/
function fnCallbackFetchPieChartSucc(response){

    //        alert(response.toSource());
    var data=JSON.parse(response).objCRSResponse.data[0].PIE_DATA;
    //        alert(data.toSource());
    var pieData=[];
    var categories1=[];
    var datax=[];
    pieDataArr=data;

    //console.log(pieData);
    pieChart();
    function pieChart(){
        for(var i=0;i<pieDataArr.length;i++ )
        {
            datax[i]=pieDataArr[i].SPEND;

            categories1[i]=pieDataArr[i].GEO;
        }
        $("#pie-chart").kendoChart({
            dataSource: {
                data:pieDataArr
            },
            legend: {
                position: "top",
                visible: true

            },
            seriesDefaults: {
                type: "column"
            }, 
            series: [{

                data: datax,
                color:'#61616B'
            //                Field:'SPEND'
            }],
            valueAxis: {
                line: {
                    visible: true
                }
            },

            categoryAxis: {
                categories: categories1,
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: -20
                }
            },
            chartArea:
            {
                height: 340,
                weigth:'100%'
            },
            tooltip: {
                visible: true,
                template : "${category}  : #= dataItem.ABSOLUTESPEND #"
            }

        });
        setTimeout(function () {
            $("#pie-chart-loading").hide();
        }, 1000);

    }

    $("#tabularViewPie").click(function(){
      
        $("#pie-chart").empty();
        $(document).add(grid);
        function grid(){
            pieData=[];
            for(var i=0;i<pieDataArr.length;i++){
                var pData={};
                pData.GEO=pieDataArr[i].GEO;
                pData.SPEND=pieDataArr[i].SPEND;
                pData.SPEND1 = pieDataArr[i].SPEND;
                pieData.push(pData);
            }

            //console.log("grid_bar"+JSON.stringify(pieData));
            $("#pie-chart").kendoGrid({
                dataSource:pieData,
                height:355,
                columns: [{
                    field:"GEO",
                    title: "Name",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "padding-left:15px;font-size:15px"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    }
                },
                {
                        field: "SPEND1",
                    title:$('#pie-chart-type').val() ,

                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "padding-left:220px;font-size:15px"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    }
                },
                ]
            });
            setTimeout(function () {
                $("#pie-chart-loading").hide();
            }, 1000);
        }
        $('#flitermenudl2').css({
            "display":"none"
        });


    });

    $("#graphicalViewPie").click(function(){
        //alert("ggggg");
        $("#pie-chart").empty();
        if ($("#pie-chart").data("kendoGrid")) {
            $("#pie-chart").data("kendoGrid").destroy();
        }
        $('#pie-chart').removeClass("k-grid k-widget");
        $('#pie-chart').attr("data-role", "chart");
        $('#pie-chart').removeAttr("style");
        $('#pie-chart').css("position", "relative");

        $(document).add(pieChart);
        $('#flitermenudl2').css({
            "display":"none"
        });

    });
}
function fnCallbackFetchPieChartFail(){
    showMessage("Error", "Unable to get Pie  details", 2);

}

function format(num) {
    num = num.toString();
    var temp = num.split(".");
    num = temp[0];
    var temp1=00;
    if (temp[1] != undefined) {
         temp1 = temp[1].substring(0, 2);
    }
    var tempVal = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return tempVal + "." + temp1;
}


function fnCallbackFetchChartSucc(response) {

    barResult=JSON.parse(response).objCRSResponse.data[0].CHART_DATA;
   
    var categories1=[];
    var datax=[];
    var typ=$('#type').val();
    for(var i=0;i<barResult.length;i++ )
    {
        barResult[i].color = "#61616B";
        barResult[i].ABSOLUTESPEND1 = format(barResult[i].ABSOLUTESPEND);
        barResult[i].SPEND1 = format(barResult[i].SPEND);
    }

    function Bar_chart(){
        $("#bar-chart").kendoChart({
            dataSource: {
                data:barResult
            },
            legend: {
                position: "top",
                visible: true

            },
            seriesDefaults: {
                type: "column"
            },
            series: [{
                field: "SPEND",
                colorField: "color"
            //                Field:'SPEND'
            }],
            valueAxis: {
                line: {
                    visible: true
                }
            },
            categoryAxis: {
                field: "TIM",
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: -20
                }
            },
            chartArea:
            {
                height: 362,
                weigth:'100%'
            },
            tooltip: {
                visible: true,
                template: "${ category } : #= dataItem.ABSOLUTESPEND1 #"
            },
            seriesClick: onSeriesChartClick,
            
            seriesHover: function(){
                $("#bar-chart").css("cursor", "pointer");
            }
        });
        setTimeout(function () {
            $("#bar-chart-loading").hide();
        }, 1000);

    }
    $("#bar-chart").ready(Bar_chart);
    
    // for get first data record for piechart
    var chart = $("#bar-chart").data("kendoChart");
    if(barResult.length > 0){
        chart.dataSource._data[barResult.length-1].color="#00bcee";
        barResult[barResult.length-1].color="#00bcee";
        chart.refresh();
        $('#pie-chart-charge-category').empty();
        $('#pie-chart-charge-category').append(' by charge category '+barResult[barResult.length-1].TIM);
        $("#pie-chart-loading").show();
        var reqData={};
        chargeDateStr=barResult[barResult.length-1].TIM;
        reqData.analysis= $('#analysis').val();
        if($('#currency_id').val()=="EUR"){
            reqData.currency = "ALL";
        }else{
        reqData.currency = $('#currency_id').val();
        }
        reqData.type=  $('#pie-chart-type').val();
        reqData.dateStr=barResult[barResult.length-1].TIM;
        //    startIndex=startIndex+10;
        //    endIndex=endIndex+10;
        reqData.startIndex=1; 
        reqData.endIndex=11;
        
        if(isDillDown){
            reqData.continent=continentCode.toUpperCase();
        }
        //console.log(reqData);
        procesRequest("fetchDashBoardPieTrafficAction", reqData, fnCallbackFetchMapPieTrafficSucc, fnCallbackFetchMapPieTrafficFail);
    } else {
        $("#pie-chart-loading").hide();
        pieMapTraffic([])
        chargeDateStr="";
    }

    
    
    
    
    
    
    
    
    $("#tabularViewBar").click(function(){
        //        alert("table-click");
        $("#bar-chart").empty();
        $(document).add(grid);
        function grid(){
            var typeTitle="";
            if(isDillDown){
                typeTitle=isDrillDownType;
               
            }else{
                typeTitle=$('#type').val();   
            }
            //console.log("grid_bar"+JSON.stringify(pieData));
            $("#bar-chart").kendoGrid({ 
                dataSource:barResult,

                columns: [{
                        field: "TIM",
                        type: "string",
                        title: "Time",
                        headerAttributes: {
                            "class": "table-header-cell",
                            style: "padding-left:15px;font-size:15px"
                        },
                        attributes: {
                            "class": "table-cell",
                            style: "text-align: left;"
                        }
                    },
                    {
                        field: "SPEND1",
                        title: typeTitle,
                        headerAttributes: {
                            "class": "table-header-cell",
                            style: "padding-left:220px;font-size:15px"
                        },
                        attributes: {
                            "class": "table-cell",
                            style: "text-align: right;"
                        }
                    }]
            });
            setTimeout(function () {
                $("#bar-chart-loading").hide();
            }, 1000);
        }
        $('#flitermenurt1').css({
            "display":"none"
        });


    });

    $("#graphicalViewBar").click(function(){

        $("#bar-chart").empty();
        if ($("#bar-chart").data("kendoGrid")) {
            $("#bar-chart").data("kendoGrid").destroy();
        }
        $('#bar-chart').removeClass("k-grid k-widget");
        $('#bar-chart').attr("data-role", "chart");
        $('#bar-chart').removeAttr("style");
        $('#bar-chart').css("position", "relative");

        $(document).add(Bar_chart);
        $('#flitermenurt1').css({
            "display":"none"
        });

    });

}

function fnCallbackFetchChartFail(){
    showMessage("Error", "Unable to get Chart  details", 2);
}
var resultGrid={};
function fnCallbackFetchGridSucc(response){
    console.log(response);
    resultGrid=JSON.parse(response).objCRSResponse.data[0].GRID_DATA;
    //alert(result.toSource());
    for (var t = 0; t < resultGrid.length; t++) {
        resultGrid[t].SPEND1 = format(resultGrid[t].SPEND);
    }
    function grid() {
        $("#grid").empty();
        var typeTitle="";
        if(isDillDown){
            typeTitle=isDrillDownType;
               
        }else{
            typeTitle=$('#type').val();   
        }
        $("#grid").kendoGrid({
            dataSource:resultGrid,
            height:360,
            columns: [{
                field:"GEO",
                title: "Name",

                headerAttributes: {
                    "class": "table-header-cell",
                    style: "padding-left:15px;font-size:15px"
                },
                filterable: false
            },
            {
                    field: "SPEND1",
                title: typeTitle,
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "padding-left:220px;font-size:15px"
                },
                attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    }
            }]
        });

        setTimeout(function () {
            $("#grid-loading").hide();
        }, 1000);
    }
    grid();
    $("#graphicalViewGrid").click(function () {
        $("#grid").empty();
        if ($("#bar-chart").data("kendoGrid")) {
            $("#bar-chart").data("kendoGrid").destroy();
        }
        $('#grid').removeClass("k-grid k-widget");
        $('#grid').attr("data-role", "chart");
        $('#grid').removeAttr("style");
        $('#grid').css("position", "relative");
        var pieData = [];
        for (var i = 0; i < resultGrid.length; i++) {
            var pData = {};
            pData.GEO = resultGrid[i].GEO;
            pData.SPEND = resultGrid[i].SPEND;
            pData.colorField = getRandomColor();
            pieData.push(pData);
        }
        //console.log(pieData);
        function createChart() {
            $("#grid").kendoChart({
                height:340,
                //                title:{
                //                    text:'Bill Cycle View'
                //                },
                legend: {
                    visible:false,
                    position: "bottom"
                },
                dataSource: {
                    data: pieData
                },
                plotArea: {
                    margin: {
                        top: 5,
                        left: 15,
                        right: 50,
                        bottom: 15
                    }
                },
                seriesDefaults: {
                    labels: {
                        template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
                series: [{
                    type: "pie",
                    field: "SPEND",
                    categoryField: "GEO"
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage)#"
                }
            // seriesClick: onPieSeriesClick

            });

            $('#flitermenudl1').css({
                "display":"none"
            });
            setTimeout(function () {
                $("#grid-loading").hide();
            }, 1000);
        }
        createChart();
        //$(document).ready(createChart);
        // $(document).bind("kendo:skinChange", createChart);
    });

    $("#tabularViewGrid").click(function(){

        $("#grid").empty();
        $(document).add(grid);
        $('#flitermenudl1').css({
            "display":"none"
        });

    });




}
function fnCallbackFetchGridFail(){

    showMessage("Error", "Unable to get grid  details", 2);
}
function fnCallbackFetchMapPieSucc(response){
    //console.log("MAP PIE DATA :::::::"+response);
    var data=JSON.parse(response).objCRSResponse.data[0].MAP_DATA;
    //        alert(data.toSource());
    var pieData = [];
    for (var i = 0; i < data.length; i++) {
        var pData = {};
        pData.GEO = data[i].SUB_OWNER;
        pData.SPEND = data[i].SPEND;
        pData.ABSOLUTESPEND = data[i].ABSOLUTESPEND;
        pieData.push(pData);
    }
    //console.log(pieData);
    $('.highcharts-container').empty();
    $("div#highcharts-0.highcharts-container").remove();
    $("div#highcharts-0.highcharts-container").remove();
  
    if(pieData.length==0)
    {
        if(!topSpenderNext){
            mapPieDataArr=pieData;
        }
    }
    else{
        mapPieDataArr=pieData;
    }
    

    if(isDillDown==false)
    {
       
        if(topGraphical)
            barMap(pieData);
        else
            mapTopGrid(pieData);
    }
    else
        pieMap(pieData);

}
function fnCallbackFetchMapPieFail(res){

    showMessage("Error", "Unable to get Map pie details", 2);

}
function fnCallbackFetchMapPieCarrierSucc(response){
    //console.log("MAP fnCallbackFetchMapPieCarrierSucc PIE DATA :::::::"+response);

    var pieData=JSON.parse(response).objCRSResponse.data[0].MAP_DATA;
    //        alert(data.toSource());

    if(pieData.length!=0){
        $('.highcharts-container').empty();
        $("div#highcharts-0.highcharts-container").remove();
        if(mapPieCarrierArrIndex==0){
            mapPieCarrierArr[0]=pieData;
            mapPieCarrierArrStartIndex[0]=startIndex;

        }else if(mapPieCarrierArrIndex==1){
            mapPieCarrierArr[1]=pieData;
            mapPieCarrierArrStartIndex[1]=startIndex;
        }else if(mapPieCarrierArrIndex==2){
            mapPieCarrierArr[2]=pieData;
            mapPieCarrierArrStartIndex[2]=startIndex;
        }else{
            mapPieCarrierArr[3]=pieData;
            mapPieCarrierArrStartIndex[3]=startIndex;
        }

        if(carrierGraphical)
            pieMapCarrier(pieData);
        else
            mapCarrierGrid(mapPieCarrierArr[mapPieCarrierArrIndex]);
            
    }else{
        $("#map-loading").hide();
        if(startIndex==1){
            $('.highcharts-container').empty();
            $("div#highcharts-0.highcharts-container").remove();
            pieMapCarrier(pieData);
            if(mapPieCarrierArrIndex==0){
                mapPieCarrierArr[0]=pieData;
                mapPieCarrierArrStartIndex[0]=startIndex;

            }else if(mapPieCarrierArrIndex==1){
                mapPieCarrierArr[1]=pieData;
                mapPieCarrierArrStartIndex[1]=startIndex;
            }else if(mapPieCarrierArrIndex==2){
                mapPieCarrierArr[2]=pieData;
                mapPieCarrierArrStartIndex[2]=startIndex;
            }else{
                mapPieCarrierArr[3]=pieData;
                mapPieCarrierArrStartIndex[3]=startIndex;
            }
            
        }
        if(startIndex==11){
            $('#prevId').hide();
        }
        $('#nextId').hide();
    }
}
function fnCallbackFetchMapPieCarrierFail(res){

    showMessage("Error", "Unable to get Map Pie Carrier details", 2);

}
function fnCallbackFetchMapPieTrafficSucc(response){

    var pieData=JSON.parse(response).objCRSResponse.data[0].MAP_DATA;
    pieMapTraffic(pieData);
    pieDataArr=pieData;
    $("#tabularViewPie").click(function(){
    
        $("#pie-chart").empty();
        $(document).add(grid);
        function grid(){
            pieData=[];
            for(var i=0;i<pieDataArr.length;i++){
                var pData={};
                pData.GEO=pieDataArr[i].GEO;
                pData.SPEND = format(pieDataArr[i].SPEND);
                pieData.push(pData);
            }

            //console.log("grid_bar"+JSON.stringify(pieData));
            $("#pie-chart").kendoGrid({
                dataSource:pieData,
                height:355,
                columns: [{
                    field:"GEO",
                    title: "Name",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "padding-left:15px;font-size:15px"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    }
                },
                {
                    field: "SPEND",
                    title:$('#pie-chart-type').val() ,

                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "padding-left:220px;font-size:15px"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    }
                },
                ]
            });
            setTimeout(function () {
                $("#pie-chart-loading").hide();
            }, 1000);
        }
        $('#flitermenudl2').css({
            "display":"none"
        });


    });

    $("#graphicalViewPie").click(function(){
        //alert("ggggg");
        $("#pie-chart").empty();
        if ($("#pie-chart").data("kendoGrid")) {
            $("#pie-chart").data("kendoGrid").destroy();
        }
        pieMapTraffic(pieDataArr);
        $('#flitermenudl2').css({
            "display":"none"
        });

    });
 



}
function fnCallbackFetchMapPieTrafficFail(){

    showMessage("Error", "Unable to get Map Pie Traffic details", 2);

}
function barMap(mapPieDataArr){

    //console.log("mapPieDataArr:::"+mapPieDataArr)
    //    alert(mapPieDataArr.toSource());
    // var categories1=[];
    // var datax=[];
    var typ = $('#type').val();
    for (var i = 0; i < mapPieDataArr.length; i++)
    {
        mapPieDataArr[i].SPEND1 = format(mapPieDataArr[i].SPEND);

    }
//        console.log("top");
//        console.log(mapPieDataArr);
//    console.log("categories1::"+categories1);
    if(mapPieDataArr.length!=0){
        
        $("#container").empty();
        $("#container").kendoChart({
            dataSource: {
                data:mapPieDataArr
            },
            legend: {
                position: "top",
                visible: true

        },
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            name: typ,
           
            color:"#61616B",
            field:'SPEND'
        }],
        valueAxis: {
            line: {
                visible: true
            },
            labels: {
                rotation: -20
            }
        },
        categoryAxis: {
            field:"GEO",
            majorGridLines: {
                visible: false
            }
        },
        chartArea:
        {
            height: 362,
            weigth:'100%'
        },
        tooltip: {
            visible: true,
                template: "${category} : #= dataItem.SPEND1 #"
        },
        seriesClick: onSeriesMapPieClick,
        seriesHover: function(){
            $("#container").css("cursor", "pointer");
        }
    });
    }else{
        if(!topSpenderNext){
           
            $("#container").empty();
           
        }else{
            startIndex=startIndex-10;
            endIndex=endIndex-10;
        }
    }
    setTimeout(function () {
        $("#map-loading").hide();
    }, 1000);
    if(mapPieDataArr.length>=10 && endIndex<31){
        $("#nextId").show();
    }else{
        $("#nextId").hide();
    }
    if(startIndex==1){
        $("#prevId").hide(); 
    }

}
function pieMap(mapPieDataArr){
    //    alert("hiii");
    //console.log("mapPieDataArr:::"+mapPieDataArr)
    //    alert(mapPieDataArr.toSource());
    var categories1=[];
    var datax=[];
    var typ=$('#type').val();
 
    for(var i=0;i<mapPieDataArr.length;i++ )
    {
        datax[i]=mapPieDataArr[i].SPEND;

        categories1[i]=mapPieDataArr[i].GEO;
    }

    $("#container").kendoChart({

        legend: {
            position: "top",
            visible: true

        },
        dataSource: {
            data: mapPieDataArr
        },
            seriesDefaults: {
                    labels: {
                        template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
        series: [{
            type: "pie",
            field: "SPEND",
            categoryField: "GEO"
        }],
        chartArea:
        {
            height: 370,
            weigth:'100%'
        },
        tooltip: {
            visible: true,
            template: "#= category # : #= dataItem.ABSOLUTESPEND #"
        },

        seriesClick: onSeriesMapPieClick
    });
    setTimeout(function () {
        $("#map-loading").hide();
    }, 1000);
}
function pieMapCarrier(mapPieDataArr){
    //    alert("hiii");
    //console.log("mapPieDataArr:::"+mapPieDataArr.length)
    //    alert(mapPieDataArr.toSource());

    var datax=[];
    var categories1=[];
    for(var i=0;i<mapPieDataArr.length;i++ )
    {
        datax[i] = mapPieDataArr[i].SPEND;
          mapPieDataArr[i].ABSOLUTESPEND1=format(mapPieDataArr[i].SPEND);
        categories1[i] = mapPieDataArr[i].CARRIER;
    }
    var typ=$('#type').val();
    $("#container").kendoChart({
        dataSource: {
            data:mapPieDataArr
        },
        legend: {
            position: "top",
            visible: true

        },
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            name: typ,
            field:"SPEND",
            color:"#61616B"
        //                Field:'SPEND'
        }],
        valueAxis: {
            line: {
                visible: true
            },
            labels: {
                rotation: -20
            }
        },
        categoryAxis: {
            field:"CARRIER",
            majorGridLines: {
                visible: false
            }
        },
        chartArea:
        {
            height: 362,
            weigth:'100%'
        },
        tooltip: {
            visible: true,
            template: "${category}  : #= dataItem.ABSOLUTESPEND1 #"
        },
        seriesClick: onSeriesMapPieCarrierClick,
        seriesHover: function(){
            //  console.log(mapPieCarrierArrIndex);
            if(mapPieCarrierArrIndex!=3)
                $("#container").css("cursor", "pointer");
            else
                $("#container").css("cursor", "default");
        }
    });
    setTimeout(function () {
        $("#map-loading").hide();
    }, 1000);

    if(startIndex==1){
        $('#prevId').hide();
    }else{
        $('#prevId').show();
    }
    if(mapPieDataArr.length<10){
        $('#nextId').hide();
    }
    else{
        $('#nextId').show();
    }

}
function pieMapTraffic(DataArr){
    //    alert("hiii");
    //console.log("mapPieDataArr:::"+mapPieDataArr.length)
    //    alert(mapPieDataArr.toSource());

    var datax=[];
    var categories1=[];
    if (DataArr != undefined) {
    for(var i=0;i<DataArr.length;i++ )
    {
        datax[i]=DataArr[i].SPEND;

            categories1[i] = DataArr[i].CHARGE_CATEGORY;
            DataArr[i].GEO = DataArr[i].CHARGE_CATEGORY;
            DataArr[i].color = colorArr[i];
            DataArr[i].ABSOLUTESPEND1 = format(DataArr[i].SPEND);
        }
    }
    pieDataArr=DataArr;
   
    //mapPieDataArr=DataArr;
    $("#pie-chart").empty();
    $("#pie-chart").kendoChart({
        dataSource: {
            data:pieDataArr
        },
        legend: {
            position: "top",
            visible: true

        },
        seriesDefaults: {
            type: "column"
        },
        series: [{

            field:"SPEND",
            colorField:"color"
        //            labels: { rotation: -40}
        //                Field:'SPEND'
        }],
        valueAxis: {
            line: {
                visible: true
            },
            labels: {
                rotation: -40
            }
        },
        categoryAxis: {
            field:"CHARGE_CATEGORY",
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: -20
            }
        //            labels: { rotation: -40}
        },
        chartArea:
        {
            height: 362,
            weigth:'100%'
        },
        tooltip: {
            visible: true,
            template: "${category}  : #= dataItem.ABSOLUTESPEND1 #"
        }

    });
    setTimeout(function () {
        $("#map-loading").hide();
        $("#pie-chart-loading").hide();
    }, 1000);
//    if(mapPieDataArr.length<10){
//        $('#nextId').hide();
//    }else{
//        $('#nextId').show();
//    }
//
//    if(startIndex==1){
//        $('#prevId').hide();
//    }else{
//        $('#prevId').show();
//    }

}
function fnCallbackFetchMapChartSucc(response) {
    if (JSON.parse(response).objCRSResponse.data[0].result != 'failure') {

        var data = JSON.parse(response).objCRSResponse.data[0].MAP_DATA;
        //        alert(data.toSource());result
        var bubbleData = [];
        var z = 7000;

        for (var i = 0; i < data.length; i++) {
            var temp = {};
            z = z - 50;
            temp.code = data[i].GEO;
            temp.z = z;
            temp.S = format(data[i].SPEND);
            bubbleData[i] = temp;
        }
    }
    currentData = bubbleData;
    var mapData = Highcharts.geojson(Highcharts.maps['custom/world-continents']);
    $.each(mapData, function (i) {
        this.drilldown = this.properties['hc-key'];
        this.value = i; // Non-random bogus data
    });
    $(".highcharts-container").empty();
    $('#container').empty();
    $('#container').highcharts('Map', {
        chart : {
            borderWidth : 0,
            backgroundColor: "#ADD8E6",
            style: {
                position:'absolute'
            },
            //height:390,
            events: {
                
                click: function (e) {
                 
                },
               
                drilldown: function (e) {
                    
                    if(e.point.drilldown=='as'){
                        mapLink= 'custom/asia';
                        continentCode='asia';
                    }else if(e.point.drilldown=='oc'){
                        mapLink= 'custom/oceania';
                        continentCode='oceania';
                    }else if(e.point.drilldown=='eu'){
                        mapLink= 'custom/europe';
                        continentCode='europe';
                    }else if(e.point.drilldown=='af'){
                        mapLink= 'custom/africa';
                        continentCode='africa';
                    }else if(e.point.drilldown=='na'){
                        mapLink= 'custom/north-america';
                        continentCode='north america';
                    }else if(e.point.drilldown=='sa'){
                        mapLink= 'custom/south-america';
                        continentCode='south america';
                    }
                    //                    alert(mapLink);
                                       
                    $.getScript('js/maps/' + mapLink + '.js', function () {
                        //                       alert('js/maps/' + mapLink + '.js');
                        continentData = Highcharts.geojson(Highcharts.maps[mapLink]);
                        loadContinentMap(continentData);
                    });
                    isDillDown=true;
                    $('#Spendbyregion').html('Navigation: '+$('#type').val()+' by country');
                    var reqData = {};
                    reqData.analysis = $('#analysis').val();
                    reqData.currency = $('#currency_id').val();
                    reqData.type = $('#type').val();
                    reqData.dateStr = dateStr;
                    reqData.continent = continentCode.toUpperCase();
                    //                    alert(reqData.toSource());
                    setTimeout(function(){
                        procesRequest("fetchDashBoardMapDrilldownAction",reqData,loadContinentMapSuccess,fnCallbackFetchPieChartFail);
                    }, 3000);

                    //                    procesRequest("fetchDashBoardPieDrilldownAction",reqData,fnCallbackFetchPieChartSucc,fnCallbackFetchPieChartFail);
                    procesRequest("fetchDashBoardChartDrilldownAction",reqData,fnCallbackFetchChartSucc,fnCallbackFetchChartFail);
                    procesRequest("fetchDashBoardGridDrilldownAction",reqData,fnCallbackFetchGridSucc,fnCallbackFetchGridFail);

                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                drillup: function () {
                    this.setTitle(null, {
                        text: 'World'
                    });
                }
            }

        },
        title: {
            text: ''
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'top'
            }
        },

        series : [{
            name: 'Countries',
            mapData: mapData,
            //color: 'green',
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            mapData: mapData,
            name: ' ',
            joinBy: ['iso-a2', 'code'],
            data: bubbleData,
            color:'#eea638',
            minSize: 10,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.name}: {point.S} '
            }
            ,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
    setTimeout(function () {
        $("#map-loading").hide();
        // console.log($('g.highcharts-button'));
        $('g.highcharts-button').hide();
        //        $("#container").reload(true);
    }, 1000);

}
function fnCallbackFetchPieChartFail(){
    showMessage("Error", "Unable to get Pie  details", 2);

}
function fnCallbackFetchMapChartFail(){
    showMessage("Error", "Unable to get Pie  details", 2);

}
function loadContinentMap(continentMapData){
    backFlag="1";
    var bubbleData=[{
    //        "code":"IN",
    //        "z":3204,
    //        "S":1448
    }]
    currentData=bubbleData;
    var mapData = continentMapData;
    $.each(mapData, function (i) {
        this.drilldown = this.properties['hc-key'];
        this.value = i; // Non-random bogus data
    });
    $(".highcharts-container").empty();
    $('#container').empty();
    $('#container').highcharts('Map', {
        chart : {
            borderWidth : 0,
            backgroundColor: "#ADD8E6",
            style: {
                position:'absolute'
            },
            events: {
                drilldown: function (e) {
                    if(e.point.drilldown.indexOf('-') != -1){
                        mapLink= 'countries/'+(e.point.drilldown).split('-')[0] +'/' + e.point.drilldown + '-all';
                    }else{
                        mapLink='countries/'+e.point.drilldown +'/' + e.point.drilldown + '-all';
                    }
                    $.getScript('http://code.highcharts.com/mapdata/' + mapLink + '.js', function () {
                        CountryData = Highcharts.geojson(Highcharts.maps[mapLink]);
                        loadCountryMap(CountryData);
                    });

                },
                drillup: function () {
                    this.setTitle(null, {
                        text: 'World'
                    });
                }
            }

        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'top'
            }
        },

        series : [{
            name: 'Countries',
            mapData: mapData,
            color: 'color',
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            mapData: mapData,
            name: ' ',
            joinBy: ['iso-a2', 'code'],
            data: bubbleData,
            color:'#eea638',
            minSize: 4,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.name}: {point.S} thousands'
            }
            ,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
    setTimeout(function () {
        $("#map-loading").hide();
        // console.log($('g.highcharts-button'));
        $('g.highcharts-button').hide();
    }, 1000);

}
function loadContinentMapSuccess(res){
    backFlag="1";
    //    alert("1");
    var data=JSON.parse(res).objCRSResponse.data[0].MAP_DATA;
    //console.log(data);
    var bubbleData = [];
    var z = 7000;
    for (var i = 0; i < data.length; i++) {
        var temp = {};
        z = z - 50;
        temp.code = data[i].GEO;
        temp.z = z;
        temp.S = format(data[i].SPEND);
        //        alert(temp.toSource());
        bubbleData[i]=temp;
    }
    currentData=bubbleData;
    var mapData = continentData;
    //console.log("continentData:::"+continentData);
    $.each(mapData, function (i) {
        this.drilldown = this.properties['hc-key'];
        this.value = i; // Non-random bogus data
    });
    $(".highcharts-container").empty();
    $('#container').empty();
    $('#container').highcharts('Map', {
        chart : {
            borderWidth : 0,
            backgroundColor: "#ADD8E6",
            style: {
                position:'absolute'
            }
//            events: {
//                drilldown: function (e) {
//                    if(e.point.drilldown.indexOf('-') != -1){
//                        mapLink= 'countries/'+(e.point.drilldown).split('-')[0] +'/' + e.point.drilldown + '-all';
//                    }else{
//                        mapLink='countries/in/in-all';
//                    }
//                    alert(mapLink);
//                    //                    alert(mapLink);
//                    //                            $.getScript('js/maps/custom/countries/in-all.js', function () {
//                    $.getScript('http://code.highcharts.com/mapdata/' + mapLink + '.js', function () {
//
//                        CountryData = Highcharts.geojson(Highcharts.maps[mapLink]);
//                        loadCountryMap(CountryData);
//                    });
//
//                },
//                drillup: function () {
//                    this.setTitle(null, {
//                        text: 'World'
//                    });
//                }
//            }

        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'top'
            }
        },

        series : [{
            name: 'Countries',
            mapData: mapData,
            color: 'color',
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            mapData: mapData,
            name: ' ',
            joinBy: ['iso-a2', 'code'],
            data: bubbleData,
            color:'#eea638',
            minSize: 10,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.name}: {point.S}'
            }
            ,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
    setTimeout(function () {
        $("#map-loading").hide();
        // console.log($('g.highcharts-button'));
        $('g.highcharts-button').hide();
    }, 1000);
}
function loadCountryMap(countryMapData){
    backFlag="2";
    var mapData = countryMapData;
    var bubbleData=[
    {
        "code":"in-ap",
        "z":31412,
        "S":1
    },{
        "code":"in-or",
        "z":32204,
        "S":2
    },
    {
        "code":"in-py",
        "z":312,
        "S":1
    },{
        "code":"in-ld",
        "z":34,
        "S":2
    },
    {
        "code":"in-wb",
        "z":31412,
        "S":1
    },{
        "code":"in-br",
        "z":3204,
        "S":2
    },
    {
        "code":"in-sk",
        "z":31412,
        "S":1
    },{
        "code":"in-ct",
        "z":3204,
        "S":2
    },
    {
        "code":"in-tn",
        "z":31412,
        "S":1
    },{
        "code":"in-mp",
        "z":3204,
        "S":2
    },
    {
        "code":"IN-2984",
        "z":31412,
        "S":1
    },{
        "code":"in-ga",
        "z":3204,
        "S":2
    },
    {
        "code":"in-nl",
        "z":31412,
        "S":1
    },{
        "code":"in-mn",
        "z":3204,
        "S":2
    },
    {
        "code":"in-ar",
        "z":31412,
        "S":1
    },{
        "code":"in-mz",
        "z":3204,
        "S":2
    },
    {
        "code":"in-tr",
        "z":31412,
        "S":1
    },{
        "code":"in-dl",
        "z":3204,
        "S":2
    },
    {
        "code":"in-hr",
        "z":31412,
        "S":1
    },{
        "code":"in-ch",
        "z":3204,
        "S":2
    },
    {
        "code":"in-hp",
        "z":31412,
        "S":1
    },{
        "code":"in-jk",
        "z":3204,
        "S":2
    },
    {
        "code":"in-kl",
        "z":31412,
        "S":1
    },{
        "code":"in-ka",
        "z":3204,
        "S":2
    },
    {
        "code":"in-dn",
        "z":31412,
        "S":1
    },{
        "code":"in-mh",
        "z":3204,
        "S":2
    },
    {
        "code":"in-as",
        "z":31412,
        "S":1
    },{
        "code":"in-ml",
        "z":3204,
        "S":2
    },
    ];
    currentData=bubbleData;
    $.each(mapData, function (i) {
        this.drilldown = this.properties['hc-key'];
        this.value = i; // Non-random bogus data

    });
    $(".highcharts-container").empty();
    $('#container').empty();
    $('#container').highcharts('Map', {
        chart : {
            borderWidth : 0,
            backgroundColor: "#ADD8E6",
            style: {
                position:'absolute'
            },
            events: {
                drilldown: function (e) {
                    if(e.point.drilldown.indexOf('-') != -1){
                        mapLink= 'countries/'+(e.point.drilldown).split('-')[0] +'/' + e.point.drilldown + '-all';
                    }else{
                        mapLink='countries/'+e.point.drilldown +'/' + e.point.drilldown + '-all';
                    }
                    $.getScript('http://code.highcharts.com/mapdata/' + mapLink + '.js', function () {
                        var stateMapData = Highcharts.geojson(Highcharts.maps[mapLink]);
                        loadStateMap(stateMapData);
                    });
                },
                drillup: function () {
                    this.setTitle(null, {
                        text: 'World'
                    });
                }
            }

        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        title: {
            text: ' '
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        series : [{
            name: 'Countries',
            mapData: mapData,
            color: color,
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            mapData: mapData,
            name: ' ',
            joinBy: ['hc-key', 'code'],
            data: bubbleData,
            color:'#eea638',
            minSize: 4,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.name}: {point.S} thousands'
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });

    setTimeout(function () {
        $("#map-loading").hide();
        // console.log($('g.highcharts-button'));
        $('g.highcharts-button').hide();
    }, 1000);
}
function loadStateMap(stateMapData){
    backFlag="3";
    var mapData = stateMapData;
    var bubbleData=bubbleData=[{
        "code":"us-wa-041",
        "z":31412,
        "S":1
    }];
    currentData=bubbleData;
    $.each(mapData, function (i) {
        this.drilldown = this.properties['hc-key'];
        this.value = i; // Non-random bogus data
    });
    $(".highcharts-container").empty();
    $('#container').empty();
    $('#container').highcharts('Map', {
        chart : {
            borderWidth : 0,
            backgroundColor: "#ADD8E6"

        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        title: {
            text: ' '
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        series : [{
            name: 'Countries',
            mapData: mapData,
            color: color,
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            mapData: mapData,
            name: ' ',
            joinBy: ['hc-key', 'code'],
            data: bubbleData,
            color:'#eea638',
            minSize: 4,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.name}: {point.S} thousands'
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }

        ]
    });
    setTimeout(function () {
        $("#map-loading").hide();
        // console.log($('g.highcharts-button'));
        $('g.highcharts-button').hide();
    }, 1000);
}

function loadWorldMap(){
    //var dateStr="JAN2015,FEB2015,MAR2015,APR2015,MAY2015,JUN2015,JUL2015,AUG2015,SEP2015,OCT2015,NOV2015,DEC2015";

    reqData.analysis = $('#analysis').val();
    reqData.currency = $('#currency_id').val();
    reqData.type = $('#type').val();
    reqData.dateStr = dateStr;
    //    alert(reqData.toSource());
    procesRequest("fetchDashBoardMapAction",reqData,fnCallbackFetchMapChartSucc,fnCallbackFetchPieChartFail);



}
/*******************************
FUNCTIONS END
 *******************************/




/*******************************
CLICK EVENT FOR MAPS AND PIE AND CHARTS
 *******************************/

//CLICK EVENT OF BAR-CHART
function onSeriesChartClick(e) {
    ////console.log(e);
    //    alert("hi:::"+e.series.name+":"+e.value+":::"+e.category); 
    var chart = $("#bar-chart").data("kendoChart");
    //  //console.log(chart);
    for (var i = 0; i < chart.dataSource._data.length; i++) {

        ////console.log(e);

        if(chart.dataSource._data[i]==e.dataItem){
        
            chart.dataSource._data[i].color="#00bcee";
            barResult[i].color="#00bcee";
        }else{
            barResult[i].color="#61616B";
            chart.dataSource._data[i].color="#61616B";
        }
    }
    chart.refresh();
    $('#pie-chart-charge-category').empty();
    $('#pie-chart-charge-category').append(' by charge category '+e.category);
    $("#pie-chart-loading").show();
    var reqData = {};
    chargeDateStr = e.category;
    reqData.analysis = $('#analysis').val();
    reqData.currency = $('#currency_id').val();
    reqData.type = $('#pie-chart-type').val();
    reqData.dateStr = e.category;
    //    startIndex=startIndex+10;
    //    endIndex=endIndex+10;
    reqData.startIndex=1;
    reqData.endIndex=11;
    if(isDillDown){
        
       
        if($('#analysis').val()=='Location'){
            reqData.continent=continentCode.toUpperCase();
          //  reqData.type=$('#type').val(); 
        }else{
           //  reqData.type=isDrillDownType;
        }
    }
    
    procesRequest("fetchDashBoardPieTrafficAction",reqData,fnCallbackFetchMapPieTrafficSucc,fnCallbackFetchMapPieTrafficFail);


}

//CLICK EVENT OF BAR-CHART
function onSeriesPieClick(e){
    //console.log(e);
    //    alert("hi:::"+e.series.name+":"+e.value+":::"+e.dataItem.uid);

    var chart = $("#pie-chart").data("kendoChart");
    for(var i=0;i<e.series.data.length;i++){
        //console.log(e.dataItem.id);
        if(e.series.data[i].uid==e.dataItem.uid){

            e.dataItem.color="black";
        }else{
            e.series.data[i].color="#ff6800";
        }
    }
    chart.refresh();

}
function onSeriesMapPieClick(e){
    //console.log(e);
    isDillDown=true;
    isDrillDownType=$('#type').val();
    isDrillDownDateStr=dateStr;
    if(backFlag==""){
        backFlag="1";
        $('#nextId').hide();
        $('#prevId').hide();
        $("#map-loading").show();

        var reqData2 = {}
        reqData2.analysis = $('#analysis').val();
        reqData2.currency = $('#currency_id').val();
        reqData2.type = $('#type').val();
        reqData2.dateStr = dateStr;
        reqData2.SUB_OWNER = e.category;
        subowner = e.category;
        //console.log(reqData2);
        procesRequest("fetchDashBoardDrillDownMapPieAction",reqData2,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
    }

//    var chart = $("#container").data("kendoChart");
//    for(var i=0;i<e.series.data.length;i++){
//        //console.log(e.dataItem.id);
//        if(e.series.data[i].uid==e.dataItem.uid){
//
//            e.dataItem.color="black";
//        }else{
//            e.series.data[i].color="#ff6800";
//        }
//    }
//    chart.refresh();
}
function  onSeriesMapPieCarrierClick(e){

    //console.log(e);
    isDillDown=true;
    isDrillDownType=$('#type').val();
    isDrillDownDateStr=dateStr;
    if(mapPieCarrierArrIndex<3){
        mapPieCarrierArrIndex=mapPieCarrierArrIndex+1;

        $('#nextId').hide();
        $('#prevId').hide();
        $("#map-loading").show();

        var reqData2={}
        startIndex=1;
        endIndex=11;
        reqData2.startIndex=startIndex;
        reqData2.endIndex=endIndex;
        reqData2.analysis= $('#analysis').val();
        reqData2.currency = $('#currency_id').val();
        reqData2.type= $('#type').val();
        reqData2.dateStr=dateStr;
        reqData2.drillDownIndex=mapPieCarrierArrIndex;
        if(mapPieCarrierArrIndex==1){
            reqData2.CARRIER_LONG_DESCRIPTION=e.category;
            mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"]=e.category;
        }else if(mapPieCarrierArrIndex==2){

            reqData2.CARRIER_LONG_DESCRIPTION=  mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
            reqData2.ACCNO_LONG_DESCRIPTION=e.category;
            mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"]=e.category;
        }else if(mapPieCarrierArrIndex==3){
            reqData2.CARRIER_LONG_DESCRIPTION=mapPieCarrierRequestArr["CARRIER_LONG_DESCRIPTION"];
            reqData2.ACCNO_LONG_DESCRIPTION= mapPieCarrierRequestArr["ACCNO_LONG_DESCRIPTION"];

            reqData2.GROUP_LONG_DESCRIPTION=e.category;
            mapPieCarrierRequestArr["GROUP_LONG_DESCRIPTION"]=e.category;
        }
        subowner=e.category;
        //console.log(reqData2);
        procesRequest("fetchDashBoardDrillDownMapPieCarrierAction",reqData2,fnCallbackFetchMapPieCarrierSucc,fnCallbackFetchMapPieCarrierFail);

    }




}

//TABULAR MAP VIEW
$("#tabularViewMap").click(function(){
    //console.log("tabularViewMap");
    //
    //   ("table-click");
    $(".highcharts-container").empty();
    $("#container").empty();
    if ($('#container').highcharts()) {
        $('#container').highcharts().destroy();
    }
    grid();
    function grid(){
        var pieData=[];
      
        if($('#analysis').val()=='Top'){
            topGraphical=false;
          
            
            mapTopGrid(mapPieDataArr);

        }
        else if($('#analysis').val()=='Carrier'){
            carrierGraphical=false;
          
            mapCarrierGrid(mapPieCarrierArr[mapPieCarrierArrIndex]);
        }
        //        else if($('#analysis').val()=='Charge'){
        //            $("#container").kendoGrid({
        //                dataSource:mapPieDataArr,
        //                height: 300,
        //                columns: [{
        //                    field:"CHARGE_CATEGORY",
        //                    title: "Change Category",
        //                    headerAttributes: {
        //                        "class": "table-header-cell",
        //                        style: "padding-left:15px;font-size:15px"
        //                    }
        //                },
        //                {
        //                    field: "SPEND",
        //                    title: "SPEND",
        //                    headerAttributes: {
        //                        "class": "table-header-cell",
        //                        style: "padding-left:15px;font-size:15px"
        //                    }
        //                }]
        //            })
        //        }
        else{
            for(var i=0;i<currentData.length;i++){
                var pData={};
                pData.code=currentData[i].code;
                pData.S=currentData[i].S;
                pData.S1 = currentData[i].S;
                pieData.push(pData);
            }
            //console.log("grid_bar"+JSON.stringify(currentData));
            $("#container").kendoGrid({
                dataSource:pieData,
                height: 338,
                columns: [{
                    field:"code",
                    title: "Code",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "padding-left:15px;font-size:15px"
                    }
                },
                {
                        field: "S1",
                    title: $('#type').val() ,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "padding-left:220px;font-size:15px"
                    },attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    }
                }]
            })
        }
    }
    $('#flitermenu1').css({
        "display":"none"
    });
});
//GRAPHICAL MAP VIEW
$("#graphicalViewMap").click(function(){
    //  alert("graph click");

    $("#container").empty();
    if ($("#container").data("kendoGrid")) {
        $("#container").data("kendoGrid").destroy();
    }
    $('#container').removeClass("k-grid k-widget");
    $('#container').attr("data-role", "chart");
    $('#container').removeAttr("style");
    $('#container').css("position", "relative");

    $(document).ready(function () {

        if($("#analysis").val()=='Carrier'){
            carrierGraphical=true;
            pieMapCarrier(mapPieCarrierArr[mapPieCarrierArrIndex]);
        }
        //        else if($("#analysis").val()=='Charge'){
        //            pieMapTraffic(mapPieDataArr);
        //        }
        else{
            if(backFlag==""){
                if($("#analysis").val()=='Top'){
                    topGraphical=true;
                    var reqData = {};
                    reqData.startIndex=startIndex;
                    reqData.endIndex=endIndex;
                    reqData.analysis= $('#analysis').val();
                    reqData.currency = $('#currency_id').val();
                    reqData.type= $('#type').val();
                    reqData.dateStr=dateStr;
                    procesRequest("fetchDashBoardMapPieAction",reqData,fnCallbackFetchMapPieSucc,fnCallbackFetchMapPieFail);
                }else{
                    loadWorldMap();
                }
            }else if(backFlag=="1"){
                if($("#analysis").val()=='Top'){
                    pieMap(mapPieDataArr);
                }
                else{
                    var reqData = {};
                    reqData.startIndex=startIndex;
                    reqData.endIndex=endIndex;
                    reqData.analysis= $('#analysis').val();
                    reqData.currency = $('#currency_id').val();
                    reqData.type= $('#type').val();
                    reqData.dateStr=dateStr;
                    reqData.continent=continentCode.toUpperCase();

                    procesRequest("fetchDashBoardMapDrilldownAction",reqData,loadContinentMapSuccess,fnCallbackFetchPieChartFail);
                }

            }else if(backFlag=="2"){

                loadCountryMap(CountryData);
            }
            else if(backFlag=="3"){
                //            alert("state")
                loadStateMap(stateMapData);
            }

        }
        $('#flitermenu1').css({
            "display":"none"
        });
    });
});

function mapCarrierGrid(data) {
    if (data.length != 0) {
        for (var t = 0; t < data.length; t++) {
            data[t].SPEND1 = format(data[t].SPEND);
        }
    }
    $("#container").empty();
    $("#container").kendoGrid({
        dataSource:data,
        height: 338,
        columns: [{
            field:"CARRIER",
            title: "Carrier",
            headerAttributes: {
                "class": "table-header-cell",
                style: "padding-left:15px;font-size:15px"
            }
        },
        {
                field: "SPEND1",
            title: $('#type').val(),
            headerAttributes: {
                "class": "table-header-cell",
                style: "padding-left:220px;font-size:15px"
            },attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    }
        }]
    })
    $("#map-loading").hide();
    if(startIndex==1){
        $('#prevId').hide();
    }else{
        $('#prevId').show();
    }
    if(data.length<10){
        $('#nextId').hide();
    }
    else{
        $('#nextId').show();
     
    }
}
function mapTopGrid(data) {

    if (data.length != 0) {

        for (var t = 0; t < data.length; t++) {
            data[t].SPEND1 = format(data[t].SPEND);
        }

        $("#container").empty();
        $("#container").kendoGrid({
            dataSource:data,
            height: 338,
            columns: [{
                field:"GEO",
                title: "Sub owner",
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "padding-left:15px;font-size:15px"
                }
            },
            {
                field: "SPEND",
                title: $('#type').val(),
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "padding-left:220px;font-size:15px"
                },attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    }
            }]
        })
    }
    else{
        if(!topSpenderNext){
           
            $("#container").empty();
           
        }else{
            startIndex=startIndex-10;
            endIndex=endIndex-10;
        }
    }
    setTimeout(function () {
        $("#map-loading").hide();
    }, 1000);
    if(data.length>=10 && endIndex<31){
        $("#nextId").show();
    }else{
        $("#nextId").hide();
    }
    if(startIndex==1){
        $("#prevId").hide(); 
    }
}

/*******************************
CLICK EVENT ENDS
*******************************/






/*******************************
OTHER USING FUNCTION
*******************************/
function getRandomColor()
{
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 10; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
}
$("#expand").click(function(){
    $(window).resize();
})  