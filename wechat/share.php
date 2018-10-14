<?php

header('Content-Type:application/json');
$shareInfo = weChatShare();
// 微信分享初始化参数
function weChatShare() {
    $url = $_GET['url'];
	$app_id = 'wx99c4aef7a7db55e2';
	$app_secret = '2af16363d812c02f9f571a30bf86b9c6';
    $access_token = getAccessToken();

    // 获取签名
    $noncestr = createNonceStr();
    $ticket = getJsApiTicket($access_token->access_token);
    $timestamp = time();
    // 字典排序并sha1加密jsapi_ticket=&noncestr=&timestamp=&url=
    $str = 'jsapi_ticket=' . $ticket . '&noncestr=' . $noncestr . '&timestamp=' . $timestamp . '&url=' . $url;
    $signature = sha1($str);

    // 获取appid
    $data = array(
      'app_id' => $app_id,
      'noncestr' => $noncestr,
      'timestamp' => $timestamp,
      'signature' => $signature
    );
    $data = json_encode($data);
    echo $data;
}

// 获取拉取用户信息所需access_token
function getAccessToken() {
    $app_id = 'wx99c4aef7a7db55e2';
	$app_secret = '2af16363d812c02f9f571a30bf86b9c6';
    $access_token_url = 'https://api.weixin.qq.com/cgi-bin/token?appid='. $app_id . '&secret=' . $app_secret . '&grant_type=client_credential';
    $access_token = json_decode(file_get_contents($access_token_url));
    if (isset($access_token->errcode)) {
        return $access_token;
    }
    return $access_token;
}

// 生成noncestr
function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
        $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
}

// 获取jsApiTicket
function getJsApiTicket($token) {
    $jsapi_ticket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' . $token . '&type=jsapi';
    $jsapi_ticket = json_decode(file_get_contents($jsapi_ticket_url));
    if ($jsapi_ticket->errcode != 0) {
      return $jsapi_ticket->errcode;
    }
    $ticket = get_object_vars($jsapi_ticket);
    return $ticket['ticket'];
}