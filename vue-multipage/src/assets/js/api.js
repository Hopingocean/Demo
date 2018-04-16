import axios from 'axios'

const baseURL = process.env.server_host;
var Reports = {
    // 所有请求地址
    requestUrl: {
        login: baseURL + 'open/jjh/login', // 登陆
        logout: baseURL + 'open/jjh/logout', // 登出
        userinfo: baseURL + 'open/jjh/member', // 用户信息
        mobileCode: baseURL + 'mobileCode', // 短信验证码
        register: baseURL + 'open/jjh/reg', // 注册
        gameList: baseURL + 'open/jjh/game', // 游戏列表
    },
    /**
     * 封装axios
     * @param {String} type			请求的类型，默认post
     * @param {String} url			请求地址
     * @param {String} time			超时时间
     * @param {Object} data			请求参数
     * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
     * @param {Object} headers		自定义请求headers
     * @param {Function} success	请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
     * @param {Function} error		发送请求前
     * @param return 
     */
    ajax: function(option) {

        var options = option || {};

        if (!options.url) {
            alert('请填写接口地址');
            return false;
        }

        axios({
            method: option.type || 'post',
            url: option.url,
            params: option.data || {},
            headers: option.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
            // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
            baseURL: baseURL,
            timeout: option.time || 10 * 1000,
            withCredentials: true,
            responseType: option.dataType || 'json'
        }).then(function(res) {

            if (res.status == 200) {

                if (option.success) {
                    option.success(res.data, res);
                }

            } else {

                if (data.error) {
                    option.error(error);
                } else {
                    alert('好多人在访问呀，请重新试试[timeout]');
                }

            }

        }).catch(function(error) {
            console.log(error);
            if (option.error) {
                option.error(error);
            } else {
                alert('好多人在访问呀，请重新试试[timeout]');
            }
        });

    }
}

export default Reports;