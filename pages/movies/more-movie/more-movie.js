// pages/movies/more-movie/more-movie.js
var app = getApp();
var utils = require('../../../utils/utils.js');

Page({
  data:{
    movie: {},
    navigateTitle: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var category = options.category;
    this.setData({
      navigateTitle: category
    });
    var dataUrl = "";
    var doubanBaseUrl = app.globalData.doubanBase;
    switch(category) {
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
    utils.http(dataUrl, this.processDoubanData);

    
  },

  processDoubanData:function(moviesDouban) {
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
      this.setData({movies: movies});

    }
  },

  onReady:function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }


})