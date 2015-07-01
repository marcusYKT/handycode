	var navHeight = 10;
	var navBar = $('.header_bot');

	$(window).bind('scroll', function () {
	    if ($(window).scrollTop() > navHeight) {
	        navBar.addClass('nav-fixed');
	    } else {
	        navBar.removeClass('nav-fixed');
	    }
	});