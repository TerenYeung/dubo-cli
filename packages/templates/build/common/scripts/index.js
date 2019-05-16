const
  fs = require('fs'),
  md5File = require('md5-file'),
  Fontmin = require('fontmin'),
  path = require('path'),
  crypto = require('crypto'),
  {resolve} = require('../utils');

const md5Dir = url => {
  const isDirectory = fs.lstatSync(url).isDirectory();

  if (isDirectory) {
    const files = fs.readdirSync(url);
    const hashes = [];
    const hash = crypto.createHash('md5')

    files.forEach((file) => {
        const filepath = path.join(url, file);
        const stat = fs.statSync(filepath);

        let hash;

        if (stat.isFile()) {
            hash = md5File.sync(filepath)
        } else if (stat.isDirectory()) {
            hash = md5Dir(filepath)
        } else {
            hash = null;
        }
        hashes.push(hash);
    });

    hashes.forEach((h) => {
        if (h !== null) hash.update(h)
    });

    return hash.digest('hex');
  } else {
    return hash = md5File.sync(url);
  }
}

module.exports = function checkFilesChange(checkFiles, hashFile) {
  const isExsit = fs.existsSync(hashFile);
  const newHash = md5Dir(checkFiles);

  if (!isExsit) {
    fs.writeFileSync(hashFile, newHash || '');
    return true;
  } else {
    const fontminHash = fs.readFileSync(hashFile);
    if (newHash !== fontminHash.toString()) {
      fs.writeFileSync(hashFile, newHash || '');
      return true;
    }
  }

  return false;
}