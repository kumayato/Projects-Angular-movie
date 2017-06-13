/**
 * Created by Administrator on 2017/6/8 0008.
 */
(function (angular) {
	"use strict";

	angular.module('moviecat.directive.auto_focus',[])
		.directive('autoFocus',["$location",function ($location) {

			return{
				restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				link : function ($scope,iElm,iAttrs,controller) {

					var aLink = iElm.children().attr('href');
					var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
					// console.log(type);
					// /in_theaters

					$scope.$location = $location;
					$scope.$watch('$location.path()',function (now) {


						if(now == '/search/1'){
							iElm.parent().children().removeClass('active');
						}
						else if(now.startsWith(type)) {
							console.log(iElm); // iElm为当前点击的那一个
							iElm.parent().children().removeClass('active');
							iElm.addClass('active');
							// console.log(iElm)
						}
					});
				}
			}
		}])
})(angular)
