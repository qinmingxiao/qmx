// pages/teaOffice/teaOffice.js
const app = getApp();
const db=wx.cloud.database({
  env:'lyy-123-5gfcvog5be9f56bd'
}) 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: []
  },
  onLoad: function () {
   //2、开始查询数据了  news对应的是集合的名称
   db.collection('apply').get({
     //如果查询成功的话
    success:res =>{     
      this.setData({
        information: res.data
      })
    }
    })
  },

  todetail(e){
    app.globalData.item=e.currentTarget.dataset.item;
    wx.navigateTo({
      url: './detail/detail',
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