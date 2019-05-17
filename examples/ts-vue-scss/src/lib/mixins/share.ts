import BaseVue from 'lib/base';
import Component from 'vue-class-component';

@Component
export default class ShareMixin extends BaseVue {
  mounted() {
    var shareData = {
      title: '我已加入“青春山大悦跑季”，快来一起开跑吧！',
      desc: '用跑量为学校打call',
      link: 'https://' + document.domain + '/activity/shandarun/',
      imgUrl: 'https://joyrun-activity-upyun.thejoyrun.com/huodong/2019/04/shandarun/img/share.png'
    }

    this.$share && this.$share(shareData)
    if (this.nativeService.isJoyRunwebview()) {
      this.nativeService.setCloseButtonStatus(true)
    }
  }
}

