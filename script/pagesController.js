var controller = module.exports = function($scope, $route, $rootScope, $window){
	$scope.pageTitle = "";
	$scope.goHome = function(){
		if(!$scope.pageTitle) return;
		$window.location.hash = "/"
	};
	$rootScope.$on('$routeChangeSuccess', function(e, newRoute, oldRoute){
		if(newRoute && newRoute.$route) $scope.pageTitle = newRoute.$route.title;
		else $scope.pageTitle = ""
	});

};
controller.$inject = ['$scope', '$route', '$rootScope', '$window'];
