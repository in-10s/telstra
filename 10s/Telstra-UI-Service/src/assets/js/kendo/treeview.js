 $("#treeview").kendoTreeView({
            checkboxes: {
                checkChildren: true
            },

            check: onCheck,
            
                        dataTextField: ["COMPANY_NAME"],
                        schema: {
                        model: {
                            children: "items"
                        }
                    }
       
       
       
       
        });

        

// show checked node IDs on datasource change
function onCheck(e) {
    var selectNodeId = this.dataItem(e.node).COMPANY_ID;
    var treeview = $("#treeview").data("kendoTreeView");
    uncheckOtherNodes(selectNodeId, treeview);// unchecking other nodes(at a time only one node)
    movingCompnyNode = selectNodeId;

}

        
