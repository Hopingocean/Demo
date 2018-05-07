<template>
  <div class="giftList">
    <div class="game__gift" v-for="game in giftList" :key="game.gameId">
        <div class="flex flex-y-center game__info">
            <img class="game__icon" :src="game.gameIcon" alt="icon">
            <div class="flex flex-list flex-v">
                <span class="game__name">{{ game.gameName }}</span>
                <span class="gift__num">共有{{ game.gift.length }}个礼包</span>
            </div>
        </div>
        <!-- 礼包 -->
        <div class="gift__list">
            <ul>
                <li class="flex flex-y-center" v-for="(gift, j) in game.gift" v-if="j == 0" :key="gift.giftId">
                    <div class="flex-list flex-v">
                        <p class="gift__name">
                            <span class="gift--type1">通服</span>
                            {{ gift.giftName }}
                        </p>
                        <p class="gift__desc">{{ gift.giftDesc }}</p>
                    </div>
                    <a href="javascript:void(0);" class="btn" @click="getGift(game.gameId, gift.giftId)">领取</a>
                </li>
            </ul>
            <ul>
                <li class="flex flex-y-center" v-for="(gift, j) in game.gift" v-if="j > 0" :key="gift.giftId">
                    <div class="flex-list flex-v">
                        <p class="gift__name">
                            <span class="gift--type2">普通</span>
                            {{ gift.giftName }}
                        </p>
                        <p class="gift__desc">{{ gift.giftDesc }}</p>
                    </div>
                    <a href="javascript:void(0);" class="btn"  @click="getGift(game.gameId, gift.giftId)">领取</a>
                </li>
            </ul>
            <!-- 更多礼包 -->
            <p class="btn--more" v-if="game.gift.length > 1" @click.self="loadMoreGift($event)">
                查看更多礼包({{ game.gift.length - 1 }})
                <img class="arrow--bottom" :src="iconArrowBottom" @click.self="loadMoreGift($event)" alt="icon">
            </p>
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
    <receive-gift :gift-info="giftInfo"></receive-gift>
    <login></login>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import Login from '@/components/Login'
import ReceiveGift from '@/components/gift/ReceiveGift'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import jjh_icon from '@/assets/images/common/jjh.jpg'
import iconArrowBottom from '@/assets/images/common/icon_arrow_bottom.png'
export default {
  name: 'Gift',
  components: { InfiniteLoading, ReceiveGift, Login },
    data() {
        return {
            agentId: '',
            currentMenu: 2,
            jjh_icon: jjh_icon,
            iconArrowBottom: iconArrowBottom,
            loginStatus: false,
            currentPage: 1,
            pageSize: 12,
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
            ],
            giftInfo: {
                status: 1,
                giftCode: '123456789'
            },
        }
    },
    created () {
       this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : ''; 
    },
    methods: {
        showDialog(el) {
            const dialog = document.getElementsByClassName(el)[0];
            dialog.style.display = 'block';
        },
        // 判断用户是否登陆并领取礼包
        getGift(gameId, giftId) {
            const that = this;
            const options = {
                type: 'get',
                url: Request.url.userinfo,
                data: {},
                success: function (data) {
                    if (data.status) {
                        that.loginStatus = true;
                        that.receiveGift(gameId, giftId);
                    } else {
                        that.loginStatus = false;
                        that.showDialog('dialog__login');
                    }
                },
                error: function (error) {
                    that.loginStatus = false;
                }
            }
            Request.ajax(options);
        },
        // 领取礼包
        receiveGift(gameId, giftId) {
            const that = this;
            const options = {
                type: 'get',
                url: Request.url.receiveGift,
                data: {
                    gameId: gameId,
                    giftId: giftId,
                    agent_id: that.agentId
                },
                success: function (data) {
                    if (data.status) {
                        that.giftInfo = data;
                    } else {
                        that.giftInfo = data;
                    }
                    that.showDialog('dialog__gift');
                },
                error: function (error) {
                    // that.giftInfo = error;
                    that.showDialog('dialog__gift');
                }
            }
            Request.ajax(options);
        },
        // 获取礼包列表
        getGiftList($state) {
            const that = this;
            const options = {
                type: 'get',
                url: Request.url.giftList,
                data: {
                    page: that.currentPage,
                    page_size: that.pageSize,
                },
                success: function (data) {
                    if (data.status) {
                        that.giftList = data;
                        $state.loaded();
                    } else {
                        that.giftList = data;
                        $state.complete();
                    }
                },
                error: function (error) {
                    $state.complete();
                }
            }
            Request.ajax(options);
        },
        loadMoreGift(event) {
            console.log(event);
            if (event.target.className == 'btn--more') {
                event.target.previousElementSibling.style.display = 'block';
                event.target.style.display = 'none';
            } else if (event.target.className == 'arrow--bottom') {
                event.target.parentNode.previousElementSibling.style.display = 'block';
                event.target.parentNode.style.display = 'none';
            }
        },
        // 滚动加载
        infiniteHandler($state) {
            this.getGiftList($state);
        }
    },
    mounted() {
        this.$nextTick(function () {
            
        })
    }
}
</script>

<style scoped>
.giftList {
    padding-bottom: 128px;
}
.game__info {
    box-sizing: border-box;
    padding: 40px 40px 0 40px;
}
.game__info .game__icon {
    width: 128px;
    height: 128px;
    border-radius: 18px;
}
.game__info .game__name {
    font-size: 32px; /* px */
    color: #111;
    padding-left: 27px;
    padding-bottom: 28px;
}
.game__info .gift__num {
    font-size: 24px; /* px */
    color: #999;
    padding-left: 27px;
}
.gift__list ul:nth-child(2) {
    display: none;
}
.gift__list ul li {
    padding: 46px 40px;
    border-bottom: 2px solid #f0f0f0;
}
.gift__list .gift__name {
    padding-bottom: 13px;
    color: #111;
    font-size: 28px; /* px */
}
.gift__list .gift__name .gift--type1 {
    padding: 4px;
    font-size: 20px; /* px */
    color: #02be44;
    border-radius: 6px;
    border: 2px solid #02be44;
}
.gift__list .gift__name .gift--type2 {
    padding: 4px;
    font-size: 20px; /* px */
    color: #00cfdc;
    border-radius: 6px;
    border: 2px solid #00cfdc;
}
.gift__list .gift__desc {
    color: #999;
    font-size: 24px; /* px */
}
.btn--more {
    padding: 32px 0;
    color: #999;
    font-size: 24px; /* px */
    text-align: center;
    border-bottom: 2px solid #f0f0f0;
}
.btn--more .arrow--bottom {
    padding-left: 19px;
    width: 36px;
    height: auto;
}
</style>


