// 系统信息
var screenWidth = wx.getSystemInfoSync().screenWidth;
var screenHeight = wx.getSystemInfoSync().screenHeight;
var ratio = wx.getSystemInfoSync().pixelRatio;

// sharedCanvas
var sharedCanvas = wx.getSharedCanvas();
var context = sharedCanvas.getContext('2d');

// rank canvas
var rankCanvas = wx.createCanvas();
var ctx = rankCanvas.getContext('2d');

// 接收主域发送的信息
wx.onMessage(function (message) {
  if (message.type == 2) {
    wx.getFriendCloudStorage({
      keyList: ["score"],
      success: function (res) {
        var data = res.data;
        var scoreList = sortRank(data);
        initCommon();
        drawRankList(scoreList);
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function (info) {
        console.log(info);
      }
    })
  }
})

// 初始化排行榜滑动事件
scrollList();

// 初始化排行榜公用UI
function initCommon() {
  context.restore();
  // context.scale(ratio, ratio);
  context.clearRect(0, 0, screenWidth * ratio, screenHeight * ratio);

  // 画背景
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(0, 0, screenWidth * ratio, screenHeight * ratio);

  // var scales = screenWidth / 750;
  // context.scale(scales, scales);

  // 画标题
  context.fillStyle = '#fff';
  context.font = '50px Arial';
  context.textAlign = 'center';
  context.fillText('好友排行榜', 500 / 2, 80);

  // 排名列表外框
  context.fillStyle = 'rgba(0, 0, 0, 0)';
  context.fillRect(20, 120, 500 - 20 * 2, 560);
}

// 绘制排行榜
function drawRankList(data) {
  var length = Math.max(data.length, 6);
  var rankHeight = 560 / 5;
  rankCanvas.width = 460;
  rankCanvas.height = rankHeight * data.length;
  ctx.clearRect(0, 0, rankCanvas.width, rankCanvas.height);
  for (var i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      ctx.fillStyle = '#393739';
    } else {
      ctx.fillStyle = '#302F30';
    }

    ctx.fillRect(0, i * rankHeight, rankCanvas.width, rankHeight);
  }

  data.forEach(function (item, index) {
    // 头像
    var avatar = wx.createImage();
    avatar.src = item.avatarUrl;
    avatar.onload = function () {
      ctx.drawImage(avatar, 80, index * rankHeight + 15, 70, 70);
      reDrawRank(0);
    }

    // 排名
    if (index === 0) {
      ctx.fillStyle = 'red';
    } else if (index === 1) {
      ctx.fillStyle = 'green';
    } else if (index === 2) {
      ctx.fillStyle = 'blue';
    } else {
      ctx.fillStyle = '#fff';
    }
    ctx.textAlign = 'center';
    ctx.font = 'italic 44px Arial';
    ctx.fillText(index + 1, 40, 64 + index * rankHeight);

    // 昵称
    // ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.font = '28px Arial';
    ctx.fillText(item.nickname, 200, 64 + rankHeight * index);

    // 分数
    // ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(item.score || 0, 400, 64 + index * rankHeight);
  })
  reDrawRank(0);
}

// 重新绘制rank canvas
function reDrawRank(y) {
  context.clearRect(20, 120, 500 - 20 * 2, 560);
  context.fillStyle = '302F30';
  context.fillRect(20, 120, 500 - 20 * 2, 560);
  context.drawImage(rankCanvas, 0, y, 500 - 20 * 2, 560, 20, 120, 500 - 20 * 2, 560);
}

// 排序
function sortRank(data) {
  var scoreList = [];
  data.forEach(function (item, index) {
    scoreList.push({
      avatarUrl: item.avatarUrl,
      nickname: item.nickname,
      openid: item.openid,
      score: item.KVDataList[0] && item.KVDataList[0].value ? JSON.parse(item.KVDataList[0].value).sceneId + '关' : 0 + '关'
    })
  })
  scoreList = scoreList.concat(scoreList);
  scoreList.slice(0, 100);
  scoreList.sort(function (a, b) {
    return a.score < b.score;
  })
  return scoreList;
}

// 触摸滑动
function scrollList() {
  var startY = undefined, moveY = 0;
  // 触摸移动事件
  wx.onTouchMove(function (e) {
    var touch = e.touches[0];
    // 触摸移动第一次触发的位置
    if (startY === undefined) {
      startY = touch.clientY + moveY;
    }
    moveY = startY - touch.clientY;
    reDrawRank(moveY);
  });

  wx.onTouchEnd(function (e) {
    startY = undefined;
    if (moveY < 0) { // 到顶
      moveY = 0;
    } else if (moveY > rankCanvas.height - 560) { // 到底
      moveY = rankCanvas.height - 560;
    }
    reDrawRank(moveY);
  });
}
