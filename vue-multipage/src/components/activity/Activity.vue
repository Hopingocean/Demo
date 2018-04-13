<template>
  <div id="activity" class="activity">
    <ul class="">
      <li class="">
        <div class="banner">
          <img src="https://game.11h5.com/static/images/2018/0404/20180404065347540.gif" alt="banner">
        </div>
        <div class="activity__info flex flex-y-center">
          <div class="flex flex-v flex-list">
            <span>【妖怪宝可萌】4月13日更新内容！占领忍者村！</span>
            <span>活动时间：2018/04/12 ~ 2018/04/13</span>
          </div>
          <a class="btn" href="javascript:void(0);">进行中</a>
        </div>
      </li>
      <li class="">
        <div class="banner">
          <img src="https://game.11h5.com/static/images/2018/0404/20180404065347540.gif" alt="banner">
        </div>
        <div class="activity__info flex flex-y-center">
          <div class="flex flex-v flex-list">
            <span>【妖怪宝可萌】4月13日更新内容！占领忍者村！</span>
            <span>活动时间：2018/04/12 ~ 2018/04/13</span>
          </div>
          <a class="btn" href="javascript:void(0);">进行中</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Activity',
  data() {
    return {
      title: '活动列表'
    }
  }
}
</script>

<style scoped>
.activity ul li {
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}
.activity ul li img {
  width: 100%;
  height: auto;
}
.activity .activity__info {
  padding: 10px 0;
}
.activity .activity__info div span:first-child {
  width: 90%;
  color: #333;
  font-size: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.activity .activity__info div span:last-child {
  width: 90%;
  color: #999;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>