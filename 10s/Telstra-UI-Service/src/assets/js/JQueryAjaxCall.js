/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function JQueryAjaxCall() {
    this.url='';
    this.inputData ='';// json data
    this.encData ='';  // encrypted data
    this.response=undefined;
    this.async=true;
    
    
    this.addData = function(url,inputData,async){
        this.url=url;
        this.inputData=inputData;
        if(async==undefined){
            this.async=true;
        }else{
            this.async=async;
        }
    },
    this.submit= function(callback){
        this.inputData.UniqueKey=generateTocken();
        this.encData=parent.encryptReqData(this.inputData);
        $.ajax({
            url:this.url,
            async:this.async,
            method:'POST',
            data:{
                "ReqData":this.encData
            },
            beforeSend:function(jqXHR,settings){
            //alert("beforeSend");
                try{
                    $('#kendo-mask').show();
                }catch(e){
                
                }
            },
            success: function(res,textStatus,jqXHR){
                
                if(callback !=null && callback !="" && callback!=undefined){
                    
                    if(res.objCRSResponse!=null&&res.objCRSResponse['jsonData']!=undefined){
                        this.response=res.objCRSResponse['jsonData'];
                    }else{
                        window.location.href="SecurityErrorPage.do";
                    }
                    callback(this.response);
                }
                try{
                    $('#kendo-mask').hide();
                }catch(e){
                
                }
            },
            error:function(jqXHR,textStatus,errorThrown){
                 console.log("Error in request..."+this.url);
                try{
                    $('#kendo-mask').hide();
                }catch(e){
                
                }
            },
            complete:function(jqXHR,textStatus ){
            //this.isResponseReady=true;
            //alert("complete");
                try{
                    $('#kendo-mask').hide();
                }catch(e){
                
                }
            }
        });
    }
}
function generateTocken(){
    var tocken;
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();                   // code for IE7+, Firefox, Chrome, Opera, Safari
    }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            tocken=xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST","GenerateTocken.do",false);
    xmlhttp.send();
    return tocken;
}


function replacer(key, value) {
  if (value === null) {
    return "";
  }
  return value;
}