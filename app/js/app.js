document.addEventListener('DOMContentLoaded', function () {
  (function ($) {
    new WOW().init();

    $('#sendmail_form').validate({
      rules: {
        name: 'required',
        phone: 'required',
      },
      messages: {
        name: 'Пожалуйста, введите имя',
        phone: 'Пожалуйста, введите телефон',
      },
    });

    let showModal = (selector) => {
      $(selector).addClass('form--active');
    };

    let hideModal = (selector) => {
      $(selector).removeClass('form--active');
    };

    let clearForms = () => {
      $('#city1').val('');
      $('#city2').val('');
      $('#form_name').val('');
      $('#form_phone').val('');
    };

    $('#order_button').click(function () {
      showModal('#form1');
    });

    $('.js-order-cities-btn').click(function () {
      showModal('#form1');
    });

    $('.js-form-close').click(function (event) {
      hideModal($(event.target).parents('.form'));
    });

    $('.js-form-continue').click(function (event) {
      hideModal($(event.target).parents('.form'));
    });

    $('.js-count-switch').click(() => {
      const city1 = $('#city1').val();
      const city2 = $('#city2').val();
      $('#city1').val(city2);
      $('#city2').val(city1);
    });

    $('.js-count-same').click(() => {
      const city1 = $('#city1').val();
      $('#city2').val(city1);
      return false;
    });

    $('#js-check-order-status').on('submit', function (event) {
      event.preventDefault();
      showModal('#form3');
    });

    $('.js-order-management').on('click', function (event) {
      event.preventDefault();
      showModal('#form3');
    });

    $('.js-unknown-order').on('click', function (event) {
      event.preventDefault();
      showModal('#form1');
    });

    $('#sendmail_form').on('submit', function (event) {
      event.preventDefault();
      if ($('#sendmail_form').valid()) {
        const name = $('#form_name').val();
        const phone = $('#form_phone').val();
        const city1 = $('#city1').val();
        const city2 = $('#city2').val();
        $.post('sendmail.php', {
          name: name,
          phone: phone,
          city1: city1,
          city2: city2,
        }).done(function (data) {
          clearForms();
          hideModal('#form1');
          showModal('#form2');
          setTimeout(() => {
            hideModal('#form2');
          }, 7000);
        });
      }
    });

    $('[type=tel]').inputmask('+7 (999) 999-99-99');

    let observerElem = document.querySelector('#observer');

    let observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some(({ isIntersecting }) => isIntersecting)) {
          entries.forEach((entry) => {
            if (entry.target.getAttribute('data-title') == 'ссылки') {
              $('.bottom-panel').hide();
            } else {
              $('.bottom-panel').show();
              observerElem.innerText = entry.target.getAttribute('data-title');
            }
          });
        }
      },
      {
        threshold: [0.5],
        rootMargin: '200px 0px 200px 0px',
      }
    );
    document.querySelectorAll('.half-container').forEach((elem) => {
      observer.observe(elem);
    });

    $('#city1').autocomplete({
      source: cities,
    });

    $('#city2').autocomplete({
      source: cities,
    });

    /*
    $(window).on('load', function () {
      $('.loader').addClass('loader--invisible');
    });
    */

    /*
    setTimeout(() => {
      $('.loader').addClass('loader--invisible');
    }, 5000);
    */

    /*
    setTimeout(function () {
      $('.loader').remove();
    }, 5100);

    setTimeout(function () {
      $('.circle-container').remove();
    }, 10000);
*/

    // setTimeout(() => {
    //   $('.scaled-circle').remove();
    // }, 5000);

    /*
    $(document).ready(function () {
      $('.loader').addClass('loader--invisible');
    });
    */

    // Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function (event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') ==
            this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length
            ? target
            : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate(
              {
                scrollTop: target.offset().top,
              },
              1000,
              function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(':focus')) {
                  // Checking if the target was focused
                  return false;
                } else {
                  $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                }
              }
            );
          }
        }
      });
  })(jQuery);
});
