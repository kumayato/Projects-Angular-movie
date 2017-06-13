/*
 * @Author: iceStone
 * @Date:   2016-02-17 15:15:22
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-02-17 16:05:11
 */

'use strict';

(function(angular) {
	// 由于默认angular提供的异步请求对象不支持自定义回调函数名
	// angular随机分配的回调函数名称不被豆瓣支持
	var http = angular.module('moviecat.services.http', []);
	http.service('HttpService', ['$window', '$document', function($window, $document) {
		// url : http://api.douban.com/vsdfsdf -> <script> -> html就可自动执行
		this.jsonp = function(url, data, callback) {

			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				querystring += key + '=' + data[key] + '&';
			}

			// 创建函数名
			var fnSuffix = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_json_cb_' + fnSuffix;

			querystring += 'callback=' + cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;

			// 挂载对象
			$window[cbFuncName] = function (data) {
				callback(data);
				// 调动完毕后清除一下,去掉callback的脚本
				$document[0].body.removeChild(scriptElement);
			}

			// append这一步最后 ，append过后立刻会发送请求，所以append之前回调函数要准备好。
			$document[0].body.appendChild(scriptElement);
		};
	}]);
})(angular);
