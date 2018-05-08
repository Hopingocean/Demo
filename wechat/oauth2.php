<?php
header("Content-Type:text/html;charset=utf-8");

$userinfo = getUserInfo();
function getUserInfo() {
	$code = $_GET['code'];
	$appid = 'wx9d658105ddef6af0';
	$appsecret = '0ec78c9594a74032b201daab8698ce78';
	$access_token = '';

	$access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
	$access_token_json = https_request($access_token_url);
	$access_token_array = json_decode($access_token_json, true);
	$access_token = $access_token_array['access_token'];
	$openid = $access_token_array['openid'];
	// 根据access_token和openid获取用户信息
	$userinfo_url = "https://api.weixin.qq.com/sns/userinfo?access_token=$access_token&openid=$openid&lang=zh_CN";
	$userinfo_json = https_request($userinfo_url);
	$userinfo_array = json_decode($userinfo_json, true);

	echo '<p>'.$userinfo_array['nickname'].'</p>';
	echo '<p>'.$userinfo_array['sex'].'</p>';
	echo '<p>'.$userinfo_array['province'].'</p>';
	echo '<p>'.$userinfo_array['city'].'</p>';
	echo '<p>'.$userinfo_array['country'].'</p>';
	// 渲染userinfo
	return $userinfo_array;
}

function https_request($url) {
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($curl);
	return $data;
}
?>