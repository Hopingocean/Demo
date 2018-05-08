<?php

/*
    Lee
*/
define("TOKEN", "Lee");

$wechatObj = new wechatCallbackapiTest();

if (isset($_GET['echostr'])) {
    $wechatObj->valid();
} else {
    $wechatObj->responseMsg();
}



class wechatCallbackapiTest
{

    public function valid()
    {

        $echoStr = $_GET["echostr"];

        if ($this->checkSignature()) {
            header('content-type:text');

            echo $echoStr;

            exit;
        }
    }



    private function checkSignature()
    {

        $signature = $_GET["signature"];

        $timestamp = $_GET["timestamp"];

        $nonce = $_GET["nonce"];



        $token = TOKEN;

        $tmpArr = array($token, $timestamp, $nonce);

        sort($tmpArr, SORT_STRING);

        $tmpStr = implode( $tmpArr );

        $tmpStr = sha1( $tmpStr );



        if ($tmpStr == $signature) {
            return true;
        } else {
            return false;
        }
    }



    public function responseMsg()
    {

        // 高版本php7不支持，需要修改php.ini
        // $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        // echo empty($postStr);
        // exit;

        $postStr = file_get_contents('php://input');

        if (!empty($postStr)) {
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);

            $RX_TYPE = trim($postObj -> MsgType);
            // 用户发送的消息类型判断
            switch ($RX_TYPE) {
                case 'event': // 事件
                    $result = $this->receiveEvent($postObj);
                    break;
                case 'text': // 文本消息
                    $result = $this->receiveText($postObj);
                    break;
                case 'image': // 图片消息
                    $result = $this->receiveImage($postObj);
                    break;
                case 'voice': // 语音消息
                    $result = $this->receiveVoice($postObj);
                    break;
                case 'video': // 视频消息
                    $result = $this->receiveVideo($postObj);
                    break;
                case 'location': // 位置消息
                    $result = $this->receiveLocation($postObj);
                    break;
                case 'link': // 链接消息
                    $result = $this->receiveLink($postObj);
                    break;
                default:
                    $result = 'unknow msg type:'.$RX_TYPE;
                    break;
            }
            echo $result;
        } else {
            echo "";

            exit;
        }
    }

    // 接收事件
    private function receiveEvent($object) {
        $content = '';
        switch ($object->Event) {
            case 'subscribe': // 关注事件
                $content = '欢迎关注Lee!';
                break;
            case 'unsubscribe': // 取消关注事件
                $content = '';
                break;
            case 'CLICK':
                switch ($object->EventKey) {
                    case 'COMPANY':
                        $content = array();
                        $content[] = array('Title'=>'Lee', 'Description'=>'', 'PicUrl'=>'', 'Url'=>'');
                        break;
                    default:
                        $content = '单击菜单：'.$object->EventKey;
                        break;
                }
                break;
            case 'VIEW':
                $content = '跳转链接'.$object->EventKey;
                break;
            case 'SCAN':
                $content = '扫描场景'.$object->EventKey;
                break;
            case 'LOCATION':
                $content = '上传位置：纬度'.$object->Latitude.';经度'.$object->Longitude;
                break;
            case 'scancode_waitmsg':
                $content = '扫码带提示：类型'.$object->ScanCodeInfo->ScanType.'结果：'.$object->ScanCodeInfo->ScanResult;
                break;
            case 'scancode_push':
                $content = '扫码推事件';
                break;
            case 'pic_sysphoto':
                $content = '系统拍照';
                break;
            case 'pic_weixin':
                $content = '相册发图：数量'.$object->SendPicsInfo->Count;
                break;
            case 'pic_photo_or_album':
                $content = '拍照或者相册：数量'.$object->SendPicsInfo->Count;
                break;
            case 'location_select':
                $content = '发送位置：标签'.$object->SendLocationInfo->Label;
                break;
            default:
                $content = 'receive a new event: '.$object->Event;
                break;
        }
        if (is_array($content)) {
            if (isset($content[0]['PicUrl'])) {
                $result = $this->transmitNews($object, $content);
            } else if (isset($content['MusicUrl'])) {
                $result = $this->transmitMusic($object, $content);
            }
        } else {
            $result = $this->transmitText($object, $content);
        }
        // $result = $this->transmitText($object, $content);
        return $result;
    }
    // 接收文本消息
    private function receiveText($object) {
        $content = '你发送的是文本，内容为：'.$object->Content;
        $result = $this->transmitText($object, $content);
        return $result;
    }
    // 接收图片消息
    private function receiveImage($object) {
        $content = '你发送的是图片，地址为：'.$object->PicUrl;
        $result = $this->transmitText($object, $content);
        return $result;
    }
    // 接收语音消息
    private function receiveVoice($object) {
        $content = '你发送的是语音，媒体ID为：'.$object->MediaId;
        $result = $this->transmitText($object, $content);
        return $result;
    }
    // 接收视频消息
    private function receiveVideo($object) {
        $content = '你发送的是视频，媒体ID为：'.$object->MediaId;
        $result = $this->transmitText($object, $content);
        return $result;
    }
    // 接收位置消息
    private function receiveLocation($object) {
        $content = '你发送的是位置，维度为：'.$object->Location_X.';经度为：'.$object->Location_Y.';缩放级别为：'.$object->Scale.';位置为：'.$object->Label;
        $result = $this->transmitText($object, $content);
        return $result;
    }
    // 接收链接消息
    private function receiveLink($object) {
        $content = '你发送的是链接，标题为：'.$object->Title.';内容为：'.$object->Description.';链接地址为：'.$object->Url;
        $result = $this->transmitText($object, $content);
        return $result;
    }
    // 回复文本消息
    private function transmitText($object, $content) {
        $textTpl = "<xml>
        <ToUserName><![CDATA[%s]]></ToUserName>
        <FromUserName><![CDATE[%s]]></FromUserName>
        <CreateTime>%s</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[%s]]></Content>
        </xml>";
        $result = sprintf($textTpl, $object->FromUserName, $object->ToUserName, time(), $content);
        return $result;
    }
    // 回复图文消息
    private function transmitNews($object, $arr_item) {
        if (!is_array($arr_item)) return;
        $itemTpl = "<item>
        <Title><![CDATA[%s]]></Title>
        <Description><![CDATA[%s]]</Description>
        <PicUrl><![CDATA[%s]]></PicUrl>
        <Url><![CDATA[%s]]></Url>
        </item>";
        $item_str = '';
        foreach ($arr_item as $item) {
            $item_str .= sprintf($itemTpl, $item['Title'], $item['Description'], $item['PicUrl'], $item['Url']);
        }
        $newsTpl = "<xml>
        <ToUserName><![CDATA[%s]]></ToUserName>
        <FromUserName><![CDATA[%s]]></FromUserName>
        <CreateTime><![CDATA[%s]]></CreateTime>
        <MsgType><![CDATA[%s]]></MsgType>
        <Content><![CDATA[]]></Content>
        <ArticleCount>%s</ArticleCount>
        <Articles>$item_str</Articles>
        </xml>";
        $result = sprintf($newsTpl, $object->FromUserName, $object->ToUserName, time(), count($arr_item));
        return $result;
    }
}

header("Content-Type:text/html;charset=utf-8");
