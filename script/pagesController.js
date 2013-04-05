var controller = module.exports = function($scope, $location, $rootScope, $window){
	$rootScope.$on('$routeChangeSuccess', function(e, newRoute, oldRoute){
		if($location.path() !== "/navigation"){
			$scope.navExpanded = false;	
		} else {
			$scope.navExpanded = true;	
		}
	});
};
controller.$inject = ['$scope', '$location', '$rootScope', '$window'];