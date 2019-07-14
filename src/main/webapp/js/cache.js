for (let i = 0, length_children = tEle[0].children.length; i < length_children; i++) {
			for (let l = 0, length_attr = tEle[0].children[i].attributes.length; l < length_attr; l++) {
				if (tEle[0].children[i].attributes[l] != 1) {
					/* 这里的代码严重影响性能，这里的代码要优化，到时候再说吧 (* ￣︿￣) */
					$(tEle[0].children[i]).on('click', function(event) {
						event.preventDefault();
						if (event.target.id == '') {
							var classNames = tEle[0].children[i].className.split(' ');
							for (var name of classNames) {
								if (name === 'open') {
									$(tEle[0].children[i]).removeClass('open');
									$(tEle[0].children[i].children[1]).css('display', 'none');
									break;
								} else {
									$(tEle[0].children[i]).addClass('open');
									$(tEle[0].children[i].children[1]).css('display', 'block');
								}
							}
						} else {
							addTabService.addTab(event.target.text, event.target.id);
							addTabService.showTab(event.target.id);
							addTableService.addTable(event.target.id);
							var gpElementID = event.target.parentNode.parentNode.id;
							if (cacheActive[1] != 0) {
								cacheActive[0].removeClass('active');
								cacheActive[1].removeClass('active');
							} else {
								cacheActive[0].removeClass('active');
							}
							if (gpElementID != 'treeMenu') {
								$(event.target.parentNode).addClass('active');
								$(event.target.parentNode.parentNode.parentNode).addClass('active')
								cacheActive[0] = $(event.target.parentNode.parentNode.parentNode);
								cacheActive[1] = $(event.target.parentNode);
							} else {
								$(event.target).addClass('active');
								cacheActive[0] = $(event.target.parentNode);
								cacheActive[1] = 0;								
							}
						}
					});
				}
			}
		}