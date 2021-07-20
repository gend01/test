(function ($) {
    $(document).ready(function () {
        
        $('.slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1170,
                    settings: {
                        slidesToShow: 3
                    }
            }
          ]
        });
        
        $('.open_modal').click(function (e) {
            e.preventDefault();
            $('.overlay').fadeIn('fast', function () {
                $('#nonebox-1').animate({
                    'top': '50%'
                }, 500);
            });
        });

        $('.box-close, .overlay').click(function (e) {
            e.preventDefault();
            $('.nonebox').animate({
                'top': '-1100px'
            }, 500, function () {
                $('.overlay').fadeOut('fast');
            });
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() > 200) {
                $('.toggle').addClass('scroll');
            } else {
                $('.toggle').removeClass('scroll')
            }
        });

        $('.tel_phone').mask('+7 (999) 999-99-99');

        // fade in #back-top
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 50) {
                    $('.back-top').addClass('active');
                } else {
                    $('.back-top').removeClass('active');
                }
            });
            // scroll body to 0px on click
            $('.back-top').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        });

        $('.ontop1').on('click', function (e) {
            $('html,body').stop().animate({
                scrollTop: $('.some_top1').offset().top
            }, 1000);
            e.preventDefault();
        });

        $('#menu a').click(function (e) {
            e.preventDefault();
            $(this).hasClass('active')
            $('.cmn-toggle-switch').removeClass('active');
            $('body').removeClass('move');
        });

        $('.cmn-toggle-switch').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('body').removeClass('move');
            } else {
                $(this).addClass('active')
                $('body').addClass('move');
            }
        });
    });

})(jQuery);
