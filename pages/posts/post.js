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
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  //bindtap并没有阻止事件冒泡，事件传递到了onSwiperTap上，而catchtap可以阻止事件冒泡
  onSwiperItemTap:function(event) {
    //target 和 currentTarget的区别
    //target指的是当前点击的组件，而currentTarget指的是事件捕获的组件
    //target这里指的是image组件，而currentTarget指的是swiper组件
    var postId = event.target.dataset.postid;
  },

  //事件冒泡，由父层捕捉到子级的点击事件
  onSwiperTap:function(event) {
    //target 和 currentTarget的区别
    //target指的是当前点击的组件，而currentTarget指的是事件捕获的组件
    //target这里指的是image组件，而currentTarget指的是swiper组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }

})