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

	var fragment = create('<h1 style="text-align:center; margin-top:10px; margin-bottom:20px;"><a style="text-shadow:0 -1px 1px #B0B0B0,0px 1px 2px #CCC; color:black; font-weight:normal; font-size:28px; font-family:Helvetica,Arial;" href="http://oztu.org/">Ozan Turgut\'s Website</a></h1>');
	document.body.insertBefore(fragment, document.body.childNodes[0]);	
}());
