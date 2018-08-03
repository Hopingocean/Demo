import wx from "weixin-js-sdk";
import Request from "@/assets/js/api";

const wxApi = {
    // 是否微信浏览器
    isWeChat() {
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    // 初始化微信分享
    wxInit(shareInfo) {
        const that = this;
        const options = {
            type: "GET",
            url: Request.url.wxShare,
            data: {
                url: location.href.split("#")[0]
            },
            success: function(data) {
                if (data.code == "success") {
                    const appId = data.data.appId;
                    const nonceStr = data.data.nonceStr;
                    const signature = data.data.signature;
                    const timestamp = data.data.timestamp;
                    const title = shareInfo.title;
                    const desc = shareInfo.desc;
                    const imgUrl = shareInfo.imgUrl;
                    const link = shareInfo.link;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature: signature, // 必填，签名
                        jsApiList: [
                                "checkJsApi", // 检测客户端是否支持指定JS接口
                                "onMenuShareTimeline", // 获取分享到朋友圈按钮点击状态及自定义分享内容接口
                                "onMenuShareAppMessage", // 获取分享给朋友按钮点击状态及自定义分享内容接口
                                "onMenuShareQQ", // 获取分享到QQ按钮点击状态及自定义分享内容接口
                                "onMenuShareQZone", // 获取分享到QQ空间按钮点击状态及自定义分享内容接口
                                "onMenuShareWeibo" // 获取分享到腾讯微博按钮点击状态及自定义分享内容接口
                            ] // 必填，需要使用的JS接口列表
                    });

                    wx.ready(function() {
                        // 在这里调用 API
                        wx.onMenuShareTimeline({
                            title: title, // 分享标题
                            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: imgUrl, // 分享图标
                            success: function() {
                                // 用户确认分享后执行的回调函数
                                var data = {"action":"share:ok"};
                                var gameIfr = document.querySelector("#game_iframe");
                                gameIfr.contentWindow.postMessage(data, "*");
                                GameYawy.hideShareTip();
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                        wx.onMenuShareAppMessage({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: imgUrl, // 分享图标
                            type: "", // 分享类型,music、video或link，不填默认为link
                            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                            success: function() {
                                // 用户确认分享后执行的回调函数
                                var data = {"action":"share:ok"};
                                var gameIfr = document.querySelector("#game_iframe");
                                gameIfr.contentWindow.postMessage(data, "*");
                                GameYawy.hideShareTip();
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                        wx.onMenuShareQQ({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: imgUrl, // 分享图标
                            success: function() {
                                // 用户确认分享后执行的回调函数
                                var data = {"action":"share:ok"};
                                var gameIfr = document.querySelector("#game_iframe");
                                gameIfr.contentWindow.postMessage(data, "*");
                                GameYawy.hideShareTip();
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                        wx.onMenuShareWeibo({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: imgUrl, // 分享图标
                            success: function() {
                                // 用户确认分享后执行的回调函数
                                var data = {"action":"share:ok"};
                                var gameIfr = document.querySelector("#game_iframe");
                                gameIfr.contentWindow.postMessage(data, "*");
                                GameYawy.hideShareTip();
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                        wx.onMenuShareQZone({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: imgUrl, // 分享图标
                            success: function() {
                                // 用户确认分享后执行的回调函数
                                var data = {"action":"share:ok"};
                                var gameIfr = document.querySelector("#game_iframe");
                                gameIfr.contentWindow.postMessage(data, "*");
                                GameYawy.hideShareTip();
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    });
                }
            }
        };
        Request.ajax(options);
    },
    // 初始化QQ分享
    qqShare: function(shareInfo) {
        const title = shareInfo.title;
        const summary = shareInfo.desc;
        const pic = shareInfo.imgUrl;
        const url = shareInfo.link;
        setShareInfo({
            title: title, // 获取页面的标题
            summary: summary, // 获取页面的desc
            pic: pic, // 获取图片
            url: url // 获取地址
        });
    }
};

export default wxApi;