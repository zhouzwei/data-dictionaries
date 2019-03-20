// common 类  lee
//判断元素是否拥有指定类名
function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

//阻止冒泡事件
function stopPropagation(e) {
    e = e || window.event;
    if (e.stopPropagation) {
        e.stopPropagation(); //W3C阻止冒泡方法
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}

var qualityIndexId=0;


//查找同辈元素
function siblings(el) {
    var a = [],
        p = el.previousSibling;

    while (p) {
        if (p.nodeType === 1) {
            a.push(p);
        }
        p = p.previousSibling;
    }
    a.reverse();
    var n = el.nextSibling;
    while (n) {
        if (n.nodeType === 1) {
            a.push(n);
        }
        n = n.nextSibling;
    }
    return a;
}

// 查找祖先元素
function parents(el, name) {
    var x = el.parentNode;
    var result = null;
    while (!hasClass(x, name) && x.tagName !== name.toUpperCase()) {
        x = x.parentNode;
    }
    result = x;
    return result;
}
//移除元素的类名
// function removeClass(el, name, type) {
//     siblings(el).forEach(function(item) {
//         item.classList[type](name);
//     });
// };

function removeClass(obj, type, name, obj2) {
    let arr = Array.prototype.slice.apply(obj);
    arr.forEach(function(el) {
        el.classList[type](name);
    })
    if (obj2) {
        obj2.classList.add(name);
    }
}

// 验证手机还有邮箱
function isPhone(val) {
    var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
    if (!reg.test(val)) {
        return false;
    } else {
        return true;
    }
};

function isMail(val) {
    // var reg = /^[a-z0-9]([a-z0-9\\.]*[-_]{0,4}?[a-z0-9-_\\.]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+([\.][\w_-]+){2,5}$/i;
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]{2,5}$/;
    if (reg.test(val)) {
        return true;
    } else {
        return false;
    }
};
// 去空格
function trim(str, is_global) {
    var result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}
// 获取单选按钮值
// var getVal = function(radio_Arr) {
//     var value = '';
//     for (var i = 0; i < len; i++) {
//         if (radio_Arr[i].checked === true) {
//             value = radio_Arr[i].value;
//             break;
//         }
//     }
//     return value;
// }

//loading显示
// function loading(content) {
//     var loading = document.getElementsByClassName('loading')[0],
//         header = loading.getElementsByTagName('h1')[0];
//     if (content) {
//         header.innerHTML = content;
//     }
//     loading.classList.toggle('hidden');
// };
//图片查看大图
// function pic_check(img_arr) {
//     var detail = document.getElementsByClassName('pic_detail')[0],
//         pic = detail.getElementsByClassName('pic')[0],
//         img = pic.getElementsByTagName('img')[0],
//         len = img_arr.length;

//     for (var i = 0; i < len; i++) {
//         img_arr[i].onclick = function(event) {
//             stopPropagation(event)
//             var src = this.src;
//             img.src = src;
//             detail.classList.remove('hidden');
//             setTimeout(function() {
//                 img.classList.add('scale');
//             }, 100)
//         }
//     }
//     detail.addEventListener('click', function() {
//         var self = this;
//         img.classList.remove('scale');
//         setTimeout(function() {
//             self.classList.add('hidden');
//         }, 300)
//     })
// }

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

function scrollToTop(scrollTop) {
    var speed = scrollTop / 12,
        timer = requestAnimationFrame(function() {
            scrollTop -= speed;
            if (scrollTop > 1) {
                if (scrollTop < 5) {
                    scrollTop = 0;
                }
                window.scrollTo(0, scrollTop);
                scrollToTop(scrollTop);
            } else {
                window.scrollTo(0, 0);
                cancelAnimationFrame(timer);
            }
        })
};

let toTop = (function() {
    let sideBox = document.getElementsByClassName('sideBox')[0],
        topItem = document.getElementsByClassName('topItem')[0],
        nav = document.getElementById('navbar'),
        scrollDown = 0;

    window.addEventListener('scroll', function() {
        scroll()
    }, false);

    function scroll() {
        var scrollUp = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollUp > 100) {
            topItem.classList.add('topItem2');
            sideBox.classList.add('sideBox2');

        } else {
            topItem.classList.remove('topItem2');
            sideBox.classList.remove('sideBox2');

        }
        if (scrollUp > scrollDown && scrollUp > 100) {
            nav.classList.add('nav_hidden');
            nav.classList.add('nav_hidden2');
        } else {
            nav.classList.remove('nav_hidden2');
            if (scrollUp == 0) {
                nav.classList.remove('nav_hidden');
            }
        }
        scrollDown = scrollUp;
    };
});

// var success_box = (function(content) {
//     var success = document.getElementsByClassName('success_box')[0],
//         mask = document.getElementsByClassName('mask')[0],
//         title = success.getElementsByClassName('title')[0],
//         success_child = success.getElementsByClassName('success')[0],
//         green_raduis = success.getElementsByClassName('green_raduis')[0];

//     title.innerText = content;
//     success.classList.remove('hidden');
//     mask.classList.remove('hidden');
//     setTimeout(function() {
//         success_child.classList.add('success2');
//         green_raduis.classList.add('bgc');
//     }, 100);

// })

//判断元素是否进入可视区域
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function showTab(el1, el2, type) {
    let arr = Array.prototype.slice.apply(el1),
        tableArr = Array.prototype.slice.apply(el2),
        num = null;
    arr.forEach(function(el) {
        if (hasClass(el, 'active')) {
            num = el.getAttribute('data-' + type);
        }
    });
    tableArr.forEach(function(el) {
        let tbId = el.getAttribute('data-' + type);
        if (tbId === num) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

}
//刷新页面局部
function reload_message_frame(el) {
    if (el.location) {
        el.location.reload(true);
    }
    //else if (el.contentWindow.location) {
    //     el.contentWindow.location.reload(true);
    // } 
    else if (el.src) {
        el.src = el.src;
    } else {
        //fail condition, respond as appropriate, or do nothing
        alert("Sorry, unable to reload that frame!");
    }
}

//跨浏览器的事件处理程序
let EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}