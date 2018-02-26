<template>
  <div class="home_wrapper" v-loading="loading" element-loading-text="加载中">
    <article v-for="(item, i) in items" :key="i">
      <header>
        <div>
          <router-link :to="{path: `/article/${item._id}`}" class="home_title">
            {{item.title}}
          </router-link>
        </div>
        <div>
          <p class="home_creatAt">{{item.created_at}}</p>
        </div>
      </header>
      <section v-html="item.contentToMark" class="home_main"></section>
      <footer>
        <router-link class="home_readMore" :to="{path:`/article/${item._id}`}">阅读全文>></router-link>
      </footer>
    </article>
    <footer class="loadMore" v-if="loadMoreShow">
      <el-button type="primary" :loading="loadMoreFlag" @click="loadMore">{{loadMoreText}}</el-button>
    </footer>
  </div>
</template>

<script>
  import header from './Header'
  import footer from './Footer'
  import api from '../../api'

  export default {
    name: 'Home',
    data() {
      return {
        items: [],
        loading: true,
        loadMoreFlag: false,
        loadMoreText: '加载更多',
        loadMoreShow: false,
        page: 1,
        limit: 10
      }
    },

    components: {
      header,
      footer
    },

    methods: {
      loadMore() {
        this.loadMoreText = '加载中';
        this.loadMoreFlag = true;
        this.page++;
        this.loadData(this.page, this.limit);
      },
      loadData(page, limit) {
        api.getArticleLists({page, limit})
          .then(({data: {code, articleLists, hasNext, hasPrev}}) => {
            if(code == 200) {
              setTimeout(() => {
                this.items = this.items.concat(articleLists);
                this.loading = false;
                if (hasNext) {
                  this.loadMoreShow = true;
                  this.loadMoreFlag = false;
                  this.loadMoreText = '加载更多'
                } else {
                  this.loadMoreShow = false;
                }
              }, 200)
            }
          })
      }
    },

    mounted() {
      this.$store.dispatch('changeHeadLine', '主页');
      this.loadData(1, this.limit);
    }
  }
</script>

<style scoped>
  h2,h4{
    margin:0;
  }
  .home_wrapper{
    margin:auto;
    list-style: none;
  }
  .home_wrapper article{
    padding-bottom: 1rem;
    border-bottom:1px solid #d2d2d2;
    margin-bottom: 2rem;
  }
  .home_title{
    display: block;
    font-size: 2.6rem;
    font-weight: 400;
    color:#404040;
    padding:.8rem 0;
  }
  .home_creatAt{
    font-family: "Comic Sans MS", curslve, sans-serif;
    font-size: 1.6rem;
    color:#7f8c8d;
    margin: 0;
  }
  .home_main{
    font-size: 1.6rem;
    color:#34495e;
    line-height: 1.6em;
  }
  footer{
    text-align: right;
  }
  .home_readMore{
    font-size: 2rem;
    color:#919191;
    font-weight: 600;
  }
  .loadMore {
    margin:4rem 0 0 0;
    display: flex;
    display: webkit-flex;
  }
  .loadMore button {
    cursor: pointer;
    outline:none;
    padding:1rem;
    margin:auto;
    border-radius:.5rem;
    color:rgba(0, 0, 0, 1);
    border:1px solid #bfcbd9;
    background-color: #f7f7f7;
  }
  .home_title:hover{
    opacity: 0.5;
  }
  .home_readMore:hover{
  opacity: 0.6;
  }
  @media screen and (max-width:786px){
    .home_title{
      font-size: 1.8rem;
      line-height: 1.5em;
    }
    .home_creatAt{
      font-size: 1.4rem;
    }
    .loadMore{
      margin: 3rem 0  .8rem 0;
    }
  }
  @media screen and (max-width:480px){
    .home_main{
      font-size:1.4rem;
    }
    .home_readMore{
      font-size: 1.8rem;
    }
  }
</style>

