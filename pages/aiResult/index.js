// pages/aiResult/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aiResult:'',
    suggestion: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this;
    if (options.query == "[object Object]"){
      const eventChannel = this.getOpenerEventChannel();
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', function (data) {
        let result = data.data;
        that.setData({ aiResult: result.output.zz });
        // 自动跳转
        // setTimeout(() => {
        //   wx.redirectTo({
        //     url: '/pages/entry/index'
        //   })
        // }, 1500)
      })
    }
    else {
      console.log(options);
      let str = options.query;
      if(str){
        let arr = str.split('#');
        that.setData({ aiResult: arr[0], suggestion: arr[1] });
      }
      
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
