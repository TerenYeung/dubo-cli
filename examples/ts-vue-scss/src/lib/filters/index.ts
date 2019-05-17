import Vue from 'vue';

/**
 * @description
 * @param{format} 'YYYY:MM:DD hh:mm:ss'
*/
Vue.filter('format', function(value, format) {
  if (typeof value !== 'number' && !(value instanceof Date)) {
    throw new TypeError('当前日期值类型非时间戳或日期对象');
  } else if (typeof value === 'number') {
    value = new Date(value)
  }

  if (!format) {
    format = 'yy:MM:dd hh:mm:ss'
  }

  var o = {
    "y+": value.getFullYear(),
    "M+": value.getMonth() + 1,                 //月份
    "d+": value.getDate(),                    //日
    "h+": value.getHours(),                   //小时
    "m+": value.getMinutes(),                 //分
    "s+": value.getSeconds(),                 //秒
    "q+": Math.floor((value.getMonth() + 3) / 3), //季度
    "S+": value.getMilliseconds()             //毫秒
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)){
      if(k == "y+"){
        format = format.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if(k=="S+"){
        var lens = RegExp.$1.length;
        lens = lens==1?3:lens;
        format = format.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
      }
      else{
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return format;
})

Vue.filter('ellipsis', function(value, len = 5) {
  if (!value) return "";
  value = value.toString();
  return value.length > len ? value.slice(0, len) + "..." : value;
})