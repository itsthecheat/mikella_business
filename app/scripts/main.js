console.log('\'Allo \'Allo!');

$(function(){

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
        scrollTop: ($($element.attr('href')).offset(). top - 100)
        }, 1150, 'easeInOutBack');
        e.preventDefault();
    });

    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });


  var contact = function(){
    $('input:radio[name=contact]').on('click', function(e) {
      var value = $('input:radio[name=contact]:checked').val();
        if (value === "Phone") {
          $('#contact-method').html('<input type="phone" name="phone" /><div id="input-text" class="label-text">Phone</div>').show('600');
        } else if (value === "Email") {
          $('#contact-method').html('<input type="email" name="email" /><div id="input-text" class="label-text">Email</div>').show('600');
        } else {
          $(this).hide('600')
        }
      });
}();

// var clearField = function(){
//   $('input').focusout(function(e) {
//     var value = $('input').val();
//     if (value.length !== 0){
//       $('.label-text').css({
//                 'color': 'black',
//                 'text-transform': 'uppercase',
//                 '-moz-transform': 'translateY(-55px)',
//                 '-ms-transform': 'translateY(-55px)',
//                 '-webkit-transform': 'translateY(-55px)',
//                 'transform': 'translateY(-55px)'
//               })
//     } else if (value.length === 0) {
//       $('.label-text').css({
//         '-moz-transform': 'translateY(-22px)',
//         '-ms-transform': 'translateY(-22px)',
//         '-webkit-transform': 'translateY(-22px)',
//         'transform': 'translateY(-22px)',
//         'transition': 'all 0.3s'
//       })
//     }
//     });
// }()


})



