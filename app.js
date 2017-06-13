(function (angular) {
	"use strict";

	// 创建模块
	var module = angular.module('moviecat',[
		'ngRoute',
		'moviecat.movie_detail',
		'moviecat.movie_list',
		'moviecat.directive.auto_focus' // 点击切换active
	]);

	// 为模块定义一些常量
	module.constant('AppConfig',{
		pageSize: 10,
		listApiAddress: 'http://api.douban.com/v2/movie/',
		detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
	})

	// 配置模块的路由
	module.config(["$routeProvider",function($routeProvider) {
		$routeProvider.otherwise({
			redirectTo : '/in_theaters/1'
		})
	}]);

	// 配置控制器，实现搜索功能
	module.controller("SearchController",[
			"$scope",
			"$route",
			function ($scope,$route) {
				$scope.input = ''; // 用来存储表单传来的值
				$scope.search = function () {
					// console.log($scope.input);
					$route.updateParams({
						category : 'search',
						q : $scope.input
					})
				}
		}]);

})(angular)

/* 方法一
 module.controller("currentList",["$scope","$location",function ($scope,$location) {
 // 因为$watch只能监视$scope上的对象，所以要先把$location对象挂在$scope上
 $scope.$location = $location;
 console.log($scope.$location)

 $scope.$watch('$location.path()', function(now) {
 if (now.startsWith('/in_theaters')) {
 $scope.type = 'in_theaters';
 }
 else if (now.startsWith('/coming_soon')) {
 $scope.type = 'coming_soon';
 }
 else if (now.startsWith('/top250')) {
 $scope.type = 'top250';
 };
 console.log($scope.type);
 });
 }])
 */
