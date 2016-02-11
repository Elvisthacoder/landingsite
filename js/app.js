$(document).foundation();
// scroll body to 0px on click
$('.back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 1500);

  return false;
});

// scroll body to first slide on click
$('#caret1').click(function() {
  $('html, body').animate({
    scrollTop: $('#bb1').offset().top - 70
  }, 750);
  return false;
});

$('#caret2').click(function() {
  $('html, body').animate({
    scrollTop: $('#bb2').offset().top - 70
  }, 750);
  return false;
});

$('#caret3').click(function() {
  $('html, body').animate({
    scrollTop: $('#bb3').offset().top - 70
  }, 750);
  return false;
});

if ($('html').hasClass("no-touch")) {
  (function($){
	function fixButtonHeights() {
		var heights = new Array();

		// Loop to get all element heights
		$('.eq-box').each(function() {
			// Need to let sizes be whatever they want so no overflow on resize
			$(this).css('min-height', '0');
			$(this).css('max-height', 'none');
			$(this).css('height', 'auto');

			// Then add size (no units) to array
	 		heights.push($(this).height());
		});

		// Find max height of all elements
		var max = Math.max.apply( Math, heights );

		// Set all heights to max height
		$('.eq-box').each(function() {
			$(this).css('height', max + 'px');
            // Note: IF box-sizing is border-box, would need to manually add border and padding to height (or tallest element will overflow by amount of vertical border + vertical padding)
		});
	}

	$(window).load(function() {
		// Fix heights on page load
		fixButtonHeights();

		// Fix heights on window resize
		$(window).resize(function() {
			// Needs to be a timeout function so it doesn't fire every ms of resize
			setTimeout(function() {
	      		fixButtonHeights();
			}, 120);
		});
	});
})(jQuery);







  $('.animated').appear(function() {
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if (animationDelay) {
      setTimeout(function() {
        element.addClass(animation + " visible");
        element.removeClass('hiding');
        if (element.hasClass('counter')) {
          element.find('.value').countTo();
        }
      }, animationDelay);
    } else {
      element.addClass(animation + " visible");
      element.removeClass('hiding');
      if (element.hasClass('counter')) {
        element.find('.value').countTo();
      }
    }
  }, {
    accY: -0
  });
};

(function() {
  // Listen for the ready event for any vimeo video players on the page
  var vimeoPlayers = document.querySelectorAll('iframe'),
    player;
  for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
    player = vimeoPlayers[i];
    $f(player).addEvent('ready', ready);
  }
  /**
   * Utility function for adding an event. Handles the inconsistencies
   * between the W3C method for adding events (addEventListener) and
   * IE's (attachEvent).
   */
  function addEvent(element, eventName, callback) {
      if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
      } else {
        element.attachEvent(eventName, callback, false);
      }
    }
    /**
     * Called once a vimeo player is loaded and ready to receive
     * commands. You can add events and make api calls only after this
     * function has been called.
     */
  function ready(player_id) {
    // Keep a reference to Froogaloop for this player
    var container = document.getElementById(player_id).parentNode.parentNode,
      froogaloop = $f(player_id),
      apiConsole = container.querySelector('.console .output');
    /**
     * Prepends log messages to the example console for you to see.
     */
    $('.volume').on('input change', function() {
      // Grab the value in the input field
      var volumeVal = $(this).val();
      // Call the api via froogaloop
      froogaloop.api('setVolume', volumeVal);

    });
    $('.pause').click(function() {
      froogaloop.api('pause');

    });

    $('.play').click(function() {
      froogaloop.api('play');
      $('.embed-container iframe').fadeIn();

      $('.jcontent').addClass("fadeOut").fadeOut();
      $('.videoAdjustments').slideDown();

    });

    froogaloop.addEvent('playProgress', function(data) {
      $('.playColor').css("width", data.percent * 100 + '%');

    });

    $('.playProgress').click(function(event) {

      var getPlayWidth = $(this).outerWidth();
      var seekPerc = (event.pageX / getPlayWidth);
      var getPlayLength = froogaloop.api('getDuration', function(dur) {
        var setIt = dur * seekPerc;

        froogaloop.api('seekTo', setIt);
        // froogaloop.api('play');

      });

      //froogaloop.addEvent('seek', function(data) {

      //});
    });

    froogaloop.addEvent('finish', function(data) {
      $('.videoAdjustments').slideUp();
      $('.embed-container iframe').fadeOut();
      $('.jcontent').removeClass('fadeOut').fadeIn();

    });

  }
})();
