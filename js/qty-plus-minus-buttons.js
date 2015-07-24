// needs operator.js to function!

/**
 * declarative incrementers and decrementers for product add-to-cart quantities
 */
jQuery(function($) {
	'use strict';
	$('[data-increment]').incrementer();
	$('[data-decrement]').decrementer();

	if (!window.MutationObserver) {
		return false;
	}

	var observer = new window.MutationObserver(function(mutations, observer) {
	    // fired when a mutation occurs
	    $('[data-increment]').incrementer();
		$('[data-decrement]').decrementer();
	});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe(document, {
	  subtree: true,
	  childList: true
	});
});