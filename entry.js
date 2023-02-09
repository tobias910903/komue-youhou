import $_tools from './utils/tools'
import $_dom from "./utils/dom";
import $_request from './utils/request'

// 脚本开始
console.log(" ====== 脚本开始 ====== ");

// 添加几个样式
$_dom("head").append(`<style type='text/css'>
    pre,code{user-select:auto !important}
    .komue-youhou-btn{position: fixed;right: 0;bottom: 40%;padding: 10px 20px;background-color: #ff0000;color: #ffffff;font-size: 16px;height: auto;width: 10px;text-align: center;cursor: pointer;border-radius: 8px 0 0 8px;}
</style>`);

// 创建一个按钮
$_dom("body").append(`<div class='komue-youhou-btn'>一个按钮</div>`);

// 添加一个事件
let btn = $_dom('.komue-youhou-btn');
btn.onclick = function(){
    $_tools.dialog("触发一个事件")
}

// 请求一个接口
$_request( {
    url: "http://localhost:3000/api/test",
    data: { }
}, ()=> {
    console.log("接口成功回调")
}, ()=>{
    console.log("接口调用失败")
})

