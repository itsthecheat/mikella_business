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

    window.addEventListener('touchstart', function() {
      $('.services-menu').on('click', function(e) {
        defaultPrevented:true;
        $('.dropdown').slideDown(400).stop();
      });
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

//keep label on top of field when value is entered
    function clearField() {
      $('input').on('blur', function(e) {
      var inputValue = this.value;
        if (inputValue) {
          this.classList.add('value-exists');
        } else {
          this.classList.remove('value-exists');
        }
      });
    };
    clearField();

//change label based on chosen contact method
    $('input:radio[name=method]').on('click', function(e) {
      var value = $('input:radio[name=method]:checked').val();
        if (value === 'Phone') {
          $('#contact-method').html('<input type="phone" name="contact" /><div class="label-text">Phone</div>').show('600');

        } else if (value === 'Email') {
          $('#contact-method').html('<input type="email" name="contact" /><div class="label-text">Email</div>').show('600');
        }
        clearField();
      });

});

//form validation
function validate() {
  if (document.contactMe.name.value === "") {
      $('#alert').addClass('alert alert-danger').text('Please provide your name');
    document.contactMe.name.focus() ;
    return false;
  }
}



