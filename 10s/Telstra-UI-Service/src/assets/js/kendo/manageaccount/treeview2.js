 
var dataSource=[{
    id: 1, 
    text: "Cost centres", 
    expanded: true, 
    items: [

    {
        id: 2, 
        text: "London", 
        expanded: false, 
        items: [

        {
            id: 3, 
            text: "64257458811", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700191",
            },
            {
                id: 8, 
                text: "8700700192",
            },

            {
                id: 7, 
                text: "8700700193",
            },
            {
                id: 8, 
                text: "8700700194",
            }
            ]
        },

        {
            id: 3, 
            text: "64257458812", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700195",
            },
            {
                id: 8, 
                text: "8700700196",
            },

            {
                id: 7, 
                text: "8700700197",
            },
            {
                id: 8, 
                text: "8700700198",
            }
            ]
        },

        {
            id: 3, 
            text: "64257458813", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700199",
            },
            {
                id: 8, 
                text: "8700700200",
            },

            {
                id: 7, 
                text: "8700700201",
            },
            {
                id: 8, 
                text: "8700700202",
            }
            ]
        },
                            
        ]
    },
    {
        id: 2, 
        text: "Manchester", 
        expanded: false, 
        items: [

        {
            id: 3, 
            text: "59257456600", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700191",
            },
            {
                id: 8, 
                text: "8700700192",
            },

            {
                id: 7, 
                text: "8700700193",
            },
            {
                id: 8, 
                text: "8700700194",
            }
            ]
        },

        {
            id: 3, 
            text: "59257456601", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700195",
            },
            {
                id: 8, 
                text: "8700700196",
            },

            {
                id: 7, 
                text: "8700700197",
            },
            {
                id: 8, 
                text: "8700700198",
            }
            ]
        },

        {
            id: 3, 
            text: "59257456602", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700199",
            },
            {
                id: 8, 
                text: "8700700200",
            },

            {
                id: 7, 
                text: "8700700201",
            },
            {
                id: 8, 
                text: "8700700202",
            }
            ]
        },
                            
        ]
    },
    {
        id: 2, 
        text: "Oxford", 
        expanded: false, 
        items: [

        {
            id: 3, 
            text: "37257459400", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700191",
            },
            {
                id: 8, 
                text: "8700700192",
            },

            {
                id: 7, 
                text: "8700700193",
            },
            {
                id: 8, 
                text: "8700700194",
            }
            ]
        },

        {
            id: 3, 
            text: "37257459401", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700195",
            },
            {
                id: 8, 
                text: "8700700196",
            },

            {
                id: 7, 
                text: "8700700197",
            },
            {
                id: 8, 
                text: "8700700198",
            }
            ]
        },

        {
            id: 3, 
            text: "37257459402", 
            expanded: false, 
            items: [

            {
                id: 7, 
                text: "8700700199",
            },
            {
                id: 8, 
                text: "8700700200",
            },

            {
                id: 7, 
                text: "8700700201",
            },
            {
                id: 8, 
                text: "8700700202",
            }
            ]
        },
                            
        ]
    }
    ]
}];



$("#treeview").kendoTreeView({
    checkboxes: {
        checkChildren: true
    },

    check: onCheck,

    dataSource: dataSource
});

        

// show checked node IDs on datasource change
function onCheck(e) {
    console.log(e)
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
        
function AddCostCenter(type){
    var parent = new kendo.data.Node({
        text: "Parent"
    });
    parent.append({
        text: "Child"
    });
    if(type==0){
                
              
        var ob={};
        ob.id=1
        ob.text=  document.getElementById('costcenter').value
        ob.expanded= true;
        dataSource[0].items.push(ob);
        var treeview = $("#treeview").data("kendoTreeView");

        treeview.setDataSource(new kendo.data.HierarchicalDataSource({
            data: dataSource
        }));
    }else if(type==1){
        
        var ob={};
        ob.id=1
        ob.text=  document.getElementById('costcode').value
        ob.expanded= true;
        dataSource[0].items[0].items.push(ob);
        var treeview = $("#treeview").data("kendoTreeView");

        treeview.setDataSource(new kendo.data.HierarchicalDataSource({
            data: dataSource
        }));
    }else{
        
        var ob={};
        ob.id=1
        ob.text= "64257458811"
        ob.expanded= true;
        dataSource[0].items[0].items[0].items.push(ob);
        ob={};
        ob.id=1
        ob.text= "64257458812"
        ob.expanded= true;
        dataSource[0].items[0].items[0].items.push(ob);
        var treeview = $("#treeview").data("kendoTreeView");

        treeview.setDataSource(new kendo.data.HierarchicalDataSource({
            data: dataSource
        }));
                
        
    }
            
                        
}