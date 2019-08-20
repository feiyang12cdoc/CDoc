// pages/fastDiagnose/fast.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filepaths:"",
    backgroudImage:"",
    showUploadBtn: false,
    output:{
      sex:"",
      age:"",
      zz:"",
      bing:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  selectImage: function(){
    console.log("click");
    var that = this; // 缓存，否则无法在回调中使用
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("choose success");
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;

        // 更新view
        that.setData({
          filepaths: tempFilePaths[0],
          backgroudImage: "url('" + tempFilePaths[0] +"');",
          showUploadBtn:true,
        });
      },
      fail(res){
        console.log("choose failed")
      }      
    })
  },
  uploadImage: function(){
    var that = this; 
    wx.uploadFile({
      url: 'https://wuwei.soft.360.cn/feiYang/updateCase',
      filePath: this.data['filepaths'],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        //do something
        that.setData({
          output:{
            sex: res.data['sex'][0],
            age: res.data['age'][0],
            zz: res.data['zz'][0],
            bing: res.data['bing'][0]
          }
        })

        wx.showToast({
          title: "上传成功",
          icon: 'success',
          duration: 2000
        })
      }
    })
  }, 
  btnSubmit: function(){
    wx.request({
      url: '', //和后台交互的地址，默认是json数据交互，由于我的就是json，这里就没有对header进行编写
      data: this.data['output'],
      method: 'POST',
      success: function (res) {
        // 诊断中...
        // 跳转到诊断页
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
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "快速确诊"
    })
    this.setData({
      output: {
        sex: "女",
        age: "75岁",
        zz: "左眼视力下降3年,眼痛眼磨1个月",
        bing: "左眼新生血管性青光眼"
      }
    })

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