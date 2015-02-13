	//*******************************************
	// update cart quality field
	//*******************************************
	var $qtyUpdate = jQuery('#qty-update');
	var $cartTotal = jQuery('#cart-total');

	$qtyUpdate.on('blur keyup paste', function(){
		var id = $qtyUpdate.attr('data-item-id'),
			qty = $qtyUpdate.val(),
			data = {};

		data[id + ''] = qty;

		$.ajax({
			type: "POST",
			url: '/cart/update.js',
			data: { updates:data },
			dataType: 'json',
			success: function() {

				$.ajax({
					type: 'GET',
					url: '/cart.js',
					dataType: 'json',
					success: function(data) {
						console.log(data);
						console.log(data.total_price);
						var _monetizedTotal = _monetize(data.total_price);
						$cartTotal.html('$ ' + _monetizedTotal);
					}
				});
			},
			fail: function() {
				console.log('fail');
			}
		});
	});