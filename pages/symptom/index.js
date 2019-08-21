// pages/symptom/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  recommend: function(x) {
    let that = this;
    console.log(x);
    wx.request({
      url: 'https://wuwei.soft.360.cn/feiYang/getDrugs',
      data: { symptom:  '咳嗽'},
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res1) {
        console.log(res1.data.data);
        wx.navigateTo({
          url: '/pages/recommendedMedication/index?query=感冒',
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据 acceptDataFromOpenerPage
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: res1.data.data })

          }
        })    
      }
    })
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