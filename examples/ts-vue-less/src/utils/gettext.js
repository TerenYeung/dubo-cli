import Gettext from 'node-gettext';
import {sprintf, vsprintf} from 'sprintf-js';

const gt = new Gettext();

window.gt = gt;

const addTranslations = (langs) => {
  for (const lang of langs) {
    gt.addTranslations(lang.type, 'messages', lang.file);
  }
}

const setLanguage = (lang = 'zh_CN') => {
  gt.setLocale(lang);
}

export function _(msgid, value) {
  const str = gt.gettext(msgid);

  return (
    value
    ? value instanceof Array
        ? vsprintf(str, value)
        : sprintf(str, value)
    : str
  );
}

// 复数翻译
export function _p(msgid, msgidPlural, count) {
  const str = gt.ngettext(msgid, msgidPlural, count);

  return (
    count > 1
    ? sprintf(str, count)
    : str
  );
}

// 带上下文翻译
export function _c(msgctxt, msgid, value) {
  const str = gt.pgettext(msgctxt, msgid);

  return (
    value
    ? value instanceof Array
        ? vsprintf(str, value)
        : sprintf(str, value)
    : str
  );
}

export function _cp(msgctx, msgid, msgidPlural, count) {
  const str = gt.npgettext(msgctx, msgid, msgidPlural, count);

  return (
    count > 1
    ? sprintf(str, count)
    : str
  );
}

export default {
  init(langs) {
    this.addTranslations(langs);
    this.setLanguage();
  },
  setLanguage,
  addTranslations,
}