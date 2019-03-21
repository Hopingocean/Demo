// CP对接SDK
GameYawy = function(options) {
  if (!options) {
    alert("GameYawy: 缺少参数");
    return;
  }
  if (!options.gameid) {
    alert("GameYawy: 缺少appid参数");
    return;
  }
  // 属性
  this.gameid = options.gameid; // 游戏ID
  this.payData = {}; // 支付参数

  this.parentWin = window.parent;
  this.utils = new GameYawyUtils(this);

  // 事件回掉
  this.onShareOkCallBack = null;
  // 支付成功事件回调
  this.onPayOkCallBack = null;

  // 初始化
  this.init();
}

// 初始化
GameYawy.prototype.init = function () {
  var _this = this;
  window.addEventListener('message', function(e) {
    if (!e.data) return;
    switch (e.data.action) {
      // 分享成功回调
      case 'share:ok':
        _this.onShareOkCallBack && _this.onShareOkCallBack.call(null);
        break;
      // 支付成功回调
      case 'pay:ok':
        _this.onPayOkCallBack && _this.onPayOkCallBack.call(null);
        break;
    }
  })
}

// 支付
GameYawy.prototype.pay = function (data) {
  var defaults = {
    gameid: this.gameid, // 游戏ID
    username: null, // 用户名
    roleid: null, // 角色名称
    serverid: null, // 服务器ID
    amount: 0, // 金额
    cp_orderid: null, // 订单ID
    productname: null, // 商品名称
    paytime: null, // 时间戳
    sign: null, // 加密字符串
    attach: null, // 透传参数
  };
  data = this.utils.extend(defaults, data);
  if (!data.gameid) {
    alert('缺少参数: gameid');
    return;
  }
  if (!data.username) {
    alert('缺少参数: username');
    return;
  }
  if (!data.roleid) {
    alert('缺少参数: roleid');
    return;
  }
  if (!data.amount) {
    alert('缺少参数: amount');
    return;
  }
  if (!data.cp_orderid) {
    alert('缺少参数: cp_orderid');
    return;
  }
  if (!data.productname) {
    alert('缺少参数: productname');
    return;
  }
  if (!data.paytime) {
    alert('缺少参数: paytime');
    return;
  }
  if (!data.sign) {
    alert('缺少参数: sign');
    return;
  }

  // 支付数据
  this.payData = data;
  var _this = this;
  _this.payYawyH5();
}

// 支付
GameYawy.prototype.payYawyH5 = function () {
  var data = this.payData;
  data.action = 'pay';
  this.postMessage(data);
}

// 分享
GameYawy.prototype.share = function (data) {
  var defaults = {
    gameid: this.gameid, // 游戏ID
    serverid: data.serverid, // 游戏服务器ID
    title: data.title, // 分享标题
    content: data.content, // 分享内容
    ext: data.ext, // 透传参数
  }
  data = this.utils.extend(defaults, data);
  if (!data.gameid) {
    alert('缺少参数: gameid');
    return;
  }
  data.action = 'share';
  this.postMessage(data);
}

// 设置分享回调
GameYawy.prototype.onShareOk = function (callback) {
  this.onShareOkCallBack = callback;
}

// 支付成功回调
GameYawy.prototype.onPayOk = function (callback) {
  this.onPayOkCallBack = callback;
}

// 关注
GameYawy.prototype.showFollow = function (data) {
  var defaults = {
    gameid: this.gameid, // 游戏ID
    serverid: data.serverid, // 游戏服务器ID
    ext: data.ext, // 透传参数
  }
  data = this.utils.extend(defaults, data);
  if (!data.gameid) {
    alert('缺少参数: gameid');
    return;
  }
  data.action = 'follow';
  this.postMessage(data);
}

// 检查是否关注公众号
GameYawy.prototype.checkFollow = function (e) {
  // 关注公众号状态接口
  var url = '';
  this.utils.ajax(url, function(data) {
    if (data && data.subscribe) {
      e && e.call(null, true);
    } else {
      e && e.call(null, false);
    }
  })
}

//向上发送消息
GameYawy.prototype.postMessage = function(data) {
	this.parentWin.postMessage(data, "*");
};

/* 实用工具类 */
GameYawyUtils = function (gameYawy) {
  this.gameYawy = gameYawy;
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

// 设置请求参数
GameYawyUtils.prototype.setParameter = function (e, t, a) {
  e = e.replace(/(#.*)/gi, '');
  var i = new RegExp('([?&])' + t + '=([^&]*)(?=&|$)', 'i');
  if (i.test(e)) {
    return e.replace(i, '$1' + t + '=' + a);
  } else {
    return e + (e.indexOf('?') == -1 ? '?' : '&') + t + '=' + a;
  }
}

// 原生Ajax请求
GameYawyUtils.prototype.ajax = function () {
  var e = {
    method: 'GET',
    url: '',
    data: null,
    type: 'json',
    success: null,
    fail: null,
    tag: null
  }
  switch (arguments.length) {
    case 1:
      if (typeof arguments[0] == 'string') {
        e.url = arguments[0];
      }
      if (typeof arguments[0] == 'object') {
        e = this.extend(e, arguments[0]);
      }
      break;
    case 2:
      e.url = arguments[0];
      e.success = arguments[1];
      break;
    case 3:
      e.url = arguments[0];
      e.success = arguments[1];
      if (typeof arguments[2] == 'string') {
        e.tag = arguments[2];
      }
      if (typeof arguments[2] == 'function') {
        e.fail = arguments[2];
      }
      break;
    case 4:
      e.url = arguments[0];
      e.success = arguments[1];
      e.fail = arguments[2];
      e.tag = arguments[3];
      break;
  }
  e.url = this.setParameter(e.url, '_', Math.random());
  new GameYawyUtilsAjax(this.gameYawy, e.method, e.url, e.data, e.type, e.success, e.fail, e.tag);
}

GameYawyUtilsAjax = function(gameYawy, method, url, data, type, success, fail, tag) {
  this.gameYawy = gameYawy;
  this.url = url;
  this.type = type;
  this.success = success;
  this.fail = fail;
  this.xhr = null;
  if (tag) {
    var l = 'xhr_' + tag;
    this.gameYawy.utils[l] = this.gameYawy.utils[l] || this.createXHR();
    this.xhr = this.gameYawy.utils[l];
  } else {
    this.xhr = this.createXHR();
  }
  var _this = this;
  this.xhr.onreadystatechange = function () {
    _this.callback.apply(_this);
  }
  if (typeof data == 'object' && data != null) {
    var param = [];
    for (var i in data) {
      param.push(i + '=' + encodeURIComponent(data[i]));
    }
    data = param.join('&');
  }
  try {
    this.xhr.open(method, url, true);
    if (method.toUpperCase() == 'POST') {
      this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    this.xhr.send(data);
  } catch (error) {
    console.log(url);
    console.log(error);
  }
}

GameYawyUtilsAjax.prototype.createXHR = function () {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest;
  } else {
    return new ActiveXObject('Micosoft.XMLHTTP');
  }
}
GameYawyUtilsAjax.prototype.callback = function() {
  if (this.xhr.readyState == 4 && this.xhr.status == 200) {
    var response = null;
    switch (this.type) {
      case 'text':
        response = this.xhr.responseText;
        break;
      case 'json':
        try {
          response = JSON.parse(this.xhr.responseText);
        } catch (error) {
          response = this.xhr.responseText;
        }
        break;
    }
    this.success && this.success.call(this.xhr, response);
  } else if (this.xhr.readyState == 4 && this.xhr.status != 200) {
    this.fail && this.fail.call(this.xhr);
    _czc.push(['_trackEvent', 'ajax', 'fail', '[' + this.xhr.readyState + ',' + this.xhr.status + ']' + this.url]);
  }
}