import axios from 'axios';

const run = (window as any).run;
const wx = (window as any).wx;

export default function(shareData) {
  // 调用 APP 设置分享内容接口
  run.menuShare(shareData);

  const curlUrl = encodeURIComponent(window.location.href);
  axios({
    method: 'get',
    url: '',
    responseType: 'jsonp',
    params: {
      url: curlUrl
    },
  })
  .then(res => {
    const data = res.data;

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
  })
  .catch(err => console.error(err));

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