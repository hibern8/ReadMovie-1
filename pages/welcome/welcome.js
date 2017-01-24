Page({
    onTap:function(event) {
        // wx.navigateTo({  //有返回键
        //   url: '../posts/post'
        // })
        // wx.redirectTo({
        //   url: '../posts/post'
        // })

        wx.switchTab({  
          url: '../posts/post'
        })

    },

})