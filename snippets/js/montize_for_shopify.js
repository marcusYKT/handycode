var _splice = function(str, index, count, add) {
    return str.slice(0, index) + (add || "") + str.slice(index + count);
  };


  var _monetize = function(amount) {
    var monetized;

    amount = amount + '';

    monetized = _splice(amount, (amount.length - 2), 0, '.');

    return monetized;
  };