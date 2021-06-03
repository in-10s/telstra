

//var sampleData1 = [
//    {ccId: 1, Name: "Anz", Budget: "79,550.00", Spend: "79,364.00", ReportsTo: null},
//    /*{ccId: 2, Name: "Australia",  Budget: "26,100.00",Spend:"26,455.00", ReportsTo: 1},
//     {ccId: 21, Name: "Western Australia", Budget: "7,850.00",Spend:"7,936.00", ReportsTo: 2},*/
//    {ccId: 211, Name: "102376539", Budget: "3,950.00", Spend: "3,968.00", ReportsTo: 1},
//    {ccId: 2111, Name: "Marketing", Budget: "700.00", Spend: "714.00", ReportsTo: 211},
//    {ccId: 21111, Name: "Jack 2056543602", Budget: "150.00", Spend: "164.00", ReportsTo: 2111},
//    {ccId: 21112, Name: "William 2056543318", Budget: "200.00", Spend: "200.00", ReportsTo: 2111},
//    {ccId: 21113, Name: "Noah 2056546151", Budget: "150.00", Spend: "121.00", ReportsTo: 2111},
//    {ccId: 21114, Name: "Ethan 2056547483", Budget: "200.00", Spend: "229.00", ReportsTo: 2111},
//    {ccId: 2112, Name: "Sales", Budget: "1,200.00", Spend: "1,190.00", ReportsTo: 211},
//    {ccId: 21121, Name: "Oliver 2056547643", Budget: "600.00", Spend: "607.00", ReportsTo: 2112},
//    {ccId: 21122, Name: "Thomas 2056547301", Budget: "600.00", Spend: "583.00", ReportsTo: 2112},
//    {ccId: 2113, Name: "HR", Budget: "1,400.00", Spend: "1,389.00", ReportsTo: 211},
//    {ccId: 21131, Name: "Cooper 2056548434", Budget: "300.00", Spend: "319.00", ReportsTo: 2113},
//    {ccId: 21132, Name: "James 2056548394", Budget: "400.00", Spend: "389.00", ReportsTo: 2113},
//    {ccId: 21133, Name: "Lucas 2056540923", Budget: "200.00", Spend: "236.00", ReportsTo: 2113},
//    {ccId: 21134, Name: "Ruby 2056546531", Budget: "500.00", Spend: "444.00", ReportsTo: 2113},
//    {ccId: 2114, Name: "Finance", Budget: "650.00", Spend: "675.00", ReportsTo: 211},
//    {ccId: 21141, Name: "Olivia 2056543277", Budget: "150.00", Spend: "155.00", ReportsTo: 2114},
//    {ccId: 21142, Name: "Chloe 2056548439", Budget: "200.00", Spend: "189.00", ReportsTo: 2114},
//    {ccId: 21143, Name: "Tyler 2056541175", Budget: "100.00", Spend: "115.00", ReportsTo: 2114},
//    {ccId: 21144, Name: "Ryan 2056545731", Budget: "200.00", Spend: "216.00", ReportsTo: 2114},
//    {ccId: 212, Name: "102376542", Budget: "3,900.00", Spend: "3,968.00", ReportsTo: 1},
//    {ccId: 2121, Name: "Marketing", Budget: "700.00", Spend: "714.00", ReportsTo: 212},
//    {ccId: 21211, Name: "Zoe 2056548464", Budget: "150.00", Spend: "164.00", ReportsTo: 2121},
//    {ccId: 21212, Name: "Isla 2056549483", Budget: "200.00", Spend: "200.00", ReportsTo: 2121},
//    {ccId: 21213, Name: "Lucy 2056543127", Budget: "150.00", Spend: "121.00", ReportsTo: 2121},
//    {ccId: 21214, Name: "Oscar 2056546534", Budget: "200.00", Spend: "229.00", ReportsTo: 2121},
//    {ccId: 2122, Name: "Sales", Budget: "1,250.00", Spend: "1,270.00", ReportsTo: 212},
//    {ccId: 21221, Name: "Daniel 2056546412", Budget: "600.00", Spend: "648.00", ReportsTo: 2122},
//    {ccId: 21222, Name: "Logan 2056544550", Budget: "650.00", Spend: "622.00", ReportsTo: 2122},
//    {ccId: 2123, Name: "HR", Budget: "1,150.00", Spend: "1,190.00", ReportsTo: 212},
//    {ccId: 21231, Name: "Jake 2056543217", Budget: "300.00", Spend: "274.00", ReportsTo: 2123},
//    {ccId: 21232, Name: "Harper 2056545490", Budget: "300.00", Spend: "333.00", ReportsTo: 2123},
//    {ccId: 21233, Name: "Alice 2056543781", Budget: "200.00", Spend: "202.00", ReportsTo: 2123},
//    {ccId: 21234, Name: "Mitchell 2056544761", Budget: "350.00", Spend: "381.00", ReportsTo: 2123},
//    {ccId: 2124, Name: "Finance", Budget: "800.00", Spend: "794.00", ReportsTo: 212},
//    {ccId: 21241, Name: "Levi 2056544124", Budget: "400.00", Spend: "405.00", ReportsTo: 2124},
//    {ccId: 21242, Name: "Ivy 2056544642", Budget: "150.00", Spend: "135.00", ReportsTo: 2124},
//    {ccId: 21243, Name: "Maddison 2056345634", Budget: "250.00", Spend: "254.00", ReportsTo: 2124},
//    /*{ccId: 22, Name: "New South Wales", Budget: "10,050.00",Spend:"10,053.00", ReportsTo: 2},*/
//    {ccId: 221, Name: "212376539", Budget: "5,300.00", Spend: "5,227.00", ReportsTo: 1},
//    {ccId: 2211, Name: "Marketing", Budget: "1,000.00", Spend: "941.00", ReportsTo: 221},
//    {ccId: 22111, Name: "Charlie 2056554335", Budget: "200.00", Spend: "216.00", ReportsTo: 2211},
//    {ccId: 22112, Name: "Max 2056577773", Budget: "300.00", Spend: "263.00", ReportsTo: 2211},
//    {ccId: 22113, Name: "Hunter 2056543343", Budget: "150.00", Spend: "160.00", ReportsTo: 2211},
//    {ccId: 22114, Name: "Scarlett 2056541238", Budget: "350.00", Spend: "301.00", ReportsTo: 2211},
//    {ccId: 2212, Name: "Sales", Budget: "1,600.00", Spend: "1,568.00", ReportsTo: 221},
//    {ccId: 22121, Name: "Daniel 2056343237", Budget: "800.00", Spend: "800.00", ReportsTo: 2212},
//    {ccId: 22122, Name: "Jayden 2056543436", Budget: "800.00", Spend: "768.00", ReportsTo: 2212},
//    {ccId: 2213, Name: "HR", Budget: "1,800.00", Spend: "1,830.00", ReportsTo: 221},
//    {ccId: 22131, Name: "Logan 2056544555", Budget: "400.00", Spend: "421.00", ReportsTo: 2213},
//    {ccId: 22132, Name: "Sebastian 2056543434", Budget: "500.00", Spend: "512.00", ReportsTo: 2213},
//    {ccId: 22133, Name: "Alice 2056544761", Budget: "300.00", Spend: "311.00", ReportsTo: 2213},
//    {ccId: 22134, Name: "Willow 2056544544", Budget: "600.00", Spend: "585.00", ReportsTo: 2213},
//    {ccId: 2214, Name: "Finance", Budget: "900.00", Spend: "889.00", ReportsTo: 221},
//    {ccId: 22141, Name: "Imogen 2056544785", Budget: "200.00", Spend: "204.00", ReportsTo: 2214},
//    {ccId: 22142, Name: "Aiden 2056549889", Budget: "250.00", Spend: "249.00", ReportsTo: 2214},
//    {ccId: 22143, Name: "Matthew 2056532232", Budget: "150.00", Spend: "151.00", ReportsTo: 2214},
//    {ccId: 22144, Name: "Connor 2056554333", Budget: "300.00", Spend: "284.00", ReportsTo: 2214},
//    {ccId: 222, Name: "212376539", Budget: "4,750.00", Spend: "4,825.00", ReportsTo: 1},
//    {ccId: 2221, Name: "Marketing", Budget: "850.00", Spend: "869.00", ReportsTo: 222},
//    {ccId: 22211, Name: "Hudson 2056543390", Budget: "150.00", Spend: "200.00", ReportsTo: 2221},
//    {ccId: 22212, Name: "Alice 2050987565", Budget: "250.00", Spend: "243.00", ReportsTo: 2221},
//    {ccId: 22213, Name: "Willow 2050241572", Budget: "150.00", Spend: "148.00", ReportsTo: 2221},
//    {ccId: 22214, Name: "Georgia 2050754842", Budget: "300.00", Spend: "278.00", ReportsTo: 2221},
//    {ccId: 2222, Name: "Sales", Budget: "1,550.00", Spend: "1,544.00", ReportsTo: 222},
//    {ccId: 22221, Name: "Patrick 2050241800", Budget: "750.00", Spend: "787.00", ReportsTo: 2222},
//    {ccId: 22222, Name: "Hudson 2050754912", Budget: "800.00", Spend: "757.00", ReportsTo: 2222},
//    {ccId: 2223, Name: "HR", Budget: "1,450.00", Spend: "1,448.00", ReportsTo: 222},
//    {ccId: 22231, Name: "Daniel 2052415752", Budget: "350.00", Spend: "333.00", ReportsTo: 2223},
//    {ccId: 22232, Name: "Eli 2057548412", Budget: "400.00", Spend: "405.00", ReportsTo: 2223},
//    {ccId: 22233, Name: "Henry 2024157577", Budget: "200.00", Spend: "246.00", ReportsTo: 2223},
//    {ccId: 22234, Name: "Jessica 2075484165", Budget: "500.00", Spend: "463.00", ReportsTo: 2223},
//    {ccId: 2224, Name: "Finance", Budget: "900.00", Spend: "965.00", ReportsTo: 222},
//    {ccId: 22241, Name: "Layla 2075484334", Budget: "400.00", Spend: "386.00", ReportsTo: 2224},
//    {ccId: 22242, Name: "Braxton 2075484333", Budget: "250.00", Spend: "270.00", ReportsTo: 2224},
//    {ccId: 22243, Name: "Lilly 2075484334", Budget: "250.00", Spend: "309.00", ReportsTo: 2224},
//    /*	{ccId: 23, Name: "Victoria", Budget: "8,200.00", Spend:"8,465.00",ReportsTo: 2},*/
//    {ccId: 231, Name: "102376588", Budget: "4,500.00", Spend: "4,656.00", ReportsTo: 1},
//    {ccId: 2311, Name: "Marketing", Budget: "750.00", Spend: "838.00", ReportsTo: 231},
//    {ccId: 23111, Name: "Lucas 2075489988", Budget: "200.00", Spend: "193.00", ReportsTo: 2311},
//    {ccId: 23112, Name: "Lachlan 2075480988", Budget: "200.00", Spend: "235.00", ReportsTo: 2311},
//    {ccId: 23113, Name: "Mia 2075484585", Budget: "150.00", Spend: "142.00", ReportsTo: 2311},
//    {ccId: 23114, Name: "Amelia 2075489876", Budget: "200.00", Spend: "268.00", ReportsTo: 2311},
//    {ccId: 2312, Name: "Sales", Budget: "1,400.00", Spend: "1,397.00", ReportsTo: 231},
//    {ccId: 23121, Name: "Samuel 2075484165", Budget: "700.00", Spend: "712.00", ReportsTo: 2312},
//    {ccId: 23122, Name: "Jacob 2075484165", Budget: "700.00", Spend: "684.00", ReportsTo: 2312},
//    {ccId: 2313, Name: "HR", Budget: "1,650.00", Spend: "1,630.00", ReportsTo: 231},
//    {ccId: 23131, Name: "Lily 2075467889", Budget: "400.00", Spend: "375.00", ReportsTo: 2313},
//    {ccId: 23132, Name: "Grace 2075478689", Budget: "450.00", Spend: "456.00", ReportsTo: 2313},
//    {ccId: 23133, Name: "Isabella 2075487689", Budget: "300.00", Spend: "277.00", ReportsTo: 2313},
//    {ccId: 23134, Name: "Ella 2075896979", Budget: "500.00", Spend: "521.00", ReportsTo: 2313},
//    {ccId: 2314, Name: "Finance", Budget: "700.00", Spend: "792.00", ReportsTo: 231},
//    {ccId: 23141, Name: "Ivy 2075986869", Budget: "200.00", Spend: "182.00", ReportsTo: 2314},
//    {ccId: 23142, Name: "Abigail 2075489999", Budget: "200.00", Spend: "222.00", ReportsTo: 2314},
//    {ccId: 23143, Name: "Chelsea 2078898965", Budget: "100.00", Spend: "135.00", ReportsTo: 2314},
//    {ccId: 23143, Name: "Jessica 207898899", Budget: "200.00", Spend: "253.00", ReportsTo: 2314},
//    {ccId: 232, Name: "102376779", Budget: "3,700.00", Spend: "3,809.00", ReportsTo: 1},
//    {ccId: 2321, Name: "Marketing", Budget: "650.00", Spend: "686.00", ReportsTo: 232},
//    {ccId: 23211, Name: "Flynn 2078987655", Budget: "200.00", Spend: "158.00", ReportsTo: 2321},
//    {ccId: 23212, Name: "Sebastian 2078985675", Budget: "150.00", Spend: "192.00", ReportsTo: 2321},
//    {ccId: 23213, Name: "Logan 2078912365", Budget: "150.00", Spend: "117.00", ReportsTo: 2321},
//    {ccId: 23214, Name: "Jaxon 2078989433", Budget: "150.00", Spend: "219.00", ReportsTo: 2321},
//    {ccId: 2322, Name: "Sales", Budget: "1150", Spend: "1219.00", ReportsTo: 232},
//    {ccId: 23221, Name: "Jayden 2078925425", Budget: "600.00", Spend: "622.00", ReportsTo: 2322},
//    {ccId: 23222, Name: "Henry 2078982455", Budget: "550.00", Spend: "597.00", ReportsTo: 2322},
//    {ccId: 2323, Name: "HR", Budget: "1,100.00", Spend: "1,143.00", ReportsTo: 232},
//    {ccId: 23231, Name: "Braxton 2078912233", Budget: "250.00", Spend: "263.00", ReportsTo: 2323},
//    {ccId: 23232, Name: "Blake 2078986545", Budget: "350.00", Spend: "320.00", ReportsTo: 2323},
//    {ccId: 23233, Name: "Jackson 2078989870", Budget: "150.00", Spend: "194.00", ReportsTo: 2323},
//    {ccId: 23234, Name: "Archie 2078989989", Budget: "350.00", Spend: "366.00", ReportsTo: 2323},
//    {ccId: 2324, Name: "Finance", Budget: "800.00", Spend: "762.00", ReportsTo: 232},
//    {ccId: 23241, Name: "Elijah 2079898989", Budget: "200.00", Spend: "175.00", ReportsTo: 2324},
//    {ccId: 23242, Name: "Logan 2078989165", Budget: "350.00", Spend: "343.00", ReportsTo: 2324},
//    {ccId: 23243, Name: "Riley 2078989805", Budget: "250.00", Spend: "244.00", ReportsTo: 2324},
//    /*	{ccId: 3, Name: "New Zealand",  Budget: "27,950.00",Spend:"27,609.00", ReportsTo: 1},	
//     {ccId: 31, Name: "West Coast", Budget: "13,200.00",Spend:"13,259.00", ReportsTo: 3},*/
//    {ccId: 311, Name: "102376679", Budget: "7,100.00", Spend: "6,950.00", ReportsTo: 1},
//    {ccId: 3111, Name: "Marketing", Budget: "300.00", Spend: "200.00", ReportsTo: 311},
//    {ccId: 31111, Name: "George 2078957588", Budget: "500.00", Spend: "450.00", ReportsTo: 3111},
//    {ccId: 31112, Name: "Sebastian 2078980068", Budget: "500.00", Spend: "600.00", ReportsTo: 3111},
//    {ccId: 31113, Name: "Daniel 2078907860", Budget: "300.00", Spend: "200.00", ReportsTo: 3111},
//    {ccId: 31114, Name: "Archer 2078976986", Budget: "700.00", Spend: "700.00", ReportsTo: 3111},
//    {ccId: 3112, Name: "Sales", Budget: "700.00", Spend: "700.00", ReportsTo: 311},
//    {ccId: 31121, Name: "Patrick 2078996796", Budget: "650.00", Spend: "600.00", ReportsTo: 3112},
//    {ccId: 31122, Name: "Tyler 2078968699", Budget: "350.00", Spend: "400.00", ReportsTo: 3112},
//    {ccId: 3113, Name: "HR", Budget: "300.00", Spend: "200.00", ReportsTo: 311},
//    {ccId: 31131, Name: "Nate 2078697969", Budget: "650.00", Spend: "600.00", ReportsTo: 3113},
//    {ccId: 31132, Name: "Jayden 2078976796", Budget: "350.00", Spend: "400.00", ReportsTo: 3113},
//    {ccId: 31133, Name: "Lincoln 2078986969", Budget: "650.00", Spend: "600.00", ReportsTo: 3113},
//    {ccId: 31134, Name: "Micheal 2078969699", Budget: "350.00", Spend: "400.00", ReportsTo: 3113},
//    {ccId: 3114, Name: "Finance", Budget: "700.00", Spend: "700.00", ReportsTo: 311},
//    {ccId: 31141, Name: "Harvey 2078907077", Budget: "650.00", Spend: "600.00", ReportsTo: 3114},
//    {ccId: 31142, Name: "Matthew 2078709709", Budget: "350.00", Spend: "400.00", ReportsTo: 3114},
//    {ccId: 31143, Name: "Luke 2078707900", Budget: "650.00", Spend: "600.00", ReportsTo: 3114},
//    {ccId: 31144, Name: "Blake 2070790790", Budget: "350.00", Spend: "400.00", ReportsTo: 3114},
//    /*	{ccId: 32, Name: "Wellington", Budget: "14,750.00",Spend:"14,691.00", ReportsTo: 3},*/
//    {ccId: 321, Name: "102377877", Budget: "7,400.00", Spend: "7,550.00", ReportsTo: 1},
//    {ccId: 3211, Name: "Marketing", Budget: "300.00", Spend: "200.00", ReportsTo: 321},
//    {ccId: 32111, Name: "Dylan 2078970970", Budget: "500.00", Spend: "450.00", ReportsTo: 3211},
//    {ccId: 32112, Name: "Joseph 2078987097", Budget: "500.00", Spend: "600.00", ReportsTo: 3211},
//    {ccId: 32113, Name: "Beau 2078790797", Budget: "300.00", Spend: "200.00", ReportsTo: 3211},
//    {ccId: 32114, Name: "Austin 2078070700", Budget: "700.00", Spend: "700.00", ReportsTo: 3211},
//    {ccId: 3212, Name: "Sales", Budget: "700.00", Spend: "700.00", ReportsTo: 321},
//    {ccId: 32121, Name: "Ashton 2078097907", Budget: "650.00", Spend: "600.00", ReportsTo: 3212},
//    {ccId: 32122, Name: "Angus 2078709870", Budget: "350.00", Spend: "400.00", ReportsTo: 3212},
//    {ccId: 3213, Name: "HR", Budget: "300.00", Spend: "200.00", ReportsTo: 321},
//    {ccId: 32131, Name: "Chase 2078343665", Budget: "650.00", Spend: "600.00", ReportsTo: 3213},
//    {ccId: 32132, Name: "Theodore 2078986365", Budget: "350.00", Spend: "400.00", ReportsTo: 3213},
//    {ccId: 32133, Name: "Jordan 2078983454", Budget: "650.00", Spend: "600.00", ReportsTo: 3213},
//    {ccId: 32134, Name: "Zachary 2078989169", Budget: "350.00", Spend: "400.00", ReportsTo: 3213},
//    {ccId: 322, Name: "102376797", Budget: "5,600.00", Spend: "5,550.00", ReportsTo: 1},
//    {ccId: 3221, Name: "Marketing", Budget: "300.00", Spend: "200.00", ReportsTo: 322},
//    {ccId: 32111, Name: "Dylan 2078970970", Budget: "500.00", Spend: "450.00", ReportsTo: 3221},
//    {ccId: 32112, Name: "Joseph 2078987097", Budget: "500.00", Spend: "600.00", ReportsTo: 3221},
//    {ccId: 32113, Name: "Beau 2078790797", Budget: "300.00", Spend: "200.00", ReportsTo: 3221},
//    {ccId: 32114, Name: "Austin 2078070700", Budget: "700.00", Spend: "700.00", ReportsTo: 3221},
//    {ccId: 3222, Name: "Sales", Budget: "700.00", Spend: "700.00", ReportsTo: 322},
//    {ccId: 32121, Name: "Ashton 2078097907", Budget: "650.00", Spend: "600.00", ReportsTo: 3222},
//    {ccId: 32122, Name: "Angus 2078709870", Budget: "350.00", Spend: "400.00", ReportsTo: 3222},
//    {ccId: 3223, Name: "HR", Budget: "300.00", Spend: "200.00", ReportsTo: 322},
//    {ccId: 32131, Name: "Chase 2078343665", Budget: "650.00", Spend: "600.00", ReportsTo: 3223},
//    {ccId: 32132, Name: "Theodore 2078986365", Budget: "350.00", Spend: "400.00", ReportsTo: 3223},
//    {ccId: 32133, Name: "Jordan 2078983454", Budget: "650.00", Spend: "600.00", ReportsTo: 3223},
//    {ccId: 32134, Name: "Zachary 2078989169", Budget: "350.00", Spend: "400.00", ReportsTo: 3223},
//    {ccId: 323, Name: "1023767112", Budget: "4,100.00", Spend: "4,050.00", ReportsTo: 1},
//    {ccId: 3221, Name: "Marketing", Budget: "300.00", Spend: "200.00", ReportsTo: 323},
//    {ccId: 32111, Name: "Dylan 2078970970", Budget: "500.00", Spend: "450.00", ReportsTo: 3221},
//    {ccId: 32112, Name: "Joseph 2078987097", Budget: "500.00", Spend: "600.00", ReportsTo: 3221},
//    {ccId: 32113, Name: "Beau 2078790797", Budget: "300.00", Spend: "200.00", ReportsTo: 3221},
//    {ccId: 32114, Name: "Austin 2078070700", Budget: "700.00", Spend: "700.00", ReportsTo: 3221},
//    {ccId: 3222, Name: "Sales", Budget: "700.00", Spend: "700.00", ReportsTo: 323},
//    {ccId: 32121, Name: "Ashton 2078097907", Budget: "650.00", Spend: "600.00", ReportsTo: 3222},
//    {ccId: 32122, Name: "Angus 2078709870", Budget: "350.00", Spend: "400.00", ReportsTo: 3222},
//    {ccId: 3223, Name: "HR", Budget: "300.00", Spend: "200.00", ReportsTo: 323},
//    {ccId: 32131, Name: "Chase 2078343665", Budget: "650.00", Spend: "600.00", ReportsTo: 3223},
//    {ccId: 32132, Name: "Theodore 2078986365", Budget: "350.00", Spend: "400.00", ReportsTo: 3223},
//    {ccId: 32133, Name: "Jordan 2078983454", Budget: "650.00", Spend: "600.00", ReportsTo: 3223},
//    {ccId: 32134, Name: "Zachary 2078989169", Budget: "350.00", Spend: "400.00", ReportsTo: 3223},
//    {ccId: 324, Name: "1023767143", Budget: "4,100.00", Spend: "4,050.00", ReportsTo: 1},
//    {ccId: 3221, Name: "Marketing", Budget: "300.00", Spend: "200.00", ReportsTo: 324},
//    {ccId: 32111, Name: "Dylan 2078970970", Budget: "500.00", Spend: "450.00", ReportsTo: 3221},
//    {ccId: 32112, Name: "Joseph 2078987097", Budget: "500.00", Spend: "600.00", ReportsTo: 3221},
//    {ccId: 32113, Name: "Beau 2078790797", Budget: "300.00", Spend: "200.00", ReportsTo: 3221},
//    {ccId: 32114, Name: "Austin 2078070700", Budget: "700.00", Spend: "700.00", ReportsTo: 3221},
//    {ccId: 3222, Name: "Sales", Budget: "700.00", Spend: "700.00", ReportsTo: 324},
//    {ccId: 32121, Name: "Ashton 2078097907", Budget: "650.00", Spend: "600.00", ReportsTo: 3222},
//    {ccId: 32122, Name: "Angus 2078709870", Budget: "350.00", Spend: "400.00", ReportsTo: 3222},
//    {ccId: 3223, Name: "HR", Budget: "300.00", Spend: "200.00", ReportsTo: 324},
//    {ccId: 32131, Name: "Chase 2078343665", Budget: "650.00", Spend: "600.00", ReportsTo: 3223},
//    {ccId: 32132, Name: "Theodore 2078986365", Budget: "350.00", Spend: "400.00", ReportsTo: 3223},
//    {ccId: 32133, Name: "Jordan 2078983454", Budget: "650.00", Spend: "600.00", ReportsTo: 3223},
//    {ccId: 32134, Name: "Zachary 2078989169", Budget: "350.00", Spend: "400.00", ReportsTo: 3223},
//    /*{ccId: 4, Name: "China",  Budget: "25,500.00",Spend:"25,300.00", ReportsTo: 1},				
//     {ccId: 41, Name: "Qinghai",  Budget: "15,000.00",Spend:"14,000.00", ReportsTo: 4},
//     {ccId: 42, Name: "Heilongjiang",  Budget: "10,500.00", Spend:"11,300.00",ReportsTo: 4},*/
//];

var sampleData1 = "";
var sampleDataNextID = sampleData1.length + 1;

function getIndexById(id) {

    var idx,
            l = sampleData1.length;


    for (var j; j < l; j++) {
        if (sampleData1[j].ProductID == id) {
            return j;
        }
    }

    return null;


}
var onDataBound = function () {
    $('tr').each(function () {

        did = $(this).find("td:eq(2)").text();
        sid = $(this).find("td:eq(1)").text();
        //alert(did+"  "+sid);
        //alert($(this).find("td:last-child").html());
        if (sid > did)
        {
            //alert(did);
            $($(this).find("td:eq(2)")).css("color", "#A7D163");
        }
        else if (sid < did) {
            $($(this).find("td:eq(2)")).css("color", "#ED561B");

        }
        else
        {
            $($(this).find("td:eq(2)")).css("color", "black");
        }
    });



};

var accounttree = "";
$(document).ready(function () {

    loadAccountBaseData();

});

function loadAccountBaseData() {
    var selMonth = $("#hierarchy_month_combo_id").val();
    var reqData = {};
    reqData.selMonth = selMonth;
    procesRequest("fetchHierarchyAccountBase.action", reqData, fnfetchAccountbasesucc, fnfetchAccountbaseFail, false);
}

function fnfetchAccountbasesucc(response) {
    console.log(response);
    var res = JSON.parse(response);
    var status = res.objCRSResponse.status;
    if (res.objCRSResponse.success == true) {
        var accountdata = res.objCRSResponse.data;
        sampleData1 = res.objCRSResponse.data;
        for (var i = 0; i < sampleData1.length; i++) {
            if (sampleData1[i].ReportsTo == "") {
                sampleData1[i].ReportsTo = null;
            }
        }
        accountbasetree();

    } else {
        showMessage("Error", "Unable to fetch Account base details.", 2);
    }
}

function fnfetchAccountbaseFail(response) {
}

function accountbasetree() {
//    sampleData1 = [{"ccId": "169", "Name": "333444", "ReportsTo": 171, "Budget": ""}, {"ccId": "170", "Name": "lo", "ReportsTo": 171, "Budget": ""}, {"ccId": "166", "Name": "INDIA", "ReportsTo": "", "Budget": ""}, {"ccId": "168", "Name": "HYD", "ReportsTo": 167, "Budget": ""}, {"ccId": "169", "Name": "1201212", "ReportsTo": 168, "Budget": ""}, {"ccId": "170", "Name": "uk", "ReportsTo": "", "Budget": ""}, {"ccId": "171", "Name": "london", "ReportsTo": 170, "Budget": ""}, {"ccId": "172", "Name": "222344", "ReportsTo": 171, "Budget": ""}, {"ccId": "167", "Name": "AP", "ReportsTo": 166, "Budget": ""}]
    $("#treelist2").kendoTreeList({
        dataBound: onDataBound,
        dataSource: {
            transport: {
                read: function (e) {
                    console.log("read");
                    console.log(sampleData1);
                    e.success(sampleData1);
                },
                create: function (e) {
                    e.data.ProductID = sampleDataNextID++;
                    sampleData1.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    sampleData1[getIndexById(e.data.ProductID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    sampleData1.splice(getIndexById(e.data.ProductID), 1);
                    e.success();
                }
            },
            error: function (e) {
                // handle data operation error
                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
            },
            schema: {
                model: {
                    id: "ccId",
                    fields: {
                        parentId: {field: "ReportsTo", nullable: true},
                        ccId: {field: "ccId", type: "number"},
                        //Extension: { field: "Extension", type: "number" }
                    },
                    expanded: false
                }
            }
        },
        height: 350,
        filterable: true,
        sortable: true,
        columns: [
            {field: "Name", title: "Name", encoded: false, template: $("#checkbox_template").html(), width: 420},
            //{ field: "Manager", title: "Manager", width: 190},
            {field: "Budget", title: "Budget Allocated", width: 100, template: "<div class='ra'>#= Budget #</div>"}
//            {field: "Spend", title: "Spend", width: 100, template: "<div class='ra'>#= Spend #</div>"}


        ]

    });
}


