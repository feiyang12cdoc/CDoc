// pages/medicalConsultation/index.js
Page({

  /**
   * 页面的初始数据
   */
  
  
  data: {
    loading: false,
    list: [
      //数据格式说明
      {
        "id": 1, 
        "image": "./img/e32a706f6f6c6f6f6c6f6fdc01.jpg",
        "name": "医生1",
        "department": "口腔科",
        "hospital":"广东省深圳医院",
        "skilled": "骨性牙列不齐，各种正畸技术",
        "tag":["从业12年","快速回复"],
        "score":4.8,
        "answer":450,
        "waitTime": "50分钟"
      },
      {
        "id": 2,
        "image": "./img/e32a706f6f6c6f6f6c6f6fdc01.jpg",
        "name": "医生2",
        "department": "口腔科",
        "hospital": "广东省北京大学深圳医院",
        "skilled": "骨性：各种正畸技术",
        "tag": ["从业5年", "快速回复"],
        "score": 4.8,
        "answer": 450,
        "waitTime": "50分钟"
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载，获取参数：诊断结果 ?symptom=xxx
      var that = this;
    if (options.query == '公安部机关门诊部'){
      that.setData({ symptom: options.query });
      //发起请求，查询获得医生信息
      //https://wuwei.soft.360.cn/feiYang/getDoctors?symptom=轻微发烧
      wx.request({
        url: 'https://wuwei.soft.360.cn/feiYang/getDoctors',
        // data: { symptom: that.data.symptom },
        data: { hospitalNameList: "北京协和医院" },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          //需要把返回res 医生信息
          console.log(res);
          var doctors = res.data.data;
          that.setData({ list: doctors });
        }
      })
    }
    else if (options.query == "潍城豪德医院"){
      that.setData({ symptom: options.query });
      //发起请求，查询获得医生信息
      //https://wuwei.soft.360.cn/feiYang/getDoctors?symptom=轻微发烧
      wx.request({
        url: 'https://wuwei.soft.360.cn/feiYang/getDoctors',
        // data: { symptom: that.data.symptom },
        data: { hospitalNameList: "中国中医科学院眼科医院" },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          //需要把返回res 医生信息
          console.log(res);
          var doctors = res.data.data;
          that.setData({ list: doctors });
        }
      })
    }
    else {
      that.setData({ symptom: options.query });
      //发起请求，查询获得医生信息
      //https://wuwei.soft.360.cn/feiYang/getDoctors?symptom=轻微发烧
      wx.request({
        url: 'https://wuwei.soft.360.cn/feiYang/getDoctors',
        // data: { symptom: that.data.symptom },
        data: { symptom: "轻微发烧" },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          //需要把返回res 医生信息
          console.log(res);
          var doctors = res.data.data;
          that.setData({ list: doctors });
        }
      })
    }
  }

 
})
