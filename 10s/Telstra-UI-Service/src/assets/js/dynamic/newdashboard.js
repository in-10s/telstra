
/* ------------------------------------Line and Bar----------------------------------------------*/

function createBarLineChart(id, res) {	
	$("#" + id).kendoChart({
		dataSource : {
			data : res.DATA.reportResult.Data
		},
		title : {
			//text : res.DATA.CHART_TYPE
		},
		legend : {
			position : "top",
			spacing: 20
		},
		height : divHeightInGrid,
		seriesColors: ["#691260","#c24179","#ee5953","#a72976","#9c1f55","#d2466b"],
		seriesDefaults : {
			type : res.DATA.CHART_TYPE,
			overlay: {
	            gradient: "none"
	        },
		//labels: labelField
		},
		series : res.DATA.SERIES_INFO,
		categoryAxis : {
			field : res.DATA.X_AXIS_FIELD,
			labels : {
				rotation : -90
			},
			majorGridLines : {
				visible : false
			}
		},
		tooltip : {
			visible : true,
			template : "#= series.name #: #= value #"
		}
	});
}

/* .....................................donut...........................  */

function createDonutChart(id, donutData) {

	var donutSeriesArr = [];
	var chartSeriesFieldsArr = donutData.DATA.SERIES_INFO;
	var sampleGridData = donutData.DATA.reportResult.Data;
	var categoryXAxisField = donutData.DATA.X_AXIS_FIELD;
	for (var c = 0; c < chartSeriesFieldsArr.length; c++) {
		var donutSeriesObj = new Object();
		var donutData = [];

		donutSeriesObj.name = chartSeriesFieldsArr[c].field;
		for (var s = 0; s < sampleGridData.length; s++) {
			var donutDataObj = new Object();
			donutDataObj.category = sampleGridData[s][categoryXAxisField];
			donutDataObj.value = sampleGridData[s][chartSeriesFieldsArr[c].field];
			donutData.push(donutDataObj);
		}
		donutSeriesObj.data = donutData;
		var donutlabelObj = {
			visible : true,
			background : "transparent",
			position : "outsideEnd",
			template : "#= value #"
		}
		donutSeriesObj.labels = donutlabelObj;
		donutSeriesArr.push(donutSeriesObj);
	}

	chartTypeName = "donut";

	$("#" + id).kendoChart({
		title : {
			text : "Custom Charts"
		},
		legend : {
			visible : false
		},
		height : divHeightInGrid,
		seriesColors: ["#691260","#c24179","#ee5953","#a72976","#9c1f55","#d2466b"],
		seriesDefaults : {
			type : chartTypeName,
			overlay: {
	            gradient: "none"
	        },
		},
		series : donutSeriesArr,
		tooltip : {
			visible : true,
			template : "#= category #,#= series.name #: #= value #"
		}
	});

}

/* .....................................pie...........................  */

function createPieChart(id, pieData) {

	var pieChartSeriesFieldsArr = [];
	var obj = new Object();
	obj.field = pieData.DATA.SERIES_INFO[0].field;
	obj.categoryField = pieData.DATA.X_AXIS_FIELD;
	pieChartSeriesFieldsArr.push(obj);

	$("#" + id).kendoChart({
		dataSource : {
			data : pieData.DATA.reportResult.Data
		},
		title : {
			position : "top",
			text : pieData.CHART_TYPE
		},
		height : divHeightInGrid,
		legend : {
			visible : true,
			position : "bottom",
			spacing: 20
		},
		seriesColors: ["#691260","#c24179","#ee5953","#a72976","#9c1f55","#d2466b"],
		chartArea : {
			background : ""
		},
		seriesDefaults : {
			type : "pie",
			overlay: {
	            gradient: "none"
	        },
			labels : {
				visible : true,
				background : "transparent",
				template : "#= category #: \n #= value#"
			}
		},
		series : pieChartSeriesFieldsArr,
		
		tooltip : {
			visible : true,
			template : "#= category #: \n #= value#"
		}
	});
}

/*.................................grid.........................*/

function createGrid(id, res) {
	console.log("createGrid::>>>>:::"+JSON.stringify(res));
	var columns = res.DATA.columns;
	var dataJson = res.DATA.reportResult.Data;
	$("#" + id).kendoGrid({
		dataSource : {
			data : dataJson,
			pageSize : 5,
		},
		height : divHeightInGrid,
		scrollable : true,
		sortable : true,
		filterable : true,
		pageable : {
			input : true,
			numeric : false
		},
		columns : columns
	});
}


/*.................................Grid for Frequently Viewed Reports.........................*/

//var columnsFrFaq=[ { "field":"REPORT_NAME", "title":"Report Name", "width":200, "type":"string" }, { "field":"REPORT_DESC", "title":"Report Description", "width":200, "type":"string" }];

//var fobj=[{"REPORT_NAME":"Top10Spenders","REPORT_DESC":"Top 10 spenders","REPORT_URL":"ReportsManager/ReportViewerPage.action?ReqData=448EF30638E562E60F1536EB3B443624160D749688F268D9256DE65C32E073D2013CFC0273A49D9A83EB3B9C41FE22D0708FB36E9F858A9DB26D918683E71BCF7292C2043419096FD40B38E817CF21B76884EA61B63AEA1478ED2B7AAE50F92CA53AEF2C026AB91DC17DA057FE629846E74EBDEE63CABA98CE7096B86182D30227EF5EDCCB311073D979DE759545E60F5B8EAC6E9F858A9D8CF369E62169D54737137197928AF269A9EF5D3224197B9A89F66BDF2576B0"},{"REPORT_NAME":"Monthly_Spend_Report","REPORT_DESC":"Monthly spend by account","REPORT_URL":"ReportsManager/ReportViewerPage.action?ReqData=DA67CA6F91BE054BF37099574CB7ABAFA998F91C120875EE1076ED553BE97ADB0835E56B9A8D84F268D0C70B33EC10C60E6D8DB5573D4255E11EC071EC68A24DEC194B88AF40DE004585B466C4B4E3678F4FF221A0D578A4442269BA4BF528D874D1086796439D3DE24CE2180D5F81AB5788C30968DBB160F050FC20D869D7799DF067CDCBDC4A23CA79EB7CB356F612418BEE66C4BCEB290824DA0450F51833DE075DE00568EE55B2D34630110C0C0F006FEC60AFD144312E2364B5A4948BFF050477E8553385"},{"REPORT_NAME":"Hierarchy_Report","REPORT_DESC":"To check for the spend vs budget across department and Location","REPORT_URL":"ReportsManager/ReportViewerPage.action?ReqData=C570D1689A4084C86DF711CEC5312119037293F76EEC52C3CC352E157BA93A9B48F5262B5A4DC4B2AB9380C36A9549FF41BE639F492F5C4FD4719A499F23C56196B131A75B85BB74A3FE629B4DF95CFF3734D50D4556D3BA43F622B45E8CA34B5EF526D7BB74E97EDD1EC26CEF65C672A98DDA6186A244FC28B85F9E42F15041E6033FE462E71634EE2772E212391525A134D60421D476A996F726CF75D50B30C8064399F87CD24057B297B5648DDB6185A64AE85748C1ACAC8A8394B46881A62EA244EC1D3A9B3011046AD83C5CD64BCEBFC4C9AA9480FE050E037ED243424B38271B0F0A0B6EA4"},{"REPORT_NAME":"Trend_Analysis_Report","REPORT_DESC":"Trend analysis","REPORT_URL":"ReportsManager/ReportViewerPage.action?ReqData=B80564F629D67DC36AFA2CE1315AC8B2A493F2170F0B70E12D55CEB59B4A9A3AEA12CA50A1F26ED04FC6C7D80822DE0A498C99B56F9087F050EB123394C96AE41FC4044CFC29D074F3689B44FA2B7895F428C176D072A5A640F76EA198F5063C9432D5BA50FA69E41DDF053C6BA68BB25480DA7CB3478CB82B7CF557C4A2FB2FD10B3CD97BD1759BB16FA4EF51CAA0889F32E7022FE778ED0E3DD2035D4ECBA2988C88F05DDB4533524336262C1A7883F664DEBADB3E37281400050477D618"},{"REPORT_NAME":"Telstra_Demo_Report","REPORT_DESC":"Telstra_Demo_Report","REPORT_URL":"ReportsManager/ReportViewerPage.action?ReqData=96230614CE7CD87FA7BD6FACFB077BFF7AE92B6FE752CF414248C3A08E459F21D309313EB7E860DD58CDCCDF1139E511B61A2BC37DA6FD0968F315C50CB16787AAAA25A350E07FA024A25685EB5C4B8CB26C974EF70D31EB0361AEE175954E85CC0E2CC445EE69E90A1334E065E61875ED54F3689B44FA2B4AF220CAA09EF5167BE847EE5488AA50F91A4C9F5A3321070E016EDF0FC51E4E81A942E57FD105250B011679EA53C0A9D532272F03719EE662DC5EC8DD3E312B1703060774EB42FB"},{"REPORT_NAME":"Test001","REPORT_DESC":"test report","REPORT_URL":"ReportsManager/ReportViewerPage.action?ReqData=83CFB247F927AD123430D9170C77EB6EE858B9DD50CAB7A8EB12097AD00759F82BD20B1061B2AFADAFA1F82ADF0A36E161E4709E40E1315A3FDC0EC50F0E7DE1483067E80D32ED24ADC06597B69CE337E80138E83C9F46F925D37DAE99F42BD470EE22D9629F25BB9E97F563B0ED53F920C116BB6289A443899A97F667CDCCDF003DEE14BD1235DB0C29A83F221379EF1577F36EEA5CA4F56BD342305CA79F80E247484AC3BCA094F113006DA6"},{"REPORT_NAME":"Department Wise Service Expenses","REPORT_DESC":"Department Wise Service Expenses","REPORT_URL":"ReportsManager/ReportViewerPage.action?ReqData=56E040DA052AAE1539CB7DB2E12D1D1D1F167F83FB7EE35DA6EC66DD4CFA55F427D607146DBEBBA09E91889B4DFD22D57DC04CE21CC5D23C1D2EDF144083B46D9E498899B35289AAFF6284B97CA130A48783B76CE46296B464C2DBCC7CAE5386CD73F415C46CBBC4A5A640F463E41AC862943C6D87BF7FA0F5789E5E98469C33101ADE0B4582B6538AE82073A643FF2BA82CC372AE5047B0918DE354439749E10FC7184DEF1DDAB8C7D84E3F270D4586A845F51FB627C86595BED521007DE157A5E35EC4B9AFFA1D171E03719EE35AC7AB99F91E0D72EE5BBEDF41F1"}];
function createGridForFRQReports(id, res) {
	$("#" + id).empty();
	var dataJson = res.USERS;
	$("#" + id).kendoGrid({
		dataSource : {
			data : dataJson,
			pageSize : 5,
		},
		height : divHeightInGrid,
		scrollable : true,
		pageable : {
			input : true,
			numeric : false
		},
		columns : [ { "field":"REPORT_NAME", "title":"Report Name", "width":200, "type":"string" }, { "field":"REPORT_DESC", "title":"Report Description", "width":200, "type":"string" }]
	});
}
