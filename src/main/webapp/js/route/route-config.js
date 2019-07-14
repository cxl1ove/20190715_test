/**
 * 模块说明：主模块（Main）模块。
 * 依赖说明：依赖四个模块（TreeModule、MainContentModule、CMDContentModule、ui.router）
 * 主要内容：一个路由配置。
 * 功能实现：页面路由管理。
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.13 }}
 */
var mainModule = angular.module('MainModule', ['ui.router', 'TreeModlue', 'MainContentModule', 'CMDContentModule', 'HistoryContentModule', 'ngAnimate', 'ngWebSocket']);
/**
 * 函数说明：载入网络目录。
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 */
mainModule.run(['$rootScope', 'dirDataService', '$http', function ($rootScope, dirDataService, $http) {
	/*************************************/
	/* 获取 dir 数据，写入 $rootScope 中 */
	/*************************************/
	dirDataService.setURL('././data/IOT_DIR.json');
	dirDataService.getDIR()
		.then(function (dirData) {
			$rootScope._dirData = dirData.data;
		}, function (error) {
			console.log(error);
		});
	$rootScope._lineData = {
			"_line": [],
			"31": [[[], [], [], [], []], []],
			"25": [[[], [], [], [], []], []],
			"num": 0
		};
}]);

/* AngularJS 路由管理 */
mainModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');
	$stateProvider
		.state('index', {
			url: '/index',
			views: {
				'': {
					templateUrl: 'tpl/manage/manage-home.html'
				},
				'manage-head@index': {
					templateUrl: 'tpl/application-head.html'
				},
				'manage-body-tree@index': {
					templateUrl: 'tpl/application-tree.html'
				},
				'manage-body-main@index': {
					templateUrl: 'tpl/manage/manage-body-main.html'
				},
				'manage-cmd@index': {
					templateUrl: 'tpl/application-cmd.html'
				}
			}
		})
		.state('history', {
			url: '/history',
			views: {
				'': {
					templateUrl: 'tpl/history/history-home.html'
				},
				'history-head@history': {
					templateUrl: 'tpl/application-head.html'
				},
				'history-body-tree@history': {
					templateUrl: 'tpl/application-tree.html'
				},
				'history-body-main@history': {
					templateUrl: 'tpl/history/history-body-main.html'
				},
				'history-body-search@history': {
					templateUrl: 'tpl/history/history-body-search.html'
				}
			}
		})
		/*.state('manage', {
			url: '/manage',
			views: {
				'': {
					templateUrl: 'page/manage-home.html'
				},
				'manage-title@manage': {
					templateUrl: 'page/manage-title.html'
				},
				'manage-tree@manage': {
					templateUrl: 'page/manage-tree.html'
				},
				'manage-table@manage': {
					templateUrl: 'page/manage-table.html'
				}
			}
		})*/
}]);