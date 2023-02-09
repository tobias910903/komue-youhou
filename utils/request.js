/**
 * Date：2023/1/29
 * Desc：涉及到跨域问题，使用油猴内置脚本方法
 */
export default function(params, sucFun, errFun){
    // console.log(params);

    if(!params.url){
        return console.error("缺少URL")
    }

    params.data = params.data || {};
    params.method = params.method || "get";

    // 本地开发调试接口
    if(window.location.href.indexOf('http://localhost:1024') !== -1){
        return ajaxLocal(params, sucFun, errFun)
    }

    // 浏览器运行
    return GM_xmlhttpRequest(params, sucFun, errFun)
}


// 本地测试 ajax
function ajaxLocal(params, sucFun, errFun){
    console.log("ajaxLocal ---");
    let ajax;
    if(window.XMLHttpRequest){
        ajax = new XMLHttpRequest();
    }
    else{
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (params.method === 'get'){
        ajax.open('get',params.url+'?'+JsonToString(params.data),true);
        ajax.send();
    } else if(params.method === 'post'){
        ajax.open('post',params.url,true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(JsonToString(params.data));
    }

    ajax.onreadystatechange = function(){
        if(ajax.readyState === 4){
            console.log(111)
            // if(ajax.status>=200 && ajax.status<300 || ajax.status == 304){
            //
            //
            // }
            // else{
            //
            // }
            if(sucFun){
                sucFun()
            }

            // if(errFun){
            //     errFun()
            // }
        }
    }

    function JsonToString(json){
        var arr = [];
        for(let i in params){
            arr.push(i+'='+params[i]);
        }
        return arr.join('&');
    }
}

// 油猴内置
function GM_xmlhttpRequest(params, sucFun, errFun){
    console.log("GM_xmlhttpRequest ---");
    return GM_xmlhttpRequest({
        headers: {
            'content-type': 'application/json',
        },
        responseType: params.responseType || "json",
        url: params.url,
        data: JSON.stringify(params.data || ""),
        method: params.method || "get",
        // onload: function(response) {
        //     console.log(response.responseText);
        // },
        onreadystatechange: (res) => {
            if (res.readyState === 4) {
                console.log(res.response)

                if(sucFun){
                    sucFun()
                }
            }
        },
        onerror: (err) => {
            console.log(err)

            if(errFun){
                errFun()
            }
        }
    })
}
