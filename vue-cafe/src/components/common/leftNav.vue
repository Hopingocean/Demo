<template>
  <div class="leftNav">
    <ul>
      <li>
        <router-link to="/home">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouyefill"></use>
          </svg>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/shop">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianpufill"></use>
          </svg>
          <p>店铺</p>
        </router-link>
      </li>
      <li>
        <router-link to="/order">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gouwuchefill"></use>
          </svg>
          <p>购物车</p>
        </router-link>
      </li>
      <li>
        <router-link to="/love">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xihuanfill"></use>
          </svg>
          <p>喜欢</p>
        </router-link>
      </li>
      <li>
        <router-link to="/message">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kefufill"></use>
          </svg>
          <p>客服</p>
        </router-link>
      </li>
    </ul>
  </div>  
</template>

<script>
export default {
  
}
</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
  max-height: 100%;
}
.icon {
  width: 1.5em; 
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.leftNav {
  width: 10%;
  min-height: 100%;
  float: left;
  background-color: #eee;
}
.leftNav ul li {
  padding: 10px 0;
  list-style: none;
}
.leftNav ul li a {
  text-decoration: none;
  color: inherit;
}
.leftNav ul li p {
  color: #555;
}
</style>
