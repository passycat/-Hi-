// pages/functions/ui/ui.js
const db = wx.cloud.database().collection('UItest')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片回调参数
    imgList: [],
    attachments: [],
    imageArray: [],
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album'], 
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            attachments: this.data.imgList.concat(res.tempFilePaths)
          })

        } else {
          this.setData({
            attachments: res.tempFilePaths

          })
          console.log('选择成功', res.tempFilePaths)
         /*图片选择成功后上传至云存储和云数据库记录图片路劲*/
          this.data.imageArray.map(item => {
            attachments.push(item.uploadResult.key)
          })
          let attachments = this.data.attachments;
          console.log(this.data.attachments)
          db.add({
            data:{
              'attachments': attachments
            },
            
             success(res) {
              console.log('提交结果', res)
              var path=res._id+'.png'
              wx.cloud.uploadFile({
                
                cloudPath: path,
                filePath: attachments[0],
                success(res) {
                  console.log('上传成功', res)

                },
                 fail(res) {
                  console.log('上传失败', res)
                 }
              })
            }
          })
         
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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