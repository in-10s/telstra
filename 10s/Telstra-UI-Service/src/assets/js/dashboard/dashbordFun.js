
var chartDivTemplate='';
var jobArr=[];
function loadDashboardsList(){
	var reqData={};
	reqData.job_source='dashboard';
	reqData.U_ID=userId;
    $.ajax({
        url: 'loadDBdtls',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (res) {
            var res = JSON.parse(JSON.stringify(res));
            try {
                if (res.DASHBOARD_COUNT>0) {
                        jobArr = res.DASHBOARD_DTLS;
                        loadDashboardCombo();
                  
                } else {
                	$('#dsboard').append($("<option></option>").attr("value",'0').text('Default Dashboard').attr("Template",'4'));
                	loadReports($("#dsboard").find("option:selected").val());
                }
            } catch (e) {
                alert(e);
            }

        }, error: function (data) {
            alert("error print " + JSON.stringify(data));
        }
    });
	

}

function setLoginDB(){
	var selctedDB = $("#dsboard").find("option:selected").val(); 
	var selctedDBText = $("#dsboard").find("option:selected").text();
	var userId = parent.LoginDetails.U_ID;
	var reqData={};
	reqData.DB_ID=selctedDB;
	reqData.U_ID=userId;
	$.ajax({
        url: 'saveLoginDB',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (res) {
        	
        	console.log("Report result :"+JSON.stringify(res));
        	//var result = JSON.parse(JSON.stringify(result));
        	if(res.STATUS == '1'){
        		alert(selctedDBText+" Is Set As Your Landing Dashboard");
				parent.LoginDetails.Land_DB_Id=selctedDB;
				//$("#dsboard").val(parent.LoginDetails.Land_DB_Id).attr("selected", "selected");
        	}else{
        		alert("Unable To Save The Landing Dashboard");
        	}

        }, error: function (data) {
            alert("error print " + JSON.stringify(data));
        }
    });
}

var DB_Template='';
function loadDashboardCombo(){
	
	$('#dsboard').append($("<option></option>").attr("value",'0').text('Default Dashboard').attr("Template",'4'));
	$(jobArr).each(function (idx) {
		$('#dsboard').append($("<option></option>").attr("value",jobArr[idx].DB_ID).text(jobArr[idx].DB_NAME).attr("Template",jobArr[idx].DB_TEMPLATE_TYPE));
	});
	$("#dsboard").val(parent.LoginDetails.Land_DB_Id).attr("selected", "selected");
	loadReports($("#dsboard").find("option:selected").val());
	
	}

function dashboardChange() {
	
	var selctedDB = $("#dsboard").find("option:selected").val();
	
/*	if(selctedDB != 0)
	   document.getElementById("liDelDB").style.display = "";
	else
		document.getElementById("liDelDB").style.display = "none";*/
	
	 clearDashboardCharts();
	 loadReports($("#dsboard").find("option:selected").val());
	}

function fDBDelete(){
	
	var selctedDB = $("#dsboard").find("option:selected").val();
	var reqData={};
	reqData.R_ID=selctedDB;
	$.ajax({
        url: 'deleteDashboard',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (res) {
        	
        	console.log("Report result :"+JSON.stringify(res));
        	//var result = JSON.parse(JSON.stringify(result));
        	if(res.STATUS == '1'){
        	
	        	var userId = parent.LoginDetails.U_ID;
				var reqData = {};
				reqData.U_ID = userId;
	
				document.dashboardFormId.method = 'GET';
				document.dashboardFormId.action = 'dashboard';
				document.dashboardFormId.reqData.value = encrypt(JSON.stringify(reqData));
				document.dashboardFormId.submit();
        	}else{
        		alert("Unable To Delete The Dashboard");
        	}

        }, error: function (data) {
            alert("error print " + JSON.stringify(data));
        }
    });
	
}//fDBDelete()

var reportsArr=[]
function loadReports(dashId){
	var reqData={};
	if(dashId=="0"){
		loadDynamicDivsFrDefault();
		
	}else{		
	
	
	DB_Template=$("#dsboard").find("option:selected").attr('Template');
	reqData.job_source='dashboard';
	reqData.U_ID=userId;
	reqData.D_ID=dashId;
    $.ajax({
        url: 'fetchReportDtld',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (res) {
        	
        	console.log("Report result :"+JSON.stringify(res));
        	
        	 var res = JSON.parse(JSON.stringify(res));
            try {
                if (res.REPORT_COUNT>0) {
                        reportsArr = res.REPORT_DTLS;
                        loadDynamicDivs();
                  
                } else {
                    alert("Alert::" + res.COMMENTS);
                }
            } catch (e) {
                alert(e);
            }

        }, error: function (data) {
            alert("error print " + JSON.stringify(data));
        }
    });
	}


}

function loadDynamicDivs() {
	clearDashboardCharts();
	$("#parentDiv").empty();
	if (DB_Template == '0') {
		$(reportsArr)
				.each(
						function(index) {
							$("#parentDiv")
									.append(
											'<div class="col-md-12 pad15R mrg15B"><div class="homelinks lightbg" style="height:458px;"><h2>'
													+ reportsArr[index].REPORT_NAME
													+ '</h2><div id="chart'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" ></div><div class="mask" style="display:none" id="wait'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '"><img src="images/tenor.gif" /></div><div id="comment'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
						});
	} else if (DB_Template == '1') {
		$(reportsArr)
				.each(
						function(index) {
							$("#parentDiv")
									.append(
											'<div class="col-md-6 pad15R mrg15B"><div class="homelinks lightbg" style="height:458px;"><h2>'
													+ reportsArr[index].REPORT_NAME
													+ '</h2><div id="chart'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" ></div><div class="mask" style="display:none" id="wait'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '"><img src="images/tenor.gif" /></div><div id="comment'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
						});
	} else if (DB_Template == '2' || DB_Template == '3') {
		$(reportsArr)
				.each(
						function(index) {
							$("#parentDiv")
									.append(
											'<div class="col-md-4 pad15R mrg15B"><div class="homelinks lightbg" style="height: 458px;"><h2>'
													+ reportsArr[index].REPORT_NAME
													+ '</h2><div id="chart'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" ></div><div class="mask" style="display:none" id="wait'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '"><img src="images/tenor.gif" /></div><div id="comment'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold"><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
						});
	} else if (DB_Template == '4') {

		$(reportsArr)
				.each(
						function(index) {
							if (index <= 1) {
								$("#parentDiv")
										.append(
												'<div class="col-md-6 pad15R mrg15B"><div class="homelinks lightbg" style="height: 458px;"><h2>'
														+ reportsArr[index].REPORT_NAME
														+ '</h2><div id="chart'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '" ></div><div class="mask" style="display:none" id="wait'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '"><img src="images/tenor.gif" /></div><div id="comment'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold"><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
							} else {
								$("#parentDiv")
										.append(
												'<div class="col-md-4 pad15R mrg15B"><div class="homelinks lightbg" style="height: 458px;"><h2>'
														+ reportsArr[index].REPORT_NAME
														+ '</h2><div id="chart'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '" ></div><div class="mask" style="display:none" id="wait'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '"><img src="images/tenor.gif" /></div><div id="comment'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold"><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
														+ reportsArr[index].REPORT_SEQ_ID
														+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
							}
						});
	} else {
		$(reportsArr)
				.each(
						function(index) {
							$("#parentDiv")
									.append(
											'<div class="col-md-6 pad15R mrg15B"><div class="homelinks lightbg" style="height: 458px;"><h2>'
													+ reportsArr[index].REPORT_NAME
													+ '</h2><div id="chart'
													+ reportsArr[index].RID
													+ '" ></div><div class="mask" style="display:none" id="wait'
													+ reportsArr[index].RID
													+ '"><img src="images/tenor.gif" /></div><div id="comment'
													+ reportsArr[index].RID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold"><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
													+ reportsArr[index].REPORT_SEQ_ID
													+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
						});
	}
	
	
	loadChartsfromReports();
}

function clearDashboardCharts(){
	$(reportsArr).each(function (index) {
		$("#chart"+reportsArr[index].RID).empty();
		});	
}

function loadChartsfromReports() {
	/*
	 * chartID == 1 ---- Bar chartID == 2 ---- Line chartID == 3 ---- Pie
	 * chartID == 4 ---- donut
	 */

	$(reportsArr).each(
			function(index) {
				
				var reportId = reportsArr[index].RID;
				var r_id = reportsArr[index].REPORT_SEQ_ID;
				
				$('#wait' + r_id).show();
				if(reportId=="0"){
					var reqData = {};
					reqData.UID = userId;
				//	reqData.UID = 5;
					reqData.rep_seq_id = r_id;
					$.ajax({
						url : "fetchFeqViwedReportData",
						type : 'POST',
						async : true,
						data : {
							"reqData" : encrypt(JSON.stringify(reqData))
						},
						success : function(result) {
							
							console.log(">>>>>>>>gsdf>>>>>>>"+JSON.stringify(result));
							var res = JSON.parse(JSON.stringify(result));
							var divId=res.REP_SEQ_ID;
				        	if(res.STATUS !="-1"){		
				        		
				        		createGridForFRQReports(divId,res);    	
				        		$('#wait' + r_id).hide();
				        	}else{
				        		//alert(res.COMMENTS);
				        		$("#divId_"+targetArr[1]).empty();
				        		$('#wait'+targetArr[1]).hide();
								$("#comment1"+targetArr[1]).show();
				        	}
				        	$('#wait'+r_id).hide();
						},
						error : function(data) {
							//alert(data1);
							$("#divId_"+targetArr[1]).empty();
							$('#wait'+targetArr[1]).hide();
							$("#comment"+targetArr[1]).hide();
							$("#comment1"+targetArr[1]).show();
						}

					});
					
				}else{
				var reqData = {};
				reqData.UID = userId;
				reqData.reportID = reportId;
				reqData.UserName = userId;
				reqData.rep_seq_id = r_id;
				$.ajax({
					url : 'fetchReportData',
					type : 'POST',
					async : true,
					dataType : 'json',
					data : {
						"reqData" : encrypt(JSON.stringify(reqData))
					},
					success : function(res) {
						
							
						
						console.log("Report REsp>>>>"+JSON.stringify(res));
						if (res.STATUS != "-1") {
							var res = JSON.parse(JSON.stringify(res));
							var divId=res.REP_SEQ_ID;
							try {

								if (res.DATA.CHART_ID != 'undefined'
										&& res.DATA.CHART_ID != undefined) {
									
									if (res.DATA.CHART_ID == 1
											|| res.DATA.CHART_ID == 2) {
										createBarLineChart(divId, res);
									} else if (res.DATA.CHART_ID == 3) {
										createPieChart(divId, res);
									} else if (res.DATA.CHART_ID == 4) {
										createDonutChart(divId, res);
									}

								} else {
									createGridChart(divId, res);
								}
								$('#wait' + r_id).hide();
							} catch (e) {
								// alert(e);
								$('#wait' + r_id).hide();
								$("#comment1" + r_id).show();
							}
						} else {
							$('#wait' + r_id).hide();
							$("#comment1" + r_id).show();

							/* alert(res.COMMENTS); */
						}

					},
					error : function(data) {
						// alert(" error " + JSON.stringify(data));
						$('#wait' + r_id).hide();
						$("#comment1" + r_id).show();
					}

				});
			}

			});
}
function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function loadSummaryDtls() {
	var refArr = [ "BILL_SUMMARY", "MOBILE_SUMMARY", "LL_SUMMARY", "VNS_SUMMARY" ];

	var reqData = {};
	reqData.USER_ROLE = l_id;
	reqData.U_ID = userId;
	$.ajax({
				url : 'loadBillSummary',
				type : 'POST',
				async : true,
				dataType : 'json',
				data : {
					"reqData" : encrypt(JSON.stringify(reqData))
				},
				success : function(res) {
					var res = JSON.parse(JSON.stringify(res));
					console.log("loadBillSummary Result ::"+JSON.stringify(res));
					try {
						if (l_id == 'CXO-Enterprise' || l_id == 'End-User') {
							if (res.BILLS_ARR.length > 0) {
								$('#billsum').show();
								var JobArr = res.BILLS_ARR;
								for (var i = 0; i < JobArr.length; i++) {
									var id = JobArr[i].COMMENTS;
									/* if(jQuery.inArray(id, refArr) !== -1){ */
									if ("BILL_SUMMARY" == id) {
										$("#bs_dt").html(JobArr[i].MONTH);
										$("#bs_damt")
												.html(
														'<span class="txt17size">'
																+ formatNumber(JobArr[i].TOTAL_DUE
																		+ '</span>'));
										$("#bs_pamt")
												.html(
														'<span class="txt17size">'
																+ formatNumber(JobArr[i].PREVIOUS_DUE
																		+ '</span>'));
										$("#bs_tamt")
												.html(
														'<span class="txt17size">'
																+ formatNumber(JobArr[i].TOTALSUM
																		+ '</span>'));

									} else if ("MOBILE_SUMMARY" == id) {
										$("#m_amt")
												.html(
														formatNumber(JobArr[i].TOTALSUM));
										$("#m_dt").html(JobArr[i].INVOICE_DATE);

									} else if ("LL_SUMMARY" == id) {
										$("#ll_amt")
												.html(
														formatNumber(JobArr[i].TOTALSUM));
										$("#ll_dt")
												.html(JobArr[i].INVOICE_DATE);

									} else if ("VNS_SUMMARY" == id) {
										$("#vns_amt")
												.html(
														formatNumber(JobArr[i].TOTALSUM));
										$("#vns_dt").html(
												JobArr[i].INVOICE_DATE);

									}

								}

							}
						} else {
							if (res.STATUS == "0") {
								/*
								 * $("#paySummary").show();
								 * $("#parentDiv").addClass("col-sm-10 mrg10T");
								 * $("#advertise").show();
								 */
								$("#bil_dt").html(res.MONTH);
								$("#total_due")
										.html(
												formatNumber('<span class="over-cnt uniservenxtcmp_text form-html">'
														+ res.TOTAL_DUE
														+ '</span>'));
								$("#pay_over_due")
										.html(
												formatNumber('<span class="over-cnt uniservenxtcmp_text form-html">'
														+ res.PAYMENT_OVERDUE
														+ '</span>'));
								$("#total_amount")
										.html(
												formatNumber('<span class="over-cnt uniservenxtcmp_text form-html">'
														+ res.TOTAL_AMOUNT
														+ '</span>'));
								$("#payment_received")
										.html(
												formatNumber('<span class="over-cnt uniservenxtcmp_text form-html">'
														+ res.PAYMENT_RECEIVED
														+ '</span>'));

							}
						}

					} catch (e) {
						alert(e);
					}

				},
				error : function(data) {
					alert(" error  " + JSON.stringify(data));
				}

			});

}

function clearAndShow() {
	
	$("#cardDiv").empty();
	$("#divPayment1").modal('show');
	$("#payList").empty();
	$("#payList").append(payList);
	$("#home").show();
	$("#payWay").hide();
	$("#bankDD").val('Select bank');
	$("#dc").removeClass("active");
	$("#cc").removeClass("active");
	$("#nb").addClass("active");
}
function paymentSummaryDiv(obj) {
    clearAndShow();
	$("#dispAmt").text($("#bs_tamt").text());

}
function paymentVNSDiv() {
	clearAndShow();
	
	$("#dispAmt").text($("#vns_amt").text());
}

function paymentMobDiv() {
	clearAndShow();
	$("#dispAmt").text($("#m_amt").text());
}

function paymentLLDiv(){
	clearAndShow();
	$("#dispAmt").text($("#ll_amt").text());
}

var adminTelestra = [ "", "Current Month Revenue By Customer",
		"Customer-wise Revenue Trend", "LOB-wise Revenue Trend",
		"Current Month Revenue vs Collection" ];
var adminTelestra2 = [ "", "Audit Report",
	"Bill Processing", "Reports Management",
	"Trouble Ticketing" ];
var enterpriseTelestra = [ "", "Geographical Spend",
		"LOB-wise Bill Amount(Current Month)", "Trend Analysis",
		"Total Lob-wise Bill Amount(6 Months)" ];
function loadDynamicDivsFrDefault() {
	
	//alert("l_id ::"+l_id);
	
	clearDashboardCharts();
	$("#parentDiv").empty();
	if (("AccountManager-Telestra" == l_id) ) {
		for (var inx = 1; inx <= 1; inx++) {
			$("#parentDiv")
					.append(
							'<div class="col-md-6 pad15R mrg15B"><div class="homelinks lightbg" style="height: 458px;"><h2>'
									+ adminTelestra[inx]
									+ '</h2><div id="deTemp'
									+ inx
									+ '" ></div><div class="mask" style="display:none" id="wait'
									+ inx
									+ '"><img src="images/tenor.gif" /></div><div id="comment'
									+ inx
									+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold"><span style="color:red;font-weight:bold">No Data Found.</span></span></div><div id="comment1'
									+ inx
									+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
		}
	} else if (("Admin-Enterprise" == l_id) || ("CXO-Enterprise" == l_id)|| ("End-User" == l_id)) {
		for (var inx = 1; inx <= 4; inx++) {
			$("#parentDiv")
					.append(
							'<div class="col-md-6 pad15R mrg15B"><div class="homelinks lightbg" style="height: 458px;"><h2><span id="mapLabel'+inx+'">'
									+ enterpriseTelestra[inx]
									+ '</span></h2><div id="deTemp'
									+ inx
									+ '" ></div><div class="mask" style="display:none" id="wait'
									+ inx
									+ '"><img src="images/tenor.gif" /></div><div id="comment'
									+ inx
									+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold"><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
									+ inx
									+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
		}
	}else if("Admin-Telestra" == l_id){
		
		for (var inx = 1; inx <= 4; inx++) {
			$("#parentDiv")
					.append(
							'<div class="col-md-6 pad15R mrg15B"><div class="homelinks lightbg" style="height: 458px;"><h2>'
									+ adminTelestra2[inx]
									+ '</h2><div id="deTemp'
									+ inx
									+ '" ></div><div class="mask" style="display:none" id="wait'
									+ inx
									+ '"><img src="images/tenor.gif" /></div><div id="comment'
									+ inx
									+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold"><span style="color:red;font-weight:bold">No Data Found.</span></div><div id="comment1'
									+ inx
									+ '" style="display:none;text-align: center; margin-top:200px;" ><span style="color:red;font-weight:bold">Unable To Load Report Data</span></div></div></div>');
		}
	}

	loadChartsforDD();
}

function loadChartsforDD() {
	/*
	 * AccountManager-Telestra Admin-Telestra Admin-Enterprise CXO-Enterprise
	 * EndUser-Enterprise
	 */

	if (("AccountManager-Telestra" == l_id) ) {
		loadTelestraTemp();
		// [Cuurent Month Revenue By Customer, Customer-wise Revenue Trend,
		// LOB-wise Revenue Trend, Current Month Revenue vs Collection]

	} else if ("Admin-Enterprise" == l_id || "CXO-Enterprise" == l_id || "End-User" == l_id) {
		//alert("l_id :"+l_id);
		
		loadEnterpriseTemp();
		// [Geographical Spend, LOB-wise Bill Amount(Current Month), Trend
		// Analysis, Total Lob-wise Bill Amount(6 Months)]
	}else if("Admin-Telestra" == l_id){
		loadTelsestraAdminTemp();
	}

}

function loadTelestraTemp() {
   	var gridColumns1 = [ {
		field : "COMPANY_ID",
		title : "COMPANY ID",
		headerTemplate : '<span title="Company Id">Company Id</span>',
		encoded : false

	}, {
		field : "CUST_NAME",
		title : "CUSTOMER NAME",
		headerTemplate : '<span title="Customer Name">Customer Name</span>',
		encoded : false

	}, {
		field : "AMOUNT",
		title : "AMOUNT",
		format: "{0:c}",
		headerTemplate : '<span title="Amount">Amount</span>',
		encoded : false
	}, {
		field : "COLLECTED_AMOUNT",
		title : "COLLECTED AMOUNT",
		format: "{0:c}",
		headerTemplate : '<span title="Collected Amount">Collected Amount</span>',
		encoded : false

	} ];

	for (var i = 1; i <= 4; i++) {
		$("#wait"+i).show();
		var reqData = {};
		var divId = i;
		reqData.ROLE_NAME = l_id;
		reqData.REPORT_ID = i;
		reqData.U_ID = userId;
		var flag = false;
		$.ajax({
			url : 'loadDefaultDashboardData',
			type : 'POST',
			async : true,
			dataType : 'json',
			data : {
				"reqData" : encrypt(JSON.stringify(reqData))
			},
			success : function(res) {
				var res = JSON.parse(JSON.stringify(res));
				console.log(">>>>>>>"+JSON.stringify(res));
				if(res.STATUS !="-1"){
				
				$("#wait"+res.REPORT_ID).hide();
				if (res.CHART_TYPE == "grid") {
					if (res.STATUS == "1") {
						defaultGrid("deTemp"+res.REPORT_ID, gridColumns1, res.DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				}

				if (res.CHART_TYPE == "line") {

					if (res.STATUS == "1") {

						createDefaultLineChart("deTemp" + res.REPORT_ID,
								res.X_AXIS_COLUMNS_VALUES, res.BAR_GRP_DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}
				}

				if (res.CHART_TYPE == "bar") {
					if (res.STATUS == "1") {
						defaultBarChart("deTemp"+res.REPORT_ID, res.X_AXIS_COLUMNS_VALUES,
								res.BAR_GRP_DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				}
				if (res.CHART_TYPE == "donut") {

					if (res.STATUS == "1") {
						defaultpieChartLoading("deTemp"+res.REPORT_ID, res);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				}
			}else{
				$("#wait"+res.REPORT_ID).hide();
				$("#comment1"+res.REPORT_ID).show();	
				}

			},
			error : function(data) {
				
					$("#wait"+res.REPORT_ID).hide();
					$("#comment1"+res.REPORT_ID).show();
				
			}

		});

	}

}

function loadEnterpriseTemp() {

	for (var i = 1; i <= 4; i++) {
		$("#wait"+i).show();
		var reqData = {};
		reqData.ROLE_NAME = l_id;
		reqData.REPORT_ID = i;
		reqData.U_ID = userId;

		$.ajax({
			url : 'loadDefaultDashboardData',
			type : 'POST',
			async : true,
			dataType : 'json',
			data : {
				"reqData" : encrypt(JSON.stringify(reqData))
			},
			success : function(res) {
				var res = JSON.parse(JSON.stringify(res));
				$("#wait"+res.REPORT_ID).hide();
				if(res.STATUS != "-1"){
				if (res.CHART_TYPE == "pie") {

					if (res.STATUS == "1") {
						defaultpieChartLoading("deTemp2", res);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				} else if (res.CHART_TYPE == "line") {
					if (res.STATUS == "1") {
						
						createDefaultLineChart("deTemp3",res.X_AXIS_COLUMNS_VALUES, res.BAR_GRP_DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}
				} else if (res.CHART_TYPE == "bar") {
					if (res.STATUS == "1") {
						defaultBarChart2("deTemp4", res.X_AXIS_COLUMNS_VALUES,
								res.BAR_GRP_DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				} else if (res.CHART_TYPE == "geo") {
					if (res.STATUS == "1") {
						defaultMapChart("deTemp1", res.X_AXIS_COLUMNS_VALUES,res.BAR_GRP_DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				}
				}else{
					$("#wait"+res.REPORT_ID).hide();
					$("#comment1"+res.REPORT_ID).show();
				}

			},
			error : function(data) {
				
					$("#wait"+res.REPORT_ID).hide();
					$("#comment1"+res.REPORT_ID).show();
				
			}

		});

	}
}

function loadTelsestraAdminTemp() {
   	var gridCo = [ {
		field : "TICKET_ID",
		title : "TICKET ID",
		headerTemplate : '<span title="Ticket Id">Ticket Id</span>',
		encoded : false

	}, {
		field : "SERVICE_TYPE",
		title : "SERVICE TYPE",
		headerTemplate : '<span title="Service Type">Service Type</span>',
		encoded : false

	}, {
		field : "STATUS",
		title : "STATUS",
		headerTemplate : '<span title="Status">Status</span>',
		encoded : false
	} ];
   	
	var gridCo2 = [ {
		field : "REPORT_NAME",
		title : "REPORT NAME ",
		headerTemplate : '<span title="Report Name">Report Name</span>',
		encoded : false

	}, {
		field : "REPORTS_DESCRIPTION",
		title : "Description",
		headerTemplate : '<span title=" Description"> Description</span>',
		encoded : false

	} ];
   	
   	
   	
   	

	for (var i = 1; i <= 4; i++) {
		$("#wait"+i).show();
		var reqData = {};
		var divId = i;
		reqData.ROLE_NAME = l_id;
		reqData.REPORT_ID = i;
		reqData.U_ID = userId;
		var flag = false;
		$.ajax({
			url : 'loadDefaultDashboardData',
			type : 'POST',
			async : true,
			dataType : 'json',
			data : {
				"reqData" : encrypt(JSON.stringify(reqData))
			},
			success : function(res) {
				var res = JSON.parse(JSON.stringify(res));
				console.log(">>>>>>>"+JSON.stringify(res));
				$("#wait"+res.REPORT_ID).hide();
				if(res.STATUS !="-1"){
				if (res.CHART_TYPE == "grid") {
					if (res.STATUS == "1") {
						if(res.REPORT_ID=='4'){
						defaultGrid("deTemp"+res.REPORT_ID, gridCo, res.DATA);
						}else{
							defaultGrid("deTemp"+res.REPORT_ID, gridCo2, res.DATA);
						}
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				}

				if (res.CHART_TYPE == "line") {

					if (res.STATUS == "1") {

						createDefaultLineChart("deTemp" + res.REPORT_ID,
								res.X_AXIS_COLUMNS_VALUES, res.BAR_GRP_DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}
				}

				if (res.CHART_TYPE=="bar_multi") {
					if (res.STATUS == "1") {
						defaultBarMultiChart("deTemp"+res.REPORT_ID, res.X_AXIS_COLUMNS_VALUES,
								res.BAR_GRP_DATA);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				}
				if (res.CHART_TYPE == "donut") {

					if (res.STATUS == "1") {
						defaultDonutChartLoading("deTemp"+res.REPORT_ID, res);
					}else{
						$("#wait"+res.REPORT_ID).hide();
						$("#comment"+res.REPORT_ID).show();
					}

				}
				}else{
					$("#wait"+res.REPORT_ID).hide();
					$("#comment1"+res.REPORT_ID).show();
				}

			},
			error : function(data) {
				
					$("#wait"+res.REPORT_ID).hide();
					$("#comment1"+res.REPORT_ID).show();
				
			}

		});

	}

}




function usageDiv(){
	$('.highcharts-container').hide();
	
	$("#deTemp1").append('<div id="ddd"><button onclick="backToMap();">Back</button><div id="map_chart_drillDown" ></div></div>');
	
}

function backToMap(){
	$("#ddd").remove();
	$("#mapLabel1").text('Geographical Spend');
	$('.highcharts-container').show();
	
}





/*........................................Publish.................................................*/

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



function loadPublishDetails(){
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
	alert(uid+" "+id+" "+type);
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
    		 errMsg('dashBoardName','Name should not be empty');
        	 return false; 
    	 }
    	 reqData.DASHBOARD_NAME=dbName;
		 reqData.PUBLISH_TYPE=pubType;
    	 
    	 if(pubType == 3){
    		 
    		 if(selecterUsersArr.length>0){
    			reqData.DASHBOARD_PUB_LIST=selecterUsersArr;
    			    			 
    		 }else{
    			 errMsg('','Please select aleast an user to publish'); 
    			 return false;
    		 }
    	 }
    	 $("#Publishreport").modal('hide');
    	 
     }
     
     function Validate() {
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
        
  
         
     }
     function errMsg(id,msg){
    	 $("#ChnageScreen").show();
    	 $("#altLbl").text(msg);
    	 $("#"+id).val('');
    	 $("#"+id).focus();
    	 setTimeout(function (){ $("#ChnageScreen").hide(); }, 1300);
//    	 setTimeout(() => {
//    		 $("#ChnageScreen").hide();
//		}, 1300); 
    	 
     }
     
     function clearPubScreen(){
    	 $('#dashBoardName').val('');
    	 $("#Myself").prop("checked", true);
    	 $("#Publishreport").modal('hide');
     }
     
     function loadFreqReportData(REPORT_URL){
    	 console.log("REPORT_URL : "+REPORT_URL);
    	 $("#parentDiv").empty();
    	 $('#parentDiv').append("<a href='javascript:void(0)' class='secondarybt pull-right' onclick=loadFreqReportDataBack(); return false;>Back</a>");
    	 $('#parentDiv').append('<br> <br>');
    	 $('#parentDiv').append('<iframe id="frameBody1" width="100%" style="margin:0; overflow: hidden;" frameborder="0" scroll="no" src="'+REPORT_URL+'" height="900px"></iframe>');    	 
     }
     
     function loadFreqReportDataBack(){
    	 dashboardChange()
     }