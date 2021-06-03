$("#treeview1").kendoTreeView({
    checkboxes: {
        checkChildren: true
    },
    check: oncheckNode,
    select: loadAccountData,
    dataTextField: ["COMPANY_NAME", "ACCOUNT_NAME", "CTN"],
    schema: {
        model: {
            children: "items"
        }
    }

});

function oncheckNode(e) {
    var selectNodeId = this.dataItem(e.node).COMPANY_ID;
    var treeview = $("#treeview1").data("kendoTreeView");
    uncheckOtherNodes(selectNodeId, treeview);// unchecking other nodes(at a time only one node)
    fnLoadAccounts(selectNodeId); // load accounts for this node
}

function loadAccountData(e) {
    var companyId = this.dataItem(e.node).COMPANY_ID;
    if (companyId != undefined) {
        fnLoadAccounts(companyId);
    }
}

        

        