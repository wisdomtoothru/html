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
		if (popup.length) {
			var tempID = popup.attr('id');
			popup.removeAttr('id');
			if (popup.is(':visible')) {
				document.location.hash = '_';
				popup.fadeOut();
				
				popup.attr('id',tempID);
				return false;
			} else {
				document.location.hash = tempID;
				popup.fadeIn().css({
					'left':$(this).offset().left + $(this)[0].scrollWidth/2,
					'top':$(this).offset().top - popup[0].scrollHeight - $('.b-layout').offset().top
				});
				var someInput = popup.find('input,textarea');
				if (someInput.length) {
					someInput[0].focus()
				}
				popup.attr('id',tempID);
				return false;
			}
		}
		// Add better positioning
	});
	
	$('.b-popup-close').click(function() {
		$(this).closest('.b-popup').fadeOut();
		return false;
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.b-popup').fadeOut();
		}
	});
	
	// Answering prototype (need ajax here)
	$('.b-qa-reanswer').click(function() {
		var thisQuestion = $(this).closest('.b-qa')
		thisQuestion.addClass('b-qa_current').prevAll('.b-qa').remove();
		thisQuestion.find('.b-qa-answer_selected').removeClass('b-qa-answer_selected');

		return false;
	});
	
	$('.b-qa-answer-link').click(function() {
		$(this).closest('.b-qa-answer').addClass('b-qa-answer_selected').closest('.b-qa').removeClass('b-qa_current');
	});
	
})();