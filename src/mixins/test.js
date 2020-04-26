import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap (getCoupon) {
      getCoupon();
    }
  }
  java_login(e, hanshu) {
    let this_ = this.$parent.globalData;
    this_.logining = true;
    console.log(e)
    wx.login({
      success: function(res) {
        if (res.code) {
          let authid = 'dongzheng';
          let authsecret = 'dongzheng';
          let mpid = 'DZ2018';
          let moduleid = '2cbb2fa14279486499de20c971ef96d1';
          let jscode = res.code;
          let iv = e.iv;
          let encryptedData = e.encryptedData;
          let convertmpid = 'DZ2018';
          // 手机参数
          let telnumdata = this_.login_telnum_miyao;
          let telnumiv = this_.login_telnum_iv;
          let phonebrand = this_.login_phonebrand;
          let phonemodel = this_.login_phonemodel;
          let system = this_.login_system;
          let platform = this_.login_platform;
          let network = this_.login_network;
          let lat = this_.login_lat;
          let lng = this_.login_lng;
          let  country= this_.addressComponent.country;//过
          let city = this_.addressComponent.city;
          let province = this_.addressComponent.province;
          let userid=this_.userid
          if(userid!=''){
            wx.request({
              url: this_.json_link + '/api/wxapp/user/login',
              method: 'POST',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                jscode: jscode,
                encryptedData: encryptedData,
                iv: iv,
                convertmpid: convertmpid,
                mpid: mpid,
                authid: authid,
                authsecret: authsecret,
                moduleid: moduleid,
                withauthdata: 0,
                telnumdata: telnumdata,
                telnumiv: telnumiv,
                phonebrand: phonebrand,
                phonemodel: phonemodel,
                system: system,
                platform: platform,
                network: network,
                lat: lat,
                lng: lng,
                country:country,
                city:city,
                province:province,
                referee:userid
              },
              success: function(data) {
                if (data.data.code == 'A00006') {
                  wx.showToast({
                    title: '登录成功！',
                    icon: 'success'
                  });
                  this_.access_token = data.data.access_token;
                  this_.optionid = data.data.optionid;
                  hanshu(this_.access_token);
                  wx.request({
                    // url拼接
                    url: this_.json_link + '/api/wxapp/userinfo/detail?access_token=' +data.data.access_token,
                    data: {},
                    // 后台返回值
                    success: function(data) {
                      console.log( data.data.data.userid)
                      this_.userid=data.data.data.userid;
                      // 定义返回值的数据
                      // 领取
                      wx.request({
                        // url拼接
                        url: this_.json_link + '/api/wxapp/card/loginsendcardinfo?access_token=' +data.data.access_token,
                        data: {},
                        // 后台返回值
                        success: function(data) {
                          console.log(data.data.data.type)
                          // 领取
                          if(data.data.data.type==-1){

                          }else if(data.data.data.type==1){
                            wx.showModal({
                              title: '提示',
                              content: data.data.data.title,
                              showCancel: false,
                              confirmText:"领取",
                              success: function(res) {
                                if (res.confirm) {
                                  wx.request({
                                    url: this_.json_link + '/api/wxapp/card/loginsendcard?access_token=' +access_token,
                                    data: {
                                      sendflag: 0
                                    },
                                    success: function(data) {
                                    }
                                  });
                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })
                          }else  if(data.data.data.type==0){
                            wx.showModal({
                              title: '提示',
                              content: data.data.data.title,
                              showCancel: true,
                              confirmText:"领取",
                              success: function(res) {
                                if (res.confirm) {
                                  wx.request({
                                    url: this_.json_link + '/api/wxapp/card/loginsendcard?access_token=' +access_token,
                                    data: {
                                      sendflag: 1
                                    },
                                    success: function(data) {
                                    }
                                  });
                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                  wx.request({
                                    url: this_.json_link + '/api/wxapp/card/loginsendcard?access_token=' +access_token,
                                    data: {
                                      sendflag: 0
                                    },
                                    success: function(data) {
                                    }
                                  });
                                }
                              }
                            })
                          }
                          // 定义返回值的数据
                          // 提示

                        }
                      });
                    }
                  });


                } else {
                  wx.showToast({
                    title: '登录失败！',
                    icon: 'success'
                  });
                }
                this_.logining = false;
              }
            });
          }else{
            wx.request({
              url: this_.json_link + '/api/wxapp/user/login',
              method: 'POST',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                jscode: jscode,
                encryptedData: encryptedData,
                iv: iv,
                convertmpid: convertmpid,
                mpid: mpid,
                authid: authid,
                authsecret: authsecret,
                moduleid: moduleid,
                withauthdata: 0,
                telnumdata: telnumdata,
                telnumiv: telnumiv,
                phonebrand: phonebrand,
                phonemodel: phonemodel,
                system: system,
                platform: platform,
                network: network,
                lat: lat,
                lng: lng,
                country:country,
                city:city,
                province:province
              },
              success: function(data) {
                console.log('授权15');
                if (data.data.code == 'A00006') {
                  wx.showToast({
                    title: '登录成功！',
                    icon: 'success'
                  });
                  this_.access_token = data.data.access_token;
                  let access_token=data.data.access_token
                  this_.optionid = data.data.optionid;
                  hanshu(this_.access_token);
                  wx.request({
                    // url拼接
                    url: this_.json_link + '/api/wxapp/userinfo/detail?access_token=' +data.data.access_token,
                    data: {
                    },
                    // 后台返回值
                    success: function(data) {
                      console.log( data.data.data.userid)
                      this_.userid=data.data.data.userid;
                      // 定义返回值的数据
                    }
                  });
                  console.log('登录成功ad！')
                  // 领取
                  wx.request({
                    // url拼接
                    url: this_.json_link + '/api/wxapp/card/loginsendcardinfo?access_token=' +data.data.access_token,
                    data: {},
                    // 后台返回值
                    success: function(data) {
                      // 领取
                      if(data.data.data.type==-1){

                      }else if(data.data.data.type==1){
                        wx.showModal({
                          title: '提示',
                          content: data.data.data.title,
                          showCancel: false,
                          confirmText:"领取",
                          success: function(res) {
                            if (res.confirm) {
                              wx.request({
                                url: this_.json_link + '/api/wxapp/card/loginsendcard?access_token=' +access_token,
                                data: {
                                  sendflag: 0
                                },
                                success: function(data) {
                                }
                              });
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
                      }else  if(data.data.data.type==0){
                        wx.showModal({
                          title: '提示',
                          content: data.data.data.title,
                          showCancel: true,
                          confirmText:"领取",
                          success: function(res) {
                            if (res.confirm) {
                              wx.request({
                                url: this_.json_link + '/api/wxapp/card/loginsendcard?access_token=' +access_token,
                                data: {
                                  sendflag: 1
                                },
                                success: function(data) {
                                }
                              });
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                              wx.request({
                                url: this_.json_link + '/api/wxapp/card/loginsendcard?access_token=' +access_token,
                                data: {
                                  sendflag: 0
                                },
                                success: function(data) {
                                }
                              });
                            }
                          }
                        })
                      }
                      // 定义返回值的数据
                      // 提示

                    }
                  });

                } else {
                  wx.showToast({
                    title: '登录失败！',
                    icon: 'success'
                  });
                }
                this_.logining = false;
              }
            });
          }

        } else {
          console.log('授权13');
          this_.logining = false;
          console.log('登录失败！！！');
        }
      }
    });
  };

  tap (getCoupon) {
    return getCoupon();
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
