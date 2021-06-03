// ............... Responsive Top menu script .................. //

var i = 0;
function displayprocess(did) {
    /* To show*/
    if (i == 1)
    {
        $("#menunav1").show(0);
        $("#menunav" + did).hide();
        $("#idmenu").attr('class', 'menubtbg');
        i = 0;
    } else            /* To hide*/
{
        $("#menunav1").hide(0);
        $("#menunav" + did).show();
        $("#idmenu").attr('class', 'menubtbgov');
        i = 1;
    }
}

function displayprocess1(did1) {
    /* To show*/
    if (i == 1)
    {
        $("#searchnav1").show(0);
        $("#searchnav" + did1).hide();
        $("#idsearch").attr('class', 'searchicbg');
        i = 0;
    } else            /* To hide*/
{
        $("#searchnav1").hide(0);
        $("#searchnav" + did1).show();
        $("#idsearch").attr('class', 'searchicbgov');
        i = 1;
    }
}

function displaydropmenu(did) {
    /* To show*/
    if (i == 1)
    {
        $("#dropmenu1").show(0);
        $("#dropmenu" + did).hide();
        $("#idmenu1").attr('class', 'menubtbg1');
        i = 0;
    } else            /* To hide*/
{
        $("#dropmenu1").hide(0);
        $("#dropmenu" + did).show();
        $("#idmenu1").attr('class', 'menubtbg1ov');
        i = 1;
    }
}




// ............... Div show script .................. //


function displayprocess2()
{
    var div = document.getElementById("filterdiv1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


function displayschedule()
{
    var div = document.getElementById("schedule1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}



function displayexportmenu()
{
    var div = document.getElementById("exportmenu1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
    
}



function displaychartmenu()
{
    var div = document.getElementById("chartmenu1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}



function displaychartmenus()
{
    var div = document.getElementById("chartmenu2");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}



function displayfiltermenu()
{
    var div = document.getElementById("flitermenu1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


function displayfiltermenurt()
{
    var div = document.getElementById("flitermenurt1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}

function displayfiltermenurt1()
{
    var div = document.getElementById("flitermenurt2");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}

function displayfiltermenudl()
{
    var div = document.getElementById("flitermenudl1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


function displayflilteroption()
{
    var div = document.getElementById("flilteroption1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


function displayflilteroptiondl()
{
    var div = document.getElementById("flilteroptiondl1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


function displayflilteroptionrt()
{
    var div = document.getElementById("flilteroptionrt1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}

function displayflilteroptionrt1()
{
    var div = document.getElementById("flilteroptionrt2");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


function displayflilterdownload()
{
    var div = document.getElementById("downloadfile1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}



function displayflilterdownloadrt()
{
    var div = document.getElementById("downloadfilert1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


function displayflilterdownloadrt1()
{
    var div = document.getElementById("downloadfilert2");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}





function displayflilterdownloaddl()
{
    var div = document.getElementById("downloadfiledl1");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}


// ............... div hide .................. //


$(document).mouseup(function(e)
{
    var container = new Array();
    container.push($('#filterdiv1'));
    container.push($('#exportmenu1'));
    container.push($('#flitermenu1'));
    container.push($('#flitermenurt1'));
    container.push($('#flitermenurt2'));
    container.push($('#flitermenudl1'));
    container.push($('#flilteroption1'));
    container.push($('#flilteroptionrt1'));
    container.push($('#flilteroptionrt2'));
    container.push($('#flilteroptiondl1'));
    container.push($('#downloadfile1'));
    container.push($('#schedule1'));
    container.push($('#tourpopover1'));
    container.push($('#downloadfilert1'));
    container.push($('#downloadfilert2'));
    container.push($('#downloadfiledl1'));
    container.push($('#chartmenu1'));
    container.push($('#chartmenu2'));
		
    container.push($('#selectviewpoint'));
    container.push($('#Comparefilterdiv'));
    $.each(container, function(key, value) {
        if (!$(value).is(e.target) // if the target of the click isn't the container...
            && $(value).has(e.target).length === 0) // ... nor a descendant of the container
            {
            $(value).hide();
        }
    });
});





// ............... Filters tabs .................. //

function displaytask(did) {
    //$('div[id^="coupon"]').hide();			
    $("#task1").hide(0);
    $("#task2").hide(0);
    $("#task" + did).show();
}
function removecss() {
    $("#taskhd  a").each(function() {
        $(this).attr('class', $(this).attr('class').replace('ov', ''));
    });
}
$(document).ready(function() {
    $("#taskhd a").click(function() {
        removecss();
        $(this).addClass($(this).attr('class') + 'ov');
    });
});

function displayfilter(did1) {
    //$('div[id^="coupon"]').hide();			
    $("#process1").hide(0);
    $("#process2").hide(0);
    $("#process3").hide(0);
    $("#process4").hide(0);
    $("#process5").hide(0);
    $("#process6").hide(0);
    $("#process" + did1).show();
}
function removecss1() {
    $("#processhd  a").each(function() {
        $(this).attr('class', $(this).attr('class').replace('ov', ''));
    });
}
$(document).ready(function() {
    $("#processhd a").click(function() {
        removecss1();
        $(this).addClass($(this).attr('class') + 'ov');
    });
});


function displayreportrightmenu(did16) {
    //$('div[id^="coupon"]').hide();			
    $("#listhd1").hide(0);
    $("#listhd2").hide(0);
    $("#listhd" + did16).show();
}
function removecss2() {
    $(".reportrightmenu  a").each(function() {
        $(this).attr('class', $(this).attr('class').replace('ov', ''));
    });
}
$(document).ready(function() {
    $(".reportrightmenu a").click(function() {
        removecss2();
        $(this).addClass($(this).attr('class') + 'ov');
    });
});


function displaylist(did13) {
    //$('div[id^="coupon"]').hide();			
    $("#list1").hide(0);
    $("#list2").hide(0);
    $("#list3").hide(0);
    $("#list" + did13).show();
}
function removecss3() {
    $("#filterlist  a").each(function() {
        $(this).attr('class', $(this).attr('class').replace('ov', ''));
    });
}
$(document).ready(function() {
    $("#filterlist a").click(function() {
        removecss3();
        $(this).addClass($(this).attr('class') + 'ov');
    });
});



// ............... Reports graph tabs .................. //

function displayreportgrafmenu(did15) {
    //$('div[id^="coupon"]').hide();			
    $("#listhd1").hide(0);
    $("#listhd2").hide(0);
    $("#listhd" + did15).show();
}
function removecss4() {
    $(".reportrightmenu  a").each(function() {
        $(this).attr('class', $(this).attr('class').replace('ov', ''));
    });
}
$(document).ready(function() {
    $(".reportrightmenu a").click(function() {
        removecss4();
        $(this).addClass($(this).attr('class') + 'ov');
    });
});




		