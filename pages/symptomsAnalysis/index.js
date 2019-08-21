// pages/symptomsAnalysis/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    question: "请选择就诊人的性别", 
    display_result:"none", 
    color: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.clearStorage() ;
    var totaldisplay = {"请选择就诊人的性别":""}
    var that = this;
    wx.request({
      url: 'https://wuwei.soft.360.cn/feiYang/intelligentQA',//和后台交互的地址
      data: { question: "请选择就诊人的性别"},
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        var datas = res.data;//res.data就是从后台接收到的值
        console.log(res);
        var nextquestions = datas.data.question.split("#");
        var selector = datas.data.answer.split(",");
        totaldisplay["请选择就诊人的性别"] = selector;
        var total_questions = [];
        total_questions.push("请选择就诊人的性别");
        that.setData({
          questionPercent: 20,
          question: "请选择就诊人的性别",
          selectorNum: selector.length,     //字符串答案个数
          selector: selector,             //字符串答案
          nextquestions: nextquestions,     //下一个请求回复的问题
          totaldisplay: totaldisplay,      //字典存储所有展示数据
          totalanswers: '',             //字符串存储所选所有答案
          total_questions: total_questions,            //列表存储所有问题
        })    
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        //console.log('submit complete');
      }
    })
  },



  /**
   * 用户点击答案
   */
  click_button: function(e){
    var query = this.data.final_answer;
    console.log("end: " + query);
    wx.navigateTo({
      url: '/pages/aiResult/index?query=' + query ,
    });
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为,：', e.detail.value);
    
    this.setData({ checked_value: e.detail.value, color:"checked"});
  },

  click: function(e){
    var that = this;
    var first_key = this.data.checked_value[0];
    var first_key_num = this.data.selector.indexOf(first_key);
    //var questionID = e.currentTarget.dataset['index'];
    //console.log(questionID);
    var nextquestion = this.data.nextquestions[first_key_num];
    if (nextquestion !== '0'){
      //nextquestion 不为0，还有后续问题
      wx.request({
        url: 'https://wuwei.soft.360.cn/feiYang/intelligentQA',
        data: { question: nextquestion },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          var datas = res.data;
          var nextquestions = datas.data.question.split("#");  //下一次的所有问题
          var selector = datas.data.answer.split(",");
          var totaldisplay = that.data.totaldisplay;
          var total_questions = that.data.total_questions;
          total_questions.push(nextquestion);
          
          console.log("nextquestion" + nextquestion);
          totaldisplay[nextquestion] = selector; //所有已选的问题

          var totalanswers;
          if(that.data.totalanswers.length > 0){
            //totalanswers = that.data.totalanswers + '|' + e.currentTarget.dataset['item'];
            totalanswers = that.data.totalanswers + '|' + that.data.checked_value.join(',');
          }
          else{
            //totalanswers = e.currentTarget.dataset['item'];
            totalanswers = that.data.checked_value.join(',');
          }
          that.setData({
            questionPercent: 10 * total_questions.length,
            question: nextquestion,
            selectorNum: selector.length,
            selector: selector,
            nextquestions: nextquestions,
            totaldisplay: totaldisplay,
            totalanswers: totalanswers,
            total_questions: total_questions,
          })
        },
        fail: function (res) {
          console.log('submit fail');
        },
        complete: function (res) {
          //console.log('submit complete');
          
        }
      })
    }
    else{
      //nextquestion 为 0，问题结束
      //GET请求, 参数为 question 携带所有answer
   
      var result_answers = this.data.totalanswers.split("|");
      var total_num = result_answers.length;
      var total_questions = this.data.total_questions;
      var result_display = {};
      for(var i = 0; i < total_num; i ++)
        result_display[total_questions[i]] = result_answers[i];
      
     
      wx.request({
        url: 'https://wuwei.soft.360.cn/feiYang/intelligentQAResult',
        data: { IntelligentQAResult: this.data.totalanswers },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',     
        success: function (res) {
          console.log(res.data.data);
          if (res.data.data){
            that.setData({ final_answer: res.data.data, });
          }
          else{
            that.setData({ final_answer: "未知疾病", });
          }

          that.setData({ 
            questionPercent: 100,
            display_card: "none" ,   //隐藏问答块
            display_result:"block",   //显示所有问题和答案块
            result_answers: result_answers,
            result_display: result_display,
            });
      
        },
        fail: function (res) {
          console.log('submit fail');
        },
        complete: function (res) {
          //console.log('submit complete');
        }
      })
      
    }

  }

})
