// pages/recommendedMedication/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    list:[
      {
        "id":1,        "photo":"https://img.alicdn.com/imgextra/i2/2928278102/TB2BgbFXcoa61BjSspdXXajFVXa_!!2928278102.jpg_430x430q90.jpg",
        "name":"气管炎丸",
        "description":"散寒镇咳，祛痰定喘。用于外感风寒引起的咳嗽，气促哮喘，喉中发痒，痰涎壅盛，胸膈满闷，老年痰喘。",
        "usage":"口服，一次30粒，一日2次。",      
        "consumption_date":"consumption_date"

      },
      {
        "id":2,
        "photo": "https://img.alicdn.com/imgextra/i1/858915326/TB2QUCSbrAlyKJjSZFBXXbtiFXa_!!858915326.jpg_430x430q90.jpg",
        "name": "阿莫西林",
        "description": "上呼吸道感染 溃疡 咳痰 扁桃体发炎 疼痛 皮肤软组织感染",
        "usage": "成人1次2粒，每6-8小时一次。",
        "consumption_date": ""

      },
    ]


  },
  validate: function (data) {
    console.log(data[0])
    for(var i =0; i<data.length;i++){
      if (data[i]['description'].length > 30 ){
        data[i]['description'] = data[i]['description'].substr(0,25)+"...";
      }
    }
    this.setData({
      list:data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this       //很重要，一定要写
    wx.request({
      url: 'https://wuwei.soft.360.cn/feiYang/getDrugs',
      data: {},
      method: 'POST',
      success: function (res) {
        var datas = res.data.data;//res.data就是从后台接收到的值
        for (var i = 0; i < datas.length; i++) {
          datas[i]["consumption_date"] = time.formatTime(new Date(datas[i]["consumption_date"]))
        }
        that.setData({//循环完后，再对list进行赋值
          list: datas,
          loading: false
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
    // 本地数据测试
    this.validate(this.data["list"]);
    wx.setNavigationBarTitle({
      title:"快速购药"
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