var qt_register_weixin_share;
$(function() {
    function getQueryParams() {
        var query = location.search.substring(1);
        if (query == "") return {};
        var queryParams = {};
        query = query.split("&");
        for (var i in query) {
            var pair = query[i].split('=');
            if (pair.length != 2)
                continue;
            k = decodeURIComponent(pair[0].replace(/\+/g, " "));
            v = decodeURIComponent(pair[1].replace(/\+/g, " "));
            queryParams[k] = queryParams[k]? queryParams[k] + "," + v: v;
        }
        return queryParams;
    }
    queryParams = getQueryParams()
    var share_obj = {}
    var configured = false
    qt_register_weixin_share = function(obj) {
        share_obj = obj
        if (configured) {
            _register_weixin_share(share_obj)
        }
    }

    function _register_weixin_share(share_obj) {
        function shadow_copy(obj) {
            var copy = (this instanceof Array) ? [] : {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
            }
            return copy
        }
        function wrapper(sns) {
        	var _share_obj = shadow_copy(share_obj)
            _share_obj.success = function() {
                if (share_obj.success) share_obj.success(sns)
            }
            _share_obj.cancel = function() {
                if (share_obj.cancel) share_obj.cancel(sns)
            }
            return _share_obj
        }

        // 分享到微信朋友圈
        wx.onMenuShareTimeline(wrapper("timeline"));

        // 分享到微信会话
        wx.onMenuShareAppMessage(wrapper("appmessage"));

        // 分享到QQ会话
        wx.onMenuShareQQ(wrapper("qq"));

        // 分享到腾讯微博
        wx.onMenuShareWeibo(wrapper("weibo"));

        // 分享到QQ空间
        wx.onMenuShareQZone(wrapper("qzone"));
    }
    wx.ready(function() {
        if (share_obj) {
            _register_weixin_share(share_obj)
        }
        configured = true
    })
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger')>= 0 || ua.indexOf('wechat')>= 0) {
        $.ajax({
            url:$("#ctx").val()+'/weixin/signature',
            type: 'POST',
            data:{
                url: window.location.href,
                appName:'LTYT'
            },
            success: function (data) {
                data = typeof data==='string'?JSON.parse(data):data;
                if (data['errCode'] == 0) {
                    weixin = data['data'];
                    wx.config({
                        debug: false,
                        appId: weixin['appid'],
                        timestamp: weixin['timestamp'],
                        nonceStr: weixin['noncestr'],
                        signature: weixin['signature'],
                        jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                        ]
                    });
                }
            }
        });
    }
})
