var makeScrollableCave = function(selector, isVertical){
	var scrollableCaves = $(selector);
	var GUTTER_SIZE = 5; // pixels from an edge before activating caves
	
	if(isVertical){
		scrollableCaves.append('<div class="caveShadowTop"></div><div class="caveShadowBottom"></div>');
	} else {
		scrollableCaves.append('<div class="caveShadowLeft"></div><div class="caveShadowRight"></div>');
	}
	
	function setVerticalCaveShadows(wrapper, scroller){
		var scrollTop = scroller.scrollTop();
		var viewableHeight = scroller.outerHeight();
		var scrollHeight = scroller[0].scrollHeight;
		
		if(scrollTop < GUTTER_SIZE){
			wrapper.removeClass("inTopCave");
		} else {
			wrapper.addClass("inTopCave");
		} 
		
		if(scrollTop + viewableHeight > scrollHeight - GUTTER_SIZE ){
			wrapper.removeClass("inBottomCave");
		} else {
			wrapper.addClass("inBottomCave");
		}
	}
	
	function setHorizontalCaveShadows(wrapper, scroller){
		var scrollLeft = scroller.scrollLeft();
		var viewableWidth = scroller.outerWidth();
		var scrollWidth = scroller[0].scrollWidth;
		
		if(scrollLeft < GUTTER_SIZE){
			wrapper.removeClass("inLeftCave");
		} else {
			wrapper.addClass("inLeftCave");
		} 
		
		if(scrollLeft + viewableWidth > scrollWidth - GUTTER_SIZE ){
			wrapper.removeClass("inRightCave");
		} else {
			wrapper.addClass("inRightCave");
		}
	}

	var setCaveShadows;
	if(isVertical){
		setCaveShadows = setVerticalCaveShadows
	}else {
		setCaveShadows = setHorizontalCaveShadows;
	}
	
    scrollableCaves.each(function(index, item){
		var scrollableCave = $(item);
		var scroller = scrollableCave.find("ul");
		scroller.scroll(function(){
			setCaveShadows(scrollableCave, scroller);
		});
		
		$(window).resize(function(){
			setCaveShadows(scrollableCave, scroller);
		});
		
		setCaveShadows(scrollableCave, scroller);
		setTimeout(function(){
			setCaveShadows(scrollableCave, scroller);
		},500);
	});
};

$(function(){
	makeScrollableCave(".verticalScrollableCave", true);
	makeScrollableCave(".horizontalScrollableCave", false);
});

