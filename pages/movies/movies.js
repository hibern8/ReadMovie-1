var app = getApp();
var utils = require('../../utils/utils.js');

Page({
  data: {
    inThears: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var doubanBaseUrl = app.globalData.doubanBase;
    var inThearsUrl = doubanBaseUrl + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = doubanBaseUrl + "/v2/movie/coming_soon?start=0&count=3";
    var top250Url = doubanBaseUrl + "/v2/movie/top250?start=0&count=3";
    this.getMovieListData(inThearsUrl, "inThears", "正在热映"); //请求正在上映电影
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映"); //请求即将上映电影电影
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");  //请求top250电影

  },

  //点击更多跳转
  onMoreTap:function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },

  onScrollLower:function(event) {
    console.log("加载更多");
  },

  //http请求函数
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function (error) {
        // fail
        console.log(error);
      }
    })

  },
  
  //请求成功回调函数
  processDoubanData:function(moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for(var index in moviesDouban.subjects) {
      var subjects = moviesDouban.subjects[index];
      var title = subjects.title;
      if(title.length >= 6) {
        title = title.substring(0,6) + "...";
      }
      var tmp = {
        title: title,
        average: subjects.rating.average,
        coverageUrl: subjects.images.large,
        movieId: subjects.id,
        stars: utils.convertToStarsArray(subjects.rating.stars)
      }
      movies.push(tmp);
      var readyData = {};
      readyData[settedKey] = {
       movies: movies,
       categoryTitle: categoryTitle
      };
      this.setData(readyData);

    }
  }

})