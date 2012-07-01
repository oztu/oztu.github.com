$(function(){
	initScrollableCaves();
});

var initScrollableCaves = function(){
	var scrollableCaves = $(".scrollableCave");
	
	scrollableCaves.append('<div class="caveShadowLeft"></div><div class="caveShadowRight"></div>');

	function setCaveShadows(wrapper, scroller){
		var scrollLeft = scroller.scrollLeft();
		var viewableWidth = scroller.outerWidth();
		var scrollWidth = scroller[0].scrollWidth;
		
		if(scrollLeft < 5){
			wrapper.removeClass("inLeftCave");
		} else {
			wrapper.addClass("inLeftCave");
		} 
		
		if(scrollLeft + viewableWidth > scrollWidth - 5 ){
			wrapper.removeClass("inRightCave");
		} else {
			wrapper.addClass("inRightCave");
		}
	}

    scrollableCaves.each(function(index, item){
		var scrollableCave = $(item);
		var scroller = scrollableCave.find(".scroller");
		scroller.scroll(function(){
			setCaveShadows(scrollableCave, scroller);
		});

		setCaveShadows(scrollableCave, scroller);
	});
}