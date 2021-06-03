 $("#treeview4").kendoTreeView({
            checkboxes: {
                checkChildren: true
            },

            check: onCheck,

            dataSource: [  { id: 1, text: "Select all", expanded: true, items: [
								{ id: 1, text: "Column1", },
                            	{ id: 2, text: "Column2",},
								{ id: 3, text: "Column3", },
                            	{ id: 4, text: "Column4",},						
								{ id: 7, text: "Column7", },
                            	{ id: 8, text: "Column8",},
								{ id: 1, text: "Column9", },						
								{ id: 3, text: "Column13", },
                            	{ id: 8, text: "Column18",}
							]
            },  ,]
        });

        

        // show checked node IDs on datasource change
        function onCheck() {
            var checkedNodes = [],
                treeView = $("#treeview").data("kendoTreeView"),
                message;

            checkedNodeIds(treeView.dataSource.view(), checkedNodes);

            if (checkedNodes.length > 0) {
                message = "IDs of checked nodes: " + checkedNodes.join(",");
            } else {
                message = "No nodes checked.";
            }

            $("#result").html(message);
        }