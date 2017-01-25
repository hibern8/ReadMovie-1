App({
  onLaunch: function() { 
    // Do something initial when launch.
    console.log("onLaunch");
  },
  onShow: function() {
      // Do something when show.
      console.log("onShow");
  },
  onHide: function() {
      // Do something when hide.
      console.log("onHide");
  },
  onError: function(msg) {
    console.log(msg)
  },
  globalData: {
      g_isPlayingMusic: false,
      g_currentMusicPostId: null,
      doubanBase: "https://api.douban.com"
  }
})