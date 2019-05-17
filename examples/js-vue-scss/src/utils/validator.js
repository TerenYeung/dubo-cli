import {
  validateIdCard,
  validateHKMC,
  validateTW,
  validatePSPort,
  validateMobile,
  validateEmail,
} from './validator-helper';

const strategies = {
  isNonEmpty(value, errMsg, cb) {
    if (!value) {
      cb && cb();
      return errMsg;
    }
  },
  maxLength(value, length, errMsg, cb) {
    if (value.length > length) {
      cb && cb();
      return errMsg;
    }
  },
  minLength(value, length, errMsg, cb) {
    if (value.length < length) {
      cb && cb();
      return errMsg;
    }
  },
  isEmail(value, errMsg, cb) {
    if (!validateEmail(value)) {
      cb && cb();
      return errMsg;
    }
  },
  isMobile(value, errMsg, cb) {
    if (!validateMobile(value)) {
      cb && cb();
      return errMsg;
    }
  },
  isID(value, type, errMsg, cb) {
    let validator = null;
    if (type === 'id') {
      validator = validateIdCard;
    } else if (type === 'HKMC') {
      validator = validateHKMC;
    } else if (type === 'TW') {
      validator = validateTW;
    } else if (type === 'PSPort') {
      validator = validatePSPort;
    }

    if (!validator(value)) {
      cb && cb();
      return errMsg;
    }
  },
}

export default class Validator {
  cache = [];

  add(value, rules) {
    for (const rule of rules) {
      const strateAry = rule.strategy.split(':');

      this.cache.push(() => {
        const strategy = strateAry.shift();
        strateAry.unshift(value);
        strateAry.push(rule.errMsg);
        strateAry.push(rule.cb);

        return strategies[strategy].apply(null, strateAry);
      })
    }
  }

  start() {
    for (const func of this.cache) {
      const errMsg = func();
      if(errMsg) return errMsg;
    }
  }
}
