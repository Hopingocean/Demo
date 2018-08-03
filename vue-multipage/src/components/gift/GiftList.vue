<template>
<div class="giftList">
    <div class="game__gift" v-for="(game, i) in giftList" :key="i">
        <div class="flex flex-y-center game__info">
            <img class="game__icon" :src="game.icon" alt="icon">
            <div class="flex flex-list flex-v">
                <span class="game__name">{{ game.app_name }}</span>
                <span class="gift__num">共有{{ game.gift_num }}个礼包</span>
            </div>
        </div>
        <!-- 礼包 -->
        <div class="gift__list">
            <ul>
                <li class="flex flex-list flex-y-center" v-for="(gift, j) in game.gift" v-if="j == 0" :key="j">
                    <div class="gift__info flex flex-list flex-v">
                        <p class="flex flex-y-center gift__name">
                            <span :class="gift.type == 1 ? 'gift--type1' : 'gift--type2'">{{ gift.type_name }}</span>
                            <span class="gift__title">{{ gift.title }}</span>
                        </p>
                        <p class="gift__desc">{{ gift.content }}</p>
                    </div>
                    <a href="javascript:void(0);" class="btn flex" @click="getGift(game.id, gift.id)">领取</a>
                </li>
            </ul>
            <ul>
                <li class="flex flex-list flex-y-center" v-for="(gift, j) in game.gift" v-if="j >= 1" :key="j">
                    <div class="gift__info flex-list flex-v">
                        <p class="flex flex-y-center gift__name">
                            <span :class="gift.type == 1 ? 'gift--type1' : 'gift--type2'">{{ gift.type_name }}</span>
                            <span class="gift__title">{{ gift.title }}</span>
                        </p>
                        <p class="gift__desc">{{ gift.content }}</p>
                    </div>
                    <a href="javascript:void(0);" class="btn flex" @click="getGift(game.id, gift.id)">领取</a>
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
        没有更多内容了...
        </span>
        <span slot="no-results">
        服务器开小差了...
        </span>
    </infinite-loading>
    <receive-gift :game-id="gameId" :gift-info="giftInfo"></receive-gift>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import Login from '@/components/Login'
import ReceiveGift from '@/components/gift/ReceiveGift'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconArrowBottom from '@/assets/images/common/icon_arrow_bottom.png'
export default {
    name: 'Gift',
    components: {
        InfiniteLoading,
        ReceiveGift,
        Login
    },
    data() {
        return {
            agentId: '',
            currentMenu: 2,
            iconArrowBottom: iconArrowBottom,
            loginStatus: false,
            currentPage: 1,
            totalPage: '',
            giftList: [],
            giftInfo: {},
            gameId: '',
        }
    },
    created() {
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
                success: function(data) {
                    if (data.status) {
                        that.loginStatus = true;
                        that.receiveGift(gameId, giftId);
                    } else {
                        that.showDialog('dialog__login');
                    }
                },
                error: function(error) {}
            }
            Request.ajax(options);
        },
        // 领取礼包
        receiveGift(gameId, giftId) {
            const that = this;
            const options = {
                type: 'post',
                url: Request.url.receiveGift,
                data: {
                    gift_id: giftId,
                },
                success: function(data) {
                    if (data.code == 'success' || data.code == 'gift_code_exist') {
                        that.giftInfo = {
                            status: true,
                            giftCode: data.data.code
                        };
                        that.gameId = gameId;
                    } else {
                        that.giftInfo = {
                            status: false,
                            msg: data.msg
                        };
                        that.gameId = gameId;
                    }
                    that.showDialog('dialog__gift');
                },
                error: function(error) {
                    that.gameId = gameId;
                    that.giftInfo = {
                        status: false,
                        msg: '服务器出小差了'
                    };
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
                },
                success: function(data) {
                    if (data.status) {
                        that.giftList = data.data.data;
                        that.currentPage = data.data.current_page + 1;
                        that.totalPage = data.data.total_page;
                        $state.loaded();
                        if (that.currentPage > that.totalPage) {
                            $state.complete();
                        }
                    } else {
                        $state.complete();
                    }
                },
                error: function(error) {
                    $state.complete();
                }
            }
            Request.ajax(options);
        },
        loadMoreGift(event) {
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
    mounted() {}
}
</script>

<style scoped>
.giftList {
    padding-bottom: 120px;
}

.game__info {
    box-sizing: border-box;
    padding: 20px 40px 0 40px;
}

.game__info .game__icon {
    width: 128px;
    height: 128px;
    border-radius: 18px;
}

.game__info .game__name {
    font-family: SimHei;
    font-size: 32px;
    /* px */
    color: #111;
    padding: 8px 0 8px 27px;
}

.game__info .gift__num {
    font-size: 24px;
    /* px */
    color: #999;
    padding: 8px 0 8px 27px;
}

.gift__list ul:nth-child(2) {
    display: none;
}

.gift__list .gift__info {
    overflow: hidden;
}

.gift__list ul li {
    padding: 20px 40px;
    border-bottom: 2px solid #f0f0f0; /* px */
}

.gift__list .gift__name {
    padding-bottom: 12px;
    color: #111;
    font-size: 28px;
    /* px */
    white-space: nowrap;
}

.gift__list .gift__name .gift__title {
    padding-left: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.gift__list .gift__name .gift--type1 {
    padding: 4px;
    font-size: 20px;
    /* px */
    color: #02be44;
    border-radius: 6px;
    border: 1px solid #02be44; /* no */
}

.gift__list .gift__name .gift--type2 {
    padding: 4px;
    font-size: 20px;
    /* px */
    color: #00cfdc;
    border-radius: 6px;
    border: 1px solid #00cfdc; /* no */
}

.gift__list .gift__desc {
    color: #999;
    font-size: 24px;
    /* px */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.btn--more {
    padding: 20px 0;
    color: #999;
    font-size: 24px;
    /* px */
    text-align: center;
    border-bottom: 2px solid #f0f0f0; /* px */
}

.btn--more .arrow--bottom {
    padding-left: 19px;
    width: 36px;
    height: auto;
}
</style>


