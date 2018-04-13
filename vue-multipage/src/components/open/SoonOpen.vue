<template>
  <div id="soonopen" class="soonopen">
    <ul>
      <li class="flex flex-y-center">
        <div class="icon">
          <img src="https://game.11h5.com/static/images/2018/0413/20180413024143872.png" alt="icon">
        </div>
        <div class="open__desc flex flex-v flex-list">
          <p>猫来了</p>
          <p>九尾3服</p>
        </div>
        <span class="open__time">今日16：00开服</span>
        <a href="javascript:void(0);" class="btn">开服提醒</a>
      </li>
      <li class="flex flex-y-center">
        <div class="icon">
          <img src="https://game.11h5.com/static/images/2018/0413/20180413024143872.png" alt="icon">
        </div>
        <div class="open__desc flex flex-v flex-list">
          <p>猫来了</p>
          <p>九尾4服</p>
        </div>
        <span class="open__time">今日16：00开服</span>
        <a href="javascript:void(0);" class="btn">开服提醒</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SoonOpen',
  data() {
    return {
      title: '最新开服'
    }
  }
}
</script>

<style scoped>
.soonopen ul li {
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.soonopen ul li img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  text-align: center;
}
.soonopen ul li .open__desc {
  padding-left: 10px;
}
.soonopen ul li div p:first-child {
  padding: 6px 0;
  font-size: 28px;
  color: #333;
}
.soonopen ul li div p:last-child {
  padding: 6px 0;
  font-size: 24px;
  color: #ff524e;
  line-height: 24px;
}
.soonopen ul li .open__time {
  color: #999;
  padding: 0 10px;
}
</style>