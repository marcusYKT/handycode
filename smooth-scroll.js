//*****************************
//adds smooth scroll to the page
//*****************************
jQuery('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        console.log(target);
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            if ($(window).width() < 600)
            {
                $('nav ul').slideUp();
            }
            return false;
        }
    }
}); 