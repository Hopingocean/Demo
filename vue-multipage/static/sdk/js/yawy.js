// 平台方接收SDK信息
GameYawy = function () {
  this.ui = null;
  this.init();
}

GameYawy.prototype.init = function () {
  this.initFrameEvents();
  this.utils = new GameYawyUtils(this);
  this.ui = new GameYawyUi(this);
  this.pay = new GameYawyPay(this);
}

GameYawy.prototype.initFrameEvents = function () {
  var e = this;
}

// 分享成功调用此统计
GameYawy.prototype.shareSuccessStatics = function(uid) {
  if (!uid) {
    console.log('uid参数为空');
    return;
  }
  // 分享统计接口
  var u = '' + uid;
  GameYawyUtils.prototype.ajax(u, function(t) {});
}

// GameYawyPay类
GameYawyPay =  function (e) {
  this.gameYawy = e;
  this.data = null;
  this.init();
}

GameYawyPay.prototype.init = function() {
  var e = this;
  window.addEventListener('message', function(t) {
    switch(t.data.action) {
      case 'pay':
        if (!t.data.gameid) {
          alert('gameid参数为空');
          return;
        }
        e.data = t.data;
        if (!document.getElementById('yawyPay')) {
          e.createOrder();
        }
        break;
      case 'share':
        e.showShare();
        // 分享统计
        var u = '' + t.data.gameid;
        GameYawyUtils.prototype.ajax(u, function(t) {});
        break;
      case 'follow':
        e.showFollow();
        break;
    }
  })
}

// 生成订单
GameYawyPay.prototype.createOrder = function () {
  // 判断是否是微信登陆
  var user = '/open/jjh/checkmember?username=' + this.data.username;
  // 生成订单接口
  var u = '/open/jjh/jspay?sign=' + this.data.sign + '&username=' + this.data.username + '&roleid=' + this.data.roleid + "&paytime=" + this.data.paytime + "&amount=" + this.data.amount + "&productname=" + this.data.productname + "&cp_orderid=" + this.data.cp_orderid + "&gameid=" + this.data.gameid + "&serverid=" + this.data.serverid + "&attach=" + this.data.attach;
  GameYawyUtils.prototype.ajax(user, function(obj) {
    if (obj.code == 'success') {
      var isWechat = obj.data.is_wx;
      GameYawyUtils.prototype.ajax(u, function(t) {
        if (t.code == 'success') {
          // 唤起支付
          t.data.isWechat = isWechat;
          GameYawyUi.prototype.echoPay(t.data);
        } else {
          alert(t.msg);
          return false;
        }
      })
    }
  })
}

// 分享提示
GameYawyPay.prototype.showShare = function () {
  var i = document.createElement('div');
  i.id = 'yawyShare';
  i.className = 'popup_bg';
  if (!document.getElementById('yawyShare')) {
    document.getElementsByTagName('body')[0].appendChild(i);
  }
  var str = '<span class="gdwx_wem"><img src="/static/sdk/img/share_tips.png" alt="分享提示"></span>'
  i.innerHTML = str;

  var t = document.getElementById('yawyShare');
  t.addEventListener('touchstart', function () {
    t.parentElement.removeChild(t);
  })
  t.addEventListener('click', function () {
    t.parentElement.removeChild(t);
  })
}

// 关注提示
GameYawyPay.prototype.showFollow = function () {
  var i = document.createElement('div');
  i.id = 'yawyFollow';
  i.className = 'sdk_popup_bg';
  if (!document.getElementById('yawyFollow')) {
    document.getElementsByTagName('body')[0].appendChild(i);
  }
  var str = '<div class="subscribeHeader">长按二维码识别或微信扫一扫<img id="subscribeHeader" src="/static/sdk/img/h5c_closed.png"></div>';
  str += '<span><img src="/static/sdk/img/qrCode.jpg" /></span>';

  i.innerHTML = str;

  var t = document.getElementById('subscribeHeader');
  var b = document.getElementById('yawyFollow');
  t.addEventListener('touchstart', function () {
    b.parentElement.removeChild(b);
  })
  t.addEventListener('click', function () {
    b.parentElement.removeChild(b);
  })
}

// 定时查询订单关闭支付页面
GameYawyPay.prototype.timer = function (orderid) {
  var d = this;
  var i = 1;
  d.int = setInterval(function () {
    var u = '/open/jjh/checkpay?orderid=' + orderid;
    GameYawyUtils.prototype.ajax(u, function(data) {
      i++;
      if (i > 500) {
        clearInterval(d.int);
        GameYawyUi.prototype.hidePay();
      }
      if (data.code == 'success' && data.data.reload != 1) {
        clearInterval(d.int);
        GameYawyUi.prototype.hidePay();
      } else if (data.code == 'success' && data.data.reload == 1) {
        clearInterval(d.int);
        location.reload();
      }
    })
  }, 5000)
}

// 调用微信支付接口
GameYawyPay.prototype.jsApiCall = function (data) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    data.jsApiParameters,
    function(res){
      WeixinJSBridge.log(res.err_msg);
      console.log(res.err_code + res.err_desc + res.err_msg);
      if(res.err_msg == "get_brand_wcpay_request:ok" ){
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
        // 支付取消
        var i = document.createElement('div');
        i.id = 'dialog__tip';
        i.className = 'sdk_popup_bg';
        if (!document.getElementById('dialog__tip')) {
          document.getElementsByTagName('body')[0].appendChild(i);
        }
        var str = '<div class="title--tip">提示信息</div>';
        str += '<p class="tips">支付订单取消</p>';
        str += '<p class="btn--close" onclick="GameYawyUi.prototype.hideTip()">关闭</p>';

        i.innerHTML = str;
      } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
        // 支付失败
        var i = document.createElement('div');
        i.id = 'dialog__tip';
        i.className = 'sdk_popup_bg';
        if (!document.getElementById('dialog__tip')) {
          document.getElementsByTagName('body')[0].appendChild(i);
        }
        var str = '<div class="title--tip">提示信息</div>';
        str += '<p class="tips">支付失败</p>';
        str += '<p class="btn--close" onclick="GameYawyUi.prototype.hideTip()">关闭</p>';

        i.innerHTML = str;
      }
    }
  );
}
// 微信内唤起支付窗口
GameYawyPay.prototype.callWechatPay = function (data) {
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', GameYawyPay.prototype.jsApiCall(data), false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', GameYawyPay.prototype.jsApiCall(data)); 
        document.attachEvent('onWeixinJSBridgeReady', GameYawyPay.prototype.jsApiCall(data));
    }
  }else{
    GameYawyPay.prototype.jsApiCall(data);
  }
}

// GameYawyUtils类
GameYawyUtils = function (e) {
  this.gameYawy = e;
}

// 浅复制对象
GameYawyUtils.prototype.extend = function (target, options) {
  if (target == undefined || target == null) {
    return options;
  } else {
    if (options) {
      for (var name in options) {
        target[name] = options[name];
      }
    }
    return target;
  }
}

// 格式化请求参数
GameYawyUtils.prototype.setParameter = function(e, t, a) {
  e = e.replace(/(#.*)/gi, "");
  var i = new RegExp("([?&])" + t + "=([^&]*)(?=&|$)", "i");
  if (i.test(e)) {
    return e.replace(i, "$1" + t + "=" + a);
  } else {
    return e + (e.indexOf("?") == -1 ? "?": "&") + t + "=" + a;
  }
};

GameYawyUtils.prototype.removeParameter = function(e, t) {
  e = e.replace(/(#.*)/gi, "");
  var a = new RegExp("([?&])" + t + "=([^&]*)(?=&|$)", "i");
  if (a.test(e)) {
    e = e.replace(a, "");
    if (e.indexOf("?") == -1) e = e.replace("&", "?");
  }
  return e;
};

GameYawyUtils.prototype.ajax = function() {
  var e = {
    method: "GET",
    url: "",
    data: null,
    type: "json",
    success: null,
    fail: null,
    tag: null
  };
  switch (arguments.length) {
  case 1:
    if (typeof arguments[0] == "string") e.url = arguments[0];
    if (typeof arguments[0] == "object") e = this.extend(e, arguments[0]);
    break;
  case 2:
    e.url = arguments[0];
    e.success = arguments[1];
    break;
  case 3:
    e.url = arguments[0];
    e.success = arguments[1];
    if (typeof arguments[2] == "string") e.tag = arguments[2];
    if (typeof arguments[2] == "function") e.fail = arguments[2];
    break;
  case 4:
    e.url = arguments[0];
    e.success = arguments[1];
    e.fail = arguments[2];
    e.tag = arguments[3];
  }
  e.url = this.setParameter(e.url, "_", Math.random());
  new GameGgUtilsAjax(this.gameYawy, e.method, e.url, e.data, e.type, e.success, e.fail, e.tag);
};


GameYawyUtils.prototype.isMobile = function() {
  var e = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "nokia", "ucweb", "skyfire");
  var t = navigator.userAgent.toLowerCase();
  for (var a = 0; a < e.length; a++) {
    if (t.indexOf(e[a]) != -1) {
      return true;
    }
  }
  return false;
};
GameYawyUtils.prototype.isIos = function() {
  return /iPhone|iPod|iPad|Mac/gi.test(navigator.userAgent);
};
GameYawyUtils.prototype.isAndroid = function() {
  return /android|linux/i.test(navigator.userAgent);
};
GameYawyUtils.prototype.isWindowsWechat = function() {
  return /WindowsWechat/gi.test(navigator.userAgent);
};
GameYawyUtils.prototype.isSafari = function() {
  return navigator.userAgent.indexOf("Safari") != -1;
};
GameYawyUtils.prototype.getAppType = function() {
  var e = navigator.userAgent;
  if (/micromessenger/gi.test(e)) {
    return "wx";
  } else {
    return "other";
  }
};

GameGgUtilsAjax = function(e, t, a, i, n, s, o, r) {
  this.gameYawy = e;
  this.url = a;
  this.type = n;
  this.success = s;
  this.fail = o;
  this.xhr = null;
  if (r) {
    var l = "xhr_" + r;
    this.gameYawy.utils[l] = this.gameYawy.utils[l] || this.createXHR();
    this.xhr = this.gameYawy.utils[l];
  } else {
    this.xhr = this.createXHR();
  }
  var c = this;
  this.xhr.onreadystatechange = function() {
    c.callback.apply(c);
  };
  if (typeof i == "object" && i != null) {
    var m = [];
    for (var g in i) {
      m.push(g + "=" + encodeURIComponent(i[g]));
    }
    i = m.join("&");
  }
  try {
    this.xhr.open(t, a, true);
    if (t.toUpperCase() == "POST") {
      this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    }
    this.xhr.send(i)
  } catch(e) {
    console.log(a);
    console.log(e);
  }
};
GameGgUtilsAjax.prototype.createXHR = function() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest;
  } else {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
};
GameGgUtilsAjax.prototype.callback = function() {
  if (this.xhr.readyState == 4 && this.xhr.status == 200) {
    var e = null;
    switch (this.type) {
    case "text":
      e = this.xhr.responseText;
      break;
    case "json":
      try {
        e = JSON.parse(this.xhr.responseText);
      } catch(t) {
        e = this.xhr.responseText;
      }
      break;
    }
    this.success && this.success.call(this.xhr, e);
  } else if (this.xhr.readyState == 4 && this.xhr.status != 200) {
    this.fail && this.fail.call(this.xhr);
    _czc.push(["_trackEvent", "ajax", "fail", "[" + this.xhr.readyState + "," + this.xhr.status + "]" + this.url]);
  }
};

// GameYawyUi类
GameYawyUi = function (e) {
  this.gameYawy = e;
}

GameYawyUi.prototype.echoPay = function (data) {
  var str = '';
  var ism = GameYawyUtils.prototype.isMobile();
  var isApp = GameYawyUtils.prototype.getAppType();
  if (ism) {
    // 微信用户
    if (data.isWechat == 1) {
      if (isApp == 'wx') {
        var that = this;
        var u = '/open/jjh/dopay?payway_id=4&jssdk=1&orderid=' + data.orderid;
        GameYawyUtils.prototype.ajax(u, function(obj) {
          if (obj.code == 'success') {
            data.jsApiParameters = obj.data.jsApiParameters;
            GameYawyPay.prototype.callWechatPay(data);
          }
        })
      }
    } else {
      str = this.wapPay(data);
      var i = document.createElement('div');
      i.id = 'yawyPay';
      i.className = 'popup_bg';
      document.getElementsByTagName('body')[0].appendChild(i);
      i.innerHTML = str;
    }
  } else {
    var that = this;
    var u = '/open/jjh/dopay?payway_id=6&jssdk=1&orderid=' + data.orderid;
    GameYawyUtils.prototype.ajax(u, function(obj) {
      if (obj.code == 'success') {
        data.wxCode = obj.data.image;
        str = that.pcPay(data);

        var i = document.createElement('div');
        i.id = 'yawyPay';
        i.className = 'popup_bg';
        document.getElementsByTagName('body')[0].appendChild(i);
        i.innerHTML = str;
      }
    })
  }
  GameYawyPay.prototype.timer(data.orderid);
}

GameYawyUi.prototype.pcPay = function(data) {
  var str = "";
	str += '<div class="payment">';
	str += '<a href="javascript:;" class="closed_b" onclick="GameYawyUi.prototype.hidePay()"><img src="/static/sdk/img/h5c_closed.png" alt="close"></a>';
	str += '<p class="zfbt">本次消费</p>';
	str += '<p class="kfje">' + data.amount + '元</p>';
	str += '<p class="kfxz">请选择支付方式</p>';
	str += '<div class="stw">';
	str += '  <a href="javascript:;" class="current">微信支付</a>';
	// str += '  <a href="javascript:;">支付宝支付</a>';
	str += '</div>';
	str += '<div class="paycon">';
	str += '  <div class="zftit"><span><img src="/static/sdk/img/icon_wx.png" alt="code"></span><span>请打开微信扫描下方二维码</span></div>';
	str += '    <div class="zfewm">';
	str += '      <img id="pcWechatPay" alt="微信扫码支付" src="data:image/png;base64,' + data.wxCode + '" style="width:200px;height:200px;"/>';
	str += '    </div>';
	str += '  </div>';
	str += '</div>';
	return str;
}

GameYawyUi.prototype.wapPay = function (data) {
  var isApp = GameYawyUtils.prototype.getAppType();
	var isIos = GameYawyUtils.prototype.isIos();
  var isAndroid = GameYawyUtils.prototype.isAndroid();
	
	var str = "";
	str += '<div class="login-mode">';
	str += '  <div class="tpayment">';
	str += '	  <a href="javascript:;" class="closed_b" onclick="GameYawyUi.prototype.hidePay()"><img src="/static/sdk/img/icon_close.png" alt="close"></a>';
	str += '    <span class="tltit tltit3">支付</span>';
	str += '    <p class="zfbt">本次消费</p>';
	str += '    <p class="kfje">' + data.amount + '元</p>';
	str += '    <p class="kfxz">请选择支付方式</p>';
	
	if (isApp == "wx"){ // 微信内 手机端
		str += '<form action="/open/jjh/dopay" name="wxjspay" method="post" target="_top">';
		str += '  <input type="hidden" name="payway_id" value="4"/>';
		str += '  <input type="hidden" name="orderid" value="' + data.orderid + '"/>';
		str += '  <a href="javascript:;" class="wxpay" onclick="document.wxjspay.submit()"><em><img src="/static/sdk/img/icon_wx.png"></em><span>微信支付</span><b><img src="/static/sdk/img/h5c_in.png"></b></a>';
		str += '</form>';
		// str += '<a href="javascript:;" class="wxpay"><em><img src="/static/sdk/img/icon_alipay.png"></em><span>支付宝支付</span><b><img src="/static/sdk/img/h5c_in.png"></b></a>';
	} else if (isIos || isAndroid) {
		str += '<form action="/open/jjh/dopay" name="wxjspay" method="post" target="_top">';
		str += '  <input type="hidden" name="payway_id" value="7"/>';
		str += '  <input type="hidden" name="orderid" value="' + data.orderid + '"/>';
		str += '  <a href="javascript:;" class="wxpay" onclick="document.wxjspay.submit()"><em><img src="/static/sdk/img/icon_wx.png"></em><span>微信支付</span><b><img src="/static/sdk/img/h5c_in.png"></b></a>';
		str += '</form>';
		// str += '<a href="javascript:;" class="wxpay"><em><img src="/static/sdk/img/icon_alipay.png"></em><span>支付宝支付</span><b><img src="/static/sdk/img/h5c_in.png"></b></a>';
	} else {
		// 现在支付wap支付
		str += '<form action="/open/jjh/dopay" name="wxjspay" method="post" target="_top">';
		str += '  <input type="hidden" name="payway_id" value="7"/>';
		str += '  <input type="hidden" name="orderid" value="' + data.orderid + '"/>';
		str += '  <a href="javascript:;" class="wxpay" onclick="document.wxjspay.submit()"><em><img src="/static/sdk/img/icon_wx.png"></em><span>微信支付</span><b><img src="/static/sdk/img/h5c_in.png"></b></a>';
		str += '</form>';
		// str += '<form action="" name="aliPay" method="get" target="_top">';
		// str += '  <input type="hidden" name="orderid" value="' + data.orderid + '"/>';
		// str += '  <a href="javascript:;" class="wxpay" onclick="document.aliPay.submit()"><em><img src="/static/sdk/img/icon_alipay.png"></em><span>支付宝支付</span><b><img src="/static/sdk/img/h5c_in.png"></b></a>';
		// str += '</form>';
	}
	
	str += '</div>';
	str += '</div>';
	return str;
}

// 关闭支付窗口
GameYawyUi.prototype.hidePay = function () {
  var e = document.getElementById('yawyPay');
  if (e) {
    e.parentElement.removeChild(e);
  }
}

// 关闭提示窗口
GameYawyUi.prototype.hideTip = function () {
  var el = document.getElementById('dialog__tip');
  if (el) {
    el.parentElement.removeChild(el);
  }
}

// 分享成功关闭提示页面
GameYawy.prototype.hideShareTip = function () {
  var el = document.getElementById('yawyShare');
  if (el) {
    el.parentElement.removeChild(el);
  }
}