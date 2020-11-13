const app = getApp();
var userInfo;
wx.cloud.init({
  env: 'lyy-123-5gfcvog5be9f56bd'
})
var that;
const DB = wx.cloud.database()
Page({
  data: {
    userType:'',
    id:'',
    isTeacherId:false,
    hiddenmodalput:true,
    items:[
      {value: '我是学生', name: '我是学生',},
      {value: '我是老师', name: '我是老师'}]
  }, 
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      userType:e.detail.value
    })
  
  },
  onLoad:function() {
    that= this;
  },

  input_Id({ detail: { value } }) {
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
    },

  userAdd(openId) {
    var user = {
      userType:this.data.userType,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      openId: openId
    };
    wx.setStorageSync('user', user);
 
    DB.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: user
    }).then(res => {
      console.log(res)
    })
  },
  getUserInfo: function (e) {
    wx.cloud.callFunction({
      name:'isTeacher',
      data: {
       id:that.data.id
      },
      success: res => {
        that.data.isTeacherId = res.result.isTeacherId
        console.log(res)        
    if(!this.data.userType){
      wx.showToast({
        title: '选择身份后才可登录',
        icon:'none'
      })
      return
    }else{
      if(this.data.userType=="我是学生"){
        wx.showToast({
          title: '登录成功',
        })
        wx.navigateTo({
          url: '../office/office'
        })
      }
      if(this.data.userType=="我是老师"&&this.data.isTeacherId){
        wx.showToast({
          title: '登录成功',
        })
        wx.navigateTo({
          url: '../teaOffice/teaOffice'
        })
      }else if(this.data.userType=="我是老师"&&!this.data.isTeacherId){
        wx.showToast({
          title: '抱歉！您没有权限进入',
          icon:'none'
        })
        return
      }
    }   
    console.log(e)
    userInfo = e.detail.userInfo;
    wx.cloud.callFunction({
      name: "getOpenid",
      success(res) {
        let openId = res.result.openid
        // 判断数据库中是否已经有数据
        DB.collection('user').where({
          openId: openId,
        })
        .get().then(ress => {
          console.log('ress',ress.data[0])
          
          if (ress.data.length == 0) {
            that.userAdd(openId)
          } else {
            wx.setStorageSync('user', ress.data[0]);
          }
        })
        
      },
      fail(res) {
        console.log('登录失败', res)
      }
    })
 
      }
    })

  },
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