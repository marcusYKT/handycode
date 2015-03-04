;(function($) {
	'use strict';

	app.initNewsletterModal = function() {
		var delay = 2000, //2 secs delay
			showClass = 'show-modal',
			$modalContent = $('#mc_embed_signup--modal'),
			$modalOuter = $('#modal-outer'),
			$modalClose = $('#modal-close');

		function open() {
			$modalContent.addClass(showClass);
			$modalOuter.addClass(showClass);
		}

		function close() {
			$modalContent.removeClass(showClass)
			$modalOuter.removeClass(showClass)
		}

		$modalClose.on('click', function() {
			close();
		});

		// if (!$.cookie('seilennaModalCookie')) {
		// 	$.cookie('seilennaModalCookie', '1', {path:'/', expires:1 });
		
			setTimeout(function() {
				open();
			}, delay);
		// }
	};
}(jQuery));