
const db = wx.cloud.database();
var that;
Page({
  
  // /**
  //  * 页面的初始数据
  //  */
  data: {
    uName: '', 
    phone: '',
    reason: '',
    date: '2020-11-01',//默认起始时间  
    date2: '2020-11-02',//默认结束时间 
    time:'00:00',
    time2:'00:00',
    state:'审核中',
    clickFlag: true
  },

  input_uName({ detail: { value } }) {
    this.setData({
      uName: value
    });
  },

  input_phone({ detail: { value } }) {
    this.setData({
      phone: value
    });
  },
  input_reason({ detail: { value } }) {
    this.setData({
      reason: value
    });
  },

  onLoad: function () {
   that = this;
  },

  // 时间段选择  
  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
    })
  },
  bindDateChange2(e) {
    this.setData({
      date2: e.detail.value,
    })
  },
  bindtimeChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      time: e.detail.value,
    })
  },
  bindtimeChange2(e) {
    let that = this;
    that.setData({
      time2: e.detail.value,
    })
  },

  addOrder() { 
    
    if (!this.data.uName) {
      wx.showToast({  
        title: '请填写申请人姓名',
        icon: 'none',  
        duration: 2000
      })
    }

    if (!this.data.phone) {
      wx.showToast({  
        title: '请填写电话号码',
        icon: 'none',  
        duration: 2000
      })
    }

    if (!this.data.reason) {
      wx.showToast({  
        title: '请填写申请理由',
        icon: 'none',  
        duration: 2000
      })
    }

    if(this.data.uName&&this.data.phone&&this.data.reason){
      db.collection('apply').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          uName: that.data.uName,    
          date: that.data.date,
          date2: that.data.date2,
          time:that.data.time,
          time2:that.data.time2,
          phone: that.data.phone,
          reason: that.data.reason,
          state:that.data.state,
          place:'报告厅',
        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        },
        fail: console.error,
        complete: console.log
      })
      console.log(this.data);
      wx.showToast({  
        title: '申请成功',
        icon: 'success',  
        duration: 2000  
    })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
});