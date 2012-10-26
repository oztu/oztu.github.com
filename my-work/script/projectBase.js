// SETUP OVERLAYS
(function(){
	var idCounter = 0;
	$("img").each(function(index, item){
		var item = $(item);
		var title = item.attr("title");
		var src = item.attr("src").replace("thumb/","").replace(".jpg",".png");
		var id = "overlay_" + (idCounter++);
		item.attr("rel", "#" + id);
		
		var element = $('<div class="overlay" id="' + id + '"></div>');
		element.append($('<img src="'+ src +'" title="' + title + '"/>'));
		element.append($('<div class="details">'+ title +'</div>'));
		$("body").append(element);
	});

	$("img[rel]").overlay({mask: '#000'});
}());