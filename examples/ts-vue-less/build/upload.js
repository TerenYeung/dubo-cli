const
  config = require('./config'),
  duboConfig = require('../dubo.config.js'),
  {resolve} = require('./utils'),
  UpyunUpload = require('anve-upload-upyun');

new UpyunUpload({
  serviceName: duboConfig.cdn.service,
  operatorName: duboConfig.cdn.operator,
  password: duboConfig.cdn.passwd,
  remoteFilePath: duboConfig.cdn.remoteFilePath,
  filePath: duboConfig.cdn.filePath,
})