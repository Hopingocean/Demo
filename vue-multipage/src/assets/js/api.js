import axios from 'axios'

const baseURL = process.env.server_host;
// const baseURL = '';
var Request = {
    // 所有请求地址
    url: {
        login: baseURL + 'open/jjh/login', // 登陆
        logout: baseURL + 'open/jjh/logout', // 登出
        userinfo: baseURL + 'open/jjh/member', // 用户信息
        mobileCode: baseURL + 'open/jjh/sms2', // 短信验证码
        register: baseURL + 'open/jjh/reg', // 注册
        bindPhone: baseURL + 'open/jjh/bindmobile', // 手机号绑定

        // 第三方登陆
        wxLogin: baseURL + 'open/jjh/wechat', // 微信登陆
        qqLogin: baseURL + '', // QQ登陆

        gameUrl: baseURL + 'open/jjh/play/', // 获取游戏地址
        gameType: baseURL + 'open/jjh/type', // 游戏类型
        fileUpload: baseURL + 'open/jjh/upload', // 文件上传
        search: baseURL + 'open/jjh/search', // 搜索
        swiperList: baseURL + 'open/jjh/ads', // 轮播图
        prizeActivityInfo: baseURL + '', // 首页有奖活动
        myGame: baseURL + 'open/jjh/gameplay', // 最近在玩
        gameList: baseURL + 'open/jjh/game', // 游戏列表（热门/新上架/新开服）
        gameDetail: baseURL + 'open/jjh/game', // 游戏详情
        activityList: baseURL + '', // 活动列表
        receiveGift: baseURL + '', // 领取礼包
        giftList: baseURL + '', // 礼包列表
        certification: baseURL + '', // 实名认证
        modifyPassword: baseURL + 'open/jjh/password', // 修改密码
        modifyUserinfo: baseURL + 'open/jjh/member', // 修改个人信息
        imgCode: baseURL + 'open/jjh/captcha', // 图片验证码
    },
    /**
     * 封装axios
     * @param {String} type			请求的类型，默认GET
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
        axios({
            method: option.type || 'GET',
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
                }
            }
        }).catch(function(error) {
            if (option.error) {
                option.error(error);
            }
        });
    }
}

export default Request;