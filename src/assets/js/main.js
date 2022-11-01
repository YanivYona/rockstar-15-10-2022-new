(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {




        $('.menu-open , .offcanvas-overlay').click(function () {

            $('.offcanvas-area , .offcanvas-overlay').addClass('active');
            $('body').addClass('overflow-hidden');

        });
        $('.menu-close , .offcanvas-overlay').click(function () {

            $('.offcanvas-area , .offcanvas-overlay').removeClass('active');
            $('body').removeClass('overflow-hidden');

        });


        $('.show-content').click(function (e) {
            e.preventDefault()
            $('.more-content').removeClass('d-none');
            $(this).hide();

        });
        $('.hide-content').click(function (e) {
            e.preventDefault()
            $('.more-content').addClass('d-none');
            $('.show-content').show();

        });

        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();
            if (scroll < 545) {
                $(".header").removeClass("show");
            } else {
                $(".header").addClass("show");
            }
        });



        $(".team__slider").owlCarousel({
            items: 2,
            nav: true,
            dot: false,
            loop: false,
            center: true,
            margin: 40,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 20,
                    stagePadding: 100,
                },
                440: {
                    items: 1,
                    margin: 20,
                    stagePadding: 110,
                },
                500: {
                    items: 1,
                    margin: 20,
                    stagePadding: 125,
                },
                575: {
                    items: 2,
                    margin: 20,
                    stagePadding: 100,
                },
                767: {
                    items: 2,
                    margin: 20,
                    stagePadding: 110,
                },
                991: {
                    items: 3,
                    margin: 12,
                },
                1200: {
                    items: 3,
                    margin: 14,
                },
                1360: {
                    items: 3,
                    margin: 20,
                }
            }

        });




    });


}(jQuery));



let nextBtn = document.getElementById("nextBtn");
let previousBtn = document.getElementById("prevBtn"); 

$(nextBtn).click(function () {

    nextBtn.innerHTML = '<img src = "assets/img/submit.png" alt = "" >';

});

$(previousBtn).click(function () {

    nextBtn.innerHTML = '<img src ="assets/img/NEXT.png" alt = "" >';

});