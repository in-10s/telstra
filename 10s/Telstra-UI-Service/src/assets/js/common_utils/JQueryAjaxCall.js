/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function JQueryAjaxCall() {
    this.url = '';
    this.inputData = '';// json data
    this.encData = '';  // encrypted data
    this.response = undefined;
    this.async = true;

    //alert("ajax Call Request");

    this.addData = function (url, inputData, async) {
        this.url = url;
        this.inputData = inputData;
        if (async == undefined) {
            this.async = true;
        } else {
            this.async = async;
        }
    },
            this.submit = function (callback) {
                //alert('submit')
                this.inputData.UniqueKey = generateTocken();
                this.encData = encrypt(JSON.stringify(this.inputData, replacer));
                $.ajax({
                    url: this.url,
                    async: this.async,
                    method: 'POST',
                    data: {
                        "ReqData": this.encData
                    },
                    beforeSend: function (jqXHR, settings) {
                        //alert("beforeSend");
                    },
                    success: function (res, textStatus, jqXHR) {
                        //alert("in Ajax js:: "+res.toSource());
                        if (res["ReportSecurityError"] != undefined) {
                            window.location.href = "SecurityErrorPage.action";
                        } else {
                            if (res.objCRSResponse != null && res.objCRSResponse != undefined) {
                                this.response = res.objCRSResponse;
                            }
                            else {
                                window.location.href = "SecurityErrorPage.action";
                            }
                        }
                        if (callback != undefined) {
                            callback(this.response);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert("error");
                        loadKUnMask();
                        console.log("Error in request..." + this.url);
                    },
                    complete: function (jqXHR, textStatus) {
                        //this.isResponseReady=true;
                        //alert("complete");
                    }
                });
            }
}
function generateTocken() {
    /*var tocken;
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();                   // code for IE7+, Firefox, Chrome, Opera, Safari
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            tocken = xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", "GenerateTocken.action", false);
    xmlhttp.send();
    return tocken;*/
}


function replacer(key, value) {
    if (value === null) {
        return "";
    }
    return value;
}

// added on 13th june while creating reportviewer
function loadModal(id) {
   // var width = (jQuery('body').width());
    $('#' + id).modal({
        backdrop: 'static'
    });
   // $('.modal-open').css('width', width);
}
function loadKMask()
{
    try {
       // var topDocument = top.document;
//        topDocument.documentElement; //Returns a reference to the HTML element
//        topDocument.body;
        // $(topDocument.body).addClass("mask")
       $("iframe").contents().find('body').addClass('mask')
        $('body').addClass("mask");
        document.addClass("mask");
         //aler('mask')
    } catch (e) {
     
        
    }
}
function loadKUnMask()
{
    try {
       // var topDocument = top.document;
//        topDocument.documentElement; //Returns a reference to the HTML element
//        topDocument.body;
       // $(topDocument.body).removeClass("mask")
        $("iframe").contents().find('body').removeClass('mask')
       $('body').removeClass("mask");
       document.removeClass("mask");
        //aler('unmask')
    } catch (e) {
        
        
    }
}

function loadingGridSelection(target) {
    var element = $(target);
    kendo.ui.progress(element, false);
}

function detectIE() {
    var ua = window.navigator.userAgent;
    // Test values; Uncomment to check result �
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
}
