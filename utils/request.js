/**
 * Date：2023/1/29
 * Desc：涉及到跨域问题，使用油猴内置脚本方法
 */
export default function(params, sucFun, errFun){
    // console.log(params);
    if(window.location.href.indexOf('http://localhost:1024') !== -1){
        return
    }

    if(!params.url){
        return console.error("缺少URL")
    }


    return GM_xmlhttpRequest({
        headers: {
            'content-type': 'application/json',
        },
        responseType: params.responseType || "json",
        url: params.url,
        data: JSON.stringify(params.data || ""),
        method: params.method || "POST",
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
