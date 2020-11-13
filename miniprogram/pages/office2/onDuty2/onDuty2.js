
const app = getApp();
const db=wx.cloud.database({
  env:'lyy-123-5gfcvog5be9f56bd'
}) 
var util = require('../../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: [],
    uName:'',
    id:'',
    date:'',
    hiddenmodalput:true
  },
  onLoad: function () {
    that = this;
   db.collection('onDuty2').get({
    success:res =>{     
      this.setData({
        information: res.data
      })
    }
    })
  },
  input_uName({ detail: { value } }) {
    this.setData({
      uName: value
    });
  },
  input_id({ detail: { value } }) {
    this.setData({
      id: value
    });
  },

  modalinput:function(){
		this.setData({
		   hiddenmodalput: !this.data.hiddenmodalput
		})
	},

  cancel: function(){
		this.setData({
			hiddenmodalput: true
  })
    },
    //确认
    confirm: function(){
        this.setData({
	        hiddenmodalput: true
      })
      db.collection('onDuty2').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          uName: that.data.uName,
          id:that.data.id,    
          date: util.formatTime(new Date())
        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        },
        fail: console.error,
        complete: console.log
      })
      console.log(this.data);
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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