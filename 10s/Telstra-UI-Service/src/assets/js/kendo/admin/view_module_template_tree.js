 $("#treeview").kendoTreeView({
           /* checkboxes: {
                checkChildren: true
            },

            check: onCheck,*/

            dataSource: [ {
                        id: 1, text: "root", expanded: true, items: [
                        { id: 1, text: "Administration", expanded: true, items: [
								{ id: 1, text: "Module registration", },
                            	{ id: 2, text: "Module templates",},
								{ id: 3, text: "Password policies", },
                            	{ id: 4, text: "Configurations",expanded: true, items: [
									{ id: 1, text: "E-mail configurations", },
									{ id: 2, text: "SMS configurations",}
								]},								
								{ id: 5, text: "Data sources", },
                            	{ id: 6, text: "Alert manager",},
								{ id: 7, text: "Audit", }
							]},
							{ id: 2, text: "User manager", expanded: true, items: [
								{ id: 1, text: "Designations", },
                            	{ id: 2, text: "Departments",},
								{ id: 3, text: "Users", },
                            	{ id: 4, text: "Groups",},
								{ id: 5, text: "Roles", }
							]},
							{ id: 3, text: "Document management system", expanded: true, items: [
								{ id: 1, text: "Dashboard", },
                            	{ id: 2, text: "Document repository",},
								{ id: 3, text: "Templates",  expanded: true, items: [
									{ id: 1, text: "Scan templates", },
									{ id: 2, text: "Permission templates",},
									{ id: 3, text: "Zone templates", },
									{ id: 4, text: "Index templates",},
									{ id: 5, text: "Document templates", }
							]},
                            	{ id: 4, text: "Tasks",},
								{ id: 5, text: "Projects", }
							]},
							
							{ id: 2, text: "Workflow", expanded: true, items: [
								{ id: 1, text: "Workflows", },
                            	{ id: 2, text: "Categories",}
							]},
							
							{ id: 2, text: "Corpcare", expanded: true, items: [
								{ id: 1, text: "Test Link", },
                            	{ id: 2, text: "Test Link",},
								{ id: 3, text: "Test Link", },
                            	{ id: 4, text: "Test Link",}
							]},
							
							{ id: 2, text: "Reports Manager", expanded: true, items: [
								{ id: 1, text: "Database", },
                            	{ id: 2, text: "Datasources",},
								{ id: 3, text: "Reports", },
                            	{ id: 4, text: "Dashboards",}
							]},
							
							{ id: 2, text: "Analytics", expanded: true, items: [
								{ id: 1, text: "Test Link", },
                            	{ id: 2, text: "Test Link",},
								{ id: 3, text: "Test Link", },
                            	{ id: 4, text: "Test Link",}
							]},
							
							
							
							]},
						
						]
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