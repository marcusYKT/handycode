jQuery(document).ready(function($) {
	'use strict';

	//js for the lightbox plugin
	var galleryCheck = $(".gallery-uf").length;

	var extensions = [	"_pico.",
						"_icon.",
						"_thumb.",
						"_small.",
						"_compact.",
						"_medium.",
						"_large.",
						"_grande.",
						"_10214x1024.",
						"_2048x2048."
					];

	if (galleryCheck > 0) {

		var $gallery;

		$gallery = $(".gallery-uf");
		$gallery.css('text-align','center');
		
		var $images = $gallery.find('img');

		$images.each(function(){
			var imgSRC = this.src;

			for ( var i = 0; i < extensions.length; i++){

				var newSRC = imgSRC.replace(extensions[i],'.');

				if (newSRC.length<imgSRC.length) { break };
			}

			$(this).wrap('<a href="' + newSRC + '" data-lightbox="gallery"></a>');
		});
	}
});
// the other part of the lightbox plugin

<div class="gallery-uf">
	<img src="//cdn.shopify.com/s/files/1/0818/5777/files/img-gallery9_compact.jpg?15629323096562350377" />

	<img src="//cdn.shopify.com/s/files/1/0818/5777/files/img-gallery8_compact.jpg?15629323096562350377" />
</div>