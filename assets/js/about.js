let prevScrollPos = $(window).scrollTop();

$(window).on('scroll', function () {

    let currentScrollPos = $(window).scrollTop();

    // console.log(currentScrollPos);

    let $top = $('#top');

    if (currentScrollPos === 0) {
        $top.css('background-color', 'rgba(0, 0, 0, 0)');
    }
    else if (prevScrollPos > currentScrollPos) {
        $top.css({
            'top': '0',
            'background-color': 'rgba(255, 255, 255, 0.99)'
        });
    }
    else if (($('.navbar-toggler').attr('aria-expanded') === 'true') && (currentScrollPos !== 0)) {
        $top.css('background-color', 'rgba(255, 255, 255, 0.99)');
    }
    else {
        $top.css('top', '-132.5px');
    }

    prevScrollPos = currentScrollPos;
});
