(function (angular) {
	"use strict";
	// 创建模块
	var module = angular.module('moviecat.movie_list',[
		'ngRoute',
		'moviecat.services.http' // jsonp模块
	]);

	// 配置模块的路由
	// 路由中设置分页参数位置
	module.config(["$routeProvider",function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);

	// 创建一个控制器
	module.controller('MovieListController',[
		"$scope",
		"$route",
		"$routeParams",
		"HttpService",
		'AppConfig',
		function ($scope,$route,$routeParams,HttpService,AppConfig) {
			// 每一页的条数
			var count = AppConfig.pageSize;
			// 当前是第几页
			var page = parseInt($routeParams.page);
			// console.log(page)
			// 当前页从哪里开始
			var start = (page - 1) * count;

			// 开场动画是否显示
			$scope.loading = true;

			// 初始化数据
			$scope.subjects = []; // 储存返回的数据data
			$scope.title = '正在加载中...'; // 板块标题
			$scope.message = ""; // 数据加载失败的提示
			$scope.totalCount = 0; // 总条数
			$scope.totalPages = 0; // 总页数
			$scope.currentPage = page; // 当前的页数

			HttpService.jsonp(AppConfig.listApiAddress + $routeParams.category,
				// $routeParams数据来源：1.路由匹配出来的 2.?后面的参数
				{
					start : start,
					count : count,
					q : $routeParams.q  // 路由中匹配
				},
				function (data) {
				// console.log(data);
				$scope.title = data.title;
				$scope.subjects = data.subjects;
				$scope.totalCount = data.total;
				$scope.totalPages = Math.ceil($scope.totalCount / count);
				$scope.loading = false;  // 开场动画是否显示
				// apply()的作用是让指定的表达式重新同步,不传参数同步所有值
				$scope.$apply();

			});

			// 点击上一页下一页事件

			$scope.go = function (page) {
				if (page >=1 && page <= $scope.totalPages){
					// $route.updateParams() 更改route中page的参数
					$route.updateParams({page : page});
				};
			}
	}]);

})(angular)



/*****************************************
 // Angular中使用跨域请求的方式,使用server中的$http方法实现跨域请求，但是豆瓣api不支持，所有自己手写jsonp

 // 在Angular中使用JSONP的方式做跨域请求，
 // 就必须给当前地址加上一个参数 callback=JSON_CALLBACK
 // JSON_CALLBACK在进行跨域请求时会替换成一个随机的函数名
 var doubanApiAdress = 'http://api.douban.com/v2/movie/in_theaters';

 // 主文件所在位置为标准的绝对路径
 $http.jsonp(doubanApiAdress + '?callback=JSON_CALLBACK').then(function (response) {

			// 此处代码是异步请求完成之后才执行（需要等一段时间）
			if(response.status == 200){
				$scope.subjects = response.data.subjects;
			}else {
				$scope.message = "没有获取数据"
			}

		},function (err) {
			console.log(err);
		});

 *************************************************/
