export default {
    // 获取url参数
    getUrlKey: function(key) {
        const href = location.href.split("#")[0];
        return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    },
    // 删除指定url参数
    changeUrlKeyVal: function(key, val) {
        const href = location.href.split("#")[0];
        const pattern = key + '=([^&]*)';
        const replaceText = key + '=' + val;
        return href.match(pattern) ? href.replace(eval('/(' + key + '=)([^&]*)/gi'), replaceText) : (href.match('[\?]') ? href + '&' + replaceText : href + '?' + replaceText);
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
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // 安卓终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
            iPhone: u.indexOf('iPhone') > -1, // 是否为iphone
            mac: u.indexOf('Mac') > -1, // 是否为Mac
            iPad: u.indexOf('iPad') > -1, // 是否为iPad

            weChat: u.indexOf('MicroMessenger') > -1, // 微信
            QQ: ua.match(/QQ/i) == "qq", // QQ
            weiBo: ua.match(/WeiBo/i) == "weibo", // 微博

            QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
            ucBrw: u.indexOf('UCBrowser') > -1, // UC浏览器
            safari: u.indexOf('Safari') > -1, // safari浏览器
            firefox: u.indexOf('FxiOS') > -1 || u.indexOf('Firefox') > -1, // 火狐浏览器
            chrome: u.indexOf('CriOS') > -1 || (u.indexOf('Chrome') > -1 && uaStrLen <= 1), // 谷歌浏览器
            baiduBrw: ua.indexOf('baidubrowser') > -1, // 百度浏览器
        }
    }(),
}