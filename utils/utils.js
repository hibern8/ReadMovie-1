//stars组件分数转化
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

//http请求函数
function http(url, callBack) {
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        callBack(res.data);
      },
      fail: function (error) {
        // fail
        console.log(error);
      }
    })

  }



module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http
}