// pages/medicalConsultation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{doctor_name:1, doctor_hospital:1.2, 
      doctor_feature: [1.3, 1.4, 1.5], doctor_tag: [1.6, 1.7]
    }, {
      doctor_name: 2, doctor_hospital: 2.2,
        doctor_feature: [2.3, 2.4, 2.5], doctor_tag: [2.6, 2.7]
      }, {
        doctor_name: 3, doctor_hospital: 3.2,
        doctor_feature: [3.3, 3.4, 3.5], doctor_tag: [3.6, 3.7]
      }],
    departments: "口腔科",
    doctor_num: 3,
    
    
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