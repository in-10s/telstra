

/* Top Stats Show Hide */
$(document).ready(function(){
    $("#topstats").click(function(){
        $(".topstats").slideToggle(100);
    });
});


/* Sidepanel Show-Hide */
$(document).ready(function(){
    $(".sidepanel-open-button").click(function(){
        $(".sidepanel").toggle(100);
    });
});

/* Sidebar Show-Hide On Mobile */
$(document).ready(function(){
    $(".sidebar-open-button-mobile").click(function(){
        $(".sidebar").toggle(150);
    });
});


/* Sidebar Show-Hide */
$(document).ready(function(){

    $('.sidebar-open-button').on('click', function(){
        if($('.sidebar').hasClass('hidden')){
            $('.sidebar').removeClass('hidden');
            $('.content').css({
                'marginLeft' : 250
            });  
        }else{
            $('.sidebar').addClass('hidden');
            $('.content').css({
                'marginLeft' : 0
            });    
        }
    });

});


/* ===========================================================
PANEL TOOLS
===========================================================*/
/* Minimize */
$(document).ready(function(){
  $(".panel-tools .minimise-tool").click(function(event){
  $(this).parents(".panel").find(".panel-body").slideToggle(100);

  return false;
}); 

 }); 

/* Close */
$(document).ready(function(){
  $(".panel-tools .closed-tool").click(function(event){
  $(this).parents(".panel").fadeToggle(400);

  return false;
}); 

 }); 

 /* Search */
$(document).ready(function(){
  $(".panel-tools .search-tool").click(function(event){
  $(this).parents(".panel").find(".panel-search").toggle(100);

  return false;
}); 

 }); 




/* expand */
$(document).ready(function(){

    $('.panel-tools .expand-tool').on('click', function(){
        if($(this).parents(".panel").hasClass('panel-fullsize'))
        {
            $(this).parents(".panel").removeClass('panel-fullsize');
        }
        else
        {
            $(this).parents(".panel").addClass('panel-fullsize');
 
        }
    });

});


/* ===========================================================
Widget Tools
===========================================================*/


/* Close */
$(document).ready(function(){
  $(".widget-tools .closed-tool").click(function(event){
  $(this).parents(".widget").fadeToggle(400);

  return false;
}); 

 }); 


/* expand */
$(document).ready(function(){

    $('.widget-tools .expand-tool').on('click', function(){
        if($(this).parents(".widget").hasClass('widget-fullsize'))
        {
            $(this).parents(".widget").removeClass('widget-fullsize');
        }
        else
        {
            $(this).parents(".widget").addClass('widget-fullsize');
 
        }
    });

});

/* Kode Alerts */
/* Default */
$(document).ready(function(){
  $(".kode-alert .closed").click(function(event){
  $(this).parents(".kode-alert").fadeToggle(350);

  return false;
}); 

 }); 


/* Click to close */
$(document).ready(function(){
  $(".kode-alert-click").click(function(event){
  $(this).fadeToggle(350);

  return false;
}); 

 }); 



/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Popover */
$(function () {
  $('[data-toggle="popover"]').popover()
})


/* Page Loading */
$(window).load(function() {
  $(".loading").fadeOut(750);
})



/*
 *  Description: Animation left to right
 */ 
 
	   $('#clickme').click(function() {
    var $slider = $('#div1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -600 ?
       0 : -600
    });
  });  
     $('#clickme').click(function() {
    var $slider = $('#div2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -600 ?
       0 : -600
    }); 
  });
  
  
     $('#clickme1').click(function() {
    var $slider = $('#div1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -600 ?
       0 : -600
    });
  });  
     $('#clickme1').click(function() {
    var $slider = $('#div2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -600 ?
       0 : -600
    });
  });
  
  
    
     $('#clickme2').click(function() {
    var $slider = $('#div1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -600 ?
       0 : -600
    });
  });  
     $('#clickme2').click(function() {
    var $slider = $('#div2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -600 ?
       0 : -600
    });
  });
  
  
  
     $('#clickme3').click(function() {
    var $slider = $('#div1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -600 ?
       0 : -600
    });
  });  
     $('#clickme3').click(function() {
    var $slider = $('#div2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -600 ?
       0 : -600
    });
  });
	  
     $('#clickmeleft').click(function() {
    var $slider = $('#div1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -600 ?
       0 : -600
    });
  });  
     $('#clickmeleft').click(function() {
    var $slider = $('#div2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -600 ?
       0 : -600
    });
  });
   
  
   $('#clickmeres').click(function() {
    var $slider = $('#divres1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -300 ?
       0 : -300
    });
  });  
     $('#clickmeres').click(function() {
    var $slider = $('#divres2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -300 ?
       0 : -300
    });
  });
   
  
     $('#clickmeres1').click(function() {
    var $slider = $('#divres1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -300 ?
       0 : -300
    });
  });  
     $('#clickmeres1').click(function() {
    var $slider = $('#divres2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -300 ?
       0 : -300
    });
  });
   
  
    	   
 $('#addme').click(function() {
    var $slider = $('#adddiv21');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
 
  
     $('#addme1').click(function() {
    var $slider = $('#adddiv21');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme1').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
 


   $('#addme2').click(function() {
    var $slider = $('#adddiv21');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme2').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


   $('#addme3').click(function() {
    var $slider = $('#adddiv21');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme3').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });

   $('#addme4').click(function() {
    var $slider = $('#adddiv21');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme4').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });

   $('#addme5').click(function() {
    var $slider = $('#adddiv23');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme5').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });	 

   $('#addme6').click(function() {
    var $slider = $('#adddiv23');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
   $('#addme6').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


   $('#addme7').click(function() {
    var $slider = $('#adddiv23');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme7').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


   $('#addme8').click(function() {
    var $slider = $('#adddiv23');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme8').click(function() {
    var $slider = $('#adddiv22');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });

  	   
 $('#adddata').click(function() {
    var $slider = $('#Datasources');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -236 ?
       10 : -236
    });
  });  
     $('#adddata').click(function() {
    var $slider = $('#datasource1');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -236 ?
       0 : -236
    });
  });
	 
	 
$('#adddata1').click(function() {
    var $slider = $('#Datasource3');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -236 ?
       10 : -236
    });
  });  
     $('#adddata1').click(function() {
    var $slider = $('#Datasources');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -236 ?
       0 : -236
    });
  });

	 
$('#adddata2').click(function() {
    var $slider = $('#Datasource3');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -236 ?
       0 : -236
    });
  });  
     $('#adddata2').click(function() {
    var $slider = $('#Datasources');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -236 ?
       0 : -236
    });
  });


 $('#adddata3').click(function() {
    var $slider = $('#Datasources');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -236 ?
       0 : -236
    });
  });  
     $('#adddata3').click(function() {
    var $slider = $('#datasource1');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -236 ?
       0 : -236
    });
  });

 $('#adddata4').click(function() {
    var $slider = $('#Datasources');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -236 ?
       0 : -236
    });
  });  
     $('#adddata4').click(function() {
    var $slider = $('#datasource1');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -236 ?
       0 : -236
    });
  });



   $('#addaction1').click(function() {
    var $slider = $('#actionList');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addaction1').click(function() {
    var $slider = $('#addedActions');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
	 
   $('#addActionLink').click(function() {
    var $slider = $('#actionList');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addActionLink').click(function() {
    var $slider = $('#addedActions');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


   $('#backActionLink').click(function() {
    var $slider = $('#actionList');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#backActionLink').click(function() {
    var $slider = $('#addedActions');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });

   $('#actionBack').click(function() {
    var $slider = $('#actionList');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#actionBack').click(function() {
    var $slider = $('#addedActions');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
	 
	 
	 
	  $('#addaction2').click(function() {
    var $slider = $('#actionList2');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addaction2').click(function() {
    var $slider = $('#addedActions2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
	 
   $('#addActionLink2').click(function() {
    var $slider = $('#actionList2');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addActionLink2').click(function() {
    var $slider = $('#addedActions2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


   $('#backActionLink2').click(function() {
    var $slider = $('#actionList2');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#backActionLink2').click(function() {
    var $slider = $('#addedActions2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });

   $('#actionBack2').click(function() {
    var $slider = $('#actionList2');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#actionBack2').click(function() {
    var $slider = $('#addedActions2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });