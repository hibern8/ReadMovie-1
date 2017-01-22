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
        postData:postData,
        currentPostId: postId
    });

    var postsCollected = wx.getStorageSync('posts_collected');
    if(postsCollected) {
        var postCollected = postsCollected[postId];
        this.setData({
          collected: postCollected
        })
    } else {
        var postsCollected = {};
        postsCollected[postId] = false;
        wx.setStorageSync('posts_collected', postsCollected)
    }

  },

  onCollectionTap:function(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏编程未收藏，未收藏编程已收藏               
    postCollected = !postCollected;                       
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
        collected: postCollected
    })

    wx.showToast({
        title: postCollected?"收藏成功":"取消成功",
        duration: 1000,
        icon:"success",
        success:function() {
          
        }
    })
  },

  onShareTap:function(event) {
    // wx.removeStorageSync('key');
    //缓存的上限最大不能超过100MB
    wx.clearStorageSync();
  }


})