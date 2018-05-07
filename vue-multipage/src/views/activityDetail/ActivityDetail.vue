<template>
  <div id="app" class="activityDetail">
    <div class="gameInfo flex">
        <img :src="gameInfo.gameIcon" alt="icon">
        <div class="flex flex-v flex-list">
            <p>{{ gameInfo.gameName }}</p>
            <p>{{ activityDetail.activityName }}</p>
            <p>{{ activityDetail.createTime }}</p>
        </div>
    </div>
    <!-- 活动内容 -->
    <div class="activity" v-html="activityDetail.content"></div>
    <!-- btn -->
    <div id="bottomBtn" class="btn__group flex">
      <a href="javascript:void(window.history.go(-1));" class="btn btn--back">返回</a>
      <a :href=" 'game.html?gameId=' + gameId + '&agentId=' + agentId" class="btn btn--play flex-list">开始游戏</a>
    </div>
  </div>
</template>

<script>
import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

export default {
    name: 'ActivityDetail',
    data() {
        return {
            agentId: '',
            gameId: '',
            gameInfo: {
                gameId: 1,
                gameName: '集结号捕鱼',
                gameIcon: 'https://game.11h5.com/static/images/2017/0421/20170421094832825.gif',
            },
            activityDetail: {
                activityName: '心又开启',
                createTime: '2018/04/26',
                content: '活动内容'
            }
        }
    },
    created: function () {
        this.gameId = CommonMethods.getUrlKey('gameId');
        this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
    },
    methods: {
        getGameDetail() {
            var that = this;
            var options = {
                type: 'get',
                url: Request.url.gameDetail,
                data: {
                    gameId: '',
                },
                success: function (data) {
                    if (data.status) {
                        that.gameInfo = data.data;
                    }
                },
                error: function (error) {
                }
            }
            Request.ajax(options);
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
.activityDetail {
    position: relative;
    padding-bottom: 128px;
}
.gameInfo {
    padding: 40px;
    border-bottom: 2px solid #f0f0f0;
}
.gameInfo img {
    width: 128px;
    height: 128px;
}
.gameInfo div {
    padding-left: 20px;
}
.gameInfo div p:first-child {
    font-size: 32px; /* px */
    color: #111;
}
.gameInfo div p:nth-child(2) {
    padding: 15px 0;
    font-size: 28px; /* px */
    color: #111;
}
.gameInfo div p:last-child {
    font-size: 24px; /* px */
    color: #999;
}
.activity {
    padding: 40px;
}
/* btn */
.btn__group {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 25px 40px;
}
.btn__group .btn--back {
  margin-right: 10px;
  color: #ff9c00;
}
.btn__group .btn--play {
  color: #fff;
  background-color: #ff9c00;
}
</style>


