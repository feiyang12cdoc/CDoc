// pages/fastDiagnose/fast.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disableSubmitBtn:true,
    filepaths:"",
    backgroudImage:"",
    showUploadBtn: false,
    hideOutput:false,
    tt:false,
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
        // 图片转base64 作为背景
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // 更新view
            that.setData({
              filepaths: tempFilePaths[0],
              backgroudImage: "url('data:image/png;base64," + res.data + "');",
              showUploadBtn: true,
            });
            // console.log('data:image/png;base64,' + res.data)
          }
        })


        console.log(that.data.backgroudImage)
      },
      fail(res){
        console.log("choose failed")
      }      
    })
  },
  uploadImage: function(){
    var that = this; 
    // 启用动画
    that.setData({
      hideOutput: true,
    })
    wx.uploadFile({
      url: 'https://wuwei.soft.360.cn/feiYang/updateCase',
      header:{
        'content-type': 'multipart/form-data'
      },
      filePath: this.data['filepaths'],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        var data = JSON.parse(res.data).data
        //do something
        setTimeout(() => {
          that.setData({
            hideOutput: false,
          })
          that.setData({
            output: {
              sex: data.sex[0],
              age: data.age[0],
              zz: data.zz[0],
              bing: data.bing[0]
            },
            disableSubmitBtn: false
          })
        }, 2500)
        // 
        
        
        // wx.showToast({
        //   title: "上传成功",
        //   icon: 'success',
        //   duration: 2000
        // })
      },fail(res){
        wx.showToast({
          title: "上传失败",
          icon: 'none',
          duration: 2000
        })
      }
    })

  }, 
  btnSubmit: function(e){
    var that2 = this 

    wx.request({
      url: 'https://wuwei.soft.360.cn/feiYang/aiDiagnose', 
      data: that2.data['output'],
      method: 'POST',
      success: function (res) {
        // 诊断中...
        // 跳转到诊断页
        if(res.statusCode==200){
          wx.navigateTo({
            url: '/pages/aiResult/index?query=' + that2.data,
            success: function (res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: that2.data })
            }
          })        
        }
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
        sex: "",
        age: "",
        zz: "",
        bing: ""
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