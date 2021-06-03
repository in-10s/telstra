/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



document.onmousedown;
var status="Right Click Disabled";
function disableclick(e)
{
    if(e.button==2)
    {
        alert(status);
        e.preventDefault();
        return;
    }
    return;
}

//function for getting timein milliseconds for selfcare modules
function getRequestTime()
{
    var reqTime=0;
    try{
        var path;

        try{
            path = parent.window.contextPath;
        }catch(e){
            path = window.contextPath;
        }
        if(path==undefined){
            var base = window.location.href;
            path =base.substr(0,base.indexOf("/", base.indexOf("/", base.indexOf("//") + 2) + 1));
        }


        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            //alert(xmlhttp.status+":::status");
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                reqTime=xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST",path+"/RequestTime.jsp",false);
        xmlhttp.send();

    }catch(e){

    }
    return reqTime+"";
}

function procesRequest(url,reqParams,successHandler,failureHandler,asyncOption)
{
    
    var reqData="";
    try{
       // reqData = JSON.stringify(reqParams);
         reqData=encrypt(JSON.stringify(reqParams,replacer));
        //reqData=encrypt(reqData);
        //alert(reqData);
        $.ajax({
            dataType: "html",
            type  : 'POST',
            url: url,
            async:asyncOption,
            data: {reqData:reqData},
            success: successHandler,
            error:failureHandler,
            timeout: 500,
        });
//
//        reqData = JSON.stringify(reqParams);
//
//        reqData=encrypt(reqData);
//        var xmlhttp;
//        if (window.XMLHttpRequest)
//        {// code for IE7+, Firefox, Chrome, Opera, Safari
//            xmlhttp=new XMLHttpRequest();
//        }
//        else
//        {// code for IE6, IE5
//            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//        }
//        xmlhttp.onreadystatechange=function()
//        {
//            if (xmlhttp.readyState==4 && xmlhttp.status==200)
//            {
//                // tocken=xmlhttp.responseText;
//                if(typeof successHandler=='function')
//                    successHandler(xmlhttp.responseText);
//            }
//            else if(xmlhttp.readyState==4){
//                if(typeof failureHandler=='function')
//                    failureHandler();
//            }
//        }
//        xmlhttp.open("POST",url,false);
//        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//        xmlhttp.send("reqData="+reqData);
    }
    catch(e)
    {
    // Ext.getBody().unmask();
    //alert("excpeion in processing in ajax request..."+e);
    }
}
function replacer(key, value) {
    if (value === null) {
        return "";
    }
    return value;
}

function encrypt(param)
{
    var Param1=param;

    var key="1COLD5";
    var dest2="";
    var len=key.length;
    var SrcAsc=-1, KeyPos=-1;
    var offset=((Math.random()*10000)%255)+1;
    dest2=decimalToHex(offset,2);
    var myarr=dest2.toString().split(".");
    var dest=myarr[0];
    if(dest.length==1)
        dest="0"+dest;
    //dest="4e";
    //offset=78;
    for(var SrcPos=0;SrcPos<Param1.length;SrcPos++)
    {
        var ascii=(Param1.substring(SrcPos,SrcPos+1)).charAt(0);
        ascii=ascii_value(ascii);
        SrcAsc=parseInt((ascii+offset)%255);

        if (KeyPos<len-1)
            KeyPos++;
        else KeyPos=0;

        ascii=(key.substring(KeyPos,KeyPos+1)).charAt(0);
        ascii=ascii_value(ascii);
        SrcAsc=SrcAsc^ascii;

        if(SrcAsc<=15)
        {
            dest2=decimalToHex(SrcAsc,2);
            myarr=dest2.toString().split(".");
            dest=dest+myarr[0];
        }
        else
        {
            dest2=decimalToHex(SrcAsc,2);
            myarr=dest2.toString().split(".");
            dest=dest+myarr[0];
        }
        offset=SrcAsc;
    }
    //alert(dest);
    dest=dest.toUpperCase();
    //alert(dest);
    return dest;
}
function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }
    return hex;
}
function ascii_value (c)
{
    // restrict input to a single character
    c = c.charAt (0);

    // loop through all possible ASCII values
    var i;
    for (i = 0; i < 256; ++ i)
    {
        // convert i into a 2-digit hex string
        var h = i . toString (16);
        if (h . length == 1)
            h = "0" + h;

        // insert a % character into the string
        h = "%" + h;

        // determine the character represented by the escape code
        h = unescape (h);

        // if the characters match, we've found the ASCII value
        if (h == c)
            break;
    }
    return i;
}
var timeoutID;
function showMessage(mesType,mesText,flag,divID,isAutoHide)
{
     $(window).scrollTop(0);
    var htmlsr = "";
    try{
        if(divID == null || divID == undefined || divID == "null" || divID == "undefined" || divID == ""){
            htmlsr="<button type='button' class='close' id='artCls'>x</button><h4><strong>"+mesType+"</strong></h4><p>"+ mesText+"</p>";
            $("#txt").removeClass("alert-success");
            $("#txt").removeClass("alert-danger");
            $("#txt").removeClass("alert-warning");
            $("#txt").removeClass("alert-info");
            if(flag==1){
                $("#txt").addClass('alert alert-success  alert-dismissable');
            } else if(flag==2){
                $("#txt").addClass('alert alert-danger alert-dismissable');
            }else if(flag==3){
                $("#txt").addClass('alert alert-warning alert-dismissable');
            }else if(flag==4){
                $("#txt").addClass('alert alert-info alert-dismissable');
            }
            $("#txt").html(htmlsr);
            clearTimeout(timeoutID);
            $("#txt").show();
        }else{
            htmlsr="<button type='button' class='close' id='artCls'>x</button><h4><strong>"+mesType+"</strong></h4><p>"+ mesText+"</p>";
            $("#"+divID).removeClass("alert-success");
            $("#"+divID).removeClass("alert-danger");
            $("#"+divID).removeClass("alert-warning");
            $("#"+divID).removeClass("alert-info");
            if(flag==1){
                $("#"+divID).addClass('alert alert-success  alert-dismissable');
            } else if(flag==2){
                $("#"+divID).addClass('alert alert-danger alert-dismissable');
            }else if(flag==3){
                $("#"+divID).addClass('alert alert-warning alert-dismissable');
            }else if(flag==4){
                $("#"+divID).addClass('alert alert-info alert-dismissable');
            }
            $("#"+divID).html(htmlsr);
            clearTimeout(timeoutID);
            $("#"+divID).show();
        }
    }catch(e){
    }finally{
        try{
            if(isAutoHide || isAutoHide == undefined){
                timeoutID=setTimeout(function () {
                    jQuery('#artCls').trigger('click');
                }, 10000);
            }
        }catch(e){
            setTimeout(function () {
                jQuery('#artCls').trigger('click');
            }, 10000);
        }
    }
//    $('#artCls').click(function(){
//        $(".alert").hide();
//    });
    $(document).on("click","#artCls",function(){
        $(".alert").hide();
    });
}
function fnModalClose(divID){
    $('#'+divID).modal('hide');
}
//function loadKMask()
//{
//    $("#kendo-mask").show();
//}
//function loadKUnMask()
//{
//    $("#kendo-mask").hide();
//}
function closeModalPOPup()
{
    $(".modal-backdrop").removeClass("modal-backdrop fade in");
}

function displayLoading(target) {
    var element = $(target);
    kendo.ui.progress(element, true);
//    setTimeout(function(){
//        kendo.ui.progress(element, false);
//    }, 3000);
}


function loadModal(id){
   // var width=( jQuery('body').width());
    $('#'+id).modal('show');
  //  $('.modal-open').css('width',width);
}
function fnCountChar(event,componentObj,divId,charLimit) {
    var len = componentObj.value.length;
    var pasteData="";
    if(event.clipboardData!=undefined){
        pasteData=event.clipboardData.getData('text/plain');
        len+=pasteData.length;
    }
    if (len >= charLimit) {
        var text=(componentObj.value+pasteData);
        text=text.substring(0, charLimit);
        componentObj.value = text;
        $('#'+divId).text("Characters left 0");
    } else {
        $('#'+divId).text("Characters left "+(charLimit - len));
    }
}