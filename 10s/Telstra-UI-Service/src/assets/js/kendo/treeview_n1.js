 $("#treeview").kendoTreeView({
            checkboxes: {
                checkChildren: true
            },

            check: onCheck,

       dataSource: [
                    {
                        id: 2, text: "138 Student Living Jamaica Ltd", expanded: true, items: [
                            { id: 3, text: "Department1", expanded: true, items: [
								{ id: 7, text: "8700700191", },
                            	{ id: 8, text: "8700700192",},
								{ id: 7, text: "8700700193", },
                            	{ id: 8, text: "8700700194",}
							]},
							{ id: 3, text: "Department2", expanded: true, items: [
								{ id: 7, text: "8700700195", },
                            	{ id: 8, text: "8700700196",},
								{ id: 7, text: "8700700197", },
                            	{ id: 8, text: "8700700198",}
							]},
							{ id: 3, text: "Department3", expanded: false, items: [
								{ id: 7, text: "8700700199", },
                            	{ id: 8, text: "8700700200",},
								{ id: 7, text: "8700700201", },
                            	{ id: 8, text: "8700700202",}
							]},
                            
                        ]
                    },
                    {
                        id: 2, text: "168 Wholesale", expanded: true, items: [
                            { id: 3, text: "59257456600", expanded: false, items: [
								{ id: 7, text: "8700700191", },
                            	{ id: 8, text: "8700700192",},
								{ id: 7, text: "8700700193", },
                            	{ id: 8, text: "8700700194",}
							]},
							{ id: 3, text: "59257456601", expanded: false, items: [
								{ id: 7, text: "8700700195", },
                            	{ id: 8, text: "8700700196",},
								{ id: 7, text: "8700700197", },
                            	{ id: 8, text: "8700700198",}
							]},
							{ id: 3, text: "59257456602", expanded: false, items: [
								{ id: 7, text: "8700700199", },
                            	{ id: 8, text: "8700700200",},
								{ id: 7, text: "8700700201", },
                            	{ id: 8, text: "8700700202",}
							]},
                            
                        ]
                    },                    {
                        id: 2, text: "21st Century Consultants Ltd", expanded: false, items: [
                            { id: 3, text: "59257456600", expanded: false, items: [
								{ id: 7, text: "8700700191", },
                            	{ id: 8, text: "8700700192",},
								{ id: 7, text: "8700700193", },
                            	{ id: 8, text: "8700700194",}
							]},
							{ id: 3, text: "59257456601", expanded: false, items: [
								{ id: 7, text: "8700700195", },
                            	{ id: 8, text: "8700700196",},
								{ id: 7, text: "8700700197", },
                            	{ id: 8, text: "8700700198",}
							]},
							{ id: 3, text: "59257456602", expanded: false, items: [
								{ id: 7, text: "8700700199", },
                            	{ id: 8, text: "8700700200",},
								{ id: 7, text: "8700700201", },
                            	{ id: 8, text: "8700700202",}
							]},
                            
                        ]
                    },
                    {
                        id: 2, text: "21st Century Supermarket Wholesale Ltd", expanded: false, items: [
                            { id: 3, text: "37257459400", expanded: false, items: [
								{ id: 7, text: "8700700191", },
                            	{ id: 8, text: "8700700192",},
								{ id: 7, text: "8700700193", },
                            	{ id: 8, text: "8700700194",}
							]},
							{ id: 3, text: "37257459401", expanded: false, items: [
								{ id: 7, text: "8700700195", },
                            	{ id: 8, text: "8700700196",},
								{ id: 7, text: "8700700197", },
                            	{ id: 8, text: "8700700198",}
							]},
							{ id: 3, text: "37257459402", expanded: false, items: [
								{ id: 7, text: "8700700199", },
                            	{ id: 8, text: "8700700200",},
								{ id: 7, text: "8700700201", },
                            	{ id: 8, text: "8700700202",}
							]},
                            
                        ]	
            }]
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