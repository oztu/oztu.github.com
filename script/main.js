require('jquery/jquery.js');
require('../resource/bootstrap.min.js');
require('angular/angular.js');
require('../resource/angularstrap.js');

var app = angular.module('oztu', ['$strap.directives']);
app.controller('pages', require('./pagesController.js'));
app.controller('navigation', require('./navigationController.js'));

app.value('$anchorScroll', angular.noop); 

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.otherwise({
		templateUrl: 'post/about-me/index.htm'
	}).when('/collage.js', {
		templateUrl: 'post/collagejs/index.htm'
	}).when('/samelove.us', {
		templateUrl: 'post/samelove/index.htm'
	}).when('/thrill.js', {
		templateUrl: 'post/thrilljs/index.htm'
	}).when('/queen.js', {
		templateUrl: 'post/queenjs/index.htm'
	}).when('/flextag', {
		templateUrl: 'post/flextag/index.htm'
	}).when('/t-mobile-prepaid', {
		templateUrl: 'post/t-mobile-prepaid/index.htm'
	}).when('/t-mobile-test-drive', {
		templateUrl: 'post/t-mobile-test-drive/index.htm'
	}).when('/sun-clock', {
		templateUrl: 'post/sun-clock/index.htm'
	}).when('/europe-trip-2010', {
		templateUrl: 'post/europe-trip-2010/index.htm'
	}).when('/p', {
		templateUrl: 'post/p/index.htm'
	});
}]);