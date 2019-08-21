// 引入SDK核心类
var QQMapWX = require('./qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
// 公共的地图sdk
var qqmapsdk;
var mapCtx = wx.createMapContext('myMap');

Page({
  data: {
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置精度
    markers: [], // 标记
    hospitalList: [],
    polyline: '',
    doctorList: [
      { 
        name:'AI医生',
        doctorImg: 'https://p3.ssl.qhimg.com/t01828e3672dc2aa7f1.jpg',
        doctorInfo: '擅长治疗各种疾病',
        routeWaitingTime: '1小时25分钟',
        departmentalWaitingTime: '3小时10分钟'
      },
      {
        name: 'AI医生',
        doctorInfo: '擅长治疗各种疾病',
        doctorImg: 'https://p3.ssl.qhimg.com/t01828e3672dc2aa7f1.jpg',
        routeWaitingTime: '1小时25分钟',
        departmentalWaitingTime: '3小时10分钟'
      },
      {
        name: 'AI医生',
        doctorInfo: '擅长治疗各种疾病',
        doctorImg: 'https://p3.ssl.qhimg.com/t01828e3672dc2aa7f1.jpg',
        routeWaitingTime: '1小时25分钟',
        departmentalWaitingTime: '3小时10分钟'
      },
      {
        name: 'AI医生',
        doctorInfo: '擅长治疗各种疾病',
        doctorImg: 'https://p3.ssl.qhimg.com/t01828e3672dc2aa7f1.jpg',
        routeWaitingTime: '1小时25分钟',
        departmentalWaitingTime: '3小时10分钟'
      },
      {
        name: 'AI医生',
        doctorInfo: '擅长治疗各种疾病',
        doctorImg: 'https://p3.ssl.qhimg.com/t01828e3672dc2aa7f1.jpg',
        routeWaitingTime: '1小时25分钟',
        departmentalWaitingTime: '3小时10分钟'
      }
    ],
  },
  onReady: function (e) {
    // this.moveToCurrentLocation();
  },
  onShow: function(e) {
    this.moveToCurrentLocation();

  },
  // 获取当前位置
  getCenterLocation: function () {
    let that = this;
    that.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    });
  },
  // 移动到当前位置
  moveToLocation() {
    let that = this;
    that.mapCtx.moveToLocation({});
  },
  // 
  getDoctor11(e) {
    console.log(e.currentTarget.dataset.hospital);
    let hos = e.currentTarget.dataset.hospital;
    wx.navigateTo({
      url: '/pages/medicalConsultation/index?query='+ hos
    })
  },
  moveToCurrentLocation() {
    let that = this;
    setTimeout(()=>{
      wx.getLocation({
        success: function (res) {
          that.moveToLocation({
            latitude: res.latitude,
            longitude: res.longitude
          });
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
        },
      });
    },100)
    
  },
  // 计算距离
  calculateDistance: function(to) {
    let that = this;
    let hospitalList = [];
    to.forEach((item)=>{
      let hospitalItem = {
        name : item.title,
        address : item.address,
        location: item.location,
        category: item.category,
        departmentalWaitingTime: "1小时20分钟",
        routeTime: '30分钟'
      };
      hospitalList.push(hospitalItem);
    });
    that.setData({
      hospitalList: hospitalList
    });
    //调用距离计算接口
    qqmapsdk.calculateDistance({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      // 获取表单提交的经纬度并设置from和to参数（示例为string格式）
      // from: e.detail.value.start || '', //若起点有数据则采用起点坐标，若为空默认当前地址
      to: to, //终点坐标
      success: function (res) {//成功后的回调
        // console.log('当前地址：',from);
        // console.log('计算路程',res);
      },
      fail: function (error) {
        console.error('计算路程error',error);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  // 规划路线
  goDestination: function (to) {
    let that = this;
    let from1 = {
      latitude: that.data.latitude,
      longitude: that.data.longitude
    };
    console.log(from1)
    to = {
      latitude: "39.9123450000", 
      longitude:"116.4159620000"
    }
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填
      // from : from1,
      to: to,
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        // 设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        that.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#0f0',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  // 查询附近的医院
  getHospital() {
    const that = this;
    // 调用接口
    qqmapsdk.search({
      keyword: '医院',
      success:  (res) => {
        let hospitalInfo = res.data;
        // that.goDestination({
        //   latitude: hospitalInfo[0].location.lat,
        //   longitude: hospitalInfo[0].location.lng
        // });
        that.calculateDistance(res.data);
      },
      fail: function (res) {
        console.log(res.status, res.message);
      },
      complete: function (res) {
        // console.log(res.status, res.message);
      }
    });
  },
  // 初始化地图
  initMap() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        vm.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          // markers: [{
          //   id: "1",
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   width: 50,
          //   height: 50,
          //   iconPath: "/image/location.png",
          //   title: "哪里"

          // }],
          // circles: [{
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   color: '#FF0000DD',
          //   fillColor: '#7cb5ec88',
          //   radius: 3000,
          //   strokeWidth: 1
          // }]
        });
        // vm.getCenterLocation();

      }
    });
  },
  onLoad: function () {
    let that = this;
    // 地图上下文
    that.mapCtx = wx.createMapContext('myMap');
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'PF7BZ-DSI6K-KWYJR-AA3Z5-M36OO-CLBA2' // 必填
    });
    that.initMap();
    setTimeout(()=>{
      that.moveToLocation();
    },100)
    that.getHospital();
    that.getDoctor();
    that.goDestination();
  },
  getDoctor() {
    let that = this;
    wx.request({
      url: 'https://wuwei.soft.360.cn/feiYang/getDoctors',
      data: {
        hospitalNameList:'北京协和医院'
      },
      method: 'GET',
      success: function (res) {
        that.setData({ doctorList: res.data.data })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },
 //点击markers
  markertap(e) {
    console.log(e.markerId);
    wx.showActionSheet({
      itemList: ["A"],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }, 
  //校验位置权限是否打开
  checkLocation: function () {
    let that = this;
    //选择位置，需要用户授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.showToast({ //这里提示失败原因
                title: '授权成功！',
                duration: 1500

              })
            },
            fail() {
              that.showSettingToast('需要授权位置信息');
            }
          })
        }
      }
    })
  },
})
