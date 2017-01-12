var postsData = require('../../../data/posts-data.js');

Page({
  data:{
    postData: []
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var postId = options.id;
    var postData = postsData.postList[postId];
    // this.data.postData = postData;
    this.setData({
        postData:postData
    });

  }
})