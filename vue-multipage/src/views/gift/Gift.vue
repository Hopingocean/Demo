<template>
  <div id="app" class="gift">
    <!-- user -->
    <div class="user flex flex-y-center">
        <div class="icon">
            <img src="https://game.11h5.com/static/images/2018/0413/20180413024143872.png" alt="icon">
        </div>
        <div class="user--desc flex flex-list flex-v">
            <span>{{ userinfo.username }}</span>
            <span>{{ userinfo.reg_time }}</span>
        </div>
        <a href="javascript:void(0);" class="btn">签到</a>
    </div>
    <!-- 礼包列表 -->
    <div>
        <div class="game__gift" v-for="game in giftList" :key="game.gameId">
            <div class="flex flex-y-center game__info">
                <img class="game__icon" :src="game.gameIcon" alt="icon">
                <div class="flex-list game__name">{{ game.gameName }}</div>
            </div>
            <!-- 礼包 -->
            <div class="gift__list">
                <ul>
                    <li class="flex flex-y-center" v-for="(gift, j) in game.gift" v-if="j == 0" :key="gift.giftId">
                        <div class="flex-list flex-v">
                            <p class="gift__name">{{ gift.giftName }}</p>
                            <p class="gift__desc">{{ gift.giftDesc }}</p>
                        </div>
                        <a href="javascript:void(0);" class="btn" @click="getGift(gift.giftId)">领取</a>
                    </li>
                </ul>
                <ul>
                    <li class="flex flex-y-center" v-for="(gift, j) in game.gift" v-if="j > 0" :key="gift.giftId">
                        <div class="flex-list flex-v">
                            <p class="gift__name">{{ gift.giftName }}</p>
                            <p class="gift__desc">{{ gift.giftDesc }}</p>
                        </div>
                        <a href="javascript:void(0);" class="btn"  @click="getGift(gift.giftId)">领取</a>
                    </li>
                </ul>
                <!-- 更多礼包 -->
                <p class="btn--more" v-if="game.gift.length > 1" @click="loadMoreGift($event)">查看更多礼包({{ game.gift.length - 1 }})</p>
            </div>
        </div>
        <infinite-loading @infinite="infiniteHandler">
            <span slot="no-more">
            敬请期待...
            </span>
            <span slot="no-results">
            服务器开小差了...
            </span>
        </infinite-loading>
    </div>
    <menu-bar 
      :current-menu="currentMenu" 
      :login-status="loginStatus"></menu-bar>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Reports from '@/assets/js/api'

import jjh_icon from '@/assets/images/common/jjh.jpg'

export default {
    name: 'Gift',
    components: { MenuBar, Login, InfiniteLoading },
    data() {
        return {
            loginStatus: true,
            userinfo: '',
            currentMenu: 2,
            jjh_icon: jjh_icon,
            giftList: [
                {
                    gameId: 1,
                    gameName: '猫来了',
                    gameIcon: jjh_icon,
                    gift: [
                        {
                            giftId: 1,
                            giftName: '周年庆礼包',
                            giftDesc: '宠物点化丹*1，宠物升级丹*20，绑定元宝*50'
                        },
                        {
                            giftId: 2,
                            giftName: '百元礼包',
                            giftDesc: '宠物点化丹*10，宠物升级丹*200，绑定元宝*500'
                        },
                    ]
                },
                {
                    gameId: 2,
                    gameName: '猫来了',
                    gameIcon: jjh_icon,
                    gift: [
                        {
                            giftId: 1,
                            giftName: '周年庆礼包',
                            giftDesc: '宠物点化丹*1，宠物升级丹*20，绑定元宝*50'
                        }
                    ]
                },
                {
                    gameId: 3,
                    gameName: '猫来了',
                    gameIcon: jjh_icon,
                    gift: [
                        {
                            giftId: 1,
                            giftName: '周年庆礼包',
                            giftDesc: '宠物点化丹*1，宠物升级丹*20，绑定元宝*50'
                        }
                    ]
                },
                {
                    gameId: 4,
                    gameName: '猫来了',
                    gameIcon: jjh_icon,
                    gift: [
                        {
                            giftId: 1,
                            giftName: '周年庆礼包',
                            giftDesc: '宠物点化丹*1，宠物升级丹*20，绑定元宝*50'
                        }
                    ]
                }
            ]
        }
    },
    created: function () {
        
    },
    methods: {
        getUserinfo() {
            var that = this;
            var options = {
                type: 'get',
                url: Reports.requestUrl.userinfo,
                data: {},
                success: function (data) {
                    if (data.status) {
                        that.loginStatus = true;
                        that.userinfo = data.data;
                    } else {
                        that.loginStatus = false;
                    }
                },
                error: function (error) {
                    that.loginStatus = false;
                }
            }
            Reports.ajax(options);
        },
        getGiftList($state) {
            $state.complete();
        },
        loadMoreGift(event) {
            console.log(event);
            event.target.previousElementSibling.style.display = 'block';
            event.currentTarget.style.display = 'none';
        },
        // 滚动加载
        infiniteHandler($state) {
            this.getGiftList($state);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getUserinfo();
        })
    }
}
</script>

<style scoped>
.gift {
    background-color: #f5f5fa;
    padding-bottom: 110px;
}
.gift .user {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
}
.gift .user .icon img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
}
.gift .user .user--desc {
    padding-left: 10px;
}
.gift .user .user--desc span:first-child {
    color: #333;
    font-size: 28px;
}
.gift .user .user--desc span:last-child {
    color: #999;
    font-size: 24px;
}
.game__gift {
    margin-bottom: 20px;
    background-color: #fff;
}
.game__info {
    box-sizing: border-box;
    padding: 20px;
}
.game__info .game__icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
}
.game__info .game__name {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    padding-left: 20px;
}
.gift__list ul:nth-child(2) {
    display: none;
}
.gift__list ul li {
    padding: 20px;
    border-bottom: 2px solid #f1f1f6;
}
.gift__list .gift__name {
    color: #333;
    font-size: 26px;
}
.gift__list .gift__desc {
    color: #999;
    font-size: 24px;
}
.btn--more {
    padding: 20px 0;
    color: #999;
    font-size: 28px;
    text-align: center;
}
</style>
