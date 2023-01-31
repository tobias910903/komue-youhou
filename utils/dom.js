/**
 * Date：2023/1/30
 * Desc：节点操作方法
 * $_dom('#test').css({'font-size':'14px','color':'red'})
 * $_dom('.test').addClass('test1')
 * $_dom('#test1').addClass('test2')
 * $_dom('.test').attr('data-zhi',100)
 * $_dom('#test').before('<p id="pData" style="display:none">这是新文本。</p>')
 * $_dom('#pData').show()
 * console.log($_dom('.test').attr('class'), $_dom('.test')[0].html(), $_dom('#pData').clone())
 */

function DomFn(Html) {
    return {
        // 获取特殊值
        getAllComputedStyle: function(property){
            if(window.getComputedStyle){
                //现在要把用户输入的property中检测一下是不是驼峰，转为连字符写法
                //强制把用户输入的词儿里面的大写字母，变为小写字母加-
                //paddingLeft  →  padding-left
                property = property.replace(/([A-Z])/g , function(match,$1){
                    return "-" + $1.toLowerCase();
                });
                return window.getComputedStyle(Html)[property];
            }else{
                //IE只认识驼峰，我们要防止用户输入短横，要把短横改为大写字母
                //padding-left  → paddingLeft
                property = property.replace(/\-([a-z])/g , function(match,$1){
                    return $1.toUpperCase();
                });
                return Html.currentStyle[property];
            }
        },
        // 获取className,兼容ie8等
        getClassList:function() {
            // ie9以上的
            if(Html.classList){
                var classList = Html.classList
                return {
                    listString:classList,
                    listArray:Html.getAttribute('class').replace(RegExp(' ','g'),'|').split('|').filter(n=>n!='')
                }
            }else{
                // ie9以下的
                var classList = function(){
                    return Html.getAttribute('class')
                }
                classList.add = function(addValue) {
                    var thisClassName = Html.getAttribute('class')+' '+addValue
                    Html.setAttribute('class', thisClassName)
                }
                classList.remove = function(removeValue) {
                    var calssListArray = Html.getAttribute('class').replace(RegExp(' ','g'),'|').split('|').filter(n=>n!='')
                    var classIndex = calssListArray.indexOf(removeValue)
                    if(classIndex != -1){
                        var thisClass=calssListArray.filter(n=>n!=removeValue).join(' ')
                        Html.setAttribute('class', thisClass)
                    }
                }
                return {
                    listString:classList,
                    listArray:Html.getAttribute('class').replace(RegExp(' ','g'),'|').split('|').filter(n=>n!='')
                }
            }
        },
        // 将字符串转换为节点
        createDocumentFragment: function(value) {
            if (value.nodeName!=undefined) {
                return value;
            } else {
                const template = value
                let frag = document.createRange().createContextualFragment(template)
                return frag;
            }
        },
        // 节点转字符串
        createDocumentString: function(value) {
            if (value.nodeName!=undefined) {
                return value.outerHTML;
            } else {
                return value;
            }
        },
        // 定义的操作节点方法：
        // 获取css
        getCss: function(value) {
            return this.getAllComputedStyle(value)
        },
        // 修改css
        css: function(property, value) {
            var type = Object.prototype.toString.call(property).replace('object', '').replace('[', '').replace(']', '')
            if (type.indexOf('Object') != -1) {
                var cssArray = Object.keys(property).map(item => {
                    return `${item}:${property[item]}`
                })
                Html.style.cssText = `${cssArray.join(';')}`
            }else{
                Html.style.cssText = `${property}:${value}`
            }
        },
        // 添加class
        addClass: function(value) {
            var listObject = this.getClassList()
            listObject.listString.add(value)
        },
        // 清楚class
        removeClass: function(value) {
            var listObject = this.getClassList()
            listObject.listString.remove(value)
        },
        // 是否存在class
        hasClass: function(value) {
            var listObject = this.getClassList()
            if (listObject.listArray.indexOf(value) != -1) {
                return true
            } else {
                return false
            }
        },
        // 设置/获取 元素属性
        attr: function(key,value) {
            var zhiValue = ''
            if(value){
                Html.setAttribute(key,value)
            }else {
                zhiValue = Html.getAttribute(key)
            }
            return zhiValue
        },
        // 删除元素属性
        removeAttr: function(key) {
            Html.removeAttribute(key)
        },
        // 获取/设置 节点下面的信息
        html: function(value) {
            if (value) {
                Html.innerHTML = this.createDocumentString(value)
            } else {
                return Html.innerHTML
            }
        },
        // 添加节点内最后
        append: function(value) {
            Html.appendChild(this.createDocumentFragment(value))
        },
        // 添加到节点之前
        before: function(value) {
            Html.parentNode.insertBefore(this.createDocumentFragment(value),Html);
        },
        // 添加到节点之后
        after: function(value) {
            var next = Html.nextSibling
            next.parentNode.insertBefore(this.createDocumentFragment(value),next);
        },
        // 删除节点
        remove: function() {
            Html.parentNode.removeChild(Html);
        },
        // 复制节点,is_deep: true->深拷贝（复制节点，复制内容），false->浅拷贝(只复制结点不复制内容)
        clone: function(is_deep) {
            if(!is_deep)is_deep=false
            return Html.cloneNode(is_deep)
        },
        // 隐藏dom
        hide: function(){
            this.css('display','none')
        },
        // 显示dom
        show: function(){
            this.css('display','revert')
            if(this.getCss('display')=='none'){
                this.css('display','block')
            }
        }

        // ...

    }
}

// 节点上面挂载方法
function mountFn(value) {
    var Html = null
    if(value.nodeName!=undefined){
        Html = [value]
    }else{
        Html = document.querySelectorAll(value)
    }
    if (Html.length == 0) {
        throw value + '：没有找到节点'
    }
    // 给节点挂载自定义方法
    Html.forEach(item => {
        Object.assign(item, DomFn(item))
    })
    // 多个节点
    if (Html.length>1) {
        var fnObject = DomFn() // 方法
        Object.keys(fnObject).forEach(item => {
            Html[item] = function() {// 重新方法
                var zhiValue = []
                Html.forEach(el => {
                    var thisZhiValue = el[item].apply(el,arguments) // 执行
                    zhiValue.push(thisZhiValue)
                })
                if(zhiValue.filter(n=>n!=undefined).length>0){
                    return zhiValue
                }
            }

        })
        return Html
    }else{
        return Html[0]
    }
}

export default mountFn
