<template>
  <div class="certification">
    <div class="userinfo">
      <img class="avator" :src="userinfo.head_img ? userinfo.head_img : iconUser" alt="icon">
    </div>
    <div class="inputBox name">
      <img :src="iconStatus == 1 ? iconUser1 : iconUser0" alt="icon">
      <input :class="iconStatus == 1 ? 'active' : ''" type="text" v-model="name" @focus="iconStatus = 1" @blur="iconStatus = 0" placeholder="请输入您的真实姓名">
    </div>
    <div class="inputBox idCard">
      <img :src="iconStatus == 2 ? iconCard1 : iconCard0" alt="icon">
      <input :class="iconStatus == 2 ? 'active' : ''" type="text" v-model="idCard" @focus="iconStatus = 2" @blur="iconStatus = 0" placeholder="请输入您的身份证号码">
    </div>
    <p class="tip">根据最新监管要求，进行游戏需要身份验证</p>
    <!-- btn -->
    <div class="btn__group flex">
      <a href="javascript:void(0);" @click="prevPage('personal', 'certification')" class="btn btn--back">返回</a>
      <a href="javascript:void(0);" @click="certification" class="btn btn--commit flex-list">完成验证</a>
    </div>
    <!-- components -->
    <dialog-tip class="certification__tip" :tip="tip"></dialog-tip>
  </div>
</template>

<script>
import DialogTip from '@/components/tips/DialogTip'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconUser from '@/assets/images/common/icon_user_1.png'
import iconUser0 from '@/assets/images/common/icon_user_0.png'
import iconUser1 from '@/assets/images/common/icon_user_1.png'
import iconCard0 from '@/assets/images/login/icon_card_0.png'
import iconCard1 from '@/assets/images/login/icon_card_1.png'

export default {
  name: 'Certification',
  components: { DialogTip },
  data() {
    return {
      agentId: '',
      // icon
      iconStatus: 1, // 1,2分别表示几个图标
      iconUser: iconUser,
      iconUser0: iconUser0,
      iconUser1: iconUser1,
      iconCard0: iconCard0,
      iconCard1: iconCard1,
      name: '',
      idCard: '',
      tip: '',
    }
  },
  props: {
    userinfo: {
      type: Object
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
    hideDialog(el) {
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'none';
    },
    prevPage(el1, el2) {
      this.showDialog(el1);
      this.hideDialog(el2);
    },
    certification() {
      const that = this;
      const regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证
      var regName =/^[\u4e00-\u9fa5]{2,4}$/; // 姓名
      if (!(regName.test(that.name) && regCard.test(that.idCard))) {
        that.tip = '请填写真实姓名和身份证号码';
        that.showDialog('certification__tip');
        return;
      }
      const option = {
        url: Request.url.modifyUserinfo,
        type: 'POST',
        data: {
          truename: that.name,
          idcard: that.idCard
        },
        success: function (data) {
          if (data.status) {
            that.tip = '身份信息上传成功，等待后台验证';
            that.showDialog('certification__tip');
            setTimeout(function () {
              that.prevPage('personal', 'certification');
            }, 1000)
          }
        },
        error: function (err) {
          that.tip = '上传失败，请稍后重试';
          that.showDialog('certification__tip');
        }
      };
      Request.ajax(option);
    }
  }
}
</script>

<style scoped>
/* 提示框 */
.certification__tip {
  display: none;
}
.certification {
  display: none;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 120px 40px 128px 40px;
  width: 100%;
  height: auto;
  max-width: 750px;
  background-color: #fff;
}
.userinfo {
  text-align: center;
}
.userinfo .avator {
  margin-bottom: 80px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
}
/* input box */
.certification .inputBox {
  position: relative;
  padding-top: 30px;
}
.inputBox img:first-child {
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 60px;
  height: auto;
}
.inputBox input {
  box-sizing: border-box;
  padding: 20px 0 20px 100px;
  width: 100%;
  font-size: 28px; /* px */
  color: #999;
  border: none;
  border-bottom: 2px solid #f0f0f0;
}
.inputBox input.active {
  border-bottom: 2px solid #ff9c00;
}
.certification .tip {
  padding: 20px 0 300px 0;
  font-size: 24px; /* px */
  color: #999;
  text-align: center;
}
/* btn */
.btn__group .btn--back {
  margin-right: 10px;
  color: #ff9c00;
}
.btn__group .btn--commit {
  color: #fff;
  background-color: #ff9c00;
}
input {
    border-radius: 0;
}

 :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #e2e2e2;
}

 ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #e2e2e2;
}

input:-ms-input-placeholder {
    color: #e2e2e2;
}

input::-webkit-input-placeholder {
    color: #e2e2e2;
}

textarea:-ms-input-placeholder {
    color: #e2e2e2;
}

textarea::-webkit-input-placeholder {
    color: #e2e2e2;
}
</style>

