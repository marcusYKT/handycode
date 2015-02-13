//*****************************
//adds dropcaps to certain categories
//*****************************
jQuery(document).ready(function($){
	'use strict';	

	var $scope = $('[data-dropcaps]');

	var targetSelector = $scope.attr('data-dropcaps');

	var $targets = $scope.find(targetSelector);

	$targets.each(function(){
		var name = this.innerHTML;

		if (!name.length) {
			return;
		}

		var firstLetter = name[0];

		var nameEnd = name.substring(1);

		var output = '<span class="dropcap">' + firstLetter + '</span>' + nameEnd;

		this.innerHTML = output;
	});

});