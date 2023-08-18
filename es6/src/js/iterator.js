// 迭代器，面向对象
let user = {
  name: "lee",
  ids: [100, 200, 300],
  [Symbol.iterator]() {
    let index = 0;
    // let _this = this;
    return {
      next: () => {
        const result = {
          value: this.ids[index],
          done: index === this.ids.length
        };
        index++;
        return result;
      }
    };
  }
};

// 自定义for of迭代
for (u of user) {
  console.log(u);
}
