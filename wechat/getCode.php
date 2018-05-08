<?php

$appid = 'wx9d658105ddef6af0';
$appsecret = '0ec78c9594a74032b201daab8698ce78';
$redirect = 'http://www.lee12589.cn/wechat/oauth2.php';
$code_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=$appid&redirect_uri=$redirect&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
header("Location:".$code_url);

?>