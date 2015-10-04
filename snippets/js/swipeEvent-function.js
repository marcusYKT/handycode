swipeEvent: function(){

        /*
        addEventListener(
            @type: string representing event type,
            @listener: object that receives a notification when an event occurs. object that implemeting the event or a simple function
            @false
        */
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;// horizontal
            yDown = evt.touches[0].clientY; //vertical
        };

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown )
                return;

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp; //horizontal
            var yDiff = yDown - yUp; // vertical

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant - if horizontal*/
                if ( xDiff > 0 ) {
                    /* left swipe */
                } else {
                    /* right swipe */
                }
            } else { /* If vertical */
                if ( yDiff > 0 ) {
                    /* up swipe */
                } else {
                    /* down swipe */
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };
    }