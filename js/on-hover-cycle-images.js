  // Cycle through product thumbnails on hover when viewing a collection, reset to first img on mouseleave
  $('.product-images').on('mouseenter', function() {
    var $firstImage = $($(this).find('img.product-img:first-of-type'));
    var $currentImage  = $($firstImage.next()).addClass('active');
    console.log($firstImage);
    console.log($currentImage);
    this.cycleImg = setInterval (function(){  
      $currentImage.next('.product-img').addClass('active');
      $currentImage.removeClass('active');
      if ($currentImage.next('.product-img').length === 0) {
        $currentImage = $firstImage.addClass('active');
      }
      else {
        $currentImage = $($currentImage.next('.product-img'));
      }
    }, 2000);
  }).on('mouseleave', function($firstImg) {
    $($(this).find('img.product-img:first-of-type')).addClass('active');
    $($(this).find('img.product-img.active')[1]).removeClass('active');
    this.cycleImg && clearInterval(this.cycleImg);
  });