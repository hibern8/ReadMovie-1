var app = getApp();
import { Movie } from 'class/Movie.js';

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    var movie = new Movie(url);
    movie.getMovieData((movie) => { //es6箭头函数中的this指代的是当前定义函数的环境，而不是调用对象的环境，所有不需要用that=this
      this.setData({
        movie: movie
      })
    })

  },

  ///查看图片
  viewMoviePostImg:function(event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [src] //需要预览的图片http链接列表
    })
  }

})