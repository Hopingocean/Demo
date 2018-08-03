<template>
  <div id="menubar" class="menubar">
      <ul class="flex">
          <li class="flex flex-list">
            <div :class="currentMenu == 1 ? 'current' : ''" @click="go(1)">
                <img :src="currentMenu == 1 ? iconGame1 : iconGame0" alt="icon">
                <span class="menu__font">游戏</span>
            </div>
          </li>
          <li class="flex flex-list">
            <div :class="currentMenu == 2 ? 'current' : ''" @click="go(2)">
                <img :src="currentMenu == 2 ? iconGift1 : iconGift0" alt="icon">
                <span class="menu__font">礼包</span>
            </div>
          </li>
          <li class="flex flex-list">
            <div :class="currentMenu == 3 ? 'current' : ''" @click="go(3)">
                <img :src="currentMenu == 3 ? iconClassify1 : iconClassify0" alt="icon">
                <span class="menu__font">分类</span>
            </div>
          </li>
          <li class="flex flex-list">
            <div :class="currentMenu == 4 ? 'current' : ''" @click="go(4)">
              <img :src="currentMenu == 4 ? iconCommunity1 : iconCommunity0" alt="icon">
              <span class="menu__font">客服</span>
            </div>
          </li>
          <li class="flex flex-list">
            <div :class="currentMenu == 5 ? 'current' : ''" @click="go(5)">
                <img :src="currentMenu == 5 ? iconUser1 : iconUser0" alt="icon">
                <span class="menu__font">个人</span>
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
import Login from '@/components/Login'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconGame1 from '@/assets/images/common/icon_game_1.png'
import iconGame0 from '@/assets/images/common/icon_game_0.png'
import iconGift1 from '@/assets/images/common/icon_gift_1.png'
import iconGift0 from '@/assets/images/common/icon_gift_0.png'
import iconClassify1 from '@/assets/images/common/icon_classify_1.png'
import iconClassify0 from '@/assets/images/common/icon_classify_0.png'
import iconCommunity1 from '@/assets/images/common/icon_community_1.png'
import iconCommunity0 from '@/assets/images/common/icon_community_0.png'
import iconUser1 from '@/assets/images/common/icon_user_1.png'
import iconUser0 from '@/assets/images/common/icon_user_0.png'

export default {
  name: 'MenuBar',
  components: { Login },
  data() {
      return {
        agentId: '',
        // icon
        iconGame1: iconGame1,
        iconGame0: iconGame0,
        iconGift1: iconGift1,
        iconGift0: iconGift0,
        iconClassify1: iconClassify1,
        iconClassify0: iconClassify0,
        iconCommunity1: iconCommunity1,
        iconCommunity0: iconCommunity0,
        iconUser1: iconUser1,
        iconUser0: iconUser0,
      }
  },
  props: {
      currentMenu: {
          type: Number,
          default: 1
      }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
      go(n) {
          switch(n) {
            case 1:
                window.location.href = 'index.html?agentId=' + this.agentId;
                break;
            case 2:
                window.location.href = 'gift.html?agentId=' + this.agentId;
                break;
            case 3:
                window.location.href = 'classify.html?agentId=' + this.agentId;
                break;
            case 4:
                window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMTU4MF80NTIzMTZfODAwODAxNTgwXzJf', '_blank');
                break;
            case 5:
                window.location.href = 'user.html?agentId=' + this.agentId;
                break;
          }
      }
  }
}
</script>

<style scoped>
.menubar .menu__icon, .menu__font{
    display: block;
    color: #666;
    font-size: 24px; /* px */
}
.menubar .current .menu__font, .current .menu__icon {
    color: #ff9c00;
}
/* 设置bottom: 1px防止文字模糊 */
.menubar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    margin: 0 auto;
    width: 100%;
    background-color: #fff;
    border-top: 2px solid #e2e2e2; /* px */
}
.menubar ul li {
    box-sizing: border-box;
    padding: 10px 0;
    text-align: center;
}
.menubar ul li div {
    margin: 0 auto;
}
.menubar ul li img {
    width: 50px;
    height: auto;
    text-align: center;
}
</style>

