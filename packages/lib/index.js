const
  path = require('path'),
  fs = require('fs'),
  {execSync} = require('child_process'),
  os = require('os'),
  request = require('request');

const isExist = url => fs.existsSync(url);

const execPath = process.mainModule.filename;

const resolve = url => path.resolve(execPath, '../../', url);

const removeFolder = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        removeFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const removeFiles = url => {
  if (fs.lstatSync(url).isDirectory()) {
    fs.readdirSync(url).forEach(file => {
      const innerUrl = path.join(url, file);
      removeFiles(innerUrl);
    })
  } else {
    fs.unlinkSync(url);
  }
}

const copyFile = (source, target) => {
  if (isExist(target) && fs.lstatSync(target).isDirectory()) {
    target = path.join(target, path.basename(source));
  }

  fs.writeFileSync(target, fs.readFileSync(source));
}

/**
 * @description 拷贝整个文件夹
 */
const copyFolder = (source, target) => {
  let files = [];
  const targetFolder = path.join(target, path.basename(source));

  if (!isExist(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);

    files.forEach(file => {
      const curSource = path.join(source, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolder(curSource, targetFolder);
      } else {
        copyFile(curSource, targetFolder);
      }
    })
  }
}

/**
 * @description 将源文件夹下所有文件拷贝到目标文件夹
*/
const copyFilesToFolder = (source, target) => {
  let files = [];
  if (!isExist(target)) {
    fs.mkdirSync(target);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);

    files.forEach(file => {
      const curSource = path.join(source, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolder(curSource, target);
      } else {
        copyFile(curSource, target);
      }
    })
  } else {
    copyFile(source, target);
  }
}

const replace = ({
  regMap,
  src,
  dist
}) => {
  let str = fs.readFileSync(src).toString('utf8');

  for (let [key, value] of Object.entries(regMap)) {
    str = str.replace(new RegExp(key, 'g'), value);
  }

  fs.writeFileSync(dist, str);
}

const downloadImg = (url, lurl) => {
  return new Promise(resolve => {
    request(url)
      .pipe(fs.createWriteStream(lurl))
      .on('close', () => {
        resolve()
      })
  })
}

const homedir = () => {
  const
    env = process.env,
    home = env.HOME,
    user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;

  if (process.platform === 'win32') {
    return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
  }

  if (process.platform === 'darwin') {
    return home || (user ? '/Users/' + user : null)
  }

  if (process.platform === 'linux') {
    return (
      home || (process.getuid() === 0 ? '/root' : user ? '/home/' + user : null)
    )
  }
}

const unique = (array) => {
  return array.concat().sort().filter((item, index, err) => {
    return !index || item !== array[index - 1]
  })
}

module.exports = {
  isExist,
  resolve,
  removeFolder,
  removeFiles,
  copyFile,
  copyFolder,
  copyFilesToFolder,
  replace,
  homedir: typeof os.homedir === 'function' ? os.homedir : homedir,
  unique,
  downloadImg
}