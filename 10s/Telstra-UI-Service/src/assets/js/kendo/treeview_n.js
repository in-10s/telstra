var rootUid;
var preItemId;
var checkedNodes =[];
$("#treeview").kendoTreeView({
    //    checkboxes: {
    //         checkChildren: false
    //    },
    //check: onCheckNode,
    template: "<span style='color: #= item.COLOR #'>#= item.CC_NAME #</span>",
    select: onCheckNode,
    expand: onExpand,
    dataTextField: ["CC_NAME"],
    schema: {
        model: {
            children: "items"
        }
    }

});

function onCheckNode(e,expandFlag) {
    //alert('selected');
    var treeview = $("#treeview").getKendoTreeView();
    if(preItemId != "" && preItemId != undefined){
        $('#treeview ul [data-uid='+preItemId+'] > div > span.k-in').css("background-color", "#ffffff");   
    }
    
    var dataItem = treeview.dataItem(e.node);
    var itemId = e.node.getAttribute("data-uid");
    preItemId = itemId;
    $('#treeview ul [data-uid='+itemId+'] > div > span.k-in').css("background-color", "#cac8c8");
    if(dataItem.HASCHILDRENS==0 && !dataItem.COST_CENTRE_FLAG){
        $('#costCodeId').attr('disabled',"false");
        $('#nodeId').attr('disabled',"false");
        $("#costCodeId").addClass("primarybt2enable");  
        $("#nodeId").addClass("primarybt2enable");
        $("#costCodeId").removeClass("primarybt2disable");  
        $("#nodeId").removeClass("primarybt2disable");
       // $("#accountId").removeClass("primarybt2enable");
         //$("#accountId").addClass("primarybt2disable");
    }else if(dataItem.HASCHILDRENS==0 && dataItem.COST_CENTRE_FLAG){
        $('#nodeId').attr('disabled',"true");
        $('#costCodeId').attr('disabled',"true");
        $("#costCodeId").addClass("primarybt2disable");  
        $("#nodeId").addClass("primarybt2disable");
        
        $("#costCodeId").removeClass("primarybt2enable");  
        $("#nodeId").removeClass("primarybt2enable");
       //  $("#accountId").addClass("primarybt2enable");
     //    $("#accountId").removeClass("primarybt2disable");
    }else{
        $('#nodeId').attr('disabled',"false");
        $('#costCodeId').attr('disabled',"false");
        $("#costCodeId").removeClass("primarybt2disable");
        $("#costCodeId").addClass("primarybt2enable");  
        $("#nodeId").removeClass("primarybt2disable"); 
        $("#nodeId").addClass("primarybt2enable");
     //   $("#accountId").removeClass("primarybt2enable");
       //  $("#accountId").addClass("primarybt2disable");
    }
    var node = {};
    var selectedId = dataItem.CC_ID;
    node.CC_ID = selectedId;
    node.CC_NAME = dataItem.CC_NAME;
    node.CC_TYPE = dataItem.CC_TYPE;
    //alert('selectedId :'+selectedId+' Cost center name :'+node.CC_NAME);
    if (!expandFlag) {
        if(dataItem.CC_TYPE==2){
            loadCostCenterAccnts(selectedId);
        }else
        {
            $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
        }
    }else
    {
         $("#costCenterAccntGrid").data("kendoGrid").dataSource.data([]);
    }


    setSelectedNode(node);
    uncheckOtherNodes(selectedId,treeview);

}




function checkedNodeIds(nodes, selectedId) {
            try{
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.checked && node.CC_ID != selectedId) {
                    node.set('checked', false);
                }

                if (nodes[i].hasChildren) {
                    checkedNodeIds(nodes[i].children.view(), selectedId);
                }
            }
        }catch(e){
            alert(e);
        }
        }

        
       



function uncheckOtherNodes(selectedId, treeObj) {
    try {
          checkedNodeIds(treeObj.dataSource.view(), selectedId);
          
    } catch (e) {
        alert(e);
    }
}


function onExpand(e){
    
    var dataItem = this.dataItem(e.node);
    onCheckNode(e,true);
    if (!dataItem.isExpand && !dataItem._loaded) {
     var selectedId = this.dataItem(e.node).CC_ID;
     var reqData = {};
     reqData.COMPANY_ID = companyId;
     reqData.PARENT_ID = selectedId;
     //reqData.PARENT_ID = selectedId;
     var treeview = $("#treeview").getKendoTreeView();
     rootUid = $(e.node).closest("li").data("uid");
     procesRequest("loadCCData.action", reqData, nodesLoadedSuccess, nodesLoadedFail);
 }
}

function nodesLoadedSuccess(resp){
    var treeData = [];
    // alert(resp);
    try {
        resp = JSON.parse(resp);
        if (resp.objCRSResponse.success) {
            treeData = resp.objCRSResponse.data;
        }
       
        var treeview = $("#treeview").getKendoTreeView();
        //for(var i=0;i<treeData.length;i++){
        fnPrepareCostCenterData(treeData)
        
        treeview.append(treeData,treeview.findByUid(rootUid));
        //
       // }
    } catch (e) {
        alert(e);
    }
}

function nodesLoadedFail(){
    
}

