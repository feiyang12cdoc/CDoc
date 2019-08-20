// pages/medicalConsultation/index.js
Page({

  /**
   * 页面的初始数据
   */
  
  
  data: {
    loading: false,
    list: [
      {
        "id": 1, 
        "photo": "./img/e32a706f6f6c6f6f6c6f6fdc01.jpg",
        "name": "医生1",
        "departments": "口腔科",
        "hospital":"广东省深圳医院",
        "features": "骨性牙列不齐，各种正畸技术",
        "tag":["从业12年","快速回复"],
        "score":4.8,
        "answer":450,
      },
      {
        "id": 2,
        "photo": "./img/e32a706f6f6c6f6f6c6f6fdc01.jpg",
        "name": "医生2",
        "departments": "口腔科",
        "hospital": "广东省北京大学深圳医院",
        "features": "骨性：各种正畸技术",
        "tag": ["从业5年", "快速回复"],
        "score": 4.8,
        "answer": 450,
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
