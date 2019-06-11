/**
 * img-cook default loader
 * 用来处理文件内容
 * 示例：https://github.com/imgcook/imgcook-cli/tree/master/packages/%40imgcook/cli-loader-images
 */

const fs = require('fs');
const { unique, downloadImg } = require('../../lib');
const UPLOAD = require('./upload');
const upload = new UPLOAD();

const uploadData = (file, filepath, option) => {
  return new Promise(resolve => {
    upload.uploadUrl = option.uploadUrl;
    upload
      .start(file, {
        filepath: filepath
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        // console.log(JSON.stringify(err));
      });
  });
};

const loader = async (item, option) => {

  let imgArr = [];
  let fileValue = item.panelValue;
  const { filePath, index, imgPath } = option;
  const temporaryImages = `${(
    new Date().getTime() + Math.floor(Math.random() * 10000)
  ).toString(30)}`;
  imgArr = fileValue.match(
    /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|](\.png|\.jpg)/g
  );
  if (imgArr && imgArr.length > 0) {
    imgArr = unique(imgArr);
    const imgFullPath = `${imgPath}/images`;
    for (let idx = 0; idx < imgArr.length; idx++) {
      if (!fs.existsSync(imgFullPath)) {
        fs.mkdirSync(imgFullPath);
      }
      let suffix = imgArr[idx].split('.');
      suffix = suffix[suffix.length - 1];
      const imgName = `img_${option.moduleData.id}_${index}_${idx}.${suffix}`;
      const imgPathItem = `${imgFullPath}/${imgName}`;
      await downloadImg(imgArr[idx], imgPathItem);

      const reg = new RegExp(imgArr[idx], 'g');
      //TODO:  集成upload到又拍云的逻辑
      if (option.config && option.config.uploadUrl !== '') {
        const udata = await uploadData(
          imgPathItem,
          `imgcook-cli/${temporaryImages}/`,
          option.config
        );
        fileValue = fileValue.replace(reg, udata.url);
      } else {
        fileValue = fileValue.replace(reg, `../../assets/images/${imgName}`);
      }
    }
  }
  return fileValue;
};

module.exports = function(item, option) {
  return loader(item, option);
};
