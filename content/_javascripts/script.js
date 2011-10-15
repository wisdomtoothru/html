// Enable only-with-js CSS-styling
document.documentElement.id = "js"; 

(function(){
	var isOldIE = ($.browser.msie && parseInt($.browser.version,10) < 8),
		isAniPhone = navigator.userAgent.indexOf("iPhone") != -1,
		isAniPod = navigator.userAgent.indexOf("iPod") != -1,
		isAniPad = navigator.userAgent.indexOf("iPad") != -1,
		isAnIOS = isAniPhone || isAniPad || isAniPod;

	// Boyans
	$('.b-boyan-item').hover(function() {
		if (!$(this).hasClass('b-boyan-item_current')) {
			$(this).addClass('b-boyan-item_current').siblings('.b-boyan-item_current').removeClass('b-boyan-item_current');

			var step = parseInt(500/($(this).parent().children().length-1),10)/10;
			if ($(this).index()!=$(this).parent().children().length-1) {
				$(this).closest('.b-boyan').removeClass('b-boyan_noshadow');
			}
			$(this).prevAll().each(function() {
				$(this).animate({
					left: $(this).index()*step + '%'
				}, { queue: false, duration: 300 })
			});
			$(this).nextAll().each(function() {
				$(this).animate({
					left: 50+($(this).index()-1)*step + '%'
				}, { queue: false, duration: 300 })
			});
			$(this).animate({
				left: $(this).index()*step + '%'
			}, { queue: false, duration: 300, complete: function() {
				if ($(this).index()==$(this).parent().children().length-1 && $(this).hasClass('b-boyan-item_current')) {
					$(this).closest('.b-boyan').addClass('b-boyan_noshadow');
				}
			}});
			return false;
		}
	});
	
	// Fixes for iOS
	if (isAnIOS) {
		// Pervent tap for noncurrent elements
		$('.b-boyan-item').click(function() {
			if (!$(this).hasClass('b-boyan-item_current')) {
				return false;
			}
		});
	}

	// Init Boyans (maybe add random?)
	$('.b-boyan').each(function() {
		$(this).children('.b-boyan-item:eq(0)').click();
	})
	
	// Focus to the search terms field
	$('.b-page_terms .b-terms-search .b-search-input').focus();
	
	// Popup
	$('a[href^="#"]').click(function() {
		var popup = $($(this).attr('href')+'.b-popup');
		if (popup) {
			popup.fadeIn().css({
				'left':$(this).offset().left + $(this)[0].scrollWidth/2,
				'top':$(this).offset().top - popup[0].scrollHeight - $('.b-layout').offset().top
			}).find('input,textarea')[0].focus()
		}
		// Add better positioning
	});
	
	$('.b-popup-close').click(function() {
		$('.b-popup').fadeOut();
		return false;
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.b-popup').fadeOut();
		}
	});
	

})();