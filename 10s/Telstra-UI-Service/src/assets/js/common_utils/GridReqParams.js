function prepareGridParams(GridParams,id)
{
    // alert('GridParms::'+GridParams.toSource());
    var grid = $("#"+id).data("kendoGrid")   
    var daSource = $("#"+id).data("kendoGrid").dataSource;
    var groups = daSource.group();
    if(groups.length >2)
    {
        groups.splice(0,2) ;
    }
    var page=GridParams.page;
    var pageSize=GridParams.pageSize;
    var nStart;
    var serverParams={};
    var reqInput={};
    var params=GridParams.inputs;
    var nEnd =page*pageSize;
    if(page == 1)
    {
        nStart=0;
        nEnd = (page*pageSize);
    }else{
        nStart = (page*pageSize)-9;
    }    
    reqInput.filterChanged =false;
    reqInput.groupChanged =false;
    reqInput.sortChanged =false;
    reqInput.Sort=[];
    reqInput.Group=[];
    reqInput.Filters=[];
    if(GridParams.sort!= undefined && GridParams.sort.length>0)
    { 
        // alert(' GridParams.sort::'+ GridParams.toSource());
        var jsArySort=[];
        var jsObjsort={};
        for(var i=0;i<GridParams.sort.length;i++)
        {
            jsObjsort.SortBy = GridParams.sort[0].field;
            //jsObjsort.direction = GridParams.sort[0].dir;
            if(GridParams.sort[0].dir == 'asc')
            {
                jsObjsort.direction = 'ASC';
            }else{
                jsObjsort.direction = 'DESC';
            }
//            jsObjsort.SortByDatatype = getColumnType(grid,GridParams.sort[0].field);
  if(getColumnType(grid,GridParams.sort[0].field)=="numeric"){
                jsObjsort.SortByDatatype = "float";
            }else{
             jsObjsort.SortByDatatype = getColumnType(grid,GridParams.sort[0].field);
            }
            jsArySort.push(jsObjsort);
        }
        //alert('JSAry sort::'+jsArySort.toSource());
        reqInput.Sort= jsArySort;
        reqInput.sortChanged =true;
    }
    if(GridParams.group!= undefined && GridParams.group.length>0)
    {
       // alert('in groups::');
        var tmpGrup = GridParams.group;
        if (tmpGrup.length > 2)
        {
            tmpGrup.splice(0, 2);
        }
        reqInput.Group = getGroups(grid, tmpGrup);
        reqInput.groupChanged = true;
    }
    if(GridParams.filter!= undefined)
    {
        //alert('in filters::')
        reqInput.Filters=getFilters(grid, GridParams.filter);
        reqInput.filterChanged =true;
    }    
    reqInput.name="";
    reqInput.url="",
    reqInput.input="";    
    reqInput.Start=nStart;
    reqInput.End=nEnd;
    reqInput.CacheLimit=-1;
    reqInput.RandomNumber=randomNumber;
    serverParams.Start=nStart;
    serverParams.End = nEnd;
    serverParams.UserId = "red";
    serverParams.RandomNumber=randomNumber;
    serverParams.CacheLimit = "-1";
    
    serverParams.ReportCacheId =GridParams.fileName ;
    serverParams.isCacheSet = true;
    serverParams.TotalRecords="";
    reqInput.Params = serverParams;
    // reqInput.inputs=params;
//    alert('reqInput::'+reqInput.toSource());
    return reqInput;
}
function getColumnType(grid,field){
    //alert('field:::'+field);
    var colType='string';
    // if columns doesn't have any type then returns string'
    for(var i=0;i<grid.columns.length;i++)
    {
        if(grid.columns[i].field == field)
        {
            if(grid.columns[i].type=="number")
                colType="numeric";
            else
                colType = grid.columns[i].type;
        }
    }
    return colType;
}
function getFilters(grid,fieltersObj)
{
   // alert('in call of ::getFilters')
    //Method converts kendo filter format to extjs filter format.
    var FiltersAry=[];
    if(fieltersObj.filters.length>0){       
        searchFilterflag='';
    }
    for(var i=0;i<fieltersObj.filters.length;i++)
    {
        var filterObj={};
        var operators1=[];
        var operatorsObj={};
        filterObj.operators=[];
        filterObj.key=fieltersObj.filters[i].field;
        filterObj.type=getColumnType(grid,fieltersObj.filters[i].field);
        operatorsObj.operator=getOperator(fieltersObj.filters[i].operator);
        if(filterObj.type=="date")
            operatorsObj.value=kendo.toString(new Date(fieltersObj.filters[i].value), "dd-MMM-yy");
        else
            operatorsObj.value=fieltersObj.filters[i].value;
        operators1.push(operatorsObj);
        filterObj.operators=operators1;
        FiltersAry.push(filterObj);
    }
     //alert('FiltersAry::'+FiltersAry.toSource());
    return FiltersAry;
}
function setOperator(operator){
    // alert('in get operator::');
    //conversts kendo operator with equivalent extjs operator. need to configure..
    switch(operator)
    {
        case "equals":
            return "eq";
        case "!=":
            return "neq";
        case "=":
            return "eq";
        case "<":
            return "lt";
        case ">":
            return "gt";
        case "gt":
            return "gt";
        case "lt":
            return "lt";
        case "before":
            return "before";
        case "after":
            return "after";
        case "on":
            return "on";
    }
}
function getOperator(operator){
    // alert('in get operator::');
    //conversts kendo operator with equivalent extjs operator. need to configure..
    switch(operator)
    {
        case "eq":
            return "equals";
        case "neq":
            return "neq";
        case "gt":
            return "gt";
        case "lt":
            return "lt";
        case "before":
            return "before";
        case "after":
            return "after";
        case "on":
            return "on";

                   
    }
}
function getGroups(grid,groupsObj)
{
    //converts kendo group data to extjs group data here we configured on ly single grouping
    var groupAry=[];
    var groupObj={};
    for(var i=0;i<groupsObj.length;i++)
    {
        groupObj={};
        groupObj.GroupBy = groupsObj[i].field;
        if (getColumnType(grid, groupsObj[i].field) == "numeric") {
            groupObj.GroupByDatatype = "float";
        } else {
            groupObj.GroupByDatatype = getColumnType(grid, groupsObj[i].field);
        }
        groupObj.direction = groupsObj[i].dir;
        if (groupsObj[i].dir == 'asc')
        {
            groupObj.direction  = 'ASC';
        }else{
            groupObj.direction  = 'DESC';
        }
        //groupObj.columns=[];
        groupObj.Columns=getAllColumnsAndTypes(grid);
        groupAry.push(groupObj);
    }
    return groupAry;
}
function getAllColumnsAndTypes(grid)
{
    //returns all columns fiels and type for group format .
    var columnsAry=[]
    for(var i=0;i<grid.columns.length;i++)
    {
        var tempObj={};
        tempObj.name=grid.columns[i].field;
        tempObj.type=grid.columns[i].type;
         if(grid.columns[i].type=="number"){
           tempObj.type="float";
        }
        columnsAry.push(tempObj);

    }
    //alert('columns ary::'+columnsAry.toSource());
    return columnsAry;
}