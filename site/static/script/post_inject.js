var _gaq = _gaq || [];
_gaq.push( [ '_setAccount', 'UA-4017245-5' ]);
_gaq.push( [ '_setDomainName', '.oztu.org' ]);
_gaq.push( [ '_trackPageview' ]);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl'
			: 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

// Prepends "Ozan Turgut's Website" header to body
(function(){
	function create(htmlStr) {
	    var frag = document.createDocumentFragment(),
	        temp = document.createElement('div');
	    temp.innerHTML = htmlStr;
	    while (temp.firstChild) {
	        frag.appendChild(temp.firstChild);
	    }
	    return frag;
	}
	

	var fragment = create('<h1 style="line-height:100%; font-size:100%; text-align:center; padding:0px; margin:0px; background-color:white; background-color:#eee; box-shadow:0px 0px 15px 0px #333; border-bottom:1px solid #ddd; margin-bottom:15px;"><a style="text-shadow:0 -1px 1px #AAA,0px 1px 2px #EEE; display:block; padding:8px; color:black; font-weight:normal; font-size:26px; font-family:Helvetica,Arial; line-height:100%" href="http://oztu.org/">Ozan Turgut\'s Website</a></h1>');
	document.body.insertBefore(fragment, document.body.childNodes[0]);	
}());
