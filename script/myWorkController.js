var controller = module.exports = function($scope){
	$scope.projects = [
		{
			img: 'resource/image/my-work/collage.png',
			caption: 'Collage.js'
		},
		{
			img: 'resource/image/my-work/thrill.png',
			caption: 'Thrill.js'
		},
		{
			img: 'resource/image/my-work/Queen.png',
			caption: 'Queen.js'
		},
		{
			img: 'resource/image/my-work/tmo-prepaid-work.jpg',
			caption: 'T-Mobile Prepaid'
		},
		{
			img: 'resource/image/my-work/tmo-testdrive.jpg',
			caption: 'T-Mobile Testdrive'
		},
		{
			img: 'resource/image/my-work/flextag.png',
			caption: 'Flextag'
		},
		{
			img: 'resource/image/my-work/find-the-sun.jpg',
			caption: 'Sun Clock'
		},
		{
			img: 'resource/image/my-work/europe-trip.jpg',
			caption: 'Europe Trip 2010'
		}
	];
};
controller.$inject = ['$scope'];
