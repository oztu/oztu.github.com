require('jquery/jquery.js');
require('../resource/bootstrap.min.js');
require('angular/angular.js');
require('../resource/angularstrap.js');

var app = angular.module('oztu', ['$strap.directives']);
app.controller('pages', require('./pagesController.js'));

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.otherwise({
		templateUrl: 'template/index.htm'
	}).when('/collage.js', {
		templateUrl: 'template/collage.js.htm',
		title:"Collage.js"
	}).when('/thrill.js', {
		templateUrl: 'template/thrill.js.htm',
		title:"Thrill.js"
	}).when('/queen.js', {
		templateUrl: 'template/queen.js.htm',
		title:"Queen.js"
	}).when('/flextag', {
		templateUrl: 'template/flextag.htm',
		title:"Flextag"
	}).when('/t-mobile-prepaid', {
		templateUrl: 'template/tmo-prepaid.htm',
		title:"T-Mobile Prepaid Site"
	}).when('/t-mobile-testdrive', {
		templateUrl: 'template/tmo-testdrive.htm',
		title:"T-Mobile Testdrive"
	}).when('/sun-clock', {
		templateUrl: 'template/sun-clock.htm',
		title:"Sun Clock"
	}).when('/europe-trip-2010', {
		templateUrl: 'template/europe-trip-2010.htm',
		title:"My Trip to Europe in 2010"
	});
}]);