/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function alertMessage(msgType,msg,renderTo){
    var htmlString='';
    if(msgType=='Error'){
        htmlString="<div class='alert alert-danger alert-dismissable'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>x</button>"+
            "<h4><strong>"+msgType+"</strong></h4>"+
            "<p>"+msg+"</p>"+
            "</div>";
    }else if(msgType=='Success'){
        htmlString="<div class='alert alert-success alert-dismissable'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>x</button>"+
            "<h4><strong>"+msgType+"</strong></h4>"+
            "<p>"+msg+"</p>"+
            "</div>";
    }else if(msgType=='Warning'){
        htmlString="<div class='alert alert-warning alert-dismissable'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>x</button>"+
            "<h4><strong>"+msgType+"</strong></h4>"+
            "<p>"+msg+"</p>"+
            "</div>";
    }else if(msgType=='Information'){
        htmlString="<div class='alert alert-info alert-dismissable'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>x</button>"+
            "<h4><strong>"+msgType+"</strong></h4>"+
            "<p>"+msg+"</p>"+
            "</div>";
    }
    $("#"+renderTo).show();
    $("#"+renderTo).html(htmlString);
}

