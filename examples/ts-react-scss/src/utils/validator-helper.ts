const validateSecIdCard = (code: string): boolean => {
  if (!/^\d{17}(\d|x)$/i.test(code)) return false;

  var province = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙", 21: "辽宁", 22: "吉林", 23: "黑龙", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 83: "台湾", 91: "国外" };

  if (province[parseInt(code.substr(0, 2))] === null) return false;

  return true;
}

/**
 * @description 身份证 15 位转 18 位，规则详见：https://baike.baidu.com/item/%E5%B1%85%E6%B0%91%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%8F%B7%E7%A0%81/3400358?fromtitle=%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%8F%B7%E7%A0%81&fromid=2135487；
 https://www.jianshu.com/p/ff3bf238d8ef
 * @param code
 */
function idCardUpdate(code) {
  if(/^\d{15}$/.test(code)) {
    // step1: 在 15 位身份证第六位插入 19 的出生纪年，此时身份证号码为 17 位
    code = code.substr(0, 6) + '19' + code.substr(6, code.length - 6);

    // step2: 将身份证每一位系数与位数相乘结果相加
    const coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const modeMap = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    let sum = 0;

    for (let i = 0; i < code.length; i++) {
      sum += parseInt(code.substr(i, 1)) * coefficient[i];
    }

    // step3: 将相乘结果对 11 取余，找到余数对应尾数对应表
    return code+= modeMap[sum % 11];
  } else {
    return code;
  }
}

export const validateIdCard = (code: string): boolean => {
  let newCode = code;
  // 是否为一代身份证
  if (code.length === 15) {
    newCode = idCardUpdate(code);
  }

  return validateSecIdCard(newCode);
}

export const validateHKMC = (code: string): boolean => /^[HMhm]{1}([0-9]{8})$/.test(code);

export const validateTW = (code: string): boolean => /^[0-9]{8}$/.test(code) || /^[0-9]{10}$/.test(code);

export const validatePSPort = (code: string): boolean => /^[a-zA-Z]{5, 17}$/.test(code) || /^[a-zA-Z0-9]$/.test(code);

export const validateMobile = (code: string): boolean => /^(13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}$/.test(code);

export const validateEmail = (code: string): boolean => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(code);