var usersAry = [];
var customersAry = [];
var publishedCustomersAry = [];
var usersRolesAry = [];
var sltdModule = [];
var modulesAry = [];
var orgUsersAry ;
var globalCustomerArr;
var rolesAry = [];
var selecterUsersArr = [];
var cbArr = [];
var REPORTS_LIST=[];


function saveDashboardFun(){
	$(window).scrollTop($('div#focusDiv').position().top);
	var reqData={};
	reqData.U_ID=userId;
    $.ajax({
        url: 'fetchUsersList',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (res) {
            var res = JSON.parse(JSON.stringify(res));
            usersAry=[];
            selecterUsersArr=[];
            
            try {
                if (res.STATUS !="-1") {
                        if(res.STATUS=="1"){
                        	usersAry=res.USERS
                        console.log(">>>>>>>>>>>>>>>>"+JSON.stringify(res));	
                        }else{
                        	alert("No Users Found..");
                        }
                  
                } else {
                	
                }
            } catch (e) {
                alert(e);
            }

        }, error: function (data) {
            alert("error print " + JSON.stringify(data));
        }
    });

    var maxIndex=0;
	var reportDetails = {}
	if(resData.type == '0'){
		maxIndex =1;
	} else if(resData.type == '1'){
		maxIndex =4;
	} else if(resData.type == '2'){
		maxIndex =6;
	} else if(resData.type == '3'){
		maxIndex =9;
	} else if(resData.type == '4'){
		maxIndex =5;
	}
	var reportsArr=[];
	REPORTS_LIST=[];
	for (var count = 0; count < maxIndex; count++) {
		var strReportDetails = document.getElementById("selection_"+count).value;
		reportDetails = JSON.parse(strReportDetails);					
		
		var reportIdCheck = reportDetails.REPORT_ID;
		if(reportsArr.indexOf(reportIdCheck) > -1){
			console.log("REPORTS_LIST : "+JSON.stringify(REPORTS_LIST));
			console.log("DUPLICATE REPORT : "+JSON.stringify(reportDetails));
		  alert("Same Reports Are  Not Allowed");
		  REPORTS_LIST=[];
		  return false;
		}
		else{
			REPORTS_LIST.push(reportDetails);
			reportsArr.push(reportIdCheck);
		}
	}
	console.log("REPORTS_LIST : "+JSON.stringify(REPORTS_LIST));
	
	
	$("#Publishreport").modal('show');
     orgUsersAry = usersAry;
    renderercomponents(modulesAry);
}


function renderercomponents(obj) {


    var usersdataSource = new kendo.data.DataSource({
        data: usersAry
    });

    var usersView = $("#usersView").kendoListView({
        dataSource: usersdataSource,
        template: '<li><input name="" id=\'#:U_ID#_#:TYPE#\' type="checkbox"  class="chkBoxCls" onclick="handleClick(this);"> <label class="colSettColLabelCls">#:LOGIN_ID#</label></li>',
        scrollable: true
    });



    var customerUI = $("#viewSelUsers").kendoListView({
        dataSource: selecterUsersArr,
        //<div class="cancelbt"><a class="btn btn-effect-ripple btn-sm btn-danger" href="#" title="Delete"><i class="icon-close"></i></a></div>
        // template :'<ul class="uploadli"><li><div class="docfile" id=\'#:name#\'>#:name#</div><div class="cancelbt"><a href="javascript:deleteUsersAndRoles(\'#:id#\',\'#:name#\',\'#:type#\')" title="Delete"><i class="remove"></i></a></div></li></ul>',
        template: '<li><div class="docfile" id=\'#:LOGIN_ID#\'>#:LOGIN_ID#</div><div ><a class="delete" href="javascript:deleteCustomers(\'#:U_ID#\',\'#:LOGIN_ID#\',\'#:TYPE#\')" title="Delete"><i class="icon-close"></i></a></div></li>',
        //template: '<li> <label class="colSettColLabelCls">#:LOGIN_ID#</label></li>',
        scrollable: true
        
       
    });

 
}

function deleteCustomers(uid,id,type){
	//alert(uid+" "+id+" "+type);
	 var obj = {};
     obj.U_ID = uid;
     obj.LOGIN_ID = id;
     obj.TYPE = type;
     var userView = $("#usersView").data("kendoListView");
     var sellistView = $("#viewSelUsers").data("kendoListView");
     
  /*   selecterUsersArr
     sltdUsers.push(usersAry[k]);
     usersAry.splice(k, 1);*/
     
     for (var k = 0; k < selecterUsersArr.length; k++) {
         if (selecterUsersArr[k].LOGIN_ID == id && selecterUsersArr[k].TYPE == type)
         {


        	 selecterUsersArr.splice(k, 1);
             sellistView.dataSource.read();
         }

     }
     usersAry.push(obj);

     userView.dataSource.read();
}
function handleClick(cb) {

    if (cb.checked) {
        cbArr.push(cb.id);
    }
    else {
        var index = cbArr.indexOf(cb.id);
        if (index >= 0) {
            cbArr.splice(index, 1);
        }
    }
}
function renderFun(){
	
    var $slider = $('#adddiv21');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
    
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
}

     
     
     function userSearchFun()
     {

         var tenmpAry = [];
         var val = "";
         val = $('#userSrch').val();
         if (val.length != 0)
         {
             try {
                 for (var k = 0; k < orgUsersAry.length; k++) {
                     var name = orgUsersAry[k].LOGIN_ID;
                     val = val.toUpperCase();
                     name = name.toUpperCase();
                     if (name.indexOf(val) > -1)
                     {
                         tenmpAry.push(orgUsersAry[k]);

                     }
                 }
                 $("#usersView").data('kendoListView').setDataSource(new kendo.data.DataSource({
                     data: tenmpAry
                 }));
                 $("#usersView").data('kendoListView').dataSource.read();
             } catch (e) {
                 alert(e);
             }

         }
         if (val.length == 0)
         {
             $("#usersView").data('kendoListView').setDataSource(new kendo.data.DataSource({
                 data: usersAry
             }));
             $("#usersView").data('kendoListView').dataSource.read();
         }

     }
     
     function addUsers() {
     var sltdUsers = [];

     var chflg = 0;
     // alert('cbArr::'+cbArr[0]);
     if (cbArr.length > 0) {
         for (var idx = 0; idx < cbArr.length; idx++) {
             var id = cbArr[idx]
             // alert('id::'+id);
             for (var k = 0; k < usersAry.length; k++) {
                 var userId = usersAry[k].U_ID + '_USER';
                 // alert('userId::'+userId);
                 if (userId == id) {
                     // alert('in if')
                     chflg = 1;
                     sltdUsers.push(usersAry[k]);
                     usersAry.splice(k, 1);
                 }
             }
         }
        
    

     }
     if (chflg == 0) {

    	 errMsg('','No User is Selected'); 


     }
     else {
        /* $('#txtMesg').hide();*/
         var $slider = $('#adddiv21');
         $slider.animate({
             right: parseInt($slider.css('right'), 10) == -536 ?
                     0 : -536
         });

         var $slider = $('#adddiv22');
         $slider.animate({
             left: parseInt($slider.css('left'), 10) == -536 ?
                     0 : -536
         });
         for (var idx = 0; idx < sltdUsers.length; idx++) {
        	 selecterUsersArr.push(sltdUsers[idx]);
         }

         $("#viewSelUsers").data("kendoListView").dataSource.read();

         var listView = $("#usersView").data("kendoListView");
         listView.dataSource.read();
     }
   
     cbArr = [];

 }
     


     
     
     function publishDashboard(){
    	 var reqData={};
		 reqData.U_ID=userId;	   	 
    	 var dbName= $("#dashBoardName").val();
    	 
    	 var pubType=$('input[name=radio]:checked').val();
    	 
    	 if(dbName == ''){
    		 errMsg('dashBoardName','Name Should Not Be Empty');
        	 return false; 
    	 }
    	 reqData.DASHBOARD_NAME=dbName;
		 reqData.PUBLISH_TYPE=pubType;
    	 
    	 if(pubType == 3){
    		 
    		 if(selecterUsersArr.length>0){
    			reqData.DASHBOARD_PUB_LIST=selecterUsersArr;
    			    			 
    		 }else{
    			 errMsg('','Please Select Atleast One User To Publish'); 
    			 return false;
    		 }
    	 }

			reqData.TEMPLATE_TYPE = resData.type;
			reqData.REPORTS_LIST = REPORTS_LIST;
			
			$.ajax({
				url : "saveDashboard",
				type : 'POST',
				async : false,
				data : {
					"reqData" : encrypt(JSON.stringify(reqData))
				},
				success : function(result) {
					var data = JSON.parse(JSON.stringify(result));
					console.log(JSON.stringify(result));
					if(data.STATUS="1"){
						var userId = parent.LoginDetails.U_ID;
						var reqData = {};
						reqData.U_ID = userId;

						document.newDashboard1.method = 'GET';
						document.newDashboard1.action = 'manageDashboard';
						document.newDashboard1.reqData.value = encrypt(JSON.stringify(reqData));
						document.newDashboard1.submit();
					}else{
						alert("Error Occured While Saving Dashboard");
					}
					
				},
				error : function(data) {
					//alert(data1);
				}

			});
    	 $("#Publishreport").modal('hide');
    	 
     }
     
     function Validate() {
    	 var reqData={};
    	 reqData.U_ID=parent.LoginDetails.U_ID;
    	 
          var dashName=$("#dashBoardName").val();
         var regex = /^[A-Za-z0-9 ]+$/
 
         if(dashName !=""){
        	 if(dashName.length< 3){
        		 errMsg('dashBoardName','Name must be greater than 3 charecters'); 
        		 return false;
        	 }else{
        		 var isValid = regex.test(dashName);
                 if (!isValid) {
                	 errMsg('dashBoardName','Name should not contain special charecters');
                	 
                 } 
        	 }
        	 
         }else{
        	 errMsg('dashBoardName','Name should not be empty');
        	 return false;
         }
         
         reqData.DASHBOARD_NAME=dashName;
     	$.ajax({
			url : "validDashboardName",
			type : 'POST',
			async : false,
			data : {
				"reqData" : encrypt(JSON.stringify(reqData))
			},
			success : function(result) {
				var data = JSON.parse(JSON.stringify(result));
				console.log(JSON.stringify(result));
				if(data.STATUS="1"){
					if(data.COUNT>0){
						errMsg('dashBoardName','DashBoard Name Entered is Already Exists');
					}
				}else{
					 errMsg('dashBoardName','Unable To Validate Name At This Time');
		        	 return false;
				}
				
			},
			error : function(data) {
				//alert(data1);
			}

		});
  
         
     }
     function errMsg(id,msg){
    	 $("#ChnageScreen").show();
    	 $("#altLbl").text(msg);
    	 $("#"+id).val('');
    	 $("#"+id).focus();
    	 setTimeout(function (){ $("#ChnageScreen").hide(); }, 1300);
/*    	 setTimeout(() => {
    		 $("#ChnageScreen").hide();
		}, 1300); */
    	 
     }
     
     function clearPubScreen(){
    	 $('#dashBoardName').val('');
    	 $("#Myself").prop("checked", true);
    	 $("#Publishreport").modal('hide');
     }