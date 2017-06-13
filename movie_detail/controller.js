(function (angular) {
	"use strict";

	// 创建正在热映模块
	var module = angular.module('moviecat.movie_detail',[
		'ngRoute', // 配置路由就要依赖
		'moviecat.services.http' // jsonp
	])

	// 配置路由模块
	module.config(['$routeProvider',function ($routeProvider) {
		$routeProvider.when('/detail/:id',{
			templateUrl : 'movie_detail/view.html',
			controller : 'MovieDetailController'
		});
	}]);

	// 配置控制器
	module.controller('MovieDetailController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',
		function ($scope,$route,$routeParams,HttpService,AppConfig) {
			$scope.movie = {};
			$scope.loading = true;
			var id = $routeParams.id;
			var apiAddress = AppConfig.detailApiAddress + id;

			// 跨域的方式
			HttpService.jsonp(apiAddress, {}, function(data) {
				$scope.movie = data;
				$scope.loading = false;

				$scope.$apply();
				console.log($scope.movie);
			});
		}
	])
})(angular)
