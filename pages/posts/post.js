var postsData = require('../../data/posts-data.js');

Page({
  data:{
      posts_key: []
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
        posts_key:postsData.postList
    });
  },

  onPostTap:function(event) {
    var postid = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail'
    })
  }

})