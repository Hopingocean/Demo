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
    }
}