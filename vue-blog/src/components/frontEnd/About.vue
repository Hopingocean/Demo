<template>
  <div class="about" v-show="aboutState" @click="toggleAbout()">
    <img src="http://oak1q2h54.bkt.clouddn.com/blog/db.jpg" alt="" class="blur about__bg">
    <div class="dialog__box">
      <p class="user--icon"><img :src="userinfo.icon" alt="usericon"></p>
      <p class="user--name">{{userinfo.name}}</p>
      <p class="user--desc">{{userinfo.desc}}</p>
      <p class="user--address">{{userinfo.address}}</p>
      <p class="user--email">{{userinfo.email}}</p>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapActions, mapGetters, mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
      userinfo: {
        name: 'Lee',
        icon: 'http://oak1q2h54.bkt.clouddn.com/blog/lf.jpg',
        desc: '听海...',
        email: 'h_opingocean@outlook.com',
        address: '浙江 - 杭州'
      }
    }
  },
  computed: {
    ...mapState({
      aboutState: state=>state.aboutState
    })
  },
  methods: {
    ...mapActions(['toggleAbout'])
  }
}
</script>

<style scoped>
.about {
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
}
.about .about__bg {
  width: 100%;
  height: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.about .blur {	
  filter: url(../../assets/blur.svg#blur); /* FireFox, Chrome, Opera */
  
  -webkit-filter: blur(6px); /* Chrome, Opera */
     -moz-filter: blur(6px);
      -ms-filter: blur(6px);    
          filter: blur(6px);
  
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=6, MakeShadow=false); /* IE6~IE9 */
}
.about .dialog__box {
  padding-bottom: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  max-width: 500px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  text-align: center;
  border-radius: 10px;
}
.about .dialog__box .user--icon img {
  width: 50%;
  border-radius: 50%;
  padding: 20px;
}
.about .dialog__box .user--name, .user--desc, .user--address, .user--email {
  line-height: 36px;
  overflow: hidden;
}
</style>
