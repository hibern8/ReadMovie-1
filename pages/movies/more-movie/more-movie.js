// pages/movies/more-movie/more-movie.js
var app = getApp();
var utils = require('../../../utils/utils.js');

Page({
  data: {
    movies: {},
    navigateTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var category = options.category;
    this.setData({
      navigateTitle: category
    });
    var dataUrl = "";
    var doubanBaseUrl = app.globalData.doubanBase;
    switch (category) {
      case "正在热映":
        dataUrl = doubanBaseUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = doubanBaseUrl + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = doubanBaseUrl + "/v2/movie/top250";
        break;
    };
    this.setData({ requestUrl: dataUrl });
    utils.http(dataUrl, this.processDoubanData);

  },

  //下滑到底部触发
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    utils.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  //下拉刷新操作
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + "?start=0" + "&count=20";
    this.setData({
      movies: '',
      isEmpty: true,
      totalCount: 0
    });
    utils.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subjects = moviesDouban.subjects[index];
      var title = subjects.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var tmp = {
        title: title,
        average: subjects.rating.average,
        coverageUrl: subjects.images.large,
        movieId: subjects.id,
        stars: utils.convertToStarsArray(subjects.rating.stars)
      }
      movies.push(tmp);
    }
    var totalMovies = {};

    //如果要绑定新加载的数组，需要从旧有的数组合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.setData({
        isEmpty: false
      });
    }
    var totalCount = this.data.totalCount + 20;
    this.setData({
      movies: totalMovies,
      totalCount: totalCount
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();

  },

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }


})