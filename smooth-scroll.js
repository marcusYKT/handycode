    //*****************************
    //adds smooth scroll to the page
    //*****************************
    function scrollToTarget(hash) {
        var $target = $(hash);
           
        $target = $target.length ? $target : $('[name=' + this.hash.slice(1) + ']');
        
        console.log($target);
        if ($target.length) {
            $('html,body').animate({
                scrollTop: $target.offset().top - 48
            }, 1000);

            if ($(window).width() < 600) {
                $('nav ul').slideUp();
            }
        }
    }

    if (location.hash) {
        console.log(location.hash);
        scrollToTarget(location.hash);
    }

    jQuery('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            scrollToTarget(this.hash); 
        }
    }); 
