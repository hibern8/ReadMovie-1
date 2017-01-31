var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({
  data: {
    postData: [],
    isPlayingMusic: false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var postId = options.id;
    var postData = postsData.postList[postId];
    // this.data.postData = postData;
    this.setData({
      postData: postData,
      currentPostId: postId
    });

    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();

  },

  setMusicMonitor: function () {
    var that = this;
    //监听音乐播放
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })

    //监听音乐暂停
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })

    //监听音乐停止。
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  //点击收藏按钮
  onCollectionTap: function (event) {
    this.getPostsCollectedSyc();
    // this.getPostsCollectedAsy();
  },

  //異步的方法，程序会立刻走完，当获取到缓存之后，由框架调用success方法，不会有停顿的缺点，但是要根据业务需要来决定是否使用异步
  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏编程未收藏，未收藏编程已收藏               
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);  //简单的收藏逻辑只需showToast即可，showModal作为示例
      }
    })
  },

  //同步的方法，缺點是获取缓存的速度比较慢，程序会卡在这边
  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏编程未收藏，未收藏编程已收藏               
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);  //简单的收藏逻辑只需showToast即可，showModal作为示例
  },

  //弹窗
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章?" : "取消收藏该文章?",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确定",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          //更新文章是否的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          //更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  //提示
  showToast: function (postsCollected, postCollected) {
    //更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      success: function () {

      }
    })
  },

  //点击分享按钮
  onShareTap: function (event) {
    // wx.removeStorageSync('key');
    //缓存的上限最大不能超过100MB
    // wx.clearStorageSync();
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel 用户是不是点击了取消按钮
        //res.tapIndex 数组元素的序号，从从0开始
        wx.showModal({
          title: "用户分享到了" + itemList[res.tapIndex],
          content: "用户是否取消" + res.cancel + "现在无法实现分享功能，什么时候能支持呢？"
        })
      },
    })
  },

  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl
      })
      this.setData({
        isPlayingMusic: true
      })
    }



  }


})