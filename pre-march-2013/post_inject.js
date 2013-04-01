// This file is (or should be) injected to all posts

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
	

	var fragment = create('<link href=\'http://fonts.googleapis.com/css?family=Sanchez\' rel=\'stylesheet\' type=\'text/css\'><div style="background-color:#CC333F;"><h1 style="margin:0 auto; width:900px; color:white; height:70px;font-size: 28px; font-family: \'Sanchez\', sans-serif; line-height:70px;"><a href="http://oztu.org/" style="display:block; float:left; padding:0px 30px; height:100%; text-align:center; font-size:30px; background-color:#EB6841; text-shadow:0px 1px 0px #757575; color:white;">Ozan Turgut</a></h1></div>');
	document.body.insertBefore(fragment, document.body.childNodes[0]);	
}());


 