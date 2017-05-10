console.log('\'Allo \'Allo!');

$(function(){
  'use strict';

// Change navbar color on scroll
    $(window).scroll(function(){
      var top = $(window).scrollTop();
      var navbar = $('.navbar-default');

        if (top > 50){
          navbar.addClass('scrolled');
        } else {
          navbar.removeClass('scrolled')
        }
    });

// Page Scroll transition effect when clilcking menu item
    $('.page-scroll a').bind('click', function(e) {
      var $element = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($element.attr('href')).offset().top - 100)
        }, 1150, 'easeInOutBack');
        e.preventDefault();
    });

    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });


})



