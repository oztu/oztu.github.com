if(!~window.location.hostname.indexOf('console.turn.com')) throw "Must be in Turn console";

var styles = document.createElement('link');
styles.rel="stylesheet";
styles.href='https://s3.amazonaws.com/turn-helpy/clippy.css';
document.body.appendChild(styles);

var script = document.createElement('script');
script.src='https://s3.amazonaws.com/turn-helpy/clippy.js';
document.body.appendChild(script);
script.onload = initTurnHelper;


function initTurnHelper(){
	 clippy.load('Clippy', helpTheWorld);
}

function helpTheWorld(helpy){
	if(window.helpy) window.helpy.hide();

	helpy.show();
	helpy.play("GetAttention");
	
	window.helpy = helpy;

    var location = whereAmI();

    var sayings = sayingMap[location];
    var index = Math.floor(Math.random() * sayings.length);
    var saying = sayings[index];

    if(typeof saying === "function") saying = saying();
    helpy.speak(saying);
    helpy.animate();
}

function whereAmI(){
	// Specific locations
	if(~location.pathname.indexOf('/quest/')){
		if(~location.pathname.indexOf('/advertisers.html')) return "advertisers";
		if(~location.pathname.indexOf('/insertionOrders.html')) return "ios";
		if(~location.pathname.indexOf('/beacons.html')) return "beacons";
		if(~location.pathname.indexOf('/creativeLib.html')) return "creatives";
		if(~location.pathname.indexOf('/experiments.html')) return "experiments";
		if(~location.pathname.indexOf('/siteLists.html')) return "sitelists";
		if(~location.pathname.indexOf('/zipGroups.html')) return "locationgroups";

		if(~location.search.indexOf('card=PackagesCardModule')) return "package-list";
		if(~location.search.indexOf('card=InsightsCardModule')) return "insights";
		if(~location.search.indexOf('card=PrioritiesCardModule')) return "advisories";
		if(~location.search.indexOf('card=LineItemsCardModule')) return "lineitem-list";

		if(~location.pathname.indexOf('/insights.html')) return "as-insights";

		if(~location.pathname.indexOf('/powerboardsNew.html')) return "powerboards";

		return "quest";
	}
	
	if(~location.pathname.indexOf('/app/')){
		if(~location.pathname.indexOf('/dataProvidersTMP.html')) return "cs-dp-list";
		if(~location.pathname.indexOf('/dataContractsTMP.html')) return "cs-dc-list";
		if(~location.pathname.indexOf('/segmentsTMP.html')) return "cs-segments-list";
		if(~location.pathname.indexOf('/dataMineJobs.html')) return "data-mine-list";
		if(~location.pathname.indexOf('/dataMineJobMaintain.htm')) return "data-mine-query";
		
		return "old-cs";
	}
	
	if(~location.pathname.indexOf('/webapp/')){
		if(~location.hash.indexOf('/insertion-order/new')) return "io-new";
		if(~location.hash.indexOf('/insertion-order/')) return "io-edit";

		if(~location.hash.indexOf('/lineItem/new')) return "lineitem-new";
		if(~location.hash.indexOf('/lineItem/')) return "lineitem-edit";

		if(~location.hash.indexOf('/package/new')) return "package-new";
		if(~location.hash.indexOf('/package/')) return "package-edit";

		if(~location.hash.indexOf('/beacon/new')) return "beacon-new";
		if(~location.hash.indexOf('/beacon/')) return "beacon-edit";


		if(~location.hash.indexOf('/edit-site-list/')) return "edit-site-list";
		if(~location.hash.indexOf('/new-site-list/')) return "new-site-list";

		return "webapp";	
	}

	if(~location.pathname.indexOf('/dp/')){
		if(~location.pathname.indexOf('/dataProviders.htm')) return "dp-list";
		if(~location.pathname.indexOf('/dataProviderMaintain.htm')) return "dp-edit";

		if(~location.pathname.indexOf('/dataContracts.htm')) return "dc-list";
		if(~location.pathname.indexOf('/dataContractMaintain.htm')) return "dc-edit";

		if(~location.pathname.indexOf('/segments.htm')) return "segment-list";
		if(~location.pathname.indexOf('/segmentMaintain.htm')) return "segment-edit";

		if(~location.pathname.indexOf('/mediaProviders.htm')) return "mp-list";
		if(~location.pathname.indexOf('/mediaProviderMaintain.htm')) return "mp-edit";

		if(~location.pathname.indexOf('/pivotReport.htm')) return "pivot-report";

		return "as";	
	} 

	if(~location.pathname.indexOf('/help/')){
		return "help";		
	}	
}

function randomFromArray(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomASSaying(){
	var sayings = [
		"It looks like you're tyring to use Audience Suite.<br /><br />Would you like help?<ul><li><a href='https://console.turn.com/help/en_us/TAP_WebHelp/tapintro.html#SharedInfo/segmentdetails_create.html%3FTocPath%3DUsing%20the%20Segments%20Tab%7CCreating%20and%20Editing%20Segments%7CCreating%20Segments%7C_____0' target='_blank'>Get help with creating a segment.</a></li><li><a href='#' onclick='print()'>Print this page.</a></li></ul>",
		"It looks like you're using Audience Suite. Would you like me to Turn the page upside down? <ul><li><a href='#' onclick='rotatePage(180)'>Yes, please turn the page upside down.</a></li> <li><a href='#' onclick='rotatePage(90)'>No, only turn the page 90 degrees.</a></li></ul>",
		"I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do."
	];
	return randomFromArray(sayings);
}

window.rotatePage = function(degrees){
	var body = $('body');
	body.css({
		'-webkit-transform': 'rotate(180deg)',
		'-ms-transform': 'rotate(180deg)',
		'-o-transform': 'rotate(180deg)',
		'-moz-transform': 'rotate(180deg)',
		'transform': 'rotate(180deg)'
	});
}

function randomCSSaying(){
	var sayings = [
		"Can I assist you in finding a <strong><a href='https://www.google.com/search?q=Champagne%20Suit' target='_blank'>Champagne Suit</a></strong>?",
		"It looks like you're using Campaign Suite. Would you like me to Turn the page upside down? <ul><li><a href='#' onclick='rotatePage(180)'>Yes, please turn the page upside down.</a></li> <li><a href='#' onclick='rotatePage(90)'>No, only turn the page 90 degrees.</a></li></ul>",
		"Daisy, Daisy, give me your answer do. I'm half crazy all for the love of you. It won't be a stylish marriage, I can't afford a carriage. But you'll look sweet upon the seat of a bicycle built for two.",
		"I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do."

	];
	return randomFromArray(sayings);
}

var sayingMap = {
	// QUEST
	'advertisers': [
		"Advertisers, huh? Did you know that the father of Jared Harris (Lane Pryce in Mad Men) is Richard Harris -- the man who played the original Dumbledore?",
		"In Mad Men, the actor who plays boozy Freddy Rumsen is Bill Murray's brother.",
		"In Mad Men, Sterling Cooper was certainly a male-dominated domain in the first few seasons. But it wasn't the case in the writers room: seven out of the nine Mad Men writers were women in 2009."
	],
	'ios': [
		randomCSSaying()
	],
	'beacons': [
		"May I assist you in <a target='_blank' href='http://www.huffingtonpost.com/2012/01/18/how-to-cook-bacon_n_1211411.html'> creating a bacon? </a>"
	],
	'creatives': [
		randomCSSaying()
	],
	'experiments': [
		"It looks like you're viewing Experiments. Would you like to learn how to create your own experiment? Choose one below: <ul><li><a target='_blank' href='http://www.sciencebob.com/experiments/balloonrocket.php'>Baloon Rocket</a></li> <li><a target='_blank' href='http://www.sciencebob.com/experiments/cd_hovercraft.php'>CD Hovercraft</a></li> <li><a target='_blank' href='http://www.sciencebob.com/experiments/tabletop_fog_tornado.php'>Fog Tornado</a></li></ul>"
	],
	'sitelists': [
		"I LOVE LISTS OF SITES!<br />Here are some to get you started with yours: <ul><li><a target='_blank' href='http://en.wikipedia.org/wiki/List_of_web_resources_for_visualizing_molecular_dynamics'>Sites for visualizing molecular dynamics</a></li> <li><a target='_blank' href='http://en.wikipedia.org/wiki/Doctor_Who_tie-in_websites'>Doctor Who tie-in websites</a></li> <li><a target='_blank' href='http://en.wikipedia.org/wiki/Lists_of_websites'>List of websites</a></li></ul>"
	],
	'locationgroups': [
		randomCSSaying()
	],





	'package-list': [
		"Would you like assistance <a target='_blank' href='http://www.ups.com/tracking/tracking.html'> tracking your package? </a>"
	],
	'insights': [
		'"Nothing is more terrible than activity without insight." - Thomas Carlyle',
		'"Humor is the affectionate communication of insight." - Leo Rosten',
		'"Insight is the first condition of Art." - George Henry Lewes'
	],
	'advisories': [
		"<img width=278 height=200 src='http://s2.quickmeme.com/img/25/25eb69826e191dccce73495012e724b508d6dbd156d4142a63c0a6be663c409f.jpg' /> <h2> . . ADVISORY . . </h2>",
		"<img width=278 height=200 src='http://s2.quickmeme.com/img/66/665fc4132640da21615a417607d3b66efbe2b8ec457ecf7027fbe05eac2d513d.jpg' /> <h2> . . ADVISORY . . </h2>",
		"<img width=278 height=200 src='http://s2.quickmeme.com/img/30/304bf38d2a7c425c9d1f3f62bf3dc8b276e8c2fb81c0eb32d4f5fab2a2f956d5.jpg' /> <h2> . . ADVISORY . . </h2>",
	],
	'lineitem-list': [
		'This is a list of line items. Would you like to see a <a target="_blank" href="http://forecast.io/lines/"> forecast with lines </a>?'
	],
	'as-insights': [
		function(){
			var name = $('.utility li:first-child').text();
			if(name && (~name.toLowerCase().indexOf('ethan') || ~name.toLowerCase().indexOf('elubka'))){
				return "Just what do you think you're doing, Ethan?"
			} else {
				return "Did Ethan send you here? It doesn't matter. Click here to see <a target='_blank' href='http://www.pinterest.com/iapetus/thoughtful-insights/'>new insights</a>."
			}
		},
	],
	'powerboards': [
		randomCSSaying()
	],
	'quest': [
		randomCSSaying()
	],





	// OLD CS
	'cs-dp-list': [
		randomCSSaying()
	],
	'cs-dc-list': [
		randomCSSaying()
	],
	'cs-segmnets-list': [
		randomCSSaying()
	],
	'data-mine-list': [
		randomCSSaying()
	],
	'data-mine-query': [
		"I know you were just trying to run a datamine query, and imma let you finish, but I gotta say Report Center has some of the best report of ALL TIME. THE BEST REPORTS OF ALL TIME."
	],
	'old-cs': [
		randomCSSaying()
	],






	// WEBAPP
	'io-new': [
		'Campaign Suite automatically adapts its bidding strategies to maximize performance of your insertion orders. Would you like to <a target="_blank" href="https://www.youtube.com/watch?v=oHg5SJYRHA0">learn more about our secret algorithms</a>?'
	],
	'io-edit': [randomCSSaying()],
	'lineitem-new': [
		"It looks like you're creating a line item. Would you like to <a target='_blank' href='https://www.khanacademy.org/math/geometry/intro_euclid/v/lines--line-segments--and-rays'>learn more about lines?</a>."
	],
	'lineitem-edit': [
		"I see that you're editing a line item. Why not think out of the box on the targeting for this one? Why not... Antarctica?"
	],
	'package-new': [
		"It looks like you're creating a package. Would you like to see <a target='_blank' href='https://www.fedex.com/ratefinder/home'>the latest postage rates</a>?"
	],
	'package-edit': [
		"I see that you're editing a package. Why not think out of the box on the targeting for this one? Why not... Antarctica?"
	],
	'new-site-list': [
		"I LOVE LISTS OF SITES!<br />Here are some to get you started with yours: <ul><li><a target='_blank' href='http://en.wikipedia.org/wiki/List_of_web_resources_for_visualizing_molecular_dynamics'>Sites for visualizing molecular dynamics</a></li> <li><a target='_blank' href='http://en.wikipedia.org/wiki/Doctor_Who_tie-in_websites'>Doctor Who tie-in websites</a></li> <li><a target='_blank' href='http://en.wikipedia.org/wiki/Lists_of_websites'>List of websites</a></li></ul>"
	],
	'edit-site-list': [
		"I LOVE LISTS OF SITES!<br />Here are some to get you started with yours: <ul><li><a target='_blank' href='http://en.wikipedia.org/wiki/List_of_web_resources_for_visualizing_molecular_dynamics'>Sites for visualizing molecular dynamics</a></li> <li><a target='_blank' href='http://en.wikipedia.org/wiki/Doctor_Who_tie-in_websites'>Doctor Who tie-in websites</a></li> <li><a target='_blank' href='http://en.wikipedia.org/wiki/Lists_of_websites'>List of websites</a></li></ul>"
	],
	'beacon-new': [
		"May I assist you in <a target='_blank' href='http://www.huffingtonpost.com/2012/01/18/how-to-cook-bacon_n_1211411.html'> creating a bacon? </a>"
	],
	'beacon-edit': [
		"Would you like tips on <a target='_blank' href='http://www.huffingtonpost.com/2012/01/18/how-to-cook-bacon_n_1211411.html'>how to improve your bacon</a>?"
	],
	'webapp': [randomCSSaying()],






	// AS
	'dp-list': [
		function(){
			var types = $('tr td:nth-child(6)');
			var count = 0;
			types.each(function(){
				if(this.innerText === "FlexTag"){
					count++;
				}
			});

			return "I only count " + count + " FlexTag data providers on this page. Would you like to <a href='https://console.turn.com/dp/clientservices/dataProviderMaintain.htm?fromPage=dataProviders'>create one now</a>?"
		}
	],
	'dp-edit': [
		randomASSaying()
	],
	'dc-list': [
		function(){
			var types = $('tr td:nth-child(7)');
			var count = 0, total = 0;
			types.each(function(){
				total++;
				if(this.innerText === "FlexTag"){
					count++;
				}
			});

			return "I only count " + count + " FlexTag data contracts on this page. A few more certainly wouldn't hurt."
		}
	],
	'dc-edit': [
		'It looks like you\'re editing a data contract. Can I assist you by creating a <a target="_blank" href="https://console.turn.com/quest/campaign/adv/insertionOrders.html?">new package in Campaign Suite</a>?'
	],
	'segment-list': [
		randomASSaying()
	],
	'segment-edit': [
		function(){
			var name = $('#segmentName').val();

			var adjectives = ['Periwinkle', 'Quintessential', 'Elusive', "Super"];
			var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
			return "Let's talk about the naming. " + name + "? Why not jazz it up with some eccentric adjectives? How about: <strong>" + adjective + " " + name + "</strong>?";
		}
	],
	'mp-list': [
		randomASSaying()
	],
	'mp-edit': [
		'Turn signals segmentation data to third-party Media Providers via container tags based on synchornized ids. Would you like to <a href="http://www.containerstore.com/tips/index.htm" target="_blank">learn more about containers?</a>.'
	],
	'pivot-report': [
		randomASSaying()
	],
	'as': [
		randomASSaying()
	],





	// HELP
	'help': [
		"It looks like you're lost. You don't need this when you have me. Would you like to navigate away from this page? <a href='#' onclick='history.back()'>\"Yes\"</a> / <a href='#' onclick='history.back()'>\"Sure\"</a>"
	]
}