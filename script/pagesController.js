var controller = module.exports = function($scope, $route, $rootScope){
	$scope.pageTitle = "";
	$rootScope.$on('$routeChangeSuccess', function(e, newRoute, oldRoute){
		if(newRoute && newRoute.$route) $scope.pageTitle = newRoute.$route.title;
		else $scope.pageTitle = ""
	});

};
controller.$inject = ['$scope', '$route', '$rootScope'];
