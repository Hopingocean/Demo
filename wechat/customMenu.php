<?php

$appid = 'wx9d658105ddef6af0';
$appsecret = '0ec78c9594a74032b201daab8698ce78';
$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
$jsoninfo = json_decode($output, true);
$access_token = $jsoninfo['access_token'];
// 自定义菜单（type均为event事件）
$jsonmenu = '{
    "button": [
        {
            "name": "扫码",
            "sub_button": [
                {
                    "type": "scancode_waitmsg",
                    "name": "扫码带提示",
                    "key": "rselfmenu_0_0"
                },
                {
                    "type": "scancode_push",
                    "name": "扫码推事件",
                    "key": "reslfmenu_0_1"
                }
            ]
        },
        {
            "name": "发图",
            "sub_button": [
                {
                    "type": "pic_sysphoto",
                    "name": "系统拍照发图",
                    "key": "rselfmenu_1_0"
                },
                {
                    "type": "pic_photo_or_album",
                    "name": "拍照或者相册发图",
                    "key": "rselfmenu_1_1"
                },
                {
                    "type": "pic_weixin",
                    "name": "微信相册发图",
                    "key": "rselfmenu_1_2"
                }
            ]
        },
        {
            "name": "其他",
            "sub_button": [
                {
                    "name": "发送位置",
                    "type": "location_select",
                    "key": "rselfmenu_2_0"
                },
                {
                    "name": "今日歌曲",
                    "type": "click",
                    "key": "V1001_TODAY_MUSIC"
                },
                {
                    "name": "X6 GAME",
                    "type": "view",
                    "url": "http://h5.xgame9.com"
                },
                {
                    "name": "OAuth2.0",
                    "type": "view",
                    "url": "http://www.lee12589.cn/wechat/getCode.php"
                }
            ]
        }
    ]
}';

// 自定义菜单请求地址
$customMenuUrl = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=$access_token";
$customMenuResult = https_request($customMenuUrl, $jsonmenu);
var_dump($customMenuResult);

function https_request($url, $data = null) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if (!empty($data)) {
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}