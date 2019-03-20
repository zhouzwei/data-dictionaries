//主js文件 lee

// index页面js
let index = (function() {
    let index = {
        // 初始化函数
        init: function() {
            let obj = index.obj;
            this.bindEvent();
        },
        // 储存变量
        obj: {
            aside: document.getElementById('aside'),
            home: document.getElementById('home-item'),
            listTitle: document.getElementsByClassName('list-title'),
            arrowLt:document.getElementsByClassName('arrow_lt'),
            acrossTab: document.getElementsByClassName('acrossTab')[0],
            show_iframe: document.getElementsByClassName('show_iframe')[0],
            navbarItem: document.getElementsByClassName('navbar-item'),
            iframeContent: document.getElementsByClassName('iframe-content'),
            menuOption: document.getElementsByClassName('menu-option'),
            show_iframe: document.getElementsByClassName('show_iframe ')[0],
            existence: false,
            url: null,
            num: 0,
            iframe_flag: false,
        },
        // 事件绑定
        bindEvent: function() {
            let that = this,
                obj = this.obj,
                eventList = this.eventList;
            // 事件委托
            EventUtil.addHandler(document,'click', function(event) {
                // let e = event || window.event,
                //     target = e.target || e.srcElement;
                let e = EventUtil.getEvent(event),
                    target = EventUtil.getTarget(e);

                if (hasClass(target, 'list-title')) {

                    eventList.toggleMenu(target);

                }
                if (hasClass(target, 'shrink-btn')) {

                    eventList.toggleAside(target);
                    return;

                }
                
                if (hasClass(target, 'menu-option')) {
                	
					
                    let listTitle = parents(target, 'dl').getElementsByClassName('list-title')[0];
                    removeClass(obj.menuOption, 'remove', 'active', target);
                    removeClass(obj.listTitle, 'remove', 'selected', listTitle);
                    
                    eventList.addNode(target);
                    eventList.increaseIframe(target);
                    return;

                }
                if (hasClass(target, 'navbar-item')) {
                    removeClass(obj.navbarItem, 'remove', 'active', target);
                    showTab(obj.navbarItem, obj.iframeContent, 'title');
                    eventList.navbarClass(target);
                    return;

                }
                               
                if (hasClass(target, 'close')) {

                    eventList.deleteNode(target);
                    return;

                }
                if (target === obj.home) {

                    let iframe = obj.iframeContent[0].getElementsByTagName('iframe')[0];
                    removeClass(obj.navbarItem, 'remove', 'active', obj.navbarItem[0]);
                    removeClass(obj.menuOption, 'remove', 'active');   
                    showTab(obj.navbarItem, obj.iframeContent, 'title');
                    reload_message_frame(iframe);
                    return;
                }

                if (hasClass(target, 'refresh-btn')) {
                    eventList.refresh(target);
                    return;
                }

            });

        },
        // 函数列表
        eventList: {
            // 侧边栏下拉与收缩方法
            toggleMenu: function(el) {
                let d = el.parentNode.parentNode.getElementsByTagName('dd')[0];
                // let f = el.parentNode.parentNode.getElementsByTagName('ul')[0];
                removeClass(index.obj.listTitle, 'remove', 'selected', el);
                if (d) {
					// let h = d.getElementsByTagName('ul')[0].clientHeight;                    
					// if (!d.clientHeight) {
					//     d.style.height = h + 'px';
					// } else {
					//     d.style.height = 0 + 'px';
					// }
                }
                return;
            },

            toggleAside: function(el) {
                if (!hasClass(el, 'shrink-btn2')) {
                    el.classList.add('shrink-btn2');
                    index.obj.aside.style.transform = 'translateX(-100%)';
                    index.obj.aside.classList.add('pa');
                } else {
                    el.classList.remove('shrink-btn2');
                    index.obj.aside.style.transform = 'translateX(0%)';
                    index.obj.aside.classList.remove('pa');
                }
            },

            //增加tab
            addNode: function(el) {
                let list = index.obj.acrossTab.getElementsByTagName('li'),
                    arr = Array.prototype.slice.apply(list),
                    item = list[0].cloneNode(true),
                    tab_name = item.getElementsByClassName('tab-name')[0],
                    name = el.getAttribute('data-title'),
                    dataId = el.getAttribute('data-id'),
                    obj = index.obj,
                    len = arr.length;
                tab_name.innerText = name;
                item.setAttribute('data-title', name);
                item.setAttribute('data-id', dataId);
                arr.forEach(function(el) {
                    let tabName = el.getElementsByClassName('tab-name')[0],
                        itemChild = item.getElementsByClassName('tab-name')[0];

                    if (tabName.isEqualNode(itemChild)) {
                        obj.existence = true;
                    } else {
                        obj.num += 1;
                    }

                });
                if (!obj.existence || obj.num === arr.length) {
                    removeClass(list, 'remove', 'active');
                    item.classList.add('active');      // 添加active 类名
                    item.setAttribute("title", name);   // 添加标签属性
                    obj.acrossTab.appendChild(item);    // 插入节点
                    obj.existence = false;

                } else {

                    showTab(obj.menuOption, obj.iframeContent, 'id');

                }
                obj.num = 0;
            },
            
			
            
                
            // 删除tab和iframe
            deleteNode: function(el) {

                let parent = el.parentNode.parentNode,
                    child = el.parentNode,
                    obj = index.obj,
                    arr = Array.prototype.slice.apply(obj.iframeContent),
                    id = child.getAttribute('data-title');

                arr.forEach(function(el) {
                    let arrId = el.getAttribute('data-title');

                    if (arrId === id && !hasClass(el, 'hidden')) {
                        el.previousElementSibling.classList.remove('hidden');
                        obj.show_iframe.removeChild(el);
                    } else if (arrId === id) {
                        obj.show_iframe.removeChild(el);
                    }
                })

                if (hasClass(child, 'active')) {
                    child.previousElementSibling.classList.add('active');
                }
                index.eventList.navbarClass(child.previousElementSibling);
                parent.removeChild(child);

            },

            //添加iframe
            increaseIframe: function(el) {
                let obj = index.obj,
                    iframeContent = obj.show_iframe.getElementsByClassName('iframe-content'),
                    iframeArr = Array.prototype.slice.apply(iframeContent),
                    itemArr = Array.prototype.slice.apply(obj.navbarItem),
                    name = el.getAttribute('data-title'),
                    len = iframeArr.length;

                obj.url = el.getAttribute('data-href');
                iframeArr.forEach(function(el2) {
                    if (el2.getAttribute('data-href') === obj.url) {
                        obj.iframe_flag = true;
                        let i = el2.getAttribute('data-title'),
                            iframe = el2.getElementsByTagName('iframe')[0];
                        // 刷新页面
                        reload_message_frame(iframe);
                        removeClass(obj.navbarItem, 'remove', 'active');
                        itemArr.forEach(function(el3) {
                            let i2 = el3.getAttribute('data-title');
                            if (i === i2) {
                                el3.classList.add('active');
                            }
                        })
                    } else {
                        el2.classList.add('hidden');
                    }
                })

                if (!obj.iframe_flag) {
                    let iframeBox = document.createElement('div'),
                        iframe = document.createElement('iframe');

                    iframeBox.className = 'iframe-content max_height';
                    iframeBox.setAttribute('data-title', name);
                    iframeBox.setAttribute('data-href', obj.url);
                    iframe.src = obj.url;


                    iframeBox.appendChild(iframe);
                    obj.show_iframe.appendChild(iframeBox);

                } else {
                    obj.iframe_flag = false;
                    showTab(obj.menuOption, obj.iframeContent, 'title');
                }
            },

            // 点击nav栏跟删除nav项时候aside栏选项状态变化
            navbarClass: function(el) {
                let obj = index.obj,
                    title = null,
                    arr = Array.prototype.slice.apply(obj.menuOption);
                title = el.getAttribute('data-title');
                dataId = el.getAttribute('data-id');
                console.log(dataId)
                if (title === '首页') {
                    removeClass(obj.menuOption, 'remove', 'active');
                    removeClass(obj.listTitle, 'remove', 'selected', obj.home);

                } else {
                    arr.forEach(function(el1) {
                        if (el1.getAttribute('data-title') == title && el1.getAttribute('data-id') == dataId) {
                            let listTitle = parents(el1, 'dl').getElementsByClassName('list-title')[0];
                            removeClass(obj.menuOption, 'remove', 'active', el1);   // nav栏，点击哪个，给左边栏添加active类名 
                            removeClass(obj.listTitle, 'remove', 'selected', listTitle);
                        }
                    })
                }

            },
            

            refresh: function(el) {
                let obj = index.obj,
                    arr = Array.prototype.slice.apply(obj.iframeContent);
                arr.forEach(function(el1) {
                    if (!hasClass(el1, 'hidden')) {
                        let iframe = el1.getElementsByTagName('iframe')[0],
                            refreshImg = el.getElementsByTagName('img')[0];
                        refreshImg.classList.add('rotate');

                        // 重载方法
                        reload_message_frame(iframe);

                        // 动画结束移除动画类名以及事件
                        EventUtil.addHandler(refreshImg, 'animationend', function callback() {
                            refreshImg.classList.remove('rotate');
                            EventUtil.removeHandler(refreshImg, 'animationend', callback);
                        });
                        EventUtil.addHandler(refreshImg, 'webkitAnimationEnd', function callback() {
                            refreshImg.classList.remove('rotate');
                            EventUtil.removeHandler(refreshImg, 'webkitAnimationEnd', callback);
                        });
                    }
                })
            }
        }
    };

    
    let obj = {
        index: index
    }
    return obj;
})