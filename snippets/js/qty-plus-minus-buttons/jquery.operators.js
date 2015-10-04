/**
 * jquery.operators.js
 *
 * an easy way to increment/decrement the value of an input
 *
 * usage:
 *
 * include this library
 * include the initialization file
 *
 * use the following markup conventions (example):
 *
 * <a data-decrement="qty">-</a>
 * <a data-increment="qty">+</a>
 * <input type="text" id="qty"></input>
 *
 * You can also set min and max values on your operator elements
 * <a data-increment="qty" data-min="0" data-max="10">+</a>
 *
 * (The minimum value defaults to 0)
 */
;(function($, app, undefined) {
	'use strict';

	function Operator($el, action) {
		var el = $el[0],
			target,
			max,
			min;

		/**
		 * define business logic for incrementing/decrementing the value of "target"
		 */
		var methods = {
			increment: function() {
				var curVal = parseInt(target.value, 10);
				var val = curVal + 1;
				if (max !== null) {
					val = Math.min(val, max);
				}
				target.value = val;
			},
			decrement: function() {
				var curVal = parseInt(target.value, 10);
				var val = Math.max(curVal - 1, min);
				target.value = val;
			}
		};

		// get "target" dom el via ID only
		target = document.getElementById(el.getAttribute('data-' + action));


		max = el.getAttribute('data-max');
		min = el.getAttribute('data-min');
		if (min === null) {
			min = 0;
		}
		if (max !== null) {
			max = parseInt(max, 10);
		}

		/**
		 * define event handler so it can be bound AND unbound
		 */
		function onclick(e) {
			e.preventDefault();
			methods[action]();
		}

		/**
		 * unbind events when destroy is called
		 */
		this.destroy = function() {
			$el.off('click', onclick);
		};

		/**
		 * always unbind event handler before binding in case
		 * library is initialized more than once
		 * (via MutationObservers, for example)
		 */
		$el.off('click', onclick).on('click', onclick);
	}

	// hook into jQuery to create "incrementer" function
	$.fn.incrementer = function(options) {
		return this.each(function() {
			var destroy = options === false || options === 'destroy',
                $this = $(this);

            if (!$this.data('incrementer') && !destroy) {
                $this.data('incrementer', new Operator($this, 'increment'));
            } else if ($this.data('incrementer') && destroy) {
            	$this.data('incrementer').destroy();
            	$this.removeData('incrementer');
            }

            return $this;
		});
	};

	// hook into jQuery to create "decrementer" function
	$.fn.decrementer = function(options) {
		return this.each(function() {
			var destroy = options === false || options === 'destroy',
                $this = $(this);

            if (!$this.data('decrementer') && !destroy) {
                $this.data('decrementer', new Operator($this, 'decrement'));
            } else if ($this.data('decrementer') && destroy) {
                $this.data('decrementer').destroy();
            	$this.removeData('decrementer');
            }

            return $this;
		});
	};
})(jQuery);