export default {
    // 获取url参数
    getUrlKey: function(key) {
        return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    },
    // 判断手机号是否正确
    checkMobile: function(mobile) {
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (reg.test(mobile)) {
            return true;
        } else {
            return false;
        }
    },
    // 判断浏览器内核/手机系统
    browser: function() {
        var u = navigator.userAgent;
        var ua = navigator.userAgent.toLocaleLowerCase();
        var uaStrLen = ua.indexOf('chrome') > -1 ? ua.split('chrome/')[1].split('/').length - 1 : '';
        return {
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核

            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // 安卓终端
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iphone或QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否为iPad

            webApp: u.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部

            weiXin: u.indexOf('MicroMessenger') > -1, // 微信
            QQ: ua.match(/QQ/i) == "qq", // QQ
            weiBo: ua.match(/WeiBo/i) == "weibo", // 微博

            ucLowEnd: u.indexOf('UCWEB7.') > -1, //
            ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
            webview: !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) && u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
            ucweb: function() {
                try {
                    return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
                } catch (e) {
                    if (u.indexOf('UC') > -1) {
                        return true;
                    }
                    return false;
                }
            }(),
            Symbian: u.indexOf('Symbian') > -1,
            ucSB: u.indexOf('Firofox/1.') > -1,

            QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
            ucBrw: u.indexOf('UCBrowser') > -1, // UC浏览器
            safari: u.indexOf('Safari') > -1, // safari浏览器
            firefox: u.indexOf('FxiOS') > -1 || u.indexOf('Firefox') > -1, // 火狐浏览器
            chrome: u.indexOf('CriOS') > -1 || (u.indexOf('Chrome') > -1 && uaStrLen <= 1), // 谷歌浏览器
            baiduBrw: ua.indexOf('baidubrowser') > -1, // 百度浏览器
        };
    },
    // 初始化QQ分享
    qqShare: function(title, summary, pic, url) {
        setShareInfo({
            title: title, // 获取页面的标题
            summary: summary, // 获取页面的desc
            pic: pic, // 获取图片
            url: url // 获取地址
        });
        console.log(title);
    },
    // 初始化微信分享
    wxShare: function(appId, timestamp, nonceStr, signature) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            jsApiList: [
                    'checkJsApi', // 检测客户端是否支持指定JS接口
                    'onMenuShareTimeline', // 获取分享到朋友圈按钮点击状态及自定义分享内容接口
                    'onMenuShareAppMessage', // 获取分享给朋友按钮点击状态及自定义分享内容接口
                    'onMenuShareQQ', // 获取分享到QQ按钮点击状态及自定义分享内容接口
                    'onMenuShareQZone', // 获取分享到QQ空间按钮点击状态及自定义分享内容接口
                    'onMenuShareWeibo' // 获取分享到腾讯微博按钮点击状态及自定义分享内容接口
                ] // 必填，需要使用的JS接口列表
        });

        wx.ready(function() {
            // 在这里调用 API
            wx.onMenuShareTimeline({
                title: '', // 分享标题
                link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: '', // 分享标题
                desc: '', // 分享描述
                link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareQQ({
                title: '', // 分享标题
                desc: '', // 分享描述
                link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareWeibo({
                title: '', // 分享标题
                desc: '', // 分享描述
                link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareQZone({
                title: '', // 分享标题
                desc: '', // 分享描述
                link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    }
}