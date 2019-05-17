const
  UpyunUpload = require('anve-upload-upyun'),
  PLUGIN_NAME = 'UpyunUploadPlugin';

/**
 * @param {option} see: https://github.com/shihao905/upload-upyun
 * @class UpyunUploadPlugin
 */
class UpyunUploadPlugin {
  constructor(option) {
    this.option = {
      openConfirm: false,
      ...option
    }
  }
  apply(compiler) {
    // 在生成资源到 output 目录后，触发上传操作
    compiler.hooks.afterEmit.tap(PLUGIN_NAME, () => {
      new UpyunUpload({...this.option})
    })
  }
}

module.exports = UpyunUploadPlugin;

