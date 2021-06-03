 $("#treeview1").kendoTreeView({
            checkboxes: {
                checkChildren: true
            },

            check: onCheck,

            dataSource: [ {
                        id: 1, text: "Schema1", expanded: true, items: [
                        { id: 1, text: "Sales person details", expanded: true, items: [
								{ id: 1, text: "Column1", },
                            	{ id: 2, text: "Column2",},
								{ id: 3, text: "Column3", },
                            	{ id: 4, text: "Column4",},
								{ id: 5, text: "Column5", },
                            	{ id: 6, text: "Column6",},
								{ id: 7, text: "Column7", },
                            	{ id: 8, text: "Column8",}
							]},
							{ id: 2, text: "Sales", expanded: true, items: [
								{ id: 1, text: "Column1", },
                            	{ id: 2, text: "Column2",},
								{ id: 3, text: "Column3", },
                            	{ id: 4, text: "Column4",},
								{ id: 5, text: "Column5", },
                            	{ id: 6, text: "Column6",},
								{ id: 7, text: "Column7", },
                            	{ id: 8, text: "Column8",}
							]},
							{ id: 3, text: "Product details", expanded: true, items: [
									{ id: 1, text: "Column1", },
                            	{ id: 2, text: "Column2",},
								{ id: 3, text: "Column3", },
                            	{ id: 4, text: "Column4",},
								{ id: 5, text: "Column5", },
                            	{ id: 6, text: "Column6",},
								{ id: 7, text: "Column7", },
                            	{ id: 8, text: "Column8",}
							]
            },  ]
                    },]
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