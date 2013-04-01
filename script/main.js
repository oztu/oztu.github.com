require('jquery/jquery.js');
require('../resource/bootstrap.min.js');
require('angular/angular.js');
require('../resource/angularstrap.js');

var app = angular.module('oztu', ['$strap.directives']);
app.controller('myWork', require('./myWorkController.js'));
