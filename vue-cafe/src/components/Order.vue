<template>
  <div id="order">
    <el-row class="order">
      <el-col :span="8" class="order__tabs">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="购物车" name="first">
            <el-table :data="orderList" border style="width: 100%;">
              <el-table-column prop="goodsName" label="商品"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addGoods(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
              <small>数量：</small>
              <strong>{{totalCount}}</strong> &nbsp;&nbsp;&nbsp;&nbsp;
              <small>总计：</small>
              <strong>{{totalMoney}}</strong> 元
            </div>
            <div class="order__btn">
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click="checkout">付款</el-button>
              <el-button type="primary">收藏</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="second">

          </el-tab-pane>
          <el-tab-pane label="收藏" name="third">
            
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="16">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="(goods, index) in oftenGoods" :key="goods.goodsId" @click="addToOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs v-model="foodTabs">
            <el-tab-pane label="汉堡" name="food01">
              <ul class='cookList'>
                <li v-for="(goods, i) in type0Goods" :key="goods.goodsId" @click="addToOrderList(goods)">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <p class="foodName">{{goods.goodsName}}</p>
                  <p class="foodPrice">￥{{goods.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食" name="food02">
              <ul class='cookList'>
                <li v-for="(goods, i) in type1Goods" :key="goods.goodsId" @click="addToOrderList(goods)">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <p class="foodName">{{goods.goodsName}}</p>
                  <p class="foodPrice">￥{{goods.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料" name="food03">
              <ul class='cookList'>
                <li v-for="(goods, i) in type2Goods" :key="goods.goodsId" @click="addToOrderList(goods)">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <p class="foodName">{{goods.goodsName}}</p>
                  <p class="foodPrice">￥{{goods.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐" name="food04">
              <ul class='cookList'>
                <li v-for="(goods, i) in type3Goods" :key="goods.goodsId" @click="addToOrderList(goods)">
                  <span class="foodImg">
                    <img :src="goods.goodsImg" width="100%">
                  </span>
                  <p class="foodName">{{goods.goodsName}}</p>
                  <p class="foodPrice">￥{{goods.price}}元</p>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeTab: "first",
      foodTabs: 'food01',
      totalMoney: 0,
      totalCount: 0,
      orderList: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
    };
  },
  created: function () {
    // 获取常用商品
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
    .then(response=>{
      console.log(response);
      this.oftenGoods = response.data;
    })
    .catch(error=>{
      console.log(error);
    })
    // 获取常用分类
    axios.get('http://jspang.com/DemoApi/typeGoods.php')
    .then(response=>{
      this.type0Goods = response.data[0];
      this.type1Goods = response.data[1];
      this.type2Goods = response.data[2];
      this.type3Goods = response.data[3];
    })
    .catch(error=>{
      console.log(error);
    })
  },
  methods: {
    addToOrderList: function (goods) {
      let isHaveOrder = false;
      for( var i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i].goodsId == goods.goodsId) {
          isHaveOrder = true;
        }
      }
      if (isHaveOrder) {
          for( var i = 0; i < this.orderList.length; i++) {
            if (this.orderList[i].goodsId == goods.goodsId) {
              this.orderList[i].count++;
            }
          }
          this.getAllMoney();
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        }
        this.orderList.push(newGoods);
        this.getAllMoney();
      }
    },
    delGoods: function (goods) {
      for( var i = 0; i < this.orderList.length; i++) {
        if (goods.goodsId == this.orderList[i].goodsId) {
          // 删除该数据
          this.orderList.splice(i, 1);
          this.getAllMoney();
        }
      }
    },
    delAllGoods: function () {
      this.orderList = [];
      this.totalMoney = 0;
    },
    addGoods: function (goods) {
      for( var i = 0; i < this.orderList.length; i++) {
        if (goods.goodsId == this.orderList[i].goodsId) {
          // 删除该数据
          this.orderList[i].count++;
          this.getAllMoney();
        }
      }
    },
    checkout: function () {
      if (this.totalMoney) {
        this.orderList = [];
        this.totalMoney = 0;
        this.$message({
          message: '结账成功，感谢你又为店里出了一份力!',
          type: 'success'
        })
      } else {
        this.$message.error('不能空结。老板了解你急切的心情！');
      }
    },
    getAllMoney: function () {
      this.totalMoney = 0;
      this.totalCount = 0;
      for( var i = 0; i < this.orderList.length; i++) {
        this.totalMoney += this.orderList[i].price * this.orderList[i].count;
        this.totalCount += this.orderList[i].count;
      }
    },
  }
};
</script>

<style scoped>
#order {
  height: 100%;
}
#order .order {
  height: 100%;
}
.order__tabs {
  padding: 0 10px;
  box-sizing: border-box;
  height: 100%;
  border-right: 1px solid #cecece;
  text-align: center;
  overflow-y: scroll;
}
.order .order__btn {
  padding-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
}
.goods-type {
  padding: 0 10px;
  box-sizing: border-box;
  clear: both;
}
.o-price {
  color: #58b7ff;
}
.often-goods-list {
  border-bottom: 1px solid #C0CCDA;
  height: auto;
  overflow: hidden;
  padding-bottom: 10px;
  background-color: #F9FAFC;
}
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #E5E9F2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
  text-align: left;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 40%;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 40%;
  padding-top: 10px;
}
.totalDiv {
  height: auot;
  overflow: hidden;
  text-align: right;
  font-size: 16px;
  background-color: #fff;
  border-bottom: 1px solid #E5E9F2;
  padding: 10px;
}
</style>
