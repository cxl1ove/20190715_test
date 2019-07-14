/**
 * 模块说明：树型边侧栏（Tree）模块。
 * 主要内容：两个服务（getTreeDataService、createTreeService）、三个指令（createTree、openClose、closeOpen）、一个控制器（treeCtrl）。
 * 功能实现：用户与边侧栏的交互功能。
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 */
var treeModule = angular.module('TreeModlue', ['MainContentModule']);
/**
 * Ajax 服务，获取树型（Tree）目录 JSON 数据
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 * @return   {object}          返回两个对外接口函数：1.getTreeData 2.setUrl
 */
treeModule.factory('getTreeDataService', ['$http', function ($http) {
	var treeUrl = 'file:///C:/Users/LELE/Desktop/%E9%A1%B9%E7%9B%AE/project/SSH_Project/New_1/data/testdata.json';
	var setUrl = function (url) {
		treeUrl = url;
	}
	var getTreeData = function () {
		return $http({
			url: treeUrl,
			method: 'GET'
		});
	}
	return {
		getTreeData: getTreeData,
		setUrl: setUrl
	};
}]);
/**
 * 建立树型目录服务，通过接收到的树型 JSON 数据，来建立树型目录。（如果不是没有类似插件，老子才不想自己写） (#￣～￣#)
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 * @return   {object}          返回两个对外接口函数：1.getTree 2.addTreeListener
 */
treeModule.factory('createTreeService', ['addTabService', 'addTableService', function (addTabService, addTableService) {
	var dirs = [], dir = '', cacheActive = [angular.element('#treeMenu').find('li'), 0];
	var getTree = function (tEle, data) {
		for (var i = 0, length_data = data.length; i < length_data; i++) {
			if (data[i].nodes.length !== 0) {
				var uls = [],
					ul = '';
				/* 这里可以优化，懒得去写了 (* ￣︿￣) */
				for (var l = 0, length_node = data[i].nodes.length; l < length_node; l++) {
					uls[l] = '<li><a href="" id="' + data[i].nodes[l].id + '"><i class="fa fa-angle-double-right"></i> ' + data[i].nodes[l].text + '</a></li>';
				}
				for (var m of uls) {
					ul += m;
				}
				dirs[i] = '<li open-close><a class="dropdown-toggle"><i class="fa fa-' + data[i].icon + '" aria-hidden="true"></i><span>  ' + data[i].text + '</span><b class="arrow fa fa-angle-down"></b></a><ul class="submenu">'
						  + ul + '</ul></li>';
			} else {
				dirs[i] = '<li><a class="dropdown-toggle"><i class="fa fa-' + data[i].icon + '" aria-hidden="true"></i><span>' + data[i].text + '</span></a></li>'
			}
		}
		for (var li of dirs) {
			dir += li;
		}
		var tree = angular.element(dir);
		var firstLi = tEle.find('li');
		firstLi.after(dir);
		return tree;
	}
	var addTreeListener = function (tEle) {
		
	}
	return {
		getTree: getTree,
		addTreeListener: addTreeListener
	};
}])
/**
 * 动态建立树型（Tree）目录，通过指令实现该功能（create-tree）
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 * @return   {undefined}                    
 */
treeModule.directive('createTree', ['getTreeDataService', 'createTreeService', function (getTreeDataService, createTreeService) {
	return {
		restrict: 'A',
		compile: function (tEle, tAttrs) {
			var tree;
			getTreeDataService.getTreeData()
				.then(function (treeData) {
					tree = createTreeService.getTree(tEle, treeData.data);
					createTreeService.addTreeListener(tEle);
				}, function (error) {
					console.log(error);
				})
			return function (scope, iElement, iAttrs) {
				/* compile阶段异步回调，在执行链接函数时 DOM 还没有建立好 <(－︿－)> */
			}
		}
	};
}])
/**
 * 隐藏与显示边侧栏的 JS 功能实现，通过指令来操作（close-open）。
 * 已经添加了动画效果在 transition.css 中
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 * @return   {undefined}          
 */
treeModule.directive('closeOpen', [function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function (event) {
				event.preventDefault();
				if (iElement.parent().hasClass('menu-min')) {
					iElement.parent().removeClass('menu-min');
					angular.element('#main-content').css('margin-left', '190px');
					scope.close = true;
				} else {
					scope.close = false;
				}
				if (!scope.close) {
					iElement.parent().addClass('menu-min');
					angular.element('#main-content').css('margin-left', '43px');
				}
			});
		}
	};
}]);
/**
 * 树形目录的打开效果 JS 功能实现代码，通过指令来操作（open-close）
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 * @return   {undefined}          
 */
treeModule.directive('openClose', [function () {
	return {
		restrict: 'A',
		scope: {},
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function(event) {
				event.preventDefault();
				var classNames = iElement[0].className.split(' ');
				for (var name of classNames) {
					if (name === 'open') {
						angular.element(iElement[0]).removeClass('open');
						angular.element(iElement[0].children[1]).css('display', 'none');
						break;
					} else {
						angular.element(iElement[0]).addClass('open');
						angular.element(iElement[0].children[1]).css('display', 'block');
					}
				}
			});
		}
	};
}]);

/**
 * 树形目录点击事件添加，通过指令来操作（active-tree）
 * @Author   吴嘉文
 * @DateTime {{ 2017.6.13 }}
 * @return   {undefined}          
 */
treeModule.directive('activeTree', [function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function(event) {
				var element = angular.element(event.currentTarget);
				var parent = element.parent();
				for (var i = 0, length = parent.find('li').length; i < length; i++) {
					if (parent.find('li')[i].className == 'active') {
						angular.element(parent.find('li')[i]).removeClass('active');
					}
				}
				element.addClass('active');
			});
		}
	};
}]);
treeModule.controller('treeCtrl', ['$scope', function ($scope) {
	$scope.close = false;
}]);

/*********************************************************************************/
/*******************************这里是分界线**************************************/
/*********************************************************************************/

/**
 * 模块说明：主体栏（MainContent）模块。(需要改)
 * 主要内容：两个服务（getTreeDataService、createTreeService）、三个指令（createTree、openClose、closeOpen）、一个控制器（treeCtrl）。
 * 功能实现：用户需求的主要功能。
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 */
var mainContentModule = angular.module('MainContentModule', []);
/**
 * Baidu 地图 API 配置服务，并且提供了设置地图容器的 API。（需要修改）
 * @Author   吴嘉文
 * @return   {object}          返回三个对外接口函数：1.setSize 2.setMapConfig 3.getMapConfig
 */
mainContentModule.factory('mapSetService', ['$http', function ($http) {
	var mapConfig = {
		point: {
			y: 114.95720,
			x: 25.936178
		},
		city: '南昌',
		zoom: 15,
		height: '520px'
	}
	/* 這裡要改 */
	var mapURL = '';
	var setURL = function (url) {
		mapURL = url;
	}
	var getOverMapData = function () {
		return $http({
			url: mapURL,
			method: 'GET'
		});
	}
	var getPolygon = function (data) {
		var pointArray = [];
		for (var i = 0, length = data.length; i < length; i++) {
			var point = new BMap.Point(data[i].y, data[i].x)
			pointArray.push(point);
		}
		return pointArray;
	}
	var getInfo = function (left, top, display, area, nodeNum, sensorNum) {
		var tplEl = angular.element('<div style="position: absolute; display: ' + display + '; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px Microsoft YaHei; padding: 5px; left: ' + left + '; top: ' + top + ';">' + area + '号子网<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgb(137,189,27)"></span>节点数量 : ' + nodeNum + '个<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgb(0,136,212)"></span>传感器数量 : ' + sensorNum +'个</div>');
		return tplEl;
	}
	var setSize = function (element, height, width) {
		var height = height || mapConfig.height;
		element.css('height', height);
	}
	var setMapConfig = function (point, city, zoom, height) {
		/* 写个屁，到时候再说 (* ￣︿￣) */
	}
	var getMapConfig = function () {
		return mapConfig;
	}
	return {
		setURL: setURL,
		setSize: setSize,
		setMapConfig: setMapConfig,
		getMapConfig: getMapConfig,
		getOverMapData: getOverMapData,
		getPolygon: getPolygon,
		getInfo: getInfo
	};
}]);
/**
 * IOT_DIR 数据获取服务，并且提供了设置解析 IOT_DIR 数据的 API。
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.17 }}
 * @return   {object}          返回三个对外接口函数：1.setURL 2.getDIR 3.analysisDIR
 */
mainContentModule.factory('dirDataService', ['$http', function ($http) {
	var dirURL = "/list.do";//测试 dir 数据
	var setURL = function (url) {
		dirURL = url;
	}
	var getDIR = function () {
		return $http({
			url: dirURL,
			method: 'GET'
		});
	}
	/******************************/
	/* 根据需求，这个函数需要修改 */
	/******************************/
	var analysisDIR = function (data) {
		
	}
	return {
		setURL: setURL,
		getDIR: getDIR,
		analysisDIR: analysisDIR
	};
}])
/**
 * 动态生成标签（Tab）服务，内置了检测标签重复功能，提供了对外添加标签页 API
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 * @return   {object}          返回两个个对外接口函数：1.addTab 2.showTab
 */
mainContentModule.factory('addTabService', [function () {
	var checkTab = function (name, lis) {
		var repeat = true;
		for(var i = 0, length = lis.length; i < length; i++){
			if (lis[i].textContent == name) {
				repeat = true;
				break;
			} else {
				repeat = false;
			}
		}
		return repeat;
	}
	var addTab = function (name, id) {
		var lis = angular.element('#myTab').find('li');
		var dirs = angular.element('#tabContent').find('[id*="tab-"]');
		if (!checkTab(name, lis)) {
			angular.element(lis[lis.length - 1]).after('<li class=""><a data-toggle="tab" href="#tab-' + id + '">' + name + '</a></li>');
			angular.element(dirs[dirs.length - 1]).after('<div id="tab-' + id + '" class="tab-pane"><div class="row-fluid"><table id="table-' + id + '" class="table table-striped table-bordered table-hover"></table></div></div>')
		}
	}
	var showTab = function (id) {
		angular.element('#myTab a[href="#tab-' + id + '"]').tab('show')
	}
	return {
		addTab: addTab,
		showTab: showTab
	};
}])
/**
 * 日了他妈，明天检查！(* ￣︿￣)
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.15 }}
 * @return   {[type]}          [description]
 */
mainContentModule.factory('addTableService', ['$http', function ($http) {
	var tableUrl = './data/historyTitle.json';
	var tableConfig = {};
	var setTableUrl = function (url) {
		tableUrl = url;
	}
	var setTableConfig = function (config) {
		$.extend(true, tableConfig, config);
	}
	var getTableData = function () {
		return $http({
			url: tableUrl,
			method: 'GET'
		});
	}
	var tableElement;
	/* 这他妈什么玩意！这他妈不改就没有天理了！改天改吧，哎！ (* ￣︿￣) */
	var tableFormatChange = function (tableElement) {
		var divs = tableElement.find('div');
		var table = angular.element(divs[6]).find('table');
		angular.element(divs[0]).removeClass('row');
		angular.element(divs[0]).addClass('row-fluid');
		angular.element(divs[5]).removeClass('row');
		angular.element(divs[5]).addClass('row-fluid');
		angular.element(divs[7]).removeClass('row');
		angular.element(divs[7]).addClass('row-fluid');
		angular.element(divs[1]).removeClass('col-sm-6');
		angular.element(divs[1]).addClass('span6');
		angular.element(divs[3]).removeClass('col-sm-6');
		angular.element(divs[3]).addClass('span6');
		angular.element(divs[8]).removeClass('col-sm-5');
		angular.element(divs[8]).addClass('span5');
		angular.element(divs[10]).removeClass('col-sm-7');
		angular.element(divs[10]).addClass('span7');
		angular.element(divs[6]).removeClass('col-sm-12');
		angular.element(divs[6]).addClass('span12');
		angular.element(divs[11]).removeClass('*');
		angular.element(divs[11]).addClass('dataTables_paginate paging_bootstrap pagination');
		angular.element(table).removeAttr('style')
		console.log(divs);
	} 
	var addTable = function (element) {
		getTableData().then(
			function (tableData) {
				var columns = tableData.data.columns;
				var columnDefs = tableData.data.columnDefs;
				var table = element.dataTable({
					columnDefs: columnDefs,
					columns: columns,
					language: {
						"decimal":        "",
					    "emptyTable":     "加载中...",
					    "info":           "从 _START_ 到 _END_ （总共 _TOTAL_ 条）",
					    "infoEmpty":      "从 0 到 0 （总共 0 条）",
					    "infoFiltered":   "(filtered from _MAX_ total entries)",
					    "infoPostFix":    "",
					    "thousands":      ",",
					    "lengthMenu":     "每页显示 _MENU_ 条",
					    "loadingRecords": "加载中...",
					    "processing":     "Processing...",
					    "search":         "表内查询:",
					    "zeroRecords":    "No matching records found",
					    "paginate": {
					        "first":      "第一页",
					        "last":       "最后一条",
					        "next":       "下一页",
					        "previous":   "上一页"
					    },
					    "aria": {
					        "sortAscending":  ": activate to sort column ascending",
					        "sortDescending": ": activate to sort column descending"
					    }
					},
					  
				});
				tableFormatChange(angular.element('#table_report_wrapper'));
				tableElement = table;
				addLoadingLayer(angular.element('#table_report_wrapper'));
		}, function (error) {
			console.log(error);
		})
	};
	var addData = function (data) {
		console.log(data);
		tableElement.fnClearTable();
		if (data.SS_DTSearchList.length != 0) {
			tableElement.fnAddData(data.SS_DTSearchList);
		} else {
			alert("该时间段内无数据！");
		}
	};
	var addLoadingLayer = function (element) {
		element.addClass("position-relative");
		element.append('<div class="widget-box-layer"><i class="fa fa-spinner fa-spin fa-4x black"></i></div>');
	}
	var cancelLoadingLayer = function (element) {
		element.removeClass("position-relative");
		element.find('.widget-box-layer').remove();
	}
	return {
		setTableUrl: setTableUrl,
		setTableConfig: setTableConfig,
		addTable: addTable,
		addData: addData,
		addLoadingLayer: addLoadingLayer,
		cancelLoadingLayer: cancelLoadingLayer
	};
}])
/**
 * 在地图容器上加载地图（Map），通过指令实现该功能（add-map），如果想问为什么通过指令实现，那是因为对DOM的操作应该放在指令中。 (#￣～￣#)
 * @Author   吴嘉文
 * @DateTime {{ 2017.3.14 }}
 * @return   {undefined}                
 */
mainContentModule.directive('addMap', ['mapSetService', '$timeout', 'lineService', 
	function (mapSetService, $timeout, lineService) {
	return {
		restrict: 'A',
		scope: true,
		compile: function (tEle, tAttrs) {
			var mapConfig = mapSetService.getMapConfig();
			mapSetService.setSize(tEle);
			if (tAttrs.addMap !== 'node-info') {
				var map = new BMap.Map(tEle[0].id, {mapType: BMAP_SATELLITE_MAP});
				map.disableDragging();/* 禁止地图拖拽 */
				map.disableScrollWheelZoom();/* 禁用滚轮放大缩小 */
				map.disableDoubleClickZoom();/* 禁用双击放大 */
				map.disableKeyboard();/* 禁用键盘操作 */
				map.centerAndZoom(new BMap.Point(mapConfig.point.y, mapConfig.point.x), mapConfig.zoom); 
				tEle.append('<div id="map-node-info"></div>');
				tEle.append('<div id="map-area-info"></div>');
				tEle._BMAP = map;
				tEle._BMAP._polyon = [];
			} else {
				var map = new BMap.Map(tEle[0].id);   
				map.enableScrollWheelZoom();/* 启用滚轮放大缩小 */
				map.setMapStyle({
					styleJson:[
						{
		                    "featureType": "land",
		                    "elementType": "all",
		                    "stylers": {"color": "#d9ead3"}
		          		},{
							"featureType": "poi",
							"elementType": "all",
							"stylers": {"visibility": "off"}
						},{
		                    "featureType": "subway",
		                    "elementType": "all",
		                    "stylers": {"visibility": "off"}
				        }
					]
				});
				map.centerAndZoom(new BMap.Point(mapConfig.point.y, mapConfig.point.x), mapConfig.zoom); 
				tEle._BMAP = map;
				tEle._sub = [];
				tEle._node = [];
			}
			map.setCurrentCity(mapConfig.city);
			/****************************************/
			/* 返回鏈接函數：添加地圖覆蓋物以及事件 */
			/****************************************/
			return function (scope, iElement, iAttrs) {
				scope._BMAP.push(iElement);
				if (iAttrs.addMap !== 'node-info') {
					/********************************/
					/* 25号在区域的覆盖物及相关事件 */
					/********************************/
					mapSetService.setURL('./data/overmap_1.json');
					mapSetService.getOverMapData()
						.then(function (overMapData) {
							var nodes_num_2 = scope._dirData.IOT_DIR.NETS[0].NET[0].SUBNET[1].NODESIZE[0];
							var map_node_info = iElement.find('#map-node-info');
							var sub_point = new BMap.Point(scope._dirData.IOT_DIR.NETS[0].NET[0].SUBNET[1].CVRG_RU_Y[0], scope._dirData.IOT_DIR.NETS[0].NET[0].SUBNET[1].CVRG_RU_X[0]);
							var polygon_2 = new BMap.Circle(sub_point, 500, {strokeColor: "#71B7FD", strokeWeight: 1, fillColor: "#71B7FD", strokeOpacity: 0.5});
							var icon_sub = new BMap.Icon("./img/net.png", new BMap.Size(30, 30));
							var marker_sub = new BMap.Marker(sub_point, {icon: icon_sub});
							// var polygon_2 = new BMap.Polygon(mapSetService.getPolygon(overMapData.data), 
							// 	{
							// 		strokeColor:"#71B7FD", 
							// 		strokeWeight: 1,
							// 		fillColor: "#71B7FD",
							// 		strokeOpacity:0.5
							// 	});
							iElement._BMAP.addOverlay(marker_sub);
							iElement._BMAP.addOverlay(polygon_2);
							iElement._BMAP._polyon.push(polygon_2);
							/********************/
							/* 添加鼠标移动事件 */
							/********************/
							polygon_2.addEventListener("mouseover", function (event) {
								polygon_2.setFillColor("#ccff00");
								iElement.mousemove(function(e) {
									/*************************************/
									/* 这里加这两行是应为有个BUG以后修改 */
									/*************************************/
									var map_area_info = iElement.find('#map-area-info');
									map_area_info.empty();
									/************************************/
									/***************分界线***************/
									/************************************/
									map_node_info.empty();
									map_node_info.append(mapSetService.getInfo(e.offsetX + 290 + "px", e.offsetY + 280 + "px", "block", "25", nodes_num_2));
								});
							});
							polygon_2.addEventListener("mouseout", function (event) {
								polygon_2.setFillColor("#71B7FD");
								map_node_info.empty();
								map_node_info.append(mapSetService.getInfo(event.offsetX + 280 + "px", event.offsetY + 320 + "px", "none"));
								iElement.unbind("mousemove");
							});
							/********************/
							/* 鼠标点击区域事件 */
							/********************/
							polygon_2.addEventListener("click", function(event){
								map_node_info.empty();
								var point = sub_point;
								scope._BMAP[0]._BMAP.setZoom(16);
								/****************************************/
								/* 设置延迟函数，体现动画效果，平滑效果 */
								/****************************************/
								$timeout(function () {
									scope._BMAP[0]._BMAP.panTo(point);
								}, 300);
								/****************/
								/* 提示区域消息 */
								/****************/ 
								var icon = new BMap.Icon("./img/flag.png", new BMap.Size(30,30));
								var marker = new BMap.Marker(point, {icon: icon, offset: new BMap.Size(7, -5)});  // 创建标注
								iElement._BMAP.addOverlay(marker); 
	 							marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
	 							/******************************/
	 							/* 标记弹跳效果，与区域信息栏 */
	 							/******************************/
	 							$timeout(function () {
									marker.setAnimation();    
									var opts = {
										width : 150, 
										height: 100, 
										title : "25号区域信息" ,
										offset: new BMap.Size(10, -5)
									}
									var infoWindow = new BMap.InfoWindow('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgb(137,189,27)"></span>节点数量 : ' + nodes_num_2 + '个<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgb(0,136,212)"></span>传感器数量 : 5个', opts);  // 创建信息窗口对象        									
									$timeout(function () {iElement._BMAP.openInfoWindow(infoWindow, point); }, 500);
								}, 1000);
								$timeout(function () {
									iElement._BMAP.removeOverlay(marker); 
									iElement._BMAP.closeInfoWindow();
									iElement._BMAP.panTo(new BMap.Point(114.95720, 25.936178));
								}, 5000);
								/**************************/
								/* 区域连接到表的相关操作 */
								/**************************/
								var option = lineService.option
								option.title.text = "25号区域";
								option.xAxis[0].data = scope._lineData[25][1];
								for (let i = 0, length = 5; i < length; i++) {
									option.series[i].data = scope._lineData[25][0][i];
								}
								// lineService.setOption(option);
								scope._lineData._line[0].setOption(option);
							});
						}, function (error) {
							console.log(error);
						})
					/********************************/
					/* 30号在区域的覆盖物及相关事件 */
					/********************************/
					/*mapSetService.setURL('./data/overmap_1.json');
					mapSetService.getOverMapData()
						.then(function (overMapData) {
							var nodes_num_1 = scope._dirData.IOT_DIR.NETS[0].NET[0].SUBNET[0].NODESIZE[0];
							var map_area_info = iElement.find('#map-area-info');
							var polygon_1 = new BMap.Polygon(mapSetService.getPolygon(overMapData.data), 
								{
									strokeColor:"#71B7FD", 
									strokeWeight: 1,
									fillColor: "#71B7FD",
									strokeOpacity:0.5
								});
							iElement._BMAP.addOverlay(polygon_1); 
							iElement._BMAP._polyon.push(polygon_1);
							polygon_1.addEventListener("mouseover", function (event) {
								polygon_1.setFillColor("#ccff00");
								iElement.mousemove(function(event) {
									map_area_info.empty();
									map_area_info.append(mapSetService.getInfo(event.offsetX + 150 + "px", event.offsetY + 170 + "px", "block", "31"));
								});
							});
							polygon_1.addEventListener("mouseout", function (event) {
								polygon_1.setFillColor("#71B7FD");
								map_area_info.empty();
								map_area_info.append(mapSetService.getInfo(event.offsetX + "px", event.offsetY + "px", "none"));
							});
						}, function (error) {
							console.log(error);
						})*/
				} else {
					/*****************************************************/
					/* 对 add-map="node-info" 添加节点图标，添加子网图标 */
					/*****************************************************/
					for (let i = 0, length = scope._dirData.IOT_DIR.NETS[0].NETSIZE[0]; i < length; i++) {
						let net = scope._dirData.IOT_DIR.NETS[0].NET[i];
						for (let j = 0, length = net.SUBNETSIZE[0]; j < length; j++) {
							let subnet = net.SUBNET[j];
							let sub_point = new BMap.Point(subnet.CVRG_RU_Y[0], subnet.CVRG_RU_X[0]); 
							let icon_sub = new BMap.Icon("./img/net.png", new BMap.Size(30, 30));
							let marker_sub = new BMap.Marker(sub_point, {icon: icon_sub});
							let circle_sub = new BMap.Circle(sub_point, 500, {strokeColor:"blue", strokeWeight:1, strokeOpacity:0.5});
							iElement._sub.push(marker_sub);
							iElement._sub.push(circle_sub);
							iElement._BMAP.addOverlay(marker_sub);
							iElement._BMAP.addOverlay(circle_sub);
							for (let k = 0, length = subnet.NODESIZE[0]; k < length; k++) {
								let node = subnet.NODE[k];
								let node_point = new BMap.Point(node.LCTN_Y[0], node.LCTN_X[0]); 
								let icon_node = new BMap.Icon("./img/net.png", new BMap.Size(30, 30));
								let marker_node = new BMap.Marker(node_point, {icon: icon_node});
								iElement._node.push(marker_node);
								iElement._BMAP.addOverlay(marker_node);
							}
						}
					}
					/**********************************************/
					/* 初始 zoom 为 15 隐藏节点图标，显示子网图标 */
					/**********************************************/
					if (iElement._BMAP.getZoom() <= 15) {
						for (var i = 0; i < iElement._node.length; i++) {
							iElement._node[i].hide();
						}
					}
					/********************************************************************************************/
					/* zoom 大于等于 15 隐藏子网图标，显示节点图标；zoom 小于等于 15 隐藏节点图标，显示子网图标 */
					/********************************************************************************************/
					iElement._BMAP.addEventListener('zoomend', function (event) {
						if (iElement._BMAP.getZoom() <= 15) {
							for (var i = 0; i < iElement._sub.length; i++) {
								iElement._sub[i].show();
							}
							for (var i = 0; i < iElement._node.length; i++) {
								iElement._node[i].hide();
							}
						} else {
							for (var i = 0; i < iElement._sub.length; i++) {
								iElement._sub[i].hide();
							}
							for (var i = 0; i < iElement._node.length; i++) {
								iElement._node[i].show();
							}
						}
					});
				}
			}
		}
	};
}]);
/**
 * 生成折线图，参数配置。setOption函数还需要修改！
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.12 }}
 * @return   {undefined}                
 */
mainContentModule.factory('lineService', [function () {
	/**********************************/
	/* 个人感觉这里要改，可以写的更好 */
	/**********************************/
	var myChartElement;
	var option_line = {
	    backgroundColor: '#fff',
    	title: {
	        text: '',
	        textStyle: {
	            fontWeight: 'normal',
	            fontSize: 16,
	            color: '#57617B'
	        },
	        left: '3%'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            lineStyle: {
	                color: '#57617B'
	            }
	        }
	    },
	    legend: {
	        icon: 'rect',
	        itemWidth: 14,
	        itemHeight: 5,
	        itemGap: 13,
	        data: ['温度', 'PH值', '浊度', '溶解氧', '电导率'],
	        right: '4%',
	        textStyle: {
	            fontSize: 12,
	            color: '#57617B'
	        },
	        selected: {
			    '温度': true,
			    'PH值': false,
			    '浊度': false,
			    '溶解氧': false,
			    '电导率': false,
			}
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: [{
	        type: 'category',
	        boundaryGap: false,
	        axisLine: {
	            lineStyle: {
	                color: '#57617B'
	            }
	        },
	        data: []
	    }],
	    yAxis: [{
	        type: 'value',
	        name: '摄氏度(℃)',
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            lineStyle: {
	                color: '#57617B'
	            }
	        },
	        axisLabel: {
	            margin: 10,
	            textStyle: {
	                fontSize: 14
	            }
	        },
	        splitLine: {
	            lineStyle: {
	                color: '#57617B'
	            }
	        }
	    }],
	    series: [{
	        name: '温度',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(139, 188, 103, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(139, 188, 103, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: 'rgb(139, 188, 103)',
	                borderColor: 'rgba(139, 188, 103,0.27)',
	                borderWidth: 12

	            }
	        },
	        data: []
	    }, {
	        name: 'PH值',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(211, 110, 110, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(211, 110, 110, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: 'rgb(211, 110, 110)',
	                borderColor: 'rgba(211, 110, 110,0.2)',
	                borderWidth: 12

	            }
	        },
	        data: []
	    }, {
	        name: '浊度',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(172, 104, 186, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(172, 104, 186, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {

	                color: 'rgb(172, 104, 186)',
	                borderColor: 'rgba(172, 104, 186,0.2)',
	                borderWidth: 12
	            }
	        },
	        data: []
	    },{
	        name: '溶解氧',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(239, 173, 98, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(239, 173, 98, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {

	                color: 'rgb(239, 173, 98)',
	                borderColor: 'rgba(239, 173, 98,0.2)',
	                borderWidth: 12
	            }
	        },
	        data: []
	    },{
	        name: '电导率',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(102, 102, 102, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(102, 102, 102, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {

	                color: 'rgb(102, 102, 102)',
	                borderColor: 'rgba(102, 102, 102,0.2)',
	                borderWidth: 12
	            }
	        },
	        data: []
	    }, ]
	};
	var setOption = function (option) {
		angular.extend(option_line, option);
	}
	var initMyChart = function (element) {
		element.css({
			height: '400px',
			width: angular.element('#tabContent').width()
		});
		var myChart = echarts.init(element[0]);
        myChart.setOption(option_line);
        element._MYCHART = myChart;
        myChartElement = myChart;
	}
	var updataLine = function (option, id) {
		option_line.title.text = id + "号区域",
		option_line.xAxis[0].data  = option[1];
		option_line.series[0].data = option[0][1];
		option_line.series[1].data = option[0][2];
		option_line.series[2].data = option[0][0];
		option_line.series[3].data = option[0][4];
		option_line.series[4].data = option[0][3];
		myChartElement.setOption(option_line);
	};
	return {
		setOption: setOption,
		option: option_line,
		updataLine: updataLine,
		initMyChart: initMyChart
	};
}])
/**
 * 生成仪表盘，参数配置。
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.12 }}
 * @return   {undefined}                
 */
mainContentModule.factory('panService', [function(){
	var panElement = {
			"pan-info-1": null,
			"option_pan_1": option_pan,
			"pan-info-2": null,
			"option_pan_2": option_pan,
			"pan-info-3": null,
			"option_pan_3": option_pan,
			"pan-info-4": null,
			"option_pan_4": option_pan,
			"pan-info-5": null,
			"option_pan_5": option_pan
	};
	var option_pan = {
		    title: {
		        "text": '温度（℃）',
		        "x": '50%',
		        "y": '45%',
		        textAlign: "center",
		        "textStyle": {
		            "fontWeight": 'normal',
		            "fontSize": 12
		        },
		        "subtextStyle": {
		            "fontWeight": 'bold',
		            "fontSize": 14,
		            "color": '#3ea1ff'
		        }
		    },
		    series: [ 
		        {
		            "name": ' ',
		            "type": 'pie',
		            "radius": ['50%', '70%'],
		            "avoidLabelOverlap": false,
		            "startAngle": 225,
		            "color": ["#9f8fc1", "transparent"],
		            "hoverAnimation": false,
		            "legendHoverLink": false,
		            "label": {
		                "normal": {
		                    "show": false,
		                    "position": 'center'
		                },
		                "emphasis": {
		                    "show": true,
		                    "textStyle": {
		                        "fontSize": '30',
		                        "fontWeight": 'bold'
		                    }
		                }
		            },
		            "labelLine": {
		                "normal": {
		                    "show": false
		                }
		            },
		            "data": [{
		                "value": 75,
		                "name": '1'
		            }, {
		                "value": 25,
		                "name": '2'
		            }]
		        }, 
		      {
		            "name": '',
		            "type": 'pie',
		            "radius": ['52%', '68%'],
		            "avoidLabelOverlap": false,
		            "startAngle": 317,
		            "color": ["#fff", "transparent"],
		            "hoverAnimation": false,
		            "legendHoverLink": false,
		            "clockwise": false,
		            "itemStyle":{
		                "normal":{
		                    "borderColor":"transparent",
		                    "borderWidth":"20"
		                },
		                "emphasis":{
		                    "borderColor":"transparent",
		                    "borderWidth":"20"
		                }
		            }
		            ,
		            "z":10,
		            "label": {
		                "normal": {
		                    "show": false,
		                    "position": 'center'
		                },
		                "emphasis": {
		                    "show": true,
		                    "textStyle": {
		                        "fontSize": '30',
		                        "fontWeight": 'bold'
		                    }
		                }
		            },
		            "labelLine": {
		                "normal": {
		                    "show": false
		                }
		            },
		            "data": [{
		                // "value": (100 - value1) * 266 / 360,
		                "name": ''
		            }, {
		                // "value": 100 - (100 - value1) * 266 / 360,
		                "name": ''
		            }
		            ]
		        }
		    ]
	};
	var initOption = function () {
		option_pan = {
			    title: {
			        "text": '温度（℃）',
			        "x": '50%',
			        "y": '45%',
			        textAlign: "center",
			        "textStyle": {
			            "fontWeight": 'normal',
			            "fontSize": 12
			        },
			        "subtextStyle": {
			            "fontWeight": 'bold',
			            "fontSize": 14,
			            "color": '#3ea1ff'
			        }
			    },
			    series: [ 
			        {
			            "name": ' ',
			            "type": 'pie',
			            "radius": ['50%', '70%'],
			            "avoidLabelOverlap": false,
			            "startAngle": 225,
			            "color": ["#9f8fc1", "transparent"],
			            "hoverAnimation": false,
			            "legendHoverLink": false,
			            "label": {
			                "normal": {
			                    "show": false,
			                    "position": 'center'
			                },
			                "emphasis": {
			                    "show": true,
			                    "textStyle": {
			                        "fontSize": '30',
			                        "fontWeight": 'bold'
			                    }
			                }
			            },
			            "labelLine": {
			                "normal": {
			                    "show": false
			                }
			            },
			            "data": [{
			                "value": 75,
			                "name": '1'
			            }, {
			                "value": 25,
			                "name": '2'
			            }]
			        }, 
			      {
			            "name": '',
			            "type": 'pie',
			            "radius": ['52%', '68%'],
			            "avoidLabelOverlap": false,
			            "startAngle": 317,
			            "color": ["#fff", "transparent"],
			            "hoverAnimation": false,
			            "legendHoverLink": false,
			            "clockwise": false,
			            "itemStyle":{
			                "normal":{
			                    "borderColor":"transparent",
			                    "borderWidth":"20"
			                },
			                "emphasis":{
			                    "borderColor":"transparent",
			                    "borderWidth":"20"
			                }
			            }
			            ,
			            "z":10,
			            "label": {
			                "normal": {
			                    "show": false,
			                    "position": 'center'
			                },
			                "emphasis": {
			                    "show": true,
			                    "textStyle": {
			                        "fontSize": '30',
			                        "fontWeight": 'bold'
			                    }
			                }
			            },
			            "labelLine": {
			                "normal": {
			                    "show": false
			                }
			            },
			            "data": [{
			                // "value": (100 - value1) * 266 / 360,
			                "name": ''
			            }, {
			                // "value": 100 - (100 - value1) * 266 / 360,
			                "name": ''
			            }
			            ]
			        }
			    ]
		};
	}
	/* 随机生成的数据 */
	var updataPan = function (data) {
		/* 测试用的随机生成数 */
//		var value = parseInt(Math.random() * 55) + 30,
//        value_ = (100 - value) * 266 / 360;
//	    option.title.subtext = value + "%";
//	    option.series[1].data[0].value = value_;
//	    option.series[1].data[1].value = 100 - value_;
//	    element.setOption(option, true);
	    var length = data[0][0].length;
	    console.log(data);
		for (var i = 1; i <= 5; i++) {
	    	if (i == 1) {
		    	option_pan.title.text = "温度";
				option_pan.series[0].color[0] = "#8BBC67";
		    	option_pan.title.subtext = data[0][1][length - 1];
		        value_ = (30 - data[0][1][length - 1]) * 266 / 360;
		    	option_pan.series[1].data[0].value = value_;
		    	option_pan.series[1].data[1].value = 100 - value_;
		    	panElement["pan-info-1"].setOption(option_pan, true);
		    } else if (i == 2) {
		    	option_pan.title.text = "PH";
				option_pan.series[0].color[0] = "#D36E6E";
		    	option_pan.title.subtext = data[0][2][length - 1];
		    	 value_ = (14 - data[0][2][length - 1]) * 266 / 360;
		    	option_pan.series[1].data[0].value = value_;
		    	option_pan.series[1].data[1].value = 10 - value_;
		    	panElement["pan-info-2"].setOption(option_pan, true);
		    } else if (i == 3) {
		    	option_pan.title.text = "浊度";
				option_pan.series[0].color[0] = "#AC68BA";
				option_pan.title.subtext = data[0][0][length - 1];
		    	value_ = (500 - data[0][0][length - 1]) * 266 / 360;
		    	option_pan.series[1].data[0].value = value_;
		    	option_pan.series[1].data[1].value = 500 - value_;
		    	panElement["pan-info-3"].setOption(option_pan, true);
		    } else if (i == 4) {
		    	option_pan.title.text = "溶解氧";
				option_pan.series[0].color[0] = "#EFAD62";
				option_pan.title.subtext = data[0][4][length - 1];
		    	value_ = (10 - data[0][4][length - 1]) * 266 / 360;
		    	option_pan.series[1].data[0].value = value_;
		    	option_pan.series[1].data[1].value = 10 - value_;
		    	panElement["pan-info-4"].setOption(option_pan, true);
		    } else {
		    	option_pan.title.text = "电导率";
				option_pan.series[0].color[0] = "#666666";
				option_pan.title.subtext = data[0][3][length - 1];
		    	value_ = (500 - data[0][3][length - 1]) * 266 / 360;
		    	option_pan.series[1].data[0].value = value_;
		    	option_pan.series[1].data[1].value = 500 - value_;
		    	panElement["pan-info-5"].setOption(option_pan, true);
		    }
	    }
	}
	var initPan = function (element, tAttrs) {
		var pan_width = angular.element('#tab-home').width() / 6;
		element.css({
			height: '120px',
			width: pan_width
		});
		option_pan.title.text = element.html();
		option_pan.series[0].color[0] = tAttrs.uiPan;
		var myChart = echarts.init(element[0]);
        myChart.setOption(option_pan);
        panElement[tAttrs.id] = myChart;
	}
	return {
		option: option_pan,
		updataPan: updataPan,
		initPan: initPan
	};
}])
/**
 * 生成折线图，通过指令实现该功能（ui-line）。
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.11 }}
 * @return   {undefined}                
 */
mainContentModule.directive('uiLine', ['lineService', function (lineService) {
	return {
		restrict: 'A', 
		compile: function (tEle, tAttrs) {
			lineService.initMyChart(tEle);
			return function (scope, iElement, iAttrs) {
				var option = lineService.option;
				scope._lineData._line.push(iElement._MYCHART);
				iElement._MYCHART.on('legendselectchanged', function(event) {
					/* 修改单击类型 */
					var name_legend = event.name, unit;
					for (var i in event.selected) {
						event.selected[i] = false;
					}
					event.selected[name_legend] = true;
					option.legend.selected = event.selected;
					/* 修改点击后的单位 */
					unit = (name_legend === "温度" ? "摄氏度(℃)" : 
								(name_legend === "PH值" ? "pH值" : 
									(name_legend === "浊度" ? "散射浊度(NTU)" : 
										(name_legend === "溶解氧" ? "毫克每升(mg/L)" :
											(name_legend === "电导率" ? "微西门子每米(μs/m)" : "")))));
					option.yAxis[0].name = unit;
					lineService.setOption(option);
					iElement._MYCHART.setOption(option);
				});
			}
		}
	};
}]);
/**
 * 生成仪表盘，通过指令实现该功能（ui-pan）。
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.12 }}
 * @return   {undefined}                
 */
mainContentModule.directive('uiPan', ['panService', function (panService) {
	return {
		restrict: 'A', 
		compile: function (tEle, tAttrs) {
			panService.initPan(tEle, tAttrs);
			return function (scope, iElement, iAttrs) {

			}
		}
	};
}]);

mainContentModule.controller('mainCtrl', ['$scope', 'dirDataService', '$rootScope', '$http', '$interval', 'lineService', 'panService',
	function ($scope, dirDataService, $rootScope, $http, $interval, lineService, panService) {
	$scope._BMAP = [];
	var pushFlag = true;
	$scope.pushMessage = function () {
		if (pushFlag) {
			$http({
				url: "./messageCp/open.do"
			}).then(function (success) {
				if (success.data != "") {
					$scope.dataChange(success.data);
				}
				pushFlag = true;
			}, function (error) {
				console.log(error)
			});
			pushFlag = false;
		}
		
	}
	$interval($scope.pushMessage, 500);
	$scope.dataChange = function (data) {
		for (var i = 0; i < 5; i++) {
			$rootScope._lineData[data["MessageCp_" + i].SubNet][0][i].push(parseFloat(data["MessageCp_" + i].SSDT_VALUE).toFixed(1));
		}
		$rootScope._lineData[data["MessageCp_0"].SubNet][1].push(data["MessageCp_0"].MsgTime.split(" ")[1]);
		lineService.updataLine($rootScope._lineData[data["MessageCp_0"].SubNet], data["MessageCp_0"].SubNet);
		panService.updataPan($rootScope._lineData[data["MessageCp_0"].SubNet]);
	}}]);
/*********************************************************************************/
/*******************************这里是分界线**************************************/
/*********************************************************************************/

var cmdContentModule = angular.module('CMDContentModule', []);

cmdContentModule.controller('cmdCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
	$scope.cmdType = {
		"type": false,
		"showNET": true,
		"showSUBNET": true,
		"showNODE": true,
		"showTC": true,
		"showCSType": true
	}
	$scope.cmdCSInstall = {
		"showCycle": true,
		"showPower": true,
		"showTime": true
	};
	$scope.cmdData = {
		'cmd_NetID': null,
		'cmd_SubNetID': null,
		'cmd_NodeID': null,
		'cmd_StateTP': null,
		'cmd_PValue': null,
		'cmd_isFlag': null,
		'cmd_paramType': null,
		'cmdType': null
	}
	$scope.cmdIssued = function () {
		$http({
			url: './CMD_Issued',
			method: 'POST',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: "cmd_NetID=" + $scope.cmdData.cmd_NetID + 
				  "&cmd_SubNetID=" + $scope.searchData.cmd_SubNetID + 
				  "&cmd_NodeID=" + $scope.searchData.cmd_NodeID + 
				  "&cmd_StateTP=" + $scope.cmdData.cmd_StateTP + 
				  "&cmd_PValue=" + $scope.cmdData.cmd_PValue +
				  "&cmd_isFlag=" + $scope.cmdData.cmd_isFlag +
				  "&cmd_paramType=" + $scope.cmdData.cmd_paramType +
				  "&cmdType=" + $scope.cmdData.cmdType
		}).then(function (success) {
			console.log(success)
		}, function (error) {
			console.log(error)
		});
	}
}])
/**
 * 命令下发服务，提供基本的样式特效（影藏与显示），以及自动生成网络，子网，节点号。
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.17 }}
 * @return   {object}          返回十个对外接口函数：1.initSelect 2.openTC 3.openRestartSink 4.openInstall 5.addNet 6.addSubnet 7.addNode 8.openCycle 9.openPower 10.openTime
 */
cmdContentModule.factory('selectService', [function(){
	var initSelect = function (scope) {
		scope.cmdType = {
			"type": false,
			"showNET": true,
			"showSUBNET": true,
			"showNODE": true,
			"showTC": true,
			"showCSType": true,
		}
	}
	var openTC = function (scope) {
		scope.cmdType = {
			"type": false,
			"showNET": false,
			"showSUBNET": false,
			"showNODE": false,
			"showTC": false,
			"showCSType": true,
		}
	}
	var openRestartSink = function (scope) {
		scope.cmdType = {
			"type": false,
			"showNET": true,
			"showSUBNET": true,
			"showNODE": true,
			"showTC": true,
			"showCSType": true,
		}
	}
	var openInstall = function (scope) {
		scope.cmdType = {
			"type": false,
			"showNET": false,
			"showSUBNET": false,
			"showNODE": false,
			"showTC": true,
			"showCSType": false,
		}
	}
	var openCycle = function (scope) {
		scope.cmdCSInstall = {
			"showCycle": false,
			"showPower": true,
			"showTime": true
		}
	}
	var openPower = function (scope) {
		scope.cmdCSInstall = {
			"showCycle": true,
			"showPower": false,
			"showTime": true
		}
	}
	var openTime = function (scope) {
		scope.cmdCSInstall = {
			"showCycle": true,
			"showPower": true,
			"showTime": false
		}
	}
	var closeCSInstall = function (scope) {
		scope.cmdCSInstall = {
			"showCycle": true,
			"showPower": true,
			"showTime": true
		}
	}
	/******************************************************/
	/* 自动匹配网络，子网，节点号。干他娘！应该问题不大！ */
	/******************************************************/
	var addNet = function (element, DIR) {
		var nets = DIR.NETS[0];
		element.empty();
		element.append('<option value=""></option>');
		for (let i = 0, length = nets.NETSIZE[0]; i < length; i++) {
			let net = nets.NET[i];
			element.append('<option value="' + net.NTID[0] + '">' + net.NTID[0] + '号网络</option>');
		}
	}
	var addSubnet = function (element, DIR, NET) {
		var nets = DIR.NETS[0];
		element.empty();
		element.append('<option value=""></option>');
		for (let i = 0, length = nets.NETSIZE[0]; i < length; i++) {
			let net = nets.NET[i];
			if (net.NTID[0] === NET) {
				for (let j = 0, length = net.SUBNETSIZE[0]; j < length; j++) {
					let subnet = net.SUBNET[j];
					element.append('<option value="' + subnet.SBNTID[0] + '">' + subnet.SBNTID[0] + '号子网</option>');
				}
			}
		}
	}
	var addNode = function (element, DIR, NET, SUBNET) {
		var nets = DIR.NETS[0];
		element.empty();
		element.append('<option value=""></option>');
		for (let i = 0, length = nets.NETSIZE[0]; i < length; i++) {
			let net = nets.NET[i];
			if (net.NTID[0] === NET) {
				for (let j = 0, length = net.SUBNETSIZE[0]; j < length; j++) {
					let subnet = net.SUBNET[j];
					if (subnet.SBNTID[0] === SUBNET) {
						for (let k = 0, length = subnet.NODESIZE[0]; k < length; k++) {
							let node = subnet.NODE[k];
							element.append('<option value="' + node.NDPHDR[0] + '">' + node.NDDSPT[0] + '号节点</option>');
						}
					}
				}
			}
		}
	}
	return {
		initSelect: initSelect,
		openTC: openTC,
		openRestartSink: openRestartSink,
		openInstall: openInstall,
		addNet: addNet,
		addSubnet: addSubnet,
		addNode: addNode,
		openCycle: openCycle,
		openPower: openPower,
		openTime: openTime,
		closeCSInstall: closeCSInstall
	};
}])
/**
 * 生成下拉菜单，通过指令实现该功能（ui-chosen）。
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.17 }}
 * @return   {undefined}                
 */
cmdContentModule.directive('uiChosen', ['$rootScope', 'selectService', '$compile', function ($rootScope, selectService, $compile) {
	return {
		restrict: 'A',
		compile: function (iElement, iAttrs) {
			if (iAttrs.id == "form-field-select-2") {
				selectService.addNet(iElement, $rootScope._dirData.IOT_DIR);
			}
			iElement.chosen({disable_search_threshold: 0, allow_single_deselect: true});
			return function (scope, iElement, iAttrs) {
				iElement.change(function (event, selected) {
					if (iAttrs.id == "form-field-select-1") {
						/****************************************************/
						/* 命令类型的选择，无命令、探测、重启Sink、参数设置 */
						/****************************************************/
						if (selected === undefined) {
							selectService.initSelect(scope);
						} else if (selected.selected === "1") {
							selectService.openTC(scope);
						} else if (selected.selected === "3") {
							selectService.openRestartSink(scope);
						} else {
							selectService.openInstall(scope);
						}
					} else if (iAttrs.id == "form-field-select-2") {
						/******************************************/
						/* 根据所选的网络号，自动添加对应的子网号 */
						/******************************************/
						var subnet_element = angular.element('#form-field-select-3');
						if (selected === undefined) {
							angular.element('#form_field_select_3_chzn').find('.chzn-results').empty();
						} else {
							var net_id = selected.selected
							selectService.addSubnet(subnet_element, $rootScope._dirData.IOT_DIR, net_id);
							angular.element('#form-field-select-3').removeClass('chzn-done');
							angular.element('#form_field_select_3_chzn').remove();
							subnet_element = $compile(subnet_element)(scope);
							subnet_element.change(function (event, selected) {
								/******************************************/
								/* 根据所选的子网号，自动添加对应的节点号 */
								/******************************************/
								var node_element = angular.element('#form-field-select-4');
								if (selected === undefined) {
									angular.element('#form_field_select_4_chzn').find('.chzn-results').empty();
								} else {
									var node_id = selected.selected
									selectService.addNode(node_element, $rootScope._dirData.IOT_DIR, net_id, node_id);
									angular.element('#form-field-select-4').removeClass('chzn-done');
									angular.element('#form_field_select_4_chzn').remove();
									node_element = $compile(node_element)(scope);
								}
							});
						}
					} else if (iAttrs.id == "form-field-select-6") {
						/************************/
						/* 进一步显示参数的设置 */
						/************************/
						if (selected === undefined) {
							selectService.closeCSInstall(scope);
						} else if (selected.selected === "1") {
							selectService.openCycle(scope);
						} else if (selected.selected === "2") {
							selectService.openPower(scope);
						} else if (selected.selected === "3") {
							selectService.openTime(scope);
						} else {
							selectService.closeCSInstall(scope);
						}
					}
					scope.$apply();
				});
			}
		}
	};
}]);
/*********************************************************************************/
/*******************************这里是分界线**************************************/
/*********************************************************************************/
/**
 * 模块说明：历史数据查询浏览展示（history）模块。
 * 主要内容：两个个控制器（historyCtrl），（searchCtrl）。
 * 功能实现：历史数据的展示、图标的交互。
 * 模块依赖：MainContentModule。
 * @Author   吴嘉文
 * @DateTime {{ 2017.6.08 }}
 */
var historyContentModule = angular.module('HistoryContentModule', ['MainContentModule']);

historyContentModule.controller('historyCtrl', ['$scope', function ($scope) {
	console.log("历史数据查询、浏览、展示模块");
}]);

historyContentModule.controller('searchCtrl', ['$scope', '$rootScope', '$http', 'addTableService', 'historyLineService', function ($scope, $rootScope, $http, addTableService, historyLineService) {
	console.log("历史数据查询控制器");
	$scope.searchType = {
		"showNET": false,
		"showSUBNET": true,
		"showNODE": true,
		"showTime": false
	};
	/* 表单提交事件 */
	$scope.searchRequest = function () {
		if (angular.element('#form-select-4')[0].value != '') {
			$scope.searchData.time = angular.element('#form-select-4')[0].value;
			if ($scope.searchData.NTID !== '' && $scope.searchData.SBNTID !== '') {
				var table = addTableService.addLoadingLayer(angular.element('#table_report_wrapper'));
				if ($scope.searchData.NODEID != undefined) {
					var httpData = "NTID=" + $scope.searchData.NTID + "&SBNTID=" + $scope.searchData.SBNTID + "&NODEID=" + $scope.searchData.NODEID + "&sTime=" + $scope.searchData.time.split(" / ")[0] + "&eTime=" + $scope.searchData.time.split(" / ")[1]
				} else {
					var httpData = "NTID=" + $scope.searchData.NTID + "&SBNTID=" + $scope.searchData.SBNTID + "&sTime=" + $scope.searchData.time.split(" / ")[0] + "&eTime=" + $scope.searchData.time.split(" / ")[1]
				}
				$http({
					url: './SS_DTSearch/list.do',
					method: 'POST',
					headers: {
						'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: httpData
				}).then(function (success) {
					addTableService.addData(success.data);
					historyLineService.updataLine(success.data, $scope);
					addTableService.cancelLoadingLayer(angular.element('#table_report_wrapper'));
				}, function (error) {
					console.log(error)
				});
			} else {
				if ($scope.searchData.NTID == '') {
					alert("网络号为必填选项");
				}
				if ($scope.searchData.NTID == '') {
					alert("子网号为必填选项");
				}
			}
		} else {
			alert("时间为必填选项");
		}
	}
	$scope.initSearch = function () {
		if ($rootScope._histroyData == undefined) {
			var curDate = new Date();
			var preDate = new Date(curDate.getTime() - 10*24*60*60*1000);
			//addTableService.addLoadingLayer(angular.element('#table_report_wrapper'));
			$http({
				url: './SS_DTSearch/list.do',
				method: 'POST',
				headers: {
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: "NTID=31&SBNTID=25&sTime=" + preDate.toLocaleString().split(" ")[0].replace(/\//g, "-") + "&eTime=" + curDate.toLocaleString().split(" ")[0].replace(/\//g, "-")
			}).then(function (success) {
				$rootScope._histroyData = success.data;
				addTableService.addData(success.data);
				historyLineService.updataLine(success.data, $scope);
				addTableService.cancelLoadingLayer(angular.element('#table_report_wrapper'));
			}, function (error) {
				console.log(error)
			});
		} else {
			setTimeout(function () {
				addTableService.addData($rootScope._histroyData);
				addTableService.cancelLoadingLayer(angular.element('#table_report_wrapper'));
			}, 1000);
		}
	}
	$scope.initSearch()
}]);
/**
 * 生成历史数据折线图表示，通过指令实现该功能（history-line）。
 * @Author   吴嘉文
 * @DateTime {{ 2017.6.08 }}
 * @return   {undefined}                
 */
historyContentModule.directive('historyLine', ['historyLineService', function (historyLineService) {
	return {
		restrict: 'A', 
		compile: function (iElement, iAttrs) {
			/****************/
			/* 获取适合高度 */
			/****************/
			iElement.css({
				height: (angular.element(document).height() - 156) / 3,
				width: angular.element('history-line').width()
			});
			var myChart = echarts.init(iElement[0]);
			myChart.setOption(historyLineService.option);
//			historyLineService.myChart = myChart;
			return function (scope, iElement, iAttrs, controller) {
				var option = historyLineService.option;
				//scope._lineData._line.push(iElement._MYCHART);
				myChart.on('legendselectchanged', function(event) {
					/****************/
					/* 修改单击类型 */
					/****************/
					var name_legend = event.name, unit;
					for (var i in event.selected) {
						event.selected[i] = false;
					}
					event.selected[name_legend] = true;
					option.legend.selected = event.selected;
					/* 修改点击后的单位 */
					unit = (name_legend === "温度" ? "摄氏度(℃)" : 
								(name_legend === "PH值" ? "pH值" : 
									(name_legend === "浊度" ? "散射浊度(NTU)" : 
										(name_legend === "溶解氧" ? "毫克每升(mg/L)" :
											(name_legend === "电导率" ? "微西门子每米(μs/m)" : "")))));
					option.yAxis[0].name = unit;
					historyLineService.setOption(option);
					myChart.setOption(option);
				});
			}
		}
	};
}]);
/**
 * 生成折线图，参数配置。setOption函数还需要修改！
 * @Author   吴嘉文
 * @DateTime {{ 2017.6.10 }}
 * @return   {undefined}                
 */
historyContentModule.factory('historyLineService', ['$compile', function ($compile) {
	var chartElement;
	var option_line = {
		    backgroundColor: '#fff',
	    	title: {
		        text: '',
		        textStyle: {
		            fontWeight: 'normal',
		            fontSize: 16,
		            color: '#57617B'
		        },
		        left: '3%'
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            lineStyle: {
		                color: '#57617B'
		            }
		        }
		    },
		    legend: {
		        icon: 'rect',
		        itemWidth: 14,
		        itemHeight: 5,
		        itemGap: 13,
		        data: ['温度', 'PH值', '浊度', '溶解氧', '电导率'],
		        right: '4%',
		        textStyle: {
		            fontSize: 12,
		            color: '#57617B'
		        },
		        selected: {
				    '温度': true,
				    'PH值': false,
				    '浊度': false,
				    '溶解氧': false,
				    '电导率': false,
				}
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        boundaryGap: false,
		        axisLine: {
		            lineStyle: {
		                color: '#57617B'
		            }
		        },
		        data: []
		    }],
		    yAxis: [{
		        type: 'value',
		        name: '摄氏度(℃)',
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		            lineStyle: {
		                color: '#57617B'
		            }
		        },
		        axisLabel: {
		            margin: 10,
		            textStyle: {
		                fontSize: 14
		            }
		        },
		        splitLine: {
		            lineStyle: {
		                color: '#57617B'
		            }
		        }
		    }],
		    series: [{
		        name: '温度',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 1
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(139, 188, 103, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(139, 188, 103, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: 'rgb(139, 188, 103)',
		                borderColor: 'rgba(139, 188, 103,0.27)',
		                borderWidth: 12

		            }
		        },
		        data: []
		    }, {
		        name: 'PH值',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 1
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(211, 110, 110, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(211, 110, 110, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: 'rgb(211, 110, 110)',
		                borderColor: 'rgba(211, 110, 110,0.2)',
		                borderWidth: 12

		            }
		        },
		        data: []
		    }, {
		        name: '浊度',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 1
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(172, 104, 186, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(172, 104, 186, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {

		                color: 'rgb(172, 104, 186)',
		                borderColor: 'rgba(172, 104, 186,0.2)',
		                borderWidth: 12
		            }
		        },
		        data: []
		    },{
		        name: '溶解氧',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 1
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(239, 173, 98, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(239, 173, 98, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {

		                color: 'rgb(239, 173, 98)',
		                borderColor: 'rgba(239, 173, 98,0.2)',
		                borderWidth: 12
		            }
		        },
		        data: []
		    },{
		        name: '电导率',
		        type: 'line',
		        smooth: true,
		        symbol: 'circle',
		        symbolSize: 5,
		        showSymbol: false,
		        lineStyle: {
		            normal: {
		                width: 1
		            }
		        },
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(102, 102, 102, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(102, 102, 102, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {
		            normal: {

		                color: 'rgb(102, 102, 102)',
		                borderColor: 'rgba(102, 102, 102,0.2)',
		                borderWidth: 12
		            }
		        },
		        data: []
		    }, ]
		};
		var setOption = function (option) {
			angular.extend(option_line, option);
		}
		var initOption = function () {}
		var updataLine = function (datas, scope) {
			option_line.title.text = datas.SS_DTSearchList[0].NTID + "号网络-" + datas.SS_DTSearchList[0].SBNTID + "号区域",
			option_line.xAxis[0].data = datas.HistoryAVGSS_DT.lists6;
			option_line.series[0].data = datas.HistoryAVGSS_DT.lists3;
			option_line.series[1].data = datas.HistoryAVGSS_DT.lists1;
			option_line.series[2].data = datas.HistoryAVGSS_DT.lists2;
			option_line.series[3].data = datas.HistoryAVGSS_DT.lists5;
			option_line.series[4].data = datas.HistoryAVGSS_DT.lists4;
			$compile(angular.element('#history-line'))(scope);
		}
		return {
			setOption: setOption,
			option: option_line,
			updataLine: updataLine,
			myChart: chartElement
		}
}]);
/**
 * 生成历史数据图表表示，通过指令实现该功能（history-table）。
 * @Author   吴嘉文
 * @DateTime {{ 2017.6.08 }}
 * @return   {undefined}                
 */
historyContentModule.directive('historyTable', ['addTableService', function(addTableService){
	return {
		restrict: 'A', 
		compile: function (iElement, iAttrs) {
			addTableService.addTable(iElement);
			var parent = angular.element('#sidebar');
			var element = angular.element(parent.find('li')[2]);
			for (var i = 0, length = parent.find('li').length; i < length; i++) {
				if (parent.find('li')[i].className == 'active') {
					angular.element(parent.find('li')[i]).removeClass('active');
				}
			}
			element.addClass('active');
			return function (scope, iElement, iAttrs) {}
		}
	};
}]);

/**
 * 生成查询历史数据表单，通过指令实现该功能（search）。
 * @Author   吴嘉文
 * @DateTime {{ 2017.6.10 }}
 * @return   {undefined}                
 */
historyContentModule.directive('search', ['$rootScope', 'historySelectService', '$compile', function ($rootScope, historySelectService, $compile) {
	return {
		restrict: 'A',
		compile: function (iElement, iAttrs) {
			if (iAttrs.id == "form-select-1") {
				historySelectService.addNet(iElement, $rootScope._dirData.IOT_DIR);
			} else if (iAttrs.id == "form-select-4") {
				angular.element('#form-select-4').daterangepicker();
				var dateElement = angular.element('.daterangepicker');
				dateElement.css('width', '626px');
				dateElement.css('left', '190px');
			}
			if (iAttrs.id !== "form-select-4") {
				iElement.chosen({disable_search_threshold: 0, allow_single_deselect: true});
			}
			return function (scope, iElement, iAttrs) {
				if (iAttrs.id == "form-select-1") {
					iElement.change(function (event, selected) {
						if (selected === undefined) {
							historySelectService.initSelect(scope);
						} else {
							historySelectService.openSUBNET(scope);
						} 
						/******************************************/
						/* 根据所选的网络号，自动添加对应的子网号 */
						/******************************************/
						var subnet_element = angular.element('#form-select-2');
						if (selected === undefined) {
							angular.element('#form_select_2_chzn').find('.chzn-results').empty();
						} else {
							var net_id = selected.selected
							historySelectService.addSubnet(subnet_element, $rootScope._dirData.IOT_DIR, net_id);
							angular.element('#form-select-2').removeClass('chzn-done');
							angular.element('#form_select_2_chzn').remove();
							subnet_element = $compile(subnet_element)(scope);
							subnet_element.change(function (event, selected) {
								historySelectService.openNODE(scope);
								/******************************************/
								/* 根据所选的子网号，自动添加对应的节点号 */
								/******************************************/
								var node_element = angular.element('#form-select-3');
								if (selected === undefined) {
									angular.element('#form_select_3_chzn').find('.chzn-results').empty();
								} else {
									var node_id = selected.selected
									historySelectService.addNode(node_element, $rootScope._dirData.IOT_DIR, net_id, node_id);
									angular.element('#form-select-3').removeClass('chzn-done');
									angular.element('#form_select_3_chzn').remove();
									node_element = $compile(node_element)(scope);
								}
								scope.$apply();
							});
						}
						scope.$apply();
					});
				}
			}
		}
	};
}]);
/**
 * 命令下发服务，提供基本的样式特效（影藏与显示），以及自动生成网络，子网，节点号。
 * @Author   吴嘉文
 * @DateTime {{ 2017.5.17 }}
 * @return   {object}          返回十个对外接口函数：1.initSelect 2.openTC 3.openRestartSink 4.openInstall 5.addNet 6.addSubnet 7.addNode 8.openCycle 9.openPower 10.openTime
 */
historyContentModule.factory('historySelectService', [function(){
	var initSelect = function (scope) {
		scope.searchType = {
			"showNET": false,
			"showSUBNET": true,
			"showNODE": true,
			"showTime": false
		}
	}
	var openSUBNET = function (scope) {
		scope.searchType = {
			"showNET": false,
			"showSUBNET": false,
			"showNODE": true,
			"showTime": false
		}
	}
	var openNODE = function (scope) {
		scope.searchType = {
			"showNET": false,
			"showSUBNET": false,
			"showNODE": false,
			"showTime": false
		}
	}
	/******************************************************/
	/* 自动匹配网络，子网，节点号。干他娘！应该问题不大！ */
	/******************************************************/
	var addNet = function (element, DIR) {
		var nets = DIR.NETS[0];
		element.empty();
		element.append('<option value=""></option>');
		for (let i = 0, length = nets.NETSIZE[0]; i < length; i++) {
			let net = nets.NET[i];
			element.append('<option value="' + net.NTID[0] + '">' + net.NTID[0] + '号网络</option>');
		}
	}
	var addSubnet = function (element, DIR, NET) {
		var nets = DIR.NETS[0];
		element.empty();
		element.append('<option value=""></option>');
		for (let i = 0, length = nets.NETSIZE[0]; i < length; i++) {
			let net = nets.NET[i];
			if (net.NTID[0] === NET) {
				for (let j = 0, length = net.SUBNETSIZE[0]; j < length; j++) {
					let subnet = net.SUBNET[j];
					element.append('<option value="' + subnet.SBNTID[0] + '">' + subnet.SBNTID[0] + '号子网</option>');
				}
			}
		}
	}
	var addNode = function (element, DIR, NET, SUBNET) {
		var nets = DIR.NETS[0];
		element.empty();
		element.append('<option value=""></option>');
		for (let i = 0, length = nets.NETSIZE[0]; i < length; i++) {
			let net = nets.NET[i];
			if (net.NTID[0] === NET) {
				for (let j = 0, length = net.SUBNETSIZE[0]; j < length; j++) {
					let subnet = net.SUBNET[j];
					if (subnet.SBNTID[0] === SUBNET) {
						for (let k = 0, length = subnet.NODESIZE[0]; k < length; k++) {
							let node = subnet.NODE[k];
							element.append('<option value="' + node.NDPHDR[0] + '">' + node.NDDSPT[0] + '号节点</option>');
						}
					}
				}
			}
		}
	}
	return {
		initSelect: initSelect,
		openSUBNET: openSUBNET,
		openNODE: openNODE,
		addNet: addNet,
		addSubnet: addSubnet,
		addNode: addNode
	};
}])