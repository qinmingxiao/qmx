// pages/teaOffice/detail/detail.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command;
var that = null;
Page({
  onLoad(){
    that = this;
    that.setData({
      item:app.globalData.item
    });
  },
  onShow(){
    
  },

  init(){
   
    db.collection('apply').where({
      pid:that.data.item._id
    }).get()
    .then(result=>{
      console.log(result);
      let items = result.data.map(item=>{
        item.date=app.nowdate(item.date);
        return item;
      })
      wx.hideLoading();
      wx.hideNavigationBarLoading();
    })
  },

  pass(){
    db.collection('apply').doc(that.data.item._id).update({
      data: {
        state: '审核通过'
      },
    })
  },
  unpass(){
    db.collection('apply').doc(that.data.item._id).update({
      data: {
        state: '被驳回'
      },
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