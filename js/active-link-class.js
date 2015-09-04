jQuery('.blog-navigation a').each(function() {
  if (jQuery(this).attr('href')  ===  window.location.pathname) {
    jQuery(this).addClass('active--link');
  }
});