/* Sidebar Menu*/
$(document).ready(function () {
  $('.nav > li > a').click(function(){
    if ($(this).attr('class') != 'active'){
      $('.nav li ul').slideUp();
      $(this).next().slideToggle();
      $('.nav li a').removeClass('active');
      $(this).addClass('active');
    }
  });
});

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




// Initialize Chosen

var App = function() {
 
    /* Initialization UI Code */
    var uiInit = function() {

        // Initialize Chosen
        $('.select-chosen').chosen({width: "100%"});

        // Initialize Select2
        $('.select-select2').select2();

    };

    /* Sidebar Navigation functionality */
    var handleNav = function() {
        // Get all vital links
        var allLinks        = $('.sidebar-nav a', sidebar);
        var menuLinks       = $('.sidebar-nav-menu', sidebar);
        var submenuLinks    = $('.sidebar-nav-submenu', sidebar);

        // Add ripple effect to all navigation links
        allLinks.on('click', function(e){
            var link = $(this), ripple, d, x, y;

            // Remove .animate class from all ripple elements
            sidebar.find('.sidebar-nav-ripple').removeClass('animate');

            // If the ripple element doesn't exist in this link, add it
            if(link.children('.sidebar-nav-ripple').length == 0) {
                link.prepend('<span class="sidebar-nav-ripple"></span>');
            }

            // Get the ripple element
            var ripple = link.children('.sidebar-nav-ripple');

            // If the ripple element doesn't have dimensions set them accordingly
            if(!ripple.height() && !ripple.width()) {
                d = Math.max(link.outerWidth(), link.outerHeight());
                ripple.css({height: d, width: d});
            }

            // Get coordinates for our ripple element
            x = e.pageX - link.offset().left - ripple.width()/2;
            y = e.pageY - link.offset().top - ripple.height()/2;

            // Position the ripple element and add the class .animate to it
            ripple.css({top: y + 'px', left: x + 'px'}).addClass('animate');
        });

       

        // Submenu Accordion functionality
        submenuLinks.on('click', function(e){
            var link = $(this);

            if (link.parent().hasClass('active') !== true) {
                if (link.hasClass('open')) {
                    link.removeClass('open');
                }
                else {
                    link.closest('ul').find('.sidebar-nav-submenu.open').removeClass('open');
                    link.addClass('open');
                }

                // Resize Page Content
                setTimeout(resizePageContent, 50);
            }

            return false;
        });
    };

 
 /* Datatables basic Bootstrap integration (pagination integration included under the Datatables plugin in plugins.js) */
    var dtIntegration = function() {
        $.extend(true, $.fn.dataTable.defaults, {
            "sDom": "<'row'<'col-sm-6 col-xs-5'l><'col-sm-6 col-xs-7'f>r>t<'row'<'col-sm-5 hidden-xs'i><'col-sm-7 col-xs-12 clearfix'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_",
                "sSearch": "<div class=\"input-group\">_INPUT_<span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span></div>",
                "sInfo": "<strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
                "oPaginate": {
                    "sPrevious": "",
                    "sNext": ""
                }
            }
        });
        $.extend($.fn.dataTableExt.oStdClasses, {
            "sWrapper": "dataTables_wrapper form-inline",
            "sFilterInput": "form-control",
            "sLengthSelect": "form-control"
        });
    };

    return {
        init: function() {
            uiInit(); // Initialize UI
            pageLoading(); // Initialize Page Loading
        },
        sidebar: function(mode, extra) {
            handleSidebar(mode, extra); // Handle sidebars - access functionality from everywhere
        },
        datatables: function() {
            dtIntegration(); // Datatables Bootstrap integration
        }
    };
}();

/* Initialize App when page loads */
$(function(){ App.init(); });













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
    var $slider = $('#adddiv1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
 
  
     $('#addme1').click(function() {
    var $slider = $('#adddiv1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme1').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
 
   $('#addme2').click(function() {
    var $slider = $('#adddiv1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme2').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


   $('#addme3').click(function() {
    var $slider = $('#adddiv1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme3').click(function() {

    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });

   $('#addme4').click(function() {
    var $slider = $('#adddiv1');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme4').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
	 



   $('#addme5').click(function() {
    var $slider = $('#adddiv3');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme5').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });	 

   $('#addme6').click(function() {
    var $slider = $('#adddiv3');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme6').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });



   $('#addme7').click(function() {
    var $slider = $('#adddiv3');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme7').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


   $('#addme8').click(function() {
    var $slider = $('#adddiv3');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme8').click(function() {
    var $slider = $('#adddiv2');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });
	 
	  $('#addme9').click(function() {
    var $slider = $('#adddiv01');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
	
  });  
     $('#addme9').click(function() {
    var $slider = $('#adddiv02');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });

   $('#addme10').click(function() {
    var $slider = $('#adddiv01');
    $slider.animate({
      right: parseInt($slider.css('right'),10) == -536 ?
       0 : -536
    });
  });  
     $('#addme10').click(function() {
    var $slider = $('#adddiv02');
    $slider.animate({
      left: parseInt($slider.css('left'),10) == -536 ?
       0 : -536
    });
  });


var App = function() {
 
    /* Initialization UI Code */
    var uiInit = function() {

        // Initialize Chosen
        $('.select-chosen').chosen({width: "100%"});

        // Initialize Select2
        $('.select-select2').select2();

    };
 /* Page Loading functionality */
    var pageLoading = function(){
        var pageWrapper = $('#page-wrapper');

        if (pageWrapper.hasClass('page-loading')) {
            if (page.hasClass('enable-cookies')) {
                setTimeout(function(){
                    pageWrapper.removeClass('page-loading');
                }, 100);
            } else {
                pageWrapper.removeClass('page-loading');
            }
        }
    };
    /* Sidebar Navigation functionality */
    var handleNav = function() {
        // Get all vital links
        var allLinks        = $('.sidebar-nav a', sidebar);
        var menuLinks       = $('.sidebar-nav-menu', sidebar);
        var submenuLinks    = $('.sidebar-nav-submenu', sidebar);

        // Add ripple effect to all navigation links
        allLinks.on('click', function(e){
            var link = $(this), ripple, d, x, y;

            // Remove .animate class from all ripple elements
            sidebar.find('.sidebar-nav-ripple').removeClass('animate');

            // If the ripple element doesn't exist in this link, add it
            if(link.children('.sidebar-nav-ripple').length == 0) {
                link.prepend('<span class="sidebar-nav-ripple"></span>');
            }

            // Get the ripple element
            var ripple = link.children('.sidebar-nav-ripple');

            // If the ripple element doesn't have dimensions set them accordingly
            if(!ripple.height() && !ripple.width()) {
                d = Math.max(link.outerWidth(), link.outerHeight());
                ripple.css({height: d, width: d});
            }

            // Get coordinates for our ripple element
            x = e.pageX - link.offset().left - ripple.width()/2;
            y = e.pageY - link.offset().top - ripple.height()/2;

            // Position the ripple element and add the class .animate to it
            ripple.css({top: y + 'px', left: x + 'px'}).addClass('animate');
        });

       

        // Submenu Accordion functionality
        submenuLinks.on('click', function(e){
            var link = $(this);

            if (link.parent().hasClass('active') !== true) {
                if (link.hasClass('open')) {
                    link.removeClass('open');
                }
                else {
                    link.closest('ul').find('.sidebar-nav-submenu.open').removeClass('open');
                    link.addClass('open');
                }

                // Resize Page Content
                setTimeout(resizePageContent, 50);
            }

            return false;
        });
    };


    /* Datatables basic Bootstrap integration (pagination integration included under the Datatables plugin in plugins.js) */
    var dtIntegration = function() {
        $.extend(true, $.fn.dataTable.defaults, {
            "sDom": "<'row'<'col-sm-6 col-xs-5'l><'col-sm-6 col-xs-7'f>r>t<'row'<'col-sm-5 hidden-xs'i><'col-sm-7 col-xs-12 clearfix'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_",
                "sSearch": "<div class=\"input-group\">_INPUT_<span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span></div>",
                "sInfo": "<strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
                "oPaginate": {
                    "sPrevious": "",
                    "sNext": ""
                }
            }
        });
        $.extend($.fn.dataTableExt.oStdClasses, {
            "sWrapper": "dataTables_wrapper form-inline",
            "sFilterInput": "form-control",
            "sLengthSelect": "form-control"
        });
    };

    return {
        init: function() {
            uiInit(); // Initialize UI
            pageLoading(); // Initialize Page Loading
        },
        sidebar: function(mode, extra) {
            handleSidebar(mode, extra); // Handle sidebars - access functionality from everywhere
        },
        datatables: function() {
            dtIntegration(); // Datatables Bootstrap integration
        }
    };
}();

/* Initialize App when page loads */
$(function(){ App.init(); });
