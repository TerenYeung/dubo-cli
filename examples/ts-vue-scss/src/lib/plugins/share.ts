const run = (window as any).run;
const wx = (window as any).wx;
const $ = (window as any).$;

const ExternalShare: any = {}
ExternalShare.install = function(Vue) {
  Vue.prototype.$share = function(shareData){
    run.menuShare(shareData);

    var curUrl = encodeURIComponent(window.location.href);
    $.ajax({
      type: 'get',
      url: '//webevent.thejoyrun.com/wechatapi/jsconfig?url='+curUrl,
      dataType: 'jsonp',
      cache: false,
      success: function(data) {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //alert("" + textStatus + "," + errorThrown);
      }
    });

    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ]
      });
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
      wx.onMenuShareQZone(shareData);
    });
    wx.error(function(res) {
      //alert(res.errMsg);
    });

  }
}

export default ExternalShare;


