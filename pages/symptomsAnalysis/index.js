// pages/symptomsAnalysis/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    question: "您身体哪里不舒服？",
    list: [{
        "id": 1,
        "selector": "皮肤",
      },
      {
        "id": 2,
        "selector": "头部"
      },
      {
        "id": 3,
        "selector": "颈部"
      },
      {
        "id": 4,
        "selector": "胸部"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'https://wuwei.soft.360.cn/feiYang/intelligentQA',//和后台交互的地址，默认是json数据交互，由于我的就是json，这里就没有对header进行编写
      data: { question: "你身体哪里不舒服"},
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        var datas = res.data;//res.data就是从后台接收到的值
        console.log(res);
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      questionPercent: 20,
      question: "您身体哪里不舒服？",
      selectorNum: 3,
      selector: "浑身酸痛"
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})